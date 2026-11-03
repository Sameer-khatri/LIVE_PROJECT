import React, { useState } from 'react';
import { 
  X, User, ShieldAlert, Key, Globe, Laptop, Clock, 
  CheckCircle2, AlertTriangle, Zap, Download, RefreshCw, Lock, Smartphone
} from 'lucide-react';

export interface IdentityProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  riskScore: number;
  status: 'ACTIVE' | 'FLAGGED' | 'LOCKED' | 'NORMAL';
  activeDevicesCount: number;
  activeSessionsCount: number;
  lastLoginCity: string;
  lastLoginCountry: string;
  ipAddress: string;
  mfaMethod: string;
  recentIncidents: string[];
  anomaliesDetected: string[];
}

interface IdentityDossierModalProps {
  user: IdentityProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onRemediateAction?: (actionName: string, userEmail: string) => void;
}

export const IdentityDossierModal: React.FC<IdentityDossierModalProps> = ({
  user,
  isOpen,
  onClose,
  onRemediateAction
}) => {
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const triggerAction = (actionName: string) => {
    setActionNotice(`Action executed: ${actionName} applied to ${user.email}`);
    if (onRemediateAction) {
      onRemediateAction(actionName, user.email);
    }
    setTimeout(() => setActionNotice(null), 3000);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      
      {/* Dossier Card Container */}
      <div className="relative w-full max-w-2xl bg-[#121722] border border-[#273244] rounded-3xl p-6 shadow-2xl flex flex-col gap-5 text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header Strip */}
        <div className="flex items-start justify-between pb-4 border-b border-[#212a3a]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-[2px]">
              <div className="w-full h-full bg-[#121722] rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">{user.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getRiskColor(user.riskScore)}`}>
                  RISK: {user.riskScore} / 100
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{user.email}</span>
                <span>•</span>
                <span className="text-sky-400">{user.role}</span>
                <span>•</span>
                <span>{user.department}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1b2230] hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action feedback toast */}
        {actionNotice && (
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Metric Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-[#0e131d] border border-[#1f2838]">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Active Sessions</div>
            <div className="text-lg font-extrabold text-white mt-0.5">{user.activeSessionsCount}</div>
            <div className="text-[10px] text-sky-400">OAuth 2.0 Tokens</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#0e131d] border border-[#1f2838]">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Known Devices</div>
            <div className="text-lg font-extrabold text-white mt-0.5">{user.activeDevicesCount}</div>
            <div className="text-[10px] text-emerald-400">Enrolled Fleet</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#0e131d] border border-[#1f2838]">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Last Location</div>
            <div className="text-sm font-bold text-white mt-0.5 truncate">{user.lastLoginCity}</div>
            <div className="text-[10px] text-slate-400">{user.lastLoginCountry}</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#0e131d] border border-[#1f2838]">
            <div className="text-[10px] text-slate-400 uppercase font-mono">MFA Method</div>
            <div className="text-xs font-bold text-purple-300 mt-1 truncate">{user.mfaMethod}</div>
            <div className="text-[10px] text-emerald-400">Hardware Bound</div>
          </div>
        </div>

        {/* Behavioral Anomaly Findings */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Detected Behavioral Anomalies</span>
          </div>
          <div className="space-y-1.5">
            {user.anomaliesDetected.map((anom, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#0e131d] border border-[#1f2838] flex items-center justify-between text-xs">
                <span className="text-slate-300">{anom}</span>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  FLAGGED
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Remediations Control Center */}
        <div className="p-4 rounded-2xl bg-[#0f1420] border border-[#212b3c] space-y-3">
          <div className="text-xs font-bold text-white">One-Click Remediation Actions</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => triggerAction('REVOKE_ALL_SESSIONS')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Revoke Sessions</span>
            </button>

            <button
              onClick={() => triggerAction('FORCE_PASSWORD_RESET')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all active:scale-95"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Force Reset</span>
            </button>

            <button
              onClick={() => triggerAction('REQUIRE_HARDWARE_KEY')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-semibold transition-all active:scale-95"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Enforce YubiKey</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#212a3a] text-xs text-slate-400">
          <span className="font-mono text-[11px]">Audit ID: SEC-DOSSIER-{user.id.toUpperCase()}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all text-xs"
          >
            Close Dossier
          </button>
        </div>

      </div>

    </div>
  );
};

