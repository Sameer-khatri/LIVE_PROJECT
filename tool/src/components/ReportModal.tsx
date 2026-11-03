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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
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
            <h2 className="text-lg font-bold text-white font-mono">AUTHSENTRY FORENSIC INCIDENT REPORT</h2>
            <p className="text-xs text-slate-400 font-mono">
              CONFIDENTIAL • GENERATED AT {new Date().toLocaleTimeString()} • DEFCON 1
            </p>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div className="p-4 rounded-2xl bg-[#080d19] border border-slate-800 space-y-3 text-xs font-mono mb-4">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Target Identity:</span>
            <span className="text-white font-bold">marcus.vance@innovatech.io (CFO)</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Composite Risk Score:</span>
            <span className="text-rose-400 font-bold">{telemetry.riskPercentile} / 100 (Critical)</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Attack Velocity:</span>
            <span className="text-rose-400 font-bold">{telemetry.attackVelocityRatio}x above corporate baseline</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Physical Travel Speed:</span>
            <span className="text-amber-400 font-bold">{telemetry.travelVelocityKmH.toLocaleString()} km/h (Violation)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Autonomous Mitigation Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACTIVE SESSION REVOKED</span>
            </span>
          </div>
        </div>

        {/* Evidence Logs */}
        <div className="space-y-2 mb-5">
          <h4 className="text-xs font-bold text-slate-300 font-mono uppercase">Forensic Evidence Trail</h4>
          <div className="p-3 rounded-xl bg-[#050811] border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
            <p><span className="text-slate-500">[20:41:12]</span> <span className="text-cyan-400">LOGIN_SUCCESS</span> from San Francisco (Comcast Residential)</p>
            <p><span className="text-slate-500">[20:49:05]</span> <span className="text-rose-400">LOGIN_FAILED</span> x 5 from St. Petersburg, Russia (AS44050)</p>
            <p><span className="text-slate-500">[20:49:33]</span> <span className="text-rose-400">PASSWORD_RESET_REQUEST</span> from Tor Exit Node (185.220.101.5)</p>
            <p><span className="text-slate-500">[20:49:34]</span> <span className="text-emerald-400">AUTONOMOUS_CONTAINMENT:</span> Invalidate OAuth refresh token</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono hover:text-white"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};

