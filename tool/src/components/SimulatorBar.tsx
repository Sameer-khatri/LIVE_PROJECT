import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Zap, 
  Bomb, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Activity, 
  Radio, 
  ShieldAlert, 
  ExternalLink 
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
  const [scanMessage, setScanMessage] = useState<string>('AUTONOMOUS ENGINE: MONITORING 1,428 IDENTITIES');

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Handle clicking a vector card - runs an active evaluation probe before locking findings
  const handleCardClick = (scenarioId: ScenarioType, vectorLabel: string) => {
    if (scanningVector) return; // Prevent double-trigger during active probe

    setScanningVector(scenarioId);
    setScanMessage(`DISPATCHING SENSOR PROBE: SCANNING ${vectorLabel.toUpperCase()} ACROSS 1,428 SESSIONS...`);

    // Audio cyber feedback if supported
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // Audio autoplay policy fallback
    }

    setTimeout(() => {
      setScanningVector(null);
      setScanMessage('AUTONOMOUS ENGINE: ARMED • REAL-TIME PROTECTION ACTIVE');
      onSelectScenario(scenarioId);
    }, 750);
  };

  // Real-time dynamic telemetry streams for each of the 5 vectors
  const travelStreams = [
    { text: 'Tokyo → London: 540 km/h (Flight OK)', tag: 'NORMAL', speed: '540 km/h', safe: true },
    { text: 'Austin → Seattle: 610 km/h (In Transit)', tag: 'EN ROUTE', speed: '610 km/h', safe: true },
    { text: 'SF → Frankfurt: 8,820 km/h [Mach 7.1 Anomaly]', tag: 'MACH 7.1', speed: '8,820 km/h', safe: false },
    { text: 'Berlin → Paris: 280 km/h (Express Rail)', tag: 'VERIFIED', speed: '280 km/h', safe: true },
    { text: 'Dublin → Boston: 510 km/h (Transatlantic)', tag: 'CLEAN', speed: '510 km/h', safe: true },
  ];

  const bruteStreams = [
    { text: '0 failed / 30s • Fleet quiet', tag: '0 BURSTS', safe: true },
    { text: '1 typo attempt: Dublin (Auth OK)', tag: 'NOMINAL', safe: true },
    { text: '7 failed in 28s: 194.26.29.112', tag: 'SPRAY BOT', safe: false },
    { text: 'Rate: 0.12 att/min (Healthy baseline)', tag: 'CLEAN', safe: true },
    { text: '0 brute-force spikes detected', tag: 'CLEAN', safe: true },
  ];

  const mfaStreams = [
    { text: 'Push latency: 1.1s avg • Safe', tag: 'NOMINAL', safe: true },
    { text: '4 push prompts in 18s (Sarah\'s iPhone)', tag: 'FATIGUE ALERT', safe: false },
    { text: 'FIDO2 Hardware Key: YubiKey 5C', tag: 'HARDWARE', safe: true },
    { text: 'Push acceptance rate: 99.8%', tag: 'HEALTHY', safe: true },
    { text: 'Zero push flood loops detected', tag: 'CLEAN', safe: true },
  ];

  const torStreams = [
    { text: '99.8% Corporate & Home ISPs', tag: 'RESIDENTIAL', safe: true },
    { text: 'AWS us-east-1 verified gateway', tag: 'DATACENTER', safe: true },
    { text: 'Reset via Tor Exit 185.220.101.5', tag: 'TOR DETECTED', safe: false },
    { text: 'Comcast Business: SF HQ clean', tag: 'VERIFIED', safe: true },
    { text: 'Deutsche Telekom: Frankfurt verified', tag: 'VERIFIED', safe: true },
  ];

  const normalStreams = [
    { text: '1,426 verified employee habits', tag: '100% SECURE', safe: true },
    { text: 'Zero credential compromises active', tag: 'ALL CLEAR', safe: true },
    { text: 'Risk score: 18/100 (Safe Target: 15)', tag: 'BASELINE OK', safe: true },
    { text: '10 regional enterprise hubs nominal', tag: 'NOMINAL', safe: true },
    { text: 'Legitimate login ratio: 98.4%', tag: 'SHIELD OK', safe: true },
  ];

  // Helper to resolve current dynamic text and tag based on active scenario and live ticker
  const getVectorState = (
    id: ScenarioType,
    streams: Array<{ text: string; tag: string; safe: boolean; speed?: string }>,
    staticAlertText: string,
    staticAlertTag: string
  ) => {
    const isActive = currentScenario === id;
    if (isActive && id !== 'NORMAL') {
      return {
        text: staticAlertText,
        tag: staticAlertTag,
        isAlert: true,
        checkedTime: 'Active Flag'
      };
    }
    const item = streams[tickerIndex % streams.length];
    return {
      text: item.text,
      tag: item.tag,
      isAlert: !item.safe,
      checkedTime: `Checked ${(tickerIndex % 4) + 1}s ago`
    };
  };

  const travelState = getVectorState('IMPOSSIBLE_TRAVEL', travelStreams, 'SF to Germany in 8 mins', '8,820 KM/H');
  const bruteState = getVectorState('BRUTE_FORCE', bruteStreams, '7 wrong passwords in 30s', 'SPRAY BOT');
  const mfaState = getVectorState('MFA_BOMBING', mfaStreams, '4 popups sent in 18s', 'MFA FATIGUE');
  const torState = getVectorState('TOR_RESET', torStreams, 'Reset from Tor exit node', 'MASKED IP');
  const normalState = getVectorState('NORMAL', normalStreams, '1,426 verified employee habits', '100% SECURE');

  const scenarios: Array<{
    id: ScenarioType;
    label: string;
    sublabel: string;
    tag: string;
    icon: React.ReactNode;
    severity: 'CRITICAL' | 'HIGH' | 'NORMAL';
    accentColor: string;
    checkedTime: string;
  }> = [
    {
      id: 'IMPOSSIBLE_TRAVEL',
      label: 'Impossible Travel Check',
      sublabel: travelState.text,
      tag: travelState.tag,
      icon: <Plane className="w-4 h-4" />,
      severity: 'CRITICAL',
      accentColor: 'rose',
      checkedTime: travelState.checkedTime
    },
    {
      id: 'BRUTE_FORCE',
      label: 'Password Guessing Check',
      sublabel: bruteState.text,
      tag: bruteState.tag,
      icon: <Zap className="w-4 h-4" />,
      severity: 'CRITICAL',
      accentColor: 'amber',
      checkedTime: bruteState.checkedTime
    },
    {
      id: 'MFA_BOMBING',
      label: 'Phone Approval Spam Check',
      sublabel: mfaState.text,
      tag: mfaState.tag,
      icon: <Bomb className="w-4 h-4" />,
      severity: 'HIGH',
      accentColor: 'amber',
      checkedTime: mfaState.checkedTime
    },
    {
      id: 'TOR_RESET',
      label: 'Hidden Hacker Location',
      sublabel: torState.text,
      tag: torState.tag,
      icon: <Globe className="w-4 h-4" />,
      severity: 'CRITICAL',
      accentColor: 'purple',
      checkedTime: torState.checkedTime
    },
    {
      id: 'NORMAL',
      label: 'Normal Safe Baseline',
      sublabel: normalState.text,
      tag: normalState.tag,
      icon: <ShieldCheck className="w-4 h-4" />,
      severity: 'NORMAL',
      accentColor: 'emerald',
      checkedTime: normalState.checkedTime
    }
  ];

  // Forensic diagnostic details displayed when a card is selected
  const diagnosticResults: Record<ScenarioType, {
    title: string;
    statusBadge: string;
    isHealthy: boolean;
    identity: string;
    evidence: string;
    actionTaken: string;
  }> = {
    IMPOSSIBLE_TRAVEL: {
      title: 'Vector Check: Physical Impossible Travel (Mach 7.1 Violation)',
      statusBadge: 'CRITICAL ANOMALY IDENTIFIED',
      isHealthy: false,
      identity: 'sarah.chen@innovatech.io (Staff Systems Architect)',
      evidence: 'Simultaneous sessions detected: San Francisco (IP 198.51.100.24, Chrome OS) at 05:00 UTC and Frankfurt, Germany (IP 185.220.101.5, Ubuntu) at 05:08 UTC. Distance: 9,120 km in 8 minutes = 8,820 km/h. Commercial aviation velocity ceiling (900 km/h) exceeded by 9.8x.',
      actionTaken: 'Session token invalidated immediately. Geo-fencing challenge issued with required biometric hardware WebAuthn key.'
    },
    BRUTE_FORCE: {
      title: 'Vector Check: Distributed Credential Spray Attack',
      statusBadge: 'BRUTE-FORCE BURST INTERCEPTED',
      isHealthy: false,
      identity: '4 Executive Accounts (marcus.vance, elena.rostova, david.kim, sarah.chen)',
      evidence: 'Rapid multi-account password spraying: 7 failed authentication attempts across 30 seconds from single botnet subnet (194.26.29.0/24). Automated password stuffing tool signature recognized.',
      actionTaken: 'Source IP subnet rate-limited for 60 minutes. Mandatory account lockouts prevented by enforcing CAPTCHA and Push 2FA.'
    },
    MFA_BOMBING: {
      title: 'Vector Check: MFA Push Notification Fatigue Attack',
      statusBadge: 'PUSH SPAM FLOOD NEUTRALIZED',
      isHealthy: false,
      identity: 'sarah.chen@innovatech.io (Enrolled iPhone 15)',
      evidence: '4 rapid MFA push confirmation popups generated within 18 seconds during off-hours (04:52 AM local). Attacker attempting to exploit user fatigue into accidental tap of "Accept".',
      actionTaken: 'Push notifications suspended on target mobile device. Authentication upgraded to 6-digit number matching challenge.'
    },
    TOR_RESET: {
      title: 'Vector Check: Anonymous Tor Exit Relay Account Recovery',
      statusBadge: 'DARKNET PROXY INTERCEPTED',
      isHealthy: false,
      identity: 'sarah.chen@innovatech.io',
      evidence: 'Password reset link request initiated through known Tor Exit Node 185.220.101.5. Header analysis reveals automated curl client masquerading as Firefox on Linux.',
      actionTaken: 'Outbound reset email halted. Temporary security freeze placed on sensitive credential changes pending SecOps review.'
    },
    NORMAL: {
      title: 'Fleet Health Baseline: 1,428 Identities Operating Cleanly',
      statusBadge: '100% SECURE • ALL SYSTEMS NOMINAL',
      isHealthy: true,
      identity: 'All 1,428 Corporate Identities across 10 Regional Hubs',
      evidence: 'Routine baseline telemetry: Zero velocity anomalies, zero credential stuffing bursts, zero proxy evasion attempts. Legitimate login ratio is at 98.4% with verified single sign-on habits.',
      actionTaken: 'Continuous background telemetry active. Automated defense engine armed in standby mode.'
    }
  };

  const activeDiagnostic = diagnosticResults[currentScenario];

  return (
    <div className="w-full mb-4 p-3.5 rounded-3xl bg-[#131924]/85 border border-white/[0.06] shadow-2xl select-none flex flex-col gap-3 transition-all duration-300">
      
      {/* Top Header: Title, Description, and Active Real-Time Scanner Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-[1.5px] shadow-sm flex-shrink-0">
            <div className="w-full h-full bg-[#121722] rounded-[10px] flex items-center justify-center text-sky-300">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-xs font-bold text-white tracking-tight uppercase font-mono">
                Threat Detection & Diagnostic Matrix
              </h4>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 font-mono">
                Click any sensor to trigger real-time identity check
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Engine Status Pill */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300 bg-white/[0.03] border border-white/[0.05] px-2.5 py-1 rounded-xl">
          <span className={`w-1.5 h-1.5 rounded-full ${scanningVector ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
          <span className="text-slate-400 hidden md:inline">STATUS:</span>
          <span className={`font-bold ${scanningVector ? 'text-amber-300' : 'text-emerald-400'}`}>
            {scanningVector ? 'SCANNING FLEET...' : 'ARMED & MONITORING'}
          </span>
        </div>
      </div>

      {/* Grid of 5 Equal-Width Structured Scenario Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {scenarios.map((s) => {
          const isActive = currentScenario === s.id;
          const isScanning = scanningVector === s.id;
          const isSafe = s.id === 'NORMAL';

          return (
            <button
              key={s.id}
              onClick={() => handleCardClick(s.id, s.label)}
              disabled={scanningVector !== null}
              className={`relative flex flex-col justify-between p-3 rounded-2xl text-left transition-all duration-300 group cursor-pointer overflow-hidden ${
                isActive
                  ? isSafe
                    ? 'bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.35)]'
                    : 'bg-gradient-to-b from-rose-500/20 via-rose-500/10 to-transparent border border-rose-500/40 shadow-[0_0_20px_-3px_rgba(244,63,94,0.35)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.12]'
              } ${isScanning ? 'ring-2 ring-sky-400 scale-[0.98]' : ''}`}
            >
              {/* Dynamic Scanning Shimmer Beam */}
              {isScanning && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/20 to-transparent animate-shimmer pointer-events-none" />
              )}

              {/* Card Header: Icon + Live Dynamic Tag */}
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`p-1.5 rounded-xl transition-colors ${
                  isScanning
                    ? 'bg-sky-500/30 text-sky-300 animate-spin'
                    : isActive
                      ? isSafe
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                      : 'bg-white/[0.05] text-slate-400 group-hover:text-white'
                }`}>
                  {isScanning ? <RefreshCw className="w-4 h-4" /> : s.icon}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-all duration-300 ${
                    isScanning
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 animate-pulse'
                      : isActive
                        ? isSafe
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : s.id === 'NORMAL'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-white/[0.04] text-slate-400 group-hover:text-slate-300'
                  }`}>
                    {isScanning ? 'PROBING...' : s.tag}
                  </span>
                </div>
              </div>

              {/* Card Body: Title & Live Changing Telemetry Sublabel */}
              <div>
                <div className="flex items-center gap-1.5">
                  {isActive && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSafe ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse flex-shrink-0`}></span>
                  )}
                  <span className={`text-xs font-bold tracking-tight truncate ${
                    isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {s.label}
                  </span>
                </div>

                {/* Live stream ticker string */}
                <p className="text-[10px] text-slate-400 mt-1 leading-snug line-clamp-2 min-h-[28px] transition-all duration-300">
                  {isScanning ? 'Evaluating 1,428 identity sessions...' : s.sublabel}
                </p>

                {/* Micro-timestamp proving live background checking */}
                <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-sky-400/60"></span>
                    <span>{s.checkedTime}</span>
                  </span>
                  <span className="text-slate-500 group-hover:text-sky-400 transition-colors">
                    {isActive ? 'ACTIVE' : 'TEST ➔'}
                  </span>
                </div>
              </div>

              {/* Active Indicator Bar at bottom */}
              {isActive && (
                <div className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${
                  isSafe ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                }`} />
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* REAL-TIME DIAGNOSTIC RESULT CONSOLE (ANSWERS "WHAT HAPPENED")  */}
      {/* ============================================================== */}
      <div className={`p-3 rounded-2xl border transition-all duration-300 ${
        activeDiagnostic.isHealthy
          ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
          : 'bg-rose-950/20 border-rose-500/25 text-rose-200'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2.5 pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            {activeDiagnostic.isHealthy ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
            )}
            <div>
              <span className="text-xs font-bold text-white font-mono uppercase tracking-tight">
                {activeDiagnostic.title}
              </span>
              <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                activeDiagnostic.isHealthy
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
              }`}>
                {activeDiagnostic.statusBadge}
              </span>
            </div>
          </div>

          {/* Interactive Actions for this vector */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <button
              onClick={() => handleCardClick(currentScenario, activeDiagnostic.title)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-[10px] font-semibold transition-all border border-white/[0.08]"
            >
              <RefreshCw className="w-3 h-3 text-sky-400" />
              <span>Re-Test Vector</span>
            </button>

            {!activeDiagnostic.isHealthy && (
              <button
                onClick={() => handleCardClick('NORMAL', 'Normal Safe Baseline')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold transition-all border border-emerald-500/40"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Restore Safe Day</span>
              </button>
            )}

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('INCIDENTS')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 text-[10px] font-semibold transition-all border border-sky-500/30"
              >
                <span>View Stream</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Forensic Details & Mitigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 text-[11px]">
          <div className="bg-black/25 p-2 rounded-xl border border-white/[0.04]">
            <span className="text-[10px] text-slate-400 block font-mono uppercase">Target Identity</span>
            <strong className="text-white font-medium block truncate mt-0.5">{activeDiagnostic.identity}</strong>
          </div>
          <div className="bg-black/25 p-2 rounded-xl border border-white/[0.04] md:col-span-2">
            <span className="text-[10px] text-slate-400 block font-mono uppercase">Telemetry Evidence</span>
            <p className="text-slate-300 leading-snug mt-0.5">{activeDiagnostic.evidence}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
