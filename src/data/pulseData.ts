import { MarketIndicator, StockAssetInfo } from '../types';

export type MarketTabKey = 'indices' | 'us-equities' | 'gpw' | 'forex' | 'crypto';

export interface MarketTabConfig {
  key: MarketTabKey;
  label: string;
  shortLabel: string;
  badge: string;
  description: string;
  count: number;
}

export const marketTabs: MarketTabConfig[] = [
  {
    key: 'indices',
    label: 'Indices & ETFs',
    shortLabel: 'Indices',
    badge: 'Benchmark',
    description: 'Global benchmark ETFs & equity market index proxies',
    count: 20
  },
  {
    key: 'us-equities',
    label: 'US Equities',
    shortLabel: 'US Stocks',
    badge: 'NYSE / NASDAQ',
    description: 'Major US tech leaders, enterprise conglomerates & mega-caps',
    count: 20
  },
  {
    key: 'gpw',
    label: 'GPW (Polska)',
    shortLabel: 'GPW Warsaw',
    badge: 'WIG20 / WIG40',
    description: 'Warsaw Stock Exchange blue chips & high-volume Polish equities',
    count: 20
  },
  {
    key: 'forex',
    label: 'Forex (FX)',
    shortLabel: 'Forex',
    badge: 'Interbank Spot',
    description: 'OANDA global interbank currency pairs & PLN crosses',
    count: 20
  },
  {
    key: 'crypto',
    label: 'Crypto (Spot)',
    shortLabel: 'Crypto',
    badge: 'Binance USDT',
    description: 'Tier-1 liquid digital assets & blockchain protocols',
    count: 20
  }
];

