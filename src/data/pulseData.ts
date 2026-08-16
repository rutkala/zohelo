import { MarketIndicator, StockAssetInfo } from '../types';

export const stockAssets: StockAssetInfo[] = [
  // 1. Major Stock Market Indices (via liquid ETF proxies)
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    company: 'State Street Global Advisors',
    exchange: 'NYSE Arca',
    currency: 'USD',
    category: 'Index ETF',
    fallbackQuote: {
      c: 588.62,
      d: 4.15,
      dp: 0.71,
      h: 590.20,
      l: 584.90,
      o: 585.10,
      pc: 584.47,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust (Nasdaq-100)',
    company: 'Invesco Capital Management',
    exchange: 'NASDAQ',
    currency: 'USD',
    category: 'Index ETF',
    fallbackQuote: {
      c: 512.40,
      d: 5.80,
      dp: 1.14,
      h: 514.85,
      l: 507.20,
      o: 508.30,
      pc: 506.60,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'DIA',
    name: 'SPDR Dow Jones Industrial Average ETF',
    company: 'State Street Global Advisors',
    exchange: 'NYSE Arca',
    currency: 'USD',
    category: 'Index ETF',
    fallbackQuote: {
      c: 438.10,
      d: 1.95,
      dp: 0.45,
      h: 439.40,
      l: 436.50,
      o: 437.00,
      pc: 436.15,
      t: Math.floor(Date.now() / 1000)
    }
  },

  // 2. US Equities (Technology Leaders)
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    company: 'Apple Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    category: 'US Stock',
    fallbackQuote: {
      c: 228.45,
      d: 2.18,
      dp: 0.96,
      h: 230.12,
      l: 226.70,
      o: 227.10,
      pc: 226.27,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    company: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    category: 'US Stock',
    fallbackQuote: {
      c: 448.20,
      d: 4.35,
      dp: 0.98,
      h: 450.80,
      l: 444.15,
      o: 445.00,
      pc: 443.85,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    company: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    category: 'US Stock',
    fallbackQuote: {
      c: 132.80,
      d: 4.25,
      dp: 3.31,
      h: 134.50,
      l: 128.40,
      o: 129.10,
      pc: 128.55,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    company: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    category: 'US Stock',
    fallbackQuote: {
      c: 218.60,
      d: -3.40,
      dp: -1.53,
      h: 224.20,
      l: 215.10,
      o: 223.00,
      pc: 222.00,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    company: 'Amazon.com, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    category: 'US Stock',
    fallbackQuote: {
      c: 188.40,
      d: 1.65,
      dp: 0.88,
      h: 189.90,
      l: 186.10,
      o: 187.00,
      pc: 186.75,
      t: Math.floor(Date.now() / 1000)
    }
  },

  // 3. Polish Market (Warsaw Stock Exchange - GPW)
  {
    symbol: 'PKO.WA',
    name: 'PKO Bank Polski SA',
    company: 'Powszechna Kasa Oszczędności Bank Polski',
    exchange: 'GPW Warsaw',
    currency: 'PLN',
    category: 'GPW Stock',
    fallbackQuote: {
      c: 58.70,
      d: 0.95,
      dp: 1.65,
      h: 59.20,
      l: 57.80,
      o: 58.00,
      pc: 57.75,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'ALE.WA',
    name: 'Allegro.eu SA',
    company: 'Allegro.eu Group',
    exchange: 'GPW Warsaw',
    currency: 'PLN',
    category: 'GPW Stock',
    fallbackQuote: {
      c: 34.25,
      d: -0.45,
      dp: -1.30,
      h: 35.10,
      l: 33.90,
      o: 34.80,
      pc: 34.70,
      t: Math.floor(Date.now() / 1000)
    }
  },

  // 4. Forex (Global Currency Benchmarks via OANDA)
  {
    symbol: 'OANDA:USD_PLN',
    name: 'USD / PLN (US Dollar to Polish Złoty)',
    company: 'Forex Spot Reference',
    exchange: 'OANDA',
    currency: 'PLN',
    category: 'Forex',
    fallbackQuote: {
      c: 4.0845,
      d: -0.0125,
      dp: -0.31,
      h: 4.1020,
      l: 4.0780,
      o: 4.0970,
      pc: 4.0970,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'OANDA:EUR_PLN',
    name: 'EUR / PLN (Euro to Polish Złoty)',
    company: 'Forex Spot Reference',
    exchange: 'OANDA',
    currency: 'PLN',
    category: 'Forex',
    fallbackQuote: {
      c: 4.4720,
      d: 0.0035,
      dp: 0.08,
      h: 4.4810,
      l: 4.4650,
      o: 4.4685,
      pc: 4.4685,
      t: Math.floor(Date.now() / 1000)
    }
  },

  // 5. Cryptocurrencies (via Binance)
  {
    symbol: 'BINANCE:BTCUSDT',
    name: 'Bitcoin (BTC / USDT)',
    company: 'Decentralized Digital Asset',
    exchange: 'Binance',
    currency: 'USDT',
    category: 'Crypto',
    fallbackQuote: {
      c: 96450.00,
      d: 1820.00,
      dp: 1.92,
      h: 97800.00,
      l: 94100.00,
      o: 94630.00,
      pc: 94630.00,
      t: Math.floor(Date.now() / 1000)
    }
  },
  {
    symbol: 'BINANCE:ETHUSDT',
    name: 'Ethereum (ETH / USDT)',
    company: 'Ethereum Network',
    exchange: 'Binance',
    currency: 'USDT',
    category: 'Crypto',
    fallbackQuote: {
      c: 2745.50,
      d: 64.20,
      dp: 2.39,
      h: 2790.00,
      l: 2660.00,
      o: 2681.30,
      pc: 2681.30,
      t: Math.floor(Date.now() / 1000)
    }
  }
];

export const pulseIndicators: MarketIndicator[] = [
  {
    id: 'wig20',
    symbol: 'WIG20',
    name: 'Warsaw Stock Exchange Top 20',
    value: '2345.67',
    numericValue: 2345.67,
    change: '+1.2%',
    isPositive: true,
    source: 'GPW / Warsaw Stock Exchange',
    lastUpdated: 'Today 17:05 CET',
    sparkline: [2290, 2305, 2312, 2328, 2315, 2334, 2345.67],
    category: 'index'
  },
  {
    id: 'usd-pln',
    symbol: 'USD/PLN',
    name: 'US Dollar to Polish Złoty',
    value: '4.1250',
    numericValue: 4.1250,
    change: '-0.3%',
    isPositive: false, // Down is often favorable or down in price
    source: 'NBP Reference Rate',
    lastUpdated: 'Today 12:15 CET',
    sparkline: [4.162, 4.155, 4.148, 4.135, 4.140, 4.130, 4.125],
    category: 'fx'
  },
  {
    id: 'eur-pln',
    symbol: 'EUR/PLN',
    name: 'Euro to Polish Złoty',
    value: '4.4800',
    numericValue: 4.4800,
    change: '-0.1%',
    isPositive: false,
    source: 'NBP Reference Rate',
    lastUpdated: 'Today 12:15 CET',
    sparkline: [4.498, 4.492, 4.489, 4.484, 4.482, 4.481, 4.480],
    category: 'fx'
  },
  {
    id: 'poland-cpi',
    symbol: 'POLAND CPI',
    name: 'Consumer Price Inflation (YoY)',
    value: '+5.1%',
    numericValue: 5.1,
    change: '+5.1%',
    isPositive: true,
    source: 'GUS Flash Estimate',
    lastUpdated: 'Monthly (GUS)',
    sparkline: [6.5, 6.2, 5.8, 5.3, 4.9, 5.0, 5.1],
    category: 'macro'
  },
  {
    id: 'nasdaq',
    symbol: 'NASDAQ',
    name: 'Nasdaq Composite Index',
    value: '15678.90',
    numericValue: 15678.90,
    change: '+0.8%',
    isPositive: true,
    source: 'Global Markets Feed',
    lastUpdated: 'Live Market Data',
    sparkline: [15420, 15480, 15530, 15590, 15610, 15640, 15678.90],
    category: 'index'
  },
  {
    id: 'wibor-3m',
    symbol: 'WIBOR 3M',
    name: 'Warsaw Interbank Offered Rate 3M',
    value: '5.85%',
    numericValue: 5.85,
    change: '0.0%',
    isPositive: true,
    source: 'GPW Benchmark S.A.',
    lastUpdated: 'Fixing 11:00 CET',
    sparkline: [5.87, 5.86, 5.86, 5.85, 5.85, 5.85, 5.85],
    category: 'rates'
  }
];
