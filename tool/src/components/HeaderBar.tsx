import React from 'react';
import { Shield, Bell, Moon, Sun, ShoppingBag, User, Activity, FileText } from 'lucide-react';
import { TelemetryState } from '../types/dashboard';

interface HeaderBarProps {
  telemetry: TelemetryState;
  isLiveStream: boolean;
  onToggleStream: () => void;
  onOpenReport: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  telemetry,
  isLiveStream,
  onToggleStream,
  onOpenReport
}) => {
  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2 px-1 border-b border-dark-borderSubtle mb-5">
      
      {/* Brand Logo with Iridescent Spiral Crest (Reference style) */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          {/* Iridescent spiral gradient icon */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 via-purple-400 to-rose-400 p-[2px] shadow-sm">
            <div className="w-full h-full bg-[#121722] rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white font-sans">
              Auth<span className="font-semibold text-slate-200">Sentry</span>
            </h1>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-dark-inset text-slate-300 border border-dark-border">
              ITDR
            </span>
          </div>
        </div>
      </div>

      {/* Central Living Status Pill (Exact match to reference style) */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-dark-inset/90 border border-dark-border shadow-sm backdrop-blur-xl">
        {/* Left Segmented Icon & Tag */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#18202d] border border-dark-border text-[11px] font-semibold text-slate-300">
          <div className="flex gap-0.5">
            <span className="w-1 h-3 bg-sky-400 rounded-sm"></span>
            <span className="w-1 h-3 bg-sky-400 rounded-sm"></span>
            <span className="w-1 h-3 bg-sky-500 rounded-sm"></span>
          </div>
          <span>+{telemetry.attackVelocityRatio}x</span>
        </div>

        {/* Metric Segment 1: Active Risk */}
        <div className="flex items-baseline gap-1 text-xs">
          <span className="text-slate-400">Risk score</span>
          <span className="text-sm font-bold text-white tracking-tight">{telemetry.riskPercentile}</span>
          <span className="text-[11px] text-slate-400">pts</span>
        </div>

        <span className="w-px h-3.5 bg-dark-border"></span>

        {/* Metric Segment 2: Baseline */}
        <div className="flex items-baseline gap-1 text-xs">
          <span className="text-slate-400">Baseline</span>
          <span className="text-sm font-semibold text-slate-200">{(telemetry.baselineScore * 100).toFixed(0)}</span>
          <span className="text-[11px] text-slate-400">pts</span>
        </div>

        <span className="hidden lg:inline-block w-px h-3.5 bg-dark-border"></span>

        {/* Metric Segment 3: Assessment Text */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 font-normal">
          <span>Identity attack velocity is</span>
          <span className="font-bold text-rose-400">{telemetry.attackVelocityRatio}x faster</span>
          <span>than corporate baseline</span>
        </div>
      </div>

      {/* Right Controls (Reference style: electric blue toggle, notification bell, audit cart, avatar) */}
      <div className="flex items-center gap-2.5">
        
        {/* Electric Blue Toggle Switch (Exact match to reference) */}
        <button
          onClick={onToggleStream}
          className={`flex items-center gap-2 w-14 h-7 p-1 rounded-full transition-all duration-300 ${
            isLiveStream ? 'bg-blue-600 justify-end' : 'bg-[#1b2230] justify-start'
          }`}
          title="Toggle live telemetry streaming"
        >
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-sm">
            {isLiveStream ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-slate-600" />}
          </div>
        </button>

        {/* Notification Bell with Badge */}
        <div 
          onClick={onOpenReport}
          className="relative p-2 rounded-xl bg-dark-card border border-dark-border text-slate-300 hover:text-white cursor-pointer transition-colors"
          title="5 Active Incidents"
        >
          <Bell className="w-4 h-4" />
          {telemetry.activeIncidentsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {telemetry.activeIncidentsCount}
            </span>
          )}
        </div>

        {/* Incidents / Report Icon (Shopping bag / briefcase in reference) */}
        <button
          onClick={onOpenReport}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-dark-card border border-dark-border text-slate-300 hover:text-white text-xs font-medium transition-all"
          title="Incident Audit Logs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">5</span>
        </button>

        {/* Blue Profile Avatar (Exact match to reference blue circle button) */}
        <div 
          className="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center text-slate-950 font-bold cursor-pointer shadow-sm hover:opacity-90"
          title="Security Administrator"
        >
          <User className="w-4 h-4 text-slate-900" />
        </div>

      </div>

    </header>
  );
};
