import React from 'react';
import { 
  Shield, Bell, Volume2, VolumeX, Globe, Sparkles, 
  FileText, RotateCw, Keyboard 
} from 'lucide-react';
import { TelemetryState } from '../types/dashboard';

interface HeaderBarProps {
  telemetry: TelemetryState;
  isLiveStream: boolean;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onToggleStream: () => void;
  onOpenReport: () => void;
  onOpenMap: () => void;
  onOpenCopilot: () => void;
  onOpenShortcuts: () => void;
  onReScan?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  telemetry,
  isLiveStream,
  isAudioMuted,
  onToggleAudio,
  onToggleStream,
  onOpenReport,
  onOpenMap,
  onOpenCopilot,
  onOpenShortcuts,
  onReScan
}) => {
  const isDanger = telemetry.riskPercentile > 25 || telemetry.attackVelocityRatio > 1.2;

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-3 py-2 px-1 mb-4">
      
      {/* Brand Logo with Iridescent Spiral Crest */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 via-purple-400 to-rose-400 p-[2px] shadow-sm">
            <div className="w-full h-full bg-[#0d121c] rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white font-sans">
              Auth<span className="font-semibold text-slate-300">Sentry</span>
            </h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400">
              ITDR v2.4
            </span>
          </div>
        </div>
      </div>

      {/* Central Living Status Pill (Compact HUD with Refined Breathing Glow) */}
      <div className="relative flex-shrink-0">
        <div
          className={`absolute inset-0 rounded-2xl blur-sm opacity-25 pointer-events-none transition-all duration-700 ${
            isDanger
              ? 'bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500'
          }`}
        />

        <div
          className={`relative flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-[#0e131d]/95 backdrop-blur-xl border transition-all duration-500 select-none ${
            isDanger ? 'animate-breathing-danger' : 'animate-breathing-safe'
          }`}
        >
          {/* Section 1: Live Equalizer & Velocity Chip */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-white/[0.05] border border-white/[0.06] shadow-sm flex-shrink-0">
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-1 bg-sky-400 rounded-full animate-eq-1"></span>
              <span className="w-1 bg-sky-400 rounded-full animate-eq-2"></span>
              <span className="w-1 bg-sky-300 rounded-full animate-eq-3"></span>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-mono text-[11px] font-bold text-sky-300 tracking-tight leading-none">
                +{telemetry.attackVelocityRatio}x
              </span>
              <span className="text-[7.5px] font-mono text-slate-400 uppercase font-semibold leading-none mt-0.5">
                Spike
              </span>
            </div>
          </div>

          {/* Section 2: Current Danger Score */}
          <div className="flex flex-col whitespace-nowrap">
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isDanger ? 'bg-rose-400 animate-ping' : 'bg-emerald-400'}`}></span>
              <span className="text-[8.5px] font-mono uppercase tracking-wider text-slate-400 font-semibold leading-none">
                Current Danger
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 leading-none">
              <div className="flex items-baseline">
                <span className={`text-sm font-extrabold font-mono tracking-tight ${
                  isDanger ? 'text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]' : 'text-emerald-400'
                }`}>
                  {telemetry.riskPercentile}
                </span>
                <span className="text-[9.5px] font-mono text-slate-500 ml-0.5">/ 100</span>
              </div>
              <span className={`text-[8.5px] font-mono px-1 py-0.2 rounded font-bold uppercase tracking-tight ${
                isDanger ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {isDanger ? 'Critical' : 'Safe'}
              </span>
            </div>
          </div>

          {/* Section 3: Safe Baseline Target */}
          <div className="hidden sm:flex flex-col whitespace-nowrap pl-2 border-l border-white/[0.08]">
            <span className="text-[8.5px] font-mono uppercase tracking-wider text-slate-400 font-semibold leading-none">
              Safe Baseline
            </span>
            <div className="flex items-center gap-1.5 mt-1 leading-none">
              <span className="text-xs font-mono font-bold text-slate-300">15</span>
              <span className="text-[8.5px] font-mono text-slate-500">/ 100</span>
              <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                Target
              </span>
            </div>
          </div>

          {/* Section 4: Live Human-Readable Verdict */}
          <div className="hidden md:flex items-center pl-2 border-l border-white/[0.08] text-[11px] font-sans">
            <span className="text-slate-300">
              Suspicious logins are{' '}
              <strong className={isDanger ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {telemetry.attackVelocityRatio}x higher
              </strong>{' '}
              than safe days
            </span>
          </div>
        </div>
      </div>

      {/* Right Tactical Action Controls (Map, AI Copilot, Audio, Report, Shortcuts) */}
      <div className="flex items-center gap-2 flex-wrap justify-end">
        
        {/* Global Attack Map Button */}
        <button
          onClick={onOpenMap}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-semibold transition-all shadow-sm"
          title="Open Global Attack & Velocity Map (Key: G)"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Threat Map</span>
        </button>

        {/* Sentry AI Copilot Button */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all shadow-sm group"
          title="Open SentryCopilot AI Assistant (Key: C)"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform animate-pulse" />
          <span>Sentry AI</span>
        </button>

        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={onToggleAudio}
          className={`p-2 rounded-xl border transition-all ${
            isAudioMuted
              ? 'bg-white/[0.03] border-white/[0.06] text-slate-500 hover:text-slate-300'
              : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 shadow-sm'
          }`}
          title={isAudioMuted ? 'Sound FX Muted' : 'Acoustic Sound FX Active'}
        >
          {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Re-Scan Simulator Pulse Button */}
        {onReScan && (
          <button
            onClick={onReScan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 text-xs font-medium transition-all"
            title="Re-scan and refresh telemetry"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Re-Scan</span>
          </button>
        )}

        {/* Forensic Report Modal Button */}
        <button
          onClick={onOpenReport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 text-xs font-medium transition-all"
          title="View Forensic Audit Report"
        >
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Report</span>
        </button>

        {/* Keyboard Shortcuts Trigger Button */}
        <button
          onClick={onOpenShortcuts}
          className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white transition-all hover:bg-white/[0.06]"
          title="Keyboard Shortcuts (Key: ?)"
        >
          <Keyboard className="w-3.5 h-3.5" />
        </button>

      </div>

    </header>
  );
};
