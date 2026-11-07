import React, { useState } from 'react';
import { HelpCircle, ArrowUp, Sparkles, ShieldCheck, Globe, Zap } from 'lucide-react';

interface ThreatVelocityCardProps {
  velocityKmH: number;
  percentile: number;
  changePercent: number;
  onMitigate: () => void;
  onOpenMap?: () => void;
}

export const ThreatVelocityCard: React.FC<ThreatVelocityCardProps> = ({
  velocityKmH,
  percentile,
  changePercent,
  onMitigate,
  onOpenMap
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
    <div className="flex flex-col justify-between h-full bg-[#131924]/80 border border-white/[0.06] rounded-3xl p-5 backdrop-blur-xl shadow-lg select-none relative overflow-hidden">
      
      {/* Top Section: Simple English */}
      <div>
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">Hacker Speed & Impossible Travel</h3>
            {onOpenMap && (
              <button
                onClick={onOpenMap}
                className="px-2 py-0.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-[10px] font-mono text-sky-300 font-bold flex items-center gap-1 transition-all"
                title="View on Interactive World Map"
              >
                <Globe className="w-3 h-3" />
                <span>Map</span>
              </button>
            )}
          </div>
          <span title="Calculates how fast someone would have had to fly between two consecutive logins">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          Detects when accounts are used from two distant cities too quickly
        </div>

        {/* Metrics Row */}
        <div className="flex items-center gap-8 mt-2.5 mb-1.5">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">Calculated Speed</span>
            <span className="text-sm font-bold text-white tracking-tight">
              {velocityKmH > 0 ? `${velocityKmH.toLocaleString()} km/h` : 'Nominal (< 50 km/h)'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">Danger Level</span>
            <span className={`text-sm font-bold tracking-tight ${percentile > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {percentile}% {percentile > 50 ? 'High' : 'Normal'}
            </span>
          </div>
        </div>

        {/* Rainbow Spectrum Bar */}
        <div className="relative my-2">
          <div className="w-full h-2 rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 via-yellow-400 via-amber-500 to-rose-500"></div>
          {/* White cursor pin */}
          <div
            className="absolute -top-1 w-4 h-4 rounded-full bg-white border-2 border-dark-card shadow-md transform -translate-x-1/2"
            style={{ left: `${Math.min(98, Math.max(2, percentile))}%` }}
          ></div>
        </div>

        {/* Inset Assessment Box */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-dark-inset border border-dark-border text-[11px] text-slate-300 leading-relaxed">
          {percentile > 50 ? (
            <>
              Suspicious login activity is higher than <span className="font-semibold text-rose-300">{percentile}%</span> of normal business days. This indicates stolen passwords or session tokens being used overseas.
            </>
          ) : (
            <>
              Login velocity across all 1,428 identities is <span className="font-semibold text-emerald-400">within physical limits</span>. Zero supersonic token hops or unauthorized relays detected.
            </>
          )}
        </div>

        {/* Change Over Time */}
        <div className="flex items-center justify-between text-xs mt-3 mb-1.5">
          <span className="text-slate-400 font-medium">Attack Acceleration</span>
          <div className={`flex items-center gap-1 font-semibold text-xs ${percentile > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
            <span className="text-slate-300 font-normal">{percentile > 50 ? `+${changePercent}%` : '0%'}</span>
            <span className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${percentile > 50 ? 'bg-rose-950/80 border border-rose-800' : 'bg-emerald-950/80 border border-emerald-800 text-emerald-400'}`}>
              {percentile > 50 ? <ArrowUp className="w-2.5 h-2.5" /> : null}
              <span>{percentile > 50 ? 'Speed Spike' : 'Baseline Quiet'}</span>
            </span>
          </div>
        </div>

        {/* Dynamic Evidence Bullets */}
        <div className="space-y-1 text-[11px] text-slate-300 my-2">
          {velocityKmH > 800 ? (
            <>
              <div className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Impossible Travel: Logins from San Francisco and Germany occurred only 8 minutes apart ({velocityKmH.toLocaleString()} km/h).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Token Exfiltration: Adversary replayed captured OAuth session cookie from Frankfurt Tor relay.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Containment: Stolen session marked for immediate invalidation across all regional hubs.</span>
              </div>
            </>
          ) : percentile > 50 ? (
            <>
              <div className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Rapid Authentication Bursts: High volume of anomalous requests detected from external IP.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Policy Enforcement: Border firewall has throttled unauthorized gateway access.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-sky-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Triage: Automated defense rules engaged to safeguard target employee identity.</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Geographic Integrity: All corporate logins match verified user travel baselines.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Device Posture: 98.4% of active devices present verified corporate certificates.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-sky-400 font-bold text-[10px] mt-0.5">▸</span>
                <span className="leading-snug">Autonomous Defense: Continuous radar sweeping 10 regional edge gateways.</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Autonomous Mitigation Action Button */}
      <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/[0.06]">
        <span className="text-[11px] font-medium text-slate-400">Instant One-Click Safety</span>

        <button
          onClick={handleAction}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all ${
            mitigated
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
              : percentile > 50
              ? 'bg-white text-slate-900 hover:bg-slate-100'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
          }`}
          title="Instantly logs out any suspicious user sessions"
        >
          {mitigated ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{percentile > 50 ? 'Threat Neutralized!' : 'Fleet Re-verified!'}</span>
            </>
          ) : percentile > 50 ? (
            <>
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
              <span>Neutralize Threat Now</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enforce Nominal Check</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
