import React from 'react';
import { ChevronRight, ShieldAlert } from 'lucide-react';
import { AnomalySignature } from '../types/dashboard';

interface RiskScoreCardProps {
  scoreNormalized: number;
  baselineScore: number;
  anomalies: AnomalySignature[];
  onViewReport: () => void;
}

export const RiskScoreCard: React.FC<RiskScoreCardProps> = ({
  scoreNormalized,
  baselineScore,
  anomalies,
  onViewReport
}) => {
  return (
    <div className="flex flex-col justify-between h-full bg-dark-card/90 border border-dark-border rounded-3xl p-5 backdrop-blur-xl shadow-lg select-none">
      
      {/* Top Part: Risk Score Header & Metric Bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-bold text-white tracking-tight">Identity Risk Score</h3>
          
          {/* Crisp white rounded pill button */}
          <button
            onClick={onViewReport}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-900 bg-white hover:bg-slate-100 px-3 py-1 rounded-full transition-all"
          >
            <span>View report</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          An identity score of <span className="text-rose-400 font-semibold">{scoreNormalized}</span> equals an attack risk of <span className="text-rose-400 font-semibold">{(scoreNormalized * 100).toFixed(0)}/100</span>, indicating accelerated credential compromise.
        </p>

        {/* Big Number Metrics */}
        <div className="flex items-baseline justify-between mt-3 mb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-white tracking-tight font-sans">{scoreNormalized}</span>
            <span className="text-xs text-slate-400 font-medium">(Equal to {(scoreNormalized * 100).toFixed(0)})</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 font-medium">
              <span className="text-white font-bold">{baselineScore}</span> Baseline
            </span>
            <span className="flex items-center gap-1 text-[11px] text-rose-400 font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Critical</span>
            </span>
          </div>
        </div>

        {/* Gradient Barometer Scale */}
        <div className="relative my-2.5">
          <div className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 overflow-hidden"></div>
          {/* White slider pin */}
          <div
            className="absolute -top-1 w-4 h-4 rounded-full bg-white border-2 border-dark-card shadow-md transform -translate-x-1/2"
            style={{ left: `${scoreNormalized * 100}%` }}
          ></div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
            <span>Low (0.0)</span>
            <span>Medium (0.4)</span>
            <span>High (1.0)</span>
          </div>
        </div>
      </div>

      {/* Bottom Part: Active Anomaly Signatures */}
      <div className="mt-3.5 p-3.5 rounded-2xl bg-dark-inset border border-dark-border">
        <h4 className="text-xs font-bold text-slate-200 mb-2">Identity Anomaly Signatures</h4>
        
        <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mb-2">
          <span className="w-4 h-4 rounded-full bg-sky-400/20 text-sky-400 flex items-center justify-center text-[10px] font-bold">1</span>
          <span>Correlated Attack Vectors</span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-slate-300">
          {anomalies.map((anom) => (
            <div key={anom.id} className="flex items-center gap-1 truncate hover:text-white cursor-pointer group">
              <span className="text-sky-400 font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
              <span className="truncate">{anom.title}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
