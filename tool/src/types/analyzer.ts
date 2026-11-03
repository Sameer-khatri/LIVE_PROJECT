export interface RootIntelligenceSummary {
  title: string;
  totalRecords: number;
  monitoredAccounts: number;
  totalEvents: number;
  knownDevices: number;
  observedIPs: number;
  archivedIncidents: number;
  lastArchiveUpdate: string;
}

export interface AnalyzerSubBranch {
  id: string;
  title: string;
  type: string;
  count?: number;
  details: Record<string, any>;
}

export interface AnalyzerEntityNode {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  badge?: string;
  severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NORMAL';
  riskScore?: number;
  status: 'ACTIVE' | 'ARCHIVED' | 'RESOLVED' | 'UNDER_INVESTIGATION';
  subBranches?: AnalyzerSubBranch[];
  inspectorData: {
    title: string;
    roleOrType: string;
    statusLabel: string;
    lastUpdate: string;
    riskContributionRate: number; // e.g. 45%
    riskRateDelta: string; // e.g. "-4% last month"
    histogramBars: number[]; // 24 height values for sparkline
    metricsGrid: {
      alertsCount: number;
      devicesCount: number;
      ipsCount: number;
      sessionsCount: number;
    };
    aiSummary: string;
  };
}

export interface AnalyzerCategory {
  id: string;
  title: string;
  count: number;
  iconName: string;
  description: string;
  entities: AnalyzerEntityNode[];
}