export const stockAssetsByCategory: Record<MarketTabKey, StockAssetInfo[]> = {
  // 1. INDICES & ETF PROXIES (20 Assets)
  indices: [
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
    {
      symbol: 'GLD',
      name: 'SPDR Gold Shares',
      company: 'World Gold Trust Services',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Commodity ETF',
      fallbackQuote: {
        c: 248.35,
        d: 2.10,
        dp: 0.85,
        h: 249.50,
        l: 246.80,
        o: 247.10,
        pc: 246.25,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'SLV',
      name: 'iShares Silver Trust',
      company: 'BlackRock Fund Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Commodity ETF',
      fallbackQuote: {
        c: 28.75,
        d: 0.42,
        dp: 1.48,
        h: 29.10,
        l: 28.30,
        o: 28.40,
        pc: 28.33,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'IWM',
      name: 'iShares Russell 2000 ETF',
      company: 'BlackRock Fund Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Index ETF',
      fallbackQuote: {
        c: 226.50,
        d: -1.25,
        dp: -0.55,
        h: 228.40,
        l: 225.10,
        o: 227.80,
        pc: 227.75,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'EEM',
      name: 'iShares MSCI Emerging Markets ETF',
      company: 'BlackRock Fund Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Index ETF',
      fallbackQuote: {
        c: 44.80,
        d: 0.35,
        dp: 0.79,
        h: 45.10,
        l: 44.40,
        o: 44.50,
        pc: 44.45,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'VTI',
      name: 'Vanguard Total Stock Market ETF',
      company: 'The Vanguard Group',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Index ETF',
      fallbackQuote: {
        c: 282.15,
        d: 1.85,
        dp: 0.66,
        h: 283.40,
        l: 280.90,
        o: 281.00,
        pc: 280.30,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'VOO',
      name: 'Vanguard S&P 500 ETF',
      company: 'The Vanguard Group',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Index ETF',
      fallbackQuote: {
        c: 540.80,
        d: 3.75,
        dp: 0.70,
        h: 542.10,
        l: 537.90,
        o: 538.20,
        pc: 537.05,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'TLT',
      name: 'iShares 20+ Year Treasury Bond ETF',
      company: 'BlackRock Fund Advisors',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'Bond ETF',
      fallbackQuote: {
        c: 94.20,
        d: -0.65,
        dp: -0.69,
        h: 95.10,
        l: 93.80,
        o: 94.90,
        pc: 94.85,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'XLE',
      name: 'Energy Select Sector SPDR Fund',
      company: 'State Street Global Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Sector ETF',
      fallbackQuote: {
        c: 89.40,
        d: 0.85,
        dp: 0.96,
        h: 90.20,
        l: 88.70,
        o: 88.90,
        pc: 88.55,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'XLF',
      name: 'Financial Select Sector SPDR Fund',
      company: 'State Street Global Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Sector ETF',
      fallbackQuote: {
        c: 48.15,
        d: 0.38,
        dp: 0.80,
        h: 48.50,
        l: 47.75,
        o: 47.90,
        pc: 47.77,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'XLK',
      name: 'Technology Select Sector SPDR Fund',
      company: 'State Street Global Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Sector ETF',
      fallbackQuote: {
        c: 236.80,
        d: 3.10,
        dp: 1.33,
        h: 238.20,
        l: 234.10,
        o: 234.50,
        pc: 233.70,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'XLV',
      name: 'Health Care Select Sector SPDR Fund',
      company: 'State Street Global Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Sector ETF',
      fallbackQuote: {
        c: 146.20,
        d: -0.40,
        dp: -0.27,
        h: 147.10,
        l: 145.80,
        o: 146.70,
        pc: 146.60,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'XLI',
      name: 'Industrial Select Sector SPDR Fund',
      company: 'State Street Global Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Sector ETF',
      fallbackQuote: {
        c: 138.45,
        d: 0.75,
        dp: 0.54,
        h: 139.10,
        l: 137.80,
        o: 138.00,
        pc: 137.70,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'SMH',
      name: 'VanEck Semiconductor ETF',
      company: 'VanEck Associates',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'Sector ETF',
      fallbackQuote: {
        c: 254.90,
        d: 6.40,
        dp: 2.58,
        h: 257.50,
        l: 249.20,
        o: 250.10,
        pc: 248.50,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'ARKK',
      name: 'ARK Innovation ETF',
      company: 'ARK Investment Management',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Thematic ETF',
      fallbackQuote: {
        c: 54.30,
        d: 1.15,
        dp: 2.16,
        h: 55.20,
        l: 53.40,
        o: 53.60,
        pc: 53.15,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'EWZ',
      name: 'iShares MSCI Brazil ETF',
      company: 'BlackRock Fund Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Country ETF',
      fallbackQuote: {
        c: 28.10,
        d: -0.22,
        dp: -0.78,
        h: 28.50,
        l: 27.90,
        o: 28.35,
        pc: 28.32,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'EWJ',
      name: 'iShares MSCI Japan ETF',
      company: 'BlackRock Fund Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Country ETF',
      fallbackQuote: {
        c: 72.85,
        d: 0.65,
        dp: 0.90,
        h: 73.20,
        l: 72.30,
        o: 72.40,
        pc: 72.20,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'FXI',
      name: 'iShares China Large-Cap ETF',
      company: 'BlackRock Fund Advisors',
      exchange: 'NYSE Arca',
      currency: 'USD',
      category: 'Country ETF',
      fallbackQuote: {
        c: 32.40,
        d: 0.50,
        dp: 1.57,
        h: 32.80,
        l: 31.90,
        o: 32.00,
        pc: 31.90,
        t: Math.floor(Date.now() / 1000)
      }
    }
  ],

  // 2. US EQUITIES (20 Assets)
  'us-equities': [
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
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc. (Class A)',
      company: 'Alphabet Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 176.50,
        d: 2.10,
        dp: 1.20,
        h: 177.80,
        l: 174.90,
        o: 175.20,
        pc: 174.40,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      company: 'Meta Platforms, Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 592.30,
        d: 7.80,
        dp: 1.33,
        h: 595.40,
        l: 586.10,
        o: 588.00,
        pc: 584.50,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'NFLX',
      name: 'Netflix Inc.',
      company: 'Netflix, Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 710.25,
        d: 8.50,
        dp: 1.21,
        h: 715.00,
        l: 704.20,
        o: 706.00,
        pc: 701.75,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'AMD',
      name: 'Advanced Micro Devices Inc.',
      company: 'Advanced Micro Devices, Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 156.40,
        d: 3.20,
        dp: 2.09,
        h: 158.20,
        l: 153.80,
        o: 154.10,
        pc: 153.20,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'INTC',
      name: 'Intel Corp.',
      company: 'Intel Corporation',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 21.85,
        d: -0.45,
        dp: -2.02,
        h: 22.50,
        l: 21.60,
        o: 22.35,
        pc: 22.30,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'CRM',
      name: 'Salesforce Inc.',
      company: 'Salesforce, Inc.',
      exchange: 'NYSE',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 334.60,
        d: 2.90,
        dp: 0.87,
        h: 337.00,
        l: 332.10,
        o: 333.00,
        pc: 331.70,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'ORCL',
      name: 'Oracle Corp.',
      company: 'Oracle Corporation',
      exchange: 'NYSE',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 184.20,
        d: 3.40,
        dp: 1.88,
        h: 186.00,
        l: 181.50,
        o: 182.00,
        pc: 180.80,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'ADBE',
      name: 'Adobe Inc.',
      company: 'Adobe Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 504.80,
        d: -2.30,
        dp: -0.45,
        h: 511.00,
        l: 502.10,
        o: 509.50,
        pc: 507.10,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'PYPL',
      name: 'PayPal Holdings Inc.',
      company: 'PayPal Holdings, Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 82.40,
        d: 1.10,
        dp: 1.35,
        h: 83.20,
        l: 81.50,
        o: 81.80,
        pc: 81.30,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'UBER',
      name: 'Uber Technologies Inc.',
      company: 'Uber Technologies, Inc.',
      exchange: 'NYSE',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 74.90,
        d: 1.80,
        dp: 2.46,
        h: 75.60,
        l: 73.40,
        o: 73.80,
        pc: 73.10,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'COIN',
      name: 'Coinbase Global Inc.',
      company: 'Coinbase Global, Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 312.50,
        d: 12.80,
        dp: 4.27,
        h: 318.00,
        l: 301.20,
        o: 304.50,
        pc: 299.70,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'PLTR',
      name: 'Palantir Technologies Inc.',
      company: 'Palantir Technologies Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 64.80,
        d: 2.95,
        dp: 4.77,
        h: 66.20,
        l: 62.10,
        o: 62.80,
        pc: 61.85,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'DIS',
      name: 'The Walt Disney Company',
      company: 'The Walt Disney Company',
      exchange: 'NYSE',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 114.30,
        d: 0.65,
        dp: 0.57,
        h: 115.40,
        l: 113.80,
        o: 114.00,
        pc: 113.65,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BA',
      name: 'The Boeing Company',
      company: 'The Boeing Company',
      exchange: 'NYSE',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 162.70,
        d: -1.80,
        dp: -1.09,
        h: 166.00,
        l: 161.50,
        o: 165.20,
        pc: 164.50,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      company: 'JPMorgan Chase & Co.',
      exchange: 'NYSE',
      currency: 'USD',
      category: 'US Stock',
      fallbackQuote: {
        c: 242.60,
        d: 2.15,
        dp: 0.89,
        h: 244.10,
        l: 240.80,
        o: 241.20,
        pc: 240.45,
        t: Math.floor(Date.now() / 1000)
      }
    }
  ],

  // 3. POLISH MARKET - GPW WARSAW (20 Assets)
  gpw: [
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
    {
      symbol: 'DNP.WA',
      name: 'Dino Polska SA',
      company: 'Dino Polska S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 395.20,
        d: 6.40,
        dp: 1.65,
        h: 398.50,
        l: 389.00,
        o: 390.00,
        pc: 388.80,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'KGH.WA',
      name: 'KGHM Polska Miedź SA',
      company: 'KGHM Polska Miedź S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 142.80,
        d: 2.30,
        dp: 1.64,
        h: 144.50,
        l: 140.90,
        o: 141.00,
        pc: 140.50,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'PKN.WA',
      name: 'ORLEN SA',
      company: 'Polski Koncern Naftowy ORLEN',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 54.60,
        d: -0.70,
        dp: -1.27,
        h: 55.80,
        l: 54.20,
        o: 55.40,
        pc: 55.30,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'PEO.WA',
      name: 'Bank Polska Kasa Opieki SA',
      company: 'Bank Pekao S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 164.50,
        d: 2.10,
        dp: 1.29,
        h: 166.00,
        l: 162.80,
        o: 163.00,
        pc: 162.40,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'LPP.WA',
      name: 'LPP SA',
      company: 'LPP S.A. (Reserved, Sinsay)',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 16420.00,
        d: 240.00,
        dp: 1.48,
        h: 16550.00,
        l: 16200.00,
        o: 16250.00,
        pc: 16180.00,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'CDR.WA',
      name: 'CD Projekt SA',
      company: 'CD Projekt S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 178.40,
        d: 3.60,
        dp: 2.06,
        h: 181.20,
        l: 175.50,
        o: 176.00,
        pc: 174.80,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'PZU.WA',
      name: 'PZU SA',
      company: 'Powszechny Zakład Ubezpieczeń',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 48.90,
        d: 0.55,
        dp: 1.14,
        h: 49.30,
        l: 48.40,
        o: 48.50,
        pc: 48.35,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'SPL.WA',
      name: 'Santander Bank Polska SA',
      company: 'Santander Bank Polska',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 524.00,
        d: 6.00,
        dp: 1.16,
        h: 529.00,
        l: 519.00,
        o: 520.00,
        pc: 518.00,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'KTY.WA',
      name: 'Grupa Kęty SA',
      company: 'Grupa Kęty S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 742.00,
        d: -4.00,
        dp: -0.54,
        h: 751.00,
        l: 738.00,
        o: 748.00,
        pc: 746.00,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'PGE.WA',
      name: 'PGE Polska Grupa Energetyczna SA',
      company: 'PGE S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 7.25,
        d: 0.12,
        dp: 1.68,
        h: 7.35,
        l: 7.15,
        o: 7.18,
        pc: 7.13,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'KRU.WA',
      name: 'KRUK SA',
      company: 'KRUK S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 442.00,
        d: 5.50,
        dp: 1.26,
        h: 446.00,
        l: 438.00,
        o: 439.00,
        pc: 436.50,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'ACP.WA',
      name: 'Asseco Poland SA',
      company: 'Asseco Poland S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 84.60,
        d: 0.80,
        dp: 0.95,
        h: 85.40,
        l: 83.90,
        o: 84.00,
        pc: 83.80,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'MBK.WA',
      name: 'mBank SA',
      company: 'mBank S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 638.00,
        d: 9.00,
        dp: 1.43,
        h: 644.00,
        l: 630.00,
        o: 632.00,
        pc: 629.00,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'CPS.WA',
      name: 'Cyfrowy Polsat SA',
      company: 'Cyfrowy Polsat S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 12.85,
        d: -0.15,
        dp: -1.15,
        h: 13.10,
        l: 12.70,
        o: 13.05,
        pc: 13.00,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OPL.WA',
      name: 'Orange Polska SA',
      company: 'Orange Polska S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 8.42,
        d: 0.08,
        dp: 0.96,
        h: 8.50,
        l: 8.35,
        o: 8.38,
        pc: 8.34,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'TPE.WA',
      name: 'Tauron Polska Energia SA',
      company: 'Tauron Polska Energia',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 3.48,
        d: 0.05,
        dp: 1.46,
        h: 3.54,
        l: 3.42,
        o: 3.44,
        pc: 3.43,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'JSW.WA',
      name: 'Jastrzębska Spółka Węglowa SA',
      company: 'JSW S.A.',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 24.15,
        d: -0.60,
        dp: -2.42,
        h: 25.10,
        l: 23.90,
        o: 24.90,
        pc: 24.75,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'CCC.WA',
      name: 'CCC SA',
      company: 'CCC S.A. (Modivo, HalfPrice)',
      exchange: 'GPW Warsaw',
      currency: 'PLN',
      category: 'GPW Stock',
      fallbackQuote: {
        c: 182.40,
        d: 4.80,
        dp: 2.70,
        h: 185.00,
        l: 178.00,
        o: 179.50,
        pc: 177.60,
        t: Math.floor(Date.now() / 1000)
      }
    }
  ],

  // 4. FOREX - GLOBAL CURRENCY PAIRS & PLN CROSSES (20 Assets)
  forex: [
    {
      symbol: 'OANDA:USD_PLN',
      name: 'USD / PLN (US Dollar to Polish Złoty)',
      company: 'Forex Spot Interbank',
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
      company: 'Forex Spot Interbank',
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
    {
      symbol: 'OANDA:GBP_USD',
      name: 'GBP / USD (British Pound to US Dollar)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'USD',
      category: 'Forex',
      fallbackQuote: {
        c: 1.2945,
        d: 0.0042,
        dp: 0.33,
        h: 1.2980,
        l: 1.2910,
        o: 1.2903,
        pc: 1.2903,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:USD_JPY',
      name: 'USD / JPY (US Dollar to Japanese Yen)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'JPY',
      category: 'Forex',
      fallbackQuote: {
        c: 154.6520,
        d: 0.4250,
        dp: 0.28,
        h: 155.1000,
        l: 154.2000,
        o: 154.2270,
        pc: 154.2270,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:EUR_USD',
      name: 'EUR / USD (Euro to US Dollar)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'USD',
      category: 'Forex',
      fallbackQuote: {
        c: 1.0845,
        d: 0.0018,
        dp: 0.17,
        h: 1.0875,
        l: 1.0820,
        o: 1.0827,
        pc: 1.0827,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:GBP_PLN',
      name: 'GBP / PLN (British Pound to Polish Złoty)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'PLN',
      category: 'Forex',
      fallbackQuote: {
        c: 5.2860,
        d: 0.0145,
        dp: 0.28,
        h: 5.3010,
        l: 5.2710,
        o: 5.2715,
        pc: 5.2715,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:CHF_PLN',
      name: 'CHF / PLN (Swiss Franc to Polish Złoty)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'PLN',
      category: 'Forex',
      fallbackQuote: {
        c: 4.6210,
        d: -0.0080,
        dp: -0.17,
        h: 4.6350,
        l: 4.6120,
        o: 4.6290,
        pc: 4.6290,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:AUD_USD',
      name: 'AUD / USD (Australian Dollar to US Dollar)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'USD',
      category: 'Forex',
      fallbackQuote: {
        c: 0.6540,
        d: 0.0025,
        dp: 0.38,
        h: 0.6570,
        l: 0.6515,
        o: 0.6515,
        pc: 0.6515,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:USD_CAD',
      name: 'USD / CAD (US Dollar to Canadian Dollar)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'CAD',
      category: 'Forex',
      fallbackQuote: {
        c: 1.4085,
        d: -0.0015,
        dp: -0.11,
        h: 1.4120,
        l: 1.4060,
        o: 1.4100,
        pc: 1.4100,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:USD_CHF',
      name: 'USD / CHF (US Dollar to Swiss Franc)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'CHF',
      category: 'Forex',
      fallbackQuote: {
        c: 0.8840,
        d: 0.0012,
        dp: 0.14,
        h: 0.8870,
        l: 0.8820,
        o: 0.8828,
        pc: 0.8828,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:NZD_USD',
      name: 'NZD / USD (New Zealand Dollar to US Dollar)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'USD',
      category: 'Forex',
      fallbackQuote: {
        c: 0.5890,
        d: 0.0020,
        dp: 0.34,
        h: 0.5920,
        l: 0.5870,
        o: 0.5870,
        pc: 0.5870,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:EUR_GBP',
      name: 'EUR / GBP (Euro to British Pound)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'GBP',
      category: 'Forex',
      fallbackQuote: {
        c: 0.8375,
        d: -0.0010,
        dp: -0.12,
        h: 0.8400,
        l: 0.8360,
        o: 0.8385,
        pc: 0.8385,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:EUR_CHF',
      name: 'EUR / CHF (Euro to Swiss Franc)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'CHF',
      category: 'Forex',
      fallbackQuote: {
        c: 0.9585,
        d: 0.0008,
        dp: 0.08,
        h: 0.9610,
        l: 0.9565,
        o: 0.9577,
        pc: 0.9577,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:EUR_JPY',
      name: 'EUR / JPY (Euro to Japanese Yen)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'JPY',
      category: 'Forex',
      fallbackQuote: {
        c: 167.7500,
        d: 0.6500,
        dp: 0.39,
        h: 168.2000,
        l: 167.1000,
        o: 167.1000,
        pc: 167.1000,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:GBP_JPY',
      name: 'GBP / JPY (British Pound to Japanese Yen)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'JPY',
      category: 'Forex',
      fallbackQuote: {
        c: 200.2500,
        d: 0.9500,
        dp: 0.48,
        h: 200.8000,
        l: 199.3000,
        o: 199.3000,
        pc: 199.3000,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:CAD_JPY',
      name: 'CAD / JPY (Canadian Dollar to Japanese Yen)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'JPY',
      category: 'Forex',
      fallbackQuote: {
        c: 109.8000,
        d: 0.3500,
        dp: 0.32,
        h: 110.2000,
        l: 109.4000,
        o: 109.4500,
        pc: 109.4500,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:AUD_JPY',
      name: 'AUD / JPY (Australian Dollar to Japanese Yen)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'JPY',
      category: 'Forex',
      fallbackQuote: {
        c: 101.1500,
        d: 0.5000,
        dp: 0.50,
        h: 101.6000,
        l: 100.7000,
        o: 100.6500,
        pc: 100.6500,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:USD_NOK',
      name: 'USD / NOK (US Dollar to Norwegian Krone)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'NOK',
      category: 'Forex',
      fallbackQuote: {
        c: 11.0850,
        d: -0.0250,
        dp: -0.23,
        h: 11.1400,
        l: 11.0600,
        o: 11.1100,
        pc: 11.1100,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:USD_SEK',
      name: 'USD / SEK (US Dollar to Swedish Krona)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'SEK',
      category: 'Forex',
      fallbackQuote: {
        c: 10.9650,
        d: -0.0180,
        dp: -0.16,
        h: 11.0100,
        l: 10.9400,
        o: 10.9830,
        pc: 10.9830,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'OANDA:PLN_CZK',
      name: 'PLN / CZK (Polish Złoty to Czech Koruna)',
      company: 'Forex Spot Interbank',
      exchange: 'OANDA',
      currency: 'CZK',
      category: 'Forex',
      fallbackQuote: {
        c: 5.7240,
        d: 0.0110,
        dp: 0.19,
        h: 5.7400,
        l: 5.7100,
        o: 5.7130,
        pc: 5.7130,
        t: Math.floor(Date.now() / 1000)
      }
    }
  ],

  // 5. CRYPTO (SPOT USDT PAIRS) (20 Assets)
  crypto: [
    {
      symbol: 'BINANCE:BTCUSDT',
      name: 'Bitcoin (BTC / USDT)',
      company: 'Decentralized Digital Gold',
      exchange: 'Binance Spot',
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
      company: 'Ethereum Smart Contract Platform',
      exchange: 'Binance Spot',
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
    },
    {
      symbol: 'BINANCE:SOLUSDT',
      name: 'Solana (SOL / USDT)',
      company: 'Solana High-Speed Layer-1',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 194.80,
        d: 8.30,
        dp: 4.45,
        h: 198.50,
        l: 185.20,
        o: 186.50,
        pc: 186.50,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:ADAUSDT',
      name: 'Cardano (ADA / USDT)',
      company: 'Cardano Proof-of-Stake Network',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 0.8420,
        d: 0.0380,
        dp: 4.73,
        h: 0.8650,
        l: 0.8010,
        o: 0.8040,
        pc: 0.8040,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:XRPUSDT',
      name: 'XRP (XRP / USDT)',
      company: 'Ripple Open Settlement Protocol',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 2.4580,
        d: 0.1420,
        dp: 6.13,
        h: 2.5200,
        l: 2.2900,
        o: 2.3160,
        pc: 2.3160,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:BNBUSDT',
      name: 'BNB (BNB / USDT)',
      company: 'BNB Chain Ecosystem',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 668.50,
        d: 11.20,
        dp: 1.70,
        h: 674.00,
        l: 654.00,
        o: 657.30,
        pc: 657.30,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:DOGEUSDT',
      name: 'Dogecoin (DOGE / USDT)',
      company: 'Dogecoin Network',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 0.2740,
        d: 0.0120,
        dp: 4.58,
        h: 0.2850,
        l: 0.2590,
        o: 0.2620,
        pc: 0.2620,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:AVAXUSDT',
      name: 'Avalanche (AVAX / USDT)',
      company: 'Avalanche Consensus Layer',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 33.70,
        d: 1.40,
        dp: 4.33,
        h: 34.50,
        l: 32.10,
        o: 32.30,
        pc: 32.30,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:DOTUSDT',
      name: 'Polkadot (DOT / USDT)',
      company: 'Polkadot Interoperability Protocol',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 7.85,
        d: 0.28,
        dp: 3.70,
        h: 8.05,
        l: 7.52,
        o: 7.57,
        pc: 7.57,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:LINKUSDT',
      name: 'Chainlink (LINK / USDT)',
      company: 'Chainlink Decentralized Oracle Network',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 18.90,
        d: 0.75,
        dp: 4.13,
        h: 19.30,
        l: 18.05,
        o: 18.15,
        pc: 18.15,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:NEARUSDT',
      name: 'NEAR Protocol (NEAR / USDT)',
      company: 'NEAR Layer-1 Sharded Blockchain',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 6.45,
        d: 0.32,
        dp: 5.22,
        h: 6.65,
        l: 6.08,
        o: 6.13,
        pc: 6.13,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:MATICUSDT',
      name: 'Polygon Ecosystem (POL / USDT)',
      company: 'Polygon Zero-Knowledge Architecture',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 0.5480,
        d: 0.0190,
        dp: 3.59,
        h: 0.5620,
        l: 0.5250,
        o: 0.5290,
        pc: 0.5290,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:LTCUSDT',
      name: 'Litecoin (LTC / USDT)',
      company: 'Litecoin Peer-to-Peer Currency',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 104.20,
        d: 3.60,
        dp: 3.58,
        h: 106.50,
        l: 100.10,
        o: 100.60,
        pc: 100.60,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:UNIUSDT',
      name: 'Uniswap (UNI / USDT)',
      company: 'Uniswap Protocol AMM',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 11.35,
        d: 0.45,
        dp: 4.13,
        h: 11.65,
        l: 10.80,
        o: 10.90,
        pc: 10.90,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:ATOMUSDT',
      name: 'Cosmos (ATOM / USDT)',
      company: 'Cosmos Inter-Blockchain Network',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 7.20,
        d: 0.22,
        dp: 3.15,
        h: 7.45,
        l: 6.95,
        o: 6.98,
        pc: 6.98,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:ICPUSDT',
      name: 'Internet Computer (ICP / USDT)',
      company: 'DFINITY Internet Computer',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 12.60,
        d: 0.55,
        dp: 4.56,
        h: 13.00,
        l: 11.95,
        o: 12.05,
        pc: 12.05,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:SHIBUSDT',
      name: 'Shiba Inu (SHIB / USDT)',
      company: 'Shiba Inu Decentralized Community',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 0.00002485,
        d: 0.00000115,
        dp: 4.85,
        h: 0.00002590,
        l: 0.00002340,
        o: 0.00002370,
        pc: 0.00002370,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:TRXUSDT',
      name: 'TRON (TRX / USDT)',
      company: 'TRON DAO Network',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 0.2450,
        d: 0.0040,
        dp: 1.66,
        h: 0.2490,
        l: 0.2395,
        o: 0.2410,
        pc: 0.2410,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:XLMUSDT',
      name: 'Stellar Lumens (XLM / USDT)',
      company: 'Stellar Development Foundation',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 0.4850,
        d: 0.0240,
        dp: 5.21,
        h: 0.5050,
        l: 0.4560,
        o: 0.4610,
        pc: 0.4610,
        t: Math.floor(Date.now() / 1000)
      }
    },
    {
      symbol: 'BINANCE:SUIUSDT',
      name: 'Sui Network (SUI / USDT)',
      company: 'Mysten Labs Sui Blockchain',
      exchange: 'Binance Spot',
      currency: 'USDT',
      category: 'Crypto',
      fallbackQuote: {
        c: 3.42,
        d: 0.18,
        dp: 5.56,
        h: 3.55,
        l: 3.20,
        o: 3.24,
        pc: 3.24,
        t: Math.floor(Date.now() / 1000)
      }
    }
  ]
};

// Flattened master list containing all 100+ assets
export const stockAssets: StockAssetInfo[] = [
  ...stockAssetsByCategory.indices,
  ...stockAssetsByCategory['us-equities'],
  ...stockAssetsByCategory.gpw,
  ...stockAssetsByCategory.forex,
  ...stockAssetsByCategory.crypto
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
    value: '4.0845',
    numericValue: 4.0845,
    change: '-0.3%',
    isPositive: false,
    source: 'NBP Reference Rate',
    lastUpdated: 'Today 12:15 CET',
    sparkline: [4.162, 4.155, 4.148, 4.135, 4.140, 4.130, 4.0845],
    category: 'fx'
  },
  {
    id: 'eur-pln',
    symbol: 'EUR/PLN',
    name: 'Euro to Polish Złoty',
    value: '4.4720',
    numericValue: 4.4720,
    change: '+0.1%',
    isPositive: true,
    source: 'NBP Reference Rate',
    lastUpdated: 'Today 12:15 CET',
    sparkline: [4.498, 4.492, 4.489, 4.484, 4.482, 4.481, 4.4720],
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
    value: '19842.15',
    numericValue: 19842.15,
    change: '+0.9%',
    isPositive: true,
    source: 'Global Markets Feed',
    lastUpdated: 'Live Market Data',
    sparkline: [19420, 19480, 19530, 19590, 19610, 19640, 19842.15],
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
