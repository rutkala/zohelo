import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Info, CheckCircle2, TrendingUp } from 'lucide-react';
import { pulseIndicators } from '../data/pulseData';
import { MarketIndicator } from '../types';

interface PulseSectionProps {
  onSelectIndicator?: (indicator: MarketIndicator) => void;
}

export const PulseSection: React.FC<PulseSectionProps> = ({ onSelectIndicator }) => {
  const [selectedIndicator, setSelectedIndicator] = useState<MarketIndicator | null>(null);

  const handleIndicatorClick = (ind: MarketIndicator) => {
    setSelectedIndicator(ind);
    if (onSelectIndicator) {
      onSelectIndicator(ind);
    }
  };

  return (
    <section id="pulse" className="w-full pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500">
              The Pulse
            </h2>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 animate-pulse">
              LIVE NBP/GUS FEED
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-1 text-[11px] text-slate-400 font-mono-code">
            <Clock className="w-3 h-3" />
            <span>Updated: Today 17:05 CET</span>
          </div>
        </div>

        {/* Pulse Capsule Container matching the exact mockup visual style */}
        <div className="bg-[#DCEFF1]/80 hover:bg-[#D7ECEF] transition-colors border border-[#C5E4E7] rounded-xl p-2.5 sm:p-3 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#C5E4E7]/60">
            {pulseIndicators.slice(0, 5).map((indicator, index) => {
              const isUp = indicator.change.startsWith('+');
              const isNeutral = indicator.change.startsWith('0');
              return (
                <div
                  key={indicator.id}
                  onClick={() => handleIndicatorClick(indicator)}
                  className={`flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all hover:bg-white/60 group ${
                    index > 0 ? 'pt-2 sm:pt-1.5' : ''
                  }`}
                  title={`Click to inspect ${indicator.name} history`}
                >
                  {/* Indicator Icon badge */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isUp
                        ? 'bg-[#3B8B94]/20 text-[#246A72]'
                        : isNeutral
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-[#3A6FA4]/20 text-[#295684]'
                    }`}
                  >
                    {isUp ? (
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>

                  {/* Indicator Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between space-x-1">
                      <span className="text-xs font-bold text-slate-800 truncate tracking-tight">
                        {indicator.symbol}
                      </span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-xs sm:text-sm font-semibold font-mono-code text-slate-900">
                        {indicator.value}
                      </span>
                      <span
                        className={`text-[11px] font-bold font-mono-code ${
                          isUp
                            ? 'text-[#2C6E76]'
                            : isNeutral
                            ? 'text-slate-600'
                            : 'text-[#3A6FA4]'
                        }`}
                      >
                        {indicator.change}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Indicator Quick Drawer / Popover */}
        {selectedIndicator && (
          <div className="mt-3 p-3.5 bg-white border border-[#3B8B94]/30 rounded-xl shadow-md animate-in fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B8B94]/10 text-[#3B8B94] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm">
                  {selectedIndicator.name} ({selectedIndicator.symbol})
                </span>
                <p className="text-slate-500 text-[11px]">
                  Data Source: {selectedIndicator.source} • Reference: {selectedIndicator.lastUpdated}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                <span className="text-slate-500 text-[11px]">Current Quote:</span>
                <span className="font-mono-code font-bold text-slate-900">{selectedIndicator.value}</span>
                <span className="font-mono-code text-emerald-600 font-semibold">{selectedIndicator.change}</span>
              </div>
              <button
                onClick={() => setSelectedIndicator(null)}
                className="text-slate-400 hover:text-slate-600 text-xs underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
