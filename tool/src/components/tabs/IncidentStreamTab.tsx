import React, { useState } from 'react';
import { 
  ShieldAlert, Search, Filter, Terminal, Lock, ChevronDown, 
  ChevronRight, FileCode, Clock, Globe, Zap, CheckCircle2, 
  AlertTriangle, RefreshCw, PlusCircle, ShieldCheck
} from 'lucide-react';

export interface EventRecord {
  id: string;
  timestamp: string;
  eventType: string;
  user: { name: string; email: string; role: string };
  client: { ip: string; city: string; country: string; asn: string; ipType: string };
  evaluation: { 
    riskScore: number; 
    riskTier: 'HIGH_DANGER' | 'WARNING' | 'SAFE'; 
    verdict: string; 
    factors: string[]; 
    autonomousActionTaken?: string 
  };
}

const INITIAL_EVENTS: EventRecord[] = [
  {
    id: 'EVT-8824',
    timestamp: new Date(Date.now() - 1000 * 45).toISOString(),
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
        'Calculated velocity: 8,820 km/h (exceeds commercial flight limit)'
      ], 
      autonomousActionTaken: 'USER_AUTOMATICALLY_LOGGED_OUT' 
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
  },
  {
    id: 'EVT-8782',
    timestamp: new Date(Date.now() - 1000 * 60 * 115).toISOString(),
    eventType: 'Corporate SSO Authentication Verified',
    user: { name: 'Liam O’Connor', email: 'liam.oconnor@innovatech.io', role: 'Staff Infrastructure Lead' },
    client: { ip: '193.120.44.8', city: 'Dublin', country: 'Ireland', asn: 'Vodafone Ireland Business', ipType: 'NORMAL' },
    evaluation: {
      riskScore: 6,
      riskTier: 'SAFE',
      verdict: 'NORMAL_USER',
      factors: [
        'Single Sign-On confirmed via corporate certificate',
        'Known engineering office IP address',
        'Zero velocity anomaly'
      ]
    }
  },
  {
    id: 'EVT-8776',
    timestamp: new Date(Date.now() - 1000 * 60 * 135).toISOString(),
    eventType: 'WebAuthn Security Key Sign-in',
    user: { name: 'Maya Lin', email: 'maya.lin@innovatech.io', role: 'Lead Data Engineer' },
    client: { ip: '210.140.10.5', city: 'Tokyo', country: 'Japan', asn: 'NTT Communications', ipType: 'NORMAL' },
    evaluation: {
      riskScore: 4,
      riskTier: 'SAFE',
      verdict: 'NORMAL_USER',
      factors: [
        'FIDO2 YubiKey proof of physical presence',
        'Enrolled MacBook Pro M3',
        'Regular daytime Tokyo office hours'
      ]
    }
  },
  {
    id: 'EVT-8770',
    timestamp: new Date(Date.now() - 1000 * 60 * 155).toISOString(),
    eventType: 'Mobile Biometric App Confirmation',
    user: { name: 'Elena Rostova', email: 'elena.rostova@innovatech.io', role: 'Senior DevOps Engineer' },
    client: { ip: '188.166.42.11', city: 'Amsterdam', country: 'Netherlands', asn: 'KPN Netherlands', ipType: 'NORMAL' },
    evaluation: {
      riskScore: 10,
      riskTier: 'SAFE',
      verdict: 'NORMAL_USER',
      factors: [
        'FaceID biometric approval verified on enrolled iPhone 16 Pro',
        'Corporate device certificate validated'
      ]
    }
  },
  {
    id: 'EVT-8764',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    eventType: 'AWS Production Gateway VPC Heartbeat',
    user: { name: 'Service: aws-east-runner', email: 'infra-runner@innovatech.io', role: 'Automated Microservice' },
    client: { ip: '54.210.88.19', city: 'Ashburn', country: 'United States', asn: 'Amazon AWS VPC', ipType: 'DATA_CENTER' },
    evaluation: {
      riskScore: 2,
      riskTier: 'SAFE',
      verdict: 'SYSTEM_ROUTINE',
      factors: [
        'Automated mTLS cryptographic certificate handshake',
        'Internal VPC subnet whitelisted on edge firewall'
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

  // Live real-time ingestion stream: introduces healthy verified corporate logins periodically
  React.useEffect(() => {
    const routineEventsPool = [
      {
        name: 'Liam O’Connor',
        email: 'liam.oconnor@innovatech.io',
        role: 'Staff Infrastructure Lead',
        city: 'Dublin',
        country: 'Ireland',
        asn: 'Vodafone Ireland Business',
        eventType: 'Verified Okta SSO Login',
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
        factors: ['Austin HQ office network verified', 'Corporate password policy compliant', 'Zero anomalous velocity']
      }
    ];

    const interval = setInterval(() => {
      const template = routineEventsPool[Math.floor(Math.random() * routineEventsPool.length)];
      const id = `EVT-${Math.floor(8830 + Math.random() * 90)}`;
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
          ipType: 'NORMAL'
        },
        evaluation: {
          riskScore: Math.floor(4 + Math.random() * 8),
          riskTier: 'SAFE',
          verdict: 'NORMAL_USER',
          factors: template.factors
        }
      };

      setEvents((prev) => [liveEvt, ...prev.slice(0, 24)]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Ingest a brand-new live simulated incident
  const handleIngestLiveEvent = () => {
    const randomUsers = [
      { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      { name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer' },
      { name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations' }
    ];
    const user = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    const newId = `EVT-${Math.floor(8830 + Math.random() * 50)}`;

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
      }
    };

    setEvents((prev) => [newEvent, ...prev]);
    setActionNotice(`Live alert ${newId} ingested & autonomous containment executed!`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleRemediate = (eventId: string, userEmail: string) => {
    if (onRevokeSession) {
      onRevokeSession(userEmail);
    }
    setActionNotice(`Active session terminated for ${userEmail} (Incident ${eventId})`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const filteredEvents = events.filter((e) => {
    const matchesTier = filterTier === 'ALL' || e.evaluation.riskTier === filterTier;
    const matchesSearch =
      e.user.name.toLowerCase().includes(search.toLowerCase()) ||
      e.user.email.toLowerCase().includes(search.toLowerCase()) ||
      e.client.city.toLowerCase().includes(search.toLowerCase()) ||
      e.eventType.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 select-none animate-fadeIn text-slate-100 font-sans">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-3xl bg-[#131924]/80 border border-white/[0.06] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Incident Stream & Forensic Triage</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/15 text-sky-300">
              {filteredEvents.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time feed of authentication events, suspicious logins, and autonomous defense triggers.
          </p>
        </div>

        {/* Action Controls & Ingest Simulation */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Quick Filter Segmented Pills (Borderless) */}
          <div className="flex items-center p-1 rounded-2xl bg-white/[0.03]">
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

          <button
            onClick={handleIngestLiveEvent}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-900/30 transition-all active:scale-95"
            title="Inject a live real-time simulated attack incident"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Simulate Live Event</span>
          </button>

        </div>
      </div>

      {/* Confirmation feedback banner */}
      {actionNotice && (
        <div className="p-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.03] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
        />
      </div>

      {/* Incident Records Feed */}
      <div className="space-y-2.5">
        {filteredEvents.map((evt) => {
          const isSelected = selectedEventId === evt.id;
          const isCritical = evt.evaluation.riskTier === 'HIGH_DANGER';
          const isWarning = evt.evaluation.riskTier === 'WARNING';

          return (
            <div
              key={evt.id}
              className={`rounded-2xl transition-all duration-200 overflow-hidden ${
                isCritical
                  ? 'bg-rose-500/[0.08] hover:bg-rose-500/[0.12]'
                  : isWarning
                  ? 'bg-amber-500/[0.08] hover:bg-amber-500/[0.12]'
                  : 'bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              {/* Row Header */}
              <div 
                onClick={() => setSelectedEventId(isSelected ? null : evt.id)}
                className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    isCritical ? 'bg-rose-500/20 text-rose-400' : isWarning ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {isCritical ? <AlertTriangle className="w-4 h-4" /> : isWarning ? <Clock className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-300">{evt.id}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs font-bold text-white tracking-tight">{evt.eventType}</span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${
                        isCritical ? 'bg-rose-500/20 text-rose-300' : isWarning ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        RISK {evt.evaluation.riskScore}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <strong className="text-slate-200">{evt.user.name}</strong>
                      <span>({evt.user.email})</span>
                      <span>•</span>
                      <span>{evt.user.role}</span>
                    </div>
                  </div>
                </div>

                {/* Right Metadata */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right hidden sm:block">
                    <div className="text-slate-300 font-medium flex items-center gap-1 justify-end">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.client.city}, {evt.client.country}</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                      {evt.client.ip} ({evt.client.asn})
                    </div>
                  </div>

                  {isSelected ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Forensic Details Drawer */}
              {isSelected && (
                <div className="px-5 py-4 bg-[#0a0d14]/90 border-t border-[#1e2636] space-y-3.5 animate-fadeIn">
                  
                  {/* Forensic Reasoning Factors */}
                  <div>
                    <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Threat Analysis & Evidence
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {evt.evaluation.factors.map((factor, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-rose-400 mt-0.5">•</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Autonomous Action Badge */}
                  {evt.evaluation.autonomousActionTaken && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Autonomous Protection: {evt.evaluation.autonomousActionTaken}</span>
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400">Response &lt; 60ms</span>
                    </div>
                  )}

                  {/* Remediation & Audit Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div className="text-[11px] font-mono text-slate-500">
                      Logged: {new Date(evt.timestamp).toLocaleString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemediate(evt.id, evt.user.email)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all active:scale-95"
                      >
                        <Zap className="w-3 h-3" />
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
