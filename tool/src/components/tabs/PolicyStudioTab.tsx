import React, { useState } from 'react';
import { Sliders, Save, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

export const PolicyStudioTab: React.FC = () => {
  const [speedThreshold, setSpeedThreshold] = useState<number>(800);
  const [bruteForceFails, setBruteForceFails] = useState<number>(5);
  const [mfaWindow, setMfaWindow] = useState<number>(30);

  const [autoRevoke, setAutoRevoke] = useState<boolean>(true);
  const [autoQuarantine, setAutoQuarantine] = useState<boolean>(true);
  const [stepUpMfa, setStepUpMfa] = useState<boolean>(true);

  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    setSpeedThreshold(800);
    setBruteForceFails(5);
    setMfaWindow(30);
    setAutoRevoke(true);
    setAutoQuarantine(true);
    setStepUpMfa(true);
  };

  return (
    <div className="flex flex-col gap-5 select-none animate-fadeIn">
      
      {/* Top Header Card */}
      <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#1e2536] border border-slate-700 text-sky-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Security Settings & Rules</h3>
            <p className="text-xs text-slate-400">Easily customize how sensitive alarms should be and what gets blocked automatically.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark-inset border border-dark-border text-slate-400 hover:text-white text-xs font-semibold transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Confirmation Toast */}
      {savedNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Security rules saved and active across all accounts!</span>
        </div>
      )}

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Box 1: Alert Sensitivity Sliders */}
        <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border space-y-5">
          <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>When Should We Trigger an Alarm?</span>
          </h4>

          {/* Slider 1: Travel Speed */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Max Travel Speed Between Logins</span>
              <span className="font-bold text-sky-400 font-mono">{speedThreshold} km/h</span>
            </div>
            <input
              type="range"
              min="400"
              max="2000"
              step="50"
              value={speedThreshold}
              onChange={(e) => setSpeedThreshold(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Commercial airplane speed is 900 km/h. If consecutive logins exceed this speed, an alarm sounds.
            </p>
          </div>

          {/* Slider 2: Wrong Passwords */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Wrong Passwords Allowed in 30 Seconds</span>
              <span className="font-bold text-amber-400 font-mono">{bruteForceFails} attempts</span>
            </div>
            <input
              type="range"
              min="3"
              max="15"
              step="1"
              value={bruteForceFails}
              onChange={(e) => setBruteForceFails(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Flags someone repeatedly guessing passwords before they can break into the account.
            </p>
          </div>

          {/* Slider 3: Phone Code Window */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Phone Verification Window</span>
              <span className="font-bold text-purple-400 font-mono">{mfaWindow} seconds</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={mfaWindow}
              onChange={(e) => setMfaWindow(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Prevents hackers from sending dozens of push approval popups to wear down an employee.
            </p>
          </div>
        </div>

        {/* Box 2: Automatic Safety Responses */}
        <div className="p-5 rounded-3xl bg-dark-card/90 border border-dark-border space-y-4">
          <h4 className="text-sm font-bold text-white tracking-tight">
            Automatic Protection Actions
          </h4>
          <p className="text-xs text-slate-400">
            Choose what AuthSentry should do automatically when a break-in attempt is detected.
          </p>

          <div className="space-y-3 pt-2">
            
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-inset/80 border border-dark-border">
              <div className="pr-3">
                <div className="text-xs font-bold text-white">Auto-Logout on Serious Attack</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Immediately signs out the session so the hacker cannot view company data.
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoRevoke}
                onChange={(e) => setAutoRevoke(e.target.checked)}
                className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-inset/80 border border-dark-border">
              <div className="pr-3">
                <div className="text-xs font-bold text-white">Auto-Block Hacker IP Address</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Blocks internet addresses that attempt rapid password guessing.
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoQuarantine}
                onChange={(e) => setAutoQuarantine(e.target.checked)}
                className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-inset/80 border border-dark-border">
              <div className="pr-3">
                <div className="text-xs font-bold text-white">Require Phone Code on Unfamiliar Cities</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Asks for phone confirmation whenever someone logs in from a new country.
                </div>
              </div>
              <input
                type="checkbox"
                checked={stepUpMfa}
                onChange={(e) => setStepUpMfa(e.target.checked)}
                className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
