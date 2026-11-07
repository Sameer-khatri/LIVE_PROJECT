import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, UserCheck } from 'lucide-react';
import { HygieneMetricRow } from '../types/dashboard';

interface IdentityHygieneTableProps {
  legitimateRatio: number;
  rows: HygieneMetricRow[];
  deviceTrustIndex: string;
  velocityRatio: string;
  onInspectDossier?: () => void;
}

export const IdentityHygieneTable: React.FC<IdentityHygieneTableProps> = ({
  legitimateRatio,
  rows,
  deviceTrustIndex,
  velocityRatio,
  onInspectDossier
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-between h-full bg-[#131924]/80 border border-white/[0.06] rounded-3xl p-5 backdrop-blur-xl shadow-lg select-none">
      
      {/* Table Header: Simple English */}
      <div>
        <h3 className="text-sm font-bold text-white tracking-tight mb-0.5">Login Safety Check</h3>
        <div className="text-[11px] text-slate-400 font-normal">
          Comparing today's logins to your team's normal habits
        </div>

        {/* Big percentage metric header */}
        <div className="mt-1 mb-3 flex items-baseline justify-between">
          <div className="text-3xl font-extrabold text-white tracking-tight font-sans">
            {legitimateRatio}<span className="text-xl font-normal text-slate-400 ml-0.5">%</span>
          </div>
          <span className="text-xs text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
            <span>{Number((100 - legitimateRatio).toFixed(1))}% Suspicious Traffic</span>
          </span>
        </div>

        {/* Tabular Rows with Interactive Hover and Expand */}
        <div className="space-y-1.5 my-2">
          {rows.map((row) => {
            const isExpanded = expandedId === row.id;

            return (
              <div
                key={row.id}
                onClick={() => setExpandedId(isExpanded ? null : row.id)}
                className="flex flex-col px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all cursor-pointer text-xs group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-slate-200 font-medium truncate max-w-[170px] group-hover:text-white transition-colors">
                    {row.name}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs font-normal">Safe: {row.targetRange}</span>
                    <span className={`font-semibold text-xs ${row.statusColor}`}>
                      {row.currentValue}
                    </span>
                    <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400 leading-relaxed animate-toast-in">
                    {row.tooltip}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Numbered Indices */}
      <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between text-xs hover:bg-dark-inset/40 p-1 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              1
            </span>
            <span className="text-slate-300 font-medium">Device Recognition Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-semibold">{deviceTrustIndex}</span>
            <span title="Checks if computers have company security certificates installed">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs hover:bg-dark-inset/40 p-1 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              2
            </span>
            <span className="text-slate-300 font-medium">Login Attempt Speed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-rose-400 font-semibold">{velocityRatio}x Normal Speed</span>
            <span title="Measures how fast login attempts are arriving">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            </span>
          </div>
        </div>

        {onInspectDossier && (
          <button
            onClick={onInspectDossier}
            className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 hover:from-sky-500/20 hover:to-indigo-500/20 border border-sky-500/30 text-sky-400 hover:text-sky-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Open Sarah Chen Forensics Dossier</span>
          </button>
        )}
      </div>

    </div>
  );
};
