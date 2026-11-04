import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Zap, 
  Bomb, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert
} from 'lucide-react';

export type ScenarioType = 'IMPOSSIBLE_TRAVEL' | 'BRUTE_FORCE' | 'MFA_BOMBING' | 'TOR_RESET' | 'NORMAL';

interface SimulatorBarProps {
  currentScenario: ScenarioType;
  onSelectScenario: (scenario: ScenarioType) => void;
  onNavigateTab?: (tab: 'DASHBOARD' | 'ANALYZER' | 'INCIDENTS' | 'MITIGATIONS' | 'POLICIES') => void;
}

export const SimulatorBar: React.FC<SimulatorBarProps> = ({
  currentScenario,
  onSelectScenario,
  onNavigateTab
}) => {
  // Live ticker step index - shifts every 2.8s to rotate real-time background probe checks
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  
  // Real-time evaluation scan state when a user clicks any vector card
  const [scanningVector, setScanningVector] = useState<ScenarioType | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Handle clicking a vector card - runs an active evaluation probe before locking findings
  const handleCardClick = (scenarioId: ScenarioType, vectorLabel: string) => {
    if (scanningVector) return;

    setScanningVector(scenarioId);

    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // Audio autoplay policy fallback
    }

    setTimeout(() => {
      setScanningVector(null);
      onSelectScenario(scenarioId);
    }, 600);
  };

  // Real-time dynamic telemetry streams for each of the 5 vectors
  const travelStreams = [
    { text: 'Tokyo → London: 540 km/h (Flight OK)', tag: 'NORMAL', safe: true },
    { text: 'Austin → Seattle: 610 km/h (In Transit)', tag: 'EN ROUTE', safe: true },
    { text: 'SF → Frankfurt: 8,820 km/h [Mach 7.1]', tag: 'MACH 7.1', safe: false },
    { text: 'Berlin → Paris: 280 km/h (Express Rail)', tag: 'VERIFIED', safe: true },
    { text: 'Dublin → Boston: 510 km/h (Transatlantic)', tag: 'CLEAN', safe: true },
  ];

  const bruteStreams = [
    { text: '0 failed / 30s • Fleet quiet', tag: '0 BURSTS', safe: true },
    { text: '1 typo: Dublin (Auth Succeeded)', tag: 'NOMINAL', safe: true },
    { text: '7 failed in 28s: 194.26.29.112', tag: 'SPRAY BOT', safe: false },
    { text: 'Rate: 0.12 att/min (Healthy)', tag: 'CLEAN', safe: true },
  ];

  const mfaStreams = [
    { text: 'Push latency: 1.1s avg • Safe', tag: 'NOMINAL', safe: true },
    { text: '4 push popups in 18s (Sarah\'s iPhone)', tag: 'FATIGUE', safe: false },
    { text: 'FIDO2 Hardware Key: YubiKey 5C', tag: 'HARDWARE', safe: true },
    { text: 'Push acceptance rate: 99.8%', tag: 'HEALTHY', safe: true },
  ];

  const torStreams = [
    { text: '99.8% Corporate & Home ISPs', tag: 'RESIDENTIAL', safe: true },
    { text: 'AWS us-east-1 verified gateway', tag: 'DATACENTER', safe: true },
    { text: 'Reset via Tor Exit 185.220.101.5', tag: 'TOR RELAY', safe: false },
    { text: 'Comcast Business: SF HQ clean', tag: 'VERIFIED', safe: true },
  ];

  const normalStreams = [
    { text: '1,426 verified employee habits', tag: '100% SECURE', safe: true },
    { text: 'Zero credential compromises active', tag: 'ALL CLEAR', safe: true },
    { text: 'Risk score: 18/100 (Safe Target: 15)', tag: 'NOMINAL', safe: true },
    { text: 'Legitimate login ratio: 98.4%', tag: 'HEALTHY', safe: true },
  ];

  // Helper to resolve current dynamic text and tag
  const getVectorState = (
    id: ScenarioType,
    streams: Array<{ text: string; tag: string; safe: boolean }>,
    staticAlertText: string,
    staticAlertTag: string
  ) => {
    const isActive = currentScenario === id;
    if (isActive && id !== 'NORMAL') {
      return { text: staticAlertText, tag: staticAlertTag };
    }
    const item = streams[tickerIndex % streams.length];
    return { text: item.text, tag: item.tag };
  };

  const travelState = getVectorState('IMPOSSIBLE_TRAVEL', travelStreams, 'SF to Germany in 8 mins (8,820 km/h)', 'MACH 7.1');
  const bruteState = getVectorState('BRUTE_FORCE', bruteStreams, '7 wrong passwords in 30s', 'SPRAY BOT');
  const mfaState = getVectorState('MFA_BOMBING', mfaStreams, '4 popups sent in 18s', 'FATIGUE');
  const torState = getVectorState('TOR_RESET', torStreams, 'Reset from Tor exit node', 'TOR RELAY');
  const normalState = getVectorState('NORMAL', normalStreams, '1,426 verified employee habits', '100% SECURE');

  const scenarios: Array<{
    id: ScenarioType;
    label: string;
    sublabel: string;
    tag: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'IMPOSSIBLE_TRAVEL',
      label: 'Impossible Travel',
      sublabel: travelState.text,
      tag: travelState.tag,
      icon: <Plane className="w-3.5 h-3.5" />
    },
    {
      id: 'BRUTE_FORCE',
      label: 'Password Guessing',
      sublabel: bruteState.text,
      tag: bruteState.tag,
      icon: <Zap className="w-3.5 h-3.5" />
    },
    {
      id: 'MFA_BOMBING',
      label: 'Phone Spam (MFA)',
      sublabel: mfaState.text,
      tag: mfaState.tag,
      icon: <Bomb className="w-3.5 h-3.5" />
    },
    {
      id: 'TOR_RESET',
      label: 'Hidden Location',
      sublabel: torState.text,
      tag: torState.tag,
      icon: <Globe className="w-3.5 h-3.5" />
    },
    {
      id: 'NORMAL',
      label: 'Normal Safe Day',
      sublabel: normalState.text,
      tag: normalState.tag,
      icon: <ShieldCheck className="w-3.5 h-3.5" />
    }
  ];

  // Concise forensic summary when a threat is actively selected
  const threatSummaries: Record<string, { title: string; evidence: string }> = {
    IMPOSSIBLE_TRAVEL: {
      title: 'Mach 7.1 Velocity Violation Detected',
      evidence: 'Sarah Chen logged in from San Francisco and Frankfurt only 8 minutes apart (8,820 km/h). Token revoked.'
    },
    BRUTE_FORCE: {
      title: 'Credential Spray Botnet Detected',
      evidence: '7 failed password attempts in 30s against executive accounts from subnet 194.26.29.0/24. IP rate-limited.'
    },
    MFA_BOMBING: {
      title: 'MFA Push Fatigue Flood Detected',
      evidence: '4 rapid phone confirmation requests sent in 18s to Sarah\'s iPhone. Mobile push prompts throttled.'
    },
    TOR_RESET: {
      title: 'Darknet Anonymous Password Reset',
      evidence: 'Password reset link initiated through Tor Exit Relay 185.220.101.5. Outbound reset link withheld.'
    }
  };

  const activeThreat = currentScenario !== 'NORMAL' ? threatSummaries[currentScenario] : null;

  return (
    <div className="w-full mb-3 p-2.5 rounded-2xl bg-[#131924]/85 border border-white/[0.06] shadow-lg select-none flex flex-col gap-2 transition-all duration-300">
      
      {/* Top Header: Super-slim single line */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-xs font-bold text-white tracking-tight uppercase font-mono">
            Threat Simulation Matrix
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            • Click any vector to test real-time defense
          </span>
        </div>

        {/* Dynamic Engine Status */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded-lg border border-white/[0.04]">
          <span className={`w-1.5 h-1.5 rounded-full ${scanningVector ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
          <span className={`font-bold ${scanningVector ? 'text-amber-300' : 'text-emerald-400'}`}>
            {scanningVector ? 'PROBING...' : 'ARMED'}
          </span>
        </div>
      </div>

      {/* Grid of 5 Compact, Balanced Vector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {scenarios.map((s) => {
          const isActive = currentScenario === s.id;
          const isScanning = scanningVector === s.id;
          const isSafe = s.id === 'NORMAL';

          return (
            <button
              key={s.id}
              onClick={() => handleCardClick(s.id, s.label)}
              disabled={scanningVector !== null}
              className={`relative p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
                isActive
                  ? isSafe
                    ? 'bg-emerald-500/15 border border-emerald-500/40 shadow-sm'
                    : 'bg-rose-500/15 border border-rose-500/40 shadow-sm'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05]'
              }`}
            >
              {/* Top row: Icon + Title + Live Dynamic Tag */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1.5 truncate">
                  <span className={`p-1 rounded-lg transition-colors ${
                    isScanning
                      ? 'bg-sky-500/20 text-sky-400'
                      : isActive
                      ? isSafe
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                      : 'bg-white/[0.04] text-slate-400'
                  }`}>
                    {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : s.icon}
                  </span>
                  <span className={`text-xs font-bold truncate ${
                    isActive ? 'text-white' : 'text-slate-200'
                  }`}>
                    {s.label}
                  </span>
                </div>

                <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase flex-shrink-0 ${
                  isScanning
                    ? 'bg-sky-500/20 text-sky-300 animate-pulse'
                    : isActive
                    ? isSafe
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                    : s.id === 'NORMAL'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-white/[0.04] text-slate-400'
                }`}>
                  {isScanning ? 'SCAN' : s.tag}
                </span>
              </div>

              {/* Bottom row: Single crisp line of live sublabel */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 gap-1 mt-0.5">
                <span className="truncate">{isScanning ? 'Evaluating 1,428 sessions...' : s.sublabel}</span>
                {isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSafe ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse flex-shrink-0`}></span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sleek 1-line Alert Banner (ONLY renders when an attack scenario is actively triggered) */}
      {activeThreat && (
        <div className="p-2 px-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs animate-fadeIn flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-0.5">
          <div className="flex items-center gap-2 truncate">
            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span className="font-bold text-white font-mono uppercase tracking-tight flex-shrink-0">
              {activeThreat.title}:
            </span>
            <span className="text-[11px] text-rose-300 truncate">
              {activeThreat.evidence}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleCardClick('NORMAL', 'Normal Safe Baseline')}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold border border-emerald-500/40 cursor-pointer transition-all"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Reset Safe</span>
            </button>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('INCIDENTS')}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 text-[10px] font-semibold border border-sky-500/30 cursor-pointer transition-all"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
