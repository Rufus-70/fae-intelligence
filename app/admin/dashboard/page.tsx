// app/admin/dashboard/page.tsx
'use client'; // Essential for useState, useCallback

import React, { useState, useCallback } from 'react';
import BlueprintView from './components/BlueprintView'; // Adjusted path
import { initialBlueprintData } from '../data/blueprintData'; // Adjusted path
import MonitoringSection from './components/MonitoringSection'; // Adjusted path
import Sidebar from './components/Sidebar'; // Adjusted path (this is the dashboard's specific sidebar)
import { BlueprintData, Activity, ViewName, Phase } from '../types'; // Adjusted path, ensure ViewName is also in types

// Assuming ViewName is part of the dashboard's specific types now.
// If ViewName is not in ../types, it needs to be added there.
// For example: export type ViewName = 'blueprint' | 'crm' | 'finance' | 'projects' | 'clients' | 'tasks';

export default function ConsultancyDashboardPage() { // Changed component name for clarity as a Next.js page
  const [currentBlueprintData, setCurrentBlueprintData] = useState<BlueprintData>(initialBlueprintData);
  const [activeView, setActiveView] = useState<ViewName>('blueprint');

  const handleUpdateActivity = useCallback((phaseId: string, activityId: string, updatedActivityData: Partial<Activity>) => {
    setCurrentBlueprintData(prevData => {
      const newPhases = prevData.phases.map(phase => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            // Assuming 'keyActivities' was a typo and it should be 'activities' as per types/index.ts
            activities: phase.activities.map(activity => {
              if (activity.id === activityId) {
                return { ...activity, ...updatedActivityData };
              }
              return activity;
            }),
          };
        }
        return phase;
      });
      return { ...prevData, phases: newPhases };
    });
  }, []);

  const PlaceholderView: React.FC<{ viewName: string }> = ({ viewName }) => (
    <div className="text-center py-10">
      <h2 className="text-2xl font-semibold text-sky-300">
        {viewName.charAt(0).toUpperCase() + viewName.slice(1)} Section
      </h2>
      <p className="text-slate-400 mt-2">This area is under construction. Content coming soon!</p>
      <div className="mt-8 text-6xl text-slate-600">
        {viewName === 'CRM' && '👥'}
        {viewName === 'Finance' && '💰'}
        {viewName === 'Projects' && '🏗️'}
        {viewName === 'Clients' && '🧑‍💼'}
        {viewName === 'Tasks' && '✅'}
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      case 'blueprint':
        return (
          <>
            <BlueprintView
              phases={currentBlueprintData.phases}
              onUpdateActivity={handleUpdateActivity}
            />
            <MonitoringSection
              // Assuming monitoringTips is part of BlueprintData in types/index.ts
              // If not, this will need adjustment or removal.
              // For now, let's assume it's an empty array or defined in the type.
              title="Monitoring Your Progress & Fighting Squirrels"
              tips={currentBlueprintData.monitoringTips || []}
            />
          </>
        );
      case 'crm': return <PlaceholderView viewName="CRM" />;
      case 'finance': return <PlaceholderView viewName="Finance" />;
      case 'projects': return <PlaceholderView viewName="Projects" />;
      case 'clients': return <PlaceholderView viewName="Clients" />;
      case 'tasks': return <PlaceholderView viewName="Tasks" />;
      default:
        return <p className="text-center py-10 text-slate-400">Select a view from the sidebar or an unexpected view was selected.</p>;
    }
  };

  return (
    <div className="flex flex-1">
      <Sidebar activeView={activeView} setActiveView={setActiveView} projectTitle={currentBlueprintData.projectName} phases={currentBlueprintData.phases} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 md:p-6 text-center border-b border-slate-700 shadow-lg bg-slate-800">
          <h1 className="text-3xl md:text-4xl font-bold text-sky-400">
            {currentBlueprintData.projectName || "Consultancy Strategic Blueprint"}
          </h1>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-12 bg-slate-900">
          {renderActiveView()}
        </main>
        <footer className="py-6 text-center text-slate-400 border-t border-slate-700 bg-slate-800">
          <p>&copy; {new Date().getFullYear()} Fae Intelligence. Stay Productive.</p>
        </footer>
      </div>
    </div>
  );
}
