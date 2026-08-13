import { ConsultantProfile } from '../types';

export const consultantProfile: ConsultantProfile = {
  name: 'Radosław Utkała',
  title: 'Founder & Principal Consultant',
  headline: 'Analytics Solutions & Consulting',
  bio: 'Driving data-driven insights and strategic financial planning for public and private sector growth, with over 10+ years of dedicated analytics experience.',
  experienceYears: 10,
  email: 'R.Utkala@gmail.com',
  timeline: [
    {
      year: '2014',
      role: 'Junior Analyst',
      description: 'Macroeconomic modeling, SQL statistical aggregation, and econometric forecasting on Polish banking datasets.',
      milestone: 'Built automated data pipelines for national consumer credit scoring.'
    },
    {
      year: '2017',
      role: 'Senior Data Scientist',
      description: 'Advanced machine learning, predictive time-series models for enterprise pricing, and geospatial market segmentation.',
      milestone: 'Led predictive analytics team delivering multi-million PLN revenue optimizations.'
    },
    {
      year: '2020',
      role: 'Analytics Manager',
      description: 'Executive strategy, enterprise BI architecture, cloud lakehouse transitions, and cross-functional engineering leadership.',
      milestone: 'Engineered modern data stack serving 500+ daily decision-makers across Europe.'
    },
    {
      year: '2024',
      role: 'Founder & Principal Consultant',
      description: 'Zohelo.com (Project Open Reporting), specialized B2B strategic advisory, public sector analytics, and NoOps data architecture.',
      milestone: 'Pioneered Zero-Maintenance (NoOps) Lakehouse architecture on Polish public data.'
    }
  ],
  consultingSpecialties: [
    'Public Sector & Municipal Data Strategy',
    'Modern Data Stack (DuckDB, dbt Core, Parquet, MetricFlow)',
    'Macroeconomic Risk & Sovereign Debt Analytics',
    'Zero-Maintenance (NoOps) Cloud Infrastructure',
    'Executive BI Dashboards & Boardroom Storytelling'
  ]
};
