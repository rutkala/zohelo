import React, { useState } from 'react';
import { MapPin, TrendingUp, BarChart3, Layers, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { polandVoivodeships } from '../data/polandRegions';
import { publicFinanceTrends, domainCategories } from '../data/financeTrends';
import { VoivodeshipData } from '../types';

interface CompassSectionProps {
  onOpenExploreVisualization: (selectedRegion?: VoivodeshipData) => void;
}

export const CompassSection: React.FC<CompassSectionProps> = ({ onOpenExploreVisualization }) => {
  const [selectedDomain, setSelectedDomain] = useState('public-finance');
  const [hoveredVoivodeship, setHoveredVoivodeship] = useState<VoivodeshipData>(polandVoivodeships[0]);
  const [pinnedVoivodeship, setPinnedVoivodeship] = useState<VoivodeshipData | null>(null);

  const currentVoivodeship = pinnedVoivodeship || hoveredVoivodeship || polandVoivodeships[0];

  // SVG Geographic Path coordinates for Poland's 16 Voivodeships
  // Scaled cleanly for a 500x480 coordinate box
  const voivodeshipPaths: { [key: string]: string } = {
    'pomorskie': 'M 195,30 L 260,25 L 310,45 L 305,95 L 265,115 L 225,120 L 195,100 L 180,65 Z',
    'warminsko-mazurskie': 'M 310,45 L 390,40 L 420,70 L 405,125 L 345,130 L 305,95 Z',
    'podlaskie': 'M 420,70 L 475,105 L 465,190 L 425,215 L 385,185 L 405,125 Z',
    'zachodniopomorskie': 'M 95,60 L 180,65 L 195,100 L 175,150 L 130,165 L 85,130 L 70,85 Z',
    'kujawsko-pomorskie': 'M 225,120 L 265,115 L 315,135 L 295,190 L 240,200 L 205,165 L 225,120 Z',
    'mazowieckie': 'M 305,95 L 345,130 L 405,125 L 385,185 L 425,215 L 395,280 L 325,270 L 290,225 L 295,190 L 315,135 Z',
    'wielkopolskie': 'M 130,165 L 175,150 L 205,165 L 240,200 L 235,265 L 170,270 L 125,235 L 130,165 Z',
    'lubuskie': 'M 85,130 L 130,165 L 125,235 L 80,240 L 65,175 Z',
    'dolnoslaskie': 'M 80,240 L 125,235 L 170,270 L 185,325 L 135,360 L 85,320 Z',
    'lodzkie': 'M 240,200 L 290,225 L 325,270 L 285,315 L 235,305 L 235,265 Z',
    'lubelskie': 'M 395,280 L 455,270 L 465,365 L 395,375 L 375,325 L 395,280 Z',
    'opolskie': 'M 170,270 L 205,275 L 220,335 L 185,360 L 185,325 Z',
    'slaskie': 'M 205,275 L 260,285 L 265,365 L 225,385 L 210,355 L 220,335 Z',
    'swietokrzyskie': 'M 285,315 L 325,270 L 375,325 L 350,370 L 295,360 Z',
    'malopolskie': 'M 265,365 L 350,370 L 340,435 L 270,440 L 255,395 Z',
    'podkarpackie': 'M 350,370 L 395,375 L 440,385 L 430,465 L 355,445 L 340,435 Z'
  };

  return (
    <section id="compass" className="w-full pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500">
              The Compass
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Regional Economic & Demographic Intelligence (16 Voivodeships)
            </p>
          </div>

          {/* Domain Category Filter Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
            {domainCategories.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedDomain === domain.id
                    ? 'bg-white text-[#2C6E76] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {domain.name}
              </button>
            ))}
          </div>
        </div>

        {/* The Main Flagship Compass Card matching the exact Mockup Layout */}
        <div className="zohelo-card p-6 sm:p-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN (Cols 1-6): Interactive Choropleth Map of Poland */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              
              <div className="w-full max-w-[460px] aspect-square relative flex items-center justify-center">
                <svg
                  viewBox="50 15 440 460"
                  className="w-full h-full drop-shadow-sm transition-all"
                >
                  <defs>
                    <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                    </filter>
                  </defs>

                  {/* Render 16 Voivodeship Geometries */}
                  {polandVoivodeships.map((region) => {
                    const pathD = voivodeshipPaths[region.id];
                    if (!pathD) return null;
                    const isSelected = currentVoivodeship.id === region.id;
                    const isPinned = pinnedVoivodeship?.id === region.id;

                    return (
                      <g key={region.id}>
                        <path
                          d={pathD}
                          fill={isSelected ? '#25636C' : region.colorIntensity}
                          stroke="#FFFFFF"
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                          strokeLinejoin="round"
                          className="cursor-pointer transition-all duration-200 hover:opacity-95 hover:brightness-110"
                          onMouseEnter={() => setHoveredVoivodeship(region)}
                          onClick={() => {
                            setPinnedVoivodeship(isPinned ? null : region);
                            setHoveredVoivodeship(region);
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Map Floating Legend / Voivodeship Pill */}
                <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-lg p-2.5 shadow-sm text-xs max-w-[200px]">
                  <div className="flex items-center space-x-1.5 text-[#3B8B94] font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentVoivodeship.namePl}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Capital: <span className="font-semibold text-slate-800">{currentVoivodeship.capital}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    GDP / cap: <span className="font-mono-code font-bold text-slate-900">{currentVoivodeship.gdpPerCapitaPln.toLocaleString()} PLN</span>
                  </div>
                </div>
              </div>

              {/* Quick voivodeship switcher pill bar */}
              <div className="w-full flex items-center justify-center gap-1.5 flex-wrap mt-2 text-[10px]">
                {polandVoivodeships.slice(0, 6).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setHoveredVoivodeship(v);
                      setPinnedVoivodeship(v);
                    }}
                    className={`px-2 py-0.5 rounded-full border transition-all ${
                      currentVoivodeship.id === v.id
                        ? 'bg-[#3B8B94] text-white border-[#3B8B94]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {v.namePl}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN (Cols 7-12): Public Finance Trends (2024-2025) Dual Bar Chart matching Mockup */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              
              {/* Chart Header & Legend matching Mockup */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                    Public Finance Trends (2024-2025)
                  </h3>

                  {/* Dual Color Legend as seen in mockup: Data (Teal) vs Azure (Blue) */}
                  <div className="flex items-center space-x-4 text-xs font-semibold">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-xs bg-[#3B8B94]" />
                      <span className="text-slate-700">Data</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-xs bg-[#3A6FA4]" />
                      <span className="text-slate-700">Azure</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Indexed comparative fiscal expenditure and revenue dynamics (GUS Gold & Regional Treasury Audits).
                </p>
              </div>

              {/* Dual Bar Chart with Y-Axis (0, 100, 200, 300, 400) and Years (2020-2025) */}
              <div className="relative pt-4 pb-2">
                
                {/* Horizontal Y-Grid lines */}
                <div className="h-56 w-full flex flex-col justify-between absolute inset-0 pointer-events-none pr-4">
                  {[400, 300, 200, 100, 0].map((val) => (
                    <div key={val} className="w-full flex items-center">
                      <span className="font-mono-code text-[10px] text-slate-400 w-8 text-right pr-2">
                        {val}
                      </span>
                      <div className="flex-1 border-b border-slate-100" />
                    </div>
                  ))}
                </div>

                {/* Bars Container */}
                <div className="h-56 ml-8 flex items-end justify-between pt-4 px-2 relative z-10">
                  {publicFinanceTrends.map((item) => {
                    // Normalize bar height based on 400 max scale
                    const maxScale = 400;
                    const dataHeightPct = (item.dataValue / maxScale) * 100;
                    const azureHeightPct = (item.azureValue / maxScale) * 100;

                    return (
                      <div key={item.year} className="flex flex-col items-center group flex-1 max-w-[56px] mx-1">
                        
                        {/* Bars Pair */}
                        <div className="w-full flex items-end justify-center space-x-1 h-44 pb-1">
                          
                          {/* Teal Bar: "Data" */}
                          <div
                            style={{ height: `${dataHeightPct}%` }}
                            className="w-4 sm:w-5 bg-[#3B8B94] rounded-t-xs hover:bg-[#2C6E76] transition-all relative group/bar"
                            title={`Data ${item.year}: ${item.dataValue} index (${item.growthYoY})`}
                          >
                            <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono-code py-0.5 px-1.5 rounded pointer-events-none z-20 whitespace-nowrap">
                              {item.dataValue}
                            </div>
                          </div>

                          {/* Azure Bar: "Azure" */}
                          <div
                            style={{ height: `${azureHeightPct}%` }}
                            className="w-4 sm:w-5 bg-[#3A6FA4] rounded-t-xs hover:bg-[#285382] transition-all relative group/bar"
                            title={`Azure Benchmark ${item.year}: ${item.azureValue} index`}
                          >
                            <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono-code py-0.5 px-1.5 rounded pointer-events-none z-20 whitespace-nowrap">
                              {item.azureValue}
                            </div>
                          </div>

                        </div>

                        {/* Year Label on X-Axis matching Mockup */}
                        <span className="text-xs font-semibold text-slate-700 font-mono-code pt-1.5">
                          {item.year}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Regional Insight Snippet for selected Voivodeship */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl flex items-center justify-between text-xs">
                <div className="flex-1 pr-3">
                  <span className="font-bold text-slate-900">{currentVoivodeship.namePl} Focus:</span>{' '}
                  <span className="text-slate-600">{currentVoivodeship.keyInsight}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Unemployment</span>
                  <span className="font-mono-code font-bold text-emerald-700">{currentVoivodeship.unemploymentRate}%</span>
                </div>
              </div>

            </div>

          </div>

          {/* Centered Big Action Button matching Mockup: "Explore Data Visualization" */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-center">
            <button
              onClick={() => onOpenExploreVisualization(currentVoivodeship)}
              className="group inline-flex items-center space-x-2.5 px-8 py-3 rounded-lg bg-[#3B8B94] hover:bg-[#2C6E76] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Explore Data Visualization</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
