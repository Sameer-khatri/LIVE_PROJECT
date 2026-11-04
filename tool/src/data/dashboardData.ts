import { 
  TelemetryState, RadarMetric, SatelliteAttackNode, 
  HygieneMetricRow, AnomalySignature, TrendPoint 
} from '../types/dashboard';

export const INITIAL_TELEMETRY: TelemetryState = {
  riskPercentile: 22,
  riskScoreNormalized: 0.22,
  baselineScore: 0.15,
  attackVelocityRatio: 1.1,
  travelVelocityKmH: 45,
  tokenLifetimeHours: 2.1,
  policyExcessHours: 0.0,
  legitimateLoginRatio: 97.4,
  velocityChange1h: +1.2,
  defconLevel: 4,
  activeIncidentsCount: 2
};

export const INITIAL_RADAR_METRICS: RadarMetric[] = [
  { axis: 'Passwords', value: 24, label: 'Standard password attempts (Safe habit)' },
  { axis: 'Locations', value: 28, label: 'Logins from expected office & remote cities' },
  { axis: 'Phone Alert', value: 16, label: 'Confirmed 2-step phone approvals' },
  { axis: 'New Devices', value: 22, label: 'Enrolled company laptops & mobile fleet' },
  { axis: 'Hidden Net', value: 12, label: 'Zero darknet anonymizers active' },
  { axis: 'Password Reset', value: 18, label: 'Scheduled credential rotations' },
];

export const INITIAL_SATELLITE_NODES: SatelliteAttackNode[] = [
  {
    id: 'node-sso',
    name: 'Verified SSO Logins',
    percent: 68.4,
    category: 'Verified Safe',
    angleDeg: -160,
    icon: 'ShieldCheck',
    color: '#10b981',
    description: '1,380 team logins authenticated successfully through Okta and Google Workspace SSO.'
  },
  {
    id: 'node-biometric',
    name: 'Hardware Security Keys',
    percent: 21.2,
    category: 'Biometric Safe',
    angleDeg: -110,
    icon: 'Key',
    color: '#06b6d4',
    description: 'Hardware FIDO2 WebAuthn & YubiKey biometric confirmations verified across engineering.'
  },
  {
    id: 'node-mobile',
    name: 'Enrolled Phone Fleet',
    percent: 7.8,
    category: 'Device Trust',
    angleDeg: -60,
    icon: 'Smartphone',
    color: '#6366f1',
    description: 'Corporate mobile apps with FaceID and device certificates active.'
  },
  {
    id: 'node-alert',
    name: 'Isolated Anomaly Flag',
    percent: 2.6,
    category: 'Under Review',
    angleDeg: -15,
    icon: 'AlertTriangle',
    color: '#f59e0b',
    description: '1 suspicious off-hours login flagged from Frankfurt — session auto-revoked in 45ms.'
  }
];

export const INITIAL_HYGIENE_ROWS: HygieneMetricRow[] = [
  {
    id: 'hyg-hardware',
    name: 'Recognized Work Computers',
    targetRange: '85-100%',
    currentValue: '96.2%',
    status: 'NORMAL',
    statusColor: 'text-emerald-400',
    tooltip: '1,424 out of 1,428 team members are logged in from recognized corporate hardware.'
  },
  {
    id: 'hyg-isp',
    name: 'Normal Home & Office WiFi',
    targetRange: '80-95%',
    currentValue: '93.5%',
    status: 'NORMAL',
    statusColor: 'text-emerald-400',
    tooltip: 'Connection traffic matches trusted employee residential ISPs and office networks.'
  },
  {
    id: 'hyg-hours',
    name: 'Regular Working Shift Hours',
    targetRange: '85-95%',
    currentValue: '91.8%',
    status: 'NORMAL',
    statusColor: 'text-emerald-400',
    tooltip: 'Team logins occur within regular office and scheduled on-call shifts.'
  },
  {
    id: 'hyg-mfa',
    name: 'Phone Verifications Confirmed',
    targetRange: '90-100%',
    currentValue: '98.4%',
    status: 'NORMAL',
    statusColor: 'text-emerald-400',
    tooltip: '98.4% of two-factor phone approval requests are legitimately approved on first prompt.'
  }
];

export const INITIAL_ANOMALIES: AnomalySignature[] = [
  {
    id: 'anom-1',
    title: '1 Isolated Travel Flag (Auto-Contained)',
    category: 'SUSPICIOUS_IP',
    detail: 'Sarah Chen account was accessed from Frankfurt; token auto-revoked within 45ms per policy.',
    severity: 'MEDIUM'
  },
  {
    id: 'anom-2',
    title: '1,426 Identities Within Safe Baseline',
    category: 'NORMAL',
    detail: '99.8% of team members exhibit normal typing velocity and recognized home IP signatures.',
    severity: 'LOW'
  },
  {
    id: 'anom-3',
    title: 'FIDO2 Hardware Key Coverage at 88%',
    category: 'AUTHENTICATION',
    detail: 'Zero password stuffing vulnerabilities detected on administrative accounts.',
    severity: 'LOW'
  },
  {
    id: 'anom-4',
    title: 'Zero Tor/Darknet Relays Permitted',
    category: 'EDGE_POLICY',
    detail: 'Edge firewall policy active; all anonymous anonymizers automatically dropped at perimeter.',
    severity: 'LOW'
  }
];

export const INITIAL_TREND_POINTS: TrendPoint[] = [
  { hour: 10, label: '10:00', riskScore: 14, failedCount: 0 },
  { hour: 12, label: '12:00', riskScore: 16, failedCount: 1 },
  { hour: 14, label: '14:00', riskScore: 15, failedCount: 0 },
  { hour: 16, label: '16:00', riskScore: 18, failedCount: 1 },
  { hour: 18, label: '18:00', riskScore: 21, failedCount: 2 },
  { hour: 20, label: '20:00', riskScore: 24, failedCount: 1 },
  { hour: 22, label: '22:00', riskScore: 22, failedCount: 1 },
];
