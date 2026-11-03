import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { SimulatorBar, ScenarioType } from './components/SimulatorBar';
import { HeroSection } from './components/HeroSection';
import { RiskScoreCard } from './components/RiskScoreCard';
import { IdentityHygieneTable } from './components/IdentityHygieneTable';
import { ThreatVelocityCard } from './components/ThreatVelocityCard';
import { ReportModal } from './components/ReportModal';
import { AnalyzerView } from './components/analyzer/AnalyzerView';
import { IncidentStreamTab } from './components/tabs/IncidentStreamTab';
import { MitigationCenterTab } from './components/tabs/MitigationCenterTab';
import { PolicyStudioTab } from './components/tabs/PolicyStudioTab';
import { AppLoader } from './components/AppLoader';
import { LiveSecurityTicker } from './components/LiveSecurityTicker';
import { IdentityDossierModal, IdentityProfile } from './components/IdentityDossierModal';
import { 
  INITIAL_TELEMETRY, 
  INITIAL_RADAR_METRICS, 
  INITIAL_SATELLITE_NODES, 
  INITIAL_HYGIENE_ROWS, 
  INITIAL_ANOMALIES, 
  INITIAL_TREND_POINTS 
} from './data/dashboardData';
import { TelemetryState, RadarMetric, SatelliteAttackNode } from './types/dashboard';
import { 
  LayoutDashboard, Network, Terminal, ShieldAlert, Sliders, 
  AlertTriangle, ShieldCheck, Info, X, Zap 
} from 'lucide-react';

interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'danger' | 'warning' | 'success' | 'info';
}

const SARAH_CHEN_DOSSIER: IdentityProfile = {
  id: 'usr-001',
  name: 'Sarah Chen',
  email: 'sarah.chen@innovatech.io',
  role: 'Lead Cloud Architect',
  department: 'Cloud Infrastructure',
  riskScore: 88,
  status: 'FLAGGED',
  activeDevicesCount: 2,
  activeSessionsCount: 3,
  lastLoginCity: 'Frankfurt',
  lastLoginCountry: 'Germany',
  ipAddress: '185.220.101.5',
  mfaMethod: 'FIDO2 YubiKey 5C NFC',
  recentIncidents: [
    'Impossible Travel: San Francisco to Frankfurt in 8m (Speed: 8,820 km/h)',
    'Session Token Replay attempted on /admin/iam from foreign cloud host'
  ],
  anomaliesDetected: [
    'Consecutive logins physically impossible by air transport',
    'TCP Fingerprint matches Linux server while browser claims macOS Safari',
    'Active session token age exceeds zero-trust 2.0-hour limit by +1.9 hours'
  ]
};

