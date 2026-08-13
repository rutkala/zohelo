import React from 'react';
import { BarChart2, FileText, Megaphone, Network, BookOpen, Clock, ArrowUpRight } from 'lucide-react';
import { articlesList } from '../data/articlesData';
import { ArticleItem } from '../types';

interface ChroniclesSectionProps {
  onOpenArticle: (article: ArticleItem) => void;
}

export const ChroniclesSection: React.FC<ChroniclesSectionProps> = ({ onOpenArticle }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'chart':
        return <BarChart2 className="w-5 h-5 text-[#2C6E76]" />;
      case 'paper':
        return <FileText className="w-5 h-5 text-[#2C6E76]" />;
      case 'megaphone':
        return <Megaphone className="w-5 h-5 text-[#2C6E76]" />;
      case 'network':
        return <Network className="w-5 h-5 text-[#2C6E76]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#2C6E76]" />;
    }
  };

  return (
    <section id="chronicles" className="w-full pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Mockup: "THE CHRONICLES" */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500">
              The Chronicles
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Data Journalism & Econometric Research Papers
            </p>
          </div>
          <div className="text-xs text-[#3B8B94] font-medium hidden sm:block">
            Peer-Reviewed Open Reports
          </div>
        </div>

        {/* 4-Card Grid matching the exact Mockup layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {articlesList.map((article) => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="zohelo-card p-5 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Top Icon Badge as seen in mockup */}
                <div className="w-10 h-10 rounded-lg bg-[#EBF5F6] border border-[#C5E4E7] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                  {getIcon(article.iconType)}
                </div>

                {/* Article Title */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#3B8B94] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>

                {/* Article Summary matching Mockup text style */}
                <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              {/* Bottom Metadata */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-medium text-slate-500">
                  {article.category}
                </span>
                <span className="flex items-center space-x-1 font-mono-code">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{article.readTime}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
