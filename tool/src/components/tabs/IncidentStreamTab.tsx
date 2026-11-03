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
  onRevokeSession?: (email: string) => void;
}

export const IncidentStreamTab: React.FC<IncidentStreamTabProps> = ({ onRevokeSession }) => {
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const events: EventRecord[] = [
    {
      id: 'EVT-8821',
      timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
      eventType: 'Impossible Fast Travel',
      user: { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      client: { ip: '185.220.101.5', city: 'Frankfurt', country: 'Germany', asn: 'Cloud Hosting Server', ipType: 'HIDDEN_NETWORK' },
      evaluation: { riskScore: 95, riskTier: 'HIGH_DANGER', verdict: 'SUSPICIOUS_LOGIN', factors: ['Logged in from Germany only 8 minutes after San Francisco', 'Connected through an anonymous hidden network', 'Used a foreign cloud server instead of normal home internet'], autonomousActionTaken: 'USER_AUTOMATICALLY_LOGGED_OUT' }
    },
    {
      id: 'EVT-8819',
      timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
      eventType: 'Password Guessing',
      user: { name: 'Marcus Vance', email: 'marcus.vance@innovatech.io', role: 'Chief Financial Officer' },
      client: { ip: '45.142.214.18', city: 'Saint Petersburg', country: 'Russia', asn: 'Foreign Hosting Network', ipType: 'FOREIGN_SERVER' },
      evaluation: { riskScore: 88, riskTier: 'HIGH_DANGER', verdict: 'SUSPICIOUS_LOGIN', factors: ['7 incorrect passwords entered in 30 seconds', 'Used an automated hacker script instead of a web browser', 'Came from an overseas internet address'] }
    },
    {
      id: 'EVT-8814',
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      eventType: 'Suspicious Password Reset',
      user: { name: 'David Kim', email: 'david.kim@innovatech.io', role: 'Product Operations' },
      client: { ip: '185.220.101.5', city: 'Frankfurt', country: 'Germany', asn: 'Tor Exit Network', ipType: 'HIDDEN_NETWORK' },
      evaluation: { riskScore: 92, riskTier: 'HIGH_DANGER', verdict: 'SUSPICIOUS_LOGIN', factors: ['Password reset requested from a hidden anonymous network', 'Reset attempted immediately after a wrong password'] }
    },
    {
      id: 'EVT-8790',
      timestamp: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
      eventType: 'Phone Approval Spam',
      user: { name: 'Elena Rostova', email: 'elena.rostova@innovatech.io', role: 'Senior DevOps Engineer' },
      client: { ip: '104.244.42.1', city: 'Amsterdam', country: 'Netherlands', asn: 'Commercial VPN Proxy', ipType: 'VPN_PROXY' },
      evaluation: { riskScore: 72, riskTier: 'WARNING', verdict: 'SUSPICIOUS_LOGIN', factors: ['4 phone confirmation requests sent in 18 seconds', 'Someone tried to overwhelm the user into tapping Accept'] }
    },
    {
      id: 'EVT-8765',
      timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
      eventType: 'Normal Safe Login',
      user: { name: 'Sarah Chen', email: 'sarah.chen@innovatech.io', role: 'Lead Cloud Architect' },
      client: { ip: '198.51.100.44', city: 'San Francisco', country: 'United States', asn: 'Comcast Home Internet', ipType: 'NORMAL' },
      evaluation: { riskScore: 12, riskTier: 'SAFE', verdict: 'NORMAL_USER', factors: ['Standard login from recognized company laptop', 'Normal daytime working hours', 'Home WiFi provider matches previous logins'] }
    }
  ];

  const filteredEvents = events.filter(e => {
    const matchesTier = filterTier === 'ALL' || e.evaluation.riskTier === filterTier;
    const matchesSearch = e.user.name.toLowerCase().includes(search.toLowerCase()) ||
                          e.user.email.toLowerCase().includes(search.toLowerCase()) ||
                          e.client.city.toLowerCase().includes(search.toLowerCase()) ||
                          e.eventType.toLowerCase().includes(search.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 select-none animate-fadeIn">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-3xl bg-dark-card/90 border border-dark-border">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Recent Suspicious Activity</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Live feed of logins, password resets, and suspicious attempts with plain English explanations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['ALL', 'HIGH_DANGER', 'WARNING', 'SAFE'].map(tier => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filterTier === tier
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-dark-inset text-slate-400 border border-dark-border hover:text-white'
              }`}
            >
              {tier === 'ALL' ? 'All Activity' : tier === 'HIGH_DANGER' ? 'High Danger' : tier === 'WARNING' ? 'Warnings' : 'Normal Logins'}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by person name, email, city, or login type..."
          className="w-full bg-dark-card/80 border border-dark-border rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
        />
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map(event => {
          const isSelected = selectedEventId === event.id;
          const isDanger = event.evaluation.riskTier === 'HIGH_DANGER';
          const isWarning = event.evaluation.riskTier === 'WARNING';

          return (
            <div
              key={event.id}
              className={`p-4 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-dark-card border-sky-500/80 shadow-lg ring-1 ring-sky-500/30'
                  : 'bg-dark-card/60 border-dark-border hover:border-slate-600'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                
                {/* Event Basic Info */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isDanger ? 'bg-rose-950/80 border border-rose-800 text-rose-300' :
                    isWarning ? 'bg-amber-950/80 border border-amber-800 text-amber-300' :
                    'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                  }`}>
                    {event.evaluation.riskScore}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{event.user.name}</span>
                      <span className="text-xs text-slate-400">({event.user.role})</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        isDanger ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                        isWarning ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {event.eventType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-sky-400" />
                        <span>{event.client.city}, {event.client.country}</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono text-[11px]">{event.client.ip}</span>
                      <span>•</span>
                      <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Button & Details Toggle */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  {event.evaluation.autonomousActionTaken && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300">
                      User Automatically Logged Out
                    </span>
                  )}

                  {isDanger && onRevokeSession && (
                    <button
                      onClick={() => onRevokeSession(event.user.email)}
                      className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all active:scale-95 shadow-sm"
                    >
                      Log Out User Now
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedEventId(isSelected ? null : event.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-dark-inset border border-dark-border text-xs text-slate-300 hover:text-white transition-all"
                  >
                    <span>{isSelected ? 'Hide Details' : 'View Reasons'}</span>
                    {isSelected ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </div>

              {/* Expanded Reasons Box */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 animate-fadeIn">
                  <div className="text-xs font-bold text-white mb-2">Why was this flagged?</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {event.evaluation.factors.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-xl bg-dark-inset/80 border border-dark-border">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 p-3 rounded-xl bg-[#090d15] border border-slate-800 text-[11px] font-mono text-slate-400 overflow-x-auto">
                    <span className="text-sky-400 font-bold block mb-1">Technical Record (JSON):</span>
                    {JSON.stringify(event, null, 2)}
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
