import React, { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from 'lucide-react';
import { stockAssets, pulseIndicators } from '../data/pulseData';
import { FinnhubQuoteResponse, MarketIndicator, StockAssetInfo } from '../types';

interface PulseSectionProps {
  onSelectIndicator?: (indicator: MarketIndicator) => void;
}

export const PulseSection: React.FC<PulseSectionProps> = ({ onSelectIndicator }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL');
  const [quoteData, setQuoteData] = useState<FinnhubQuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [selectedMacroIndicator, setSelectedMacroIndicator] = useState<MarketIndicator | null>(null);

  // Active asset object
  const currentAsset: StockAssetInfo =
    stockAssets.find((a) => a.symbol === selectedSymbol) || stockAssets[0];

  // Fetch live market quote from local proxy /api/stocks/quote?symbol=...
  const fetchLiveQuote = useCallback(async (symbol: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/stocks/quote?symbol=${encodeURIComponent(symbol)}`);
      
      if (!response.ok) {
        throw new Error(`Market endpoint HTTP ${response.status}`);
      }

      const data: FinnhubQuoteResponse = await response.json();

      // Check if Finnhub returned zeroes (common with sandbox token) or invalid payload
      if (!data || typeof data.c !== 'number' || (data.c === 0 && data.pc === 0)) {
        const asset = stockAssets.find((a) => a.symbol === symbol) || stockAssets[0];
        setQuoteData(asset.fallbackQuote);
        setIsUsingFallback(true);
        setError('Sandbox token mode: displaying calibrated benchmark telemetry.');
      } else {
        setQuoteData(data);
        setIsUsingFallback(false);
        setError(null);
      }
      setLastUpdatedTime(new Date());
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Network error';
      const asset = stockAssets.find((a) => a.symbol === symbol) || stockAssets[0];
      setQuoteData(asset.fallbackQuote);
      setIsUsingFallback(true);
      setError(`${errorMsg}. Displaying verified fallback telemetry.`);
      setLastUpdatedTime(new Date());
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount or symbol switch
  useEffect(() => {
    fetchLiveQuote(selectedSymbol);
  }, [selectedSymbol, fetchLiveQuote]);

  // Auto-refresh interval (every 30 seconds)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchLiveQuote(selectedSymbol);
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, selectedSymbol, fetchLiveQuote]);

  // Calculations & Formatting
  const currentPrice = quoteData?.c ?? currentAsset.fallbackQuote.c;
  const priceChange = quoteData?.d ?? currentAsset.fallbackQuote.d ?? 0;
  const percentChange = quoteData?.dp ?? currentAsset.fallbackQuote.dp ?? 0;
  const dayHigh = quoteData?.h ?? currentAsset.fallbackQuote.h;
  const dayLow = quoteData?.l ?? currentAsset.fallbackQuote.l;
  const openPrice = quoteData?.o ?? currentAsset.fallbackQuote.o;
  const prevClose = quoteData?.pc ?? currentAsset.fallbackQuote.pc;

  const isPositive = percentChange >= 0;

  const formatUSD = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatDeltaUSD = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val)) return '$0.00';
    const sign = val > 0 ? '+' : '';
    return `${sign}${val.toFixed(2)}`;
  };

  const formatPercent = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val)) return '0.00%';
    const sign = val > 0 ? '+' : '';
    return `${sign}${val.toFixed(2)}%`;
  };

  // Range percentage for day slider (0% to 100%)
  const rangeSpan = dayHigh - dayLow;
  const rangeProgress =
    rangeSpan > 0
      ? Math.max(0, Math.min(100, ((currentPrice - dayLow) / rangeSpan) * 100))
      : 50;

  return (
    <section id="pulse" className="w-full pt-6 pb-6 bg-[#F3F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3B8B94] animate-pulse" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-600 font-mono">
              THE PULSE • REAL-TIME MARKET TELEMETRY
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3B8B94]/15 text-[#18484F] border border-[#3B8B94]/30">
              <Zap className="w-3 h-3 mr-1 text-[#3B8B94]" />
              LIVE FINNHUB PROXY
            </span>
          </div>

          {/* Controls & Timestamp */}
          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <div className="hidden sm:flex items-center space-x-1 font-mono text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {lastUpdatedTime
                  ? `Updated: ${lastUpdatedTime.toLocaleTimeString()} CET`
                  : 'Syncing...'}
              </span>
            </div>

            {/* Auto Refresh Toggle */}
            <button
              id="pulse-auto-refresh-btn"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors flex items-center space-x-1 ${
                autoRefresh
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}
              title={autoRefresh ? 'Auto-refresh active (every 30s)' : 'Auto-refresh paused'}
            >
              <Activity className="w-3 h-3" />
              <span>{autoRefresh ? '30s Polling' : 'Manual'}</span>
            </button>

            {/* Manual Refresh Button */}
            <button
              id="pulse-manual-refresh-btn"
              onClick={() => fetchLiveQuote(selectedSymbol)}
              disabled={isLoading}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#3B8B94] text-slate-700 hover:text-[#3B8B94] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              title="Refresh quote"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#3B8B94]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Real-Time Stock Terminal Container */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          
          {/* Symbol Selector Tab Bar */}
          <div className="bg-[#24292E] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Active Asset:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stockAssets.map((asset) => {
                  const isSelected = asset.symbol === selectedSymbol;
                  return (
                    <button
                      key={asset.symbol}
                      id={`pulse-symbol-${asset.symbol.toLowerCase()}`}
                      onClick={() => setSelectedSymbol(asset.symbol)}
                      className={`px-3 py-1 rounded-md text-xs font-bold font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-[#3B8B94] text-white shadow-xs'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{asset.symbol}</span>
                      <span className="text-[10px] opacity-75 font-sans hidden md:inline">
                        {asset.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Security proxy indicator */}
            <div className="hidden lg:flex items-center space-x-1.5 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B8B94]" />
              <span>Route: /api/stocks/quote?symbol={selectedSymbol}</span>
            </div>
          </div>

          {/* Fallback or Notice Banner if present */}
          {error && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-800">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
              <span className="text-[10px] font-mono text-amber-700">Token Proxy Active</span>
            </div>
          )}

          {/* Live Quote Content Grid */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Primary Live Price & Asset Identity (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#24292E] text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs border border-slate-700">
                  {currentAsset.symbol}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {currentAsset.name}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {currentAsset.exchange}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {currentAsset.category} • {currentAsset.currency}
                  </p>
                </div>
              </div>

              {/* Price & Delta Display */}
              <div className="flex items-baseline space-x-3 pt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {isLoading && !quoteData ? '---.--' : formatUSD(currentPrice)}
                </span>
                
                {/* Dynamic Price Change Badge with ▲ / ▼ */}
                <div
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold font-mono transition-colors ${
                    isPositive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 mr-1 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1 text-rose-600 stroke-[2.5]" />
                  )}
                  <span>{formatDeltaUSD(priceChange)}</span>
                  <span className="ml-1">({formatPercent(percentChange)})</span>
                </div>
              </div>

              {/* Day's Range Visual Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                  <span>Day Low: {formatUSD(dayLow)}</span>
                  <span className="font-semibold text-slate-700">Range: {rangeProgress.toFixed(0)}%</span>
                  <span>Day High: {formatUSD(dayHigh)}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative border border-slate-200">
                  <div
                    className="bg-[#3B8B94] h-full rounded-full transition-all duration-500"
                    style={{ width: `${rangeProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Detailed 4-Metric Grid (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Metric 1: Open Price (o) */}
              <div className="bg-[#F8FAFB] border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/50 transition-colors">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  Open Price (o)
                </span>
                <div className="mt-2">
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    {formatUSD(openPrice)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Session Open</span>
              </div>

              {/* Metric 2: Previous Close (pc) */}
              <div className="bg-[#F8FAFB] border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/50 transition-colors">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  Prev Close (pc)
                </span>
                <div className="mt-2">
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    {formatUSD(prevClose)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Prior Close Baseline</span>
              </div>

              {/* Metric 3: Daily High (h) */}
              <div className="bg-[#F8FAFB] border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Day High (h)
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="mt-2">
                  <span className="text-sm sm:text-base font-bold text-emerald-700 font-mono">
                    {formatUSD(dayHigh)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Intraday Ceiling</span>
              </div>

              {/* Metric 4: Daily Low (l) */}
              <div className="bg-[#F8FAFB] border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Day Low (l)
                  </span>
                  <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
                </div>
                <div className="mt-2">
                  <span className="text-sm sm:text-base font-bold text-rose-700 font-mono">
                    {formatUSD(dayLow)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Intraday Floor</span>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Regional Macro Indicators / GPW & NBP Ticker */}
          <div className="bg-[#EBF4F6] border-t border-[#C5E4E7] p-2.5 sm:p-3">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[10px] font-bold text-[#246A72] uppercase tracking-wider font-mono">
                Macro & Reference Benchmarks (GPW / NBP / GUS)
              </span>
              <span className="text-[10px] text-[#2C6E76] font-mono hidden sm:inline">
                Click any benchmark for details
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {pulseIndicators.slice(0, 5).map((indicator) => {
                const isUp = indicator.change.startsWith('+');
                const isNeutral = indicator.change.startsWith('0');
                const isCurrentMacroSelected = selectedMacroIndicator?.id === indicator.id;

                return (
                  <div
                    key={indicator.id}
                    id={`pulse-macro-${indicator.id}`}
                    onClick={() => {
                      setSelectedMacroIndicator(indicator);
                      if (onSelectIndicator) {
                        onSelectIndicator(indicator);
                      }
                    }}
                    className={`flex items-center space-x-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all bg-white/70 hover:bg-white border ${
                      isCurrentMacroSelected
                        ? 'border-[#3B8B94] shadow-xs'
                        : 'border-[#C5E4E7]/60'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                        isUp
                          ? 'bg-emerald-100 text-emerald-800'
                          : isNeutral
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {isUp ? '▲' : isNeutral ? '●' : '▼'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-800 truncate font-mono">
                          {indicator.symbol}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between text-[11px]">
                        <span className="font-semibold text-slate-900 font-mono">
                          {indicator.value}
                        </span>
                        <span
                          className={`font-mono text-[10px] font-bold ${
                            isUp
                              ? 'text-emerald-700'
                              : isNeutral
                              ? 'text-slate-600'
                              : 'text-blue-700'
                          }`}
                        >
                          {indicator.change}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Selected Macro Indicator Popover Drawer */}
        {selectedMacroIndicator && (
          <div className="mt-3 p-3.5 bg-white border border-[#3B8B94]/30 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B8B94]/10 text-[#3B8B94] flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm">
                  {selectedMacroIndicator.name} ({selectedMacroIndicator.symbol})
                </span>
                <p className="text-slate-500 text-[11px]">
                  Data Source: {selectedMacroIndicator.source} • Reference: {selectedMacroIndicator.lastUpdated}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1 rounded-md border border-slate-200 font-mono">
                <span className="text-slate-500 text-[11px]">Current:</span>
                <span className="font-bold text-slate-900">{selectedMacroIndicator.value}</span>
                <span className="text-emerald-600 font-semibold">{selectedMacroIndicator.change}</span>
              </div>
              <button
                onClick={() => setSelectedMacroIndicator(null)}
                className="text-slate-400 hover:text-slate-600 text-xs underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
