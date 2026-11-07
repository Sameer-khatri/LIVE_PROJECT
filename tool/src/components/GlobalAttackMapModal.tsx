import React, { useState, useEffect } from 'react';
import { 
  X, Globe, ShieldAlert, Plane, Radio, Zap, AlertTriangle, 
  MapPin, Compass, Navigation, ArrowUpRight, Crosshair, CheckCircle2 
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
  lat: number; // 0 to 100 percentage for SVG
  lon: number; // 0 to 100 percentage for SVG
  type: 'HQ' | 'HUB' | 'ATTACKER' | 'VICTIM' | 'PROXY';
  ip: string;
  status: 'SAFE' | 'ATTACK_ORIGIN' | 'COMPROMISED' | 'QUARANTINED';
}

const GLOBAL_NODES: MapLocation[] = [
  { id: 'sf', name: 'San Francisco HQ', country: 'United States', lat: 38, lon: 18, type: 'HQ', ip: '198.51.100.24', status: 'SAFE' },
  { id: 'ny', name: 'New York Finance', country: 'United States', lat: 39, lon: 27, type: 'HUB', ip: '198.51.102.10', status: 'SAFE' },
  { id: 'fra', name: 'Frankfurt Cloud DC', country: 'Germany', lat: 32, lon: 52, type: 'VICTIM', ip: '185.220.101.5', status: 'COMPROMISED' },
  { id: 'dub', name: 'Dublin Infra Hub', country: 'Ireland', lat: 30, lon: 47, type: 'HUB', ip: '198.51.89.90', status: 'SAFE' },
  { id: 'ams', name: 'Amsterdam VPN Relay', country: 'Netherlands', lat: 31, lon: 50, type: 'PROXY', ip: '104.244.42.1', status: 'QUARANTINED' },
  { id: 'spb', name: 'St. Petersburg Bot', country: 'Russia', lat: 26, lon: 61, type: 'ATTACKER', ip: '45.142.214.18', status: 'ATTACK_ORIGIN' },
  { id: 'sao', name: 'São Paulo Regional', country: 'Brazil', lat: 72, lon: 34, type: 'HUB', ip: '177.54.120.3', status: 'SAFE' },
  { id: 'tyo', name: 'Tokyo Edge Gateway', country: 'Japan', lat: 39, lon: 86, type: 'HUB', ip: '203.0.113.88', status: 'SAFE' },
  { id: 'lon', name: 'London SecOps Hub', country: 'United Kingdom', lat: 31, lon: 48, type: 'HUB', ip: '203.0.113.12', status: 'SAFE' }
];

