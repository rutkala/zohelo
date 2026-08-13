import React from 'react';
import { Database, ShieldCheck, Github, FileCode, ArrowUpRight, Heart } from 'lucide-react';

interface FooterProps {
  onOpenEacModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEacModal, onNavigate }) => {
  return (
    <footer className="w-full bg-[#1E252B] text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col (Cols 1-5) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-baseline space-x-2">
              <span className="font-serif-heading text-2xl font-bold text-white tracking-tight">
                Zohelo
              </span>
              <span className="text-[10px] font-mono-code font-semibold tracking-wider text-[#4EB0BA] bg-[#3B8B94]/20 px-2 py-0.5 rounded">
                PROJECT OPEN REPORTING
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Independent data powerhouse and high-performance Data Lakehouse transforming Polish public data (GUS, NBP, Atlas Regionów) into commercial-grade intelligence and open research.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                GCP e2-micro • $0.00/mo NoOps
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-blue-950 text-blue-400 border border-blue-800">
                DuckDB + Parquet
              </span>
            </div>
          </div>

          {/* Nav Links (Cols 6-8) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation Hub
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onNavigate('pulse')} className="hover:text-white transition-colors">
                  The Pulse (Live Indicators)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('metrics')} className="hover:text-white transition-colors">
                  The Metrics (MetricFlow KPIs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compass')} className="hover:text-white transition-colors">
                  The Compass (16 Voivodeships)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('chronicles')} className="hover:text-white transition-colors">
                  The Chronicles (Research)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vault')} className="hover:text-white transition-colors">
                  The Vault (Parquet Lakehouse)
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & EaC (Cols 9-12) */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Everything-as-Code (EaC)
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Governed by CONST-01 (Declarative Code) and CONST-02 (Zero-Maintenance NoOps). Data pipelines execute via GitHub Actions, Colab DuckDB transforms, and Nginx static delivery.
            </p>
            <button
              onClick={onOpenEacModal}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#3B8B94] hover:bg-[#2C6E76] text-white text-xs font-semibold transition-all mt-1 cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Inspect Architecture Blueprint</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} Zohelo.com • Founded by <strong className="text-slate-300">Radosław Utkała</strong>.
          </div>
          <div className="flex items-center space-x-4">
            <span>Data Sources: Central Statistical Office (GUS), NBP, RIO</span>
            <span>•</span>
            <span className="text-[#3B8B94]">Tony Stark & Jarvis Model</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
