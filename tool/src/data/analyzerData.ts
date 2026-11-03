import { AnalyzerCategory, RootIntelligenceSummary } from '../types/analyzer';

export const ROOT_SUMMARY: RootIntelligenceSummary = {
  title: 'SAVED SECURITY HISTORY',
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
    title: 'Team Accounts',
    count: 18,
    iconName: 'Users',
    description: 'All employee and team accounts monitored by AuthSentry.',
    entities: [
      {
        id: 'usr-001',
        name: 'Sarah Chen',
        subtitle: 'Lead Cloud Architect • USA to Germany in 8m',
        category: 'Team Accounts',
        badge: 'HIGH RISK 88%',
        severity: 'HIGH',
        riskScore: 88,
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Sarah Chen — Cloud Architect',
          roleOrType: 'Employee Account Profile',
          statusLabel: 'Investigation Active',
          lastUpdate: 'Saved today at 22:15',
          riskContributionRate: 88,
          riskRateDelta: '+45% today',
          histogramBars: [20, 35, 45, 60, 40, 30, 25, 55, 70, 85, 95, 80, 65, 50, 45, 30, 40, 60, 75, 90, 85, 70, 50, 35],
          metricsGrid: { alertsCount: 4, devicesCount: 2, ipsCount: 3, sessionsCount: 12 },
          aiSummary: 'Sarah logged in from San Francisco and Germany only 8 minutes apart. This is physically impossible by airplane, which strongly suggests someone stole her login session.'
        }
      },
      {
        id: 'usr-002',
        name: 'Marcus Vance',
        subtitle: 'Chief Financial Officer • 7 Wrong Passwords',
        category: 'Team Accounts',
        badge: 'DANGER 94%',
        severity: 'CRITICAL',
        riskScore: 94,
        status: 'UNDER_INVESTIGATION',
        inspectorData: {
          title: 'Marcus Vance — Chief Financial Officer',
          roleOrType: 'Executive Account Target',
          statusLabel: 'Active Attack Target',
          lastUpdate: 'Saved today at 22:04',
          riskContributionRate: 94,
          riskRateDelta: '+62% this week',
          histogramBars: [15, 20, 25, 30, 35, 40, 55, 70, 85, 95, 100, 95, 90, 85, 75, 65, 60, 70, 85, 95, 90, 80, 60, 45],
          metricsGrid: { alertsCount: 7, devicesCount: 3, ipsCount: 5, sessionsCount: 6 },
          aiSummary: 'A foreign server in Russia tried 7 wrong passwords in 30 seconds on Marcus Vance. The account was temporarily protected by AuthSentry auto-lock.'
        }
      },
      {
        id: 'usr-003',
        name: 'Elena Rostova',
        subtitle: 'DevOps Engineer • 4 Phone Popups in 18s',
        category: 'Team Accounts',
        badge: 'WARNING 68%',
        severity: 'MEDIUM',
        riskScore: 68,
        status: 'ACTIVE',
        inspectorData: {
          title: 'Elena Rostova — DevOps Engineer',
          roleOrType: 'Technical Administrator',
          statusLabel: 'Phone Alert Spam',
          lastUpdate: 'Saved today at 21:50',
          riskContributionRate: 68,
          riskRateDelta: '+12% this week',
          histogramBars: [10, 15, 20, 25, 30, 40, 50, 60, 75, 65, 55, 45, 40, 35, 30, 25, 30, 45, 50, 60, 55, 40, 30, 20],
          metricsGrid: { alertsCount: 3, devicesCount: 2, ipsCount: 4, sessionsCount: 9 },
          aiSummary: 'Elena received 4 phone verification notifications in under 20 seconds. This is a common trick where hackers try to annoy the user into tapping Approve.'
        }
      },
      {
        id: 'usr-004',
        name: 'David Kim',
        subtitle: 'Product Operations • Password Reset from Hidden IP',
        category: 'Team Accounts',
        badge: 'WARNING 62%',
        severity: 'MEDIUM',
        riskScore: 62,
        status: 'ACTIVE',
        inspectorData: {
          title: 'David Kim — Product Operations',
          roleOrType: 'Standard Employee',
          statusLabel: 'Hidden Network Request',
          lastUpdate: 'Saved today at 21:30',
          riskContributionRate: 62,
          riskRateDelta: '+8% this month',
          histogramBars: [10, 12, 14, 15, 12, 10, 14, 18, 20, 22, 18, 14, 12, 10, 14, 16, 18, 15, 12, 14, 16, 14, 12, 10],
          metricsGrid: { alertsCount: 2, devicesCount: 2, ipsCount: 3, sessionsCount: 14 },
          aiSummary: 'Someone tried to reset David’s password using an anonymous masked internet connection right after a wrong password attempt.'
        }
      },
      {
        id: 'usr-005',
        name: 'Emma Watson',
        subtitle: 'HR & People Manager • Normal Work Hours',
        category: 'Team Accounts',
        badge: 'SAFE 12%',
        severity: 'LOW',
        riskScore: 12,
        status: 'NORMAL',
        inspectorData: {
          title: 'Emma Watson — HR Manager',
          roleOrType: 'Standard Employee',
          statusLabel: 'Normal Safe Activity',
          lastUpdate: 'Saved today at 21:10',
          riskContributionRate: 12,
          riskRateDelta: '-15% this month',
          histogramBars: [10, 12, 10, 14, 15, 12, 10, 11, 13, 12, 10, 12, 14, 15, 12, 10, 11, 12, 14, 12, 10, 11, 12, 10],
          metricsGrid: { alertsCount: 0, devicesCount: 1, ipsCount: 1, sessionsCount: 18 },
          aiSummary: 'Emma is logging in normally from her recognized company laptop in Austin, Texas. Everything looks completely safe.'
        }
      },
      {
        id: 'usr-006',
        name: 'John Miller',
        subtitle: 'Head of Sales • New iPhone in London',
        category: 'Team Accounts',
        badge: 'NEW DEVICE 35%',
        severity: 'LOW',
        riskScore: 35,
        status: 'NORMAL',
        inspectorData: {
          title: 'John Miller — Head of Enterprise Sales',
          roleOrType: 'Traveling Employee',
          statusLabel: 'Verified Travel',
          lastUpdate: 'Saved today at 20:45',
          riskContributionRate: 35,
          riskRateDelta: '+5% this week',
          histogramBars: [15, 18, 20, 22, 25, 28, 30, 35, 32, 28, 25, 22, 20, 18, 22, 25, 30, 35, 32, 28, 25, 22, 20, 18],
          metricsGrid: { alertsCount: 1, devicesCount: 2, ipsCount: 2, sessionsCount: 8 },
          aiSummary: 'John added a new phone while traveling for a business conference in London. He confirmed his identity with a phone code.'
        }
      }
    ]
  },
  {
    id: 'cat-logins',
    title: 'Login History',
    count: 842,
    iconName: 'Key',
    description: 'Past successful and failed sign-in attempts.',
    entities: [
      {
        id: 'log-01',
        name: 'Normal Safe Logins',
        subtitle: '784 Total Verified Logins',
        category: 'Login History',
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
          aiSummary: 'Logins during daytime hours from recognized company computers. Team members confirmed their phone codes with no issues.'
        }
      },
      {
        id: 'log-02',
        name: 'Wrong Password Attempts',
        subtitle: '48 Failed Password Guesses',
        category: 'Login History',
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
        name: 'Logins from Two Cities at Once',
        subtitle: '12 Impossible Travel Distance Events',
        category: 'Login History',
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
          aiSummary: 'Calculated travel speed between logins was over 8,000 km/h. No airplane flies this fast; someone on the other side of the world was using stolen credentials.'
        }
      }
    ]
  },
  {
    id: 'cat-devices',
    title: 'Computers & Phones',
    count: 14,
    iconName: 'Laptop',
    description: 'Hardware laptops, phones, and foreign devices seen logging in.',
    entities: [
      {
        id: 'dev-01',
        name: 'Sarah Chen’s MacBook Pro M3',
        subtitle: 'San Francisco, CA • Company Laptop',
        category: 'Computers & Phones',
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
          aiSummary: 'Enrolled company computer with hardware security chip. Consistently used by Sarah Chen.'
        }
      },
      {
        id: 'dev-02',
        name: 'Unknown Foreign Cloud Server',
        subtitle: 'Frankfurt, Germany • Automated Tool',
        category: 'Computers & Phones',
        badge: 'BLOCKED',
        severity: 'CRITICAL',
        status: 'BLOCKED',
        inspectorData: {
          title: 'Foreign Automated Server (Germany)',
          roleOrType: 'Hacker Machine',
          statusLabel: 'Permanently Blocked',
          lastUpdate: 'Blocked 8 mins ago',
          riskContributionRate: 98,
          riskRateDelta: '+98%',
          histogramBars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 95, 100, 100, 100, 80, 50, 20, 10, 5, 0, 0, 0],
          metricsGrid: { alertsCount: 8, devicesCount: 1, ipsCount: 2, sessionsCount: 0 },
          aiSummary: 'This machine was running an automated script trying to log into company accounts. It is not an employee laptop.'
        }
      }
    ]
  },
  {
    id: 'cat-ips',
    title: 'Locations & Internet IPs',
    count: 24,
    iconName: 'Globe',
    description: 'Cities, home WiFi, and foreign internet networks observed.',
    entities: [
      {
        id: 'ip-01',
        name: 'San Francisco Home WiFi (Comcast)',
        subtitle: '198.51.100.44 • USA',
        category: 'Locations & Internet IPs',
        badge: 'SAFE RESIDENTIAL',
        severity: 'LOW',
        status: 'SAFE',
        inspectorData: {
          title: 'Comcast Residential (San Francisco)',
          roleOrType: 'Employee Home Internet',
          statusLabel: 'Trusted Location',
          lastUpdate: 'Used today at 20:41',
          riskContributionRate: 4,
          riskRateDelta: '-2%',
          histogramBars: [10, 12, 10, 14, 15, 12, 10, 11, 13, 12, 10, 12, 14, 15, 12, 10, 11, 12, 14, 12, 10, 11, 12, 10],
          metricsGrid: { alertsCount: 0, devicesCount: 2, ipsCount: 1, sessionsCount: 120 },
          aiSummary: 'Normal home internet provider used by Sarah Chen for months with no suspicious activity.'
        }
      },
      {
        id: 'ip-02',
        name: 'Anonymous Hacker Network (Tor)',
        subtitle: '185.220.101.5 • Masked City',
        category: 'Locations & Internet IPs',
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
          aiSummary: 'Known network used by attackers to hide where they really are in the world. AuthSentry blocks these by default.'
        }
      }
    ]
  }
];
