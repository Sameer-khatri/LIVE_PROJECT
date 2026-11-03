import React, { useState } from 'react';
import { ChevronRight, Key, ArrowUpRight, Clock, ShieldAlert } from 'lucide-react';
import { TrendPoint } from '../types/dashboard';

interface SessionTrendWidgetProps {
  tokenHours?: number;
  excessHours?: number;
  trendPoints: TrendPoint[];
  onViewReport: () => void;
}

export const SessionTrendWidget: React.FC<SessionTrendWidgetProps> = ({
  tokenHours,
  excessHours,
  trendPoints,
  onViewReport
}) => {
  const safeTokenHours = typeof tokenHours === 'number' && !isNaN(tokenHours) ? tokenHours : 4.8;
  const safeExcessHours = typeof excessHours === 'number' && !isNaN(excessHours) ? excessHours : 2.9;

  const [hoveredPoint, setHoveredPoint] = useState<TrendPoint | null>(null);

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
    <div className="flex flex-col justify-between h-full p-2 select-none relative">
      
      {/* Top Session Metric Card: Cyber Security */}
      <div className="p-3.5 rounded-2xl bg-dark-inset border border-dark-border mb-2 hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white tracking-tight font-sans">
              {safeTokenHours} <span className="text-sm font-normal text-slate-400">hrs</span>
            </span>
          </div>

          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-300 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>Policy Exceeded</span>
          </span>
        </div>

        {/* Horizontal indicator line with animated progress */}
        <div className="w-full bg-[#1e2736] rounded-full h-1.5 my-1.5 overflow-hidden">
          <div className="bg-sky-400 h-full rounded-full w-[65%] transition-all duration-500"></div>
        </div>

        <h4 className="text-xs font-bold text-slate-200 mt-1">Session Token Lifetime</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
          OAuth refresh token age exceeds zero-trust policy by <span className="text-amber-300 font-semibold font-sans">+{safeExcessHours} hours</span>.
        </p>
      </div>

      {/* Real-Time Line Trend Graph (24h Hourly Risk Curve) */}
      <div className="relative my-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-sans">
          <span className="font-semibold text-slate-300 flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>24H Risk Curve (Hourly)</span>
          </span>
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

          {/* Area glow beneath curve */}
          <path
            d={`${pathD} L ${getSvgX(maxX)} ${chartHeight - padding} L ${getSvgX(minX)} ${chartHeight - padding} Z`}
            fill="url(#trendAreaGradient)"
            opacity="0.15"
          />

          <defs>
            <linearGradient id="trendAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Plotted Line in soft sky blue */}
          <path
            d={pathD}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />

          {/* Plotted Data Dots */}
          {trendPoints.map((pt, i) => {
            const cx = getSvgX(pt.hour);
            const cy = getSvgY(pt.riskScore);
            const isHigh = pt.riskScore >= 70;
            const isHovered = hoveredPoint?.hour === pt.hour;

            return (
              <g 
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Active pulse for highest/current risk points */}
                {isHigh && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="6"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1"
                    className="animate-ping opacity-50"
                  />
                )}

                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? '5' : (isHigh ? '3.5' : '2.5')}
                  fill={isHigh ? '#f43f5e' : '#38bdf8'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        {hoveredPoint && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-dark-card/95 border border-sky-400/50 rounded-lg px-2.5 py-1 text-[10px] text-white shadow-xl backdrop-blur-md animate-toast-in pointer-events-none">
            <span className="font-semibold text-sky-400">{hoveredPoint.hour}:00</span> — Risk Score: <span className="font-bold">{hoveredPoint.riskScore}/100</span>
          </div>
        )}

        {/* X Axis Time Labels */}
        <div className="flex justify-between text-[9px] text-slate-500 px-3 mt-0.5 font-mono">
          <span>10:00</span>
          <span>16:00</span>
          <span className="text-sky-400 font-semibold">22:00 (NOW)</span>
        </div>
      </div>

      {/* Button at bottom of card */}
      <button
        onClick={onViewReport}
        className="w-full mt-2 py-2 px-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center gap-1 group active:scale-95"
      >
        <span>Inspect Forensic Stream</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover:translate-x-1 transition-transform" />
      </button>

    </div>
  );
};
