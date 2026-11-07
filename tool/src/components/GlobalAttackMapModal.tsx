import React, { useState, useEffect } from 'react';
import { 
  X, Globe, ShieldCheck, Plane, CheckCircle2, AlertTriangle, ArrowRight 
} from 'lucide-react';

interface GlobalAttackMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScenario: string;
  travelVelocityKmH: number;
}

interface MapLocation {
  id: string;
  name: string;
  country: string;
  lat: number; // percentage
  lon: number; // percentage
  ip: string;
  status: 'SAFE' | 'COMPROMISED' | 'ALERT';
}

// 6 distinctly spaced global hubs with ZERO overlapping
const GLOBAL_HUBS: MapLocation[] = [
  { id: 'sf', name: 'San Francisco HQ', country: 'United States', lat: 38, lon: 18, ip: '198.51.100.24', status: 'SAFE' },
  { id: 'ny', name: 'New York Office', country: 'United States', lat: 36, lon: 30, ip: '198.51.102.10', status: 'SAFE' },
  { id: 'fra', name: 'Frankfurt Hub', country: 'Germany', lat: 33, lon: 52, ip: '185.220.101.5', status: 'COMPROMISED' },
  { id: 'tok', name: 'Tokyo Gateway', country: 'Japan', lat: 38, lon: 82, ip: '203.0.113.88', status: 'SAFE' },
  { id: 'sao', name: 'São Paulo Regional', country: 'Brazil', lat: 72, lon: 35, ip: '177.54.120.3', status: 'SAFE' },
  { id: 'syd', name: 'Sydney Branch', country: 'Australia', lat: 76, lon: 88, ip: '139.130.4.5', status: 'SAFE' }
];

