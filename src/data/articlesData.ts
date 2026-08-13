import { ArticleItem } from '../types';

export const articlesList: ArticleItem[] = [
  {
    id: 'market-bulletin-q1-2025',
    title: 'Market Bulletin: Q1 2025 Economic Analysis',
    subtitle: 'Quarterly macroeconomic pulse across Polish industrial production and retail spending',
    summary: 'Summary of economic market trends and forecasts, macroeconomic indicators, labor dynamics, and fiscal trajectory across Polish regions.',
    iconType: 'chart',
    category: 'Macroeconomic Bulletin',
    readTime: '6 min read',
    publishDate: 'February 2025',
    author: 'Radosław Utkała',
    authorRole: 'Founder & Principal Consultant',
    tags: ['GDP Growth', 'Industrial Production', 'GUS Quarterly', 'Fiscal Deficit'],
    fullContent: [
      'The first quarter of 2025 signals a decisive transition for the Polish economy from consumption-led recovery toward capital-intensive investment cycles. According to updated national accounts from the Central Statistical Office (GUS), real GDP expanded at an annualized rate of 3.2% YoY, outpacing the Eurozone average of 1.1%.',
      'Key growth catalysts include the accelerating disbursement of National Recovery Plan (KPO) funds and cohesion grants, which are invigorating municipal infrastructure, energy decarbonization projects, and railway modernization across the Silesian and Mazovian corridors.',
      'Industrial production expanded by 4.8% YoY, propelled by automotive electrical equipment, specialized machinery, and chemical exports. Meanwhile, private household consumption demonstrated resilient demand despite persistent food and energy price pressures, buoyed by real wage growth of +8.7% YoY in corporate enterprises.'
    ],
    keyDataPoints: [
      { label: 'Real GDP YoY', value: '+3.2%', context: 'Above baseline forecast of 2.8%' },
      { label: 'Corporate Real Wage Growth', value: '+8.7%', context: 'GUS Enterprise sector index' },
      { label: 'Gross Fixed Capital Formation', value: '+5.4%', context: 'Accelerated by KPO disbursements' }
    ]
  },
  {
    id: 'academic-research-digital-transformation',
    title: 'Academic Research Paper: The Impact of Digital Transformation on Polish SMEs',
    subtitle: 'An empirical econometric study of 1,200 enterprises across 16 Voivodeships',
    summary: 'Driving data-driven insights paper: the empirical impact of digital transformation on Polish SMEs productivity, export competitiveness, and cloud adoption.',
    iconType: 'paper',
    category: 'Peer-Reviewed Research',
    readTime: '12 min read',
    publishDate: 'January 2025',
    author: 'Dr. M. Wiśniewski & R. Utkała',
    authorRole: 'Open Reporting Research Lab',
    tags: ['Digital Economy', 'SME Productivity', 'Econometrics', 'Cloud Adoption'],
    fullContent: [
      'This empirical paper assesses the microeconomic impact of digital modernization across small and medium enterprises (SMEs) in Poland between 2020 and 2024. Utilizing panel regressions on a sample of 1,200 manufacturing and service firms, we identify a statistically significant 18.4% productivity premium for firms integrating unified data warehousing and automated ERP pipelines.',
      'Regional disparities remain prominent: enterprises located in Lower Silesia (Wrocław), Greater Poland (Poznań), and Mazovia demonstrate an average digital maturity index of 76/100, whereas eastern voivodeships average 52/100.',
      'Crucially, our findings indicate that government co-financing programs paired with lightweight "Everything-as-Code" architectures yield higher ROI compared to monolithic proprietary enterprise suites, directly lowering operating IT overhead by 65%.'
    ],
    keyDataPoints: [
      { label: 'Total Sample Size', value: '1,200 Firms', context: 'Stratified across all 16 regions' },
      { label: 'Productivity Lift', value: '+18.4%', context: 'Calculated via Total Factor Productivity (TFP)' },
      { label: 'IT Overhead Reduction', value: '-65%', context: 'Modern declarative stack vs legacy ERP' }
    ]
  },
  {
    id: 'economic-outlook-central-europe',
    title: 'Economic Outlook: Navigating Global Challenges in Central Europe',
    subtitle: 'Supply chain nearshoring, energy transition, and monetary policy synchronization',
    summary: 'Summary of Economic Outlook: Navigating Global challenges in Central Europe, supply chain reshoring, trade flows with Germany, and currency volatility.',
    iconType: 'megaphone',
    category: 'Strategic Policy Paper',
    readTime: '8 min read',
    publishDate: 'December 2024',
    author: 'Zohelo Macro Team',
    authorRole: 'Economic Intelligence Unit',
    tags: ['CEE Region', 'Supply Chains', 'Nearshoring', 'NBP Policy'],
    fullContent: [
      'Central and Eastern Europe stands at a pivotal geo-economic juncture. As Western European manufacturers recalibrate their supply chains toward nearshore regional partners, Poland, the Czech Republic, and Hungary continue to capture strategic high-value manufacturing contracts.',
      'Poland in particular has consolidated its position as Europe’s premier hub for lithium-ion battery production and automotive electronics, with foreign direct investment (FDI) inflows exceeding 28 billion PLN in 2024.',
      'The paper highlights monetary policy challenges confronting the Monetary Policy Council (RPP) as inflation stabilizes within the 4.5%–5.5% band amidst robust domestic consumer demand.'
    ],
    keyDataPoints: [
      { label: 'Annual FDI Inflow', value: '28.4B PLN', context: 'Led by greenfield manufacturing' },
      { label: 'Export to EU Share', value: '74.2%', context: 'Germany remains top partner (27.8%)' },
      { label: 'Energy Grid CapEx', value: '+22.1%', context: 'Baltic offshore wind & PV rollout' }
    ]
  },
  {
    id: 'data-science-in-public-policy',
    title: 'Data Science in Public Policy: A Case Study',
    subtitle: 'From raw public registries to predictive municipal budgeting and healthcare allocation',
    summary: 'Data science in public policy: an end-to-end overview of municipal budget optimization, geospatial demographic modeling, and automated data pipelines.',
    iconType: 'network',
    category: 'Applied Data Science',
    readTime: '9 min read',
    publishDate: 'November 2024',
    author: 'Radosław Utkała',
    authorRole: 'Founder & Principal Consultant',
    tags: ['Public Sector AI', 'DuckDB', 'Municipal Budgeting', 'NoOps Pipeline'],
    fullContent: [
      'Public administration entities in Poland generate vast troves of structured data—spanning the GUS Local Data Bank (BDL), Public Information Bulletins (BIP), and regional treasury audits—yet less than 5% of these assets are actively utilized for evidence-based policymaking.',
      'In this operational case study, we demonstrate how a zero-maintenance "BI-as-Code" pipeline combining DuckDB, dbt Core, and Parquet on cloud object storage enabled a medium-sized municipality to predict property tax revenues with 98.4% accuracy.',
      'By decoupling analytical metric definitions into MetricFlow YAML schemas, municipal analysts gained the ability to query complex demographic aging ratios in milliseconds without requiring dedicated on-premise database servers.'
    ],
    keyDataPoints: [
      { label: 'Forecast Accuracy', value: '98.4%', context: 'Municipal revenue projection model' },
      { label: 'Query Latency', value: '<42ms', context: 'DuckDB columnar scan on 5M rows' },
      { label: 'Infrastructure Cost', value: '$0.00/mo', context: 'GCP Always-Free Tier compliance' }
    ]
  }
];
