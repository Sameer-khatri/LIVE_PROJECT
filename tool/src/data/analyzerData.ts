import { AnalyzerCategory, RootIntelligenceSummary } from '../types/analyzer';

export const ROOT_SUMMARY: RootIntelligenceSummary = {
  title: 'STORED SECURITY INTELLIGENCE',
  totalRecords: 1428,
  monitoredAccounts: 18,
  totalEvents: 1240,
  knownDevices: 14,
  observedIPs: 24,
  archivedIncidents: 16,
  lastArchiveUpdate: '3 mins ago'
};

export const ANALYZER_CATEGORIES: AnalyzerCategory[] = [
  {
    id: 'cat-users',
    title: 'USER RECORDS',
    count: 18,
    iconName: 'Users',
    description: 'All previously observed user accounts stored in historical database.',
    entities: [
      {
        id: 'usr-001',
        name: 'Sarah Chen',
        subtitle: 'Lead Cloud Architect',
        category: 'USER RECORDS',
        badge: 'HIGH RISK 88',
        severity: 'HIGH',
        riskScore: 88,
        status: 'UNDER_INVESTIGATION',
        subBranches: [
          { id: 'sb-prof', title: 'Account Profile', type: 'PROFILE', details: { id: 'USR_001', email: 'sarah.chen@innovatech.io', role: 'Architect', mfa: 'Enforced' } },
          { id: 'sb-login', title: 'Login Timeline (24)', type: 'LOGINS', details: { oct: 18, sep: 6, lastResult: 'Impossible Travel Spike' } },
          { id: 'sb-dev', title: 'Known Devices (2)', type: 'DEVICES', details: { dev1: 'MacBookPro-M3', dev2: 'iPhone-15' } },
          { id: 'sb-ip', title: 'Observed IPs (3)', type: 'IPS', details: { ip1: '198.51.100.44 (US)', ip2: '185.220.101.5 (Tor)' } },
          { id: 'sb-alerts', title: 'Related Alerts (4)', type: 'ALERTS', details: { crit: 2, high: 1, med: 1 } },
          { id: 'sb-sess', title: 'Historical Sessions (8)', type: 'SESSIONS', details: { active: 1, revoked: 2, expired: 5 } }
        ],
        inspectorData: {
          title: 'Sarah Chen — Lead Cloud Architect',
          roleOrType: 'Identity Security Investigation',
          statusLabel: 'Active • Under Investigation',
          lastUpdate: 'Archived on 01 Oct 2026',
          riskContributionRate: 45,
          riskRateDelta: '-4% last month',
          histogramBars: [20, 35, 45, 60, 40, 30, 25, 55, 70, 85, 95, 80, 65, 50, 45, 30, 40, 60, 75, 90, 85, 70, 50, 35],
          metricsGrid: {
            alertsCount: 12,
            devicesCount: 2,
            ipsCount: 18,
            sessionsCount: 12
          },
          aiSummary: 'User exhibited a 4.2x velocity spike between consecutive authentications. A password reset request originated from a verified Tor exit node immediately following 5 failed credential attempts.'
        }
      },
      {
        id: 'usr-002',
        name: 'Marcus Vance',
        subtitle: 'Chief Financial Officer',
        category: 'USER RECORDS',
        badge: 'CRITICAL 94',
        severity: 'CRITICAL',
        riskScore: 94,
        status: 'UNDER_INVESTIGATION',
        subBranches: [
          { id: 'sb-prof2', title: 'Account Profile', type: 'PROFILE', details: { id: 'USR_002', email: 'marcus.vance@innovatech.io', role: 'CFO', mfa: 'SMS Fallback' } },
          { id: 'sb-spray', title: 'Brute Force Evidence (7)', type: 'EVIDENCE', details: { fails: 7, windowSec: 30, asn: 'AS44050' } },
          { id: 'sb-ip2', title: 'Attacker IPs (2)', type: 'IPS', details: { ip1: '45.142.214.18 (RU)', ip2: '198.51.100.89 (US)' } }
        ],
        inspectorData: {
          title: 'Marcus Vance — Chief Financial Officer',
          roleOrType: 'Executive Privilege Triage',
          statusLabel: 'Active Attack Target',
          lastUpdate: 'Archived on 01 Oct 2026',
          riskContributionRate: 88,
          riskRateDelta: '+62% this week',
          histogramBars: [15, 20, 25, 30, 35, 40, 55, 70, 85, 95, 100, 95, 90, 85, 75, 65, 60, 70, 85, 95, 90, 80, 60, 45],
          metricsGrid: {
            alertsCount: 16,
            devicesCount: 3,
            ipsCount: 8,
            sessionsCount: 6
          },
          aiSummary: 'Targeted in an automated credential stuffing campaign originating from St. Petersburg, Russia. 7 consecutive authentication failures recorded in under 30 seconds.'
        }
      },
      {
        id: 'usr-003',
        name: 'Elena Rostova',
        subtitle: 'Senior DevOps Engineer',
        category: 'USER RECORDS',
        badge: 'ELEVATED 68',
        severity: 'MEDIUM',
        riskScore: 68,
        status: 'ACTIVE',
        inspectorData: {
          title: 'Elena Rostova — DevOps Engineer',
          roleOrType: 'Infrastructure Admin',
          statusLabel: 'MFA Fatigue Anomaly',
          lastUpdate: 'Archived on 30 Sep 2026',
          riskContributionRate: 32,
          riskRateDelta: '+12% last month',
          histogramBars: [10, 15, 20, 25, 30, 40, 50, 60, 75, 65, 55, 45, 40, 35, 30, 25, 30, 45, 50, 60, 55, 40, 30, 20],
          metricsGrid: {
            alertsCount: 6,
            devicesCount: 2,
            ipsCount: 6,
            sessionsCount: 9
          },
          aiSummary: '4 consecutive MFA push approvals triggered in 18 seconds via commercial VPN relay. Push fatigue bypass pattern neutralized.'
        }
      },
      {
        id: 'usr-004',
        name: 'David Kim',
        subtitle: 'Product Operations',
        category: 'USER RECORDS',
        badge: 'NORMAL 14',
        severity: 'LOW',
        riskScore: 14,
        status: 'RESOLVED',
        inspectorData: {
          title: 'David Kim — Product Operations',
          roleOrType: 'Standard Employee',
          statusLabel: 'Nominal Baseline',
          lastUpdate: 'Archived on 28 Sep 2026',
          riskContributionRate: 14,
          riskRateDelta: '-18% last month',
          histogramBars: [10, 12, 14, 15, 12, 10, 14, 18, 20, 22, 18, 14, 12, 10, 14, 16, 18, 15, 12, 14, 16, 14, 12, 10],
          metricsGrid: {
            alertsCount: 1,
            devicesCount: 1,
            ipsCount: 2,
            sessionsCount: 14
          },
          aiSummary: 'Standard employee identity profile. All authentications align with enrolled MacBook Air and residential Comcast ISP in Austin, TX.'
        }
      }
    ]
  },
  {
    id: 'cat-logins',
    title: 'LOGIN HISTORY',
    count: 842,
    iconName: 'Key',
    description: 'Historical authentication records organized chronologically.',
    entities: [
      {
        id: 'log-01',
        name: 'Successful Logins',
        subtitle: '784 Total Records',
        category: 'LOGIN HISTORY',
        badge: 'NORMAL 93%',
        severity: 'NORMAL',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'Successful Authentication Trail',
          roleOrType: 'Legitimate Session Records',
          statusLabel: 'Verified Baseline',
          lastUpdate: 'Archived on 01 Oct 2026',
          riskContributionRate: 8,
          riskRateDelta: '-2% last month',
          histogramBars: [50, 60, 75, 80, 90, 85, 70, 80, 85, 90, 95, 85, 75, 80, 85, 90, 85, 80, 75, 85, 90, 85, 70, 60],
          metricsGrid: { alertsCount: 0, devicesCount: 14, ipsCount: 18, sessionsCount: 784 },
          aiSummary: 'Baseline authentications successfully passed MFA challenge and conformed to registered corporate device fingerprints.'
        }
      },
      {
        id: 'log-02',
        name: 'Failed Logins',
        subtitle: '58 Anomaly Records',
        category: 'LOGIN HISTORY',
        badge: 'CRITICAL 58',
        severity: 'CRITICAL',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'Failed Credential Audit',
          roleOrType: 'Credential Enumeration',
          statusLabel: 'Active Failures Logged',
          lastUpdate: 'Archived on 01 Oct 2026',
          riskContributionRate: 74,
          riskRateDelta: '+45% this week',
          histogramBars: [10, 15, 20, 25, 30, 40, 60, 80, 95, 100, 90, 80, 70, 60, 50, 60, 75, 90, 95, 85, 70, 50, 30, 20],
          metricsGrid: { alertsCount: 14, devicesCount: 8, ipsCount: 12, sessionsCount: 0 },
          aiSummary: 'Clustered failure bursts recorded against executive and administrator usernames from external datacenter ASNs.'
        }
      },
      {
        id: 'log-03',
        name: 'Unusual & Impossible Logins',
        subtitle: '12 Velocity Violations',
        category: 'LOGIN HISTORY',
        badge: 'HIGH RISK 12',
        severity: 'HIGH',
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Impossible Travel History',
          roleOrType: 'Physical Speed Violations',
          statusLabel: 'Violation Confirmed',
          lastUpdate: 'Archived on 01 Oct 2026',
          riskContributionRate: 92,
          riskRateDelta: '+88% this week',
          histogramBars: [5, 10, 15, 20, 25, 35, 50, 75, 90, 100, 95, 85, 75, 60, 50, 65, 80, 95, 100, 90, 75, 55, 35, 20],
          metricsGrid: { alertsCount: 8, devicesCount: 4, ipsCount: 6, sessionsCount: 2 },
          aiSummary: 'Haversine distance calculations flagged multiple consecutive authentications exceeding 8,000 km/h human limit.'
        }
      }
    ]
  },
  {
    id: 'cat-sec-events',
    title: 'SECURITY EVENTS',
    count: 1240,
    iconName: 'ShieldAlert',
    description: 'Full archive of normalized security events across all identity providers.',
    entities: [
      {
        id: 'evt-01',
        name: 'EVT-8821 Impossible Travel',
        subtitle: 'Sarah Chen • SF → Frankfurt',
        category: 'SECURITY EVENTS',
        badge: 'CRITICAL',
        severity: 'CRITICAL',
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Event EVT-8821 — Impossible Travel',
          roleOrType: 'Normalized OCSF Identity Event',
          statusLabel: 'Active Investigation',
          lastUpdate: 'Archived 8 mins ago',
          riskContributionRate: 95,
          riskRateDelta: '+95% spike',
          histogramBars: [0, 0, 5, 10, 15, 20, 25, 30, 45, 60, 80, 100, 95, 80, 60, 40, 25, 30, 50, 80, 100, 85, 50, 20],
          metricsGrid: { alertsCount: 3, devicesCount: 2, ipsCount: 2, sessionsCount: 1 },
          aiSummary: 'Consecutive logins from San Francisco and Frankfurt separated by only 8 minutes. Travel velocity computed at 8,820 km/h.'
        }
      },
      {
        id: 'evt-02',
        name: 'EVT-8819 Brute Force Cluster',
        subtitle: 'Marcus Vance • 7 Fails / 30s',
        category: 'SECURITY EVENTS',
        badge: 'CRITICAL',
        severity: 'CRITICAL',
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Event EVT-8819 — Brute Force Cluster',
          roleOrType: 'Credential Enumeration',
          statusLabel: 'Threat Mitigated',
          lastUpdate: 'Archived 15 mins ago',
          riskContributionRate: 88,
          riskRateDelta: '+78% spike',
          histogramBars: [10, 15, 25, 40, 60, 80, 100, 90, 80, 70, 60, 50, 40, 30, 40, 60, 85, 100, 95, 80, 65, 45, 30, 15],
          metricsGrid: { alertsCount: 2, devicesCount: 1, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'Automated script attempting dictionary credentials against CFO account. Adversary IP quarantined for 30 minutes.'
        }
      },
      {
        id: 'evt-03',
        name: 'EVT-8790 MFA Push Bombing',
        subtitle: 'Elena Rostova • 4 Prompts',
        category: 'SECURITY EVENTS',
        badge: 'HIGH',
        severity: 'HIGH',
        status: 'RESOLVED',
        inspectorData: {
          title: 'Event EVT-8790 — Push Bombing',
          roleOrType: 'MFA Fatigue Vector',
          statusLabel: 'Session Revoked',
          lastUpdate: 'Archived 1 hour ago',
          riskContributionRate: 72,
          riskRateDelta: '+40% spike',
          histogramBars: [5, 10, 20, 35, 50, 70, 90, 85, 70, 55, 40, 30, 25, 20, 30, 50, 75, 90, 85, 70, 50, 35, 20, 10],
          metricsGrid: { alertsCount: 1, devicesCount: 1, ipsCount: 1, sessionsCount: 1 },
          aiSummary: 'Repeated second-factor push notifications dispatched to induce accidental user approval. Neutralized by forced password re-entry.'
        }
      }
    ]
  },
  {
    id: 'cat-pass',
    title: 'PASSWORD & ACCOUNT HISTORY',
    count: 32,
    iconName: 'Lock',
    description: 'Archived credential changes, reset flows, and recovery telemetry.',
    entities: [
      {
        id: 'pwd-01',
        name: 'Tor Exit Node Password Reset',
        subtitle: 'User 004 • David Kim',
        category: 'PASSWORD & ACCOUNT HISTORY',
        badge: 'CRITICAL',
        severity: 'CRITICAL',
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Tor Reset Hijack Attempt',
          roleOrType: 'Credential Manipulation',
          statusLabel: 'Reset Blocked',
          lastUpdate: 'Archived 25 mins ago',
          riskContributionRate: 85,
          riskRateDelta: '+85% anomaly',
          histogramBars: [0, 5, 10, 15, 25, 45, 70, 95, 100, 90, 75, 60, 45, 30, 20, 30, 55, 80, 100, 90, 75, 50, 30, 15],
          metricsGrid: { alertsCount: 4, devicesCount: 1, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'Password reset request dispatched from a verified Tor exit node immediately following failed password entry.'
        }
      }
    ]
  },
  {
    id: 'cat-dev',
    title: 'DEVICE HISTORY',
    count: 14,
    iconName: 'Laptop',
    description: 'Observed client machines, browsers, and hardware assets.',
    entities: [
      {
        id: 'dev-01',
        name: 'MacBookPro-M3-Corp',
        subtitle: 'Sarah Chen • macOS 14.2',
        category: 'DEVICE HISTORY',
        badge: 'TRUSTED',
        severity: 'NORMAL',
        status: 'ACTIVE',
        inspectorData: {
          title: 'Corporate Hardware Asset',
          roleOrType: 'MDM-Enrolled Laptop',
          statusLabel: 'Compliant & Verified',
          lastUpdate: 'Archived 10 mins ago',
          riskContributionRate: 12,
          riskRateDelta: '-5% last month',
          histogramBars: [40, 50, 60, 65, 70, 75, 80, 85, 90, 85, 80, 75, 70, 75, 80, 85, 90, 85, 80, 75, 70, 65, 55, 45],
          metricsGrid: { alertsCount: 0, devicesCount: 1, ipsCount: 3, sessionsCount: 42 },
          aiSummary: 'Device fingerprint matches corporate MDM asset inventory with valid secure enclave certificates.'
        }
      },
      {
        id: 'dev-02',
        name: 'Unknown-Attacker-Rig',
        subtitle: 'AS44050 • Headless Chromium',
        category: 'DEVICE HISTORY',
        badge: 'CRITICAL',
        severity: 'CRITICAL',
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Unrecognized Adversary Host',
          roleOrType: 'Automated Attack Runner',
          statusLabel: 'Blacklisted Asset',
          lastUpdate: 'Archived 12 mins ago',
          riskContributionRate: 98,
          riskRateDelta: '+98% threat',
          histogramBars: [0, 0, 0, 10, 25, 50, 80, 100, 100, 95, 85, 70, 50, 30, 20, 35, 65, 95, 100, 95, 80, 60, 35, 15],
          metricsGrid: { alertsCount: 9, devicesCount: 1, ipsCount: 2, sessionsCount: 0 },
          aiSummary: 'Synthetic browser fingerprint exhibiting headless automation flags and python-requests user-agent signatures.'
        }
      }
    ]
  },
  {
    id: 'cat-ips',
    title: 'IP ADDRESS HISTORY',
    count: 24,
    iconName: 'Globe',
    description: 'Historical IP subnets, ASNs, and geolocations.',
    entities: [
      {
        id: 'ip-01',
        name: '185.220.101.5',
        subtitle: 'Tor Exit Node • Frankfurt, DE',
        category: 'IP ADDRESS HISTORY',
        badge: 'TOR ANONYMIZER',
        severity: 'CRITICAL',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'IP 185.220.101.5 (Tor Exit)',
          roleOrType: 'Anonymizing Network Node',
          statusLabel: 'Verified Tor Relay',
          lastUpdate: 'Archived 15 mins ago',
          riskContributionRate: 95,
          riskRateDelta: '+95% threat',
          histogramBars: [0, 5, 10, 20, 35, 55, 80, 100, 95, 85, 70, 55, 40, 30, 20, 35, 60, 85, 100, 90, 75, 55, 35, 20],
          metricsGrid: { alertsCount: 7, devicesCount: 3, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'IP listed on official Tor Project exit node directory. Associated with credential stuffing and rapid password resets.'
        }
      },
      {
        id: 'ip-02',
        name: '198.51.100.44',
        subtitle: 'Comcast Cable • San Francisco, US',
        category: 'IP ADDRESS HISTORY',
        badge: 'RESIDENTIAL',
        severity: 'NORMAL',
        status: 'ACTIVE',
        inspectorData: {
          title: 'IP 198.51.100.44 (Comcast)',
          roleOrType: 'Residential ISP Origin',
          statusLabel: 'Known Baseline IP',
          lastUpdate: 'Archived 20 mins ago',
          riskContributionRate: 8,
          riskRateDelta: '-2% last month',
          histogramBars: [60, 70, 75, 80, 85, 90, 85, 80, 75, 80, 85, 90, 85, 80, 75, 80, 85, 90, 85, 80, 75, 70, 65, 60],
          metricsGrid: { alertsCount: 0, devicesCount: 2, ipsCount: 1, sessionsCount: 142 },
          aiSummary: 'Standard home broadband IP utilized by Sarah Chen for regular daily corporate cloud access.'
        }
      }
    ]
  },
  {
    id: 'cat-alerts',
    title: 'ALERT & INCIDENT ARCHIVE',
    count: 16,
    iconName: 'AlertTriangle',
    description: 'Archived security incidents, investigation logs, and forensic summaries.',
    entities: [
      {
        id: 'alt-01',
        name: 'INC-8821 Impossible Travel',
        subtitle: 'Sarah Chen • 8,820 km/h Anomaly',
        category: 'ALERT & INCIDENT ARCHIVE',
        badge: 'CRITICAL',
        severity: 'CRITICAL',
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Incident INC-8821 — Impossible Travel',
          roleOrType: 'High Severity ATO Alert',
          statusLabel: 'Active Mitigation Enforced',
          lastUpdate: 'Archived 8 mins ago',
          riskContributionRate: 94,
          riskRateDelta: '+94% alert level',
          histogramBars: [10, 20, 30, 45, 60, 80, 100, 95, 85, 75, 60, 50, 40, 35, 45, 65, 85, 100, 95, 85, 70, 50, 30, 20],
          metricsGrid: { alertsCount: 4, devicesCount: 2, ipsCount: 2, sessionsCount: 1 },
          aiSummary: 'Autonomous Kill-Switch terminated the active session token within 145 milliseconds of event correlation.'
        }
      }
    ]
  },
  {
    id: 'cat-sess',
    title: 'SESSION HISTORY',
    count: 128,
    iconName: 'Clock',
    description: 'Historical and active OAuth/JWT application access sessions.',
    entities: [
      {
        id: 'ses-01',
        name: 'SESS-9041 OAuth Token',
        subtitle: 'Terminated by SentinelLite',
        category: 'SESSION HISTORY',
        badge: 'REVOKED',
        severity: 'HIGH',
        status: 'RESOLVED',
        inspectorData: {
          title: 'Session SESS-9041 (Revoked)',
          roleOrType: 'OAuth 2.0 Refresh Token',
          statusLabel: 'Terminated by Admin Policy',
          lastUpdate: 'Archived 10 mins ago',
          riskContributionRate: 85,
          riskRateDelta: '-85% post-kill',
          histogramBars: [80, 85, 90, 95, 100, 90, 80, 60, 40, 20, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 2, devicesCount: 1, ipsCount: 1, sessionsCount: 1 },
          aiSummary: 'Token revoked at the identity provider gateway following confirmed impossible travel detection.'
        }
      }
    ]
  },
  {
    id: 'cat-evidence',
    title: 'DETECTION EVIDENCE',
    count: 9,
    iconName: 'Search',
    description: 'Correlated evidence trails behind detection findings.',
    entities: [
      {
        id: 'evi-01',
        name: 'Brute Force Case #14',
        subtitle: '7 Failed Logins • ASN 44050',
        category: 'DETECTION EVIDENCE',
        badge: 'CORRELATED',
        severity: 'HIGH',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'Evidence Package #14',
          roleOrType: 'Forensic Proof Bundle',
          statusLabel: 'Sealed Historical Evidence',
          lastUpdate: 'Archived 30 mins ago',
          riskContributionRate: 78,
          riskRateDelta: '+45% evidence load',
          histogramBars: [20, 30, 45, 60, 75, 90, 100, 95, 80, 65, 50, 40, 30, 25, 35, 55, 80, 95, 100, 90, 75, 55, 35, 20],
          metricsGrid: { alertsCount: 5, devicesCount: 1, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'Complete telemetry log chain confirming distributed password spraying across CFO Marcus Vance.'
        }
      }
    ]
  },
  {
    id: 'cat-audit',
    title: 'AUDIT HISTORY',
    count: 48,
    iconName: 'ClipboardList',
    description: 'Read-only administrator and autonomous mitigation activity logs.',
    entities: [
      {
        id: 'aud-01',
        name: 'Autonomous Session Invalidation',
        subtitle: 'System Rule ITDR-AUTO-REVOKE',
        category: 'AUDIT HISTORY',
        badge: 'SUCCESS',
        severity: 'NORMAL',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'Audit Log AUD-3390',
          roleOrType: 'Autonomous Remediation Log',
          statusLabel: 'Enforced Zero-Touch',
          lastUpdate: 'Archived 8 mins ago',
          riskContributionRate: 10,
          riskRateDelta: '-90% risk reduction',
          histogramBars: [90, 95, 100, 80, 50, 30, 15, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 1, devicesCount: 1, ipsCount: 1, sessionsCount: 1 },
          aiSummary: 'Autonomous responder dispatched OAuth revocation signal to Google Workspace & Entra ID API.'
        }
      }
    ]
  }
];

