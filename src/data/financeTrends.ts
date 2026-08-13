import { FinanceTrendItem } from '../types';

export const publicFinanceTrends: FinanceTrendItem[] = [
  {
    year: '2020',
    dataValue: 255,
    azureValue: 238,
    label: 'Post-pandemic baseline recovery',
    growthYoY: '+4.2%'
  },
  {
    year: '2021',
    dataValue: 278,
    azureValue: 295,
    label: 'Rapid post-COVID industrial rebound',
    growthYoY: '+9.0%'
  },
  {
    year: '2022',
    dataValue: 290,
    azureValue: 320,
    label: 'Energy shock absorption & tax reform',
    growthYoY: '+4.3%'
  },
  {
    year: '2023',
    dataValue: 318,
    azureValue: 310,
    label: 'High inflation expenditure cycle',
    growthYoY: '+9.7%'
  },
  {
    year: '2024',
    dataValue: 342,
    azureValue: 331,
    label: 'KPO & EU Cohesion funds deployment',
    growthYoY: '+7.5%'
  },
  {
    year: '2025',
    dataValue: 365,
    azureValue: 349,
    label: 'Consolidated fiscal & infrastructure target',
    growthYoY: '+6.7%'
  }
];

export const domainCategories = [
  { id: 'public-finance', name: 'Public Finance', description: 'State budget revenues, local government spending, deficit dynamics' },
  { id: 'economic', name: 'Economic', description: 'GDP growth, industrial output, foreign direct investments' },
  { id: 'social', name: 'Social', description: 'Labor market, wage growth, disposable income, poverty rates' },
  { id: 'demographic', name: 'Demographic', description: 'Population shifts, fertility rates, urbanization, migration' }
];
