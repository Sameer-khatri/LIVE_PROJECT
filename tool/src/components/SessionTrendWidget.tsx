import React from 'react';
import { ChevronRight, Key, ArrowUpRight } from 'lucide-react';
import { TrendPoint } from '../types/dashboard';

interface SessionTrendWidgetProps {
  tokenHours: number;
  excessHours: number;
  trendPoints: TrendPoint[];
  onViewReport: () => void;
}

export const SessionTrendWidget: React.FC<SessionTrendWidgetProps> = ({
  tokenHours,
  excessHours,
  trendPoints,
  onViewReport
}) => {
  const chartWidth = 260;
  const chartHeight = 110;
  const padding = 20;

  const minX = 10;
  const maxX = 22;
  const minY = 0;
  const maxY = 100;

  const getSvgX = (hour: number) => {
    return padding + ((hour - minX) / (maxX - minX)) * (chartWidth - padding * 2);
  };

  const getSvgY = (risk: number) => {
    return chartHeight - padding - ((risk - minY) / (maxY - minY)) * (chartHeight - padding * 2);
  };

  const pathD = trendPoints.reduce((acc, pt, idx) => {
    const x = getSvgX(pt.hour);
    const y = getSvgY(pt.riskScore);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="flex flex-col justify-between h-full p-2 select-none">
      
      {/* Top Session Metric Card: Cyber Security */}
      <div className="p-3.5 rounded-2xl bg-dark-inset border border-dark-border mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white tracking-tight font-sans">
              {tokenHours} <span className="text-sm font-normal text-slate-400">hrs</span>
            </span>
          </div>

          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-300 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Policy Exceeded</span>
          </span>
        </div>

        {/* Horizontal indicator line */}
        <div className="w-full bg-[#1e2736] rounded-full h-1.5 my-1.5 overflow-hidden">
          <div className="bg-sky-400 h-full rounded-full w-[65%]"></div>
        </div>

        <h4 className="text-xs font-bold text-slate-200 mt-1">Session Token Lifetime</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
          OAuth refresh token age exceeds zero-trust policy by <span className="text-amber-300 font-semibold font-sans">+{excessHours} hours</span>.
        </p>
      </div>

      {/* Real-Time Line Trend Graph (24h Hourly Risk Curve) */}
      <div className="relative my-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-sans">
          <span className="font-semibold text-slate-300">24H Risk Curve (Hourly)</span>
          <span className="text-sky-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            <span>Live Polling</span>
          </span>
        </div>

        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible select-none">
          {/* Subtle grid lines */}
          <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#1e2736" strokeWidth="1" strokeDasharray="2,2" />
          <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="#1e2736" strokeWidth="1" strokeDasharray="2,2" />
          <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#1e2736" strokeWidth="1" />

          {/* Plotted Line in soft sky blue */}
          <path
            d={pathD}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Plotted Data Dots */}
          {trendPoints.map((pt, i) => {
            const cx = getSvgX(pt.hour);
            const cy = getSvgY(pt.riskScore);
            const isHigh = pt.riskScore >= 70;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="3"
                fill={isHigh ? '#f43f5e' : '#38bdf8'}
                stroke="#ffffff"
                strokeWidth="1"
              />
            );
          })}

          {/* X Axis Ticks */}
          <text x={padding} y={chartHeight - 4} className="text-[9px] font-sans fill-slate-500">10:00</text>
          <text x={chartWidth / 2} y={chartHeight - 4} textAnchor="middle" className="text-[9px] font-sans fill-slate-500">16:00</text>
          <text x={chartWidth - padding} y={chartHeight - 4} textAnchor="end" className="text-[9px] font-sans fill-slate-500">22:00</text>
        </svg>
      </div>

      {/* Bottom CTA Button: Crisp White Pill Button */}
      <div className="flex justify-end mt-1">
        <button
          onClick={onViewReport}
          className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold shadow-sm transition-all group"
        >
          <span>Inspect forensic stream</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
};
