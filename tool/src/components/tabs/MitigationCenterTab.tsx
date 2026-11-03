import React, { useState } from 'react';
import { ShieldCheck, Lock, Globe, Zap, CheckCircle2, AlertTriangle, RefreshCw, Send, Radio } from 'lucide-react';

interface MitigationCenterTabProps {
  onKillAllSessions: () => void;
}

export const MitigationCenterTab: React.FC<MitigationCenterTabProps> = ({ onKillAllSessions }) => {
  const [killAllNotice, setKillAllNotice] = useState(false);
  const [quarantinedIps, setQuarantinedIps] = useState([
    { ip: '185.220.101.5', asn: 'AS208294 Tor-Exit-Network', reason: 'Tor Exit Node Password Reset Spike', time: '8 mins ago' },
    { ip: '45.142.214.18', asn: 'AS44050 Petersburg Internet', reason: 'Credential Stuffing (7 fails/30s)', time: '14 mins ago' },
    { ip: '104.244.42.1', asn: 'AS397086 NordVPN Proxy', reason: 'MFA Push Fatigue Bombing', time: '48 mins ago' }
  ]);

  const handleKillAll = () => {
    setKillAllNotice(true);
    onKillAllSessions();
    setTimeout(() => setKillAllNotice(false), 4000);
  };

  const handleUnblock = (ipToRemove: string) => {
    setQuarantinedIps(prev => prev.filter(item => item.ip !== ipToRemove));
  };

  return (
    <div className="flex flex-col gap-5 select-none animate-fadeIn">
      
      {/* Top Header Card */}
      <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400">
              <Zap className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">Autonomous Mitigation & Response Center</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Manage automated session invalidations, perimeter IP quarantines, and real-time webhook incident dispatchers.
          </p>
        </div>

        {/* Global Kill Switch Button */}
        <button
          onClick={handleKillAll}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-glow-red hover:scale-105 transition-all flex-shrink-0"
        >
          <Lock className="w-4 h-4" />
          <span>EMERGENCY: REVOKE ALL SESSIONS</span>
        </button>
      </div>

      {/* Confirmation Banner */}
      {killAllNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-glow-green animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Emergency Kill-Switch Executed: All OAuth & JWT tokens across all identities invalidated in &lt; 120ms.</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-900 px-2 py-0.5 rounded">Enforced</span>
        </div>
      )}

      {/* Status KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-dark-inset border border-dark-border">
          <div className="text-xs text-slate-400 font-medium mb-1">Active Quarantined IPs</div>
          <div className="text-2xl font-bold text-white tracking-tight">{quarantinedIps.length} Subnets</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Zero false positives
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-dark-inset border border-dark-border">
          <div className="text-xs text-slate-400 font-medium mb-1">Terminated Sessions</div>
          <div className="text-2xl font-bold text-rose-400 tracking-tight">14 Active</div>
          <div className="text-[11px] text-slate-400 mt-1">Average revocation latency &lt; 150ms</div>
        </div>

        <div className="p-4 rounded-2xl bg-dark-inset border border-dark-border">
          <div className="text-xs text-slate-400 font-medium mb-1">Webhook Dispatchers</div>
          <div className="text-2xl font-bold text-sky-400 tracking-tight">3 Integrations</div>
          <div className="text-[11px] text-slate-400 mt-1">Slack, Teams, PagerDuty Active</div>
        </div>
      </div>

      {/* Quarantined IP Deny-List Table */}
      <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">Perimeter IP Quarantine Deny-List</h4>
            <p className="text-xs text-slate-400">Adversary IPs temporarily blocked from authenticating against corporate IdPs.</p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-dark-inset px-2.5 py-1 rounded-lg border border-dark-border">
            Cooldown Window: 30 Mins
          </span>
        </div>

        <div className="space-y-2">
          {quarantinedIps.map((item) => (
            <div
              key={item.ip}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-dark-inset border border-dark-border text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white font-mono flex items-center gap-2">
                    <span>{item.ip}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({item.asn})</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{item.reason}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-slate-500 text-[11px] font-mono">{item.time}</span>
                <button
                  onClick={() => handleUnblock(item.ip)}
                  className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  Unblock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