export const GlobalAttackMapModal: React.FC<GlobalAttackMapModalProps> = ({
  isOpen,
  onClose,
  currentScenario,
  travelVelocityKmH
}) => {
  const [selectedHub, setSelectedHub] = useState<MapLocation>(GLOBAL_HUBS[2]); // Default Frankfurt
  const [flightProgress, setFlightProgress] = useState<number>(0.6);

  const isImpossibleTravel = currentScenario === 'IMPOSSIBLE_TRAVEL' || travelVelocityKmH > 800;

  // Animated flight simulation
  useEffect(() => {
    if (!isOpen || !isImpossibleTravel) return;
    const interval = setInterval(() => {
      setFlightProgress((prev) => (prev >= 1 ? 0 : prev + 0.02));
    }, 45);
    return () => clearInterval(interval);
  }, [isOpen, isImpossibleTravel]);

  if (!isOpen) return null;

  const sfHub = GLOBAL_HUBS[0];
  const fraHub = GLOBAL_HUBS[2];

  // Mid curve control point
  const midX = (sfHub.lon + fraHub.lon) / 2;
  const midY = Math.min(sfHub.lat, fraHub.lat) - 16;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-4xl bg-[#0e131d] border border-white/[0.08] rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Simple & Clean Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-sans">
                  Global Threat & Travel Map
                </h3>
                <span className={`px-2 py-0.2 rounded-full text-[9px] font-mono font-bold border ${
                  isImpossibleTravel 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse' 
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {isImpossibleTravel ? 'ANOMALY DETECTED' : 'ALL ROUTES NORMAL'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Visualizing physical distance and login speed between enterprise hubs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Map + Inspector Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 min-h-0 overflow-y-auto">
          
          {/* Left: Clean Visual Map (7 cols) */}
          <div className="md:col-span-7 bg-[#080c14] rounded-2xl border border-white/[0.06] p-3 flex flex-col justify-between relative overflow-hidden">
            
            {/* Top status line */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-white/[0.04]">
              <span>6 GLOBAL REGIONS ACTIVE</span>
              <span>HAVERSINE VELOCITY SENSORS: <strong className="text-emerald-400">ONLINE</strong></span>
            </div>

            {/* Map Canvas with Continents Grid and Connection Lines */}
            <div className="relative w-full aspect-[16/10] bg-[#060910] rounded-xl border border-white/[0.03] overflow-hidden my-2">
              
              {/* Subtle world coordinates grid */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#38bdf8" strokeDasharray="2 4" />
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#38bdf8" strokeDasharray="2 4" />
                <circle cx="50%" cy="50%" r="25%" fill="none" stroke="#38bdf8" strokeDasharray="2 4" />
              </svg>

              {/* Background ambient dots */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

              {/* SVG Arcs */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Normal safe sync arcs between hubs */}
                <line x1={`${sfHub.lon}%`} y1={`${sfHub.lat}%`} x2={`${GLOBAL_HUBS[1].lon}%`} y2={`${GLOBAL_HUBS[1].lat}%`} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
                <line x1={`${GLOBAL_HUBS[1].lon}%`} y1={`${GLOBAL_HUBS[1].lat}%`} x2={`${GLOBAL_HUBS[4].lon}%`} y2={`${GLOBAL_HUBS[4].lat}%`} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
                <line x1={`${fraHub.lon}%`} y1={`${fraHub.lat}%`} x2={`${GLOBAL_HUBS[3].lon}%`} y2={`${GLOBAL_HUBS[3].lat}%`} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
                <line x1={`${GLOBAL_HUBS[3].lon}%`} y1={`${GLOBAL_HUBS[3].lat}%`} x2={`${GLOBAL_HUBS[5].lon}%`} y2={`${GLOBAL_HUBS[5].lat}%`} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />

                {/* Impossible Travel Flight Arc (Only when active) */}
                {isImpossibleTravel && (
                  <path
                    d={`M ${sfHub.lon}% ${sfHub.lat}% Q ${midX}% ${midY}% ${fraHub.lon}% ${fraHub.lat}%`}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="animate-pulse"
                  />
                )}
              </svg>

              {/* Clear, Non-Overlapping Hub Markers */}
              {GLOBAL_HUBS.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                const isThreat = hub.id === 'fra' && isImpossibleTravel;

                return (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    style={{ left: `${hub.lon}%`, top: `${hub.lat}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20 cursor-pointer"
                  >
                    {/* Ring */}
                    <div className={`w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 flex items-center justify-center ${
                      isSelected ? 'scale-125 ring-2 ring-white' : 'group-hover:scale-110'
                    } ${
                      isThreat
                        ? 'bg-rose-500 border-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                        : 'bg-emerald-500 border-emerald-200'
                    }`}>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>

                    {/* Label Badge underneath */}
                    <div className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[9.5px] font-sans font-semibold border backdrop-blur-md transition-all ${
                      isSelected
                        ? 'bg-[#0f172a] text-white border-sky-400 shadow-md z-30'
                        : 'bg-black/70 text-slate-300 border-white/10'
                    }`}>
                      {hub.name.replace(' Office', '').replace(' Regional', '').replace(' Branch', '')}
                    </div>
                  </button>
                );
              })}

              {/* Supersonic Flight Badge (Only when impossible travel is active) */}
              {isImpossibleTravel && (
                <div 
                  className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-rose-950/95 border border-rose-500 px-2 py-0.5 rounded-full text-[9px] font-mono text-rose-200 shadow-lg"
                  style={{
                    left: `${sfHub.lon + (fraHub.lon - sfHub.lon) * flightProgress}%`,
                    top: `${sfHub.lat + (fraHub.lat - sfHub.lat) * flightProgress - Math.sin(flightProgress * Math.PI) * 16}%`
                  }}
                >
                  <Plane className="w-3 h-3 text-rose-400" />
                  <span>MACH 7.1 ({travelVelocityKmH > 0 ? travelVelocityKmH.toLocaleString() : '8,820'} km/h)</span>
                </div>
              )}

            </div>

            {/* Bottom Legend */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Verified Hub
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Anomaly Origin
                </span>
              </div>
              <span className="text-[10px] font-mono">Click any hub to inspect details</span>
            </div>

          </div>

          {/* Right: Simplified Information & Route Card (5 cols) */}
          <div className="md:col-span-5 bg-[#0a0e17] rounded-2xl border border-white/[0.06] p-4 flex flex-col justify-between">
            
            <div>
              {/* Selected Hub Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">SELECTED REGION</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                  selectedHub.id === 'fra' && isImpossibleTravel
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {selectedHub.id === 'fra' && isImpossibleTravel ? 'FLAGGED ANOMALY' : 'NORMAL & SECURE'}
                </span>
              </div>

              <h4 className="text-base font-bold text-white font-sans">{selectedHub.name}</h4>
              <p className="text-xs text-slate-400">{selectedHub.country}</p>

              {/* Key Quick Metrics */}
              <div className="grid grid-cols-2 gap-2 my-3">
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-[9px] text-slate-400 font-mono">HUB IP</div>
                  <div className="text-xs font-mono font-bold text-sky-300 mt-0.5">{selectedHub.ip}</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-[9px] text-slate-400 font-mono">EDGE LATENCY</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">&lt; 32ms</div>
                </div>
              </div>

              {/* Simple Route Intelligence */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs space-y-2">
                <div className="text-[10px] font-mono font-bold text-slate-300 uppercase">
                  Travel Speed Evaluation
                </div>

                {isImpossibleTravel ? (
                  <div className="space-y-1.5 text-[11px] text-slate-300 leading-snug">
                    <div className="text-rose-400 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Impossible Fast Travel Detected</span>
                    </div>
                    <p className="text-slate-400">
                      San Francisco to Frankfurt (9,120 km) authenticated only <strong>8.2 minutes apart</strong>. 
                      Required speed: <strong>8,820 km/h (Mach 7.1)</strong>.
                    </p>
                    <div className="text-[10px] text-emerald-400 font-mono pt-1 border-t border-white/[0.06] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Action: Stolen session token revoked at edge</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-[11px] text-slate-400">
                    <p className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>All Travel Within Physical Limits</span>
                    </p>
                    <p>
                      Logins from this region align with regular employee shifts and normal commercial travel speed (&lt; 850 km/h).
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Done Button */}
            <div className="pt-3 border-t border-white/[0.06] mt-3 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-bold text-white transition-all"
              >
                Done
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
