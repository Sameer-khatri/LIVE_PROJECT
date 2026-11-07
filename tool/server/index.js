import express from 'express';
import cors from 'cors';
import { db } from './store.js';
import { evaluateEvent } from './engine.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Track active Server-Sent Events (SSE) clients for real-time live ingestion
const sseClients = new Set();

const broadcastSSE = (eventType, data) => {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    client.write(payload);
  }
};

// 1. Healthcheck Endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'AuthSentry ITDR Autonomous Defense Core',
    version: '2.4.0',
    port: PORT,
    timestamp: new Date().toISOString(),
    database: {
      recordsCount: db.events.length,
      threatSessionsCount: db.threatSessions.filter(s => !s.isTerminated).length,
      quarantinedIpsCount: db.quarantinedIps.length
    }
  });
});

// 2. Real-Time Telemetry Stats
app.get('/api/v1/telemetry', (req, res) => {
  const events = db.getEvents(100);
  const critical = events.filter(e => e.evaluation?.riskTier === 'HIGH_DANGER' || e.evaluation?.riskTier === 'CRITICAL').length;
  const threatSessions = db.getSessions().filter(s => !s.isTerminated);
  
  res.json({
    riskPercentile: threatSessions.length > 0 ? 74 : 18,
    attackVelocityRatio: threatSessions.length > 0 ? 4.2 : 1.0,
    activeIncidentsCount: threatSessions.length,
    defconLevel: threatSessions.length > 2 ? 1 : threatSessions.length > 0 ? 2 : 5,
    monitoredIdentities: 1428,
    legitimateLoginRatio: threatSessions.length > 0 ? 62.4 : 98.4
  });
});

// 3. Live Server-Sent Events (SSE) Stream
app.get('/api/v1/events/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.add(res);

  // Send initial handshake
  res.write(`event: connected\ndata: ${JSON.stringify({ message: 'Connected to AuthSentry Edge Stream' })}\n\n`);

  // Periodic heartbeat keepalive to prevent proxy socket timeout
  const keepAliveTimer = setInterval(() => {
    try {
      res.write(': keepalive\n\n');
    } catch {
      clearInterval(keepAliveTimer);
      sseClients.delete(res);
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(keepAliveTimer);
    sseClients.delete(res);
  });
});

