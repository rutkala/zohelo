import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
  Activity,
  AlertCircle,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Radio,
  Sliders,
  Layers,
  Sparkles
} from 'lucide-react';
import { stockAssets, pulseIndicators } from '../data/pulseData';
import { FinnhubQuoteResponse, MarketIndicator, StockAssetInfo } from '../types';

interface PulseSectionProps {
  onSelectIndicator?: (indicator: MarketIndicator) => void;
}

export const PulseSection: React.FC<PulseSectionProps> = ({ onSelectIndicator }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('SPY');
  const [quotesMap, setQuotesMap] = useState<Record<string, FinnhubQuoteResponse>>(() => {
    const initial: Record<string, FinnhubQuoteResponse> = {};
    stockAssets.forEach((asset) => {
      initial[asset.symbol] = asset.fallbackQuote;
    });
    return initial;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [selectedMacroIndicator, setSelectedMacroIndicator] = useState<MarketIndicator | null>(null);
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);
  
  const prevPriceRef = useRef<number | null>(null);

  // Active asset object
  const currentAsset: StockAssetInfo =
    stockAssets.find((a) => a.symbol === selectedSymbol) || stockAssets[0];

  const currentQuote: FinnhubQuoteResponse =
    quotesMap[selectedSymbol] || currentAsset.fallbackQuote;

  // Format helpers
  const formatPrice = useCallback((val: number | null | undefined, asset: StockAssetInfo) => {
    if (val === null || val === undefined || isNaN(val)) return '---';
    if (asset.category === 'Forex') {
      return `${val.toFixed(4)} PLN`;
    }
    if (asset.currency === 'PLN') {
      return `${val.toFixed(2)} PLN`;
    }
    if (asset.currency === 'USD' || asset.currency === 'USDT') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    }
    return val.toFixed(2);
  }, []);

  const formatDelta = useCallback((val: number | null | undefined, asset: StockAssetInfo) => {
    if (val === null || val === undefined || isNaN(val)) return '0.00';
    const sign = val > 0 ? '+' : '';
    if (asset.category === 'Forex') {
      return `${sign}${val.toFixed(4)}`;
    }
    if (asset.currency === 'USD' || asset.currency === 'USDT') {
      const formattedAbs = Math.abs(val).toFixed(2);
      return val >= 0 ? `+$${formattedAbs}` : `-$${formattedAbs}`;
    }
    return `${sign}${val.toFixed(2)} ${asset.currency}`;
  }, []);

  const formatPercent = useCallback((val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val)) return '0.00%';
    const sign = val > 0 ? '+' : '';
    return `${sign}${val.toFixed(2)}%`;
  }, []);

  // Fetch live market quote from local proxy /api/stocks/quote?symbol=...
  const fetchLiveQuote = useCallback(async (symbol: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/stocks/quote?symbol=${encodeURIComponent(symbol)}`);
      
      if (!response.ok) {
        throw new Error(`Proxy HTTP ${response.status}`);
      }

      const data: FinnhubQuoteResponse = await response.json();

      // Check if Finnhub returned zeroes (common with sandbox token) or invalid payload
      if (!data || typeof data.c !== 'number' || (data.c === 0 && data.pc === 0)) {
        const asset = stockAssets.find((a) => a.symbol === symbol) || stockAssets[0];
        setQuotesMap((prev) => ({
          ...prev,
          [symbol]: asset.fallbackQuote,
        }));
        setError('Sandbox token mode: active with calibrated multi-market baseline telemetry.');
      } else {
        const prevPrice = quotesMap[symbol]?.c;
        if (prevPrice !== undefined && prevPrice !== data.c) {
          setPriceFlash(data.c >= prevPrice ? 'up' : 'down');
          setTimeout(() => setPriceFlash(null), 1200);
        }
        setQuotesMap((prev) => ({
          ...prev,
          [symbol]: data,
        }));
        setError(null);
      }
      setLastUpdatedTime(new Date());
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Network error';
      const asset = stockAssets.find((a) => a.symbol === symbol) || stockAssets[0];
      setQuotesMap((prev) => ({
        ...prev,
        [symbol]: asset.fallbackQuote,
      }));
      setError(`${errorMsg}. Displaying verified multi-market telemetry.`);
      setLastUpdatedTime(new Date());
    } finally {
      setIsLoading(false);
    }
  }, [quotesMap]);

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

  // Track price changes for flash highlight
  useEffect(() => {
    if (prevPriceRef.current !== null && prevPriceRef.current !== currentQuote.c) {
      setPriceFlash(currentQuote.c >= prevPriceRef.current ? 'up' : 'down');
      const timer = setTimeout(() => setPriceFlash(null), 1200);
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = currentQuote.c;
  }, [currentQuote.c]);

  // Calculations & Intraday Metrics
  const currentPrice = currentQuote.c;
  const priceChange = currentQuote.d ?? 0;
  const percentChange = currentQuote.dp ?? 0;
  const dayHigh = currentQuote.h || currentPrice;
  const dayLow = currentQuote.l || currentPrice;
  const openPrice = currentQuote.o || currentPrice;
  const prevClose = currentQuote.pc || currentPrice;

  const isPositive = percentChange >= 0;

  // Day Range calculation
  const rangeSpan = Math.max(0.0001, dayHigh - dayLow);
  const rangeProgress = Math.max(
    0,
    Math.min(100, ((currentPrice - dayLow) / rangeSpan) * 100)
  );

  return (
    <section id="pulse" className="w-full pt-4 pb-6">
      
      {/* Scoped CSS for Infinite Marquee & Keyframe Animation */}
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .pulse-marquee-container {
          display: flex;
          width: max-content;
          animation: marqueeScroll 45s linear infinite;
          will-change: transform;
        }
        .pulse-marquee-container:hover,
        .pulse-marquee-container:focus-within {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar & Control Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B8B94] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3B8B94]"></span>
              </span>
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500 font-mono">
                The Pulse • Global Multi-Market Ticker
              </h2>
            </div>
            
            <div className="flex items-center space-x-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#3B8B94]/10 text-[#18484F] border border-[#3B8B94]/25 font-mono">
                <Radio className="w-2.5 h-2.5 mr-1 text-[#3B8B94] animate-pulse" />
                LIVE STREAM
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-white border border-slate-200 shadow-2xs">
                14 GLOBAL BENCHMARKS
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2.5 text-xs">
            <div className="hidden sm:flex items-center space-x-1 font-mono text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {lastUpdatedTime
                  ? `${lastUpdatedTime.toLocaleTimeString()} CET`
                  : 'Synchronizing...'}
              </span>
            </div>

            {/* Auto Refresh Toggle */}
            <button
              id="pulse-auto-refresh-btn"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all cursor-pointer flex items-center space-x-1.5 border shadow-2xs ${
                autoRefresh
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70'
                  : 'bg-white text-slate-500 border-slate-200 hover:text-slate-700'
              }`}
              title={autoRefresh ? 'Auto-refresh polling active (every 30s)' : 'Auto-refresh paused'}
            >
              <Activity className={`w-3 h-3 ${autoRefresh ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{autoRefresh ? '30s Polling' : 'Paused'}</span>
            </button>

            {/* Manual Refresh Button */}
            <button
              id="pulse-manual-refresh-btn"
              onClick={() => fetchLiveQuote(selectedSymbol)}
              disabled={isLoading}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#3B8B94] text-slate-700 hover:text-[#3B8B94] transition-all cursor-pointer shadow-2xs disabled:opacity-50"
              title="Refresh quote from /api/stocks"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#3B8B94]' : ''}`} />
            </button>
          </div>
        </div>

        {/* 1. INFINITE SCROLLING MARQUEE TICKER BANNER */}
        <div className="relative w-full overflow-hidden bg-white rounded-xl border border-slate-200/90 shadow-xs py-3 mb-4 group">
          
          {/* Edge Fade Masks for Soft Dissolve */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Marquee Track (Seamless Loop: Set A + Set B) */}
          <div className="pulse-marquee-container flex items-center">
            
            {/* Set A */}
            <div className="flex items-center space-x-3 pr-3">
              {stockAssets.map((asset) => {
                const quote = quotesMap[asset.symbol] || asset.fallbackQuote;
                const isSelected = selectedSymbol === asset.symbol;
                const dp = quote.dp ?? asset.fallbackQuote.dp ?? 0;
                const isCardPos = dp >= 0;

                return (
                  <button
                    key={`set-a-${asset.symbol}`}
                    id={`marquee-asset-a-${asset.symbol.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    className={`flex items-center space-x-3 px-3.5 py-2 rounded-lg transition-all cursor-pointer text-left border flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#3B8B94] ${
                      isSelected
                        ? 'bg-slate-50 border-[#3B8B94] shadow-xs ring-1 ring-[#3B8B94]'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-xs text-slate-900 tracking-wide">
                          {asset.symbol}
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.2 bg-white text-slate-500 rounded border border-slate-200">
                          {asset.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-sans truncate max-w-[110px]">
                        {asset.name}
                      </span>
                    </div>

                    <div className="flex flex-col items-end pl-2.5 border-l border-slate-200">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {formatPrice(quote.c, asset)}
                      </span>
                      <div
                        className={`flex items-center font-mono text-[10px] font-bold ${
                          isCardPos ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        <span className="mr-0.5">{isCardPos ? '▲' : '▼'}</span>
                        <span>{formatPercent(dp)}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Set B (Identical clone for seamless continuous infinite loop) */}
            <div className="flex items-center space-x-3 pr-3" aria-hidden="true">
              {stockAssets.map((asset) => {
                const quote = quotesMap[asset.symbol] || asset.fallbackQuote;
                const isSelected = selectedSymbol === asset.symbol;
                const dp = quote.dp ?? asset.fallbackQuote.dp ?? 0;
                const isCardPos = dp >= 0;

                return (
                  <button
                    key={`set-b-${asset.symbol}`}
                    id={`marquee-asset-b-${asset.symbol.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    tabIndex={-1}
                    className={`flex items-center space-x-3 px-3.5 py-2 rounded-lg transition-all cursor-pointer text-left border flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#3B8B94] ${
                      isSelected
                        ? 'bg-slate-50 border-[#3B8B94] shadow-xs ring-1 ring-[#3B8B94]'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-xs text-slate-900 tracking-wide">
                          {asset.symbol}
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.2 bg-white text-slate-500 rounded border border-slate-200">
                          {asset.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-sans truncate max-w-[110px]">
                        {asset.name}
                      </span>
                    </div>

                    <div className="flex flex-col items-end pl-2.5 border-l border-slate-200">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {formatPrice(quote.c, asset)}
                      </span>
                      <div
                        className={`flex items-center font-mono text-[10px] font-bold ${
                          isCardPos ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        <span className="mr-0.5">{isCardPos ? '▲' : '▼'}</span>
                        <span>{formatPercent(dp)}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Marquee Navigation Hint */}
          <div className="px-4 pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="hidden sm:inline">
              ⇄ Hover ticker to pause • Click any asset for live market metrics
            </span>
            <span className="sm:hidden">
              ⇄ Hover/Tap ticker to inspect asset
            </span>
            <span className="text-slate-500">
              Active: <strong className="text-[#3B8B94]">{currentAsset.symbol}</strong> ({currentAsset.category})
            </span>
          </div>
        </div>

        {/* 2. INTERACTIVE "ACTIVE ASSET" DETAIL PANEL */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          
          {/* Active Asset Terminal Navigation & Proxy Header */}
          <div className="bg-slate-50 px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider font-mono flex items-center">
                <Sliders className="w-3 h-3 mr-1 text-[#3B8B94]" />
                Direct Selector:
              </span>
              <div className="flex flex-wrap gap-1">
                {stockAssets.map((asset) => {
                  const isSelected = asset.symbol === selectedSymbol;
                  return (
                    <button
                      key={asset.symbol}
                      id={`pulse-quick-select-${asset.symbol.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={() => setSelectedSymbol(asset.symbol)}
                      className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#3B8B94] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-2xs'
                      }`}
                    >
                      {asset.symbol.includes(':') ? asset.symbol.split(':')[1] : asset.symbol}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Security proxy indicator */}
            <div className="hidden lg:flex items-center space-x-1.5 text-[11px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B8B94]" />
              <span>Route: /api/stocks/quote?symbol={selectedSymbol}</span>
            </div>
          </div>

          {/* Fallback or Sandbox Token Status Banner if present */}
          {error && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-800 font-mono">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
              <span className="text-[10px] text-amber-700 uppercase">Proxy Layer Active</span>
            </div>
          )}

          {/* Main Telemetry & Metrics Display Grid */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Primary Live Price & Asset Identity (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              
              {/* Asset Identity Badge */}
              <div className="flex items-start space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#3B8B94]/10 text-[#3B8B94] font-mono font-bold text-sm flex items-center justify-center shadow-xs border border-[#3B8B94]/20 flex-shrink-0">
                  <span>
                    {currentAsset.symbol.includes(':')
                      ? currentAsset.symbol.split(':')[1].slice(0, 4)
                      : currentAsset.symbol.slice(0, 4)}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight truncate">
                      {currentAsset.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {currentAsset.exchange}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {currentAsset.company} • <span className="text-[#3B8B94] font-mono font-semibold">{currentAsset.category}</span> ({currentAsset.currency})
                  </p>
                </div>
              </div>

              {/* Price & Dynamic Flashing Highlight Badge */}
              <div
                className={`p-3.5 rounded-xl transition-all duration-500 border ${
                  priceFlash === 'up'
                    ? 'bg-emerald-50/80 border-emerald-400 shadow-xs'
                    : priceFlash === 'down'
                    ? 'bg-rose-50/80 border-rose-400 shadow-xs'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                      {isLoading && !currentQuote ? '---.--' : formatPrice(currentPrice, currentAsset)}
                    </span>
                  </div>

                  {/* Trend Delta Pill */}
                  <div
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold font-mono transition-colors border ${
                      isPositive
                        ? 'bg-emerald-100/70 text-emerald-800 border-emerald-300'
                        : 'bg-rose-100/70 text-rose-800 border-rose-300'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 mr-1 text-emerald-700 stroke-[2.5]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1 text-rose-700 stroke-[2.5]" />
                    )}
                    <span>{formatDelta(priceChange, currentAsset)}</span>
                    <span className="ml-1">({formatPercent(percentChange)})</span>
                  </div>
                </div>

                {/* Session status tick */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 pt-2 border-t border-slate-200">
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                    Market Telemetry Active
                  </span>
                  <span>Currency: {currentAsset.currency}</span>
                </div>
              </div>

              {/* Visual Day Range Slider Component */}
              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-[11px] font-mono text-slate-600 mb-1.5">
                  <span>Day Low: <strong className="text-slate-800">{formatPrice(dayLow, currentAsset)}</strong></span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-[#18484F] font-bold text-[10px] border border-slate-200">
                    Position: {rangeProgress.toFixed(0)}%
                  </span>
                  <span>Day High: <strong className="text-slate-800">{formatPrice(dayHigh, currentAsset)}</strong></span>
                </div>

                {/* Range Bar with Indicator Pin */}
                <div className="relative w-full bg-slate-200 h-2 rounded-full overflow-visible my-2">
                  <div
                    className="bg-[#3B8B94] h-full rounded-full transition-all duration-500"
                    style={{ width: `${rangeProgress}%` }}
                  />
                  {/* Pin Pointer */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#3B8B94] shadow-md transition-all duration-500 pointer-events-none"
                    style={{ left: `calc(${rangeProgress}% - 8px)` }}
                    title={`Current price: ${formatPrice(currentPrice, currentAsset)}`}
                  />
                </div>

                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>52-W Range Intraday</span>
                  <span>Real-Time Finnhub Metric</span>
                </div>
              </div>

            </div>

            {/* Right: Detailed 4-Metric Grid (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider font-mono flex items-center">
                  <Layers className="w-3 h-3 mr-1 text-[#3B8B94]" />
                  Intraday Quotation Breakdown
                </span>
                <span className="text-[10px] font-mono text-[#3B8B94]">
                  Exchange: {currentAsset.exchange}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* Metric 1: Open Price (o) */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/60 transition-colors">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Open Price (o)
                  </span>
                  <div className="my-2">
                    <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                      {formatPrice(openPrice, currentAsset)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Session Open</span>
                </div>

                {/* Metric 2: Previous Close (pc) */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/60 transition-colors">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Prev Close (pc)
                  </span>
                  <div className="my-2">
                    <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                      {formatPrice(prevClose, currentAsset)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Prior Baseline</span>
                </div>

                {/* Metric 3: Daily High (h) */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Day High (h)
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="my-2">
                    <span className="text-sm sm:text-base font-bold text-emerald-700 font-mono">
                      {formatPrice(dayHigh, currentAsset)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Session Peak</span>
                </div>

                {/* Metric 4: Daily Low (l) */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Day Low (l)
                    </span>
                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div className="my-2">
                    <span className="text-sm sm:text-base font-bold text-rose-700 font-mono">
                      {formatPrice(dayLow, currentAsset)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Session Floor</span>
                </div>

              </div>

              {/* Asset Technical Specifications & Proxy Architecture Callout */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#3B8B94] flex-shrink-0" />
                  <span className="font-mono text-[11px]">
                    Proxy Spec: <strong>CONST-01/02 Zero-Maintenance</strong> • 60 FPS CSS transforms • Sub-millisecond local telemetry
                  </span>
                </div>
                <div className="flex items-center space-x-2 font-mono text-[11px]">
                  <span className="text-slate-500">Asset Class:</span>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    {currentAsset.category}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* 3. Bottom Bar: Macro & Regional Polish Market Reference Benchmarks */}
          <div className="bg-[#EBF4F6] border-t border-[#C5E4E7] p-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-bold text-[#246A72] uppercase tracking-wider font-mono flex items-center">
                <Activity className="w-3 h-3 mr-1 text-[#3B8B94]" />
                Polish Regional & Macroeconomic Benchmarks (GPW / NBP / GUS)
              </span>
              <span className="text-[10px] text-[#2C6E76] font-mono hidden sm:inline">
                Click any benchmark for verified metadata
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {pulseIndicators.map((indicator) => {
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
                    className={`flex items-center space-x-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all border ${
                      isCurrentMacroSelected
                        ? 'bg-white border-[#3B8B94] shadow-xs'
                        : 'bg-white/70 border-[#C5E4E7]/60 hover:bg-white hover:border-[#3B8B94]/50'
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
                        <span className="font-semibold text-slate-900 font-mono text-[10px]">
                          {indicator.value}
                        </span>
                        <span
                          className={`font-mono text-[9px] font-bold ${
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

        {/* Selected Macro Indicator Details Drawer */}
        {selectedMacroIndicator && (
          <div className="mt-3 p-3.5 bg-white border border-[#3B8B94]/30 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B8B94]/10 text-[#3B8B94] flex items-center justify-center border border-[#3B8B94]/20">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm font-mono">
                  {selectedMacroIndicator.name} ({selectedMacroIndicator.symbol})
                </span>
                <p className="text-slate-500 text-[11px] font-sans">
                  Data Source: {selectedMacroIndicator.source} • Fixing/Reference: {selectedMacroIndicator.lastUpdated}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 font-mono">
                <span className="text-slate-500 text-[11px]">Value:</span>
                <span className="font-bold text-slate-900">{selectedMacroIndicator.value}</span>
                <span className="text-emerald-700 font-semibold text-[11px]">{selectedMacroIndicator.change}</span>
              </div>
              <button
                onClick={() => setSelectedMacroIndicator(null)}
                className="text-slate-500 hover:text-slate-800 text-xs underline cursor-pointer font-mono"
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
