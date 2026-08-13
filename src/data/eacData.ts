export const eacArchitecture = {
  tonyStarkJarvisModel: {
    founder: 'Tony Stark: High-level strategy, editorial direction, vision, and aesthetic vibe-coding bursts.',
    agents: 'Jarvis (Autonomous AI Fleet): 100% technical implementation, continuous dbt pipeline execution, NoOps deployments.'
  },
  laws: [
    {
      code: 'CONST-01',
      title: 'Everything-as-Code (EaC)',
      description: 'Every component—data pipelines, database schemas, MetricFlow definitions, and UI layouts—must be written as declarative code (YAML, Python, SQL). Zero GUI dependencies.'
    },
    {
      code: 'CONST-02',
      title: 'Zero-Maintenance (NoOps)',
      description: 'The infrastructure requires near-zero manual IT overhead. Production serves static pre-rendered assets on GCP e2-micro ($0.00/mo) to eliminate runtime backend maintenance.'
    }
  ],
  stackSummary: [
    { layer: 'Frontend Shell', tech: 'React 19 / Vite / Tailwind CSS', role: 'Declarative metadata-driven UI consuming MetricFlow semantics' },
    { layer: 'Serving Layer', tech: 'Nginx on GCP e2-micro (Always Free)', role: 'Static asset serving, zero Python runtime in prod ($0.00/mo)' },
    { layer: 'Storage Cabinet', tech: '5TB Google Drive via rclone', role: 'Central Object Storage for raw & gold compressed Parquet files' },
    { layer: 'Local Workbench', tech: '30GB SSD Block Storage', role: 'Fast local environments & dbt repos isolated from cloud mount latency' },
    { layer: 'Analytical Engine', tech: 'DuckDB / MotherDuck', role: 'In-memory columnar analytical processing on Parquet' },
    { layer: 'Transformation', tech: 'dbt Core (Bronze → Silver → Gold)', role: 'Version-controlled SQL/YAML models and data lineage' },
    { layer: 'Semantic Layer', tech: 'MetricFlow (dbt Semantic Layer)', role: 'Declarative metric YAML definitions decoupled from UI' }
  ],
  metricFlowYamlSample: `semantic_model:
  name: poland_public_finance
  node_relation:
    alias: dim_public_finance_gold
    schema: analytics_gold
  entities:
    - name: voivodeship_id
      type: foreign
      expr: voivodeship_code
  dimensions:
    - name: fiscal_year
      type: categorical
      expr: EXTRACT(year FROM observation_date)
    - name: budget_category
      type: categorical
      expr: budget_stream_type
  measures:
    - name: total_expenditure_pln
      agg: sum
      expr: amount_expenditure_gross
    - name: total_revenue_pln
      agg: sum
      expr: amount_revenue_gross

---
metric:
  name: regional_fiscal_deficit_ratio
  label: "Voivodeship Fiscal Balance / Deficit Ratio"
  type: ratio
  type_params:
    numerator: total_expenditure_pln
    denominator: total_revenue_pln
  dimensions:
    - fiscal_year
    - voivodeship_id`,
  duckDbQuerySample: `-- Running on DuckDB in-memory engine across 5TB Cabinet Parquet:
SELECT 
  v.name_pl AS voivodeship,
  EXTRACT(year FROM f.period_date) AS fiscal_year,
  ROUND(SUM(f.value_numeric) / 1e6, 2) AS total_budget_mln_pln,
  LAG(ROUND(SUM(f.value_numeric) / 1e6, 2), 1) OVER (
    PARTITION BY v.code ORDER BY EXTRACT(year FROM f.period_date)
  ) AS prev_year_budget_mln,
  ROUND(
    (SUM(f.value_numeric) - LAG(SUM(f.value_numeric), 1) OVER (
      PARTITION BY v.code ORDER BY EXTRACT(year FROM f.period_date)
    )) / LAG(SUM(f.value_numeric), 1) OVER (
      PARTITION BY v.code ORDER BY EXTRACT(year FROM f.period_date)
    ) * 100, 2
  ) AS yoy_growth_pct
FROM read_parquet('gdrive_cabinet/gold/finance/*.parquet') f
JOIN read_parquet('gdrive_cabinet/gold/geo/dim_voivodeships.parquet') v
  ON f.teryt_code = v.code
GROUP BY 1, 2, v.code
ORDER BY fiscal_year DESC, total_budget_mln_pln DESC;`
};
