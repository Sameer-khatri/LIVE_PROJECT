import React, { useState } from 'react';
import { 
  ShieldAlert, User, Laptop, Globe, CheckCircle2, 
  FileText, Activity, ArrowUpRight, Send, Sparkles, 
  ChevronRight, HelpCircle, Layers, Database, Lock
} from 'lucide-react';
import { AnalyzerEntityNode, AnalyzerCategory } from '../../types/analyzer';

interface InspectorPanelProps {
  selectedEntity: AnalyzerEntityNode | null;
  selectedCategory: AnalyzerCategory | null;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  selectedEntity,
  selectedCategory
}) => {
  const [query, setQuery] = useState('');
  const [queryHistory, setQueryHistory] = useState<string[]>([]);

  // Default fallback data if root is selected
  const data = selectedEntity?.inspectorData || {
    title: 'Stored Security Intelligence Archive',
    roleOrType: 'Historical Database Registry',
    statusLabel: 'Active Database • 1,428 Records',
    lastUpdate: 'Archived 3 mins ago',
    riskContributionRate: 42,
    riskRateDelta: '+12% this month',
    histogramBars: [20, 30, 45, 60, 50, 40, 35, 65, 80, 95, 85, 75, 60, 50, 40, 55, 70, 85, 90, 80, 65, 50, 35, 25],
    metricsGrid: {
      alertsCount: 16,
      devicesCount: 14,
      ipsCount: 24,
      sessionsCount: 128
    },
    aiSummary: 'Historical intelligence repository indexing normalized OCSF identity telemetry, user credential changes, and autonomous mitigations.'
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setQueryHistory(prev => [...prev, query]);
    setQuery('');
  };

  return (
    <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 bg-[#0f1520]/95 border border-[#232c3d] rounded-3xl p-5 backdrop-blur-2xl shadow-2xl flex flex-col justify-between select-none">
      
      {/* Top Header Section (Exact match to reference layout) */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
          <div className="w-5 h-5 rounded-md bg-[#1c2433] border border-slate-700/60 flex items-center justify-center text-sky-400">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-300">
            {selectedCategory ? selectedCategory.title : 'Stored Security Intelligence'}
          </span>
        </div>

        {/* Big Entity Headline */}
        <h2 className="text-xl font-bold text-white tracking-tight leading-tight mb-2 font-sans">
          {data.title}
        </h2>

        {/* Status Pill & Explore details Button */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[10px] font-semibold uppercase">
              Active
            </span>
            <span className="text-[11px] text-slate-400">
              {data.lastUpdate}
            </span>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1b2230] hover:bg-[#232d40] border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all">
            <span>Explore details</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Risk Contribution Rate Card with Histogram Sparkline (Reference match!) */}
        <div className="p-4 rounded-2xl bg-[#090d15] border border-slate-800/80 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 font-medium">Risk Contribution Rate</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18202d] border border-slate-700 text-slate-300 font-medium">
              Moderate
            </span>
          </div>

          <div className="flex items-end justify-between gap-4 mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight font-sans">
                {data.riskContributionRate}%
              </span>
              <span className="text-xs text-rose-400 font-semibold">
                {data.riskRateDelta}
              </span>
            </div>

            {/* Vertical Bar Histogram Sparkline (Exact match to reference audio/histogram sparkline) */}
            <div className="flex items-end gap-1 h-9 px-1">
              {data.histogramBars.map((height, idx) => {
                const isPeak = idx === 10 || idx === 19;
                return (
                  <div
                    key={idx}
                    style={{ height: `${Math.max(15, height)}%` }}
                    className={`w-1 rounded-full transition-all ${
                      isPeak 
                        ? 'bg-amber-400 shadow-sm' 
                        : height > 70 
                        ? 'bg-slate-400' 
                        : 'bg-slate-700'
                    }`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2x2 Telemetry Metric Grid (Reference match: 4 rounded boxes with checkmarks & icons) */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="p-3 rounded-2xl bg-[#090d15] border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">{data.metricsGrid.alertsCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Correlated Historical Alerts
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#090d15] border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Laptop className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold text-white">{data.metricsGrid.devicesCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Associated Hardware Assets
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#090d15] border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-white">{data.metricsGrid.ipsCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Observed IP Endpoints
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#090d15] border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">{data.metricsGrid.sessionsCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Auth Sessions Recorded
            </div>
          </div>
        </div>

        {/* AI Forensic Analysis Card (Reference match: "RI Analysis / Propose De-regulation") */}
        <div className="p-3.5 rounded-2xl bg-[#090d15] border border-slate-800/80 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>AI Forensic Synthesis</span>
          </div>
          <div className="text-xs font-bold text-slate-200 mb-1">
            Behavioral Anomaly Assessment
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {data.aiSummary}
          </p>
        </div>
      </div>

      {/* Bottom Interactive Query Bar (Exact match to reference bottom prompt) */}
      <div className="mt-2 pt-2 border-t border-slate-800/80">
        <form onSubmit={handleSend} className="relative flex items-center mb-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about this historical node..."
            className="w-full bg-[#080c14] border border-slate-700/80 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 pr-10 shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1.5 p-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-sm"
          >
            <Send className="w-3 h-3" />
          </button>
        </form>

        {/* Quick Filter Tag Pills beneath prompt (Reference match) */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="px-2 py-0.5 rounded-md bg-[#161d2a] border border-slate-700 text-slate-300 cursor-pointer hover:text-white">
            + My agent
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#161d2a] border border-slate-700 text-slate-300 cursor-pointer hover:text-white">
            ⏱️ +3
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#161d2a] border border-slate-700 text-sky-400 cursor-pointer hover:text-white ml-auto flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>AI Synthesis</span>
          </span>
        </div>
      </div>

    </div>
  );
};

