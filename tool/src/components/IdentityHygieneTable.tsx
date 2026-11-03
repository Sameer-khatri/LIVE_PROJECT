import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { HygieneMetricRow } from '../types/dashboard';

interface IdentityHygieneTableProps {
  legitimateRatio: number;
  rows: HygieneMetricRow[];
  deviceTrustIndex: string;
  velocityRatio: string;
}

export const IdentityHygieneTable: React.FC<IdentityHygieneTableProps> = ({
  legitimateRatio,
  rows,
  deviceTrustIndex,
  velocityRatio
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-between h-full bg-dark-card/90 border border-dark-border rounded-3xl p-5 backdrop-blur-xl shadow-lg select-none">
      
      {/* Table Header: Cyber Security */}
      <div>
        <h3 className="text-sm font-bold text-white tracking-tight mb-0.5">Identity Hygiene</h3>
        <div className="text-[11px] text-slate-400 font-normal">
          Legitimate vs Anomalous Logins (UEBA Baseline)
        </div>

        {/* Big percentage metric header */}
        <div className="mt-1 mb-3 flex items-baseline justify-between">
          <div className="text-3xl font-extrabold text-white tracking-tight font-sans">
            {legitimateRatio}<span className="text-xl font-normal text-slate-400 ml-0.5">%</span>
          </div>
          <span className="text-xs text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/80 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
            <span>{100 - legitimateRatio}% Anomalous Traffic</span>
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
                className="flex flex-col px-3 py-1.5 rounded-xl bg-dark-inset/80 border border-dark-border hover:border-slate-600 transition-all cursor-pointer text-xs group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-slate-200 font-medium truncate max-w-[170px] group-hover:text-white transition-colors">
                    {row.name}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs font-normal">{row.targetRange}</span>
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
      <div className="mt-3 pt-3 border-t border-dark-border space-y-2">
        <div className="flex items-center justify-between text-xs hover:bg-dark-inset/40 p-1 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              1
            </span>
            <span className="text-slate-300 font-medium">Device Trust Index</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-semibold">{deviceTrustIndex}</span>
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Based on enrolled TPM 2.0 and certificate trust" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs hover:bg-dark-inset/40 p-1 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              2
            </span>
            <span className="text-slate-300 font-medium">Identity Velocity Ratio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-rose-400 font-semibold">{velocityRatio}</span>
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Ratio of authentication velocity versus 30-day baseline" />
          </div>
        </div>
      </div>

    </div>
  );
};
