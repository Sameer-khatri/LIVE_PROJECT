import React from 'react';
import { RadarWidget } from './RadarWidget';
import { CelestialArcGauge } from './CelestialArcGauge';
import { SessionTrendWidget } from './SessionTrendWidget';
import { RadarMetric, SatelliteAttackNode, TrendPoint, TelemetryState } from '../types/dashboard';

interface HeroSectionProps {
  telemetry?: TelemetryState;
  percentile?: number;
  radarMetrics: RadarMetric[];
  satelliteNodes: SatelliteAttackNode[];
  tokenHours?: number;
  excessHours?: number;
  trendPoints: TrendPoint[];
  onViewReport: () => void;
  onSelectNode?: (node: SatelliteAttackNode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  telemetry,
  percentile,
  radarMetrics,
  satelliteNodes,
  tokenHours,
  excessHours,
  trendPoints,
  onViewReport,
  onSelectNode
}) => {
  const actualPercentile = percentile ?? telemetry?.riskPercentile ?? 74;
  const actualTokenHours = tokenHours ?? telemetry?.tokenLifetimeHours ?? 4.8;
  const actualExcessHours = excessHours ?? telemetry?.policyExcessHours ?? 2.9;

  return (
    <div className="w-full bg-dark-card/90 border border-dark-border rounded-3xl p-5 backdrop-blur-xl mb-5 shadow-xl relative overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        
        {/* Left Widget: Radar Chart (4 cols on lg) */}
        <div className="lg:col-span-4 h-full flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-dark-border pb-4 lg:pb-0 lg:pr-4">
          <RadarWidget metrics={radarMetrics} />
        </div>

        {/* Center Widget: Celestial Arc Gauge (4.5 cols on lg) */}
        <div className="lg:col-span-5 h-full flex items-center justify-center py-1">
          <CelestialArcGauge
            percentile={actualPercentile}
            satelliteNodes={satelliteNodes}
            onSelectNode={onSelectNode}
          />
        </div>

        {/* Right Widget: Session Token & Trend Line (3.5 cols on lg) */}
        <div className="lg:col-span-3 h-full flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-dark-border pt-4 lg:pt-0 lg:pl-4">
          <SessionTrendWidget
            tokenHours={actualTokenHours}
            excessHours={actualExcessHours}
            trendPoints={trendPoints}
            onViewReport={onViewReport}
          />
        </div>

      </div>

    </div>
  );
};
