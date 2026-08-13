export interface MarketIndicator {
  id: string;
  symbol: string;
  name: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  source: string;
  lastUpdated: string;
  sparkline: number[];
  category: 'index' | 'fx' | 'macro' | 'rates';
}

export interface MetricCardData {
  id: string;
  metricKey: string;
  title: string;
  currentValue: string;
  numericValue: number;
  badgeValue: string;
  isPositiveDelta: boolean;
  trendDirection: 'up' | 'down' | 'neutral';
  benchmark: string;
  description: string;
  sparklinePoints: { date: string; value: number }[];
  yamlDefinition: string;
  sqlQuery: string;
  dbtModel: string;
}

export interface VoivodeshipData {
  id: string;
  name: string;
  namePl: string;
  code: string;
  capital: string;
  population: string;
  populationNum: number;
  gdpPerCapitaPln: number;
  gdpSharePercent: number;
  unemploymentRate: number;
  avgSalaryPln: number;
  publicFinanceIndex: number;
  innovationScore: number;
  colorIntensity: string; // for choropleth map
  topSectors: string[];
  keyInsight: string;
  trend2020to2025: { year: number; gdpIndex: number; budgetMln: number }[];
}

export interface FinanceTrendItem {
  year: string;
  dataValue: number; // Primary Data value (GUS public revenue/expenditure index)
  azureValue: number; // Comparative Azure benchmark / forecast index
  label: string;
  growthYoY: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  iconType: 'chart' | 'paper' | 'megaphone' | 'network' | 'trending';
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  authorRole: string;
  tags: string[];
  fullContent: string[];
  keyDataPoints: { label: string; value: string; context: string }[];
}

export interface DatasetItem {
  id: string;
  title: string;
  format: 'CSV' | 'Parquet' | 'Power BI' | 'PDF';
  formatColor: string;
  size: string;
  recordsCount: string;
  period: string;
  description: string;
  updateFrequency: string;
  schema: { column: string; type: string; description: string }[];
  sampleData: Record<string, string | number>[];
  downloadUrl: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Enterprise BI' | 'Municipal' | 'Macro Analysis' | 'Real Estate';
  tier: 'Free Open Tier' | 'Commercial Edition' | 'Custom Advisory' | 'Enterprise BI';
  features: string[];
  previewMetrics: { label: string; val: string }[];
}

export interface ConsultantProfile {
  name: string;
  title: string;
  headline: string;
  bio: string;
  experienceYears: number;
  email: string;
  timeline: {
    year: string;
    role: string;
    description: string;
    milestone: string;
  }[];
  consultingSpecialties: string[];
}
