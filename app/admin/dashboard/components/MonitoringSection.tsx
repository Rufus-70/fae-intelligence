// app/admin/dashboard/components/MonitoringSection.tsx
import React from 'react';
import { MonitoringPoint } from '../types'; // Corrected import path
import { Card } from '@/app/components/ui/card'; // Updated import path

// Placeholder for MonitoringTip type, ideally this would be in ../types/index.ts
interface MonitoringTip {
  id: string;
  content: string;
  category: 'efficiency' | 'risk' | 'quality'; // Example categories
}

interface MonitoringSectionProps {
  title: string;
  tips: MonitoringTip[]; // Assuming 'tips' are passed as props, as per example page.tsx
  // If 'phases' and 'selectedPhaseId' were intended to be used as per original dashboard,
  // those props and related types (Phase) would need to be added here.
  // For now, focusing on the 'tips' prop from the example.
}

const MonitoringSection: React.FC<MonitoringSectionProps> = ({ title, tips }) => {
  return (
    <Card className="bg-slate-800/50 shadow-xl p-4 md:p-6"> {/* Added padding as Card is just a div now */}
      <h3 className="text-xl font-semibold text-sky-300 mb-4">{title}</h3>
      {tips && tips.length > 0 ? (
        <ul className="space-y-3">
          {tips.map(tip => (
            <li key={tip.id} className="p-3 bg-slate-700/40 rounded-lg shadow">
              <p className="text-sm text-slate-300">{tip.content}</p>
              <span className="text-xs text-sky-400/70 capitalize mt-1 block">Category: {tip.category}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-400">No monitoring tips available at the moment.</p>
      )}
      {/* Placeholder for displaying actual monitoring points from phases if needed later */}
      {/* For example:
        {phases.find(p => p.id === selectedPhaseId)?.monitoringPoints.map(mp => (
          <div key={mp.id}>{mp.metric}: {mp.value}</div>
        ))}
      */}
    </Card>
  );
};

export default MonitoringSection;
