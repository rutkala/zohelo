import { MarketIndicator } from '../types';

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
