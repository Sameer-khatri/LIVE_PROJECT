export interface TelemetryState {
  riskPercentile: number; // e.g. 74
  riskScoreNormalized: number; // e.g. 0.76
  baselineScore: number; // e.g. 0.15
  attackVelocityRatio: number; // e.g. 4.2x
  travelVelocityKmH: number; // e.g. 8820
  tokenLifetimeHours: number; // e.g. 5.2
  policyExcessHours: number; // e.g. 3.4
  legitimateLoginRatio: number; // e.g. 62%
  velocityChange1h: number; // e.g. 42.8%
  defconLevel: 1 | 2 | 3 | 4 | 5;
  activeIncidentsCount: number;
}

export interface RadarMetric {
  axis: string;
  value: number; // 0 - 100
  label: string;
}

export interface SatelliteAttackNode {
  id: string;
  name: string;
  percent: number;
  category: string;
  angleDeg: number; // Angle on arc
  icon: string;
  color: string;
  description: string;
}

export interface HygieneMetricRow {
  id: string;
  name: string;
  targetRange: string;
  currentValue: string;
  status: 'NORMAL' | 'SUBOPTIMAL' | 'ANOMALOUS' | 'CRITICAL';
  statusColor: string;
  tooltip: string;
}

export interface AnomalySignature {
  id: string;
  title: string;
  category: 'HEURISTIC' | 'THREAT_INTEL' | 'UEBA';
  detail: string;
  severity: 'HIGH' | 'CRITICAL';
}

export interface TrendPoint {
  hour: number;
  label: string;
  riskScore: number;
  failedCount: number;
}

