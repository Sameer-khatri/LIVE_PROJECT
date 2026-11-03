import React, { useState } from 'react';
import { 
  Users, Key, ShieldAlert, Lock, Laptop, Globe, 
  AlertTriangle, Clock, Search, ClipboardList, Database,
  Plus, Minus, Filter, ArrowUpDown, Maximize2, Sparkles,
  ChevronRight, Compass, Zap
} from 'lucide-react';
import { 
  AnalyzerCategory, 
  AnalyzerEntityNode, 
  AnalyzerSubBranch, 
  RootIntelligenceSummary 
} from '../../types/analyzer';
import { ROOT_SUMMARY, ANALYZER_CATEGORIES } from '../../data/analyzerData';

interface AnalyzerCanvasProps {
  onSelectEntity: (entity: AnalyzerEntityNode) => void;
  onSelectCategory: (category: AnalyzerCategory) => void;
  selectedEntity: AnalyzerEntityNode | null;
  selectedCategory: AnalyzerCategory;
}

export const AnalyzerCanvas: React.FC<AnalyzerCanvasProps> = ({
  onSelectEntity,
  onSelectCategory,
  selectedEntity,
  selectedCategory
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredEntityId, setHoveredEntityId] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-3.5 h-3.5" />;
      case 'Key': return <Key className="w-3.5 h-3.5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'Lock': return <Lock className="w-3.5 h-3.5" />;
      case 'Laptop': return <Laptop className="w-3.5 h-3.5" />;
      case 'Globe': return <Globe className="w-3.5 h-3.5" />;
      case 'AlertTriangle': return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'Clock': return <Clock className="w-3.5 h-3.5" />;
      case 'Search': return <Search className="w-3.5 h-3.5" />;
      default: return <ClipboardList className="w-3.5 h-3.5" />;
    }
  };

  // Filter entities by search query
  const filteredEntities = selectedCategory.entities.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex-1 h-full min-h-[660px] flex flex-col overflow-hidden select-none">
      
      {/* Top Toolbar (Reference match) */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-dark-borderSubtle bg-dark-inset/80 backdrop-blur-md z-30">
        
        {/* Left Toolbar Icons */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-card border border-dark-border">
            <button className="p-1.5 rounded-lg bg-[#222c3d] text-white hover:text-white" title="Graph View">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
            </button>
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-card" title="Tree View">
              <Database className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-dark-card border border-dark-border">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(1.3, Number((prev + 0.1).toFixed(1))))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white active:scale-95" 
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-400 font-mono px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(0.7, Number((prev - 0.1).toFixed(1))))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white active:scale-95" 
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter & Sort with badge counters */}
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-dark-card border border-dark-border text-xs text-slate-300 hover:text-white hover:border-slate-600 transition-colors">
            <Filter className="w-3.5 h-3.5 text-sky-400" />
            <span className="w-4 h-4 rounded-full bg-sky-950 text-sky-400 border border-sky-800 text-[10px] font-bold flex items-center justify-center">1</span>
          </button>

          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-dark-card border border-dark-border text-xs text-slate-300 hover:text-white hover:border-slate-600 transition-colors">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span className="w-4 h-4 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold flex items-center justify-center">2</span>
          </button>
        </div>

        {/* Search input in the graph canvas */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stored nodes..."
            className="w-48 sm:w-64 bg-dark-card border border-dark-border rounded-full pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-[10px] text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sub-pill breadcrumb matching reference header */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-card border border-dark-border text-[11px] text-slate-400">
          <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>Active Investigation:</span>
          <span className="text-white font-medium">{selectedCategory.title}</span>
        </div>

      </div>

      {/* Main Graph Exploration Canvas (SVG + Node Layout) */}
      <div 
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
        className="flex-1 relative overflow-auto p-8 transition-transform duration-200"
      >
        <div className="min-w-[1040px] min-h-[600px] flex items-center gap-10 relative">
          
          {/* ============================================================== */}
          {/* SVG Curved Connections Layer (Smooth Bezier Cables)          */}
          {/* ============================================================== */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
              <linearGradient id="fiberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting fibers from Root Orb to active Category */}
            <path
              d="M 230 300 C 290 300, 310 300, 360 300"
              fill="none"
              stroke="#334155"
              strokeWidth="2"
            />
            <path
              d="M 230 300 C 290 300, 310 300, 360 300"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              className="animate-flow-dash opacity-90"
            />

            {/* Radiant curved fan-out fibers from Category to Entities */}
            {filteredEntities.map((_, idx) => {
              const startX = 600;
              const startY = 300;
              const total = filteredEntities.length;
              const targetY = 80 + (idx * 520) / Math.max(1, total - 1);
              const targetX = 680;
              const isHovered = hoveredEntityId === filteredEntities[idx].id;
              const isSelected = selectedEntity?.id === filteredEntities[idx].id;

              return (
                <g key={idx}>
                  <path
                    d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${targetX - 40} ${targetY}, ${targetX} ${targetY}`}
                    fill="none"
                    stroke={isSelected ? '#38bdf8' : (isHovered ? '#64748b' : '#232d3d')}
                    strokeWidth={isSelected ? '2' : '1'}
                    className="transition-colors duration-200"
                  />
                  {(isSelected || isHovered) && (
                    <path
                      d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${targetX - 40} ${targetY}, ${targetX} ${targetY}`}
                      fill="none"
                      stroke={isSelected ? '#38bdf8' : '#cbd5e1'}
                      strokeWidth="1.5"
                      className="animate-flow-dash"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* ============================================================== */}
          {/* FAR LEFT: ROOT NODE (Planetary Iris Orb - Reference Match!)    */}
          {/* ============================================================== */}
          <div className="relative flex flex-col items-center justify-center flex-shrink-0 w-64 z-20">
            
            {/* Outer planetary dark aura ring */}
            <div className="w-56 h-56 rounded-full bg-[#0a0f19] border border-slate-800/80 flex items-center justify-center shadow-2xl relative group cursor-pointer">
              <div className="absolute inset-0 rounded-full border border-slate-700/60 animate-orbit opacity-40"></div>
              
              {/* Radiating Iris / Ring effect around core orb */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600/30 via-sky-500/30 to-rose-500/20 flex items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.35)] relative">
                {/* Core Glowing Orb */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-400 to-sky-300 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5 text-slate-950 font-bold" />
                </div>
              </div>

              {/* Title inside planetary circle */}
              <div className="absolute top-6 text-center px-4">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  ROOT INTELLIGENCE
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  Stored Security Database
                </span>
              </div>

              {/* Badges beneath core orb */}
              <div className="absolute bottom-6 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#151c28] border border-slate-700 text-slate-300">
                  1,428 Records
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* GENERATION 1: CATEGORY CARDS (Vertical Stack)                 */}
          {/* ============================================================== */}
          <div className="flex flex-col gap-2 w-56 flex-shrink-0 z-20">
            {ANALYZER_CATEGORIES.map((cat) => {
              const isActive = selectedCategory.id === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-dark-card border-amber-400 text-white shadow-lg ring-1 ring-amber-400/60 translate-x-1.5'
                      : 'bg-dark-card/60 border-dark-border text-slate-300 hover:border-slate-600 hover:bg-dark-card hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                      {getCategoryIcon(cat.iconName)}
                    </span>
                    <span className="text-xs font-semibold truncate">
                      {cat.title}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : 'bg-dark-inset text-slate-400 border border-dark-border'
                  }`}>
                    {cat.count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ============================================================== */}
          {/* GENERATION 2: RADIAL FAN-OUT NODES (Curved Bouquet)           */}
          {/* ============================================================== */}
          <div className="flex flex-col gap-2 flex-1 min-w-[290px] z-20 relative pl-4">
            
            {/* Header tag */}
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span>STORED ENTITIES FOR:</span>
                <span className="text-white font-bold">{selectedCategory.title}</span>
              </div>
              <span className="text-[10px] text-sky-400 font-mono">
                {filteredEntities.length} NODES
              </span>
            </div>

            {filteredEntities.map((entity) => {
              const isSelected = selectedEntity?.id === entity.id;

              return (
                <div
                  key={entity.id}
                  onClick={() => onSelectEntity(entity)}
                  onMouseEnter={() => setHoveredEntityId(entity.id)}
                  onMouseLeave={() => setHoveredEntityId(null)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-dark-card border-sky-400 text-white shadow-lg ring-1 ring-sky-400/60 translate-x-1.5'
                      : 'bg-dark-card/50 border-dark-border text-slate-300 hover:border-slate-500 hover:bg-dark-card hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-sky-400 animate-ping' : 'bg-sky-400'
                    }`}></span>
                    <div>
                      <div className="text-xs font-semibold text-white truncate">{entity.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{entity.subtitle}</div>
                    </div>
                  </div>

                  {entity.badge && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase transition-all ${
                      entity.severity === 'CRITICAL'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                        : entity.severity === 'HIGH'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                        : 'bg-dark-inset text-slate-300 border border-dark-border'
                    }`}>
                      {entity.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
};
