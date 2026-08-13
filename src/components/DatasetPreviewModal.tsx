import React, { useState } from 'react';
import { X, Table2, Code2, Download, Database, Play, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DatasetItem } from '../types';

interface DatasetPreviewModalProps {
  dataset: DatasetItem | null;
  onClose: () => void;
  onDownload: (dataset: DatasetItem) => void;
}

export const DatasetPreviewModal: React.FC<DatasetPreviewModalProps> = ({
  dataset,
  onClose,
  onDownload
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'schema' | 'duckdb'>('preview');
  const [customSql, setCustomSql] = useState<string>('');
  const [sqlResult, setSqlResult] = useState<Record<string, string | number>[] | null>(null);

  if (!dataset) return null;

  const handleRunDuckDbQuery = () => {
    // Simulate DuckDB columnar SQL query execution
    setSqlResult(dataset.sampleData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono-code font-bold bg-[#EBF5F6] text-[#2C6E76] border border-[#C5E4E7]">
              {dataset.format}
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif-heading">
                {dataset.title}
              </h2>
              <p className="text-xs text-slate-500 font-mono-code">
                {dataset.size} • {dataset.recordsCount} • {dataset.updateFrequency}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDownload(dataset)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#3B8B94] hover:bg-[#2C6E76] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
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
            onClick={() => setActiveTab('preview')}
            className={`py-3 flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'border-[#3B8B94] text-[#3B8B94] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table2 className="w-4 h-4" />
            <span>Sample Rows ({dataset.sampleData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 flex items-center space-x-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'schema'
                ? 'border-[#3B8B94] text-[#3B8B94] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Schema & Data Types ({dataset.schema.length} cols)</span>
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
            <span>DuckDB SQL Engine</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* TAB 1: Preview Table */}
          {activeTab === 'preview' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                {dataset.description}
              </p>
              
              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-mono-code font-bold text-slate-700">
                    <tr>
                      {dataset.schema.map((col) => (
                        <th key={col.column} className="px-3.5 py-2.5 whitespace-nowrap">
                          {col.column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono-code text-[11px] text-slate-700">
                    {dataset.sampleData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        {dataset.schema.map((col) => (
                          <td key={col.column} className="px-3.5 py-2 whitespace-nowrap">
                            {String(row[col.column] ?? '-')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Schema */}
          {activeTab === 'schema' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono-code font-bold text-slate-700">
                  <tr>
                    <th className="px-4 py-2.5">Column Name</th>
                    <th className="px-4 py-2.5">SQL Type</th>
                    <th className="px-4 py-2.5">Description & Semantic Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {dataset.schema.map((item) => (
                    <tr key={item.column} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-2.5 font-mono-code font-bold text-slate-900 text-xs">
                        {item.column}
                      </td>
                      <td className="px-4 py-2.5 font-mono-code text-[11px] text-[#3B8B94] font-semibold">
                        {item.type}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: DuckDB Console */}
          {activeTab === 'duckdb' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono-code text-xs space-y-2 border border-slate-800">
                <div className="text-slate-400 flex items-center justify-between pb-1 border-b border-slate-800">
                  <span>DuckDB v1.1 Columnar Query Engine (In-Memory)</span>
                  <span className="text-emerald-400">STATUS: READY</span>
                </div>
                <div className="text-slate-300">
                  SELECT * FROM read_parquet('gdrive_cabinet/{dataset.id}.parquet') LIMIT 5;
                </div>
              </div>

              <button
                onClick={handleRunDuckDbQuery}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#3B8B94] hover:bg-[#2C6E76] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Columnar Scan</span>
              </button>

              {sqlResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-2 animate-in fade-in">
                  <div className="flex items-center space-x-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Query Completed in 3.8ms (Zero Cloud Egress Cost)</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Successfully loaded {sqlResult.length} sample partitions into memory via DuckDB vectorized engine.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Zohelo The Vault • Google Drive (5TB The Cabinet)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
