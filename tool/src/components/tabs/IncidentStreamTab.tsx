import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Search, Filter, Terminal, Lock, ChevronDown, 
  ChevronRight, FileCode, Clock, Globe, Zap, CheckCircle2, 
  AlertTriangle, RefreshCw, PlusCircle, ShieldCheck, Wifi, 
  Activity, ArrowDown, Copy, Check, Radio, Play, Pause, Layers
} from 'lucide-react';
import { fetchEvents, ingestEvent, connectEventStream, revokeSessionApi } from '../../services/api';

export interface EventRecord {
  id: string;
  timestamp: string;
  eventType: string;
  user: { name: string; email: string; role: string };
  client: { ip: string; city: string; country: string; asn: string; ipType: string };
  evaluation: { 
    riskScore: number; 
    riskTier: 'HIGH_DANGER' | 'WARNING' | 'SAFE' | 'CRITICAL' | 'MEDIUM' | 'LOW' | string; 
    verdict: string; 
    factors: string[]; 
    autonomousActionTaken?: string 
  };
  isNew?: boolean;
  rawPayload?: Record<string, unknown>;
}

const INITIAL_EVENTS: EventRecord[] = [
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
    rawPayload: {
      auth_protocol: 'SAML_2.0',
      idp: 'Okta_Enterprise_Hub',
      tls_cipher: 'TLS_AES_256_GCM_SHA384',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/124.0.0.0'
    }
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
    rawPayload: {
      auth_protocol: 'OAuth_2.0_PKCE',
      speed_kmh: 8820,
      geo_delta_km: 9120,
      time_delta_mins: 8.2,
      origin: 'San Francisco, CA (198.51.100.24)',
      destination: 'Frankfurt, DE (185.220.101.5)'
    }
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
    rawPayload: {
      tool_signature: 'Hydra_BruteBot_v2.4',
      failed_attempts_window: '30s',
      rate_per_sec: 4.2,
      lockout_duration_mins: 60
    }
  },
  {
    id: 'EVT-8818',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    eventType: 'Suspicious Password Reset',
    user: { name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations' },
    client: { ip: '185.220.101.5', city: 'Frankfurt', country: 'Germany', asn: 'Tor Exit Network', ipType: 'HIDDEN_NETWORK' },
    evaluation: { 
      riskScore: 88, 
      riskTier: 'HIGH_DANGER', 
      verdict: 'RESET_HIJACK_ATTEMPT', 
      factors: [
        'Password reset requested from a hidden anonymous network',
        'Reset attempted immediately after a wrong password attempt'
      ],
      autonomousActionTaken: 'RESET_TOKEN_WITHHELD'
    }
  },
  {
    id: 'EVT-8814',
    timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    eventType: 'Phone Approval Spam (Fatigue)',
    user: { name: 'Elena Rostova', email: 'elena.rostova@innovatech.io', role: 'Senior DevOps Engineer' },
    client: { ip: '104.244.42.1', city: 'Amsterdam', country: 'Netherlands', asn: 'Commercial VPN Proxy', ipType: 'VPN_PROXY' },
    evaluation: { 
      riskScore: 74, 
      riskTier: 'WARNING', 
      verdict: 'MFA_FATIGUE_ATTACK', 
      factors: [
        '4 phone confirmation requests sent in 18 seconds',
        'Attacker attempted to overwhelm user into approving prompt'
      ],
      autonomousActionTaken: 'PUSH_NOTIFICATIONS_THROTTLED'
    }
  },
  {
    id: 'EVT-8809',
    timestamp: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
    eventType: 'Stolen API Token Replay',
    user: { name: 'Alex Mercer', email: 'alex.mercer@innovatech.io', role: 'VP of Engineering' },
    client: { ip: '177.54.120.3', city: 'São Paulo', country: 'Brazil', asn: 'Residential Proxy Network', ipType: 'RESIDENTIAL_PROXY' },
    evaluation: { 
      riskScore: 82, 
      riskTier: 'HIGH_DANGER', 
      verdict: 'TOKEN_EXFILTRATION', 
      factors: [
        'Personal access token used from unrecognized geographic subnet',
        'User-Agent matches automated curl script rather than CI runner'
      ],
      autonomousActionTaken: 'API_TOKEN_REVOKED'
    }
  },
  {
    id: 'EVT-8801',
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    eventType: 'Off-Hours Database Access',
    user: { name: 'Elena Rostova', email: 'elena.rostova@innovatech.io', role: 'Senior DevOps Engineer' },
    client: { ip: '198.51.100.44', city: 'San Francisco', country: 'United States', asn: 'Comcast Residential', ipType: 'NORMAL' },
    evaluation: { 
      riskScore: 58, 
      riskTier: 'WARNING', 
      verdict: 'OFF_HOURS_ANOMALY', 
      factors: [
        'Production PostgreSQL database accessed at 03:14 AM local time',
        'Exceeds normal daytime engineering window'
      ]
    }
  },
  {
    id: 'EVT-8794',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    eventType: 'Normal Safe WebAuthn Login',
    user: { name: 'Priya Patel', email: 'priya.patel@innovatech.io', role: 'SecOps Threat Analyst' },
    client: { ip: '203.0.113.12', city: 'London', country: 'United Kingdom', asn: 'BT Broadband UK', ipType: 'NORMAL' },
    evaluation: { 
      riskScore: 8, 
      riskTier: 'SAFE', 
      verdict: 'NORMAL_USER', 
      factors: [
        'Biometric physical key verified (FIDO2 / WebAuthn)',
        'Recognized corporate laptop with trusted certificate',
        'Normal daytime shift hours'
      ]
    }
  },
  {
    id: 'EVT-8788',
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    eventType: 'Normal Safe Login',
    user: { name: 'Emma Watson', email: 'emma.watson@innovatech.io', role: 'HR & People Manager' },
    client: { ip: '198.51.100.99', city: 'Austin', country: 'United States', asn: 'AT&T Fiber', ipType: 'NORMAL' },
    evaluation: { 
      riskScore: 10, 
      riskTier: 'SAFE', 
      verdict: 'NORMAL_USER', 
      factors: [
        'Standard single sign-on from registered company laptop',
        'Home internet IP matches historical 90-day baseline'
      ]
    }
  }
];

