import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Initial seed events
const SEED_EVENTS = [
  {
    id: 'evt_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    eventType: 'LOGIN_SUCCESS',
    user: { id: 'usr_001', name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect', department: 'Engineering' },
    client: { ip: '198.51.100.44', ipType: 'RESIDENTIAL', asn: 'AS7922 Comcast Cable', city: 'San Francisco', country: 'United States', latitude: 37.7749, longitude: -122.4194, userAgent: 'Chrome/120.0 (macOS)', deviceFingerprint: 'MacBookPro-M3-Corp' },
    evaluation: { riskScore: 12, riskTier: 'LOW', verdict: 'AUTHORIZED', factors: ['Known corporate device', 'Residential home ISP'] }
  },
  {
    id: 'evt_002',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    eventType: 'LOGIN_FAILED',
    user: { id: 'usr_002', name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer', department: 'Finance' },
    client: { ip: '45.142.214.18', ipType: 'DATACENTER', asn: 'AS44050 Petersburg Internet', city: 'Saint Petersburg', country: 'Russia', latitude: 59.9343, longitude: 30.3351, userAgent: 'Headless Chromium', deviceFingerprint: 'Unknown-Attacker-Rig' },
    evaluation: { riskScore: 88, riskTier: 'CRITICAL', verdict: 'ATTACK_DETECTED', factors: ['Rapid credential stuffing', 'Datacenter hosting ASN', 'Headless client agent'] }
  },
  {
    id: 'evt_003',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    eventType: 'PASSWORD_RESET_REQUEST',
    user: { id: 'usr_004', name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations', department: 'Product' },
    client: { ip: '185.220.101.5', ipType: 'TOR_EXIT', asn: 'AS208294 Tor Exit Network', city: 'Frankfurt am Main', country: 'Germany', latitude: 50.1109, longitude: 8.6821, userAgent: 'TorBrowser/115.0', deviceFingerprint: 'Tor-Masked-Client' },
    evaluation: { riskScore: 92, riskTier: 'CRITICAL', verdict: 'ATTACK_DETECTED', factors: ['Verified Tor exit node', 'Rapid reset post-failure'] }
  }
];

export class DatabaseStore {
  constructor() {
    this.events = [];
    this.mitigations = [];
    this.policy = {
      autoRevokeOnCritical: true,
      autoQuarantineIp: true,
      stepUpMfaOnHigh: true,
      impossibleTravelSpeedKmH: 800,
      bruteForceThreshold: 5,
      mfaBombingWindowSec: 30,
      weightHeuristics: 35,
      weightThreatIntel: 35,
      weightUeba: 30
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.events = parsed.events || SEED_EVENTS;
        this.mitigations = parsed.mitigations || [];
        this.policy = parsed.policy || this.policy;
      } else {
        this.events = [...SEED_EVENTS];
        this.save();
      }
    } catch (e) {
      this.events = [...SEED_EVENTS];
    }
  }

  save() {
    try {
      const data = {
        events: this.events,
        mitigations: this.mitigations,
        policy: this.policy,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to persist database:', e);
    }
  }

  addEvent(event) {
    this.events.unshift(event);
    if (this.events.length > 500) {
      this.events = this.events.slice(0, 500); // Ring buffer
    }
    this.save();
    return event;
  }

  getEvents(limit = 50, filter = null) {
    let result = [...this.events];
    if (filter) {
      if (filter.riskTier) result = result.filter(e => e.evaluation.riskTier === filter.riskTier);
      if (filter.eventType) result = result.filter(e => e.eventType === filter.eventType);
      if (filter.search) {
        const q = filter.search.toLowerCase();
        result = result.filter(e => 
          e.user.email.toLowerCase().includes(q) ||
          e.client.ip.includes(q) ||
          e.client.city.toLowerCase().includes(q)
        );
      }
    }
    return result.slice(0, limit);
  }

  recordMitigation(action) {
    const record = {
      id: `mit_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...action,
      status: 'EXECUTED'
    };
    this.mitigations.unshift(record);
    this.save();
    return record;
  }

  getMitigations() {
    return this.mitigations;
  }

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

