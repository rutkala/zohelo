import React, { useState, useEffect } from 'react';
import { Search, MapPin, FileText, Download, TrendingUp, Cpu, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { pulseIndicators } from '../data/pulseData';
import { polandVoivodeships } from '../data/polandRegions';
import { articlesList } from '../data/articlesData';
import { vaultDatasets } from '../data/datasetsData';
import { productsList } from '../data/productsData';
import { VoivodeshipData, ArticleItem, DatasetItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRegion: (region: VoivodeshipData) => void;
  onSelectArticle: (article: ArticleItem) => void;
  onSelectDataset: (dataset: DatasetItem) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectRegion,
  onSelectArticle,
  onSelectDataset,
  onNavigateSection
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle open/close
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredRegions = polandVoivodeships.filter(r => 
    r.namePl.toLowerCase().includes(query.toLowerCase()) || 
    r.capital.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredArticles = articlesList.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.summary.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredDatasets = vaultDatasets.filter(d =>
    d.title.toLowerCase().includes(query.toLowerCase()) ||
    d.format.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-[#3B8B94]" />
          <input
            type="text"
            autoFocus
            placeholder="Search indicators, 16 voivodeships, research chronicles, or datasets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* Quick Navigation Sections */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
              Jump to Section
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { name: 'The Pulse', id: 'pulse' },
                { name: 'The Metrics', id: 'metrics' },
                { name: 'The Compass', id: 'compass' },
                { name: 'The Chronicles', id: 'chronicles' },
                { name: 'The Vault', id: 'vault' },
                { name: 'The Products', id: 'products' },
                { name: 'Consulting', id: 'consulting' },
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    onNavigateSection(sec.id);
                    onClose();
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-left bg-slate-50 hover:bg-[#EBF5F6] hover:text-[#2C6E76] transition-colors font-medium text-slate-700 flex items-center justify-between"
                >
                  <span>{sec.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-40" />
                </button>
              ))}
            </div>
          </div>

          {/* Regional Data Results */}
          {filteredRegions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-2">
                Voivodeships ({filteredRegions.length})
              </span>
              <div className="space-y-1">
                {filteredRegions.map((region) => (
                  <div
                    key={region.id}
                    onClick={() => {
                      onSelectRegion(region);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <MapPin className="w-4 h-4 text-[#3B8B94]" />
                      <span className="font-bold text-slate-800 group-hover:text-[#3B8B94]">{region.namePl}</span>
                      <span className="text-slate-400 text-[11px]">Capital: {region.capital}</span>
                    </div>
                    <span className="font-mono-code font-bold text-slate-700">{region.gdpPerCapitaPln.toLocaleString()} PLN</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chronicles / Research Results */}
          {filteredArticles.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-2">
                Research & Chronicles
              </span>
              <div className="space-y-1">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-4 h-4 text-[#3A6FA4]" />
                      <span className="font-bold text-slate-800 group-hover:text-[#3B8B94] truncate max-w-md">{art.title}</span>
                    </div>
                    <span className="text-slate-400 font-mono-code text-[11px]">{art.readTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dataset Results */}
          {filteredDatasets.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-2">
                The Vault Datasets
              </span>
              <div className="space-y-1">
                {filteredDatasets.map((ds) => (
                  <div
                    key={ds.id}
                    onClick={() => {
                      onSelectDataset(ds);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Download className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-800 group-hover:text-[#3B8B94]">{ds.title}</span>
                    </div>
                    <span className="font-mono-code px-1.5 py-0.5 rounded bg-slate-100 font-bold">{ds.format}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span>Navigate with click</span>
            <span>•</span>
            <span>ESC to close</span>
          </div>
          <span className="font-mono-code text-[#3B8B94]">Zohelo Command Bar</span>
        </div>

      </div>
    </div>
  );
};
