import React, { useState } from 'react';
import { X, MapPin, Download, Filter, TrendingUp, Users, DollarSign, Building2, BarChart3, ChevronRight, ArrowUpDown } from 'lucide-react';
import { polandVoivodeships } from '../data/polandRegions';
import { VoivodeshipData } from '../types';

interface DataVisualizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVoivodeship?: VoivodeshipData;
}

export const DataVisualizationModal: React.FC<DataVisualizationModalProps> = ({
  isOpen,
  onClose,
  initialVoivodeship
}) => {
  const [selectedRegion, setSelectedRegion] = useState<VoivodeshipData>(initialVoivodeship || polandVoivodeships[0]);
  const [metricSort, setMetricSort] = useState<'gdp' | 'population' | 'unemployment' | 'salary'>('gdp');
  const [sortAsc, setSortAsc] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Filtered and sorted regions
  const sortedRegions = [...polandVoivodeships]
    .filter((r) => r.namePl.toLowerCase().includes(searchTerm.toLowerCase()) || r.capital.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let valA = 0;
      let valB = 0;
      if (metricSort === 'gdp') {
        valA = a.gdpPerCapitaPln;
        valB = b.gdpPerCapitaPln;
      } else if (metricSort === 'population') {
        valA = a.populationNum;
        valB = b.populationNum;
      } else if (metricSort === 'unemployment') {
        valA = a.unemploymentRate;
        valB = b.unemploymentRate;
      } else if (metricSort === 'salary') {
        valA = a.avgSalaryPln;
        valB = b.avgSalaryPln;
      }
      return sortAsc ? valA - valB : valB - valA;
    });

  const maxGdp = Math.max(...polandVoivodeships.map((r) => r.gdpPerCapitaPln));

  const handleExportCsv = () => {
    const headers = 'Voivodeship,Code,Capital,Population,GDP_Per_Capita_PLN,Unemployment_Rate,Avg_Salary_PLN,Innovation_Score\n';
    const rows = sortedRegions.map(r => 
      `"${r.namePl}","${r.code}","${r.capital}","${r.population}",${r.gdpPerCapitaPln},${r.unemploymentRate},${r.avgSalaryPln},${r.innovationScore}`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `zohelo_voivodeships_analysis_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#3B8B94]/10 text-[#3B8B94] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif-heading">
                Polish Regional Analytics Studio
              </h2>
              <p className="text-xs text-slate-500">
                GUS Local Data Bank (BDL) & Regional Economic Accounts • 16 Voivodeships
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#3B8B94]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search region or capital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#3B8B94]"
              />
            </div>

            {/* Metric Sorter */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-500 font-medium">Rank by:</span>
              <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-slate-200">
                {[
                  { key: 'gdp', label: 'GDP / Cap' },
                  { key: 'salary', label: 'Salary' },
                  { key: 'unemployment', label: 'Unemployment' },
                  { key: 'population', label: 'Population' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      if (metricSort === item.key) {
                        setSortAsc(!sortAsc);
                      } else {
                        setMetricSort(item.key as any);
                        setSortAsc(false);
                      }
                    }}
                    className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                      metricSort === item.key
                        ? 'bg-[#3B8B94] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dual Split: Rankings Table on Left & Selected Region Deep Dive on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Rankings Table (Cols 1-7) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3 bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Voivodeship Rankings ({sortedRegions.length})</span>
                <span className="text-slate-400 font-normal text-[11px]">Click row to inspect</span>
              </div>

              <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                {sortedRegions.map((region, idx) => {
                  const isSelected = selectedRegion.id === region.id;
                  const gdpPct = (region.gdpPerCapitaPln / maxGdp) * 100;

                  return (
                    <div
                      key={region.id}
                      onClick={() => setSelectedRegion(region)}
                      className={`p-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#EBF5F6] border-l-4 border-l-[#3B8B94]' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-mono-code text-xs font-bold text-slate-400 w-5 text-right">
                          {idx + 1}.
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                            <span>{region.namePl}</span>
                            <span className="text-[10px] font-mono-code font-normal text-slate-400">({region.code})</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Capital: {region.capital} • Pop: {region.population}
                          </div>
                        </div>
                      </div>

                      {/* Bar indicator & metric */}
                      <div className="text-right flex items-center space-x-3">
                        <div className="w-20 hidden sm:block">
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${gdpPct}%` }}
                              className="h-full bg-[#3B8B94] rounded-full"
                            />
                          </div>
                        </div>
                        <div className="font-mono-code font-bold text-xs text-slate-800">
                          {metricSort === 'gdp' && `${region.gdpPerCapitaPln.toLocaleString()} PLN`}
                          {metricSort === 'salary' && `${region.avgSalaryPln.toLocaleString()} PLN`}
                          {metricSort === 'unemployment' && `${region.unemploymentRate}%`}
                          {metricSort === 'population' && region.population}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Region Deep Dive Card (Cols 8-12) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center space-x-1 text-[#3B8B94] font-bold text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedRegion.code}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-serif-heading">
                    {selectedRegion.namePl}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Regional Capital: <strong className="text-slate-700">{selectedRegion.capital}</strong>
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#3B8B94] text-white flex items-center justify-center font-bold text-xs">
                  {selectedRegion.gdpSharePercent}%
                </div>
              </div>

              {/* 4 Quick Stat Pills */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">GDP / Capita</span>
                  <div className="font-mono-code text-sm font-bold text-slate-900">
                    {selectedRegion.gdpPerCapitaPln.toLocaleString()} PLN
                  </div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg Gross Salary</span>
                  <div className="font-mono-code text-sm font-bold text-slate-900">
                    {selectedRegion.avgSalaryPln.toLocaleString()} PLN
                  </div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Unemployment</span>
                  <div className="font-mono-code text-sm font-bold text-emerald-700">
                    {selectedRegion.unemploymentRate}%
                  </div>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Innovation Score</span>
                  <div className="font-mono-code text-sm font-bold text-[#3A6FA4]">
                    {selectedRegion.innovationScore} / 100
                  </div>
                </div>
              </div>

              {/* Top Industrial Sectors */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  Core Industrial Sectors:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRegion.topSectors.map((sector, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Insight */}
              <div className="p-3 bg-[#EBF5F6] border border-[#C5E4E7] rounded-lg text-xs text-[#246A72] leading-relaxed">
                <strong>Macroeconomic Profile:</strong> {selectedRegion.keyInsight}
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Source: GUS Central Statistical Office & Regional Chambers of Audit (RIO)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold cursor-pointer"
          >
            Close Studio
          </button>
        </div>

      </div>
    </div>
  );
};
