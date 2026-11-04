import React, { useState, useEffect } from 'react';
import { Activity, Shield, Zap, Globe, Clock, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';

interface TickerItem {
  id: string;
  timeAgo: string;
  category: 'AUTH' | 'CONTAINMENT' | 'SYNC' | 'ANOMALY' | 'HEALTH' | 'MONITOR';
  message: string;
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';
}

const DEFAULT_TICKER_ITEMS: TickerItem[] = [
  {
    id: 't-1',
    timeAgo: 'Just now',
    category: 'AUTH',
    message: 'WebAuthn biometric login verified for priya.patel@innovatech.io (YubiKey 5C NFC)',
    severity: 'SUCCESS'
  },
  {
    id: 't-2',
    timeAgo: '4s ago',
    category: 'SYNC',
    message: 'Synchronized 142 identity audit records from Okta, Azure AD & Google Workspace',
    severity: 'INFO'
  },
  {
    id: 't-3',
    timeAgo: '9s ago',
    category: 'HEALTH',
    message: '99.8% of 1,428 monitored employees verified within safe behavioral baseline',
    severity: 'SUCCESS'
  },
  {
    id: 't-4',
    timeAgo: '16s ago',
    category: 'CONTAINMENT',
    message: 'Edge Gateway auto-quarantined Tor exit IP 185.220.101.5 on border firewall [Policy #2]',
    severity: 'DANGER'
  },
  {
    id: 't-5',
    timeAgo: '24s ago',
    category: 'AUTH',
    message: 'Active OAuth session auto-rotated for liam.oconnor@innovatech.io (Zero-Trust Policy)',
    severity: 'SUCCESS'
  },
  {
    id: 't-6',
    timeAgo: '32s ago',
    category: 'HEALTH',
    message: 'AWS US-East VPC Gateway verified 18 healthy microservice identity certificates',
    severity: 'SUCCESS'
  },
  {
    id: 't-7',
    timeAgo: '41s ago',
    category: 'MONITOR',
    message: 'Single sign-on verified for 124 engineering team members on Tokyo & Dublin VPNs',
    severity: 'INFO'
  },
  {
    id: 't-8',
    timeAgo: '50s ago',
    category: 'ANOMALY',
    message: 'Isolated travel velocity alert for Sarah Chen automatically contained in 45ms',
    severity: 'WARNING'
  }
];

interface LiveSecurityTickerProps {
  isLiveStream: boolean;
  onInjectEvent?: () => void;
}

export const LiveSecurityTicker: React.FC<LiveSecurityTickerProps> = ({ isLiveStream }) => {
  const [items] = useState<TickerItem[]>(DEFAULT_TICKER_ITEMS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [utcTime, setUtcTime] = useState<string>('');
  const [eventsIngestedCount, setEventsIngestedCount] = useState<number>(14280);

  // Live ticking UTC clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Automatic carousel rotation & counter increment
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setEventsIngestedCount((prev) => prev + Math.floor(Math.random() * 3 + 1));
    }, 3800);

    return () => clearInterval(interval);
  }, [isLiveStream, items.length]);

  const currentItem = items[currentIndex];

  const getBadgeStyle = (severity: TickerItem['severity']) => {
    switch (severity) {
      case 'DANGER':
        return 'bg-rose-500/15 text-rose-300';
      case 'WARNING':
        return 'bg-amber-500/15 text-amber-300';
      case 'SUCCESS':
        return 'bg-emerald-500/15 text-emerald-300';
      default:
        return 'bg-sky-500/15 text-sky-300';
    }
  };

  return (
    <div className="w-full mb-3 px-3.5 py-1.5 rounded-2xl bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-3 text-xs select-none">
      
      {/* Left: Live Radio Pulsing Indicator */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/[0.05]">
          <span className={`w-1.5 h-1.5 rounded-full ${isLiveStream ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
          <span className="font-mono text-[10px] font-bold text-slate-300">
            {isLiveStream ? 'LIVE STREAM' : 'PAUSED'}
          </span>
        </div>

        <span className="text-slate-600 hidden sm:inline">•</span>

        {/* Real-Time UTC Digital Clock */}
        <div className="flex items-center gap-1 font-mono text-[11px] text-sky-400 font-semibold">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{utcTime || '22:15:00 UTC'}</span>
        </div>

        <span className="text-slate-600 hidden sm:inline">•</span>

        {/* Telemetry Counter */}
        <div className="text-[11px] text-slate-400 hidden lg:inline">
          Ingested: <span className="font-mono text-white font-bold">{eventsIngestedCount.toLocaleString()}</span> events
        </div>
      </div>

      {/* Center: Animated Live Feed Marquee Pill */}
      <div className="flex-1 w-full md:w-auto flex items-center justify-center overflow-hidden">
        <div 
          key={currentItem.id + currentIndex}
          className="flex items-center gap-2 max-w-full truncate animate-fadeIn"
        >
          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase flex-shrink-0 ${getBadgeStyle(currentItem.severity)}`}>
            {currentItem.category}
          </span>
          <span className="text-slate-300 text-xs truncate">
            {currentItem.message}
          </span>
          <span className="font-mono text-[10px] text-slate-500 flex-shrink-0 hidden sm:inline">
            ({currentItem.timeAgo})
          </span>
        </div>
      </div>

      {/* Right: Quick Action & Health Indicator */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
          <Radio className="w-3 h-3 animate-spin" />
          <span>EDGE SYNC 100%</span>
        </div>
      </div>

    </div>
  );
};
