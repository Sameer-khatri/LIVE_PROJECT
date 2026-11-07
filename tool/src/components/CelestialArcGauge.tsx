import React, { useState, useEffect } from 'react';
import { Flame, Plane, Bomb, Globe, Droplet, ShieldAlert, Sparkles } from 'lucide-react';
import { SatelliteAttackNode } from '../types/dashboard';

interface CelestialArcGaugeProps {
  percentile: number;
  satelliteNodes: SatelliteAttackNode[];
  onSelectNode?: (node: SatelliteAttackNode) => void;
}

const SIMPLIFIED_NAMES: Record<string, string> = {
  'Rapid Token Exfil': 'Stolen Login Key',
  'Tor / Proxy Routing': 'Hidden Hacker IP',
  'MFA Push Fatigue': 'Phone Code Spam',
  'Impossible Travel': 'Two Cities at Once',
  'Credential Stuffing': 'Password Guessing',
  'node-exfil': 'Stolen Login Key',
  'node-tor': 'Hidden Hacker IP',
  'node-mfa': 'Phone Code Spam',
  'node-travel': 'Two Cities at Once',
  'node-stuffing': 'Password Guessing'
};

export const CelestialArcGauge: React.FC<CelestialArcGaugeProps> = ({
  percentile,
  satelliteNodes,
  onSelectNode
}) => {
  const safePercentile = typeof percentile === 'number' && !isNaN(percentile) ? percentile : 74;
  const [activeNode, setActiveNode] = useState<SatelliteAttackNode | null>(null);
  const [displayPercentile, setDisplayPercentile] = useState<number>(safePercentile);

  // Animated smooth count-up when percentile changes
  useEffect(() => {
    let current = displayPercentile;
    const target = safePercentile;
    if (current === target) return;

    const step = target > current ? 1 : -1;
    const timer = setInterval(() => {
      current += step;
      setDisplayPercentile(current);
      if (current === target) {
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [safePercentile]);

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

  const targetAngle = -180 + (displayPercentile / 100) * 180;
  const needleCoords = angleToCoords(radius, targetAngle);

  const startBg = angleToCoords(radius, -180);
  const endBg = angleToCoords(radius, 0);
  const bgArcPath = `M ${startBg.x} ${startBg.y} A ${radius} ${radius} 0 0 1 ${endBg.x} ${endBg.y}`;

  const startProgress = angleToCoords(radius, -180);
  const endProgress = angleToCoords(radius, targetAngle);
  const largeArcFlag = displayPercentile > 100 ? 1 : 0;
  const progressArcPath = `M ${startProgress.x} ${startProgress.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endProgress.x} ${endProgress.y}`;

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
            <feGaussianBlur stdDeviation="5" result="glow" />
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
          className="transition-all duration-300"
        />

        {/* Flowing radiant pulse overlay */}
        <path
          d={progressArcPath}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4,16"
          className="animate-flow-dash opacity-60"
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
        <circle
          cx={needleCoords.x}
          cy={needleCoords.y}
          r="12"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          className="animate-ping opacity-30"
        />

        {/* Dotted rays connecting to satellite nodes */}
        {satelliteNodes.map((node) => {
          const startPt = angleToCoords(radius + 8, node.angleDeg);
          const endPt = angleToCoords(radius + 34, node.angleDeg);
          const isActive = activeNode?.id === node.id;
          return (
            <line
              key={node.id}
              x1={startPt.x}
              y1={startPt.y}
              x2={endPt.x}
              y2={endPt.y}
              stroke={isActive ? '#38bdf8' : '#263142'}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray="2,2"
              className="transition-colors duration-200"
            />
          );
        })}
      </svg>

      {/* Floating Satellite Threat Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {satelliteNodes.map((node) => {
          const pos = angleToCoords(radius + 50, node.angleDeg);
          const isActive = activeNode?.id === node.id;
          const simpleName = SIMPLIFIED_NAMES[node.name] || SIMPLIFIED_NAMES[node.id] || node.name;

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
              <div className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
                isActive ? 'scale-115 z-30' : 'hover:scale-110'
              }`}>
                {/* Node Top: Icon + Percentage */}
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-sky-300 ring-2 ring-sky-400 animate-pulse' : 'bg-sky-400'
                  }`}></span>
                  <span className="text-xs font-bold text-white tracking-tight font-sans">
                    {node.percent}%
                  </span>
                </div>

                {/* Subtitle label in Simple English */}
                <span className={`text-[10px] font-semibold whitespace-nowrap transition-colors ${
                  isActive ? 'text-sky-300 font-bold' : 'text-slate-300 group-hover:text-white'
                }`}>
                  {simpleName}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Metric Typography (Inside the Arc - Simple & Clear) */}
      <div className="absolute bottom-5 flex flex-col items-center text-center">
        <div className="flex items-baseline justify-center">
          <span className="text-5xl font-extrabold tracking-tight text-white font-sans transition-all">
            {displayPercentile}
          </span>
          <span className="text-2xl text-slate-400 font-normal ml-0.5">
            %
          </span>
        </div>

        <span className="text-xs text-slate-400 font-medium mt-0.5">
          Account Danger Level
        </span>

        <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1 justify-center">
          <span>
            {displayPercentile >= 70
              ? 'High risk of unauthorized access'
              : displayPercentile > 35
              ? 'Elevated identity activity observed'
              : 'Everything looks safe and normal'}
          </span>
          {displayPercentile >= 70 ? (
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          ) : displayPercentile > 35 ? (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          )}
        </p>
      </div>

      {/* Active Node Flyout Card on Hover */}
      {activeNode && (
        <div className="absolute -bottom-8 z-40 bg-[#171e2c]/95 border border-sky-500/40 rounded-xl px-4 py-2 text-xs text-slate-200 shadow-2xl backdrop-blur-xl animate-toast-in max-w-xs text-center">
          <span className="font-semibold text-white">
            {SIMPLIFIED_NAMES[activeNode.name] || SIMPLIFIED_NAMES[activeNode.id] || activeNode.name}:
          </span>{' '}
          {activeNode.description}
        </div>
      )}

    </div>
  );
};
