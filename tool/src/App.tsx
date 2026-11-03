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
import { LayoutDashboard, Network, Terminal, ShieldAlert, Sliders } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'ANALYZER' | 'INCIDENTS' | 'MITIGATIONS' | 'POLICIES'>('DASHBOARD');
  const [telemetry, setTelemetry] = useState<TelemetryState>(INITIAL_TELEMETRY);
  const [radarMetrics, setRadarMetrics] = useState<RadarMetric[]>(INITIAL_RADAR_METRICS);
  const [satelliteNodes, setSatelliteNodes] = useState<SatelliteAttackNode[]>(INITIAL_SATELLITE_NODES);
  const [currentScenario, setCurrentScenario] = useState<ScenarioType>('IMPOSSIBLE_TRAVEL');
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Subtle living pulse ticker
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const jitterSpeed = prev.travelVelocityKmH > 0
          ? prev.travelVelocityKmH + (Math.random() > 0.5 ? 4 : -4)
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
    } else if (scenario === 'MFA_BOMBING') {
      setTelemetry({
        riskPercentile: 68,
        riskScoreNormalized: 0.68,
        baselineScore: 0.15,
        attackVelocityRatio: 3.1,
        travelVelocityKmH: 220,
        tokenLifetimeHours: 3.1,
        policyExcessHours: 1.2,
        legitimateLoginRatio: 69,
        velocityChange1h: 31.0,
        defconLevel: 2,
        activeIncidentsCount: 3
      });
      setRadarMetrics([
        { axis: 'Credential', value: 50, label: 'Brute force & spray rate' },
        { axis: 'Geo', value: 30, label: 'Impossible travel delta' },
        { axis: 'MFA', value: 96, label: 'Push-bombing fatigue' },
        { axis: 'Device', value: 55, label: 'Novel hardware fingerprint' },
        { axis: 'Network', value: 60, label: 'Tor exit / Cloud ASN' },
        { axis: 'Privilege', value: 40, label: 'Rapid reset post-failure' },
      ]);
    } else if (scenario === 'TOR_RESET') {
      setTelemetry({
        riskPercentile: 91,
        riskScoreNormalized: 0.91,
        baselineScore: 0.15,
        attackVelocityRatio: 5.5,
        travelVelocityKmH: 3100,
        tokenLifetimeHours: 6.0,
        policyExcessHours: 4.1,
        legitimateLoginRatio: 48,
        velocityChange1h: 55.2,
        defconLevel: 1,
        activeIncidentsCount: 7
      });
      setRadarMetrics([
        { axis: 'Credential', value: 78, label: 'Brute force & spray rate' },
        { axis: 'Geo', value: 65, label: 'Impossible travel delta' },
        { axis: 'MFA', value: 72, label: 'Push-bombing fatigue' },
        { axis: 'Device', value: 80, label: 'Novel hardware fingerprint' },
        { axis: 'Network', value: 99, label: 'Tor exit / Cloud ASN' },
        { axis: 'Privilege', value: 95, label: 'Rapid reset post-failure' },
      ]);
    } else {
      // Normal Legitimate Baseline
      setTelemetry({
        riskPercentile: 12,
        riskScoreNormalized: 0.12,
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
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex items-center justify-center p-3 sm:p-6 relative overflow-hidden font-sans">
      
      {/* Sunset / Dusk Horizon Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#311f2f] via-[#161a26] to-[#0a0d14] pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-rose-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none"></div>
      
      {/* Master Rounded Glass Monolith Container */}
      <div className="relative z-10 w-full max-w-[1440px] bg-[#121722]/95 border border-[#273244] rounded-[32px] p-5 sm:p-7 backdrop-blur-3xl shadow-panel flex flex-col">
        
        {/* Top Header Bar */}
        <HeaderBar
          telemetry={telemetry}
          isLiveStream={isLiveStream}
          onToggleStream={() => setIsLiveStream(!isLiveStream)}
          onOpenReport={() => setIsReportOpen(true)}
        />

        {/* Master Navigation Tabs Switcher (All 5 Modules) */}
        <div className="flex items-center gap-1.5 mb-5 p-1 rounded-2xl bg-dark-inset border border-dark-borderSubtle overflow-x-auto max-w-full select-none">
          <button
            onClick={() => setActiveTab('DASHBOARD')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              activeTab === 'DASHBOARD'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
            <span>Living Operations Center</span>
          </button>

          <button
            onClick={() => setActiveTab('ANALYZER')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              activeTab === 'ANALYZER'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60 ring-1 ring-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-amber-400" />
            <span>Stored Intelligence (Analyzer Graph)</span>
          </button>

          <button
            onClick={() => setActiveTab('INCIDENTS')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              activeTab === 'INCIDENTS'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span>Incident Stream & Triage</span>
          </button>

          <button
            onClick={() => setActiveTab('MITIGATIONS')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              activeTab === 'MITIGATIONS'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autonomous Responses</span>
          </button>

          <button
            onClick={() => setActiveTab('POLICIES')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              activeTab === 'POLICIES'
                ? 'bg-[#1b2332] text-white shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Policy Studio</span>
          </button>
        </div>

        {/* TAB 1: EXECUTIVE LIVING DASHBOARD */}
        {activeTab === 'DASHBOARD' && (
          <>
            <SimulatorBar
              currentScenario={currentScenario}
              onSelectScenario={handleSelectScenario}
            />

            <HeroSection
              percentile={telemetry.riskPercentile}
              radarMetrics={radarMetrics}
              satelliteNodes={satelliteNodes}
              tokenHours={telemetry.tokenLifetimeHours}
              excessHours={telemetry.policyExcessHours}
              trendPoints={INITIAL_TREND_POINTS}
              onViewReport={() => setIsReportOpen(true)}
              onSelectNode={(node) => console.log('Selected node:', node)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <RiskScoreCard
                scoreNormalized={telemetry.riskScoreNormalized}
                baselineScore={telemetry.baselineScore}
                anomalies={INITIAL_ANOMALIES}
                onViewReport={() => setIsReportOpen(true)}
              />

              <IdentityHygieneTable
                legitimateRatio={telemetry.legitimateLoginRatio}
                rows={INITIAL_HYGIENE_ROWS}
                deviceTrustIndex="Suboptimal 1.4"
                velocityRatio={`Elevated ${telemetry.attackVelocityRatio}x`}
              />

              <ThreatVelocityCard
                velocityKmH={telemetry.travelVelocityKmH}
                percentile={94}
                changePercent={telemetry.velocityChange1h}
                onMitigate={handleMitigate}
              />
            </div>
          </>
        )}

        {/* TAB 2: STORED INTELLIGENCE (ANALYZER GRAPH) */}
        {activeTab === 'ANALYZER' && (
          <AnalyzerView />
        )}

        {/* TAB 3: REAL-TIME INCIDENT STREAM & TRIAGE */}
        {activeTab === 'INCIDENTS' && (
          <IncidentStreamTab onRevokeSession={handleMitigate} />
        )}

        {/* TAB 4: AUTONOMOUS MITIGATION CENTER */}
        {activeTab === 'MITIGATIONS' && (
          <MitigationCenterTab onKillAllSessions={handleMitigate} />
        )}

        {/* TAB 5: POLICY & RULE STUDIO */}
        {activeTab === 'POLICIES' && (
          <PolicyStudioTab />
        )}

      </div>

      {/* Forensic Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        telemetry={telemetry}
      />

    </div>
  );
}

export default App;
