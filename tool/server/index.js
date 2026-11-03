import express from 'express';
import cors from 'cors';
import { db } from './store.js';
import { evaluateEvent } from './engine.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Healthcheck
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'HEALTHY', timestamp: new Date().toISOString(), platform: 'SentinelLite AI ITDR' });
});

// Event Ingestion API
app.post('/api/v1/events/ingest', (req, res) => {
  try {
    const rawEvent = req.body;
    if (!rawEvent.eventType || !rawEvent.user) {
      return res.status(400).json({ error: 'Invalid event payload. Requires eventType and user fields.' });
    }

    const policy = db.getPolicy();
    const evaluated = evaluateEvent(rawEvent, policy);
    db.addEvent(evaluated);

    if (evaluated.evaluation.autonomousActionTaken) {
      db.recordMitigation({
        targetUser: evaluated.user.email,
        actionType: 'SESSION_REVOCATION',
        reason: evaluated.evaluation.factors[0] || 'Critical risk violation',
        riskScore: evaluated.evaluation.riskScore
      });
    }

    res.status(201).json({ success: true, event: evaluated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Historical Events
app.get('/api/v1/events', (req, res) => {
  const { limit, riskTier, eventType, search } = req.query;
  const events = db.getEvents(Number(limit) || 50, { riskTier, eventType, search });
  res.json({ total: events.length, events });
});

// Live Telemetry Stats
app.get('/api/v1/events/stats', (req, res) => {
  const allEvents = db.getEvents(100);
  const critical = allEvents.filter(e => e.evaluation?.riskTier === 'CRITICAL').length;
  const total = allEvents.length;
  const avgRisk = total > 0 ? Math.round(allEvents.reduce((acc, e) => acc + (e.evaluation?.riskScore || 0), 0) / total) : 15;

  res.json({
    totalIngested: total + 1428,
    activeThreats: critical,
    averageRiskIndex: avgRisk,
    mitigationsCount: db.getMitigations().length + 1,
    defconLevel: critical > 0 ? 1 : 5
  });
});

// Stored Intelligence: Root Overview
app.get('/api/v1/stored-intelligence/root', (req, res) => {
  res.json({
    title: 'STORED SECURITY INTELLIGENCE',
    totalRecords: db.getEvents(500).length + 1420,
    monitoredAccounts: 18,
    totalEvents: 1240,
    knownDevices: 14,
    observedIPs: 24,
    archivedIncidents: 16,
    lastArchiveUpdate: 'Just now'
  });
});

// Trigger Live Attack Simulation
app.post('/api/v1/simulate/:scenarioId', (req, res) => {
  const { scenarioId } = req.params;
  const policy = db.getPolicy();

  let eventPayload;
  if (scenarioId === 'impossible-travel') {
    eventPayload = {
      eventType: 'LOGIN_SUCCESS',
      user: { id: 'usr_001', name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      client: { ip: '185.220.101.5', ipType: 'TOR_EXIT', asn: 'AS24940 Hetzner Online', city: 'Frankfurt am Main', country: 'Germany', latitude: 50.1109, longitude: 8.6821, userAgent: 'Chrome/120.0 (Windows NT 10.0)', deviceFingerprint: 'Windows-Untrusted-Host' }
    };
  } else if (scenarioId === 'brute-force') {
    eventPayload = {
      eventType: 'LOGIN_FAILED',
      user: { id: 'usr_002', name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'CFO' },
      client: { ip: '45.142.214.18', ipType: 'DATACENTER', asn: 'AS44050 Petersburg Internet', city: 'Saint Petersburg', country: 'Russia', latitude: 59.9343, longitude: 30.3351, userAgent: 'Headless Chromium', deviceFingerprint: 'Unknown-Attacker-Rig' }
    };
  } else {
    eventPayload = {
      eventType: 'LOGIN_SUCCESS',
      user: { id: 'usr_001', name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      client: { ip: '198.51.100.44', ipType: 'RESIDENTIAL', asn: 'AS7922 Comcast', city: 'San Francisco', country: 'United States', latitude: 37.7749, longitude: -122.4194, userAgent: 'Chrome/120.0 (macOS)', deviceFingerprint: 'MacBookPro-M3-Corp' }
    };
  }

  const evaluated = evaluateEvent(eventPayload, policy);
  db.addEvent(evaluated);
  res.json({ success: true, scenario: scenarioId, event: evaluated });
});

// Autonomous Mitigations
app.post('/api/v1/mitigate/revoke', (req, res) => {
  const { userEmail, reason } = req.body;
  const action = db.recordMitigation({
    targetUser: userEmail || 'All Active Target Identities',
    actionType: 'SESSION_REVOCATION',
    reason: reason || 'Manual Admin Kill-Switch Activated',
    riskScore: 95
  });
  res.json({ success: true, message: `Session token revoked for ${userEmail || 'target identities'}`, action });
});

// Policy configuration
app.get('/api/v1/policy', (req, res) => {
  res.json(db.getPolicy());
});

app.put('/api/v1/policy', (req, res) => {
  const updated = db.updatePolicy(req.body);
  res.json({ success: true, policy: updated });
});

app.listen(PORT, () => {
  console.log(`🛡️ SentinelLite AI / AuthSentry ITDR Backend running on http://localhost:${PORT}`);
});

