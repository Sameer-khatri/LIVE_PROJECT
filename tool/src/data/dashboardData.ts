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
  { axis: 'Passwords', value: 85, label: 'Repeated wrong password attempts' },
  { axis: 'Locations', value: 78, label: 'Logins from unexpected foreign cities' },
  { axis: 'Phone Alert', value: 70, label: 'Spam phone approval popups' },
  { axis: 'New Devices', value: 65, label: 'Unrecognized computers or smartphones' },
  { axis: 'Hidden Net', value: 80, label: 'Connections hiding identity or location' },
  { axis: 'Password Reset', value: 60, label: 'Immediate password resets after failed attempts' },
];

export const INITIAL_SATELLITE_NODES: SatelliteAttackNode[] = [
  {
    id: 'node-exfil',
    name: 'Stolen Session Key',
    percent: 4.94,
    category: 'Stolen Cookie',
    angleDeg: -155,
    icon: 'Zap',
    color: '#00f0ff',
    description: 'Someone copied an active login session and tried to use it from a new browser.'
  },
  {
    id: 'node-tor',
    name: 'Hidden Hacker Network',
    percent: 14.45,
    category: 'Masked Location',
    angleDeg: -125,
    icon: 'Globe',
    color: '#a855f7',
    description: 'Login traffic came through an anonymous network commonly used to hide hacker locations.'
  },
  {
    id: 'node-mfa',
    name: 'Phone Code Spam',
    percent: 17.54,
    category: 'Phone Trick',
    angleDeg: -90,
    icon: 'Bomb',
    color: '#f59e0b',
    description: '4 phone verification popups sent in 18 seconds to trick the employee into tapping Accept.'
  },
  {
    id: 'node-travel',
    name: 'Two Cities at Once',
    percent: 17.32,
    category: 'Impossible Distance',
    angleDeg: -55,
    icon: 'Plane',
    color: '#f43f5e',
    description: 'Logged in from San Francisco and Germany only 8 minutes apart (faster than an airplane).'
  },
  {
    id: 'node-stuffing',
    name: 'Password Guessing Spree',
    percent: 34.21,
    category: 'Stolen Passwords',
    angleDeg: -25,
    icon: 'Flame',
    color: '#f43f5e',
    description: 'Automated software rapidly trying common stolen passwords on team accounts.'
  }
];

export const INITIAL_HYGIENE_ROWS: HygieneMetricRow[] = [
  {
    id: 'hyg-hardware',
    name: 'Recognized Work Computers',
    targetRange: '60-80%',
    currentValue: '74%',
    status: 'NORMAL',
    statusColor: 'text-emerald-400',
    tooltip: 'Percentage of logins coming from recognized company laptops and work phones.'
  },
  {
    id: 'hyg-isp',
    name: 'Normal Home & Office WiFi',
    targetRange: '80-95%',
    currentValue: '48%',
    status: 'SUBOPTIMAL',
    statusColor: 'text-amber-400',
    tooltip: 'Logins from regular home or office internet vs suspicious foreign servers.'
  },
  {
    id: 'hyg-hours',
    name: 'Regular Daytime Work Hours',
    targetRange: '85-95%',
    currentValue: '42%',
    status: 'ANOMALOUS',
    statusColor: 'text-amber-400',
    tooltip: 'Logins during daytime work hours vs strange midnight activity.'
  },
  {
    id: 'hyg-mfa',
    name: 'Phone Verifications Confirmed',
    targetRange: '90-100%',
    currentValue: '55%',
    status: 'CRITICAL',
    statusColor: 'text-rose-400',
    tooltip: 'Percentage of phone approval requests that were legitimately confirmed by the real employee.'
  }
];

export const INITIAL_ANOMALIES: AnomalySignature[] = [
  {
    id: 'anom-1',
    title: '7 Wrong Passwords in 30 Seconds',
    category: 'PASSWORD_GUESS',
    detail: 'Too many incorrect passwords entered quickly for Marcus Vance (Finance).',
    severity: 'CRITICAL'
  },
  {
    id: 'anom-2',
    title: 'Login from Anonymous Network (Tor)',
    category: 'SUSPICIOUS_IP',
    detail: 'The person logging in is using a network known for concealing hacker locations.',
    severity: 'CRITICAL'
  },
  {
    id: 'anom-3',
    title: 'Login from Foreign Cloud Server',
    category: 'DATA_CENTER',
    detail: 'Login came from an automated cloud server rather than a person using a computer.',
    severity: 'HIGH'
  },
  {
    id: 'anom-4',
    title: 'Automated Hacker Script Detected',
    category: 'BOT_ACTIVITY',
    detail: 'Activity matches automated hacker tools trying passwords, not a real web browser.',
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
