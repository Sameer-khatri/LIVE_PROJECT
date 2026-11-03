import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { 
  Users, Key, ShieldAlert, Lock, Laptop, Globe, 
  AlertTriangle, Clock, Search, ClipboardList, Database,
  Plus, Minus, Filter, ArrowUpDown, Sparkles,
  Compass, Zap, ChevronRight, CheckCircle2, Fingerprint, FileCheck
} from 'lucide-react';
import { 
  AnalyzerCategory, 
  AnalyzerEntityNode 
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

  // References for dynamic coordinate measurement
  const containerRef = useRef<HTMLDivElement>(null);
  const rootOrbRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const entityRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Dynamic connection path state
  const [connections, setConnections] = useState<{
    rootToCategory: { x1: number; y1: number; x2: number; y2: number } | null;
    categoryToEntities: { id: string; x1: number; y1: number; x2: number; y2: number; isSelected: boolean }[];
  }>({ rootToCategory: null, categoryToEntities: [] });

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
      case 'Fingerprint': return <Fingerprint className="w-3.5 h-3.5" />;
      case 'FileCheck': return <FileCheck className="w-3.5 h-3.5" />;
      default: return <ClipboardList className="w-3.5 h-3.5" />;
    }
  };

  // Filter entities by search query
  const filteredEntities = selectedCategory.entities.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Recalculate dynamic SVG connection points based on exact DOM node positions
  const recalculateConnections = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    // 1. Root Orb to Active Category
    let rootToCategory: { x1: number; y1: number; x2: number; y2: number } | null = null;
    const activeCatEl = categoryRefs.current[selectedCategory.id];

    if (rootOrbRef.current && activeCatEl) {
      const rootRect = rootOrbRef.current.getBoundingClientRect();
      const catRect = activeCatEl.getBoundingClientRect();

      rootToCategory = {
        x1: (rootRect.right - containerRect.left) / zoomLevel,
        y1: (rootRect.top + rootRect.height / 2 - containerRect.top) / zoomLevel,
        x2: (catRect.left - containerRect.left) / zoomLevel,
        y2: (catRect.top + catRect.height / 2 - containerRect.top) / zoomLevel
      };
    }

    // 2. Active Category to Child Entities
    const categoryToEntities: { id: string; x1: number; y1: number; x2: number; y2: number; isSelected: boolean }[] = [];

    if (activeCatEl) {
      const catRect = activeCatEl.getBoundingClientRect();
      const startX = (catRect.right - containerRect.left) / zoomLevel;
      const startY = (catRect.top + catRect.height / 2 - containerRect.top) / zoomLevel;

      filteredEntities.forEach((ent) => {
        const entEl = entityRefs.current[ent.id];
        if (entEl) {
          const entRect = entEl.getBoundingClientRect();
          categoryToEntities.push({
            id: ent.id,
            x1: startX,
            y1: startY,
            x2: (entRect.left - containerRect.left) / zoomLevel,
            y2: (entRect.top + entRect.height / 2 - containerRect.top) / zoomLevel,
            isSelected: selectedEntity?.id === ent.id
          });
        }
      });
    }

    setConnections({ rootToCategory, categoryToEntities });
  };

  // Run calculation on category change, entity select, zoom, search, and resize
  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      recalculateConnections();
    });
    return () => cancelAnimationFrame(timer);
  }, [selectedCategory.id, selectedEntity?.id, filteredEntities.length, zoomLevel, searchQuery]);

  useEffect(() => {
    const handleResize = () => recalculateConnections();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedCategory.id, zoomLevel]);

  return (
    <div className="relative flex-1 h-full min-h-[660px] flex flex-col overflow-hidden select-none">
      
      {/* Top Toolbar (Exact match to reference top controls) */}
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
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04]">
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
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.04] text-xs text-slate-300 hover:text-white transition-colors">
            <Filter className="w-3.5 h-3.5 text-sky-400" />
            <span className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-bold flex items-center justify-center">1</span>
          </button>

          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.04] text-xs text-slate-300 hover:text-white transition-colors">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center">2</span>
          </button>
        </div>

        {/* Search input in the graph canvas */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people, devices, or locations..."
            className="w-48 sm:w-64 bg-white/[0.04] rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-all"
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
          <span>Currently Viewing:</span>
          <span className="text-white font-medium">{selectedCategory.title}</span>
        </div>

      </div>

      {/* Main Graph Exploration Canvas (SVG + Node Layout) */}
      <div className="flex-1 relative overflow-auto p-8">
        <div 
          ref={containerRef}
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
          className="min-w-[1100px] min-h-[640px] flex items-center gap-12 relative transition-transform duration-200"
        >
          
          {/* ============================================================== */}
          {/* DYNAMIC SVG FIBER-OPTIC CONNECTIONS LAYER                     */}
          {/* ============================================================== */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
              <linearGradient id="fiberGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
              </linearGradient>

              <linearGradient id="fiberSkyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* 1. Root to Selected Category Curved Line */}
            {connections.rootToCategory && (
              <g>
                {(() => {
                  const { x1, y1, x2, y2 } = connections.rootToCategory;
                  const dx = Math.abs(x2 - x1) * 0.5;
                  const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

                  return (
                    <>
                      {/* Background base path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#334155"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                      />
                      {/* Animated glowing fiber */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.75"
                        className="animate-flow-dash"
                      />
                      {/* Connecting anchor dots */}
                      <circle cx={x1} cy={y1} r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1" />
                      <circle cx={x2} cy={y2} r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                    </>
                  );
                })()}
              </g>
            )}

            {/* 2. Selected Category to Child Entities Bouquet */}
            {connections.categoryToEntities.map((conn) => {
              const { id, x1, y1, x2, y2, isSelected } = conn;
              const isHovered = hoveredEntityId === id;
              const dx = Math.abs(x2 - x1) * 0.55;
              const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

              return (
                <g key={id}>
                  {/* Subtle delicate curve (Reference Bouquet Style) */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={
                      isSelected 
                        ? '#38bdf8' 
                        : isHovered 
                        ? '#94a3b8' 
                        : 'rgba(51, 65, 85, 0.45)'
                    }
                    strokeWidth={isSelected ? '2' : isHovered ? '1.5' : '1'}
                    className="transition-colors duration-200"
                  />

                  {/* Flowing electric pulse on selected or hovered branches */}
                  {(isSelected || isHovered) && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? '#38bdf8' : '#e2e8f0'}
                      strokeWidth={isSelected ? '2' : '1.5'}
                      className="animate-flow-dash"
                    />
                  )}

                  {/* Destination anchor dot at left of child card */}
                  <circle
                    cx={x2}
                    cy={y2}
                    r={isSelected ? '3.5' : '2.5'}
                    fill={isSelected ? '#38bdf8' : '#64748b'}
                    stroke={isSelected ? '#ffffff' : 'none'}
                    strokeWidth={isSelected ? '1' : '0'}
                  />
                </g>
              );
            })}

            {/* Origin Anchor Node on Right Edge of Active Category */}
            {connections.categoryToEntities.length > 0 && (
              <circle
                cx={connections.categoryToEntities[0].x1}
                cy={connections.categoryToEntities[0].y1}
                r="4.5"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="shadow-md"
              />
            )}
          </svg>

          {/* ============================================================== */}
          {/* FAR LEFT: ROOT NODE (Planetary Iris Orb - Reference Match!)    */}
          {/* ============================================================== */}
          <div className="relative flex flex-col items-center justify-center flex-shrink-0 w-64 z-20">
            <div 
              ref={rootOrbRef}
              className="w-56 h-56 rounded-full bg-[#0a0f19] border border-slate-800/80 flex items-center justify-center shadow-2xl relative group cursor-pointer"
            >
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
                  SAVED ARCHIVE
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  Company Security History
                </span>
              </div>

              {/* Badges beneath core orb */}
              <div className="absolute bottom-6 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#151c28] border border-slate-700 text-slate-300">
                  1,428 Records Saved
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
                  ref={(el) => (categoryRefs.current[cat.id] = el)}
                  onClick={() => onSelectCategory(cat)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                    isActive
                      ? 'bg-dark-card border-amber-400 text-white shadow-lg ring-1 ring-amber-400/60 translate-x-1.5 z-30'
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
          <div className="flex flex-col gap-2 flex-1 min-w-[320px] max-w-[420px] z-20 relative pl-6">
            
            {/* Header tag */}
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span>SAVED RECORDS FOR:</span>
                <span className="text-white font-bold">{selectedCategory.title}</span>
              </div>
              <span className="text-[10px] text-sky-400 font-mono">
                {filteredEntities.length} RECORDS
              </span>
            </div>

            {filteredEntities.map((entity) => {
              const isSelected = selectedEntity?.id === entity.id;

              return (
                <div
                  key={entity.id}
                  ref={(el) => (entityRefs.current[entity.id] = el)}
                  onClick={() => onSelectEntity(entity)}
                  onMouseEnter={() => setHoveredEntityId(entity.id)}
                  onMouseLeave={() => setHoveredEntityId(null)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-dark-card border-sky-400 text-white shadow-lg ring-1 ring-sky-400/60 translate-x-1.5 z-30'
                      : 'bg-dark-card/60 border-dark-border text-slate-300 hover:border-slate-500 hover:bg-dark-card hover:translate-x-1'
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
