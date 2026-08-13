import React from 'react';
import { X, Clock, Calendar, User, Share2, Download, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';
import { ArticleItem } from '../types';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#3B8B94]">
            <BookOpen className="w-4 h-4" />
            <span>{article.category}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Article Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading leading-tight">
              {article.title}
            </h1>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              {article.subtitle}
            </p>

            {/* Author / Date metadata */}
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-700">
                <User className="w-3.5 h-3.5 text-[#3B8B94]" />
                <span>{article.author} ({article.authorRole})</span>
              </div>
              <div className="flex items-center space-x-1 font-mono-code">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.publishDate}</span>
              </div>
              <div className="flex items-center space-x-1 font-mono-code">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Key Data Highlights Callout Box */}
          <div className="p-4 sm:p-5 bg-[#EBF5F6] border border-[#C5E4E7] rounded-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#246A72]">
              Executive Data Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {article.keyDataPoints.map((dp, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-[#C5E4E7]/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">{dp.label}</span>
                  <div className="font-mono-code text-lg font-bold text-[#2C6E76] mt-0.5">
                    {dp.value}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{dp.context}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Article Body Paragraphs */}
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            {article.fullContent.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-semibold text-slate-500 mr-2">Methodology Tags:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono-code border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Zohelo Open Reporting Research Lab</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#3B8B94] hover:bg-[#2C6E76] text-white font-semibold cursor-pointer"
          >
            Back to Overview
          </button>
        </div>

      </div>
    </div>
  );
};
