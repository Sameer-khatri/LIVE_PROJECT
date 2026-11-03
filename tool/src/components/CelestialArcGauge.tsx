import React, { useState } from 'react';
import { Flame, Plane, Bomb, Globe, Zap, Droplet, ShieldAlert } from 'lucide-react';
import { SatelliteAttackNode } from '../types/dashboard';

interface CelestialArcGaugeProps {
  percentile: number;
  satelliteNodes: SatelliteAttackNode[];
  onSelectNode?: (node: SatelliteAttackNode) => void;
}

export const CelestialArcGauge: React.FC<CelestialArcGaugeProps> = ({
  percentile,
  satelliteNodes,
  onSelectNode
}) => {
  const [activeNode, setActiveNode] = useState<SatelliteAttackNode | null>(null);

  // SVG Geometry
  const width = 480;
  const height = 280;
  const cx = width / 2;
  const cy = height - 40;
  const radius = 135;
  const strokeWidth = 14;

  const angleToCoords = (r: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  };

  const targetAngle = -180 + (percentile / 100) * 180;
  const needleCoords = angleToCoords(radius, targetAngle);

  const startBg = angleToCoords(radius, -180);
  const endBg = angleToCoords(radius, 0);
  const bgArcPath = `M ${startBg.x} ${startBg.y} A ${radius} ${radius} 0 0 1 ${endBg.x} ${endBg.y}`;

  const startProgress = angleToCoords(radius, -180);
  const endProgress = angleToCoords(radius, targetAngle);
  const largeArcFlag = percentile > 100 ? 1 : 0;
  const progressArcPath = `M ${startProgress.x} ${startProgress.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endProgress.x} ${endProgress.y}`;

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-3.5 h-3.5 text-sky-400" />;
      case 'Plane': return <Plane className="w-3.5 h-3.5 text-sky-400" />;
      case 'Bomb': return <Bomb className="w-3.5 h-3.5 text-sky-400" />;
      case 'Globe': return <Globe className="w-3.5 h-3.5 text-sky-400" />;
      default: return <Droplet className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full select-none">
      
      {/* SVG Celestial Gauge Canvas */}
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          {/* Sky blue gradient matching the reference */}
          <linearGradient id="arcSkyGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <filter id="arcSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric Outer Tick Mark Rings (Living orbital animation) */}
        <circle
          cx={cx}
          cy={cy}
          r={radius + 40}
          fill="none"
          stroke="#20293a"
          strokeWidth="1"
          strokeDasharray="2,6"
          className="animate-orbit opacity-75"
        />

        <circle
          cx={cx}
          cy={cy}
          r={radius + 22}
          fill="none"
          stroke="#1c2433"
          strokeWidth="1"
          strokeDasharray="4,8"
          className="animate-orbit-reverse opacity-50"
        />

        {/* Outer Background Track Semicircle */}
        <path
          d={bgArcPath}
          fill="none"
          stroke="#18202d"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Concentric tick graduation marks */}
        {Array.from({ length: 37 }).map((_, i) => {
          const tickAngle = -180 + i * 5;
          const innerTick = angleToCoords(radius - 12, tickAngle);
          const outerTick = angleToCoords(radius - 6, tickAngle);
          const isMajor = i % 6 === 0;
          return (
            <line
              key={i}
              x1={innerTick.x}
              y1={innerTick.y}
              x2={outerTick.x}
              y2={outerTick.y}
              stroke={isMajor ? '#334155' : '#232d3d'}
              strokeWidth={isMajor ? 1.5 : 1}
            />
          );
        })}

        {/* Active Filled Progress Arc with Electric Sky Blue Glow */}
        <path
          d={progressArcPath}
          fill="none"
          stroke="url(#arcSkyGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#arcSoftGlow)"
          className="transition-all duration-700"
        />

        {/* Glowing Head Cap (Needle indicator) */}
        <circle
          cx={needleCoords.x}
          cy={needleCoords.y}
          r="7"
          fill="#38bdf8"
          stroke="#ffffff"
          strokeWidth="2.5"
          className="shadow-sm"
        />

        {/* Dotted rays connecting to satellite nodes */}
        {satelliteNodes.map((node) => {
          const startPt = angleToCoords(radius + 8, node.angleDeg);
          const endPt = angleToCoords(radius + 34, node.angleDeg);
          return (
            <line
              key={node.id}
              x1={startPt.x}
              y1={startPt.y}
              x2={endPt.x}
              y2={endPt.y}
              stroke="#263142"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          );
        })}
      </svg>

      {/* Floating Satellite Threat Nodes (Positioned along outer concentric arc) */}
      <div className="absolute inset-0 pointer-events-none">
        {satelliteNodes.map((node) => {
          const pos = angleToCoords(radius + 50, node.angleDeg);
          const isActive = activeNode?.id === node.id;

          return (
            <div
              key={node.id}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => onSelectNode && onSelectNode(node)}
              className="absolute pointer-events-auto cursor-pointer group"
            >
              <div className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
                isActive ? 'scale-110 z-30' : 'hover:scale-105'
              }`}>
                {/* Node Top: Icon + Percentage (Reference style) */}
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs font-bold text-white tracking-tight font-sans">
                    {node.percent}%
                  </span>
                </div>

                {/* Subtitle label (Reference style: Slate text under percentage) */}
                <span className="text-[10px] text-slate-400 group-hover:text-white font-medium whitespace-nowrap">
                  {node.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Metric Typography (Inside the Arc - Reference Match) */}
      <div className="absolute bottom-5 flex flex-col items-center text-center">
        <div className="flex items-baseline justify-center">
          <span className="text-5xl font-extrabold tracking-tight text-white font-sans">
            {percentile}
          </span>
          <span className="text-lg text-slate-400 font-normal ml-1">
            th
          </span>
        </div>

        <span className="text-xs text-slate-400 font-medium mt-0.5">
          Percentile
        </span>

        <p className="text-xs text-slate-300 font-medium mt-1">
          Your risk of attack
        </p>
      </div>

      {/* Active Node Flyout Card on Hover */}
      {activeNode && (
        <div className="absolute -bottom-8 z-40 bg-[#171e2c]/95 border border-dark-border rounded-xl px-4 py-2 text-xs text-slate-200 shadow-xl backdrop-blur-xl animate-fadeIn max-w-xs text-center">
          <span className="font-semibold text-white">{activeNode.name}:</span> {activeNode.description}
        </div>
      )}

    </div>
  );
};