export const GlobalAttackMapModal: React.FC<GlobalAttackMapModalProps> = ({
  isOpen,
  onClose,
  currentScenario,
  travelVelocityKmH
}) => {
  const [selectedNode, setSelectedNode] = useState<MapLocation>(GLOBAL_NODES[2]); // Default to Frankfurt
  const [radarAngle, setRadarAngle] = useState<number>(0);
  const [flightProgress, setFlightProgress] = useState<number>(0.75);

  // Radar sweep animation loop
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
      setFlightProgress((prev) => (prev >= 1 ? 0 : prev + 0.02));
    }, 40);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // Active flight path endpoints (San Francisco -> Frankfurt)
  const sfNode = GLOBAL_NODES[0];
  const fraNode = GLOBAL_NODES[2];

  // Calculate mid-curve control point for curved SVG flight path
  const midX = (sfNode.lon + fraNode.lon) / 2;
  const midY = Math.min(sfNode.lat, fraNode.lat) - 18; // curve upwards

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn select-none">
      <div className="w-full max-w-5xl bg-[#0e131d]/95 border border-sky-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-sm">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight font-sans">
                  Global Identity Threat & Velocity Topology
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Real-time Haversine distance, cross-border token hops, and supersonic login velocity tracking.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white transition-all hover:bg-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Map Canvas + Telemetry HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-y-auto">
          
          {/* Main Map View (8 cols) */}
          <div className="lg:col-span-8 bg-[#090d15] rounded-2xl border border-white/[0.06] p-4 relative overflow-hidden flex flex-col justify-between">
            
            {/* Map Top Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/[0.06] pb-2 mb-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>GLOBAL RADAR: <strong className="text-emerald-300">SWEEPING 360°</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span>SCENARIO: <strong className="text-sky-300">{currentScenario}</strong></span>
                <span>COORD SYSTEM: <strong className="text-slate-300">WGS84</strong></span>
              </div>
            </div>

            {/* SVG Interactive Map Area */}
            <div className="relative w-full aspect-[16/9] bg-[#070a10] rounded-xl border border-white/[0.04] overflow-hidden my-auto">
              
              {/* Radar circular sweeps */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: `conic-gradient(from ${radarAngle}deg at 50% 50%, rgba(56, 189, 248, 0.4) 0deg, transparent 60deg, transparent 360deg)`
                }}
              />

              {/* Grid concentric rings */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#38bdf8" strokeDasharray="3 3" />
                <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#38bdf8" strokeDasharray="3 3" />
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#38bdf8" strokeDasharray="2 4" />
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#38bdf8" strokeDasharray="2 4" />
              </svg>

              {/* Continents Outline Background (stylized dots matrix) */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* SVG Flight Arcs and Trajectories */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="velocityArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Arc: San Francisco -> Frankfurt */}
                <path
                  d={`M ${sfNode.lon}% ${sfNode.lat}% Q ${midX}% ${midY}% ${fraNode.lon}% ${fraNode.lat}%`}
                  fill="none"
                  stroke="url(#velocityArcGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  filter="url(#glow)"
                  className="animate-pulse"
                />

                {/* Secondary Arc: St. Petersburg -> Frankfurt */}
                <path
                  d={`M ${GLOBAL_NODES[5].lon}% ${GLOBAL_NODES[5].lat}% Q 56% 22% ${fraNode.lon}% ${fraNode.lat}%`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />

                {/* Tertiary Arc: Amsterdam -> London */}
                <path
                  d={`M ${GLOBAL_NODES[4].lon}% ${GLOBAL_NODES[4].lat}% L ${GLOBAL_NODES[8].lon}% ${GLOBAL_NODES[8].lat}%`}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  opacity="0.7"
                />
              </svg>

              {/* Interactive Node Markers */}
              {GLOBAL_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isThreat = node.status === 'COMPROMISED' || node.status === 'ATTACK_ORIGIN';

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ left: `${node.lon}%`, top: `${node.lat}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20 cursor-pointer"
                  >
                    {/* Pulsing ring for threat or selected */}
                    {(isThreat || isSelected) && (
                      <span className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                        isThreat ? 'bg-rose-500' : 'bg-sky-400'
                      }`}></span>
                    )}

                    {/* Node Core Orb */}
                    <div className={`w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 flex items-center justify-center ${
                      isSelected 
                        ? 'scale-125 ring-2 ring-white' 
                        : 'group-hover:scale-110'
                    } ${
                      node.status === 'COMPROMISED'
                        ? 'bg-rose-600 border-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.8)]'
                        : node.status === 'ATTACK_ORIGIN'
                        ? 'bg-amber-600 border-amber-300'
                        : node.status === 'QUARANTINED'
                        ? 'bg-purple-600 border-purple-300'
                        : 'bg-emerald-600 border-emerald-300'
                    }`}>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>

                    {/* Node Label Tooltip */}
                    <div className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-mono border backdrop-blur-md transition-opacity pointer-events-none ${
                      isSelected
                        ? 'bg-[#0f172a]/95 text-white border-sky-400/60 shadow-lg opacity-100 z-30'
                        : 'bg-black/80 text-slate-300 border-white/10 opacity-70 group-hover:opacity-100'
                    }`}>
                      {node.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}

              {/* Flying Kinematic Anomaly Indicator */}
              <div 
                className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-rose-950/90 border border-rose-500/60 px-2 py-0.5 rounded-full text-[9px] font-mono text-rose-300 shadow-[0_0_14px_rgba(244,63,94,0.6)]"
                style={{
                  left: `${sfNode.lon + (fraNode.lon - sfNode.lon) * flightProgress}%`,
                  top: `${sfNode.lat + (fraNode.lat - sfNode.lat) * flightProgress - Math.sin(flightProgress * Math.PI) * 14}%`
                }}
              >
                <Plane className="w-3 h-3 text-rose-400 animate-pulse" />
                <span>MACH 7.1 ({travelVelocityKmH > 0 ? travelVelocityKmH.toLocaleString() : '8,820'} km/h)</span>
              </div>

            </div>

            {/* Map Bottom Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Verified Office
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Compromised Victim
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Threat Ingress
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> Quarantined Relay
                </span>
              </div>
              <div className="text-slate-400">
                Click any coordinate pin to inspect telemetry payload
              </div>
            </div>

          </div>

          {/* Right Inspector & Kinematic Calculation HUD (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            
            {/* Selected Node Inspector Card */}
            <div className="p-4 rounded-2xl bg-[#0a0e17] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    SELECTED COORDINATE
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    selectedNode.status === 'COMPROMISED'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : selectedNode.status === 'ATTACK_ORIGIN'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {selectedNode.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-sans">{selectedNode.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedNode.country} • Node Type: {selectedNode.type}</p>

                {/* Metrics 2x2 */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[9px] font-mono text-slate-400">INGRESS IP</div>
                    <div className="text-xs font-mono font-bold text-sky-300 mt-0.5">{selectedNode.ip}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[9px] font-mono text-slate-400">PROTOCOL</div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">TLS 1.3 / OCSF</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[9px] font-mono text-slate-400">LATENCY</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">&lt; 38ms Edge</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[9px] font-mono text-slate-400">DEFENSE VERDICT</div>
                    <div className={`text-xs font-mono font-bold mt-0.5 ${
                      selectedNode.status === 'COMPROMISED' ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {selectedNode.status === 'COMPROMISED' ? 'CONTAINED' : 'TRUSTED'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Haversine Kinematic Physics Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 via-[#101522] to-[#0a0e17] border border-rose-500/30 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">
                    HAVERSINE VELOCITY ENGINE
                  </span>
                </div>

                <div className="space-y-2 text-[11px] text-slate-300 font-sans leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[10px] space-y-1">
                    <div className="text-slate-400">Δt (Time Delta): <strong className="text-white">8.2 minutes</strong></div>
                    <div className="text-slate-400">Δd (Great-Circle): <strong className="text-white">9,120 km</strong></div>
                    <div className="text-slate-400">Max Passenger Jet: <strong className="text-slate-300">~850 km/h</strong></div>
                    <div className="text-rose-400 font-bold">Calculated Velocity: 8,820 km/h (10.3x threshold)</div>
                  </div>

                  <p className="text-slate-400 text-[10.5px]">
                    Conclusion: Consecutive logins violate the physical laws of human transport. Token was exfiltrated and replayed by an adversary in Frankfurt.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-rose-500/20 flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Session Revoked</span>
                </span>
                <span className="text-slate-400">Latency: 32ms</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
