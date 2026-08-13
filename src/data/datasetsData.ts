import { DatasetItem } from '../types';

export const vaultDatasets: DatasetItem[] = [
  {
    id: 'polish-economic-data-csv',
    title: 'Polish Economic Data (2010-2024)',
    format: 'CSV',
    formatColor: '#10B981', // green
    size: '14.2 MB',
    recordsCount: '1,428,000 rows',
    period: '2010 - 2024 Annual & Monthly',
    description: 'Comprehensive historical macroeconomic dataset covering GDP, CPI inflation components, retail sales, employment, industrial output, and interest rates across Poland.',
    updateFrequency: 'Updated Monthly',
    schema: [
      { column: 'period_date', type: 'DATE', description: 'Observation ISO-8601 date (YYYY-MM-DD)' },
      { column: 'indicator_code', type: 'VARCHAR(64)', description: 'GUS / NBP standardized time-series indicator code' },
      { column: 'indicator_name', type: 'VARCHAR(255)', description: 'Human-readable indicator description' },
      { column: 'teryt_code', type: 'VARCHAR(8)', description: 'Polish territorial division identifier' },
      { column: 'value_numeric', type: 'DOUBLE', description: 'Measured value in PLN, index or percentage' },
      { column: 'unit_of_measure', type: 'VARCHAR(32)', description: 'PLN, percentage, index points, head count' }
    ],
    sampleData: [
      { period_date: '2024-12-31', indicator_code: 'MACRO_GDP_REAL_YOY', indicator_name: 'Real GDP YoY Growth', teryt_code: 'PL00', value_numeric: 3.2, unit_of_measure: '%' },
      { period_date: '2024-12-31', indicator_code: 'LABOR_UNEMPLOYMENT_REG', indicator_name: 'Registered Unemployment', teryt_code: 'PL00', value_numeric: 5.1, unit_of_measure: '%' },
      { period_date: '2024-12-31', indicator_code: 'PRICE_CPI_HEADLINE', indicator_name: 'Headline CPI Inflation', teryt_code: 'PL00', value_numeric: 5.1, unit_of_measure: '%' },
      { period_date: '2024-12-31', indicator_code: 'WAGE_AVG_GROSS_CORP', indicator_name: 'Average Gross Corporate Wage', teryt_code: 'PL00', value_numeric: 8240, unit_of_measure: 'PLN' },
      { period_date: '2024-11-30', indicator_code: 'MACRO_IND_PROD_YOY', indicator_name: 'Industrial Output YoY', teryt_code: 'PL00', value_numeric: 4.8, unit_of_measure: '%' }
    ],
    downloadUrl: '/datasets/polish_economic_data_2010_2024.csv'
  },
  {
    id: 'global-financial-indicators-parquet',
    title: 'Global Financial Indicators',
    format: 'Parquet',
    formatColor: '#3A6FA4', // azure / blue
    size: '8.4 MB (Compressed snappy)',
    recordsCount: '3,850,000 rows',
    period: '2015 - 2025 Daily',
    description: 'High-density columnar Parquet lakehouse file containing daily FX rates (USD, EUR, CHF, GBP against PLN), Warsaw Stock Exchange indices, sovereign bond yields, and commodities.',
    updateFrequency: 'Updated Daily at 18:00 CET',
    schema: [
      { column: 'timestamp_utc', type: 'TIMESTAMP', description: 'UTC timestamp of market closing snapshot' },
      { column: 'ticker_symbol', type: 'VARCHAR(16)', description: 'Standardized ticker (e.g. WIG20, USDPLN, PL10Y)' },
      { column: 'open_price', type: 'DECIMAL(12,4)', description: 'Trading session open price' },
      { column: 'close_price', type: 'DECIMAL(12,4)', description: 'Trading session official settlement price' },
      { column: 'high_price', type: 'DECIMAL(12,4)', description: 'Session intraday high' },
      { column: 'low_price', type: 'DECIMAL(12,4)', description: 'Session intraday low' },
      { column: 'volume_turnover_pln', type: 'BIGINT', description: 'Trading turnover volume in PLN' }
    ],
    sampleData: [
      { timestamp_utc: '2025-02-14 17:00:00', ticker_symbol: 'WIG20', open_price: 2320.10, close_price: 2345.67, high_price: 2352.40, low_price: 2315.00, volume_turnover_pln: 1420500000 },
      { timestamp_utc: '2025-02-14 17:00:00', ticker_symbol: 'USDPLN', open_price: 4.1380, close_price: 4.1250, high_price: 4.1450, low_price: 4.1210, volume_turnover_pln: 890000000 },
      { timestamp_utc: '2025-02-14 17:00:00', ticker_symbol: 'EURPLN', open_price: 4.4850, close_price: 4.4800, high_price: 4.4920, low_price: 4.4780, volume_turnover_pln: 1120000000 },
      { timestamp_utc: '2025-02-14 17:00:00', ticker_symbol: 'PL10Y_BOND', open_price: 5.48, close_price: 5.42, high_price: 5.50, low_price: 5.40, volume_turnover_pln: 350000000 }
    ],
    downloadUrl: '/datasets/global_financial_indicators.parquet'
  },
  {
    id: 'powerbi-analytics-template',
    title: 'Advanced Analytics Power BI Template',
    format: 'Power BI',
    formatColor: '#F59E0B', // amber
    size: '26.8 MB (.pbit)',
    recordsCount: '5 Pre-built Dashboard Pages',
    period: 'Ready-to-connect template',
    description: 'Production-ready Power BI template with pre-configured DAX measures, automated Polish map drill-down visuals, custom color palette, and direct DuckDB/Parquet connectors.',
    updateFrequency: 'Version 3.4 (2025 Edition)',
    schema: [
      { column: 'DAX_Measures', type: 'DAX Script', description: 'Over 45 optimized time-intelligence measures (YoY, MoM, YTD, Rolling 12M)' },
      { column: 'Theme_JSON', type: 'JSON Palette', description: 'Corporate Zohelo Teal & Azure accessible theme tokens' },
      { column: 'ShapeMap_PL', type: 'TopoJSON', description: 'Precise Polish voivodeship and powiat vector boundaries' },
      { column: 'SemanticModel', type: 'Star Schema', description: 'Optimized star schema connecting Dim_Date, Dim_Region, Fact_Macro' }
    ],
    sampleData: [
      { Page: 'Executive Summary', KeyVisual: 'Voivodeship Choropleth & KPI Cards', DAXCore: '[Total GDP YoY %] = CALCULATE(DIVIDE([GDP] - [GDP PY], [GDP PY]))' },
      { Page: 'Labor Market Scanner', KeyVisual: 'Unemployment vs Salary Scatter Plot', DAXCore: '[Avg Salary Real] = DIVIDE([Nominal Salary], [CPI Index])' },
      { Page: 'Public Finance Matrix', KeyVisual: 'Municipal Budget Balance Decomposition', DAXCore: '[Fiscal Deficit %] = DIVIDE([Revenues] - [Expenditures], [GDP])' }
    ],
    downloadUrl: '/datasets/zohelo_analytics_template_v3.4.pbit'
  },
  {
    id: 'municipal-budget-report-pdf',
    title: 'Municipal Budget Analysis Report',
    format: 'PDF',
    formatColor: '#EF4444', // red
    size: '4.6 MB (48 Pages)',
    recordsCount: 'Full Whitepaper + Tables',
    period: 'Annual Audit 2024/2025',
    description: 'In-depth analytical whitepaper detailing the fiscal health, investment capacity, borrowing dynamics, and European Union subsidy absorption of 2,477 Polish municipalities (gminy).',
    updateFrequency: 'Published Annually',
    schema: [
      { column: 'Executive_Summary', type: 'Analysis', description: 'National overview of local government unit (JST) fiscal balances' },
      { column: 'Regional_Rankings', type: 'Scorecard', description: 'Top 100 most solvent and investment-efficient Polish municipalities' },
      { column: 'Risk_Indicators', type: 'Econometric Model', description: 'Early-warning indicators for debt service ceiling (Art. 243 UFP)' },
      { column: 'Methodology_Appendix', type: 'Documentation', description: 'Data ingestion protocols from Regional Chambers of Audit (RIO)' }
    ],
    sampleData: [
      { Section: 'Chapter 1', Title: 'Local Government Revenues after Polish Deal Reforms', KeyMetric: 'PIT share recovery +14.2%' },
      { Section: 'Chapter 2', Title: 'Capital Expenditures & KPO Co-financing', KeyMetric: 'Total municipal CapEx 62.4B PLN' },
      { Section: 'Chapter 3', Title: 'Debt Sustainability & Operating Surpluses', KeyMetric: 'Operating margin 7.8%' }
    ],
    downloadUrl: '/datasets/municipal_budget_analysis_2025_report.pdf'
  }
];
