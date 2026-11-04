import React from 'react';
import { Plane, Zap, Bomb, Globe, ShieldCheck, Sparkles, AlertTriangle, ShieldAlert } from 'lucide-react';

export type ScenarioType = 'IMPOSSIBLE_TRAVEL' | 'BRUTE_FORCE' | 'MFA_BOMBING' | 'TOR_RESET' | 'NORMAL';

interface SimulatorBarProps {
  currentScenario: ScenarioType;
  onSelectScenario: (scenario: ScenarioType) => void;
}

export const SimulatorBar: React.FC<SimulatorBarProps> = ({
  currentScenario,
  onSelectScenario
}) => {
  const scenarios: Array<{
    id: ScenarioType;
    label: string;
    sublabel: string;
    tag: string;
    icon: React.ReactNode;
    severity: 'CRITICAL' | 'HIGH' | 'NORMAL';
    accentColor: string;
  }> = [
    {
      id: 'IMPOSSIBLE_TRAVEL',
      label: 'Fast Impossible Travel',
      sublabel: 'SF to Germany in 8 mins',
      tag: '8,820 km/h',
      icon: <Plane className="w-4 h-4" />,
      severity: 'CRITICAL',
      accentColor: 'rose'
    },
    {
      id: 'BRUTE_FORCE',
      label: 'Password Guessing',
      sublabel: '7 wrong passwords in 30s',
      tag: 'Spray Bot',
      icon: <Zap className="w-4 h-4" />,
      severity: 'CRITICAL',
      accentColor: 'amber'
    },
    {
      id: 'MFA_BOMBING',
      label: 'Phone Approval Spam',
      sublabel: '4 popups sent in 18s',
      tag: 'MFA Fatigue',
      icon: <Bomb className="w-4 h-4" />,
      severity: 'HIGH',
      accentColor: 'amber'
    },
    {
      id: 'TOR_RESET',
      label: 'Hidden Hacker Location',
      sublabel: 'Reset from Tor exit node',
      tag: 'Masked IP',
      icon: <Globe className="w-4 h-4" />,
      severity: 'CRITICAL',
      accentColor: 'purple'
    },
    {
      id: 'NORMAL',
      label: 'Normal Safe Day',
      sublabel: '1,426 verified employee habits',
      tag: '100% Secure',
      icon: <ShieldCheck className="w-4 h-4" />,
      severity: 'NORMAL',
      accentColor: 'emerald'
    }
  ];

  return (
    <div className="w-full mb-4 p-3 rounded-3xl bg-[#131924]/80 border border-white/[0.06] shadow-xl select-none flex flex-col gap-3">
      
      {/* Top Header: Title, Description, and Active Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-[#121722] rounded-[10px] flex items-center justify-center text-sky-300">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white tracking-tight uppercase font-mono">
                Threat Simulation Matrix
              </h4>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 font-mono">
                Click a vector to test real-time defense
              </span>
            </div>
          </div>
        </div>

        {/* Live Simulation Indicator */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>AUTONOMOUS ENGINE:</span>
          <span className="text-emerald-400 font-bold">ARMED</span>
        </div>
      </div>

      {/* Grid of 5 Equal-Width Structured Scenario Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {scenarios.map((s) => {
          const isActive = currentScenario === s.id;
          const isSafe = s.id === 'NORMAL';

          return (
            <button
              key={s.id}
              onClick={() => onSelectScenario(s.id)}
              className={`relative flex flex-col justify-between p-3 rounded-2xl text-left transition-all duration-300 group cursor-pointer ${
                isActive
                  ? isSafe
                    ? 'bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.35)]'
                    : 'bg-gradient-to-b from-rose-500/20 via-rose-500/10 to-transparent border border-rose-500/40 shadow-[0_0_20px_-3px_rgba(244,63,94,0.35)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.12]'
              }`}
            >
              {/* Card Header: Icon + Badge */}
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`p-1.5 rounded-xl transition-colors ${
                  isActive
                    ? isSafe
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                    : 'bg-white/[0.05] text-slate-400 group-hover:text-white'
                }`}>
                  {s.icon}
                </div>

                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                  isActive
                    ? isSafe
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-white/[0.04] text-slate-400'
                }`}>
                  {s.tag}
                </span>
              </div>

              {/* Card Body: Title & Context */}
              <div>
                <div className="flex items-center gap-1.5">
                  {isActive && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSafe ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`}></span>
                  )}
                  <span className={`text-xs font-bold tracking-tight ${
                    isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {s.label}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                  {s.sublabel}
                </p>
              </div>

              {/* Active Indicator Bar at bottom */}
              {isActive && (
                <div className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${
                  isSafe ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                }`} />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};
