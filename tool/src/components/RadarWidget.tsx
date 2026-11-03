import React, { useState } from 'react';
import { ChevronLeft, Info, Crosshair } from 'lucide-react';
import { RadarMetric } from '../types/dashboard';

interface RadarWidgetProps {
  metrics: RadarMetric[];
}

export const RadarWidget: React.FC<RadarWidgetProps> = ({ metrics }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const size = 250;
  const center = size / 2;
  const radius = 75;
  const numAxes = metrics.length;
  const ringLevels = [0.25, 0.5, 0.75, 1];

  const getCoordinates = (index: number, valueFactor: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const x = center + radius * valueFactor * Math.cos(angle);
    const y = center + radius * valueFactor * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.value / 100);
      return `${x},${y}`;
    })
    .join(' ');

  const activeMetric = hoveredIndex !== null ? metrics[hoveredIndex] : null;

  return (
    <div className="flex flex-col justify-between h-full p-2 select-none relative">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center text-xs font-medium text-slate-300 hover:text-white cursor-pointer group">
              <ChevronLeft className="w-3.5 h-3.5 mr-0.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Threat Report</span>
            </span>
            <span className="text-xs text-rose-400 font-normal px-2 py-0.5 rounded-full bg-rose-950/40 border border-rose-900/50">
              Suboptimal
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
            <span>SCANNING</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-white tracking-tight">Identity Attack Surface</h3>
        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
          Measures how credentials, geo-velocity, and MFA posture expose your organization to account takeover.
        </p>
      </div>

      {/* Hexagonal Radar Chart with Live Sweeping Beam */}
      <div className="relative flex items-center justify-center my-2">
        <svg width={size} height={size} className="overflow-visible">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
            </radialGradient>

            <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid concentric rings */}
          {ringLevels.map((lvl, idx) => {
            const points = Array.from({ length: numAxes })
              .map((_, i) => {
                const { x, y } = getCoordinates(i, lvl);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polygon
                key={idx}
                points={points}
                fill="none"
                stroke="#242c3d"
                strokeWidth="1"
                strokeDasharray={idx === ringLevels.length - 1 ? 'none' : '3,3'}
              />
            );
          })}

          {/* Spoke lines */}
          {metrics.map((_, i) => {
            const { x, y } = getCoordinates(i, 1);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#242c3d"
                strokeWidth="1"
              />
            );
          })}

          {/* Authentically Rotating Radar Sweep Line */}
          <g className="animate-radar-sweep" style={{ transformOrigin: `${center}px ${center}px` }}>
            <line
              x1={center}
              y1={center}
              x2={center}
              y2={center - radius}
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
            {/* Trailing wedge */}
            <path
              d={`M ${center} ${center} L ${center - 28} ${center - radius + 8} A ${radius} ${radius} 0 0 1 ${center} ${center - radius} Z`}
              fill="url(#sweepGradient)"
            />
          </g>

          {/* Radar Data Polygon with smooth transition */}
          <polygon
            points={polygonPoints}
            fill="url(#radarGlow)"
            stroke="#38bdf8"
            strokeWidth="1.75"
            className="transition-all duration-700 ease-out"
          />

          {/* Interactive Vertex Data Dots */}
          {metrics.map((m, i) => {
            const { x, y } = getCoordinates(i, m.value / 100);
            const isHovered = hoveredIndex === i;
            const isHigh = m.value >= 75;

            return (
              <g 
                key={i}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Ping circle for high exposure nodes */}
                {isHigh && (
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1"
                    className="animate-ping opacity-40"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? '6' : '3.5'}
                  fill={isHigh ? '#f43f5e' : '#38bdf8'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* Axis Labels */}
          {metrics.map((m, i) => {
            const { x, y } = getCoordinates(i, 1.25);
            const isHovered = hoveredIndex === i;

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[10px] font-medium transition-colors cursor-pointer ${
                  isHovered ? 'fill-sky-400 font-bold' : 'fill-slate-400'
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {m.axis}
              </text>
            );
          })}
        </svg>

        {/* Hover Popover showing exact metric */}
        {activeMetric && (
          <div className="absolute -bottom-2 z-40 bg-dark-card/95 border border-sky-500/50 rounded-xl px-3 py-1.5 shadow-2xl backdrop-blur-xl animate-toast-in text-center pointer-events-none">
            <div className="text-[11px] font-bold text-white flex items-center justify-center gap-1.5">
              <span>{activeMetric.axis} Surface:</span>
              <span className="text-sky-400">{activeMetric.value}% Exposure</span>
            </div>
            <div className="text-[9px] text-slate-400">{activeMetric.label}</div>
          </div>
        )}
      </div>

      {/* Bottom Category Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-dark-borderSubtle">
        <span>Highest Vector:</span>
        <span className="font-semibold text-rose-400 flex items-center gap-1">
          <Crosshair className="w-3.5 h-3.5" />
          <span>Credential Velocity (85%)</span>
        </span>
      </div>

    </div>
  );
};
