import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Globe, Zap, CheckCircle2, AlertTriangle, 
  RefreshCw, Radio, ShieldAlert, UserX, Ban, History, 
  KeyRound, Smartphone, Laptop, Trash2, Plus, Clock, Terminal
} from 'lucide-react';
import { 
  fetchSessionsApi, 
  revokeSessionApi, 
  killAllSessionsApi, 
  fetchFirewallApi, 
  banIpApi, 
  unbanIpApi, 
  fetchAuditLogsApi 
} from '../../services/api';

interface MitigationCenterTabProps {
  onKillAllSessions?: () => void;
}

interface ActiveThreatSession {
  id: string;
  user: { name: string; email: string; role: string; avatar: string };
  ip: string;
  location: string;
  device: string;
  anomalyReason: string;
  riskScore: number;
  isTerminated: boolean;
  tokenExpiresIn: string;
}

export const MitigationCenterTab: React.FC<MitigationCenterTabProps> = ({ onKillAllSessions }) => {
  const [killAllNotice, setKillAllNotice] = useState<string | null>(null);
  const [manualIpInput, setManualIpInput] = useState<string>('');
  const [manualReasonInput, setManualReasonInput] = useState<string>('');

  // Active targeted high-risk sessions
  const [threatSessions, setThreatSessions] = useState<ActiveThreatSession[]>([
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
  ]);

  // Quarantined IP & Subnet Firewall Ban List
  const [quarantinedIps, setQuarantinedIps] = useState([
    { id: '1', ip: '185.220.101.5/32', asn: 'Anonymous Tor Exit Relay', reason: 'Tor Password Reset Hijack Attempt', time: '8 mins ago', duration: 'Permanent Ban' },
    { id: '2', ip: '45.142.214.0/24', asn: 'Overseas Cloud Botnet', reason: 'Distributed Password Spraying (7 att/30s)', time: '14 mins ago', duration: 'Auto-unban in 46m' },
    { id: '3', ip: '104.244.42.1/32', asn: 'Commercial VPN Relay Server', reason: 'Spammed phone approval notifications', time: '48 mins ago', duration: 'Auto-unban in 18m' }
  ]);

  // Autonomous Defense Intervention Ledger
  const [auditLogs, setAuditLogs] = useState([
    { id: 'log-1', time: '05:14:12 UTC', identity: 'sarah.chen@innovatech.io', action: 'OAuth Token Revoked', trigger: 'Mach 7.1 Velocity Violation', speed: '32ms' },
    { id: 'log-2', time: '05:08:44 UTC', identity: 'marcus.vance@innovatech.io', action: 'IP 45.142.214.0/24 Blacklisted', trigger: 'Credential Stuffing Bot', speed: '41ms' },
    { id: 'log-3', time: '04:54:19 UTC', identity: 'elena.rostova@innovatech.io', action: 'Push MFA Throttled', trigger: 'Phone Approval Spam Flood', speed: '19ms' },
    { id: 'log-4', time: '04:32:01 UTC', identity: 'alex.mercer@innovatech.io', action: 'Bearer Token Invalidated', trigger: 'API Token Exfiltration Replay', speed: '24ms' },
  ]);

  // Audio helper
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // Audio fallback
    }
  };

  // Initial fetch from real backend
  useEffect(() => {
    fetchSessionsApi().then((data) => {
      if (data && data.sessions) setThreatSessions(data.sessions);
    });

    fetchFirewallApi().then((data) => {
      if (data && data.bannedIps) setQuarantinedIps(data.bannedIps);
    });

    fetchAuditLogsApi().then((data) => {
      if (data && data.logs) setAuditLogs(data.logs);
    });
  }, []);

  // Revoke an individual user session
  const handleTerminateSession = (sessionId: string, userName: string, userEmail: string) => {
    playChime();
    setThreatSessions(prev => prev.map(s => s.id === sessionId ? { ...s, isTerminated: true } : s));
    
    // Call backend API
    revokeSessionApi(sessionId, 'SecOps Instant Killswitch');

    // Append to audit ledger
    const now = new Date().toISOString().substring(11, 19) + ' UTC';
    setAuditLogs(prev => [
      { id: `log-${Date.now()}`, time: now, identity: userEmail, action: 'Manual Token Revocation', trigger: 'SecOps Instant Killswitch', speed: '18ms' },
      ...prev
    ]);

    setKillAllNotice(`Active session for ${userName} (${userEmail}) terminated immediately! Refresh token invalidated.`);
    setTimeout(() => setKillAllNotice(null), 3500);
  };

  // Terminate only compromised high-risk sessions
  const handleKillTargetedThreats = () => {
    playChime();
    setThreatSessions(prev => prev.map(s => ({ ...s, isTerminated: true })));
    threatSessions.forEach(s => revokeSessionApi(s.id, 'Targeted Threats Revocation'));
    setKillAllNotice('Targeted Containment Complete: All flagged attacker sessions revoked. Legitimate enterprise workforce undisturbed.');
    setTimeout(() => setKillAllNotice(null), 4000);
  };

  // Global nuclear kill switch
  const handleKillAll = () => {
    playChime();
    killAllSessionsApi();
    setKillAllNotice('EMERGENCY ENFORCED: All 1,428 team sessions logged out. OAuth keys rotated across all regional hubs.');
    setThreatSessions(prev => prev.map(s => ({ ...s, isTerminated: true })));
    if (onKillAllSessions) onKillAllSessions();
    setTimeout(() => setKillAllNotice(null), 4500);
  };

  // Unblock IP
  const handleUnblock = (idToRemove: string) => {
    setQuarantinedIps(prev => prev.filter(item => item.id !== idToRemove));
    unbanIpApi(idToRemove);
    playChime();
  };

  // Add manual IP ban
  const handleAddManualBan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualIpInput.trim()) return;

    const ip = manualIpInput.trim();
    const reason = manualReasonInput.trim() || 'Operator Security Override';

    const newBan = {
      id: String(Date.now()),
      ip,
      asn: 'Manual Operator Ban',
      reason,
      time: 'Just now',
      duration: 'Permanent Ban'
    };

    setQuarantinedIps(prev => [newBan, ...prev]);
    banIpApi(ip, reason);
    setManualIpInput('');
    setManualReasonInput('');
    playChime();
    setKillAllNotice(`IP subnet ${newBan.ip} successfully committed to edge firewall ban table.`);
    setTimeout(() => setKillAllNotice(null), 3000);
  };

  const activeThreatsCount = threatSessions.filter(s => !s.isTerminated).length;

  return (
    <div className="flex flex-col gap-4 select-none animate-fadeIn text-slate-100 font-sans">
      
      {/* ============================================================== */}
      {/* 1. TOP MITIGATION INTELLIGENCE HUD CARDS                      */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#131924]/85 border border-white/[0.06] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Active Quarantines</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xl font-bold font-mono ${activeThreatsCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {activeThreatsCount}
              </span>
              <span className="text-[10px] text-slate-400">Threat Sessions</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400">
            <UserX className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#131924]/85 border border-white/[0.06] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Firewall Blacklist</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-bold font-mono text-amber-400">
                {quarantinedIps.length}
              </span>
              <span className="text-[10px] text-slate-400">Banned Subnets</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
            <Ban className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#131924]/85 border border-white/[0.06] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Revocation Velocity</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-bold font-mono text-sky-400">&lt; 38ms</span>
              <span className="text-[10px] text-slate-400">Zero-Delay Edge</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#131924]/85 border border-white/[0.06] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Fleet Status</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-bold font-mono text-emerald-400">1,428</span>
              <span className="text-[10px] text-slate-400">Identities Secure</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Confirmation feedback banner */}
      {killAllNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-xl animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{killAllNotice}</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-emerald-900 px-2 py-0.5 rounded text-emerald-300">Enforced</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. EMERGENCY KILL SWITCH CONTROL BAR                          */}
      {/* ============================================================== */}
      <div className="p-4 rounded-3xl bg-[#131924]/85 border border-white/[0.06] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400">
              <Lock className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white tracking-tight uppercase font-mono">
              Emergency Containment Controls
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Execute immediate defensive actions: Target compromised sessions or initiate corporate-wide credential re-authentication.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Targeted Action */}
          <button
            onClick={handleKillTargetedThreats}
            disabled={activeThreatsCount === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeThreatsCount > 0
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40 shadow-sm cursor-pointer active:scale-95'
                : 'bg-white/[0.03] text-slate-500 border-white/[0.05] cursor-not-allowed'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Revoke Flagged Threats ({activeThreatsCount})</span>
          </button>

          {/* Global Nuclear Action */}
          <button
            onClick={handleKillAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-900/40 transition-all active:scale-95 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>GLOBAL KILL: LOG OUT ALL 1,428 SESSIONS</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TARGETED ACTIVE SESSION REVOCATION MATRIX (KILLSWITCH)     */}
      {/* ============================================================== */}
      <div className="p-4 rounded-3xl bg-[#131924]/85 border border-white/[0.06] shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-bold text-white tracking-tight uppercase font-mono flex items-center gap-2">
              <UserX className="w-4 h-4 text-rose-400" />
              <span>Targeted Active High-Risk Sessions</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Active identity tokens flagged by autonomous anomaly sensors. Terminate session without logging out trusted coworkers.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
            {activeThreatsCount} Pending Containment
          </span>
        </div>

        <div className="space-y-2.5">
          {threatSessions.map((s) => (
            <div
              key={s.id}
              className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
                s.isTerminated
                  ? 'bg-white/[0.02] border-white/[0.04] opacity-50'
                  : 'bg-white/[0.03] hover:bg-white/[0.05] border-white/[0.06]'
              }`}
            >
              {/* Left Identity & Threat Trigger */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${
                  s.isTerminated
                    ? 'bg-slate-800 text-slate-500'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {s.user.avatar}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-bold ${s.isTerminated ? 'line-through text-slate-500' : 'text-white'}`}>
                      {s.user.name}
                    </span>
                    <span className="text-[11px] text-slate-400">({s.user.email})</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.05] text-slate-300">
                      {s.user.role}
                    </span>

                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                      s.isTerminated
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {s.isTerminated ? 'SESSION TERMINATED' : `RISK ${s.riskScore}`}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-rose-300 font-medium">{s.anomalyReason}</span>
                    <span className="text-slate-600">•</span>
                    <span>{s.location} ({s.ip})</span>
                    <span className="text-slate-600">•</span>
                    <span className="font-mono text-slate-500">{s.device}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                {s.isTerminated ? (
                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Revoked & Logged Out</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleTerminateSession(s.id, s.user.name, s.user.email)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 text-rose-400" />
                    <span>Kill Session Now</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. FIREWALL & SUBNET BLACKLIST MANAGER                         */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left 2 Cols: Blocked Hacker IP Addresses */}
        <div className="lg:col-span-2 p-4 rounded-3xl bg-[#131924]/85 border border-white/[0.06] shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-xs font-bold text-white tracking-tight uppercase font-mono flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Edge Firewall Blacklisted Subnets</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Internet addresses automatically quarantined after repeated attack bursts against corporate accounts.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {quarantinedIps.length} Subnets Quarantined
            </span>
          </div>

          <div className="space-y-2">
            {quarantinedIps.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] transition-all text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono font-bold text-white">
                    <span>{item.ip}</span>
                    <span className="text-[10px] font-sans font-normal px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300">
                      {item.asn}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.2 rounded">
                      {item.duration}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Reason: <span className="text-rose-300">{item.reason}</span> • Blocked {item.time}
                  </div>
                </div>

                <button
                  onClick={() => handleUnblock(item.id)}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-200 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                >
                  Unblock
                </button>
              </div>
            ))}

            {quarantinedIps.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-xs font-mono">
                No active IP quarantines. All edge firewall rules nominal.
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Quick Add Manual IP Ban Form */}
        <div className="p-4 rounded-3xl bg-[#131924]/85 border border-white/[0.06] shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-white tracking-tight uppercase font-mono flex items-center gap-2 mb-1">
              <Ban className="w-4 h-4 text-sky-400" />
              <span>Manual Edge Subnet Ban</span>
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Directly inject a suspicious IP or CIDR block into the edge firewall rule table.
            </p>

            <form onSubmit={handleAddManualBan} className="space-y-2.5">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Target IP / CIDR Subnet</label>
                <input
                  type="text"
                  placeholder="e.g. 194.26.29.0/24"
                  value={manualIpInput}
                  onChange={(e) => setManualIpInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Security Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Botnet Spray Attack"
                  value={manualReasonInput}
                  onChange={(e) => setManualReasonInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                disabled={!manualIpInput.trim()}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  manualIpInput.trim()
                    ? 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer shadow-md'
                    : 'bg-white/[0.03] text-slate-500 cursor-not-allowed'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Firewall Ban</span>
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05] text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Rules propagate to 14 Edge Gateways in &lt; 200ms</span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 5. AUTONOMOUS MITIGATION AUDIT LEDGER                          */}
      {/* ============================================================== */}
      <div className="p-4 rounded-3xl bg-[#131924]/85 border border-white/[0.06] shadow-xl">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-xs font-bold text-white tracking-tight uppercase font-mono flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            <span>Autonomous Mitigation Execution Ledger</span>
          </h4>
          <span className="text-[10px] font-mono text-slate-500">
            Real-Time Audit Trail
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 p-2 rounded-xl bg-black/25 border border-white/[0.03] text-slate-300"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-500">{log.time}</span>
                <span className="text-slate-600">•</span>
                <span className="text-sky-300 font-semibold">{log.identity}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400">{log.action}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Trigger: {log.trigger}</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Latency: {log.speed}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
