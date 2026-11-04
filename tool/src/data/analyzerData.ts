import { AnalyzerCategory, RootIntelligenceSummary } from '../types/analyzer';

export const ROOT_SUMMARY: RootIntelligenceSummary = {
  title: 'STORED SECURITY INTELLIGENCE',
  totalRecords: 1428,
  monitoredAccounts: 18,
  totalEvents: 1240,
  knownDevices: 14,
  observedIPs: 24,
  archivedIncidents: 16,
  lastArchiveUpdate: 'Just now (Live Sync)'
};

export const ANALYZER_CATEGORIES: AnalyzerCategory[] = [
  // 1. USER RECORDS
  {
    id: 'cat-users',
    title: 'USER RECORDS',
    count: 18,
    iconName: 'Users',
    description: 'All employee and team accounts monitored by AuthSentry.',
    entities: [
      {
        id: 'usr-001',
        name: 'Sarah Chen',
        subtitle: 'Lead Cloud Architect • Active Investigation Flag',
        category: 'USER RECORDS',
        badge: 'ALERT 88%',
        severity: 'CRITICAL',
        riskScore: 88,
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Sarah Chen — Cloud Architect',
          roleOrType: 'Employee Account Profile',
          statusLabel: 'Investigation Active',
          lastUpdate: 'Saved today at 22:15 UTC',
          riskContributionRate: 88,
          riskRateDelta: '+45% today',
          histogramBars: [20, 35, 45, 60, 40, 30, 25, 55, 70, 85, 95, 80, 65, 50, 45, 30, 40, 60, 75, 90, 85, 70, 50, 35],
          metricsGrid: { alertsCount: 4, devicesCount: 2, ipsCount: 3, sessionsCount: 12 },
          aiSummary: 'Sarah logged in from San Francisco and Frankfurt only 8 minutes apart (calculated speed: 8,820 km/h). Session token was automatically revoked within 45ms.'
        }
      },
      {
        id: 'usr-002',
        name: 'Marcus Vance',
        subtitle: 'Chief Financial Officer • Protected by Auto-Lock',
        category: 'USER RECORDS',
        badge: 'CONTAINED',
        severity: 'MEDIUM',
        riskScore: 32,
        status: 'ACTIVE',
        inspectorData: {
          title: 'Marcus Vance — Chief Financial Officer',
          roleOrType: 'Executive Account Target',
          statusLabel: 'Safe & Protected',
          lastUpdate: 'Saved today at 22:04 UTC',
          riskContributionRate: 32,
          riskRateDelta: '-40% after mitigation',
          histogramBars: [15, 20, 25, 30, 35, 40, 55, 70, 85, 95, 40, 20, 15, 10, 10, 12, 14, 15, 12, 10, 10, 12, 10, 8],
          metricsGrid: { alertsCount: 1, devicesCount: 3, ipsCount: 2, sessionsCount: 6 },
          aiSummary: 'A spray attempt was stopped by AuthSentry auto-lock. Marcus has successfully re-authenticated via hardware key and is fully secure.'
        }
      },
      {
        id: 'usr-003',
        name: 'Elena Rostova',
        subtitle: 'Senior DevOps Engineer • WebAuthn Verified',
        category: 'USER RECORDS',
        badge: 'SAFE 12%',
        severity: 'LOW',
        riskScore: 12,
        status: 'NORMAL',
        inspectorData: {
          title: 'Elena Rostova — DevOps Engineer',
          roleOrType: 'Technical Administrator',
          statusLabel: 'Verified Healthy',
          lastUpdate: 'Saved today at 21:50 UTC',
          riskContributionRate: 12,
          riskRateDelta: '-15% this week',
          histogramBars: [10, 12, 10, 14, 15, 12, 10, 11, 13, 12, 10, 12, 14, 15, 12, 10, 11, 12, 14, 12, 10, 11, 12, 10],
          metricsGrid: { alertsCount: 0, devicesCount: 2, ipsCount: 2, sessionsCount: 9 },
          aiSummary: 'Elena confirmed all authentication sessions using registered YubiKey hardware tokens. Zero security warnings.'
        }
      },
      {
        id: 'usr-004',
        name: 'David Kim',
        subtitle: 'Product Operations • Trusted Office Baseline',
        category: 'USER RECORDS',
        badge: 'SAFE 15%',
        severity: 'LOW',
        riskScore: 15,
        status: 'NORMAL',
        inspectorData: {
          title: 'David Kim — Product Operations',
          roleOrType: 'Standard Employee',
          statusLabel: 'Safe Habit Baseline',
          lastUpdate: 'Saved today at 21:30 UTC',
          riskContributionRate: 15,
          riskRateDelta: '-8% this month',
          histogramBars: [10, 12, 14, 15, 12, 10, 14, 18, 15, 12, 10, 12, 14, 15, 12, 10, 11, 12, 14, 12, 10, 11, 12, 10],
          metricsGrid: { alertsCount: 0, devicesCount: 2, ipsCount: 2, sessionsCount: 14 },
          aiSummary: 'Standard daily logins from authorized company laptop on San Francisco corporate WiFi network.'
        }
      },
      {
        id: 'usr-005',
        name: 'Priya Patel',
        subtitle: 'SecOps Threat Analyst • YubiKey Biometrics',
        category: 'USER RECORDS',
        badge: 'SAFE 8%',
        severity: 'LOW',
        riskScore: 8,
        status: 'NORMAL',
        inspectorData: {
          title: 'Priya Patel — Security Analyst',
          roleOrType: 'Security Administrator',
          statusLabel: 'High Assurance Baseline',
          lastUpdate: 'Saved today at 21:15 UTC',
          riskContributionRate: 8,
          riskRateDelta: '-12% this month',
          histogramBars: [8, 8, 10, 12, 10, 8, 9, 10, 8, 7, 9, 11, 10, 8, 9, 8, 10, 9, 8, 7, 8, 9, 8, 7],
          metricsGrid: { alertsCount: 0, devicesCount: 2, ipsCount: 2, sessionsCount: 24 },
          aiSummary: 'All logins originate from enrolled hardware keys with biometric proof of presence. 100% compliant.'
        }
      },
      {
        id: 'usr-006',
        name: 'Alex Mercer',
        subtitle: 'VP of Engineering • Token Rotated & Safe',
        category: 'USER RECORDS',
        badge: 'SECURED 18%',
        severity: 'LOW',
        riskScore: 18,
        status: 'NORMAL',
        inspectorData: {
          title: 'Alex Mercer — VP Engineering',
          roleOrType: 'Executive Administrator',
          statusLabel: 'Keys Fully Rotated',
          lastUpdate: 'Saved today at 20:55 UTC',
          riskContributionRate: 18,
          riskRateDelta: '-35% today',
          histogramBars: [10, 14, 18, 20, 25, 20, 15, 12, 10, 12, 14, 15, 12, 10, 11, 12, 14, 12, 10, 11, 12, 10, 8, 6],
          metricsGrid: { alertsCount: 0, devicesCount: 3, ipsCount: 2, sessionsCount: 16 },
          aiSummary: 'CI/CD personal access token was successfully rotated. All active administrative sessions are verified and secure.'
        }
      },
      {
        id: 'usr-007',
        name: 'Emma Watson',
        subtitle: 'HR & People Manager • Austin HQ Verified',
        category: 'USER RECORDS',
        badge: 'SAFE 6%',
        severity: 'LOW',
        riskScore: 6,
        status: 'NORMAL',
        inspectorData: {
          title: 'Emma Watson — People Operations',
          roleOrType: 'Corporate Staff',
          statusLabel: 'Safe Habit Baseline',
          lastUpdate: 'Saved today at 20:30 UTC',
          riskContributionRate: 6,
          riskRateDelta: '-5%',
          histogramBars: [6, 8, 7, 9, 10, 8, 6, 7, 8, 6, 5, 8, 10, 8, 6, 5, 8, 7, 8, 6, 5, 8, 10, 5],
          metricsGrid: { alertsCount: 0, devicesCount: 2, ipsCount: 1, sessionsCount: 18 },
          aiSummary: 'Emma logs in reliably from company MacBook Pro on residential fiber in Austin, Texas.'
        }
      },
      {
        id: 'usr-008',
        name: 'Liam O’Connor',
        subtitle: 'Staff Infrastructure Engineer • Dublin Office',
        category: 'USER RECORDS',
        badge: 'SAFE 10%',
        severity: 'LOW',
        riskScore: 10,
        status: 'NORMAL',
        inspectorData: {
          title: 'Liam O’Connor — Infrastructure Lead',
          roleOrType: 'Cloud Operations',
          statusLabel: 'Safe Hardware Key',
          lastUpdate: 'Saved today at 20:10 UTC',
          riskContributionRate: 10,
          riskRateDelta: '0%',
          histogramBars: [10, 12, 10, 14, 15, 12, 10, 11, 13, 12, 10, 12, 14, 15, 12, 10, 11, 12, 14, 12, 10, 11, 12, 10],
          metricsGrid: { alertsCount: 0, devicesCount: 2, ipsCount: 1, sessionsCount: 22 },
          aiSummary: 'Authenticated via corporate VPN and FIDO2 token from Dublin, Ireland with trusted device certificate.'
        }
      }
    ]
  },

  // 2. LOGIN HISTORY
  {
    id: 'cat-logins',
    title: 'LOGIN HISTORY',
    count: 842,
    iconName: 'Key',
    description: 'Past successful and failed sign-in attempts.',
    entities: [
      {
        id: 'log-01',
        name: 'Normal Safe Logins',
        subtitle: '784 Total Verified Logins',
        category: 'LOGIN HISTORY',
        badge: 'SAFE 93%',
        severity: 'LOW',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'Normal Company Logins',
          roleOrType: 'Legitimate Team Activity',
          statusLabel: 'Safe Baseline',
          lastUpdate: 'Updated 5 mins ago',
          riskContributionRate: 8,
          riskRateDelta: '-2% this month',
          histogramBars: [50, 60, 75, 80, 90, 85, 70, 80, 85, 90, 95, 85, 75, 80, 85, 90, 85, 80, 75, 85, 90, 85, 70, 60],
          metricsGrid: { alertsCount: 0, devicesCount: 14, ipsCount: 18, sessionsCount: 784 },
          aiSummary: 'Logins during daytime hours from recognized company computers with confirmed biometric or push approvals.'
        }
      },
      {
        id: 'log-02',
        name: 'Failed Password Guesses',
        subtitle: '48 Failed Password Guesses',
        category: 'LOGIN HISTORY',
        badge: 'DANGER 48',
        severity: 'CRITICAL',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'Wrong Password Guesses',
          roleOrType: 'Failed Login History',
          statusLabel: 'Blocked by Auto-Lock',
          lastUpdate: 'Updated 10 mins ago',
          riskContributionRate: 74,
          riskRateDelta: '+45% this week',
          histogramBars: [10, 15, 20, 25, 30, 40, 60, 80, 95, 100, 90, 80, 70, 60, 50, 60, 75, 90, 95, 85, 70, 50, 30, 20],
          metricsGrid: { alertsCount: 14, devicesCount: 8, ipsCount: 12, sessionsCount: 0 },
          aiSummary: 'A cluster of 48 incorrect passwords was tried across executive email accounts within minutes. The attacker was automatically blocked.'
        }
      },
      {
        id: 'log-03',
        name: 'Impossible Travel Violations',
        subtitle: '12 Physical Speed Violations',
        category: 'LOGIN HISTORY',
        badge: 'HIGH RISK 12',
        severity: 'HIGH',
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Unrealistic Travel Speeds',
          roleOrType: 'Physical Travel Speed Violations',
          statusLabel: 'Under Review',
          lastUpdate: 'Updated 15 mins ago',
          riskContributionRate: 92,
          riskRateDelta: '+88% this week',
          histogramBars: [5, 10, 15, 20, 25, 35, 50, 75, 90, 100, 95, 85, 75, 60, 50, 65, 80, 95, 100, 90, 75, 55, 35, 20],
          metricsGrid: { alertsCount: 8, devicesCount: 4, ipsCount: 6, sessionsCount: 2 },
          aiSummary: 'Calculated travel speed between logins was over 8,000 km/h. No commercial airplane flies this fast; indicates stolen session tokens.'
        }
      }
    ]
  },

  // 3. SECURITY EVENTS
  {
    id: 'cat-events',
    title: 'SECURITY EVENTS',
    count: 1240,
    iconName: 'ShieldAlert',
    description: 'System-wide normalized authentication and threat events.',
    entities: [
      {
        id: 'evt-01',
        name: 'Account Lockout Auto-Trigger',
        subtitle: 'Triggered on 5 Failed Passwords',
        category: 'SECURITY EVENTS',
        badge: 'AUTO-LOCKED',
        severity: 'HIGH',
        status: 'ACTIVE',
        inspectorData: {
          title: 'Autonomous Account Lockout',
          roleOrType: 'Security Enforcement Event',
          statusLabel: 'Enforced by Rule #1',
          lastUpdate: '18 mins ago',
          riskContributionRate: 75,
          riskRateDelta: '+10%',
          histogramBars: [0, 0, 0, 5, 10, 25, 50, 80, 90, 100, 80, 50, 30, 20, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 2, devicesCount: 1, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'Autonomous defense locked account marcus.vance@innovatech.io for 15 minutes following a high-velocity password spray.'
        }
      },
      {
        id: 'evt-02',
        name: 'MFA Push Bombing Suppression',
        subtitle: '4 Rapid Push Notifications Dropped',
        category: 'SECURITY EVENTS',
        badge: 'SUPPRESSED',
        severity: 'MEDIUM',
        status: 'ACTIVE',
        inspectorData: {
          title: 'Push Fatigue Suppression',
          roleOrType: 'MFA Defense Event',
          statusLabel: 'Mitigated',
          lastUpdate: '32 mins ago',
          riskContributionRate: 60,
          riskRateDelta: '+5%',
          histogramBars: [0, 0, 10, 20, 40, 70, 90, 95, 75, 50, 30, 15, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 1, devicesCount: 1, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'AuthSentry rate-limited push notifications to Elena Rostova to prevent accidental approval under fatigue.'
        }
      }
    ]
  },

  // 4. PASSWORD & ACCOUNT HISTORY
  {
    id: 'cat-password-history',
    title: 'PASSWORD & ACCOUNT HISTORY',
    count: 32,
    iconName: 'Lock',
    description: 'Password reset requests, MFA updates, and credential lifecycle.',
    entities: [
      {
        id: 'pwd-01',
        name: 'Tor Exit Node Password Reset',
        subtitle: 'Requested for david.kim@innovatech.io',
        category: 'PASSWORD & ACCOUNT HISTORY',
        badge: 'BLOCKED',
        severity: 'CRITICAL',
        status: 'BLOCKED',
        inspectorData: {
          title: 'Anonymized Password Reset Attempt',
          roleOrType: 'Credential Manipulation',
          statusLabel: 'Reset Suppressed',
          lastUpdate: '25 mins ago',
          riskContributionRate: 92,
          riskRateDelta: '+92%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 60, 95, 100, 90, 60, 30, 10, 0, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 3, devicesCount: 1, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'A password reset token request was sent from Tor node 185.220.101.5. AuthSentry withheld the email reset link per zero-trust policy.'
        }
      },
      {
        id: 'pwd-02',
        name: 'Hardware Security Key Enrolled',
        subtitle: 'FIDO2 WebAuthn Key for Sarah Chen',
        category: 'PASSWORD & ACCOUNT HISTORY',
        badge: 'VERIFIED',
        severity: 'LOW',
        status: 'TRUSTED',
        inspectorData: {
          title: 'WebAuthn Token Registration',
          roleOrType: 'MFA Lifecycle',
          statusLabel: 'Hardware Enrolled',
          lastUpdate: '1 day ago',
          riskContributionRate: 3,
          riskRateDelta: '-20%',
          histogramBars: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
          metricsGrid: { alertsCount: 0, devicesCount: 1, ipsCount: 1, sessionsCount: 4 },
          aiSummary: 'Sarah Chen registered a backup YubiKey 5C NFC security key with administrator verification.'
        }
      }
    ]
  },

  // 5. DEVICE HISTORY
  {
    id: 'cat-devices',
    title: 'DEVICE HISTORY',
    count: 14,
    iconName: 'Laptop',
    description: 'Hardware laptops, phones, and foreign devices seen logging in.',
    entities: [
      {
        id: 'dev-01',
        name: 'Sarah Chen’s MacBook Pro M3',
        subtitle: 'San Francisco, CA • Company Laptop',
        category: 'DEVICE HISTORY',
        badge: 'TRUSTED',
        severity: 'LOW',
        status: 'TRUSTED',
        inspectorData: {
          title: 'MacBook Pro M3 (Sarah Chen)',
          roleOrType: 'Company Approved Laptop',
          statusLabel: 'Safe Hardware',
          lastUpdate: 'Used 2 hours ago',
          riskContributionRate: 5,
          riskRateDelta: '0%',
          histogramBars: [5, 5, 8, 10, 6, 8, 5, 7, 8, 6, 5, 8, 10, 8, 6, 5, 8, 7, 8, 6, 5, 8, 10, 5],
          metricsGrid: { alertsCount: 0, devicesCount: 1, ipsCount: 2, sessionsCount: 42 },
          aiSummary: 'Enrolled company computer with hardware security chip and active endpoint protection. Consistently used by Sarah Chen.'
        }
      },
      {
        id: 'dev-02',
        name: 'Unknown Foreign Cloud Server',
        subtitle: 'Frankfurt, Germany • Automated Tool',
        category: 'DEVICE HISTORY',
        badge: 'BLOCKED',
        severity: 'CRITICAL',
        status: 'BLOCKED',
        inspectorData: {
          title: 'Foreign Automated Server (Germany)',
          roleOrType: 'Attacker Infrastructure',
          statusLabel: 'Permanently Blocked',
          lastUpdate: 'Blocked 8 mins ago',
          riskContributionRate: 98,
          riskRateDelta: '+98%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 95, 100, 100, 100, 80, 50, 20, 10, 5, 0, 0, 0],
          metricsGrid: { alertsCount: 8, devicesCount: 1, ipsCount: 2, sessionsCount: 0 },
          aiSummary: 'This machine was running a headless browser automation script attempting to hijack active cloud session tokens.'
        }
      },
      {
        id: 'dev-03',
        name: 'Elena’s iPhone 16 Pro',
        subtitle: 'Amsterdam, Netherlands • Mobile App',
        category: 'DEVICE HISTORY',
        badge: 'VERIFIED',
        severity: 'LOW',
        status: 'TRUSTED',
        inspectorData: {
          title: 'iPhone 16 Pro (Elena Rostova)',
          roleOrType: 'Enrolled Mobile Device',
          statusLabel: 'Biometric Enrolled',
          lastUpdate: 'Active now',
          riskContributionRate: 12,
          riskRateDelta: '+2%',
          histogramBars: [10, 12, 10, 14, 15, 12, 10, 11, 13, 12, 10, 12, 14, 15, 12, 10, 11, 12, 14, 12, 10, 11, 12, 10],
          metricsGrid: { alertsCount: 1, devicesCount: 1, ipsCount: 2, sessionsCount: 15 },
          aiSummary: 'Registered corporate smartphone with FaceID biometric authentication enabled.'
        }
      }
    ]
  },

  // 6. IP ADDRESS HISTORY
  {
    id: 'cat-ips',
    title: 'IP ADDRESS HISTORY',
    count: 24,
    iconName: 'Globe',
    description: 'Cities, home WiFi, and foreign internet networks observed.',
    entities: [
      {
        id: 'ip-01',
        name: 'San Francisco Home WiFi (Comcast)',
        subtitle: '198.51.100.44 • USA',
        category: 'IP ADDRESS HISTORY',
        badge: 'SAFE RESIDENTIAL',
        severity: 'LOW',
        status: 'SAFE',
        inspectorData: {
          title: 'Comcast Residential (San Francisco)',
          roleOrType: 'Employee Home Internet',
          statusLabel: 'Trusted Location',
          lastUpdate: 'Used today at 20:41 UTC',
          riskContributionRate: 4,
          riskRateDelta: '-2%',
          histogramBars: [10, 12, 10, 14, 15, 12, 10, 11, 13, 12, 10, 12, 14, 15, 12, 10, 11, 12, 14, 12, 10, 11, 12, 10],
          metricsGrid: { alertsCount: 0, devicesCount: 2, ipsCount: 1, sessionsCount: 120 },
          aiSummary: 'Normal residential ISP used by Sarah Chen for months with no suspicious activity.'
        }
      },
      {
        id: 'ip-02',
        name: 'Anonymous Hacker Network (Tor)',
        subtitle: '185.220.101.5 • Masked City',
        category: 'IP ADDRESS HISTORY',
        badge: 'HIGH DANGER',
        severity: 'CRITICAL',
        status: 'BLOCKED',
        inspectorData: {
          title: 'Anonymous Masked Network (185.220.101.5)',
          roleOrType: 'Anonymizer Relay',
          statusLabel: 'Blocked Hacker IP',
          lastUpdate: 'Blocked 8 mins ago',
          riskContributionRate: 96,
          riskRateDelta: '+96%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 80, 100, 100, 100, 90, 60, 30, 10, 0, 0, 0],
          metricsGrid: { alertsCount: 5, devicesCount: 0, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'Known Tor exit relay used by threat actors to conceal origin coordinates. Dropped at border firewall.'
        }
      },
      {
        id: 'ip-03',
        name: 'AWS US-East Gateway (Northern Virginia)',
        subtitle: '54.210.88.19 • Cloud VPC',
        category: 'IP ADDRESS HISTORY',
        badge: 'INFRASTRUCTURE',
        severity: 'LOW',
        status: 'TRUSTED',
        inspectorData: {
          title: 'AWS Production NAT Gateway',
          roleOrType: 'Internal Cloud Network',
          statusLabel: 'Whitelisted VPC',
          lastUpdate: 'Active now',
          riskContributionRate: 2,
          riskRateDelta: '0%',
          histogramBars: [80, 85, 90, 85, 80, 85, 90, 95, 90, 85, 80, 85, 90, 85, 80, 85, 90, 85, 80, 85, 90, 85, 80, 75],
          metricsGrid: { alertsCount: 0, devicesCount: 6, ipsCount: 1, sessionsCount: 340 },
          aiSummary: 'Verified internal cloud gateway executing automated microservice authentication with mTLS.'
        }
      }
    ]
  },

  // 7. ALERT & INCIDENT ARCHIVE
  {
    id: 'cat-alerts',
    title: 'ALERT & INCIDENT ARCHIVE',
    count: 16,
    iconName: 'AlertTriangle',
    description: 'Archived security investigations and high-priority incidents.',
    entities: [
      {
        id: 'alt-01',
        name: 'INC-2026-089: Stolen Session Cookie Replay',
        subtitle: 'Severity: Critical • Mitigated in 62ms',
        category: 'ALERT & INCIDENT ARCHIVE',
        badge: 'CONTAINED',
        severity: 'CRITICAL',
        status: 'CONTAINED',
        inspectorData: {
          title: 'Incident #089: Stolen Session Replay',
          roleOrType: 'Critical Threat Incident',
          statusLabel: 'Auto-Revoked & Closed',
          lastUpdate: 'Archived 12 mins ago',
          riskContributionRate: 95,
          riskRateDelta: '+95%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 45, 90, 100, 95, 70, 30, 10, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 5, devicesCount: 2, ipsCount: 2, sessionsCount: 1 },
          aiSummary: 'Attacker replayed Sarah Chen’s OAuth session token from a Frankfurt server. AuthSentry invalidated the token within 62 milliseconds.'
        }
      },
      {
        id: 'alt-02',
        name: 'INC-2026-088: Distributed Password Spray',
        subtitle: 'Severity: High • 8 Accounts Targeted',
        category: 'ALERT & INCIDENT ARCHIVE',
        badge: 'BLOCKED',
        severity: 'HIGH',
        status: 'CONTAINED',
        inspectorData: {
          title: 'Incident #088: Distributed Spray',
          roleOrType: 'Brute Force Attack',
          statusLabel: 'IP Quarantined',
          lastUpdate: 'Archived 35 mins ago',
          riskContributionRate: 85,
          riskRateDelta: '+50%',
          histogramBars: [0, 0, 0, 0, 0, 0, 5, 20, 55, 85, 95, 90, 60, 30, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 8, devicesCount: 3, ipsCount: 4, sessionsCount: 0 },
          aiSummary: 'Coordinated credential spray targeting executive inboxes. Firewall auto-quarantined the offending subnet.'
        }
      }
    ]
  },

  // 8. SESSION HISTORY
  {
    id: 'cat-sessions',
    title: 'SESSION HISTORY',
    count: 128,
    iconName: 'Clock',
    description: 'Active and historic OAuth tokens, cookies, and CLI sessions.',
    entities: [
      {
        id: 'ses-01',
        name: 'Active Chrome Session (Sarah Chen)',
        subtitle: 'OAuth 2.0 • 3.9 Hours Active',
        category: 'SESSION HISTORY',
        badge: 'OVER LIMIT',
        severity: 'MEDIUM',
        status: 'ACTIVE',
        inspectorData: {
          title: 'Active Session: sarah.chen@innovatech.io',
          roleOrType: 'OAuth 2.0 Web Session',
          statusLabel: 'Exceeds 2-hr Baseline',
          lastUpdate: 'Active now',
          riskContributionRate: 45,
          riskRateDelta: '+15%',
          histogramBars: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 90, 85, 80, 75, 70, 65, 60, 55],
          metricsGrid: { alertsCount: 1, devicesCount: 1, ipsCount: 1, sessionsCount: 1 },
          aiSummary: 'This web session has remained active for 3.9 consecutive hours, which exceeds the company 2-hour zero-trust re-auth threshold.'
        }
      },
      {
        id: 'ses-02',
        name: 'Revoked Hijacked Session (Frankfurt)',
        subtitle: 'Terminated 14 mins ago by Auto-Revoke',
        category: 'SESSION HISTORY',
        badge: 'REVOKED',
        severity: 'CRITICAL',
        status: 'REVOKED',
        inspectorData: {
          title: 'Hijacked Web Session (45.142.214.18)',
          roleOrType: 'Stolen Session Cookie',
          statusLabel: 'Terminated',
          lastUpdate: '14 mins ago',
          riskContributionRate: 98,
          riskRateDelta: '+98%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 80, 20, 0, 0, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 3, devicesCount: 1, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'Session was forcibly terminated by AuthSentry when velocity calculations revealed impossible travel.'
        }
      }
    ]
  },

  // 9. DETECTION EVIDENCE
  {
    id: 'cat-evidence',
    title: 'DETECTION EVIDENCE',
    count: 9,
    iconName: 'Fingerprint',
    description: 'Cryptographic proofs, TCP telemetry, and forensic artifacts.',
    entities: [
      {
        id: 'evi-01',
        name: 'Browser Fingerprint Anomaly (Canvas/WebGL)',
        subtitle: 'Mismatch between Mac OS and Linux User-Agent',
        category: 'DETECTION EVIDENCE',
        badge: 'FINGERPRINT MISMATCH',
        severity: 'HIGH',
        status: 'VERIFIED',
        inspectorData: {
          title: 'Forensic Evidence: WebGL Mismatch',
          roleOrType: 'Browser Fingerprint Artifact',
          statusLabel: 'Hard Anomaly',
          lastUpdate: 'Saved today at 22:15 UTC',
          riskContributionRate: 88,
          riskRateDelta: '+45%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 90, 100, 100, 80, 50, 20, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 2, devicesCount: 1, ipsCount: 1, sessionsCount: 1 },
          aiSummary: 'The HTTP header claimed macOS Safari, but GPU canvas hash revealed a Linux Mesa rendering driver commonly used in automated cloud attack scripts.'
        }
      },
      {
        id: 'evi-02',
        name: 'Haversine Velocity Calculation Proof',
        subtitle: 'Distance: 9,120 km in 480 seconds = 68,400 km/h',
        category: 'DETECTION EVIDENCE',
        badge: 'MATH PROOF',
        severity: 'CRITICAL',
        status: 'VERIFIED',
        inspectorData: {
          title: 'Great-Circle Velocity Calculation',
          roleOrType: 'Mathematical Forensic Proof',
          statusLabel: 'Physically Impossible',
          lastUpdate: 'Saved today at 22:15 UTC',
          riskContributionRate: 99,
          riskRateDelta: '+99%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 90, 50, 10, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 4, devicesCount: 2, ipsCount: 2, sessionsCount: 1 },
          aiSummary: 'Conclusive mathematical proof: San Francisco (37.7749° N, 122.4194° W) to Frankfurt (50.1109° N, 8.6821° E) in 8 minutes violates the laws of physics.'
        }
      }
    ]
  },

  // 10. AUDIT HISTORY
  {
    id: 'cat-audit',
    title: 'AUDIT HISTORY',
    count: 240,
    iconName: 'FileCheck',
    description: 'Immutable compliance logs, administrator actions, and policy revisions.',
    entities: [
      {
        id: 'aud-01',
        name: 'Policy Revision #105 Deployed',
        subtitle: 'Strict Zero-Trust Thresholds Applied',
        category: 'AUDIT HISTORY',
        badge: 'COMPLIANT',
        severity: 'LOW',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'Policy Update Audit Record',
          roleOrType: 'Governance & Compliance',
          statusLabel: 'Signed by SecOps Lead',
          lastUpdate: 'Deployed today at 22:30 UTC',
          riskContributionRate: 0,
          riskRateDelta: '0%',
          histogramBars: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          metricsGrid: { alertsCount: 0, devicesCount: 14, ipsCount: 24, sessionsCount: 1428 },
          aiSummary: 'Policy revision #105 validated for SOC 2 Type II compliance. Cryptographically signed with SHA-256: 9e4f2b1c.'
        }
      },
      {
        id: 'aud-02',
        name: 'Automated IP Quarantine Action',
        subtitle: 'IP 185.220.101.5 Added to Edge Deny-List',
        category: 'AUDIT HISTORY',
        badge: 'AUTO-ACTION',
        severity: 'MEDIUM',
        status: 'ARCHIVED',
        inspectorData: {
          title: 'Autonomous Enforcement Audit',
          roleOrType: 'Containment Execution Log',
          statusLabel: 'Executed in 42ms',
          lastUpdate: 'Executed 16 mins ago',
          riskContributionRate: 20,
          riskRateDelta: '-50%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 100, 80, 40, 10, 0, 0, 0, 0, 0, 0, 0],
          metricsGrid: { alertsCount: 1, devicesCount: 0, ipsCount: 1, sessionsCount: 0 },
          aiSummary: 'Autonomous mitigation agent dispatched an API instruction to Cloudflare & AWS WAF to drop all traffic from 185.220.101.5.'
        }
      }
    ]
  }
];
