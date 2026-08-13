import { ProductItem } from '../types';

export const productsList: ProductItem[] = [
  {
    id: 'voivodeship-monitor',
    name: 'Voivodeship Economic Health Monitor',
    tagline: 'Real-time multi-dimensional macroeconomic surveillance for all 16 Polish regions.',
    description: 'High-frequency regional dashboard integrating GUS statistics, tax office collections, and labor demand indices into a composite regional resilience rating.',
    category: 'Macro Analysis',
    tier: 'Commercial Edition',
    features: [
      'Interactive Choropleth & Powiat-level drill-down',
      'Automated monthly anomaly detection & email alerts',
      'Direct CSV/Parquet data streaming API',
      'Custom regional benchmark comparisons'
    ],
    previewMetrics: [
      { label: 'Regions Monitored', val: '16 Voivodeships + 380 Powiats' },
      { label: 'Update Cadence', val: 'Monthly automated' },
      { label: 'Latency', val: '<35ms via DuckDB' }
    ]
  },
  {
    id: 'municipal-fiscal-scanner',
    name: 'Municipal Fiscal Scanner & JST Audit Suite',
    tagline: 'Automated fiscal solvency, debt limits (Art. 243 UFP), and investment analytics for 2,477 Polish Gminy.',
    description: 'Commercial intelligence platform designed for commercial banks, bond underwriters, and municipal treasurers to evaluate local government creditworthiness.',
    category: 'Municipal',
    tier: 'Commercial Edition',
    features: [
      'Automated Article 243 Public Finance Act debt ratio calculator',
      'Historical 10-year budget trajectory models',
      'EU grant & KPO absorption tracking',
      'Exportable PDF executive summaries for city councils'
    ],
    previewMetrics: [
      { label: 'Municipalities', val: '2,477 Gminy' },
      { label: 'Data Points', val: '12M+ line items' },
      { label: 'Accuracy', val: '100% RIO audit-verified' }
    ]
  },
  {
    id: 'housing-market-matrix',
    name: 'Polish Housing Market & Demographic Index',
    tagline: 'Granular primary and secondary residential real estate price index crossed with demographic shifts.',
    description: 'Combines transactional registry data (RCiWN) with population migration vectors to predict 5-year housing yield and supply-demand imbalances in major Polish metros.',
    category: 'Real Estate',
    tier: 'Enterprise BI',
    features: [
      'Square meter price trajectory by city district',
      'Demographic age pyramid overlay for rental demand',
      'Mortgage availability & WIBOR sensitivity analysis',
      'API access for automated appraisal engines'
    ],
    previewMetrics: [
      { label: 'Metros Covered', val: 'Top 18 Polish Cities' },
      { label: 'Granularity', val: 'District & Postal Code' },
      { label: 'Forecast Horizon', val: '1 to 5 Years' }
    ]
  },
  {
    id: 'eac-lakehouse-blueprint',
    name: 'NoOps Data Lakehouse Starter Kit (Jarvis EaC)',
    tagline: 'Deploy a complete $0.00/month DuckDB + dbt Core + Parquet data lakehouse on GCP Always-Free Tier.',
    description: 'The exact open architecture powering Zohelo.com. Includes Terraform scripts, GitHub Actions crawlers for Polish public APIs, and MetricFlow semantic schemas.',
    category: 'Enterprise BI',
    tier: 'Free Open Tier',
    features: [
      '100% Everything-as-Code (EaC) declarative repository',
      'Zero-maintenance automated ingestion from GUS & NBP',
      'DuckDB columnar analytical engine configuration',
      'Pre-built dbt Core transformation models'
    ],
    previewMetrics: [
      { label: 'Infrastructure Cost', val: '$0.00 / month' },
      { label: 'Deployment Time', val: '< 15 minutes' },
      { label: 'License', val: 'Open Source / MIT' }
    ]
  }
];
