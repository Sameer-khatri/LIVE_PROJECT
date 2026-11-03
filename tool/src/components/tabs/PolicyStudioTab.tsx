import React, { useState } from 'react';
import { Sliders, Save, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

export const PolicyStudioTab: React.FC = () => {
  const [speedThreshold, setSpeedThreshold] = useState<number>(800);
  const [bruteForceFails, setBruteForceFails] = useState<number>(5);
  const [mfaWindow, setMfaWindow] = useState<number>(30);
  const [weightHeuristics, setWeightHeuristics] = useState<number>(35);
  const [weightThreatIntel, setWeightThreatIntel] = useState<number>(35);
  const [weightUeba, setWeightUeba] = useState<number>(30);

  const [autoRevoke, setAutoRevoke] = useState<boolean>(true);
  const [autoQuarantine, setAutoQuarantine] = useState<boolean>(true);
  const [stepUpMfa, setStepUpMfa] = useState<boolean>(true);

  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    setSpeedThreshold(800);
    setBruteForceFails(5);
    setMfaWindow(30);
    setWeightHeuristics(35);
    setWeightThreatIntel(35);
    setWeightUeba(30);
    setAutoRevoke(true);
    setAutoQuarantine(true);
    setStepUpMfa(true);
  };

  return (
    <div className="flex flex-col gap-5 select-none animate-fadeIn">
      
      {/* Top Header Card */}
      <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#1e2536] border border-slate-700 text-sky-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Detection Policy & Risk Weighting Studio</h3>
            <p className="text-xs text-slate-400">Tune mathematical detection thresholds and autonomous containment playbooks in real time.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark-inset border border-dark-border text-slate-400 hover:text-white text-xs font-semibold transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Policies</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Policies successfully deployed to runtime detection engine.</span>
        </div>
      )}

      {/* Main Grid: Threshold Sliders & Weighting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card 1: Detection Velocity & Thresholds */}
        <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border space-y-4">
          <h4 className="text-sm font-bold text-white tracking-tight">Heuristic & Velocity Thresholds</h4>

          {/* Impossible Travel Speed */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Impossible Travel Speed Threshold</span>
              <span className="text-sky-400 font-bold font-mono">{speedThreshold} km/h</span>
            </div>
            <input
              type="range"
              min="300"
              max="2000"
              step="50"
              value={speedThreshold}
              onChange={(e) => setSpeedThreshold(Number(e.target.value))}
              className="w-full h-2 bg-dark-inset rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>300 km/h (Strict)</span>
              <span>800 km/h (Commercial Air)</span>
              <span>2000 km/h (Permissive)</span>
            </div>
          </div>

          {/* Brute Force Failures */}
          <div className="space-y-1.5 pt-2 border-t border-dark-border">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Brute-Force Failure Velocity Window</span>
              <span className="text-rose-400 font-bold font-mono">{bruteForceFails} failures / 60s</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={bruteForceFails}
              onChange={(e) => setBruteForceFails(Number(e.target.value))}
              className="w-full h-2 bg-dark-inset rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>2 fails (Sensitive)</span>
              <span>5 fails (Recommended)</span>
              <span>15 fails (Permissive)</span>
            </div>
          </div>

          {/* MFA Bombing Window */}
          <div className="space-y-1.5 pt-2 border-t border-dark-border">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">MFA Push Fatigue Window</span>
              <span className="text-amber-400 font-bold font-mono">{mfaWindow} seconds</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={mfaWindow}
              onChange={(e) => setMfaWindow(Number(e.target.value))}
              className="w-full h-2 bg-dark-inset rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>

        {/* Card 2: Autonomous Playbooks & Action Toggles */}
        <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border space-y-4">
          <h4 className="text-sm font-bold text-white tracking-tight">Autonomous Response Playbooks</h4>

          <div className="space-y-3">
            {/* Playbook 1 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-inset border border-dark-border">
              <div>
                <div className="text-xs font-bold text-white">Auto-Revoke on Critical Attack (90+)</div>
                <div className="text-[11px] text-slate-400">Instantly invalidates OAuth tokens across cloud IdPs.</div>
              </div>
              <input
                type="checkbox"
                checked={autoRevoke}
                onChange={(e) => setAutoRevoke(e.target.checked)}
                className="w-4 h-4 rounded text-sky-500 accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Playbook 2 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-inset border border-dark-border">
              <div>
                <div className="text-xs font-bold text-white">Auto-Quarantine Adversary Subnets</div>
                <div className="text-[11px] text-slate-400">Adds Tor exit nodes and brute-force IPs to 30-min blocklist.</div>
              </div>
              <input
                type="checkbox"
                checked={autoQuarantine}
                onChange={(e) => setAutoQuarantine(e.target.checked)}
                className="w-4 h-4 rounded text-sky-500 accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Playbook 3 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-inset border border-dark-border">
              <div>
                <div className="text-xs font-bold text-white">Enforce Step-Up MFA on High Risk (70+)</div>
                <div className="text-[11px] text-slate-400">Requires FIDO2 / hardware verification when travel speed spikes.</div>
              </div>
              <input
                type="checkbox"
                checked={stepUpMfa}
                onChange={(e) => setStepUpMfa(e.target.checked)}
                className="w-4 h-4 rounded text-sky-500 accent-sky-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

