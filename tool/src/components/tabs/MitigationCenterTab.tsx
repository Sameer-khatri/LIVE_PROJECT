import React, { useState } from 'react';
import { ShieldCheck, Lock, Globe, Zap, CheckCircle2, AlertTriangle, RefreshCw, Send, Radio } from 'lucide-react';

interface MitigationCenterTabProps {
  onKillAllSessions?: () => void;
}

export const MitigationCenterTab: React.FC<MitigationCenterTabProps> = ({ onKillAllSessions }) => {
  const [killAllNotice, setKillAllNotice] = useState(false);
  const [quarantinedIps, setQuarantinedIps] = useState([
    { ip: '185.220.101.5', asn: 'Anonymous Tor Network', reason: 'Attempted password reset from hidden network', time: '8 mins ago' },
    { ip: '45.142.214.18', asn: 'Overseas Cloud Host', reason: '7 wrong passwords guessed in 30 seconds', time: '14 mins ago' },
    { ip: '104.244.42.1', asn: 'VPN Relay Server', reason: 'Spammed phone approval notifications', time: '48 mins ago' }
  ]);

  const handleKillAll = () => {
    setKillAllNotice(true);
    if (onKillAllSessions) onKillAllSessions();
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
            <h3 className="text-base font-bold text-white tracking-tight">One-Click Security Actions</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instantly log out suspicious users or unblock trusted team members with a single click.
          </p>
        </div>

        {/* Global Kill Switch Button */}
        <button
          onClick={handleKillAll}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-glow-red hover:scale-105 transition-all flex-shrink-0"
        >
          <Lock className="w-4 h-4" />
          <span>EMERGENCY: LOG OUT ALL SESSIONS</span>
        </button>
      </div>

      {/* Confirmation Banner */}
      {killAllNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-glow-green animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Emergency Action Complete: All team sessions have been logged out. Hackers with stolen cookies are locked out.</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-900 px-2 py-0.5 rounded">Enforced</span>
        </div>
      )}

      {/* Quarantined IP List */}
      <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Currently Blocked Hacker IP Addresses</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              These internet addresses were automatically blocked after repeatedly attacking team accounts.
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800">
            {quarantinedIps.length} Blocked
          </span>
        </div>

        <div className="space-y-2">
          {quarantinedIps.map(item => (
            <div
              key={item.ip}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-inset/80 border border-dark-border hover:border-slate-600 transition-all text-xs"
            >
              <div>
                <div className="flex items-center gap-2 font-mono font-bold text-white">
                  <span>{item.ip}</span>
                  <span className="text-[10px] font-sans font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {item.asn}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Reason: <span className="text-rose-300">{item.reason}</span> • Blocked {item.time}
                </div>
              </div>

              <button
                onClick={() => handleUnblock(item.ip)}
                className="px-3 py-1.5 rounded-full bg-dark-card hover:bg-slate-700 border border-dark-border text-slate-200 text-xs font-semibold transition-all active:scale-95"
              >
                Unblock
              </button>
            </div>
          ))}

          {quarantinedIps.length === 0 && (
            <div className="text-center py-6 text-slate-500 text-xs">
              No blocked IP addresses currently. All networks are clear.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
