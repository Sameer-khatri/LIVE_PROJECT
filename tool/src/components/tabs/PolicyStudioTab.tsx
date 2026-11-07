import React, { useState, useEffect } from 'react';
import { 
  Sliders, Save, CheckCircle2, RotateCcw, ShieldCheck, ShieldAlert, 
  Zap, Clock, Globe, Key, Smartphone, Lock, AlertTriangle, 
  Layers, ChevronRight, Activity, Cpu, Sparkles, RefreshCw, FileText
} from 'lucide-react';
import { fetchPolicyApi, updatePolicyApi } from '../../services/api';

type PolicyPreset = 'STRICT' | 'BALANCED' | 'PERMISSIVE' | 'CUSTOM';

interface RuleToggle {
  id: string;
  name: string;
  description: string;
  category: 'IMMEDIATE_ACTION' | 'CHALLENGE' | 'DEFENSE';
  armed: boolean;
  actionBadge: string;
  executionLatency: string;
  triggerCount: number;
  criticality: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export const PolicyStudioTab: React.FC = () => {
  // Preset state
  const [activePreset, setActivePreset] = useState<PolicyPreset>('BALANCED');

  // Calibrated Thresholds
  const [speedThreshold, setSpeedThreshold] = useState<number>(800);
  const [bruteForceFails, setBruteForceFails] = useState<number>(5);
  const [mfaWindow, setMfaWindow] = useState<number>(30);
  const [maxSessionHours, setMaxSessionHours] = useState<number>(4);

  // Automated Protection Switches
  const [rules, setRules] = useState<RuleToggle[]>([
    {
      id: 'auto_revoke',
      name: 'Auto-Revoke Stolen Session Tokens',
      description: 'Instantly invalidates active OAuth tokens & session cookies when high-risk anomaly is detected.',
      category: 'IMMEDIATE_ACTION',
      armed: true,
      actionBadge: 'TOKEN REVOKE',
      executionLatency: '< 45ms',
      triggerCount: 14,
      criticality: 'CRITICAL'
    },
    {
      id: 'auto_quarantine_ip',
      name: 'Border Firewall IP Quarantine',
      description: 'Blocks external IP addresses on edge firewalls immediately upon repeated password guessing.',
      category: 'IMMEDIATE_ACTION',
      armed: true,
      actionBadge: 'DROP AT EDGE',
      executionLatency: '< 80ms',
      triggerCount: 8,
      criticality: 'CRITICAL'
    },
    {
      id: 'step_up_mfa',
      name: 'Step-Up Verification on New Geographies',
      description: 'Forces secondary physical security key or OTP approval if login originates from an unfamiliar city.',
      category: 'CHALLENGE',
      armed: true,
      actionBadge: 'MFA CHALLENGE',
      executionLatency: '< 110ms',
      triggerCount: 29,
      criticality: 'HIGH'
    },
    {
      id: 'block_tor_proxies',
      name: 'Tor & Darknet Anonymizer Auto-Drop',
      description: 'Automatically refuses authentication requests routing through verified Tor exit nodes or bulletproof proxies.',
      category: 'DEFENSE',
      armed: true,
      actionBadge: 'PROXY DROP',
      executionLatency: '< 30ms',
      triggerCount: 19,
      criticality: 'HIGH'
    },
    {
      id: 'privilege_escalation_lock',
      name: 'Privileged Role Off-Hours Freeze',
      description: 'Temporarily freezes root and cloud architect permissions if logins occur outside normal operating hours.',
      category: 'DEFENSE',
      armed: false,
      actionBadge: 'ROLE FREEZE',
      executionLatency: '< 95ms',
      triggerCount: 2,
      criticality: 'MEDIUM'
    }
  ]);

  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Sync with AuthSentry Real Backend Database
  useEffect(() => {
    let isMounted = true;
    fetchPolicyApi().then((data) => {
      if (data && isMounted) {
        if (typeof data.impossibleTravelSpeedKmH === 'number') setSpeedThreshold(data.impossibleTravelSpeedKmH);
        if (typeof data.bruteForceThreshold === 'number') setBruteForceFails(data.bruteForceThreshold);
        if (typeof data.mfaBombingWindowSec === 'number') setMfaWindow(data.mfaBombingWindowSec);
        if (typeof data.maxSessionHours === 'number') setMaxSessionHours(data.maxSessionHours);
        if (data.autoRevokeOnCritical !== undefined || data.autoQuarantineIp !== undefined) {
          setRules((prev) =>
            prev.map((r) => {
              if (r.id === 'auto_revoke' && data.autoRevokeOnCritical !== undefined) {
                return { ...r, armed: !!data.autoRevokeOnCritical };
              }
              if (r.id === 'auto_quarantine_ip' && data.autoQuarantineIp !== undefined) {
                return { ...r, armed: !!data.autoQuarantineIp };
              }
              if (r.id === 'step_up_mfa' && data.stepUpMfaOnHigh !== undefined) {
                return { ...r, armed: !!data.stepUpMfaOnHigh };
              }
              return r;
            })
          );
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle rule state
  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, armed: !r.armed } : r))
    );
    setActivePreset('CUSTOM');
  };

  // Preset Handlers
  const handleSelectPreset = (preset: PolicyPreset) => {
    setActivePreset(preset);
    if (preset === 'STRICT') {
      setSpeedThreshold(600);
      setBruteForceFails(3);
      setMfaWindow(15);
      setMaxSessionHours(2);
      setRules((prev) => prev.map((r) => ({ ...r, armed: true })));
    } else if (preset === 'BALANCED') {
      setSpeedThreshold(800);
      setBruteForceFails(5);
      setMfaWindow(30);
      setMaxSessionHours(4);
      setRules((prev) =>
        prev.map((r) => ({ ...r, armed: r.id !== 'privilege_escalation_lock' }))
      );
    } else if (preset === 'PERMISSIVE') {
      setSpeedThreshold(1400);
      setBruteForceFails(8);
      setMfaWindow(60);
      setMaxSessionHours(8);
      setRules((prev) =>
        prev.map((r) => ({
          ...r,
          armed: r.id === 'auto_revoke' || r.id === 'auto_quarantine_ip'
        }))
      );
    }
  };

  const handleSave = async () => {
    const isRevokeArmed = rules.find((r) => r.id === 'auto_revoke')?.armed ?? true;
    const isQuarantineArmed = rules.find((r) => r.id === 'auto_quarantine_ip')?.armed ?? true;
    const isStepUpArmed = rules.find((r) => r.id === 'step_up_mfa')?.armed ?? true;

    await updatePolicyApi({
      impossibleTravelSpeedKmH: speedThreshold,
      bruteForceThreshold: bruteForceFails,
      mfaBombingWindowSec: mfaWindow,
      maxSessionHours: maxSessionHours,
      autoRevokeOnCritical: isRevokeArmed,
      autoQuarantineIp: isQuarantineArmed,
      stepUpMfaOnHigh: isStepUpArmed
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      handleSave();
    }, 900);
  };

  // Calculate live dynamic metrics based on thresholds
  const armedCount = rules.filter((r) => r.armed).length;
  const coverageScore = Math.min(
    99.8,
    Math.round(
      (armedCount * 14 +
        (2000 - speedThreshold) / 25 +
        (15 - bruteForceFails) * 2 +
        (120 - mfaWindow) / 4) *
        10
    ) / 10
  );
  const estimatedFrictionRate = (
    Math.max(0.1, (1000 - speedThreshold) * 0.001 + (6 - bruteForceFails) * 0.08)
  ).toFixed(1);

  return (
    <div className="flex flex-col gap-5 select-none animate-fadeIn text-slate-100 font-sans">
      
      {/* ============================================================== */}
      {/* 1. TOP ENTERPRISE COMMAND HEADER & PRESET SWITCHER             */}
      {/* ============================================================== */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#121722] via-[#161d2c] to-[#121722] border border-white/[0.06] shadow-2xl flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        
        {/* Title & SOC Posture Indicator */}
        <div className="flex items-center gap-3.5">
          <div className="relative p-3 rounded-2xl bg-gradient-to-br from-[#1e2738] to-[#121722] border border-sky-500/30 text-sky-400 shadow-inner">
            <Sliders className="w-5 h-5 text-sky-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#121722] animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">Security Posture & Enforcement Studio</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                ACTIVE • ENFORCING
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Calibrate autonomous detection sensitivity and configure automated containment rules across 1,428 monitored accounts.
            </p>
          </div>
        </div>

        {/* Profile Presets & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto justify-between xl:justify-end">
          
          {/* Sensitivity Preset Segmented Control */}
          <div className="flex items-center p-1 rounded-2xl bg-white/[0.03]">
            <button
              onClick={() => handleSelectPreset('STRICT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activePreset === 'STRICT'
                  ? 'bg-rose-500/20 text-rose-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Strict Zero-Trust
            </button>
            <button
              onClick={() => handleSelectPreset('BALANCED')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activePreset === 'BALANCED'
                  ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Balanced Enterprise
            </button>
            <button
              onClick={() => handleSelectPreset('PERMISSIVE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activePreset === 'PERMISSIVE'
                  ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Low Noise (Dev)
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectPreset('BALANCED')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-900/30 transition-all active:scale-95 disabled:opacity-60"
            >
              {isSimulating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              )}
              <span>{isSimulating ? 'Evaluating...' : 'Deploy Policy'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Confirmation Notification Banner */}
      {savedNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center justify-between animate-fadeIn shadow-xl">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Policy Revision #105 deployed successfully across all authentication gateways in 62ms.</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-400/80">HASH: 9e4f2b1c</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. REAL-TIME POLICY IMPACT & TELEMETRY BAR                     */}
      {/* ============================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/[0.03] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400">Simulated Protection</div>
            <div className="text-base font-extrabold text-white font-mono">{coverageScore}%</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400">Automated Defenses</div>
            <div className="text-base font-extrabold text-sky-400 font-mono">{armedCount} of {rules.length} Armed</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400">User Friction Index</div>
            <div className="text-base font-extrabold text-indigo-300 font-mono">{estimatedFrictionRate}% (Low)</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400">Engine Evaluation</div>
            <div className="text-base font-extrabold text-purple-300 font-mono">&lt; 84 ms</div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN DUAL-COLUMN CONFIGURATION MATRIX                       */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN (7 Cols): CALIBRATED THREAT THRESHOLD METERS      */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          <div className="p-5 rounded-3xl bg-[#131924]/80 border border-white/[0.06] shadow-xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Calibrated Behavioral Thresholds
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Continuous Anomaly Detection
              </span>
            </div>

            {/* METER 1: Max Travel Speed (Impossible Travel) */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Physical Travel Velocity Limit</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/15 text-sky-300">
                      GEO-HOPPING
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Trigger alert if consecutive logins exceed physical air travel speed between two cities.
                  </p>
                </div>

                {/* Digital Readout Pill with manual step controls */}
                <div className="flex items-center gap-1.5 bg-white/[0.06] px-2.5 py-1 rounded-xl">
                  <button
                    onClick={() => {
                      setSpeedThreshold((v) => Math.max(400, v - 50));
                      setActivePreset('CUSTOM');
                    }}
                    className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] text-xs font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold text-sky-400 font-mono min-w-[65px] text-center">
                    {speedThreshold} km/h
                  </span>
                  <button
                    onClick={() => {
                      setSpeedThreshold((v) => Math.min(2000, v + 50));
                      setActivePreset('CUSTOM');
                    }}
                    className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] text-xs font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Enterprise Segmented Calibrated Meter */}
              <div className="space-y-1.5">
                <div className="relative w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 rounded-full transition-all duration-300"
                    style={{ width: `${((speedThreshold - 400) / 1600) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="400"
                  max="2000"
                  step="50"
                  value={speedThreshold}
                  onChange={(e) => {
                    setSpeedThreshold(Number(e.target.value));
                    setActivePreset('CUSTOM');
                  }}
                  className="w-full accent-sky-400 cursor-pointer h-1 bg-transparent"
                />
              </div>

              {/* Calibrated Tick Markers */}
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>400 km/h (Strict)</span>
                <span className="text-sky-400 font-semibold">✈ Commercial Jet (~850 km/h)</span>
                <span>2,000 km/h (Relaxed)</span>
              </div>
            </div>

            {/* METER 2: Wrong Passwords Allowed */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Brute-Force Password Tolerance</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300">
                      CREDENTIAL STUFFING
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Consecutive incorrect password attempts allowed within a 30-second window.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white/[0.06] px-2.5 py-1 rounded-xl">
                  <button
                    onClick={() => {
                      setBruteForceFails((v) => Math.max(2, v - 1));
                      setActivePreset('CUSTOM');
                    }}
                    className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] text-xs font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold text-amber-400 font-mono min-w-[70px] text-center">
                    {bruteForceFails} fails / 30s
                  </span>
                  <button
                    onClick={() => {
                      setBruteForceFails((v) => Math.min(15, v + 1));
                      setActivePreset('CUSTOM');
                    }}
                    className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] text-xs font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Enterprise Segmented Calibrated Meter */}
              <div className="space-y-1.5">
                <div className="relative w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${((bruteForceFails - 2) / 13) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="1"
                  value={bruteForceFails}
                  onChange={(e) => {
                    setBruteForceFails(Number(e.target.value));
                    setActivePreset('CUSTOM');
                  }}
                  className="w-full accent-amber-400 cursor-pointer h-1 bg-transparent"
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2 fails (Zero-Tolerance)</span>
                <span className="text-amber-400 font-semibold">★ Enterprise Standard (5 fails)</span>
                <span>15 fails (Permissive)</span>
              </div>
            </div>

            {/* METER 3: MFA Push Window */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>MFA Push Fatigue Window</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 text-purple-300">
                      PROMPT SPAM
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Suppresses repetitive mobile push approval notifications sent in rapid succession.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white/[0.06] px-2.5 py-1 rounded-xl">
                  <button
                    onClick={() => {
                      setMfaWindow((v) => Math.max(10, v - 5));
                      setActivePreset('CUSTOM');
                    }}
                    className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] text-xs font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold text-purple-400 font-mono min-w-[65px] text-center">
                    {mfaWindow} seconds
                  </span>
                  <button
                    onClick={() => {
                      setMfaWindow((v) => Math.min(120, v + 5));
                      setActivePreset('CUSTOM');
                    }}
                    className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] text-xs font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="relative w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-sky-400 rounded-full transition-all duration-300"
                    style={{ width: `${((mfaWindow - 10) / 110) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={mfaWindow}
                  onChange={(e) => {
                    setMfaWindow(Number(e.target.value));
                    setActivePreset('CUSTOM');
                  }}
                  className="w-full accent-purple-400 cursor-pointer h-1 bg-transparent"
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>10s (High Sensitivity)</span>
                <span className="text-purple-400 font-semibold">Standard 30s Window</span>
                <span>120s (Relaxed)</span>
              </div>
            </div>

            {/* METER 4: Session Inactivity & Token Expiry */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Maximum OAuth Session Lifetime</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300">
                      TOKEN REPLAY GUARD
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Automatically forces session re-authentication to prevent persistent hijacked browser cookies.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white/[0.06] px-2.5 py-1 rounded-xl">
                  <button
                    onClick={() => {
                      setMaxSessionHours((v) => Math.max(1, v - 1));
                      setActivePreset('CUSTOM');
                    }}
                    className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] text-xs font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono min-w-[65px] text-center">
                    {maxSessionHours} hours
                  </span>
                  <button
                    onClick={() => {
                      setMaxSessionHours((v) => Math.min(24, v + 1));
                      setActivePreset('CUSTOM');
                    }}
                    className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.1] text-xs font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="relative w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 rounded-full transition-all duration-300"
                    style={{ width: `${((maxSessionHours - 1) / 23) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={maxSessionHours}
                  onChange={(e) => {
                    setMaxSessionHours(Number(e.target.value));
                    setActivePreset('CUSTOM');
                  }}
                  className="w-full accent-emerald-400 cursor-pointer h-1 bg-transparent"
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 hr (High Security)</span>
                <span className="text-emerald-400 font-semibold">Recommended 4.0 hrs</span>
                <span>24 hrs (Full Day)</span>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN (5 Cols): AUTOMATED ENFORCEMENT MATRIX           */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <div className="p-5 rounded-3xl bg-[#131924]/80 border border-white/[0.06] shadow-xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Autonomous Containment Matrix
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Active Mitigations
              </span>
            </div>

            <p className="text-xs text-slate-400">
              When breach conditions match, AuthSentry executes autonomous security countermeasures without human delay.
            </p>

            {/* Enterprise Toggle Cards (Clean borderless) */}
            <div className="space-y-2.5 pt-1">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  onClick={() => handleToggleRule(rule.id)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer select-none ${
                    rule.armed
                      ? 'bg-sky-500/10 shadow-sm hover:bg-sky-500/15'
                      : 'bg-white/[0.02] opacity-70 hover:opacity-100 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${rule.armed ? 'bg-emerald-400 ring-2 ring-emerald-500/30 animate-pulse' : 'bg-slate-600'}`}></span>
                        <span className="text-xs font-bold text-white tracking-tight">{rule.name}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                          rule.criticality === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-sky-500/20 text-sky-300'
                        }`}>
                          {rule.actionBadge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug mt-1 pl-4">
                        {rule.description}
                      </p>
                      
                      <div className="flex items-center gap-3 pl-4 mt-2 text-[10px] text-slate-500 font-mono">
                        <span>Latency: {rule.executionLatency}</span>
                        <span>•</span>
                        <span>Triggered: {rule.triggerCount}x</span>
                      </div>
                    </div>

                    {/* Elite Switch Toggle */}
                    <div className="pt-0.5">
                      <div
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                          rule.armed ? 'bg-sky-500' : 'bg-white/[0.1]'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            rule.armed ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Summary Pill */}
            <div className="p-3 rounded-2xl bg-white/[0.03] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero-Trust Autonomous Safeguards
              </span>
              <span className="font-mono text-emerald-400 font-bold">100% Verified</span>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* 4. ENTERPRISE AUDIT TRAIL & REVISION STRIP                     */}
      {/* ============================================================== */}
      <div className="p-4 rounded-2xl bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-slate-400" />
          <span>
            Current Revision: <strong className="text-white font-mono">REV-2026.11.03-B</strong> • Signed by: <span className="text-sky-300">secops-lead@innovatech.io</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>Active Edge Gateways: <strong className="text-white">4 / 4 Healthy</strong></span>
          <span className="hidden md:inline">•</span>
          <span>Compliance: <strong className="text-emerald-400">SOC 2 Type II / ISO 27001</strong></span>
        </div>
      </div>

    </div>
  );
};
