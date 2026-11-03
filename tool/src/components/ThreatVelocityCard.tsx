import React, { useState } from 'react';
import { HelpCircle, ArrowUp, Sparkles, ShieldCheck } from 'lucide-react';

interface ThreatVelocityCardProps {
  velocityKmH: number;
  percentile: number;
  changePercent: number;
  onMitigate: () => void;
}

export const ThreatVelocityCard: React.FC<ThreatVelocityCardProps> = ({
  velocityKmH,
  percentile,
  changePercent,
  onMitigate
}) => {
  const [mitigated, setMitigated] = useState(false);

  const handleAction = () => {
    setMitigated(true);
    onMitigate();
    setTimeout(() => {
      setMitigated(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col justify-between h-full bg-dark-card/90 border border-dark-border rounded-3xl p-5 backdrop-blur-xl shadow-lg select-none relative overflow-hidden">
      
      {/* Top Section: Cyber Security */}
      <div>
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="text-sm font-bold text-white tracking-tight">Threat Surface & Velocity</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div className="text-[11px] text-slate-400">
          Physical Impossible Travel & ATO Intensity
        </div>

        {/* Metrics Row */}
        <div className="flex items-center gap-8 mt-2.5 mb-1.5">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">Physical Speed</span>
            <span className="text-sm font-bold text-white tracking-tight">{velocityKmH.toLocaleString()} km/h</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">Percentile</span>
            <span className="text-sm font-bold text-rose-400 tracking-tight">{percentile} th</span>
          </div>
        </div>

        {/* Rainbow Spectrum Bar */}
        <div className="relative my-2">
          <div className="w-full h-2 rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 via-yellow-400 via-amber-500 to-rose-500"></div>
          {/* White cursor pin */}
          <div
            className="absolute -top-1 w-4 h-4 rounded-full bg-white border-2 border-dark-card shadow-md transform -translate-x-1/2"
            style={{ left: `${percentile}%` }}
          ></div>
        </div>

        {/* Inset Assessment Box */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-dark-inset border border-dark-border text-[11px] text-slate-300 leading-relaxed">
          Identity anomalies are higher than <span className="font-semibold text-rose-300">{percentile}%</span> of reference enterprise baselines, indicating an active, distributed credential compromise.
        </div>

        {/* Change Over Time */}
        <div className="flex items-center justify-between text-xs mt-3 mb-1.5">
          <span className="text-slate-400 font-medium">Attack Acceleration</span>
          <div className="flex items-center gap-1 text-rose-400 font-semibold text-xs">
            <span className="text-slate-300 font-normal">+{changePercent}%</span>
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-800 text-[10px]">
              <ArrowUp className="w-2.5 h-2.5" />
              <span>Velocity Spike</span>
            </span>
          </div>
        </div>

        {/* Forensic Bullets */}
        <div className="space-y-1 text-[11px] text-slate-300 my-2">
          <div className="flex items-start gap-1.5">
            <span className="text-rose-400 font-bold text-[10px] mt-0.5">▸</span>
            <span className="leading-snug">Impossible Travel confirmed (San Francisco → Frankfurt in 8 min).</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-rose-400 font-bold text-[10px] mt-0.5">▸</span>
            <span className="leading-snug">5 failed attempts preceded immediate password reset request.</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-rose-400 font-bold text-[10px] mt-0.5">▸</span>
            <span className="leading-snug">Active session tokens vulnerable to token exfiltration.</span>
          </div>
        </div>
      </div>

      {/* Autonomous Mitigation Action Button */}
      <div className="mt-2 flex items-center justify-between pt-2 border-t border-dark-border">
        <span className="text-[11px] font-medium text-slate-400">Zero-Touch Response</span>

        <button
          onClick={handleAction}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all ${
            mitigated
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
              : 'bg-white text-slate-900 hover:bg-slate-100'
          }`}
          title="Instant Autonomous Mitigation"
        >
          {mitigated ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Session Revoked</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
              <span>Kill-Switch Session</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
