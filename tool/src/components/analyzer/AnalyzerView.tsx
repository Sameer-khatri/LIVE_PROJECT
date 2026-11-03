import React, { useState } from 'react';
import { AnalyzerCanvas } from './AnalyzerCanvas';
import { InspectorPanel } from './InspectorPanel';
import { ANALYZER_CATEGORIES } from '../../data/analyzerData';
import { AnalyzerCategory, AnalyzerEntityNode } from '../../types/analyzer';

export const AnalyzerView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AnalyzerCategory>(ANALYZER_CATEGORIES[0]);
  const [selectedEntity, setSelectedEntity] = useState<AnalyzerEntityNode | null>(ANALYZER_CATEGORIES[0].entities[0]);

  const handleSelectCategory = (category: AnalyzerCategory) => {
    setSelectedCategory(category);
    if (category.entities.length > 0) {
      setSelectedEntity(category.entities[0]);
    } else {
      setSelectedEntity(null);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row gap-5 items-stretch min-h-[680px]">
      
      {/* Left Canvas: Horizontally Expanding Multi-Generation Graph (~70% width) */}
      <div className="flex-1 flex flex-col bg-dark-card/90 border border-dark-border rounded-3xl overflow-hidden backdrop-blur-2xl shadow-xl">
        <AnalyzerCanvas
          onSelectCategory={handleSelectCategory}
          onSelectEntity={(entity) => setSelectedEntity(entity)}
          selectedCategory={selectedCategory}
          selectedEntity={selectedEntity}
        />
      </div>

      {/* Right Fixed Inspector: Stored Intelligence Details Panel (~30% width) */}
      <InspectorPanel
        selectedEntity={selectedEntity}
        selectedCategory={selectedCategory}
      />

    </div>
  );
};

