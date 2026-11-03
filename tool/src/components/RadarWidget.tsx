import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { RadarMetric } from '../types/dashboard';

interface RadarWidgetProps {
  metrics: RadarMetric[];
}

export const RadarWidget: React.FC<RadarWidgetProps> = ({ metrics }) => {
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

  return (
    <div className="flex flex-col justify-between h-full p-2 select-none">
      
      {/* Top Header (Exact reference layout: "< Age Report  Suboptimal") */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center text-xs font-medium text-slate-300 hover:text-white cursor-pointer">
            <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
            <span>Threat Report</span>
          </span>
          <span className="text-xs text-rose-400 font-normal">
            Suboptimal
          </span>
        </div>

        <h3 className="text-base font-bold text-white tracking-tight">Identity Attack Surface</h3>
        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
          Measures how credentials, geo-velocity, and MFA posture expose your organization to account takeover.
        </p>
      </div>

      {/* Hexagonal Radar Chart (Clean sky-blue stroke and dark slate grid) */}
      <div className="relative flex items-center justify-center my-2">
        <svg width={size} height={size} className="overflow-visible">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
            </radialGradient>
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

          {/* Radar Data Polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#radarGlow)"
            stroke="#38bdf8"
            strokeWidth="1.75"
            className="transition-all duration-700 animate-radar-breathe"
          />

          {/* Vertex Points */}
          {metrics.map((m, i) => {
            const { x, y } = getCoordinates(i, m.value / 100);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="#38bdf8"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Axis Labels (Clean sans-serif) */}
          {metrics.map((m, i) => {
            const { x, y } = getCoordinates(i, 1.28);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[11px] font-sans fill-slate-400 font-medium select-none"
              >
                {m.axis.split(' ')[0]}
              </text>
            );
          })}
        </svg>
      </div>

    </div>
  );
};
