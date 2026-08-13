import React, { useState } from 'react';
import { LayoutDashboard, Check, ExternalLink, Sparkles, Building2, TrendingUp, Home, Cpu } from 'lucide-react';
import { productsList } from '../data/productsData';
import { ProductItem } from '../types';

interface ProductsSectionProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProduct }) => {
  const getProductIcon = (category: string) => {
    switch (category) {
      case 'Macro Analysis':
        return <TrendingUp className="w-5 h-5 text-[#3B8B94]" />;
      case 'Municipal':
        return <Building2 className="w-5 h-5 text-[#3A6FA4]" />;
      case 'Real Estate':
        return <Home className="w-5 h-5 text-emerald-600" />;
      default:
        return <Cpu className="w-5 h-5 text-[#2C6E76]" />;
    }
  };

  return (
    <section id="products" className="w-full pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500">
              The Products
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Commercial-Grade Analytics Suites & Pre-configured Lakehouse Systems
            </p>
          </div>
          <div className="text-xs text-[#3B8B94] font-medium hidden sm:block">
            BI-as-Code Architecture
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {productsList.map((product) => (
            <div
              key={product.id}
              className="zohelo-card p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF5F6] border border-[#C5E4E7] flex items-center justify-center mb-3">
                    {getProductIcon(product.category)}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    product.tier === 'Commercial Edition'
                      ? 'bg-[#EBF5F6] text-[#2C6E76] border border-[#3B8B94]/30'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {product.tier}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#3B8B94] transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-xs font-medium text-[#3A6FA4] mt-1">
                  {product.tagline}
                </p>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {product.description}
                </p>

                {/* Features List */}
                <div className="mt-4 space-y-1.5">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#3B8B94] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                  {product.previewMetrics.map((m, i) => (
                    <span key={i} className="font-mono-code">
                      <strong className="text-slate-800">{m.val}</strong>
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectProduct(product)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#3B8B94] text-slate-700 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Launch Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
