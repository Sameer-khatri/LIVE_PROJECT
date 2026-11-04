import React from 'react';
import { Shield, Bell, Moon, Sun, User, FileText, RotateCw } from 'lucide-react';
import { TelemetryState } from '../types/dashboard';

interface HeaderBarProps {
  telemetry: TelemetryState;
  isLiveStream: boolean;
  onToggleStream: () => void;
  onOpenReport: () => void;
  onReScan?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  telemetry,
  isLiveStream,
  onToggleStream,
  onOpenReport,
  onReScan
}) => {
  const isDanger = telemetry.riskPercentile > 25 || telemetry.attackVelocityRatio > 1.2;

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2 px-1 mb-4">
      
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
              Account Protection
            </span>
          </div>
        </div>
      </div>

      {/* Central Living Status Pill (Adjusted, Compact & Structured with Refined Breathing Glow) */}
      <div className="relative flex-shrink-0">
        {/* Soft tight ambient breathing halo */}
        <div
          className={`absolute inset-0 rounded-2xl blur-sm opacity-25 pointer-events-none transition-all duration-700 ${
            isDanger
              ? 'bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500'
          }`}
        />

        {/* Central HUD Container */}
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
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase leading-none ${
                isDanger ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              }`}>
                {isDanger ? 'Critical' : 'Safe'}
              </span>
            </div>
          </div>

          {/* Vertical Separator */}
          <span className="w-px h-6 bg-gradient-to-b from-transparent via-white/15 to-transparent flex-shrink-0"></span>

          {/* Section 3: Safe Baseline Level */}
          <div className="flex flex-col whitespace-nowrap">
            <div className="text-[8.5px] font-mono uppercase tracking-wider text-slate-400 font-semibold leading-none">
              Safe Baseline
            </div>
            <div className="flex items-center gap-1.5 mt-1 leading-none">
              <div className="flex items-baseline">
                <span className="text-sm font-bold font-mono text-emerald-400 tracking-tight">
                  {(telemetry.baselineScore * 100).toFixed(0)}
                </span>
                <span className="text-[9.5px] font-mono text-slate-500 ml-0.5">/ 100</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase leading-none bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Target
              </span>
            </div>
          </div>

          {/* Vertical Separator */}
          <span className="hidden xl:inline-block w-px h-6 bg-gradient-to-b from-transparent via-white/15 to-transparent flex-shrink-0"></span>

          {/* Section 4: Live Verdict */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-300 whitespace-nowrap pl-0.5">
            <span className="text-slate-400 text-[11px]">Suspicious logins are</span>
            <span className={`px-1.5 py-0.5 rounded font-mono font-bold text-[11px] leading-tight ${
              isDanger ? 'text-rose-300 bg-rose-500/20 border border-rose-500/40' : 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40'
            }`}>
              {telemetry.attackVelocityRatio}x higher
            </span>
            <span className="text-slate-400 text-[11px]">than safe days</span>
          </div>

        </div>
      </div>

      {/* Right Controls (Borderless soft glass pills) */}
      <div className="flex items-center gap-2">
        
        {/* Re-Scan Button */}
        {onReScan && (
          <button
            onClick={onReScan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white transition-all group"
            title="Re-run security scan across all accounts"
          >
            <RotateCw className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
            <span>Re-Scan</span>
          </button>
        )}

        {/* Stream Toggle Switch */}
        <button
          onClick={onToggleStream}
          className={`flex items-center gap-2 w-13 h-7 p-1 rounded-full transition-all duration-300 ${
            isLiveStream ? 'bg-sky-500 justify-end' : 'bg-white/[0.08] justify-start'
          }`}
          title="Turn live monitoring on or off"
        >
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-sm">
            {isLiveStream ? <Moon className="w-3 h-3 text-sky-600" /> : <Sun className="w-3 h-3 text-slate-600" />}
          </div>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white transition-all"
            title="Active security alerts"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
            {telemetry.activeIncidentsCount}
          </span>
        </div>

        {/* Incident Summary Button */}
        <button
          onClick={onOpenReport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95"
          title="View and download printable security summary"
        >
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>Security Report</span>
        </button>

        {/* User Profile Avatar */}
        <div 
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px] cursor-pointer"
          title="Signed in as Security Admin"
        >
          <div className="w-full h-full bg-[#121722] rounded-full flex items-center justify-center text-white">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </header>
  );
};