// Pure native Web Audio API high-tech sound synthesizer (zero external dependencies)
const playCyberChime = (tone: 'danger' | 'success') => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    if (tone === 'danger') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Graceful no-op if blocked by browser autoplay policy
  }
};

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'ANALYZER' | 'INCIDENTS' | 'MITIGATIONS' | 'POLICIES'>('DASHBOARD');
  const [telemetry, setTelemetry] = useState<TelemetryState>(INITIAL_TELEMETRY);
  const [radarMetrics, setRadarMetrics] = useState<RadarMetric[]>(INITIAL_RADAR_METRICS);
  const [satelliteNodes, setSatelliteNodes] = useState<SatelliteAttackNode[]>(INITIAL_SATELLITE_NODES);
  const [currentScenario, setCurrentScenario] = useState<ScenarioType>('IMPOSSIBLE_TRAVEL');
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (title: string, message: string, type: 'danger' | 'warning' | 'success' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev.slice(-3), { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Subtle living telemetry pulse ticker
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const jitterSpeed = prev.travelVelocityKmH > 0
          ? prev.travelVelocityKmH + (Math.random() > 0.5 ? 6 : -6)
          : 0;
        return {
          ...prev,
          travelVelocityKmH: jitterSpeed
        };
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  // Handle scenario selection to test live telemetry reaction
  const handleSelectScenario = (scenario: ScenarioType) => {
    setCurrentScenario(scenario);
    if (scenario === 'BASELINE') {
      playCyberChime('success');
    } else {
      playCyberChime('danger');
    }

    if (scenario === 'IMPOSSIBLE_TRAVEL') {
      setTelemetry({
        riskPercentile: 74,
        riskScoreNormalized: 0.76,
        baselineScore: 0.15,
        attackVelocityRatio: 4.2,
        travelVelocityKmH: 8820,
        tokenLifetimeHours: 5.2,
        policyExcessHours: 3.4,
        legitimateLoginRatio: 62,
        velocityChange1h: 42.8,
        defconLevel: 1,
        activeIncidentsCount: 5
      });
      setRadarMetrics([
        { axis: 'Passwords', value: 85, label: 'Repeated wrong password attempts' },
        { axis: 'Locations', value: 95, label: 'Logins from two cities at once' },
        { axis: 'Phone Alert', value: 70, label: 'Spam phone approval popups' },
        { axis: 'New Devices', value: 75, label: 'Unrecognized computers or smartphones' },
        { axis: 'Hidden Net', value: 80, label: 'Connections hiding identity or location' },
        { axis: 'Password Reset', value: 60, label: 'Immediate password resets after failed attempts' },
      ]);
      addToast(
        'Fast Impossible Travel Detected',
        'User logged in from Germany only 8 minutes after San Francisco. Someone may be using stolen login tokens.',
        'danger'
      );
    } else if (scenario === 'BRUTE_FORCE') {
      setTelemetry({
        riskPercentile: 88,
        riskScoreNormalized: 0.88,
        baselineScore: 0.15,
        attackVelocityRatio: 6.8,
        travelVelocityKmH: 450,
        tokenLifetimeHours: 4.8,
        policyExcessHours: 2.9,
        legitimateLoginRatio: 41,
        velocityChange1h: 68.4,
        defconLevel: 1,
        activeIncidentsCount: 9
      });
      setRadarMetrics([
        { axis: 'Passwords', value: 98, label: 'Password guessing & repeated attempts' },
        { axis: 'Locations', value: 45, label: 'Logins from unexpected cities or countries' },
        { axis: 'Phone Alert', value: 82, label: 'Repeated phone confirmation requests' },
        { axis: 'New Devices', value: 88, label: 'Unrecognized computers or smartphones' },
        { axis: 'Hidden Net', value: 92, label: 'Connections hiding identity or location' },
        { axis: 'Password Reset', value: 74, label: 'Immediate password resets after failed attempts' },
      ]);
      addToast(
        'Rapid Password Guessing Detected',
        '7 wrong passwords entered in 30 seconds across multiple accounts. Danger level elevated to 88.',
        'danger'
      );
    } else if (scenario === 'MFA_BOMBING') {
      setTelemetry({
        riskPercentile: 79,
        riskScoreNormalized: 0.79,
        baselineScore: 0.15,
        attackVelocityRatio: 5.1,
        travelVelocityKmH: 120,
        tokenLifetimeHours: 3.9,
        policyExcessHours: 1.8,
        legitimateLoginRatio: 52,
        velocityChange1h: 51.2,
        defconLevel: 2,
        activeIncidentsCount: 4
      });
      setRadarMetrics([
        { axis: 'Passwords', value: 40, label: 'Password guessing & repeated attempts' },
        { axis: 'Locations', value: 30, label: 'Logins from unexpected cities or countries' },
        { axis: 'Phone Alert', value: 96, label: 'Repeated phone confirmation requests' },
        { axis: 'New Devices', value: 70, label: 'Unrecognized computers or smartphones' },
        { axis: 'Hidden Net', value: 65, label: 'Connections hiding identity or location' },
        { axis: 'Password Reset', value: 45, label: 'Immediate password resets after failed attempts' },
      ]);
      addToast(
        'Phone Approval Spam Detected',
        '4 verification popups sent to phone in 18 seconds to trick the employee into tapping Accept.',
        'warning'
      );
    } else if (scenario === 'TOR_RESET') {
      setTelemetry({
        riskPercentile: 84,
        riskScoreNormalized: 0.84,
        baselineScore: 0.15,
        attackVelocityRatio: 5.9,
        travelVelocityKmH: 2400,
        tokenLifetimeHours: 4.5,
        policyExcessHours: 2.2,
        legitimateLoginRatio: 48,
        velocityChange1h: 62.0,
        defconLevel: 1,
        activeIncidentsCount: 6
      });
      setRadarMetrics([
        { axis: 'Passwords', value: 65, label: 'Password guessing & repeated attempts' },
        { axis: 'Locations', value: 85, label: 'Logins from unexpected cities or countries' },
        { axis: 'Phone Alert', value: 55, label: 'Repeated phone confirmation requests' },
        { axis: 'New Devices', value: 90, label: 'Unrecognized computers or smartphones' },
        { axis: 'Hidden Net', value: 99, label: 'Connections hiding identity or location' },
        { axis: 'Password Reset', value: 94, label: 'Immediate password resets after failed attempts' },
      ]);
      addToast(
        'Hidden Hacker Network Detected',
        'Password reset request initiated from an anonymous network known to conceal hacker locations.',
        'danger'
      );
    } else if (scenario === 'BASELINE') {
      setTelemetry({
        riskPercentile: 15,
        riskScoreNormalized: 0.15,
        baselineScore: 0.15,
        attackVelocityRatio: 0.9,
        travelVelocityKmH: 0,
        tokenLifetimeHours: 1.1,
        policyExcessHours: 0.0,
        legitimateLoginRatio: 98,
        velocityChange1h: -4.5,
        defconLevel: 5,
        activeIncidentsCount: 0
      });
      setRadarMetrics([
        { axis: 'Passwords', value: 10, label: 'Password guessing & repeated attempts' },
        { axis: 'Locations', value: 8, label: 'Logins from unexpected cities or countries' },
        { axis: 'Phone Alert', value: 12, label: 'Repeated phone confirmation requests' },
        { axis: 'New Devices', value: 15, label: 'Unrecognized computers or smartphones' },
        { axis: 'Hidden Net', value: 10, label: 'Connections hiding identity or location' },
        { axis: 'Password Reset', value: 5, label: 'Immediate password resets after failed attempts' },
      ]);
      addToast(
        'Normal Safe Day Restored',
        'All team logins look safe and within regular employee habits.',
        'success'
      );
    }
  };

  const handleMitigate = () => {
    playCyberChime('success');
    setTelemetry((prev) => ({
      ...prev,
      riskPercentile: 24,
      riskScoreNormalized: 0.24,
      attackVelocityRatio: 1.1,
      defconLevel: 4,
      activeIncidentsCount: 0
    }));
    addToast(
      'Hacker Logged Out Successfully',
      'Suspicious user session has been terminated and the attacker IP address was blocked.',
      'success'
    );
  };

  const handleToggleStream = () => {
    const nextState = !isLiveStream;
    setIsLiveStream(nextState);
    addToast(
      nextState ? 'Live Monitoring Active' : 'Live Monitoring Paused',
      nextState ? 'Real-time protection is watching for attacks.' : 'Monitoring paused by operator.',
      'info'
    );
  };

  return (
    <>
      {/* Sleek App Startup Loading Screen */}
      {isLoading && <AppLoader onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex items-center justify-center p-3 sm:p-6 relative overflow-hidden font-sans">
        
        {/* Sunset / Dusk Horizon Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#311f2f] via-[#161a26] to-[#0a0d14] pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-rose-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none"></div>
        
        {/* Interactive Toast Notifications Stack */}
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`pointer-events-auto p-3 rounded-2xl border shadow-2xl backdrop-blur-xl animate-toast-in flex items-start gap-2.5 ${
                t.type === 'danger'
                  ? 'bg-[#181119]/95 border-rose-500/60 text-white ring-1 ring-rose-500/30'
                  : t.type === 'warning'
                  ? 'bg-[#191610]/95 border-amber-500/60 text-white ring-1 ring-amber-500/30'
                  : t.type === 'success'
                  ? 'bg-[#0f1915]/95 border-emerald-500/60 text-white ring-1 ring-emerald-500/30'
                  : 'bg-[#121824]/95 border-sky-500/60 text-white ring-1 ring-sky-500/30'
              }`}
            >
              <div className="mt-0.5">
                {t.type === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
                {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {t.type === 'success' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                {t.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
              </div>

              <div className="flex-1">
                <div className="text-xs font-bold font-sans">{t.title}</div>
                <div className="text-[11px] text-slate-300 leading-snug mt-0.5">{t.message}</div>
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Master Rounded Glass Monolith Container */}
        <div className="relative z-10 w-full max-w-[1440px] bg-[#121722]/95 border border-white/[0.06] rounded-[32px] p-5 sm:p-7 backdrop-blur-3xl shadow-panel flex flex-col transition-all duration-300">
          
          {/* Top Header Bar */}
          <HeaderBar
            telemetry={telemetry}
            isLiveStream={isLiveStream}
            onToggleStream={handleToggleStream}
            onOpenReport={() => setIsReportOpen(true)}
            onReScan={() => setIsLoading(true)}
          />

          {/* Real-Time Living Security Event Ticker Bar */}
          <LiveSecurityTicker isLiveStream={isLiveStream} />

          {/* Master Navigation Tabs Switcher (Borderless clean pills) */}
          <div className="flex items-center gap-1 mb-4 p-1 rounded-2xl bg-white/[0.02] overflow-x-auto max-w-full select-none">
            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
                activeTab === 'DASHBOARD'
                  ? 'bg-white/[0.08] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
              <span>Security Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('ANALYZER')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
                activeTab === 'ANALYZER'
                  ? 'bg-white/[0.08] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-amber-400" />
              <span>History Tree</span>
            </button>

            <button
              onClick={() => setActiveTab('INCIDENTS')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
                activeTab === 'INCIDENTS'
                  ? 'bg-white/[0.08] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-rose-400" />
              <span>Recent Activity</span>
            </button>

            <button
              onClick={() => setActiveTab('MITIGATIONS')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
                activeTab === 'MITIGATIONS'
                  ? 'bg-white/[0.08] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Block & Log Out</span>
            </button>

            <button
              onClick={() => setActiveTab('POLICIES')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
                activeTab === 'POLICIES'
                  ? 'bg-white/[0.08] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>Settings & Rules</span>
            </button>
          </div>

          {/* ============================================================== */}
          {/* TAB 1: SECURITY DASHBOARD                                      */}
          {/* ============================================================== */}
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-4 animate-toast-in">
              {/* Test Threats Simulator Bar */}
              <SimulatorBar
                currentScenario={currentScenario}
                onSelectScenario={handleSelectScenario}
              />

              {/* TOP 55%: Concentric Living Arc + Radar + Token Entropy */}
              <HeroSection
                telemetry={telemetry}
                percentile={telemetry.riskPercentile}
                tokenHours={telemetry.tokenLifetimeHours}
                excessHours={telemetry.policyExcessHours}
                radarMetrics={radarMetrics}
                satelliteNodes={satelliteNodes}
                trendPoints={INITIAL_TREND_POINTS}
                onViewReport={() => setIsReportOpen(true)}
              />

              {/* BOTTOM 45%: 3 Rounded Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[300px]">
                
                {/* CARD 01: Account Danger Score */}
                <RiskScoreCard
                  scoreNormalized={telemetry.riskScoreNormalized}
                  baselineScore={telemetry.baselineScore}
                  anomalies={INITIAL_ANOMALIES}
                  onViewReport={() => setIsReportOpen(true)}
                />

                {/* CARD 02: Login Safety Check */}
                <IdentityHygieneTable
                  legitimateRatio={telemetry.legitimateLoginRatio}
                  rows={INITIAL_HYGIENE_ROWS}
                  deviceTrustIndex="1.4 / 5.0"
                  velocityRatio="3.7"
                  onInspectDossier={() => setIsDossierOpen(true)}
                />

                {/* CARD 03: Hacker Speed & Fast Travel */}
                <ThreatVelocityCard
                  velocityKmH={telemetry.travelVelocityKmH}
                  percentile={telemetry.riskPercentile}
                  changePercent={telemetry.velocityChange1h}
                  onMitigate={handleMitigate}
                />

              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: HISTORY TREE (STORED INTELLIGENCE)                      */}
          {/* ============================================================== */}
          {activeTab === 'ANALYZER' && (
            <div className="animate-toast-in">
              <AnalyzerView />
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: RECENT ACTIVITY (INCIDENTS)                            */}
          {/* ============================================================== */}
          {activeTab === 'INCIDENTS' && (
            <div className="animate-toast-in">
              <IncidentStreamTab />
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: BLOCK & LOG OUT (MITIGATIONS)                           */}
          {/* ============================================================== */}
          {activeTab === 'MITIGATIONS' && (
            <div className="animate-toast-in">
              <MitigationCenterTab onKillAllSessions={handleMitigate} />
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: SETTINGS & RULES (POLICIES)                            */}
          {/* ============================================================== */}
          {activeTab === 'POLICIES' && (
            <div className="animate-toast-in">
              <PolicyStudioTab />
            </div>
          )}

        </div>

        {/* Printable Forensic Audit Report Modal */}
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          telemetry={telemetry}
        />

        {/* Interactive Employee Forensic Dossier Modal */}
        <IdentityDossierModal
          user={SARAH_CHEN_DOSSIER}
          isOpen={isDossierOpen}
          onClose={() => setIsDossierOpen(false)}
          onRemediateAction={(actionName, email) => {
            addToast('Security Action Dispatched', `${actionName} applied successfully to ${email}`, 'success');
          }}
        />

      </div>
    </>
  );
}