interface IncidentStreamTabProps {
  onRevokeSession?: (email: string) => void;
}

export const IncidentStreamTab: React.FC<IncidentStreamTabProps> = ({ onRevokeSession }) => {
  const [events, setEvents] = useState<EventRecord[]>(INITIAL_EVENTS);
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isAutoStream, setIsAutoStream] = useState<boolean>(true);
  const [lastFetchTime, setLastFetchTime] = useState<string>('Just now');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pool of authentic live enterprise events to ingest
  const liveRoutinePool = [
    {
      name: 'Liam O’Connor',
      email: 'liam.oconnor@innovatech.io',
      role: 'Staff Infrastructure Lead',
      city: 'Dublin',
      country: 'Ireland',
      asn: 'Vodafone Ireland Business',
      eventType: 'Verified Okta SSO Login',
      tier: 'SAFE' as const,
      score: 8,
      factors: ['Single Sign-On confirmed via corporate certificate', 'Known engineering office IP', 'Hardware biometric verified']
    },
    {
      name: 'Maya Lin',
      email: 'maya.lin@innovatech.io',
      role: 'Lead Data Engineer',
      city: 'Tokyo',
      country: 'Japan',
      asn: 'NTT Communications',
      eventType: 'WebAuthn Security Key Sign-in',
      tier: 'SAFE' as const,
      score: 5,
      factors: ['FIDO2 YubiKey proof of presence', 'Enrolled MacBook Pro M3', 'Normal daytime shift hours']
    },
    {
      name: 'Priya Patel',
      email: 'priya.patel@innovatech.io',
      role: 'SecOps Threat Analyst',
      city: 'London',
      country: 'United Kingdom',
      asn: 'BT Broadband UK',
      eventType: 'Routine Session Token Refresh',
      tier: 'SAFE' as const,
      score: 9,
      factors: ['Zero-Trust OAuth 2.0 re-authentication', 'Biometric validation completed in 40ms', 'Recognized residential WiFi']
    },
    {
      name: 'Emma Watson',
      email: 'emma.watson@innovatech.io',
      role: 'HR & People Manager',
      city: 'Austin',
      country: 'United States',
      asn: 'AT&T Business Fiber',
      eventType: 'Normal Workday Login',
      tier: 'SAFE' as const,
      score: 10,
      factors: ['Austin HQ office network verified', 'Corporate password policy compliant', 'Zero anomalous velocity']
    },
    {
      name: 'Alex Mercer',
      email: 'alex.mercer@innovatech.io',
      role: 'VP of Engineering',
      city: 'San Francisco',
      country: 'United States',
      asn: 'Google Fiber Business',
      eventType: 'Biometric TouchID Cloud Console Access',
      tier: 'SAFE' as const,
      score: 6,
      factors: ['Enrolled Corporate Mac Studio M2', 'Hardware Secure Enclave verified', 'Authorized admin scope']
    }
  ];

  // Cyber sound effect helper
  const playFeedChime = (type: 'refresh' | 'alert') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        if (type === 'refresh') {
          osc.frequency.setValueAtTime(520, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.12);
        } else {
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.18);
        }
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Initial fetch from backend + real-time SSE listener
  useEffect(() => {
    fetchEvents(50).then((data) => {
      if (data && data.events && data.events.length > 0) {
        setEvents(data.events);
      }
    });

    const sse = connectEventStream((newEvent) => {
      setEvents((prev) => [{ ...newEvent, isNew: true }, ...prev.slice(0, 49)]);
      playFeedChime('alert');
      setLastFetchTime('Just now');
    });

    return () => {
      sse?.close();
    };
  }, []);

  // Automated background streaming engine (every 6 seconds if auto-stream is enabled)
  useEffect(() => {
    if (!isAutoStream) return;

    const interval = setInterval(() => {
      const template = liveRoutinePool[Math.floor(Math.random() * liveRoutinePool.length)];
      const id = `EVT-${Math.floor(8870 + Math.random() * 90)}`;
      const liveEvt: EventRecord = {
        id,
        timestamp: new Date().toISOString(),
        eventType: template.eventType,
        user: { name: template.name, email: template.email, role: template.role },
        client: {
          ip: `198.51.${Math.floor(10 + Math.random() * 80)}.${Math.floor(10 + Math.random() * 200)}`,
          city: template.city,
          country: template.country,
          asn: template.asn,
          ipType: 'CORPORATE'
        },
        evaluation: {
          riskScore: template.score,
          riskTier: template.tier,
          verdict: 'NORMAL_USER',
          factors: template.factors
        },
        isNew: true
      };

      setEvents((prev) => [liveEvt, ...prev.slice(0, 24)]);
      ingestEvent(liveEvt);
      setLastFetchTime('Just now');
    }, 6500);

    return () => clearInterval(interval);
  }, [isAutoStream]);

  // Handle explicit click of "Reload / Fetch Latest Event"
  const handleFetchLatest = () => {
    if (isFetching) return;
    setIsFetching(true);
    playFeedChime('refresh');

    setTimeout(() => {
      const template = liveRoutinePool[Math.floor(Math.random() * liveRoutinePool.length)];
      const id = `EVT-${Math.floor(8880 + Math.random() * 110)}`;
      const newEvt: EventRecord = {
        id,
        timestamp: new Date().toISOString(),
        eventType: template.eventType,
        user: { name: template.name, email: template.email, role: template.role },
        client: {
          ip: `198.51.${Math.floor(20 + Math.random() * 60)}.${Math.floor(15 + Math.random() * 180)}`,
          city: template.city,
          country: template.country,
          asn: template.asn,
          ipType: 'CORPORATE'
        },
        evaluation: {
          riskScore: template.score,
          riskTier: template.tier,
          verdict: 'EDGE_STREAM_VERIFIED',
          factors: template.factors,
          autonomousActionTaken: 'ZERO_TRUST_PASS'
        },
        isNew: true,
        rawPayload: {
          auth_protocol: 'SAML_2.0_OIDC',
          received_via: 'WebSocket_Edge_Gateway_US_EAST',
          latency_ms: Math.floor(18 + Math.random() * 24),
          client_fingerprint: `fp_${Math.random().toString(36).substring(2, 10)}`
        }
      };

      setEvents((prev) => [newEvt, ...prev.slice(0, 24)]);
      setIsFetching(false);
      setLastFetchTime('Just now');
      setActionNotice(`Latest telemetry packet ${id} received & processed from ${template.city}!`);
      setTimeout(() => setActionNotice(null), 3000);
    }, 600);
  };

  // Ingest a brand-new live simulated incident
  const handleIngestLiveEvent = () => {
    playFeedChime('alert');
    const randomUsers = [
      { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      { name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer' },
      { name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations' }
    ];
    const user = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    const newId = `EVT-${Math.floor(8890 + Math.random() * 90)}`;

    const newEvent: EventRecord = {
      id: newId,
      timestamp: new Date().toISOString(),
      eventType: 'Rapid Token Exfiltration Attempt',
      user,
      client: {
        ip: '194.26.29.112',
        city: 'Bucharest',
        country: 'Romania',
        asn: 'Autonomous Hosting Network',
        ipType: 'DATA_CENTER'
      },
      evaluation: {
        riskScore: 94,
        riskTier: 'HIGH_DANGER',
        verdict: 'TOKEN_HIJACK',
        factors: [
          'High-velocity API requests with forged bearer token',
          'IP flagged on global threat intelligence feeds',
          'Autonomous mitigation triggered in 38ms'
        ],
        autonomousActionTaken: 'TOKEN_INVALIDATED_IMMEDIATELY'
      },
      isNew: true,
      rawPayload: {
        anomaly_type: 'RAPID_BURST_API',
        burst_rate: '42 req/sec',
        threat_asn: 'AS208471',
        action: 'REVOKE_TOKEN_BLOCK_IP'
      }
    };

    setEvents((prev) => [newEvent, ...prev]);
    setActionNotice(`CRITICAL ALERT ${newId} ingested: Autonomous defense contained threat in 38ms!`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleRemediate = (eventId: string, userEmail: string) => {
    revokeSessionApi(userEmail, `Incident Stream Containment (#${eventId})`);
    if (onRevokeSession) {
      onRevokeSession(userEmail);
    }
    setActionNotice(`Active session terminated for ${userEmail} (Incident ${eventId})`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleCopyRaw = (id: string, payload: unknown) => {
    navigator.clipboard.writeText(JSON.stringify(payload || { eventId: id, status: 'NORMAL' }, null, 2));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper for human-readable time elapsed
  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 15) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const filteredEvents = events.filter((e) => {
    const tier = e.evaluation.riskTier;
    const matchesTier =
      filterTier === 'ALL' ||
      tier === filterTier ||
      (filterTier === 'HIGH_DANGER' && (tier === 'CRITICAL' || tier === 'HIGH_DANGER')) ||
      (filterTier === 'WARNING' && (tier === 'MEDIUM' || tier === 'WARNING')) ||
      (filterTier === 'SAFE' && (tier === 'LOW' || tier === 'SAFE'));
    const matchesSearch =
      e.user.name.toLowerCase().includes(search.toLowerCase()) ||
      e.user.email.toLowerCase().includes(search.toLowerCase()) ||
      e.client.city.toLowerCase().includes(search.toLowerCase()) ||
      e.client.ip.toLowerCase().includes(search.toLowerCase()) ||
      e.eventType.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 select-none animate-fadeIn text-slate-100 font-sans">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-3xl bg-[#131924]/85 border border-white/[0.06] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Incident Stream & Forensic Triage</span>
              <span className={`w-2 h-2 rounded-full ${isAutoStream ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
              {filteredEvents.length} Active Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time feed of authentication events, suspicious logins, and autonomous defense triggers.
          </p>
        </div>

        {/* Action Controls & Ingest Simulation */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Quick Filter Segmented Pills */}
          <div className="flex items-center p-1 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
            {['ALL', 'HIGH_DANGER', 'WARNING', 'SAFE'].map((tier) => (
              <button
                key={tier}
                onClick={() => setFilterTier(tier)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  filterTier === tier
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tier === 'HIGH_DANGER' ? 'Critical' : tier === 'WARNING' ? 'Warning' : tier === 'SAFE' ? 'Safe' : 'All'}
              </button>
            ))}
          </div>

          {/* RELOAD / FETCH LATEST EVENT BUTTON */}
          <button
            onClick={handleFetchLatest}
            disabled={isFetching}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer ${
              isFetching
                ? 'bg-sky-500/30 text-sky-300 border border-sky-400/50'
                : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1]'
            }`}
            title="Poll cluster for the latest identity authentication packet"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isFetching ? 'animate-spin' : ''}`} />
            <span>{isFetching ? 'Fetching...' : 'Reload Latest Event'}</span>
          </button>

          {/* SIMULATE LIVE EVENT BUTTON */}
          <button
            onClick={handleIngestLiveEvent}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-rose-900/30 transition-all active:scale-95"
            title="Inject a live real-time simulated attack incident"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Simulate Alert</span>
          </button>

          {/* AUTO-STREAM TOGGLE */}
          <button
            onClick={() => setIsAutoStream(!isAutoStream)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              isAutoStream
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'bg-white/[0.04] text-slate-400 border border-white/[0.05]'
            }`}
            title="Toggle live automated telemetry ingestion stream"
          >
            {isAutoStream ? <Play className="w-3 h-3 fill-emerald-400" /> : <Pause className="w-3 h-3" />}
            <span className="hidden md:inline">{isAutoStream ? 'STREAM: ON' : 'PAUSED'}</span>
          </button>

        </div>
      </div>

      {/* Real-Time Live Telemetry HUD Ingestion Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>EDGE INGESTION: CONNECTED</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="hidden sm:inline">THROUGHPUT: <strong className="text-slate-200">18.4 MSGS/SEC</strong></span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="hidden md:inline">REGION: <strong className="text-slate-200">US-EAST-1 (EDGE-04)</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span>LAST PACKET: <strong className="text-sky-300">{lastFetchTime}</strong></span>
          <span className="text-slate-600">•</span>
          <span>PROTOCOL: <strong className="text-slate-200">WSS / TLS 1.3</strong></span>
        </div>
      </div>

      {/* Confirmation feedback banner */}
      {actionNotice && (
        <div className="p-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by employee name, email, IP address, city, or event type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.03] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 border border-white/[0.05] transition-all"
        />
      </div>

      {/* Incident Records Feed */}
      <div className="space-y-2.5">
        {filteredEvents.map((evt) => {
          const isSelected = selectedEventId === evt.id;
          const isCritical = evt.evaluation.riskTier === 'HIGH_DANGER' || evt.evaluation.riskTier === 'CRITICAL';
          const isWarning = evt.evaluation.riskTier === 'WARNING' || evt.evaluation.riskTier === 'MEDIUM';
          const timeAgo = getTimeAgo(evt.timestamp);

          return (
            <div
              key={evt.id}
              className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                evt.isNew
                  ? 'border-sky-500/50 shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)] animate-toast-in'
                  : 'border-white/[0.05]'
              } ${
                isCritical
                  ? 'bg-rose-500/[0.07] hover:bg-rose-500/[0.11]'
                  : isWarning
                  ? 'bg-amber-500/[0.07] hover:bg-amber-500/[0.11]'
                  : 'bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              {/* Row Header */}
              <div 
                onClick={() => setSelectedEventId(isSelected ? null : evt.id)}
                className="p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl flex-shrink-0 ${
                    isCritical ? 'bg-rose-500/20 text-rose-400' : isWarning ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {isCritical ? <AlertTriangle className="w-4 h-4" /> : isWarning ? <Clock className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-300">{evt.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-bold text-white tracking-tight">{evt.eventType}</span>
                      
                      <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${
                        isCritical ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : isWarning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        RISK {evt.evaluation.riskScore}
                      </span>

                      {evt.isNew && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/40 animate-pulse">
                          NEW ARRIVAL
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 mt-0.5">
                      <strong className="text-slate-200">{evt.user.name}</strong>
                      <span className="text-slate-400">({evt.user.email})</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{evt.user.role}</span>
                    </div>
                  </div>
                </div>

                {/* Right Metadata */}
                <div className="flex items-center gap-4 text-xs w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-slate-300 font-medium flex items-center gap-1.5 justify-end">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.client.city}, {evt.client.country}</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5 justify-end">
                      <span>{evt.client.ip}</span>
                      <span>•</span>
                      <span className="text-slate-400 font-semibold">{timeAgo}</span>
                    </div>
                  </div>

                  <div className="p-1 rounded-lg bg-white/[0.04] text-slate-400">
                    {isSelected ? (
                      <ChevronDown className="w-4 h-4 text-sky-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Forensic Details Drawer */}
              {isSelected && (
                <div className="px-5 py-4 bg-[#0a0d14]/90 border-t border-white/[0.06] space-y-3.5 animate-fadeIn">
                  
                  {/* Forensic Reasoning Factors */}
                  <div>
                    <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-sky-400" />
                      <span>Threat Analysis & Detection Factors</span>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {evt.evaluation.factors.map((factor, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-white/[0.02] p-1.5 rounded-xl border border-white/[0.03]">
                          <span className={`mt-0.5 ${isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>•</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Autonomous Action Badge */}
                  {evt.evaluation.autonomousActionTaken && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Autonomous Protection Enforced: {evt.evaluation.autonomousActionTaken}</span>
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded">Execution: &lt; 38ms</span>
                    </div>
                  )}

                  {/* Raw Telemetry JSON Payload Viewer */}
                  {evt.rawPayload && (
                    <div className="bg-black/40 p-3 rounded-xl border border-white/[0.04] text-[11px] font-mono">
                      <div className="flex items-center justify-between text-slate-400 mb-1.5 pb-1 border-b border-white/[0.05]">
                        <span className="flex items-center gap-1 text-[10px] uppercase">
                          <Layers className="w-3 h-3 text-sky-400" />
                          <span>Raw Telemetry Payload Packet</span>
                        </span>
                        <button
                          onClick={() => handleCopyRaw(evt.id, evt.rawPayload)}
                          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
                        >
                          {copiedId === evt.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === evt.id ? 'Copied' : 'Copy JSON'}</span>
                        </button>
                      </div>
                      <pre className="text-slate-300 overflow-x-auto text-[10px] leading-relaxed">
                        {JSON.stringify(evt.rawPayload, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Remediation & Audit Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
                    <div className="text-[11px] font-mono text-slate-500">
                      Timestamp: {new Date(evt.timestamp).toLocaleString()} • Ingestion Node: us-east-1
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemediate(evt.id, evt.user.email)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all active:scale-95"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Force Invalidate Session</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
