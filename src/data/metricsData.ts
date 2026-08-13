import { MetricCardData } from '../types';

export const declarativeMetrics: MetricCardData[] = [
  {
    id: 'gdp-growth',
    metricKey: 'poland_real_gdp_growth_yoy',
    title: 'GDP Growth (Poland)',
    currentValue: '+3.2%',
    numericValue: 3.2,
    badgeValue: '+3.2%',
    isPositiveDelta: true,
    trendDirection: 'up',
    benchmark: 'EU Average: +1.1%',
    description: 'Quarterly real gross domestic product annualized YoY rate according to GUS national accounts.',
    sparklinePoints: [
      { date: '2023 Q1', value: 0.5 },
      { date: '2023 Q2', value: 0.8 },
      { date: '2023 Q3', value: 1.5 },
      { date: '2023 Q4', value: 1.9 },
      { date: '2024 Q1', value: 2.1 },
      { date: '2024 Q2', value: 2.7 },
      { date: '2024 Q3', value: 3.2 }
    ],
    yamlDefinition: `metric:
  name: poland_real_gdp_growth_yoy
  label: "Poland Real GDP Growth (YoY)"
  description: "Quarterly real GDP YoY percentage change calculated from constant prices."
  type: cumulative
  type_params:
    measure: gdp_constant_prices_pln
    window: 4 quarters
  grain: quarter
  dimensions:
    - voivodeship_code
    - economic_sector
  sql: |
    SELECT 
      quarter_end_date,
      (SUM(gdp_constant_val) - LAG(SUM(gdp_constant_val), 4) OVER (ORDER BY quarter_end_date)) 
      / LAG(SUM(gdp_constant_val), 4) OVER (ORDER BY quarter_end_date) * 100 AS poland_real_gdp_growth_yoy
    FROM analytics_gold.dim_national_accounts
    GROUP BY 1`,
    sqlQuery: `SELECT quarter_end_date, ROUND(gdp_growth_yoy, 2) AS value FROM analytics_gold.fct_macro_kpi WHERE indicator = 'GDP_REAL' ORDER BY quarter_end_date DESC LIMIT 8;`,
    dbtModel: `models/gold/macro/fct_gdp_quarterly.sql`
  },
  {
    id: 'unemployment-rate',
    metricKey: 'poland_registered_unemployment_rate',
    title: 'Unemployment Rate',
    currentValue: '5.1%',
    numericValue: 5.1,
    badgeValue: '-6.5%',
    isPositiveDelta: true, // Decreasing unemployment is positive
    trendDirection: 'down',
    benchmark: 'Historical Avg (10y): 7.2%',
    description: 'Registered unemployment rate published monthly by the Central Statistical Office (GUS).',
    sparklinePoints: [
      { date: '2024 Jan', value: 5.4 },
      { date: '2024 Mar', value: 5.3 },
      { date: '2024 May', value: 5.0 },
      { date: '2024 Jul', value: 4.9 },
      { date: '2024 Sep', value: 5.0 },
      { date: '2024 Nov', value: 5.1 },
      { date: '2025 Jan', value: 5.1 }
    ],
    yamlDefinition: `metric:
  name: poland_registered_unemployment_rate
  label: "Registered Unemployment Rate"
  description: "Share of registered unemployed persons in the economically active civilian population."
  type: ratio
  type_params:
    numerator: registered_unemployed_count
    denominator: civilian_active_labor_force
  grain: month
  dimensions:
    - county_teryt_code
    - age_group
    - gender
  sql: |
    SELECT 
      reporting_month,
      (SUM(unemployed_persons_total) * 100.0) / NULLIF(SUM(active_labor_force_total), 0) AS unemployment_rate
    FROM analytics_gold.dim_labor_market_gus
    GROUP BY 1`,
    sqlQuery: `SELECT reporting_month, ROUND(unemployment_rate, 2) AS rate FROM analytics_gold.fct_labor_monthly WHERE teryt_level = 'NATIONAL' ORDER BY reporting_month DESC LIMIT 12;`,
    dbtModel: `models/gold/labor/fct_unemployment_monthly.sql`
  },
  {
    id: 'inflation-cpi',
    metricKey: 'poland_cpi_inflation_rate_yoy',
    title: 'Inflation (CPI)',
    currentValue: '5.1%',
    numericValue: 5.1,
    badgeValue: '+0.2%',
    isPositiveDelta: false, // rising inflation
    trendDirection: 'up',
    benchmark: 'NBP Target Range: 2.5% ± 1pp',
    description: 'Consumer Price Index YoY change tracking food, energy, services, and core goods basket.',
    sparklinePoints: [
      { date: '2024 Q1', value: 2.8 },
      { date: '2024 Q2', value: 3.4 },
      { date: '2024 Q3', value: 4.3 },
      { date: '2024 Q4', value: 4.7 },
      { date: '2025 Q1', value: 5.0 },
      { date: '2025 Q2', value: 5.1 }
    ],
    yamlDefinition: `metric:
  name: poland_cpi_inflation_rate_yoy
  label: "CPI Inflation Rate (YoY)"
  description: "Laspeyres index based on annual household expenditure survey weightings."
  type: expression
  type_params:
    expression: "weighted_sum(basket_item_price_change * item_weight_coicop)"
  grain: month
  dimensions:
    - coicop_category
    - is_core_inflation_component
  sql: |
    SELECT 
      observation_month,
      SUM(subindex_price_relative * category_weight) / 100.0 AS cpi_yoy
    FROM analytics_gold.dim_cpi_gus_basket
    GROUP BY 1`,
    sqlQuery: `SELECT observation_month, cpi_yoy, core_cpi_yoy FROM analytics_gold.fct_cpi_indices ORDER BY observation_month DESC LIMIT 12;`,
    dbtModel: `models/gold/prices/fct_cpi_timeseries.sql`
  },
  {
    id: 'average-wage',
    metricKey: 'poland_average_gross_wage_corporate',
    title: 'Average Gross Salary',
    currentValue: '8,240 PLN',
    numericValue: 8240,
    badgeValue: '+8.7%',
    isPositiveDelta: true,
    trendDirection: 'up',
    benchmark: 'Monthly Corporate Sector (>9 emp)',
    description: 'Average monthly gross salary and wages in enterprise sector published by GUS.',
    sparklinePoints: [
      { date: '2024 Jan', value: 7768 },
      { date: '2024 Mar', value: 8408 },
      { date: '2024 Jun', value: 8144 },
      { date: '2024 Sep', value: 8189 },
      { date: '2024 Nov', value: 8320 },
      { date: '2025 Jan', value: 8240 }
    ],
    yamlDefinition: `metric:
  name: poland_average_gross_wage_corporate
  label: "Average Gross Salary in Enterprise Sector"
  description: "Gross remuneration per employee including bonuses and overtime."
  type: simple
  type_params:
    measure: gross_payroll_sum / employee_headcount
  grain: month
  dimensions:
    - pkd_industry_section
    - enterprise_size_bracket`,
    sqlQuery: `SELECT reporting_period, avg_salary_gross_pln FROM analytics_gold.fct_wages_gus ORDER BY reporting_period DESC LIMIT 12;`,
    dbtModel: `models/gold/wages/fct_corporate_salaries.sql`
  }
];
