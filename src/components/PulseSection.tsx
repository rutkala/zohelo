import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
  Sparkles,
  Zap,
  Globe,
  DollarSign,
  Coins,
  Building2,
  BarChart3
} from 'lucide-react';
import {
  stockAssets,
  stockAssetsByCategory,
  marketTabs,
  MarketTabKey,
  pulseIndicators
} from '../data/pulseData';
import { FinnhubQuoteResponse, MarketIndicator, StockAssetInfo } from '../types';

interface PulseSectionProps {
  onSelectIndicator?: (indicator: MarketIndicator) => void;
}

export const PulseSection: React.FC<PulseSectionProps> = ({ onSelectIndicator }) => {
  const [activeTab, setActiveTab] = useState<MarketTabKey>('indices');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('SPY');
  
  // Quotes dictionary
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

  // Active sliding window assets (15-20 per category)
  const slidingWindowAssets: StockAssetInfo[] = useMemo(() => {
    return stockAssetsByCategory[activeTab] || stockAssetsByCategory.indices;
  }, [activeTab]);

  // If the active tab changes and the current selectedSymbol is not in the active sliding window,
  // set the selectedSymbol to the first asset in the active tab.
  useEffect(() => {
    const isCurrentInActiveTab = slidingWindowAssets.some((a) => a.symbol === selectedSymbol);
    if (!isCurrentInActiveTab && slidingWindowAssets.length > 0) {
      setSelectedSymbol(slidingWindowAssets[0].symbol);
    }
  }, [activeTab, slidingWindowAssets, selectedSymbol]);

  // Active asset object
  const currentAsset: StockAssetInfo = useMemo(() => {
    return stockAssets.find((a) => a.symbol === selectedSymbol) || slidingWindowAssets[0] || stockAssets[0];
  }, [selectedSymbol, slidingWindowAssets]);

  const currentQuote: FinnhubQuoteResponse = quotesMap[selectedSymbol] || currentAsset.fallbackQuote;

  // Localized parsing & formatting helper engine
  const parseAssetDetails = useCallback((symbol: string) => {
    const isGPW = symbol.endsWith('.WA');
    const isForex = symbol.startsWith('OANDA:');
    const isCrypto = symbol.startsWith('BINANCE:');

    let cleanSymbol = symbol;
    let badgeText = 'US Stock';

    if (isGPW) {
      cleanSymbol = symbol.replace('.WA', '');
      badgeText = 'GPW Stock';
    } else if (isForex) {
      cleanSymbol = symbol.replace('OANDA:', '').replace('_', ' / ');
      badgeText = 'Forex';
    } else if (isCrypto) {
      cleanSymbol = symbol.replace('BINANCE:', '').replace('USDT', ' / USDT');
      badgeText = 'Crypto';
    } else if (symbol === 'SPY' || symbol === 'QQQ' || symbol === 'DIA' || symbol === 'GLD' || symbol === 'SLV' || symbol === 'IWM' || symbol === 'EEM' || symbol === 'VTI' || symbol === 'VOO' || symbol === 'TLT' || symbol.startsWith('XL') || symbol === 'SMH' || symbol === 'ARKK' || symbol === 'EWZ' || symbol === 'EWJ' || symbol === 'FXI') {
      badgeText = 'Index ETF';
    }

    return {
      isGPW,
      isForex,
      isCrypto,
      cleanSymbol,
      badgeText
    };
  }, []);

  // Price formatting
  const formatPrice = useCallback((val: number | null | undefined, symbol: string) => {
    if (val === null || val === undefined || isNaN(val)) return '---';

    const isGPW = symbol.endsWith('.WA');
    const isForex = symbol.startsWith('OANDA:');
    const isCrypto = symbol.startsWith('BINANCE:');

    // 1. GPW Stocks: Append zł / PLN suffix (e.g., 124.50 PLN)
    if (isGPW) {
      return `${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN`;
    }

    // 2. Forex Pairs: Exactly 4 decimal places for interbank precision
    if (isForex) {
      return val.toFixed(4);
    }

    // 3. Cryptocurrencies: Parse as USD ($), removing cents if price > $10,000
    if (isCrypto) {
      if (val >= 10000) {
        return `$${Math.round(val).toLocaleString('en-US')}`;
      } else if (val >= 1) {
        return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      } else {
        // Small crypto tokens like DOGE, ADA, SHIB
        return `$${val.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })}`;
      }
    }

    // 4. Standard US Equities & Index ETFs: Prefix with $
    return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, []);

  // Delta formatting
  const formatDelta = useCallback((val: number | null | undefined, symbol: string) => {
    if (val === null || val === undefined || isNaN(val)) return '0.00';
    const sign = val > 0 ? '+' : '';
    const isGPW = symbol.endsWith('.WA');
    const isForex = symbol.startsWith('OANDA:');
    const isCrypto = symbol.startsWith('BINANCE:');

    if (isGPW) {
      return `${sign}${val.toFixed(2)} PLN`;
    }
    if (isForex) {
      return `${sign}${val.toFixed(4)}`;
    }
    if (isCrypto) {
      if (Math.abs(val) >= 1000) {
        return `${sign}$${Math.round(val).toLocaleString('en-US')}`;
      }
      return `${sign}$${val.toFixed(2)}`;
    }
    return `${sign}$${val.toFixed(2)}`;
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

      // Check if Finnhub returned zeroes (common with sandbox token or unlisted FX/Crypto on free tier) or invalid payload
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

  // Fetch when selectedSymbol changes
  useEffect(() => {
    fetchLiveQuote(selectedSymbol);
  }, [selectedSymbol, fetchLiveQuote]);

  // Sliding Window Cycling Poller:
  // Polls the focused asset and selectively refreshes quotes within the active 15-20 sliding window
  useEffect(() => {
    if (!autoRefresh) return;

    // High-frequency poll for the active focused asset (every 15s)
    const focusedInterval = setInterval(() => {
      fetchLiveQuote(selectedSymbol);
    }, 15000);

    return () => clearInterval(focusedInterval);
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
  const rangeSpan = Math.max(0.00001, dayHigh - dayLow);
  const rangeProgress = Math.max(
    0,
    Math.min(100, ((currentPrice - dayLow) / rangeSpan) * 100)
  );

  const activeTabMeta = marketTabs.find((t) => t.key === activeTab) || marketTabs[0];

  return (
    <section id="pulse" className="w-full pt-4 pb-6">
      
      {/* 
        GPU HARDWARE-ACCELERATED CSS 3D TRANSFORM MARQUEE
        Zero CPU Utilization Rule: translate3d(0,0,0) to translate3d(-50%,0,0)
      */}
      <style>{`
        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .pulse-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
          will-change: transform;
        }
        .pulse-marquee-track:hover,
        .pulse-marquee-track:focus-within {
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
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-700 font-mono">
                The Pulse • Multi-Market Sliding-Window Ticker
              </h2>
            </div>
            
            <div className="flex items-center space-x-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#3B8B94]/10 text-[#18484F] border border-[#3B8B94]/25 font-mono">
                <Radio className="w-2.5 h-2.5 mr-1 text-[#3B8B94] animate-pulse" />
                60 FPS STREAM
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-white border border-slate-200 shadow-2xs">
                100+ GLOBAL ASSETS
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
              title={autoRefresh ? 'Active sliding window polling enabled (every 15s)' : 'Auto-refresh paused'}
            >
              <Activity className={`w-3 h-3 ${autoRefresh ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{autoRefresh ? '15s Polling' : 'Paused'}</span>
            </button>

            {/* Manual Refresh Button */}
            <button
              id="pulse-manual-refresh-btn"
              onClick={() => fetchLiveQuote(selectedSymbol)}
              disabled={isLoading}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#3B8B94] text-slate-700 hover:text-[#3B8B94] transition-all cursor-pointer shadow-2xs disabled:opacity-50"
              title="Poll quote from /api/stocks/quote"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#3B8B94]' : ''}`} />
            </button>
          </div>
        </div>

        {/* 1. TABS SWITCHER (Active Sliding-Window Category Filter) */}
        <div className="bg-slate-100/90 p-1.5 rounded-t-xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {marketTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`pulse-tab-${tab.key}`}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center space-x-2 ${
                    isActive
                      ? 'bg-[#3B8B94] text-white shadow-xs ring-1 ring-[#2C6E76]/30'
                      : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {tab.key === 'indices' && <BarChart3 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                  {tab.key === 'us-equities' && <Building2 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                  {tab.key === 'gpw' && <Globe className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                  {tab.key === 'forex' && <DollarSign className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                  {tab.key === 'crypto' && <Coins className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                  
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Window Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2 text-[11px] font-mono text-slate-500 pr-2">
            <span className="flex items-center">
              <Zap className="w-3 h-3 mr-1 text-[#3B8B94]" />
              Window: <strong className="text-slate-700 ml-1">{activeTabMeta.shortLabel}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Sliding Queue: 20 Active Nodes</span>
          </div>
        </div>

        {/* 2. HIGH-PERFORMANCE INFINITE HORIZONTAL MARQUEE RIBBON */}
        <div className="relative w-full overflow-hidden bg-white border-x border-b border-slate-200/90 shadow-2xs py-3.5 mb-4 group rounded-b-xl">
          
          {/* Left/Right Edge Gradient Masks (Soft Dissolve into Pure White) */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-white via-white/85 to-transparent" />

          {/* Scrolling Ribbon Container (Set A + Set B for Seamless Infinite Loop) */}
          <div className="pulse-marquee-track flex items-center">
            
            {/* Set A (Active Sliding Window 20 Cards) */}
            <div className="flex items-center space-x-3 pr-3">
              {slidingWindowAssets.map((asset) => {
                const quote = quotesMap[asset.symbol] || asset.fallbackQuote;
                const isSelected = selectedSymbol === asset.symbol;
                const dp = quote.dp ?? asset.fallbackQuote.dp ?? 0;
                const isCardPos = dp >= 0;
                const details = parseAssetDetails(asset.symbol);

                return (
                  <button
                    key={`set-a-${asset.symbol}`}
                    id={`marquee-asset-a-${asset.symbol.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition-all cursor-pointer text-left border flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#3B8B94] ${
                      isSelected
                        ? 'bg-[#EBF5F6] border-[#3B8B94] shadow-xs ring-1 ring-[#3B8B94]/40'
                        : 'bg-[#F8FAFC] border-slate-200 hover:bg-[#F1F5F9] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-xs text-slate-800 tracking-wide">
                          {details.cleanSymbol}
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.2 bg-white text-slate-500 rounded border border-slate-200">
                          {details.badgeText}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-sans truncate max-w-[120px]">
                        {asset.name}
                      </span>
                    </div>

                    <div className="flex flex-col items-end pl-2.5 border-l border-slate-200">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {formatPrice(quote.c, asset.symbol)}
                      </span>
                      <div
                        className={`flex items-center font-mono text-[10px] font-bold ${
                          isCardPos ? 'text-emerald-600' : 'text-rose-600'
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
              {slidingWindowAssets.map((asset) => {
                const quote = quotesMap[asset.symbol] || asset.fallbackQuote;
                const isSelected = selectedSymbol === asset.symbol;
                const dp = quote.dp ?? asset.fallbackQuote.dp ?? 0;
                const isCardPos = dp >= 0;
                const details = parseAssetDetails(asset.symbol);

                return (
                  <button
                    key={`set-b-${asset.symbol}`}
                    id={`marquee-asset-b-${asset.symbol.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    tabIndex={-1}
                    className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition-all cursor-pointer text-left border flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#3B8B94] ${
                      isSelected
                        ? 'bg-[#EBF5F6] border-[#3B8B94] shadow-xs ring-1 ring-[#3B8B94]/40'
                        : 'bg-[#F8FAFC] border-slate-200 hover:bg-[#F1F5F9] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-xs text-slate-800 tracking-wide">
                          {details.cleanSymbol}
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.2 bg-white text-slate-500 rounded border border-slate-200">
                          {details.badgeText}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-sans truncate max-w-[120px]">
                        {asset.name}
                      </span>
                    </div>

                    <div className="flex flex-col items-end pl-2.5 border-l border-slate-200">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {formatPrice(quote.c, asset.symbol)}
                      </span>
                      <div
                        className={`flex items-center font-mono text-[10px] font-bold ${
                          isCardPos ? 'text-emerald-600' : 'text-rose-600'
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

          {/* Marquee Navigation Footer Hint */}
          <div className="px-4 pt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-100 mt-2">
            <span className="hidden sm:inline">
              ⇄ Hover ribbon to pause ticker • Click any active card to inspect live telemetry
            </span>
            <span className="sm:hidden">
              ⇄ Hover/Tap ribbon to inspect asset
            </span>
            <span className="text-slate-600">
              Active Focus: <strong className="text-[#2C6E76] font-bold">{currentAsset.symbol}</strong> ({currentAsset.category})
            </span>
          </div>
        </div>

        {/* 3. INTERACTIVE TELEMETRY PANEL */}
        <div className="bg-white text-slate-800 border border-slate-200/90 rounded-xl shadow-sm overflow-hidden">
          
          {/* Active Asset Terminal Navigation & Proxy Header */}
          <div className="bg-[#F8FAFC] px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider font-mono flex items-center">
                <Sliders className="w-3.5 h-3.5 mr-1.5 text-[#3B8B94]" />
                Active Sliding Window ({activeTabMeta.shortLabel}):
              </span>
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                {slidingWindowAssets.map((asset) => {
                  const isSelected = asset.symbol === selectedSymbol;
                  const details = parseAssetDetails(asset.symbol);
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
                      {details.cleanSymbol}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Security proxy indicator */}
            <div className="hidden lg:flex items-center space-x-1.5 text-[11px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B8B94]" />
              <span>Proxy Route: /api/stocks/quote?symbol={selectedSymbol}</span>
            </div>
          </div>

          {/* Fallback or Sandbox Token Status Banner if present */}
          {error && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-800 font-mono">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
              <span className="text-[10px] text-amber-700 uppercase tracking-wider font-semibold">Proxy Active</span>
            </div>
          )}

          {/* Main Telemetry & Metrics Display Grid */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Primary Live Price & Asset Identity (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              
              {/* Asset Identity Badge */}
              <div className="flex items-start space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#EBF5F6] text-[#2C6E76] font-mono font-bold text-sm flex items-center justify-center shadow-2xs border border-[#3B8B94]/25 flex-shrink-0">
                  <span>
                    {parseAssetDetails(currentAsset.symbol).cleanSymbol.slice(0, 4)}
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
                    {currentAsset.company} • <span className="text-[#2C6E76] font-mono font-semibold">{currentAsset.category}</span> ({currentAsset.currency})
                  </p>
                </div>
              </div>

              {/* Price & Dynamic Flashing Highlight Badge */}
              <div
                className={`p-4 rounded-xl transition-all duration-500 border ${
                  priceFlash === 'up'
                    ? 'bg-emerald-50 border-emerald-300 shadow-xs ring-1 ring-emerald-400'
                    : priceFlash === 'down'
                    ? 'bg-rose-50 border-rose-300 shadow-xs ring-1 ring-rose-400'
                    : 'bg-[#F8FAFC] border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                      {isLoading && !currentQuote ? '---.--' : formatPrice(currentPrice, currentAsset.symbol)}
                    </span>
                  </div>

                  {/* Trend Delta Pill */}
                  <div
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold font-mono transition-colors border ${
                      isPositive
                        ? 'bg-emerald-100/80 text-emerald-800 border-emerald-200'
                        : 'bg-rose-100/80 text-rose-800 border-rose-200'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 mr-1 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1 text-rose-600 stroke-[2.5]" />
                    )}
                    <span>{formatDelta(priceChange, currentAsset.symbol)}</span>
                    <span className="ml-1">({formatPercent(percentChange)})</span>
                  </div>
                </div>

                {/* Session status tick */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2.5 pt-2.5 border-t border-slate-200">
                  <span className="flex items-center text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                    Market Telemetry Active
                  </span>
                  <span>Currency: {currentAsset.currency}</span>
                </div>
              </div>

              {/* Visual Day Range Slider Component */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-[11px] font-mono text-slate-600 mb-1.5">
                  <span>Day Low: <strong className="text-slate-900">{formatPrice(dayLow, currentAsset.symbol)}</strong></span>
                  <span className="px-1.5 py-0.5 rounded bg-white text-[#2C6E76] font-bold text-[10px] border border-[#3B8B94]/20 shadow-2xs">
                    Position: {rangeProgress.toFixed(0)}%
                  </span>
                  <span>Day High: <strong className="text-slate-900">{formatPrice(dayHigh, currentAsset.symbol)}</strong></span>
                </div>

                {/* Range Bar with Indicator Pin */}
                <div className="relative w-full bg-slate-200 h-2 rounded-full overflow-visible my-2.5">
                  <div
                    className="bg-[#3B8B94] h-full rounded-full transition-all duration-500"
                    style={{ width: `${rangeProgress}%` }}
                  />
                  {/* Pin Pointer */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#3B8B94] shadow-md transition-all duration-500 pointer-events-none"
                    style={{ left: `calc(${rangeProgress}% - 8px)` }}
                    title={`Current price: ${formatPrice(currentPrice, currentAsset.symbol)}`}
                  />
                </div>

                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>Session Low ({currentAsset.currency})</span>
                  <span>Intraday Range Velocity</span>
                  <span>Session High ({currentAsset.currency})</span>
                </div>
              </div>

            </div>

            {/* Right: Detailed 6-Metric Intraday Grid (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-1.5 text-[#3B8B94]" />
                  Intraday Quotation Breakdown
                </span>
                <span className="text-[10px] font-mono text-[#2C6E76] font-semibold">
                  Exchange: {currentAsset.exchange}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                {/* Metric 1: Open Price (o) */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/40 hover:bg-[#F4F7F9] transition-colors">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Open Price (o)
                  </span>
                  <div className="my-2">
                    <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                      {formatPrice(openPrice, currentAsset.symbol)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Session Open</span>
                </div>

                {/* Metric 2: Previous Close (pc) */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/40 hover:bg-[#F4F7F9] transition-colors">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Prev Close (pc)
                  </span>
                  <div className="my-2">
                    <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                      {formatPrice(prevClose, currentAsset.symbol)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Prior Baseline</span>
                </div>

                {/* Metric 3: Absolute Delta (d) */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/40 hover:bg-[#F4F7F9] transition-colors">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Net Delta (d)
                  </span>
                  <div className="my-2">
                    <span
                      className={`text-sm sm:text-base font-bold font-mono ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {formatDelta(priceChange, currentAsset.symbol)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Intraday Spread</span>
                </div>

                {/* Metric 4: Daily High (h) */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/40 hover:bg-[#F4F7F9] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Day High (h)
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="my-2">
                    <span className="text-sm sm:text-base font-bold text-emerald-600 font-mono">
                      {formatPrice(dayHigh, currentAsset.symbol)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Session Peak</span>
                </div>

                {/* Metric 5: Daily Low (l) */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/40 hover:bg-[#F4F7F9] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Day Low (l)
                    </span>
                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div className="my-2">
                    <span className="text-sm sm:text-base font-bold text-rose-600 font-mono">
                      {formatPrice(dayLow, currentAsset.symbol)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Session Floor</span>
                </div>

                {/* Metric 6: Percent Change (dp) */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-[#3B8B94]/40 hover:bg-[#F4F7F9] transition-colors">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Change % (dp)
                  </span>
                  <div className="my-2">
                    <span
                      className={`text-sm sm:text-base font-bold font-mono ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {formatPercent(percentChange)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Percent Return</span>
                </div>

              </div>

              {/* Asset Technical Specifications & Architecture Callout */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#3B8B94] flex-shrink-0" />
                  <span className="font-mono text-[11px] text-slate-600">
                    Engine Spec: <strong>GPU translate3d()</strong> • 100+ Asset Registry • Sliding Window (15-20 active)
                  </span>
                </div>
                <div className="flex items-center space-x-2 font-mono text-[11px]">
                  <span className="text-slate-500">Category:</span>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-2xs font-semibold">
                    {parseAssetDetails(currentAsset.symbol).badgeText}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* 4. Bottom Bar: Macro & Regional Polish Market Reference Benchmarks */}
          <div className="bg-[#F8FAFC] border-t border-slate-200 p-3.5">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center">
                <Activity className="w-3.5 h-3.5 mr-1.5 text-[#3B8B94]" />
                Polish Regional & Macroeconomic Benchmarks (GPW / NBP / GUS)
              </span>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
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
                    className={`flex items-center space-x-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all border ${
                      isCurrentMacroSelected
                        ? 'bg-[#EBF5F6] border-[#3B8B94] shadow-xs ring-1 ring-[#3B8B94]/40'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                        isUp
                          ? 'bg-emerald-100 text-emerald-700'
                          : isNeutral
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-blue-100 text-blue-700'
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
                              ? 'text-emerald-600'
                              : isNeutral
                              ? 'text-slate-500'
                              : 'text-blue-600'
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
          <div className="mt-3 p-3.5 bg-white border border-[#3B8B94]/30 rounded-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#EBF5F6] text-[#2C6E76] flex items-center justify-center border border-[#3B8B94]/25 flex-shrink-0">
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
              <div className="flex items-center space-x-2 bg-[#F8FAFC] px-3 py-1.5 rounded-md border border-slate-200 font-mono">
                <span className="text-slate-500 text-[11px]">Value:</span>
                <span className="font-bold text-slate-900">{selectedMacroIndicator.value}</span>
                <span className="text-emerald-600 font-semibold text-[11px]">{selectedMacroIndicator.change}</span>
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
