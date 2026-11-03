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

      {/* Central Living Status Pill (Clean frameless luxury surface) */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#141b27]/80 backdrop-blur-xl">
        {/* Left Segmented Icon & Tag */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] text-[11px] font-semibold text-slate-300">
          <div className="flex gap-0.5">
            <span className="w-1 h-3 bg-sky-400 rounded-sm"></span>
            <span className="w-1 h-3 bg-sky-400 rounded-sm"></span>
            <span className="w-1 h-3 bg-sky-500 rounded-sm"></span>
          </div>
          <span>+{telemetry.attackVelocityRatio}x Higher</span>
        </div>

        {/* Metric Segment 1: Active Risk */}
        <div className="flex items-baseline gap-1 text-xs">
          <span className="text-slate-400">Current Danger:</span>
          <span className="text-sm font-bold text-rose-400 tracking-tight">{telemetry.riskPercentile}</span>
          <span className="text-[11px] text-slate-500">/ 100</span>
        </div>

        <span className="w-px h-3.5 bg-white/[0.08]"></span>

        {/* Metric Segment 2: Baseline */}
        <div className="flex items-baseline gap-1 text-xs">
          <span className="text-slate-400">Normal Safe Level:</span>
          <span className="text-sm font-semibold text-emerald-400">{(telemetry.baselineScore * 100).toFixed(0)}</span>
          <span className="text-[11px] text-slate-500">/ 100</span>
        </div>

        <span className="hidden lg:inline-block w-px h-3.5 bg-white/[0.08]"></span>

        {/* Metric Segment 3: Assessment Text in Simple Words */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 font-normal">
          <span>Suspicious login activity is</span>
          <span className="font-bold text-rose-400">{telemetry.attackVelocityRatio}x higher</span>
          <span>than normal safe days</span>
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
