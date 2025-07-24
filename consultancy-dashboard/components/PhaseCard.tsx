
import React from 'react';
import { Phase, Activity } from '../types';
import { ActivityItem } from './ActivityItem';
import { Card } from './ui/Card';

interface PhaseCardProps {
  phase: Phase;
  phaseNumber: number;
  onUpdateActivity: (phaseId: string, activityId: string, updatedActivityData: Partial<Activity>) => void;
}

const phaseColors = [
  "from-sky-500 to-blue-600", // Maintained for accent, text on these will be white
  "from-emerald-500 to-green-600",
  "from-amber-500 to-orange-600",
  "from-purple-500 to-indigo-600",
];

export const PhaseCard: React.FC<PhaseCardProps> = ({ phase, phaseNumber, onUpdateActivity }) => {
  const headerBgColor = phaseColors[phaseNumber % phaseColors.length];

  return (
    <Card className="overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 bg-[#F7FAFC]"> {/* Updated: Light Gray bg */}
      <div className={`p-6 bg-gradient-to-r ${headerBgColor} text-white`}> {/* Accent header remains */}
        <h3 className="text-2xl md:text-3xl font-bold mb-1">{phase.title}</h3>
        {phase.duration && (
          <p className="text-sm uppercase tracking-wider opacity-80 mb-3">{phase.duration}</p>
        )}
      </div>
      <div className="p-6"> {/* Removed dark bg for content within card */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#1B365D] mb-2">Objective:</h4> {/* Updated: Fae Blue title text */}
          <p className="text-[#4A5568] leading-relaxed">{phase.objective}</p> {/* Updated: Professional Gray text */}
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-[#1B365D] mb-4">Key Activities:</h4> {/* Updated: Fae Blue title text */}
          <div className="space-y-6">
            {phase.keyActivities.map((activity) => (
              <ActivityItem 
                key={activity.id} 
                activity={activity} 
                phaseId={phase.id}
                onUpdateActivity={onUpdateActivity}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};