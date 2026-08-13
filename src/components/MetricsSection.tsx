import React, { useState } from 'react';
import { FileCode, Database, CheckCircle, Info, Sparkles } from 'lucide-react';
import { declarativeMetrics } from '../data/metricsData';
import { MetricCardData } from '../types';

interface MetricsSectionProps {
  onInspectMetric: (metric: MetricCardData) => void;
}

interface SparklineResult {
  linePath: string;
  coords: { x: number; y: number }[];
  height: number;
  width: number;
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({ onInspectMetric }) => {
  const [hoveredMetricId, setHoveredMetricId] = useState<string | null>(null);

  // Helper to generate smooth SVG path for sparklines
  const generateSmoothPath = (points: { date: string; value: number }[], width = 280, height = 50): SparklineResult => {
    if (!points || points.length === 0) {
      return { linePath: `M 0,${height / 2} L ${width},${height / 2}`, coords: [], height, width };
    }
    const values = points.map((p) => p.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;

    const coords = points.map((p, index) => {
      const x = (index / (points.length - 1)) * (width - 16) + 8;
      const normalized = (p.value - minVal) / range;
      const y = height - (normalized * (height - 18) + 9);
      return { x, y };
    });

    // Create cubic bezier curve string
    let d = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      d += ` C ${cpX},${p0.y} ${cpX},${p1.y} ${p1.x},${p1.y}`;
    }

    return { linePath: d, coords, height, width };
  };

  return (
    <section id="metrics" className="w-full pt-6 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500">
              The Metrics
            </h2>
            <span className="text-[11px] font-medium text-slate-400">
              • Declarative MetricFlow KPIs (GUS Gold Layer)
            </span>
          </div>
          <div className="text-xs text-[#3B8B94] font-medium flex items-center space-x-1 cursor-pointer">
            <span>Decoupled Semantic BI Layer</span>
          </div>
        </div>

        {/* 3-Column KPI Card Grid matching the exact Mockup layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {declarativeMetrics.slice(0, 3).map((metric) => {
            const pathData = generateSmoothPath(metric.sparklinePoints, 320, 56);
            const isHovered = hoveredMetricId === metric.id;

            return (
              <div
                key={metric.id}
                onMouseEnter={() => setHoveredMetricId(metric.id)}
                onMouseLeave={() => setHoveredMetricId(null)}
                className="zohelo-card p-5 relative overflow-hidden flex flex-col justify-between group cursor-pointer"
                onClick={() => onInspectMetric(metric)}
              >
                {/* Top Row: Metric Name + Badge Pill */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 group-hover:text-[#3B8B94] transition-colors">
                      {metric.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {metric.benchmark}
                    </p>
                  </div>

                  {/* Badge Pill as seen in mockup */}
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold font-mono-code ${
                      metric.badgeValue.startsWith('-')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : metric.badgeValue.startsWith('+')
                        ? 'bg-[#EBF5F6] text-[#2C6E76] border border-[#3B8B94]/30'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {metric.badgeValue}
                  </span>
                </div>

                {/* Middle: Big Headline Number */}
                <div className="my-4">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#24292E] font-sans tracking-tight">
                    {metric.currentValue}
                  </div>
                </div>

                {/* Bottom: Smooth SVG Sparkline Graph matching Mockup */}
                <div className="w-full pt-1 relative">
                  <svg
                    viewBox={`0 0 ${pathData.width} ${pathData.height}`}
                    className="w-full h-14 overflow-visible"
                  >
                    <defs>
                      <linearGradient id={`grad-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B8B94" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3B8B94" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Fill underneath */}
                    <path
                      d={`${pathData.linePath} L ${pathData.width - 8},${pathData.height} L 8,${pathData.height} Z`}
                      fill={`url(#grad-${metric.id})`}
                      className="transition-opacity duration-300"
                    />

                    {/* Line Stroke */}
                    <path
                      d={pathData.linePath}
                      fill="none"
                      stroke="#3B8B94"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300 group-hover:stroke-[#2C6E76]"
                    />

                    {/* Data Points */}
                    {pathData.coords.map((c, i) => (
                      <circle
                        key={i}
                        cx={c.x}
                        cy={c.y}
                        r={i === pathData.coords.length - 1 ? 4 : 2}
                        className={`${
                          i === pathData.coords.length - 1
                            ? 'fill-[#2C6E76] stroke-white stroke-2'
                            : 'fill-[#3B8B94] opacity-40 group-hover:opacity-100'
                        }`}
                      />
                    ))}
                  </svg>
                </div>

                {/* Inspect MetricFlow Code hint on hover */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-[#3B8B94] transition-colors">
                  <span className="font-mono-code text-[10px]">
                    {metric.metricKey}
                  </span>
                  <div className="flex items-center space-x-1 font-semibold">
                    <FileCode className="w-3 h-3" />
                    <span>Inspect YAML</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
