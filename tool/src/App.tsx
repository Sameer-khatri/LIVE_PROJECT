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

export default function App() {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'ANALYZER' | 'INCIDENTS' | 'MITIGATIONS' | 'POLICIES'>('DASHBOARD');
  const [telemetry, setTelemetry] = useState<TelemetryState>(INITIAL_TELEMETRY);
  const [radarMetrics, setRadarMetrics] = useState<RadarMetric[]>(INITIAL_RADAR_METRICS);
  const [satelliteNodes, setSatelliteNodes] = useState<SatelliteAttackNode[]>(INITIAL_SATELLITE_NODES);
  const [currentScenario, setCurrentScenario] = useState<ScenarioType>('IMPOSSIBLE_TRAVEL');
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
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
        { axis: 'Credential', value: 85, label: 'Brute force & spray rate' },
        { axis: 'Geo', value: 95, label: 'Impossible travel delta' },
        { axis: 'MFA', value: 70, label: 'Push-bombing fatigue' },
        { axis: 'Device', value: 75, label: 'Novel hardware fingerprint' },
        { axis: 'Network', value: 80, label: 'Tor exit / Cloud ASN' },
        { axis: 'Privilege', value: 60, label: 'Rapid reset post-failure' },
      ]);
      addToast(
        '🚨 Vector Injected: Impossible Travel',
        'Physical velocity computed at 8,820 km/h between SF and Frankfurt. DEFCON 1 triggered.',
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
        { axis: 'Credential', value: 98, label: 'Brute force & spray rate' },
        { axis: 'Geo', value: 45, label: 'Impossible travel delta' },
        { axis: 'MFA', value: 82, label: 'Push-bombing fatigue' },
        { axis: 'Device', value: 88, label: 'Novel hardware fingerprint' },
        { axis: 'Network', value: 92, label: 'Tor exit / Cloud ASN' },
        { axis: 'Privilege', value: 74, label: 'Rapid reset post-failure' },
      ]);
      addToast(
        '🚨 Vector Injected: Credential Stuffing',
        '7 failed authentications within 36s across AS44050 cloud infrastructure. Risk score elevated to 88.',
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
        { axis: 'Credential', value: 40, label: 'Brute force & spray rate' },
        { axis: 'Geo', value: 30, label: 'Impossible travel delta' },
        { axis: 'MFA', value: 96, label: 'Push-bombing fatigue' },
        { axis: 'Device', value: 70, label: 'Novel hardware fingerprint' },
        { axis: 'Network', value: 65, label: 'Tor exit / Cloud ASN' },
        { axis: 'Privilege', value: 45, label: 'Rapid reset post-failure' },
      ]);
      addToast(
        '⚠️ Vector Injected: MFA Push Fatigue',
        '4 push notifications dispatched within 18s. User fatigue exploitation in progress.',
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
        { axis: 'Credential', value: 65, label: 'Brute force & spray rate' },
        { axis: 'Geo', value: 85, label: 'Impossible travel delta' },
        { axis: 'MFA', value: 55, label: 'Push-bombing fatigue' },
        { axis: 'Device', value: 90, label: 'Novel hardware fingerprint' },
        { axis: 'Network', value: 99, label: 'Tor exit / Cloud ASN' },
        { axis: 'Privilege', value: 94, label: 'Rapid reset post-failure' },
      ]);
      addToast(
        '🚨 Vector Injected: Tor Anonymizer Hijack',
        'Password reset request initiated from known Tor exit node (185.220.101.5).',
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
        { axis: 'Credential', value: 10, label: 'Brute force & spray rate' },
        { axis: 'Geo', value: 8, label: 'Impossible travel delta' },
        { axis: 'MFA', value: 12, label: 'Push-bombing fatigue' },
        { axis: 'Device', value: 15, label: 'Novel hardware fingerprint' },
        { axis: 'Network', value: 10, label: 'Tor exit / Cloud ASN' },
        { axis: 'Privilege', value: 5, label: 'Rapid reset post-failure' },
      ]);
      addToast(
        '✅ Baseline Posture Restored',
        'Telemetry normalized within zero-trust parameters. All risk metrics safe.',
        'success'
      );
    }
  };

  const handleMitigate = () => {
    setTelemetry((prev) => ({
      ...prev,
      riskPercentile: 24,
      riskScoreNormalized: 0.24,
      attackVelocityRatio: 1.1,
      defconLevel: 4,
      activeIncidentsCount: 0
    }));
    addToast(
      '🛡️ Autonomous Containment Executed',
      'Stale OAuth session tokens revoked and actor IP quarantined. Threat surface mitigated.',
      'success'
    );
  };

  const handleToggleStream = () => {
    const nextState = !isLiveStream;
    setIsLiveStream(nextState);
    addToast(
      nextState ? '📡 Live Stream Resumed' : '⏸️ Telemetry Stream Paused',
      nextState ? 'In-memory engine polling security telemetry.' : 'Telemetry ingestion paused by operator.',
      'info'
    );
  };

  return (
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
      <div className="relative z-10 w-full max-w-[1440px] bg-[#121722]/95 border border-[#273244] rounded-[32px] p-5 sm:p-7 backdrop-blur-3xl shadow-panel flex flex-col transition-all duration-300">
        
        {/* Top Header Bar */}
        <HeaderBar
          telemetry={telemetry}
          isLiveStream={isLiveStream}
          onToggleStream={handleToggleStream}
          onOpenReport={() => setIsReportOpen(true)}
        />

        {/* Master Navigation Tabs Switcher (All 5 Modules) */}
        <div className="flex items-center gap-1.5 mb-5 p-1 rounded-2xl bg-dark-inset border border-dark-borderSubtle overflow-x-auto max-w-full select-none">
          <button
            onClick={() => setActiveTab('DASHBOARD')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
              activeTab === 'DASHBOARD'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60 ring-1 ring-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card/40'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
            <span>Living Operations Center</span>
          </button>

          <button
            onClick={() => setActiveTab('ANALYZER')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
              activeTab === 'ANALYZER'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60 ring-1 ring-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card/40'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-amber-400" />
            <span>Stored Intelligence (Analyzer Graph)</span>
          </button>

          <button
            onClick={() => setActiveTab('INCIDENTS')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
              activeTab === 'INCIDENTS'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60 ring-1 ring-rose-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card/40'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span>Incident Stream & Triage</span>
          </button>

          <button
            onClick={() => setActiveTab('MITIGATIONS')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
              activeTab === 'MITIGATIONS'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60 ring-1 ring-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autonomous Responses</span>
          </button>

          <button
            onClick={() => setActiveTab('POLICIES')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
              activeTab === 'POLICIES'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60 ring-1 ring-purple-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card/40'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Policy Studio</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: LIVING OPERATIONS SOC DASHBOARD                         */}
        {/* ============================================================== */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-4 animate-toast-in">
            {/* Live Attack Scenario Simulator Bar */}
            <SimulatorBar
              currentScenario={currentScenario}
              onSelectScenario={handleSelectScenario}
            />

            {/* TOP 55%: Concentric Living Arc + Radar + Token Entropy */}
            <HeroSection
              telemetry={telemetry}
              radarMetrics={radarMetrics}
              satelliteNodes={satelliteNodes}
              trendPoints={INITIAL_TREND_POINTS}
              onViewReport={() => setIsReportOpen(true)}
            />

            {/* BOTTOM 45%: 3 Rounded Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[300px]">
              
              {/* ANALYTICS CARD 01: Composite Risk Score */}
              <RiskScoreCard
                scoreNormalized={telemetry.riskScoreNormalized}
                baselineScore={telemetry.baselineScore}
                anomalies={INITIAL_ANOMALIES}
                onViewReport={() => setIsReportOpen(true)}
              />

              {/* ANALYTICS CARD 02: Identity Hygiene (UEBA) */}
              <IdentityHygieneTable
                legitimateRatio={telemetry.legitimateLoginRatio}
                rows={INITIAL_HYGIENE_ROWS}
                deviceTrustIndex="Suboptimal 1.4"
                velocityRatio="Normal 3.7"
              />

              {/* ANALYTICS CARD 03: Threat Velocity & Autonomous Containment */}
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
        {/* TAB 2: STORED INTELLIGENCE OSINT GRAPH ANALYZER                */}
        {/* ============================================================== */}
        {activeTab === 'ANALYZER' && (
          <div className="animate-toast-in">
            <AnalyzerView />
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: REAL-TIME INCIDENT STREAM & TRIAGE                       */}
        {/* ============================================================== */}
        {activeTab === 'INCIDENTS' && (
          <div className="animate-toast-in">
            <IncidentStreamTab />
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: AUTONOMOUS MITIGATION CENTER                            */}
        {/* ============================================================== */}
        {activeTab === 'MITIGATIONS' && (
          <div className="animate-toast-in">
            <MitigationCenterTab />
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: POLICY STUDIO & THRESHOLD CALIBRATION                   */}
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

    </div>
  );
}
