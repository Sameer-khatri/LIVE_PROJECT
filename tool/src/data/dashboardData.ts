import { 
  TelemetryState, RadarMetric, SatelliteAttackNode, 
  HygieneMetricRow, AnomalySignature, TrendPoint 
} from '../types/dashboard';

export const INITIAL_TELEMETRY: TelemetryState = {
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
};

export const INITIAL_RADAR_METRICS: RadarMetric[] = [
  { axis: 'Credential Velocity', value: 85, label: 'Brute force & spray rate' },
  { axis: 'Geo Velocity', value: 78, label: 'Impossible travel delta' },
  { axis: 'MFA Integrity', value: 70, label: 'Push-bombing fatigue' },
  { axis: 'Device Trust', value: 65, label: 'Novel hardware fingerprint' },
  { axis: 'Network Hygiene', value: 80, label: 'Tor exit / Cloud ASN' },
  { axis: 'Privilege Flow', value: 60, label: 'Rapid reset post-failure' },
];

export const INITIAL_SATELLITE_NODES: SatelliteAttackNode[] = [
  {
    id: 'node-exfil',
    name: 'Rapid Token Exfil',
    percent: 4.94,
    category: 'Session Abuse',
    angleDeg: -155,
    icon: 'Zap',
    color: '#00f0ff',
    description: 'OAuth refresh token reuse attempt detected from secondary browser profile.'
  },
  {
    id: 'node-tor',
    name: 'Tor / Proxy Routing',
    percent: 14.45,
    category: 'Network Anonymizer',
    angleDeg: -125,
    icon: 'Globe',
    color: '#a855f7',
    description: 'Inbound authentication packets relayed across verified Tor onion exit node.'
  },
  {
    id: 'node-mfa',
    name: 'MFA Push Fatigue',
    percent: 17.54,
    category: 'MFA Bypass',
    angleDeg: -90,
    icon: 'Bomb',
    color: '#f59e0b',
    description: '4 consecutive push approval requests dispatched in 18 seconds to wear down user.'
  },
  {
    id: 'node-travel',
    name: 'Impossible Travel',
    percent: 17.32,
    category: 'UEBA Geolocation',
    angleDeg: -55,
    icon: 'Plane',
    color: '#f43f5e',
    description: 'San Francisco to Frankfurt am Main in 8 minutes (Velocity > 8,000 km/h).'
  },
  {
    id: 'node-stuffing',
    name: 'Credential Stuffing',
    percent: 34.21,
    category: 'Brute Force Spray',
    angleDeg: -25,
    icon: 'Flame',
    color: '#f43f5e',
    description: 'Distributed credential enumeration attack originating from adversary ASN 44050.'
  }
];

export const INITIAL_HYGIENE_ROWS: HygieneMetricRow[] = [
  {
    id: 'hyg-hardware',
    name: 'Known Corporate Hardware',
    targetRange: '60-80%',
    currentValue: '74%',
    status: 'NORMAL',
    statusColor: 'text-emerald-400',
    tooltip: 'Percentage of authentications originating from MDM-enrolled corporate machines.'
  },
  {
    id: 'hyg-isp',
    name: 'Residential ISP Origin',
    targetRange: '80-95%',
    currentValue: '48%',
    status: 'SUBOPTIMAL',
    statusColor: 'text-amber-400',
    tooltip: 'Logins from residential broadband vs public cloud/hosting datacenters (AWS, Hetzner).'
  },
  {
    id: 'hyg-hours',
    name: 'Working Hours Alignment',
    targetRange: '85-95%',
    currentValue: '42%',
    status: 'ANOMALOUS',
    statusColor: 'text-amber-400',
    tooltip: 'Authentication activity coinciding with employee local standard operating hours.'
  },
  {
    id: 'hyg-mfa',
    name: 'MFA Challenge Success',
    targetRange: '90-100%',
    currentValue: '55%',
    status: 'CRITICAL',
    statusColor: 'text-rose-400',
    tooltip: 'Ratio of accepted vs timed-out or denied second-factor mobile verification prompts.'
  }
];

export const INITIAL_ANOMALIES: AnomalySignature[] = [
  {
    id: 'anom-1',
    title: 'Rapid Failures (7 in 30s)',
    category: 'HEURISTIC',
    detail: 'Exceeds sliding window threshold for Marcus Vance (CFO).',
    severity: 'CRITICAL'
  },
  {
    id: 'anom-2',
    title: 'Tor Exit Node 185.220.101.5',
    category: 'THREAT_INTEL',
    detail: 'Origin IP verified on public Tor directory with 100% abuse confidence.',
    severity: 'CRITICAL'
  },
  {
    id: 'anom-3',
    title: 'Datacenter ASN (Hetzner Cloud)',
    category: 'THREAT_INTEL',
    detail: 'AS24940 hosting provider used for automated password spraying.',
    severity: 'HIGH'
  },
  {
    id: 'anom-4',
    title: 'Headless Python User-Agent',
    category: 'UEBA',
    detail: 'Client identified as python-requests/2.31 rather than legitimate Chrome browser.',
    severity: 'HIGH'
  }
];

export const INITIAL_TREND_POINTS: TrendPoint[] = [
  { hour: 10, label: '10:00', riskScore: 18, failedCount: 1 },
  { hour: 12, label: '12:00', riskScore: 22, failedCount: 2 },
  { hour: 14, label: '14:00', riskScore: 19, failedCount: 0 },
  { hour: 16, label: '16:00', riskScore: 25, failedCount: 3 },
  { hour: 18, label: '18:00', riskScore: 34, failedCount: 4 },
  { hour: 20, label: '20:00', riskScore: 76, failedCount: 18 },
  { hour: 22, label: '22:00', riskScore: 74, failedCount: 14 },
];

