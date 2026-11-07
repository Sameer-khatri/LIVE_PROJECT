import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

const SEED_USERS = [
  { id: 'usr_001', name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect', department: 'Cloud Infrastructure', riskScore: 96, status: 'FLAGGED' },
  { id: 'usr_002', name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer', department: 'Finance', riskScore: 92, status: 'FLAGGED' },
  { id: 'usr_003', name: 'Elena Rostova', email: 'elena.rostova@innovatech.io', role: 'Senior DevOps Engineer', department: 'DevOps', riskScore: 74, status: 'MONITORED' },
  { id: 'usr_004', name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations', department: 'Operations', riskScore: 88, status: 'FLAGGED' },
  { id: 'usr_005', name: 'Priya Patel', email: 'priya.patel@innovatech.io', role: 'SecOps Threat Analyst', department: 'Security', riskScore: 8, status: 'NORMAL' },
  { id: 'usr_006', name: 'Liam O’Connor', email: 'liam.oconnor@innovatech.io', role: 'Staff Infrastructure Lead', department: 'Infrastructure', riskScore: 11, status: 'NORMAL' },
  { id: 'usr_007', name: 'Alex Mercer', email: 'alex.mercer@innovatech.io', role: 'VP of Engineering', department: 'Leadership', riskScore: 82, status: 'FLAGGED' },
  { id: 'usr_008', name: 'Emma Watson', email: 'emma.watson@innovatech.io', role: 'HR & People Manager', department: 'People', riskScore: 10, status: 'NORMAL' }
];

const SEED_SESSIONS = [
  {
    id: 'sess_98f2a',
    user: { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect', avatar: 'SC' },
    ip: '185.220.101.5',
    location: 'Frankfurt, Germany',
    device: 'Ubuntu Linux • Chrome 124.0',
    anomalyReason: 'Mach 7.1 Travel Velocity (8,820 km/h from San Francisco)',
    riskScore: 96,
    isTerminated: false,
    tokenExpiresIn: '1h 42m'
  },
  {
    id: 'sess_44e1c',
    user: { name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer', avatar: 'MV' },
    ip: '45.142.214.18',
    location: 'Saint Petersburg, Russia',
    device: 'Automated Script • curl/7.88',
    anomalyReason: '7 wrong passwords guessed in 30 seconds (Spray Bot)',
    riskScore: 92,
    isTerminated: false,
    tokenExpiresIn: '3h 10m'
  },
  {
    id: 'sess_71b9d',
    user: { name: 'Elena Rostova', email: 'elena.rostova@innovatech.io', role: 'Senior DevOps Engineer', avatar: 'ER' },
    ip: '104.244.42.1',
    location: 'Amsterdam, Netherlands',
    device: 'iPhone 15 Pro • Safari Mobile',
    anomalyReason: '4 MFA phone approval prompts in 18s (Fatigue Attack)',
    riskScore: 74,
    isTerminated: false,
    tokenExpiresIn: '45m'
  },
  {
    id: 'sess_33a0b',
    user: { name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations', avatar: 'DK' },
    ip: '185.220.101.5',
    location: 'Frankfurt, Germany',
    device: 'Tor Browser 13.0',
    anomalyReason: 'Password reset token request via anonymous Tor relay',
    riskScore: 88,
    isTerminated: false,
    tokenExpiresIn: '2h 15m'
  }
];

const SEED_FIREWALL = [
  { id: '1', ip: '185.220.101.5/32', asn: 'Anonymous Tor Exit Relay', reason: 'Tor Password Reset Hijack Attempt', time: '8 mins ago', duration: 'Permanent Ban' },
  { id: '2', ip: '45.142.214.0/24', asn: 'Overseas Cloud Botnet', reason: 'Distributed Password Spraying (7 att/30s)', time: '14 mins ago', duration: 'Auto-unban in 46m' },
  { id: '3', ip: '104.244.42.1/32', asn: 'Commercial VPN Relay Server', reason: 'Spammed phone approval notifications', time: '48 mins ago', duration: 'Auto-unban in 18m' }
];

const SEED_AUDIT_LOGS = [
  { id: 'log-1', time: '05:14:12 UTC', identity: 'sarah.chen@innovatech.io', action: 'OAuth Token Revoked', trigger: 'Mach 7.1 Velocity Violation', speed: '32ms' },
  { id: 'log-2', time: '05:08:44 UTC', identity: 'marcus.vance@innovatech.io', action: 'IP 45.142.214.0/24 Blacklisted', trigger: 'Credential Stuffing Bot', speed: '41ms' },
  { id: 'log-3', time: '04:54:19 UTC', identity: 'elena.rostova@innovatech.io', action: 'Push MFA Throttled', trigger: 'Phone Approval Spam Flood', speed: '19ms' },
  { id: 'log-4', time: '04:32:01 UTC', identity: 'alex.mercer@innovatech.io', action: 'Bearer Token Invalidated', trigger: 'API Token Exfiltration Replay', speed: '24ms' }
];

const SEED_EVENTS = [
  {
    id: 'EVT-8867',
    timestamp: new Date(Date.now() - 1000 * 12).toISOString(),
    eventType: 'Verified Okta SSO Login',
    user: { name: 'Liam O’Connor', email: 'liam.oconnor@innovatech.io', role: 'Staff Infrastructure Lead' },
    client: { ip: '198.51.89.90', city: 'Dublin', country: 'Ireland', asn: 'Vodafone Ireland Business', ipType: 'CORPORATE' },
    evaluation: { 
      riskScore: 11, 
      riskTier: 'SAFE', 
      verdict: 'OKTA_SAML_VERIFIED', 
      factors: [
        'Single Sign-On confirmed via corporate certificate authority',
        'Physical office static IP verified',
        'Hardware biometric confirmation verified in 42ms'
      ], 
      autonomousActionTaken: 'SESSION_ENROLLED_NOMINAL' 
    },
    rawPayload: { auth_protocol: 'SAML_2.0', idp: 'Okta_Enterprise_Hub', tls_cipher: 'TLS_AES_256_GCM_SHA384' }
  },
  {
    id: 'EVT-8824',
    timestamp: new Date(Date.now() - 1000 * 55).toISOString(),
    eventType: 'Impossible Fast Travel',
    user: { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
    client: { ip: '185.220.101.5', city: 'Frankfurt', country: 'Germany', asn: 'Cloud Hosting Server', ipType: 'HIDDEN_NETWORK' },
    evaluation: { 
      riskScore: 96, 
      riskTier: 'HIGH_DANGER', 
      verdict: 'SUSPICIOUS_LOGIN', 
      factors: [
        'Logged in from Germany only 8 minutes after San Francisco',
        'Connected through an anonymous hidden network (Tor)',
        'Calculated velocity: 8,820 km/h (Mach 7.1 violation)'
      ], 
      autonomousActionTaken: 'USER_AUTOMATICALLY_LOGGED_OUT' 
    },
    rawPayload: { auth_protocol: 'OAuth_2.0_PKCE', speed_kmh: 8820, geo_delta_km: 9120, time_delta_mins: 8.2 }
  },
  {
    id: 'EVT-8822',
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    eventType: 'Password Guessing Spree',
    user: { name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer' },
    client: { ip: '45.142.214.18', city: 'Saint Petersburg', country: 'Russia', asn: 'Foreign Hosting Network', ipType: 'FOREIGN_SERVER' },
    evaluation: { 
      riskScore: 92, 
      riskTier: 'HIGH_DANGER', 
      verdict: 'CREDENTIAL_STUFFING', 
      factors: [
        '7 incorrect passwords entered in 30 seconds',
        'Automated script signature identified',
        'Targeted executive financial account'
      ],
      autonomousActionTaken: 'ACCOUNT_TEMPORARILY_LOCKED'
    },
    rawPayload: { tool_signature: 'Hydra_BruteBot_v2.4', failed_attempts_window: '30s', rate_per_sec: 4.2 }
  }
];

export class DatabaseStore {
  constructor() {
    this.events = [];
    this.threatSessions = [];
    this.quarantinedIps = [];
    this.auditLogs = [];
    this.users = [];
    this.policy = {
      autoRevokeOnCritical: true,
      autoQuarantineIp: true,
      stepUpMfaOnHigh: true,
      impossibleTravelSpeedKmH: 800,
      bruteForceThreshold: 5,
      mfaBombingWindowSec: 30,
      maxSessionHours: 4
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.events = parsed.events && parsed.events.length > 0 ? parsed.events : SEED_EVENTS;
        this.threatSessions = parsed.threatSessions && parsed.threatSessions.length > 0 ? parsed.threatSessions : SEED_SESSIONS;
        this.quarantinedIps = parsed.quarantinedIps && parsed.quarantinedIps.length > 0 ? parsed.quarantinedIps : SEED_FIREWALL;
        this.auditLogs = parsed.auditLogs && parsed.auditLogs.length > 0 ? parsed.auditLogs : SEED_AUDIT_LOGS;
        this.users = parsed.users && parsed.users.length > 0 ? parsed.users : SEED_USERS;
        this.policy = parsed.policy || this.policy;
      } else {
        this.events = [...SEED_EVENTS];
        this.threatSessions = [...SEED_SESSIONS];
        this.quarantinedIps = [...SEED_FIREWALL];
        this.auditLogs = [...SEED_AUDIT_LOGS];
        this.users = [...SEED_USERS];
        this.save();
      }
    } catch (e) {
      console.warn('DB load error, using seed defaults:', e.message);
      this.events = [...SEED_EVENTS];
      this.threatSessions = [...SEED_SESSIONS];
      this.quarantinedIps = [...SEED_FIREWALL];
      this.auditLogs = [...SEED_AUDIT_LOGS];
      this.users = [...SEED_USERS];
    }
  }

  save() {
    try {
      const data = {
        updatedAt: new Date().toISOString(),
        users: this.users,
        threatSessions: this.threatSessions,
        quarantinedIps: this.quarantinedIps,
        auditLogs: this.auditLogs,
        events: this.events,
        policy: this.policy
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to persist database to file:', e);
    }
  }

  // Events API
  addEvent(event) {
    this.events.unshift(event);
    if (this.events.length > 250) {
      this.events = this.events.slice(0, 250);
    }
    this.save();
    return event;
  }

  getEvents(limit = 50, filter = null) {
    let result = [...this.events];
    if (filter) {
      if (filter.riskTier && filter.riskTier !== 'ALL') {
        result = result.filter(e => e.evaluation?.riskTier === filter.riskTier);
      }
      if (filter.search) {
        const q = filter.search.toLowerCase();
        result = result.filter(e => 
          e.user?.name?.toLowerCase().includes(q) ||
          e.user?.email?.toLowerCase().includes(q) ||
          e.eventType?.toLowerCase().includes(q) ||
          e.client?.ip?.includes(q) ||
          e.client?.city?.toLowerCase().includes(q)
        );
      }
    }
    return result.slice(0, limit);
  }

  // Sessions API
  getSessions() {
    return this.threatSessions;
  }

  revokeSession(sessionId, reason = 'Operator Killswitch') {
    let target = null;
    this.threatSessions = this.threatSessions.map(s => {
      if (s.id === sessionId || s.user.email === sessionId) {
        target = s;
        return { ...s, isTerminated: true };
      }
      return s;
    });

    if (target) {
      this.recordAuditLog(target.user.email, 'Session Revoked', reason, '< 32ms');
      this.save();
    }
    return target;
  }

  killAllSessions() {
    this.threatSessions = this.threatSessions.map(s => ({ ...s, isTerminated: true }));
    this.recordAuditLog('All Active Enterprise Users', 'Global Killswitch Enforced', 'Emergency nuclear command', '< 45ms');
    this.save();
    return { success: true, count: 1428 };
  }

  // Firewall API
  getQuarantinedIps() {
    return this.quarantinedIps;
  }

  addQuarantineIp(ip, reason = 'Operator Manual Override', asn = 'Manual Firewall Ban') {
    const newEntry = {
      id: String(Date.now()),
      ip,
      asn,
      reason,
      time: 'Just now',
      duration: 'Permanent Ban'
    };
    this.quarantinedIps.unshift(newEntry);
    this.recordAuditLog(ip, 'Subnet Blacklisted at Edge', reason, '< 80ms');
    this.save();
    return newEntry;
  }

  removeQuarantineIp(id) {
    this.quarantinedIps = this.quarantinedIps.filter(item => item.id !== id && item.ip !== id);
    this.save();
    return true;
  }

  // Audit Logs
  getAuditLogs() {
    return this.auditLogs;
  }

  recordAuditLog(identity, action, trigger, speed = '< 35ms') {
    const log = {
      id: `log-${Date.now()}`,
      time: new Date().toISOString().substring(11, 19) + ' UTC',
      identity,
      action,
      trigger,
      speed
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 100) this.auditLogs.pop();
    this.save();
    return log;
  }

  // Policy
  getPolicy() {
    return this.policy;
  }

  updatePolicy(newPolicy) {
    this.policy = { ...this.policy, ...newPolicy };
    this.save();
    return this.policy;
  }
}

export const db = new DatabaseStore();
