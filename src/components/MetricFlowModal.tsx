import React, { useState } from 'react';
import { X, FileCode2, Copy, Check, Database, GitBranch, Terminal, Sparkles, Cpu, Layers } from 'lucide-react';
import { MetricCardData } from '../types';
import { eacArchitecture } from '../data/eacData';

interface MetricFlowModalProps {
  isOpen: boolean;
  metric: MetricCardData | null;
  onClose: () => void;
}

export const MetricFlowModal: React.FC<MetricFlowModalProps> = ({
  isOpen,
  metric,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'yaml' | 'eac' | 'duckdb' | 'dbt'>('yaml');

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const yamlContent = metric ? metric.yamlDefinition : eacArchitecture.metricFlowYamlSample;
  const sqlContent = metric ? metric.sqlQuery : eacArchitecture.duckDbQuerySample;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#3B8B94]/10 text-[#3B8B94] flex items-center justify-center">
              <FileCode2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif-heading">
                BI-as-Code & MetricFlow Architecture
              </h2>
              <p className="text-xs text-slate-500">
                CONST-01 (Everything-as-Code) • CONST-02 (Zero-Maintenance NoOps)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopy(yamlContent)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#3B8B94]" />}
              <span>{copied ? 'Copied' : 'Copy Spec'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 bg-white flex items-center space-x-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('yaml')}
            className={`py-3 flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'yaml'
                ? 'border-[#3B8B94] text-[#3B8B94] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>MetricFlow YAML {metric ? `(${metric.metricKey})` : ''}</span>
          </button>

          <button
            onClick={() => setActiveTab('eac')}
            className={`py-3 flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'eac'
                ? 'border-[#3B8B94] text-[#3B8B94] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Tony Stark & Jarvis Model</span>
          </button>

          <button
            onClick={() => setActiveTab('duckdb')}
            className={`py-3 flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'duckdb'
                ? 'border-[#3B8B94] text-[#3B8B94] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>DuckDB Parquet Query</span>
          </button>

          <button
            onClick={() => setActiveTab('dbt')}
            className={`py-3 flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'dbt'
                ? 'border-[#3B8B94] text-[#3B8B94] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>dbt Core Lineage (Bronze → Gold)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* TAB 1: MetricFlow YAML */}
          {activeTab === 'yaml' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                <span className="font-bold text-[#3B8B94]">Decoupled UI Principle:</span> The frontend requests metrics strictly by declarative semantic name. No hardcoded database business logic in the client.
              </div>

              <div className="relative bg-[#1E293B] text-slate-100 p-4 rounded-xl font-mono-code text-xs overflow-x-auto shadow-inner border border-slate-700 leading-relaxed">
                <pre>{yamlContent}</pre>
              </div>
            </div>
          )}

          {/* TAB 2: Tony Stark & Jarvis Model */}
          {activeTab === 'eac' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#EBF5F6] border border-[#C5E4E7] rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#246A72] mb-1">
                    The Founder (Tony Stark)
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {eacArchitecture.tonyStarkJarvisModel.founder}
                  </p>
                </div>

                <div className="p-4 bg-[#EBF2F9] border border-[#C5D8EB] rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#295684] mb-1">
                    The AI Fleet (Jarvis)
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {eacArchitecture.tonyStarkJarvisModel.agents}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Immutable Architectural Laws
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {eacArchitecture.laws.map((law) => (
                    <div key={law.code} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-mono-code font-bold text-xs text-[#3B8B94]">{law.code}: {law.title}</span>
                      <p className="text-xs text-slate-600 mt-1">{law.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-2.5 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
                  Infrastructure Stack Mapping ($0.00/mo)
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {eacArchitecture.stackSummary.map((layer) => (
                    <div key={layer.layer} className="p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-slate-800 sm:w-1/4">{layer.layer}</span>
                      <span className="font-mono-code text-[#3A6FA4] sm:w-1/3 font-semibold">{layer.tech}</span>
                      <span className="text-slate-500 sm:w-5/12 text-[11px]">{layer.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DuckDB SQL */}
          {activeTab === 'duckdb' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                <span className="font-bold text-[#3B8B94]">Columnar Scan:</span> DuckDB queries compressed Parquet files directly from mounted object storage in milliseconds.
              </div>

              <div className="relative bg-[#1E293B] text-slate-100 p-4 rounded-xl font-mono-code text-xs overflow-x-auto shadow-inner border border-slate-700 leading-relaxed">
                <pre>{sqlContent}</pre>
              </div>
            </div>
          )}

          {/* TAB 4: dbt Core Lineage */}
          {activeTab === 'dbt' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                <span className="font-bold text-[#3B8B94]">Medallion Architecture:</span> Transformations transition data through Bronze (raw API scrapes), Silver (cleaned & typed parquet), and Gold (MetricFlow-ready dimensional marts).
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="font-mono-code font-bold text-amber-800 block">1. BRONZE LAYER</span>
                  <span className="text-[11px] text-amber-700">GUS API JSON / CSV Ingest</span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="font-mono-code font-bold text-blue-800 block">2. SILVER LAYER</span>
                  <span className="text-[11px] text-blue-700">dbt Cleaned & Deduped</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <span className="font-mono-code font-bold text-emerald-800 block">3. GOLD LAYER</span>
                  <span className="text-[11px] text-emerald-700">Dimensional MetricFlow Marts</span>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-300 p-3 rounded-lg font-mono-code text-xs">
                <span className="text-slate-500"># Run automated lineage verification:</span><br />
                dbt test --models gold.macro --target prod_duckdb
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Zohelo.com EaC Semantic Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#3B8B94] hover:bg-[#2C6E76] text-white font-semibold cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