// 4. Ingest Event API (Runs detection engine & broadcasts live)
app.post('/api/v1/events/ingest', (req, res) => {
  try {
    const rawEvent = req.body;
    if (!rawEvent.eventType || !rawEvent.user) {
      return res.status(400).json({ error: 'Invalid payload: Requires eventType and user fields.' });
    }

    const policy = db.getPolicy();
    const evaluated = evaluateEvent(rawEvent, policy);
    db.addEvent(evaluated);

    // Auto-containment triggered
    if (evaluated.evaluation?.autonomousActionTaken) {
      db.recordAuditLog(
        evaluated.user.email,
        'Autonomous Session Containment',
        evaluated.evaluation.factors[0] || 'Zero-Trust Policy Violation',
        '< 38ms'
      );
    }

    // Broadcast in real-time to all connected browser dashboards via SSE
    broadcastSSE('incident', evaluated);

    res.status(201).json({ success: true, event: evaluated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Query Historical Events
app.get('/api/v1/events', (req, res) => {
  const { limit, riskTier, search } = req.query;
  const events = db.getEvents(Number(limit) || 50, { riskTier, search });
  res.json({ total: events.length, events });
});

// 6. Threat Simulation Vectors (Impossible Travel, Credential Stuffing, etc.)
app.post('/api/v1/simulate/:scenarioId', (req, res) => {
  const { scenarioId } = req.params;
  const policy = db.getPolicy();

  let eventPayload;

  if (scenarioId === 'IMPOSSIBLE_TRAVEL') {
    eventPayload = {
      eventType: 'Impossible Fast Travel',
      user: { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      client: { ip: '185.220.101.5', city: 'Frankfurt', country: 'Germany', asn: 'Cloud Hosting Server', ipType: 'TOR_EXIT', latitude: 50.1109, longitude: 8.6821 },
      rawPayload: { auth_protocol: 'OAuth_2.0_PKCE', speed_kmh: 8820, geo_delta_km: 9120, time_delta_mins: 8.2 }
    };
  } else if (scenarioId === 'BRUTE_FORCE') {
    eventPayload = {
      eventType: 'Password Guessing Spree',
      user: { name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer' },
      client: { ip: '45.142.214.18', city: 'Saint Petersburg', country: 'Russia', asn: 'Foreign Hosting Network', ipType: 'DATACENTER', latitude: 59.9343, longitude: 30.3351 },
      rawPayload: { tool_signature: 'Hydra_BruteBot_v2.4', failed_attempts_window: '30s', rate_per_sec: 4.2 }
    };
  } else if (scenarioId === 'MFA_BOMBING') {
    eventPayload = {
      eventType: 'Phone Approval Spam (Fatigue)',
      user: { name: 'Elena Rostova', email: 'elena.rostova@innovatech.io', role: 'Senior DevOps Engineer' },
      client: { ip: '104.244.42.1', city: 'Amsterdam', country: 'Netherlands', asn: 'Commercial VPN Proxy', ipType: 'VPN_PROXY', latitude: 52.3676, longitude: 4.9041 },
      rawPayload: { mfa_attempts_count: 4, window_seconds: 18 }
    };
  } else if (scenarioId === 'TOR_RESET') {
    eventPayload = {
      eventType: 'Suspicious Password Reset via Tor',
      user: { name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations' },
      client: { ip: '185.220.101.5', city: 'Frankfurt', country: 'Germany', asn: 'Tor Exit Network', ipType: 'TOR_EXIT', latitude: 50.1109, longitude: 8.6821 },
      rawPayload: { password_reset_channel: 'Darknet_Onion_Proxy' }
    };
  } else {
    // Normal baseline
    eventPayload = {
      eventType: 'Verified Okta SSO Login',
      user: { name: 'Liam O’Connor', email: 'liam.oconnor@innovatech.io', role: 'Staff Infrastructure Lead' },
      client: { ip: '198.51.89.90', city: 'Dublin', country: 'Ireland', asn: 'Vodafone Ireland Business', ipType: 'CORPORATE', latitude: 53.3498, longitude: -6.2603 },
      rawPayload: { auth_protocol: 'SAML_2.0', idp: 'Okta_Enterprise_Hub' }
    };
  }

  const evaluated = evaluateEvent(eventPayload, policy);
  db.addEvent(evaluated);
  broadcastSSE('incident', evaluated);

  // Sync threat session active state for mitigation drills
  if (scenarioId === 'IMPOSSIBLE_TRAVEL') {
    db.threatSessions = db.threatSessions.map(s => s.user.email === 'sarah.chen@innovatech.io' ? { ...s, isTerminated: false } : s);
    db.save();
  } else if (scenarioId === 'BRUTE_FORCE') {
    db.threatSessions = db.threatSessions.map(s => s.user.email === 'marcus.vance@innovatech.io' ? { ...s, isTerminated: false } : s);
    db.save();
  } else if (scenarioId === 'MFA_BOMBING') {
    db.threatSessions = db.threatSessions.map(s => s.user.email === 'elena.rostova@innovatech.io' ? { ...s, isTerminated: false } : s);
    db.save();
  } else if (scenarioId === 'TOR_RESET') {
    db.threatSessions = db.threatSessions.map(s => s.user.email === 'david.kim@innovatech.io' ? { ...s, isTerminated: false } : s);
    db.save();
  }
  broadcastSSE('sessions_updated', { sessions: db.getSessions() });

  res.json({ success: true, scenario: scenarioId, event: evaluated });
});

// 7. Sessions Management (Killswitch & Revocations)
app.get('/api/v1/sessions', (req, res) => {
  res.json({ sessions: db.getSessions() });
});

app.post('/api/v1/sessions/:id/revoke', (req, res) => {
  const { id } = req.params;
  const { reason } = req.body || {};
  const revoked = db.revokeSession(id, reason || 'Operator Manual Termination');
  broadcastSSE('session_revoked', { sessionId: id, session: revoked });
  broadcastSSE('sessions_updated', { sessions: db.getSessions() });
  res.json({ success: true, session: revoked });
});

app.post('/api/v1/sessions/kill-all', (req, res) => {
  const result = db.killAllSessions();
  broadcastSSE('kill_all', result);
  broadcastSSE('sessions_updated', { sessions: db.getSessions() });
  res.json({ success: true, message: 'All active sessions terminated across regional hubs.' });
});

// 8. Firewall Blacklist Management
app.get('/api/v1/firewall', (req, res) => {
  res.json({ bannedIps: db.getQuarantinedIps() });
});

app.post('/api/v1/firewall/ban', (req, res) => {
  const { ip, reason, asn } = req.body;
  if (!ip) return res.status(400).json({ error: 'Requires IP address' });
  const entry = db.addQuarantineIp(ip, reason, asn);
  broadcastSSE('ip_banned', entry);
  broadcastSSE('firewall_updated', { bannedIps: db.getQuarantinedIps() });
  res.json({ success: true, entry });
});

app.delete('/api/v1/firewall/:id', (req, res) => {
  const { id } = req.params;
  db.removeQuarantineIp(id);
  broadcastSSE('ip_unbanned', { id });
  broadcastSSE('firewall_updated', { bannedIps: db.getQuarantinedIps() });
  res.json({ success: true, id });
});

// 9. Autonomous Audit Ledger
app.get('/api/v1/audit-ledger', (req, res) => {
  res.json({ logs: db.getAuditLogs() });
});

// 10. Policy Studio API
app.get('/api/v1/policy', (req, res) => {
  res.json(db.getPolicy());
});

app.put('/api/v1/policy', (req, res) => {
  const updated = db.updatePolicy(req.body);
  res.json({ success: true, policy: updated });
});

// 11. SentryCopilot Server-Side AI Triage Endpoint
app.post('/api/v1/ai/triage', (req, res) => {
  const { prompt } = req.body || {};
  const lower = (prompt || '').toLowerCase();

  let reply;
  if (lower.includes('sarah chen') || lower.includes('travel')) {
    reply = {
      verdict: 'IMPOSSIBLE_TRAVEL_CONFIRMED',
      riskScore: 96,
      summary: 'Sarah Chen logged in from San Francisco and then Frankfurt only 8.2 minutes apart (8,820 km/h, Mach 7.1). Token exfiltration detected.',
      action: 'REVOKE_SESSION'
    };
  } else if (lower.includes('185.220.101.5') || lower.includes('tor')) {
    reply = {
      verdict: 'TOR_EXIT_NODE_DETECTED',
      riskScore: 91,
      summary: 'IP 185.220.101.5 is a confirmed Tor exit relay with 0 legitimate enterprise logins. Safe to quarantine subnet on edge firewall.',
      action: 'QUARANTINE_IP'
    };
  } else {
    reply = {
      verdict: 'AUTONOMOUS_SYNTHESIS',
      riskScore: 18,
      summary: `Analyzed query: "${prompt}". Telemetry shows 1,428 monitored enterprise identities operating normally with 98.4% safe baseline adherence.`,
      action: 'NONE'
    };
  }

  res.json({ success: true, reply });
});

app.listen(PORT, () => {
  console.log(`🛡️ AuthSentry ITDR Autonomous Defense Backend running on http://localhost:${PORT}`);
});
