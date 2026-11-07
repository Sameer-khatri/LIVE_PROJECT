import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const SHORTCUTS = [
    { key: '1', desc: 'Jump to Security Dashboard (HQ)' },
    { key: '2', desc: 'Jump to History Tree (10 Hubs OSINT Graph)' },
    { key: '3', desc: 'Jump to Recent Activity (Live Incident Stream)' },
    { key: '4', desc: 'Jump to Block & Log Out (Mitigation Center)' },
    { key: '5', desc: 'Jump to Settings & Rules (Policy Studio)' },
    { key: 'C', desc: 'Open / Close Sentry AI Copilot Assistant' },
    { key: 'G', desc: 'Open / Close Global Attack & Velocity Map' },
    { key: 'Space', desc: 'Pause / Resume Live Telemetry Stream' },
    { key: 'M', desc: 'Emergency Autonomous Session Containment' },
    { key: '?', desc: 'Open / Close Keyboard Shortcuts' },
    { key: 'Esc', desc: 'Close any active modal or drawer' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-lg bg-[#0e131d]/95 border border-sky-500/30 rounded-3xl p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">SOC Operator Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400 font-sans">High-speed tactical platform controls</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts Grid */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {SHORTCUTS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-xs text-slate-300 font-sans">{item.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/20 text-[11px] font-mono text-sky-300 shadow-inner font-bold min-w-[28px] text-center">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] text-center text-[11px] text-slate-400 font-mono">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">Esc</kbd> anytime to return to monitoring
        </div>

      </div>
    </div>
  );
};
