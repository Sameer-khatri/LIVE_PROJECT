import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface AppLoaderProps {
  onComplete: () => void;
}

export const AppLoader: React.FC<AppLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(12);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Scanning 18 team accounts and active logins...',
    'Analyzing 1,428 saved security records...',
    'Checking for repeated wrong passwords...',
    'Verifying employee computers and locations...',
    'Security scan complete!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 10;
        const capped = Math.min(100, next);

        if (capped > 80) setCurrentStep(4);
        else if (capped > 60) setCurrentStep(3);
        else if (capped > 40) setCurrentStep(2);
        else if (capped > 20) setCurrentStep(1);

        return capped;
      });
    }, 280);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090c13] text-white p-6 select-none animate-fadeIn">
      {/* Background radial glow */}
      <div className="absolute w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>

      {/* Iridescent Shield Icon with Orbiting Glow */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400 via-purple-500 to-rose-400 p-[3px] shadow-[0_0_50px_rgba(56,189,248,0.35)] animate-radar-breathe">
          <div className="w-full h-full bg-[#101522] rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-sky-400" />
          </div>
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 rounded-full border border-sky-400/30 animate-orbit"></div>
      </div>

      {/* Brand & Loading Title */}
      <h2 className="text-2xl font-bold tracking-tight mb-1 font-sans">
        Auth<span className="text-sky-400">Sentry</span>
      </h2>
      <p className="text-xs text-slate-400 mb-6">
        Smart Account Protection & Security Monitor
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-[#161d2a] rounded-full h-2.5 p-0.5 border border-slate-800 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-emerald-400 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Status Text & Step Details */}
      <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
        <span>{steps[currentStep]}</span>
      </div>

      <div className="text-[11px] text-slate-500 mt-2 font-mono">
        {progress}% Complete
      </div>
    </div>
  );
};
