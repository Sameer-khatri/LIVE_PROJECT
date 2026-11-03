import React, { useState } from 'react';
import { 
  ShieldAlert, User, Laptop, Globe, CheckCircle2, 
  FileText, Activity, ArrowUpRight, Send, Sparkles, 
  ChevronRight, HelpCircle, Layers, Database, Lock, Bot
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
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Default fallback data if root is selected
  const data = selectedEntity?.inspectorData || {
    title: 'Saved Security History Records',
    roleOrType: 'Historical Database Registry',
    statusLabel: 'Active Database • 1,428 Records',
    lastUpdate: 'Saved 3 mins ago',
    riskContributionRate: 42,
    riskRateDelta: '+12% this month',
    histogramBars: [20, 30, 45, 60, 50, 40, 35, 65, 80, 95, 85, 75, 60, 50, 40, 55, 70, 85, 90, 80, 65, 50, 35, 25],
    metricsGrid: {
      alertsCount: 16,
      devicesCount: 14,
      ipsCount: 24,
      sessionsCount: 128
    },
    aiSummary: 'Historical intelligence repository indexing normalized security events, user password changes, and automatic protections.'
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userQ = query;
    setQuery('');
    setIsThinking(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(`Summary for "${userQ}": Cross-referenced 1,428 saved records. Found high risk caused by recent logins from an anonymous hidden network right after 5 wrong password attempts.`);
    }, 800);
  };

  const handlePredefinedQuery = (text: string) => {
    setQuery(text);
    setIsThinking(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(`AI Check for "${text}": This account has 3 suspicious signs recently. Recommendation: Require the user to confirm via phone and reset their password.`);
    }, 700);
  };

  return (
    <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 bg-[#0f1520]/95 border border-[#232c3d] rounded-3xl p-5 backdrop-blur-2xl shadow-2xl flex flex-col justify-between select-none">
      
      {/* Top Header Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
          <div className="w-5 h-5 rounded-md bg-[#1c2433] border border-slate-700/60 flex items-center justify-center text-sky-400">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-300">
            {selectedCategory ? selectedCategory.title : 'Saved Security Intelligence'}
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
              Active Record
            </span>
            <span className="text-[11px] text-slate-400">
              {data.lastUpdate}
            </span>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1b2230] hover:bg-[#232d40] border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all hover:translate-x-0.5">
            <span>View Full Record</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Risk Level Card with Animated Histogram Sparkline */}
        <div className="p-4 rounded-2xl bg-[#090d15] border border-slate-800/80 mb-4 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 font-medium">Account Threat Level</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18202d] border border-slate-700 text-slate-300 font-medium">
              Medium Threat
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

            {/* Vertical Bar Histogram Sparkline */}
            <div className="flex items-end gap-1 h-10 pb-0.5">
              {data.histogramBars.map((height, i) => {
                const isHighlight = height >= 75;
                return (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className={`w-1 rounded-full transition-all duration-500 ${
                      isHighlight
                        ? 'bg-amber-400 hover:bg-amber-300'
                        : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Day ${i}: ${height}% Danger`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* 2x2 Metric Tiles Grid (Simple English) */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="p-3 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[11px] font-medium">Security Warnings</span>
            </div>
            <div className="text-2xl font-bold text-white font-sans">
              {data.metricsGrid.alertsCount}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Laptop className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-medium">Known Devices</span>
            </div>
            <div className="text-2xl font-bold text-white font-sans">
              {data.metricsGrid.devicesCount}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-medium">Locations Used</span>
            </div>
            <div className="text-2xl font-bold text-white font-sans">
              {data.metricsGrid.ipsCount}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-medium">Times Logged In</span>
            </div>
            <div className="text-2xl font-bold text-white font-sans">
              {data.metricsGrid.sessionsCount}
            </div>
          </div>
        </div>

        {/* AI Synthesis Findings Box */}
        <div className="p-3.5 rounded-2xl bg-[#090d15] border border-slate-800/80 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>AI Security Summary (Plain English)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {data.aiSummary}
          </p>

          {/* Dynamic AI response output */}
          {isThinking && (
            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-sky-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              <span>AI is checking security history...</span>
            </div>
          )}

          {aiResponse && !isThinking && (
            <div className="mt-2.5 p-2 rounded-xl bg-sky-950/40 border border-sky-800/60 text-xs text-sky-200 leading-relaxed animate-toast-in">
              <div className="flex items-center gap-1 font-semibold text-sky-300 mb-1">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Assistant Answer:</span>
              </div>
              {aiResponse}
            </div>
          )}
        </div>

        {/* Quick query pills in simple words */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <button
            onClick={() => handlePredefinedQuery('Is this user account safe right now?')}
            className="text-[10px] px-2 py-0.5 rounded-full bg-[#161d2b] hover:bg-[#202a3d] border border-slate-700 text-slate-300 transition-colors"
          >
            Is this account safe?
          </button>
          <button
            onClick={() => handlePredefinedQuery('Did someone guess passwords repeatedly?')}
            className="text-[10px] px-2 py-0.5 rounded-full bg-[#161d2b] hover:bg-[#202a3d] border border-slate-700 text-slate-300 transition-colors"
          >
            Password guessing signs?
          </button>
          <button
            onClick={() => handlePredefinedQuery('Where did these logins come from?')}
            className="text-[10px] px-2 py-0.5 rounded-full bg-[#161d2b] hover:bg-[#202a3d] border border-slate-700 text-slate-300 transition-colors"
          >
            Where did logins originate?
          </button>
        </div>
      </div>

      {/* Bottom Interactive Query Bar */}
      <form onSubmit={handleSend} className="relative mt-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question in plain English (e.g., Is this user safe?)..."
          className="w-full bg-[#0a0e16] border border-slate-800 rounded-full pl-4 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all active:scale-95 shadow-md"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
