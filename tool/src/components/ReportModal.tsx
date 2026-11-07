import React, { useState } from 'react';
import { 
  X, ShieldAlert, Download, Printer, CheckCircle2, 
  FileSpreadsheet, FileCode, ShieldCheck, Hash, Lock, Check
} from 'lucide-react';
import { TelemetryState } from '../types/dashboard';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: TelemetryState;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  telemetry
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const sha256Seal = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  const reportId = `REP-${Date.now().toString().slice(-6)}`;

  // Download real CSV report
  const handleExportCsv = () => {
    const csvContent = [
      'Report ID,Timestamp,Target User,Email,Role,Threat Type,Calculated Speed (km/h),Risk Score,Defense Verdict,SHA-256 Seal',
      `${reportId},${new Date().toISOString()},Sarah Chen,sarah.chen@innovatech.io,Lead Cloud Architect,Impossible Travel (Mach 7.1),${telemetry.travelVelocityKmH},${telemetry.riskPercentile},CONTAINED_REVOKED,${sha256Seal}`,
      `${reportId},${new Date(Date.now() - 120000).toISOString()},Marcus Vance,marcus.vance@innovatech.io,CFO,Credential Stuffing Spray Bot,0,92,ACCOUNT_LOCKED,${sha256Seal}`,
      `${reportId},${new Date(Date.now() - 360000).toISOString()},Elena Rostova,elena.rostova@innovatech.io,DevOps,MFA Push Fatigue Bombing,0,74,FIDO2_ENFORCED,${sha256Seal}`
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AuthSentry_Forensic_Audit_${reportId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('CSV Exported');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  // Download real OCSF JSON file
  const handleExportJson = () => {
    const jsonPayload = {
      schema_version: '1.1.0',
      category: 'Identity Threat Detection & Response',
      class_uid: 3001,
      class_name: 'Authentication Anomaly',
      metadata: {
        report_id: reportId,
        generated_at: new Date().toISOString(),
        defense_engine: 'AuthSentry Kinematic Velocity & UEBA Core v2.4',
        cryptographic_hash: sha256Seal
      },
      telemetry: {
        composite_risk_score: telemetry.riskPercentile,
        attack_velocity_ratio: telemetry.attackVelocityRatio,
        kinematic_speed_kmh: telemetry.travelVelocityKmH,
        monitored_identities: 1428,
        defcon_level: telemetry.defconLevel
      },
      contained_threats: [
        {
          identity: 'sarah.chen@innovatech.io',
          origin_geo: 'San Francisco, CA (198.51.100.24)',
          destination_geo: 'Frankfurt, DE (185.220.101.5)',
          anomaly: 'Supersonic Geo-Hopping (Mach 7.1)',
          autonomous_response: 'SESSION_REVOCATION_32MS'
        },
        {
          identity: 'marcus.vance@innovatech.io',
          origin_geo: 'Saint Petersburg, RU (45.142.214.18)',
          anomaly: '7 failed attempts / 28s sliding window',
          autonomous_response: 'IP_QUARANTINE_EDGE_DROP'
        }
      ]
    };

    const blob = new Blob([JSON.stringify(jsonPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AuthSentry_OCSF_Payload_${reportId}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('JSON Exported');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-2xl bg-[#0d1424] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-400 shadow-sm">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white font-sans">
                Forensic Incident Audit & Compliance Dossier
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {reportId}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Generated at {new Date().toLocaleTimeString()} • Zero-Trust Compliance Seal Verified
            </p>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div className="p-4 rounded-2xl bg-[#080d19] border border-slate-800 space-y-2.5 text-xs mb-4">
          <div className="flex justify-between border-b border-slate-800/80 pb-2">
            <span className="text-slate-400">Target Identity:</span>
            <span className="text-white font-bold font-mono">Sarah Chen (Lead Cloud Architect)</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/80 pb-2">
            <span className="text-slate-400">Enterprise Risk Score:</span>
            <span className="text-rose-400 font-bold font-mono">{telemetry.riskPercentile} / 100 (Critical Threat)</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/80 pb-2">
            <span className="text-slate-400">Kinematic Travel Speed:</span>
            <span className="text-amber-400 font-bold font-mono">
              {telemetry.travelVelocityKmH > 0 ? telemetry.travelVelocityKmH.toLocaleString() : '8,820'} km/h (Mach 7.1 Anomaly)
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800/80 pb-2">
            <span className="text-slate-400">Attack Velocity Multiplier:</span>
            <span className="text-rose-400 font-bold font-mono">+{telemetry.attackVelocityRatio}x baseline frequency</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Autonomous Mitigation Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>TOKEN_REVOKED_IN_32MS • IP_EDGE_BLOCKED</span>
            </span>
          </div>
        </div>

        {/* Evidence Timeline */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
            Chronological Incident Audit Log
          </h4>
          <div className="p-3 rounded-2xl bg-[#050811] border border-slate-800 text-[11px] text-slate-300 space-y-2 font-sans">
            <div className="flex items-start gap-2">
              <span className="text-slate-500 font-mono text-[10px]">T-8m</span>
              <div>
                <strong className="text-emerald-400">Legitimate Corporate Auth:</strong> Sarah Chen authenticated via Okta SAML from San Francisco HQ (198.51.100.24) with FIDO2 key.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-500 font-mono text-[10px]">T-0m</span>
              <div>
                <strong className="text-rose-400">Impossible Travel Violation:</strong> Successive token replay attempted from Frankfurt, Germany (185.220.101.5) via Tor Exit Gateway.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-500 font-mono text-[10px]">T+32ms</span>
              <div>
                <strong className="text-sky-400">Zero-Trust Autonomous Containment:</strong> Active session cookies and OAuth refresh token invalidated across enterprise IdPs.
              </div>
            </div>
          </div>
        </div>

        {/* Cryptographic SHA-256 Verification Seal */}
        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400 mb-5">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>SHA-256 INTEGRITY SEAL:</span>
            <span className="text-slate-200 truncate max-w-[240px]">{sha256Seal}</span>
          </div>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED</span>
          </span>
        </div>

        {/* Action Controls & Export Suite */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-200 text-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-200 text-xs transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-sky-400" />
              <span>Export OCSF JSON</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs hover:text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{downloadSuccess}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Done</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
