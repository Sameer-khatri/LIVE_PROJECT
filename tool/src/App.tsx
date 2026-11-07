import React, { useState, useEffect, useCallback } from 'react';
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
import { GlobalAttackMapModal } from './components/GlobalAttackMapModal';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { fetchHealth, triggerSimulationApi, killAllSessionsApi, revokeSessionApi } from './services/api';
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
  riskScore: 96,
  status: 'FLAGGED',
  activeDevicesCount: 2,
  activeSessionsCount: 3,
  lastLoginCity: 'Frankfurt',
  lastLoginCountry: 'Germany',
  ipAddress: '185.220.101.5',
  mfaMethod: 'FIDO2 YubiKey 5C NFC',
  recentIncidents: [
    'Impossible Travel: San Francisco to Frankfurt in 8.2m (Speed: 8,820 km/h)',
    'Session Token Replay attempted on /admin/iam from foreign cloud host',
    'Tor Exit Node IP connection 185.220.101.5'
  ],
  anomaliesDetected: [
    'Consecutive logins physically impossible by air transport (Mach 7.1)',
    'TCP Fingerprint matches Linux server while browser claims macOS Safari',
    'Active session token age exceeds zero-trust 2.0-hour limit by +1.9 hours'
  ]
};

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'ANALYZER' | 'INCIDENTS' | 'MITIGATIONS' | 'POLICIES'>('DASHBOARD');
  const [telemetry, setTelemetry] = useState<TelemetryState>(INITIAL_TELEMETRY);
  const [radarMetrics, setRadarMetrics] = useState<RadarMetric[]>(INITIAL_RADAR_METRICS);
  const [satelliteNodes, setSatelliteNodes] = useState<SatelliteAttackNode[]>(INITIAL_SATELLITE_NODES);
  const [currentScenario, setCurrentScenario] = useState<ScenarioType>('NORMAL');
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  
  // Tactical Modal & Drawer states
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // High-fidelity acoustic cyber sound synthesizer
  const playCyberSound = useCallback((type: 'danger' | 'success' | 'zap' | 'radar') => {
    if (isAudioMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'danger') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      } else if (type === 'zap') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      } else if (type === 'radar') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
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
    } catch {
      // Graceful fallback
    }
  }, [isAudioMuted]);

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

  // Keyboard Shortcuts System (1-5, C, G, M, Space, ?, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === '1') setActiveTab('DASHBOARD');
      else if (e.key === '2') setActiveTab('ANALYZER');
      else if (e.key === '3') setActiveTab('INCIDENTS');
      else if (e.key === '4') setActiveTab('MITIGATIONS');
      else if (e.key === '5') setActiveTab('POLICIES');
      else if (e.key === 'c' || e.key === 'C') setIsCopilotOpen((prev) => !prev);
      else if (e.key === 'g' || e.key === 'G') setIsMapOpen((prev) => !prev);
      else if (e.key === 'm' || e.key === 'M') handleMitigate();
      else if (e.key === '?') setIsShortcutsOpen((prev) => !prev);
      else if (e.key === ' ') {
        e.preventDefault();
        setIsLiveStream((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsMapOpen(false);
        setIsCopilotOpen(false);
        setIsShortcutsOpen(false);
        setIsReportOpen(false);
        setIsDossierOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check real backend status on mount
  useEffect(() => {
    fetchHealth().then((res) => {
      if (res.status === 'ONLINE') {
        setBackendOnline(true);
      }
    });
  }, []);

  // Active living telemetry heartbeat ticker
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const jitterSpeed = prev.travelVelocityKmH > 0
          ? Math.max(20, prev.travelVelocityKmH + (Math.random() > 0.5 ? 4 : -4))
          : 0;
        const jitterLegit = Number(
          Math.max(95.5, Math.min(99.2, prev.legitimateLoginRatio + (Math.random() > 0.5 ? 0.2 : -0.2))).toFixed(1)
        );
        return {
          ...prev,
          travelVelocityKmH: jitterSpeed,
          legitimateLoginRatio: jitterLegit
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  // Handle scenario selection to test live telemetry reaction
  const handleSelectScenario = (scenario: ScenarioType) => {
    setCurrentScenario(scenario);
    triggerSimulationApi(scenario);

    if (scenario === 'NORMAL') {
      playCyberSound('success');
    } else {
      playCyberSound('danger');
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
      setSatelliteNodes([
        {
          id: 'node-sso',
          name: 'Verified SSO Logins',
          percent: 62.4,
          category: 'Verified Safe',
          angleDeg: -160,
          icon: 'ShieldCheck',
          color: '#10b981',
          description: '1,280 team logins authenticated successfully through SSO.'
        },
        {
          id: 'node-biometric',
          name: 'Hardware Security Keys',
          percent: 19.8,
          category: 'Biometric Safe',
          angleDeg: -110,
          icon: 'Key',
          color: '#06b6d4',
          description: 'Hardware WebAuthn confirmations verified.'
        },
        {
          id: 'node-mobile',
          name: 'Enrolled Phone Fleet',
          percent: 7.2,
          category: 'Device Trust',
          angleDeg: -60,
          icon: 'Smartphone',
          color: '#6366f1',
          description: 'Corporate mobile apps with FaceID.'
        },
        {
          id: 'node-impossible-travel',
          name: 'Impossible Travel Spike',
          percent: 10.6,
          category: 'Velocity Threat',
          angleDeg: -15,
          icon: 'Plane',
          color: '#f43f5e',
          description: '8,820 km/h login anomaly detected between San Francisco and Frankfurt.'
        }
      ]);
      addToast(
        'Fast Impossible Travel Detected',
        'User logged in from Germany only 8 minutes after San Francisco (8,820 km/h). Token replay exfiltration suspected.',
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
      setSatelliteNodes([
        {
          id: 'node-sso',
          name: 'Verified SSO Logins',
          percent: 54.0,
          category: 'Verified Safe',
          angleDeg: -160,
          icon: 'ShieldCheck',
          color: '#10b981',
          description: '1,120 team logins authenticated successfully.'
        },
        {
          id: 'node-biometric',
          name: 'Hardware Security Keys',
          percent: 18.5,
          category: 'Biometric Safe',
          angleDeg: -110,
          icon: 'Key',
          color: '#06b6d4',
          description: 'Hardware WebAuthn confirmations verified.'
        },
        {
          id: 'node-mobile',
          name: 'Enrolled Phone Fleet',
          percent: 6.5,
          category: 'Device Trust',
          angleDeg: -60,
          icon: 'Smartphone',
          color: '#6366f1',
          description: 'Corporate mobile apps with FaceID.'
        },
        {
          id: 'node-spray',
          name: 'Credential Spraying',
          percent: 21.0,
          category: 'Brute Force Bot',
          angleDeg: -15,
          icon: 'Zap',
          color: '#f59e0b',
          description: '7 wrong passwords in 28 seconds against executive accounts.'
        }
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
      setSatelliteNodes([
        {
          id: 'node-sso',
          name: 'Verified SSO Logins',
          percent: 60.5,
          category: 'Verified Safe',
          angleDeg: -160,
          icon: 'ShieldCheck',
          color: '#10b981',
          description: 'Routine SSO logins active.'
        },
        {
          id: 'node-biometric',
          name: 'Hardware Security Keys',
          percent: 20.0,
          category: 'Biometric Safe',
          angleDeg: -110,
          icon: 'Key',
          color: '#06b6d4',
          description: 'Hardware WebAuthn confirmations verified.'
        },
        {
          id: 'node-mobile',
          name: 'Push Fatigue Spam',
          percent: 14.5,
          category: 'MFA Flood',
          angleDeg: -60,
          icon: 'Bomb',
          color: '#f59e0b',
          description: '4 rapid phone popups sent in 18 seconds to employee device.'
        },
        {
          id: 'node-flag',
          name: 'Anomalous Device',
          percent: 5.0,
          category: 'Device Anomaly',
          angleDeg: -15,
          icon: 'Smartphone',
          color: '#ec4899',
          description: 'Unrecognized iPhone client prompting approvals.'
        }
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
      setSatelliteNodes([
        {
          id: 'node-sso',
          name: 'Verified SSO Logins',
          percent: 58.0,
          category: 'Verified Safe',
          angleDeg: -160,
          icon: 'ShieldCheck',
          color: '#10b981',
          description: 'Routine SSO logins active.'
        },
        {
          id: 'node-biometric',
          name: 'Hardware Security Keys',
          percent: 19.5,
          category: 'Biometric Safe',
          angleDeg: -110,
          icon: 'Key',
          color: '#06b6d4',
          description: 'Hardware WebAuthn confirmations verified.'
        },
        {
          id: 'node-tor',
          name: 'Tor Exit Node Proxy',
          percent: 17.5,
          category: 'Masked Identity',
          angleDeg: -60,
          icon: 'Globe',
          color: '#a855f7',
          description: 'Password reset initiated through anonymous darknet proxy 185.220.101.5.'
        },
        {
          id: 'node-flag',
          name: 'Account Reset Bypass',
          percent: 5.0,
          category: 'Credential Recovery',
          angleDeg: -15,
          icon: 'Lock',
          color: '#f43f5e',
          description: 'Unauthorized password recovery token generation blocked.'
        }
      ]);
      addToast(
        'Hidden Hacker Network Detected',
        'Password reset request initiated from an anonymous network known to conceal hacker locations.',
        'danger'
      );
    } else if (scenario === 'NORMAL') {
      setTelemetry({
        riskPercentile: 18,
        riskScoreNormalized: 0.18,
        baselineScore: 0.15,
        attackVelocityRatio: 1.0,
        travelVelocityKmH: 0,
        tokenLifetimeHours: 1.2,
        policyExcessHours: 0.0,
        legitimateLoginRatio: 98.4,
        velocityChange1h: -4.5,
        defconLevel: 5,
        activeIncidentsCount: 0
      });
      setRadarMetrics([
        { axis: 'Passwords', value: 12, label: 'Password guessing & repeated attempts' },
        { axis: 'Locations', value: 8, label: 'Logins from unexpected cities or countries' },
        { axis: 'Phone Alert', value: 10, label: 'Repeated phone confirmation requests' },
        { axis: 'New Devices', value: 14, label: 'Unrecognized computers or smartphones' },
        { axis: 'Hidden Net', value: 8, label: 'Connections hiding identity or location' },
        { axis: 'Password Reset', value: 5, label: 'Immediate password resets after failed attempts' },
      ]);
      setSatelliteNodes(INITIAL_SATELLITE_NODES);
      addToast(
        'Normal Safe Day Restored',
        'All team logins look safe and within regular employee habits.',
        'success'
      );
    }
  };

  const handleMitigate = () => {
    playCyberSound('zap');
    killAllSessionsApi();
    setTelemetry((prev) => ({
      ...prev,
      riskPercentile: 22,
      riskScoreNormalized: 0.22,
      attackVelocityRatio: 1.0,
      travelVelocityKmH: 0,
      legitimateLoginRatio: 98.4,
      defconLevel: 4,
      activeIncidentsCount: 0
    }));
    addToast(
      'Hacker Logged Out Successfully',
      'Suspicious user session has been terminated and the attacker IP address was blocked at edge.',
      'success'
    );
  };

  const handleToggleStream = () => {
    const nextState = !isLiveStream;
    setIsLiveStream(nextState);
    playCyberSound('radar');
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

      <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex items-center justify-center p-2.5 sm:p-5 relative overflow-hidden font-sans">
        
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
        <div className="relative z-10 w-full max-w-[1440px] bg-[#121722]/95 border border-white/[0.06] rounded-[28px] p-4 sm:p-6 backdrop-blur-3xl shadow-panel flex flex-col transition-all duration-300">
          
          {/* Top Header Bar */}
          <HeaderBar
            telemetry={telemetry}
            isLiveStream={isLiveStream}
            isAudioMuted={isAudioMuted}
            onToggleAudio={() => setIsAudioMuted((prev) => !prev)}
            onToggleStream={handleToggleStream}
            onOpenReport={() => setIsReportOpen(true)}
            onOpenMap={() => setIsMapOpen(true)}
            onOpenCopilot={() => setIsCopilotOpen(true)}
            onOpenShortcuts={() => setIsShortcutsOpen(true)}
            onReScan={() => setIsLoading(true)}
          />

          {/* Real-Time Living Security Event Ticker Bar */}
          <LiveSecurityTicker isLiveStream={isLiveStream} />

          {/* Master Segmented Command Navigation Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 mb-3 p-1 rounded-2xl bg-[#131924]/80 border border-white/[0.06] select-none">
            
            {/* Left Segmented Tab Switcher with Micro-Badges & Keyboard Hints */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5">
              <button
                onClick={() => setActiveTab('DASHBOARD')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex-shrink-0 ${
                  activeTab === 'DASHBOARD'
                    ? 'bg-sky-500/20 text-white border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
                <span>Security Dashboard</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-sky-500/20 text-sky-300 font-bold">1 • HQ</span>
              </button>

              <button
                onClick={() => setActiveTab('ANALYZER')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex-shrink-0 ${
                  activeTab === 'ANALYZER'
                    ? 'bg-amber-500/20 text-white border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Network className="w-3.5 h-3.5 text-amber-400" />
                <span>History Tree</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 font-bold">2 • 10 Hubs</span>
              </button>

              <button
                onClick={() => setActiveTab('INCIDENTS')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex-shrink-0 ${
                  activeTab === 'INCIDENTS'
                    ? 'bg-rose-500/20 text-white border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-rose-400" />
                <span>Recent Activity</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-rose-500/20 text-rose-300 font-bold animate-pulse">3 • Feed</span>
              </button>

              <button
                onClick={() => setActiveTab('MITIGATIONS')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex-shrink-0 ${
                  activeTab === 'MITIGATIONS'
                    ? 'bg-emerald-500/20 text-white border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                <span>Block & Log Out</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 font-bold">4 • Mitigate</span>
              </button>

              <button
                onClick={() => setActiveTab('POLICIES')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex-shrink-0 ${
                  activeTab === 'POLICIES'
                    ? 'bg-purple-500/20 text-white border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>Settings & Rules</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 font-bold">5 • Rules</span>
              </button>
            </div>

            {/* Right Telemetry Badge */}
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 rounded-xl bg-white/[0.03] text-[10px] font-mono text-slate-400 flex-shrink-0">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${backendOnline ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                <span>BACKEND:</span>
                <strong className={backendOnline ? 'text-emerald-300' : 'text-amber-300'}>
                  {backendOnline ? 'CONNECTED (PORT 3001 • REST & SSE)' : 'STANDALONE MODE'}
                </strong>
              </span>
              <span>•</span>
              <span>PROTECTION: <strong className="text-slate-200">1,428 IDENTITIES</strong></span>
            </div>

          </div>

          {/* ============================================================== */}
          {/* TAB 1: SECURITY DASHBOARD                                      */}
          {/* ============================================================== */}
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-3 animate-toast-in">
              {/* Test Threats Simulator Bar */}
              <SimulatorBar
                currentScenario={currentScenario}
                onSelectScenario={handleSelectScenario}
                onNavigateTab={setActiveTab}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[300px]">
                
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
                  onOpenMap={() => setIsMapOpen(true)}
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
              <IncidentStreamTab
                onRevokeSession={(email) => {
                  revokeSessionApi(email, 'SecOps Rapid Revocation via Incident Feed');
                  addToast('Session Revoked', `Active token revoked for ${email}`, 'success');
                }}
              />
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

        {/* Global Identity Threat & Velocity Topology Map Modal */}
        <GlobalAttackMapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          currentScenario={currentScenario}
          travelVelocityKmH={telemetry.travelVelocityKmH}
        />

        {/* SentryCopilot Autonomous AI Assistant Drawer */}
        <AICopilotDrawer
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
          telemetry={telemetry}
          currentScenario={currentScenario}
          onExecuteRemediation={(actionName, payload) => {
            handleMitigate();
            addToast('SentryCopilot Action Executed', `${actionName} dispatched for ${payload}`, 'success');
          }}
        />

        {/* Tactical SOC Operator Keyboard Shortcuts Modal */}
        <KeyboardShortcutsModal
          isOpen={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
        />

        {/* Printable Forensic Audit Report Modal with Real CSV & JSON Exports */}
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
