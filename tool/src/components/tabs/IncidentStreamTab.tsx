import React, { useState } from 'react';
import { ShieldAlert, Search, Filter, Terminal, Lock, ChevronDown, ChevronRight, FileCode, Clock, Globe } from 'lucide-react';

interface EventRecord {
  id: string;
  timestamp: string;
  eventType: string;
  user: { name: string; email: string; role: string };
  client: { ip: string; city: string; country: string; asn: string; ipType: string };
  evaluation: { riskScore: number; riskTier: string; verdict: string; factors: string[]; autonomousActionTaken?: string };
}

interface IncidentStreamTabProps {
  onRevokeSession: (email: string) => void;
}

export const IncidentStreamTab: React.FC<IncidentStreamTabProps> = ({ onRevokeSession }) => {
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const events: EventRecord[] = [
    {
      id: 'EVT-8821',
      timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
      eventType: 'IMPOSSIBLE_TRAVEL',
      user: { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      client: { ip: '185.220.101.5', city: 'Frankfurt am Main', country: 'Germany', asn: 'AS24940 Hetzner Online', ipType: 'TOR_EXIT' },
      evaluation: { riskScore: 95, riskTier: 'CRITICAL', verdict: 'ATTACK_DETECTED', factors: ['Impossible physical travel (8,820 km/h)', 'Tor exit node routing', 'Datacenter ASN'], autonomousActionTaken: 'SESSION_REVOKED_BY_AUTHSENTRY' }
    },
    {
      id: 'EVT-8819',
      timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
      eventType: 'LOGIN_FAILED',
      user: { name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer' },
      client: { ip: '45.142.214.18', city: 'Saint Petersburg', country: 'Russia', asn: 'AS44050 Petersburg Internet', ipType: 'DATACENTER' },
      evaluation: { riskScore: 88, riskTier: 'CRITICAL', verdict: 'ATTACK_DETECTED', factors: ['Rapid credential stuffing (7 in 30s)', 'Headless automated client', 'Adversary country subnet'] }
    },
    {
      id: 'EVT-8814',
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      eventType: 'PASSWORD_RESET_REQUEST',
      user: { name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations' },
      client: { ip: '185.220.101.5', city: 'Frankfurt am Main', country: 'Germany', asn: 'AS208294 Tor Exit Network', ipType: 'TOR_EXIT' },
      evaluation: { riskScore: 92, riskTier: 'CRITICAL', verdict: 'ATTACK_DETECTED', factors: ['Password reset requested from Tor exit node', 'Rapid reset post-failure'] }
    },
    {
      id: 'EVT-8790',
      timestamp: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
      eventType: 'MFA_REQUEST',
      user: { name: 'Elena Rostova', email: 'elena.rostova@innovatech.io', role: 'Senior DevOps Engineer' },
      client: { ip: '104.244.42.1', city: 'Amsterdam', country: 'Netherlands', asn: 'AS397086 NordVPN', ipType: 'VPN_PROXY' },
      evaluation: { riskScore: 72, riskTier: 'HIGH', verdict: 'ATTACK_DETECTED', factors: ['MFA push fatigue bombing (4 requests/18s)', 'Commercial VPN masking true origin'] }
    },
    {
      id: 'EVT-8765',
      timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
      eventType: 'LOGIN_SUCCESS',
      user: { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      client: { ip: '198.51.100.44', city: 'San Francisco', country: 'United States', asn: 'AS7922 Comcast Cable', ipType: 'RESIDENTIAL' },
      evaluation: { riskScore: 12, riskTier: 'LOW', verdict: 'AUTHORIZED', factors: ['Enrolled corporate MacBook', 'Home residential broadband'] }
    }
  ];

  const filtered = events.filter(e => {
    if (filterTier !== 'ALL' && e.evaluation.riskTier !== filterTier) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.user.email.toLowerCase().includes(q) ||
        e.user.name.toLowerCase().includes(q) ||
        e.client.ip.includes(q) ||
        e.eventType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-5 select-none animate-fadeIn">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-dark-card/90 border border-dark-border">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#1e2536] border border-slate-700/80 text-sky-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Real-Time Incident Stream</h3>
            <p className="text-xs text-slate-400">Continuous telemetry feed of all normalized authentication & credential events.</p>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-inset border border-dark-border">
            {['ALL', 'CRITICAL', 'HIGH', 'LOW'].map((tier) => (
              <button
                key={tier}
                onClick={() => setFilterTier(tier)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterTier === tier
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, IP, or event..."
              className="bg-dark-inset border border-dark-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 w-48 sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-3">
        {filtered.map((evt) => {
          const isSelected = selectedEventId === evt.id;
          const isCritical = evt.evaluation.riskTier === 'CRITICAL';
          const isHigh = evt.evaluation.riskTier === 'HIGH';

          return (
            <div
              key={evt.id}
              className={`p-4 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-dark-card border-sky-400 shadow-lg'
                  : 'bg-dark-card/80 border-dark-border hover:border-slate-600'
              }`}
            >
              <div 
                onClick={() => setSelectedEventId(isSelected ? null : evt.id)}
                className="flex items-center justify-between gap-4 cursor-pointer"
              >
                {/* Event Type & Icon */}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${
                    isCritical 
                      ? 'bg-rose-950/80 border-rose-800 text-rose-400' 
                      : isHigh 
                      ? 'bg-amber-950/80 border-amber-800 text-amber-400' 
                      : 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
                  }`}>
                    <ShieldAlert className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-tight">{evt.eventType}</span>
                      <span className="text-[10px] text-slate-400 font-mono">[{evt.id}]</span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {evt.user.name} <span className="text-slate-500 font-normal">({evt.user.email})</span>
                    </div>
                  </div>
                </div>

                {/* Geo & Network Origin */}
                <div className="hidden md:flex flex-col text-right text-xs">
                  <div className="text-slate-200 font-medium flex items-center justify-end gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span>{evt.client.city}, {evt.client.country}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    IP: {evt.client.ip} • {evt.client.ipType}
                  </div>
                </div>

                {/* Risk Score Pill & Action */}
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-right">
                    <span className={`text-base font-bold font-sans ${
                      isCritical ? 'text-rose-400' : isHigh ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {evt.evaluation.riskScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {evt.evaluation.riskTier}
                    </span>
                  </div>

                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'rotate-180 text-sky-400' : ''}`} />
                </div>
              </div>

              {/* Expanded Forensic Drawer */}
              {isSelected && (
                <div className="mt-4 pt-4 border-t border-dark-border grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fadeIn">
                  <div>
                    <h4 className="font-bold text-slate-200 mb-2">Triggered Risk Factors</h4>
                    <ul className="space-y-1.5 text-slate-400">
                      {evt.evaluation.factors.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-rose-400 font-bold mt-0.5">▸</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Mitigation Trigger */}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRevokeSession(evt.user.email);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md transition-all"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Revoke Active Sessions</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-200">Raw OCSF JSON Event</span>
                      <FileCode className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <pre className="p-3 rounded-xl bg-dark-inset border border-dark-border text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-40">
                      {JSON.stringify(evt, null, 2)}
                    </pre>
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
