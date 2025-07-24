
import React from 'react';
import { Phase, Activity } from '../types';
import { PhaseCard } from './PhaseCard';

interface BlueprintViewProps {
  phases: Phase[];
  onUpdateActivity: (phaseId: string, activityId: string, updatedActivityData: Partial<Activity>) => void;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({ phases, onUpdateActivity }) => {
  return (
    <section aria-labelledby="blueprint-phases-title">
      <h2 id="blueprint-phases-title" className="sr-only">Blueprint Phases</h2>
      <div className="space-y-10">
        {phases.map((phase, index) => (
          <PhaseCard 
            key={phase.id} 
            phase={phase} 
            phaseNumber={index} 
            onUpdateActivity={onUpdateActivity}
          />
        ))}
      </div>
    </section>
  );
};