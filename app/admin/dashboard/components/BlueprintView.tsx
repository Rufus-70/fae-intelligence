// app/admin/dashboard/components/BlueprintView.tsx
import React from 'react';
import { Phase, Activity } from '../types'; // Corrected import path
import PhaseCard from './PhaseCard'; // Corrected import path

interface BlueprintViewProps {
  phases: Phase[];
  onUpdateActivity: (phaseId: string, activityId: string, updatedActivityData: Partial<Activity>) => void;
}

const BlueprintView: React.FC<BlueprintViewProps> = ({ phases, onUpdateActivity }) => {
  if (!phases || phases.length === 0) {
    return <p className="text-center text-slate-400 py-8">No phases defined in the blueprint yet.</p>;
  }

  return (
    <section aria-labelledby="blueprint-title" className="space-y-8">
      {/* <h2 id="blueprint-title" className="text-2xl font-semibold text-sky-300 sr-only">Project Blueprint</h2> */}
      {phases.map(phase => (
        <PhaseCard
          key={phase.id}
          phase={phase}
          onUpdateActivity={onUpdateActivity}
        />
      ))}
    </section>
  );
};

export default BlueprintView;
