import React from 'react';
import { Plane, Zap, Bomb, Globe, ShieldCheck, Sparkles } from 'lucide-react';

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
    icon: React.ReactNode;
    severity: 'CRITICAL' | 'HIGH' | 'NORMAL';
  }> = [
    {
      id: 'IMPOSSIBLE_TRAVEL',
      label: 'Fast Impossible Travel',
      sublabel: 'US to Germany in 8 mins',
      icon: <Plane className="w-3.5 h-3.5" />,
      severity: 'CRITICAL'
    },
    {
      id: 'BRUTE_FORCE',
      label: 'Password Guessing',
      sublabel: '7 wrong passwords in 30s',
      icon: <Zap className="w-3.5 h-3.5" />,
      severity: 'CRITICAL'
    },
    {
      id: 'MFA_BOMBING',
      label: 'Phone Approval Spam',
      sublabel: '4 popups sent in 18s',
      icon: <Bomb className="w-3.5 h-3.5" />,
      severity: 'HIGH'
    },
    {
      id: 'TOR_RESET',
      label: 'Hidden Hacker Location',
      sublabel: 'Password reset from anonymous IP',
      icon: <Globe className="w-3.5 h-3.5" />,
      severity: 'CRITICAL'
    },
    {
      id: 'NORMAL',
      label: 'Normal Safe Day',
      sublabel: 'Regular team activity (Safe)',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      severity: 'NORMAL'
    }
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 p-2 rounded-2xl bg-white/[0.02] mb-4 select-none">
      
      {/* Label */}
      <div className="flex items-center gap-2 pl-2 flex-shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <span>Test Real Threats</span>
          <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">
            Click to simulate
          </span>
        </div>
      </div>

      {/* Buttons (Borderless clean pills) */}
      <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5">
        {scenarios.map((s) => {
          const isActive = currentScenario === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectScenario(s.id)}
              className={`flex flex-col items-start px-3 py-1.5 rounded-xl text-left transition-all duration-200 flex-shrink-0 ${
                isActive
                  ? 'bg-sky-500/15 text-white ring-1 ring-sky-400/50 shadow-sm'
                  : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className={isActive ? 'text-sky-400' : 'text-slate-400'}>{s.icon}</span>
                <span>{s.label}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 font-normal">
                {s.sublabel}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
