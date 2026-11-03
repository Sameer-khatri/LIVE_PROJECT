import React from 'react';
import { X, ShieldAlert, Download, Printer, CheckCircle2 } from 'lucide-react';
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
  if (!isOpen) return null;

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
          <div className="p-2 rounded-xl bg-rose-950 border border-rose-700 text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-sans">Security Incident Summary Report</h2>
            <p className="text-xs text-slate-400 font-sans">
              Generated at {new Date().toLocaleTimeString()} • High Threat Review
            </p>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div className="p-4 rounded-2xl bg-[#080d19] border border-slate-800 space-y-3 text-xs mb-4">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Target User Account:</span>
            <span className="text-white font-bold">Marcus Vance (Chief Financial Officer)</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Overall Threat Danger Score:</span>
            <span className="text-rose-400 font-bold">{telemetry.riskPercentile} / 100 (High Risk)</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Suspicious Login Frequency:</span>
            <span className="text-rose-400 font-bold">{telemetry.attackVelocityRatio}x higher than normal safe days</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Calculated Travel Speed:</span>
            <span className="text-amber-400 font-bold">{telemetry.travelVelocityKmH.toLocaleString()} km/h (Physically Impossible)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Automatic Action Taken:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Suspicious Login Session Terminated</span>
            </span>
          </div>
        </div>

        {/* Evidence Logs in Simple English */}
        <div className="space-y-2 mb-5">
          <h4 className="text-xs font-bold text-slate-300 uppercase">Timeline of What Happened</h4>
          <div className="p-3 rounded-xl bg-[#050811] border border-slate-800 text-[11px] text-slate-300 space-y-1.5 font-sans">
            <p><span className="text-slate-500 font-mono">[20:41]</span> <span className="text-emerald-400 font-semibold">Normal Login:</span> Legitimate login from San Francisco home office.</p>
            <p><span className="text-slate-500 font-mono">[20:49]</span> <span className="text-rose-400 font-semibold">Password Guessing:</span> 5 wrong passwords entered in 30 seconds from Russia.</p>
            <p><span className="text-slate-500 font-mono">[20:49]</span> <span className="text-rose-400 font-semibold">Suspicious Reset:</span> Password reset requested from a hidden anonymous network.</p>
            <p><span className="text-slate-500 font-mono">[20:49]</span> <span className="text-sky-400 font-semibold">Automatic Protection:</span> AuthSentry immediately signed out the account to protect data.</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs hover:text-white"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Summary</span>
          </button>
        </div>

      </div>
    </div>
  );
};
