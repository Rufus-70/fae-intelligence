// app/admin/dashboard/components/PhaseCard.tsx
import React from 'react';
import { Phase, Activity } from '../types'; // Corrected import path
import ActivityItem from './ActivityItem'; // Corrected import path
import { Card } from '@/app/components/ui/card'; // Updated import path

interface PhaseCardProps {
  phase: Phase;
  onUpdateActivity: (phaseId: string, activityId: string, updatedActivityData: Partial<Activity>) => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onUpdateActivity }) => {
  const { id: phaseId, title, description, activities, monitoringPoints } = phase;

  const handleActivityStatusUpdate = (activityId: string, status: Activity['status']) => {
    onUpdateActivity(phaseId, activityId, { status });
  };

  return (
    <Card className="mb-6 bg-slate-800/60 shadow-lg hover:shadow-sky-500/20 transition-shadow duration-300 p-5"> {/* Added p-5 */}
      {/* <div className="p-5"> */} {/* This div is no longer needed as padding is on Card itself */}
        <h3 className="text-xl font-semibold text-sky-400 mb-2">{title}</h3>
        <p className="text-sm text-slate-400 mb-4">{description}</p>

        {activities && activities.length > 0 && (
          <>
            <h4 className="text-md font-medium text-sky-300/80 mb-2">Key Activities:</h4>
            <ul className="list-none p-0 mb-4 bg-slate-700/30 rounded-md overflow-hidden">
              {activities.map(activity => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  onUpdateStatus={handleActivityStatusUpdate}
                />
              ))}
            </ul>
          </>
        )}

        {monitoringPoints && monitoringPoints.length > 0 && (
          <>
            <h4 className="text-md font-medium text-sky-300/80 mb-2">Monitoring Points:</h4>
            <ul className="list-none p-0">
              {monitoringPoints.map(point => (
                <li key={point.id} className="text-xs text-slate-400 py-1 px-2 bg-slate-700/30 rounded mb-1 flex justify-between">
                  <span>{point.metric}:</span>
                  <span className="font-semibold text-sky-400/90">{point.value}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      {/* </div> */}
    </Card>
  );
};

export default PhaseCard;
