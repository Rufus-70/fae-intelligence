// app/admin/dashboard/components/Sidebar.tsx
import React from 'react';
import { ViewName, Phase } from '../types'; // Corrected import path

interface DashboardSidebarProps {
  activeView: ViewName;
  setActiveView: (view: ViewName) => void;
  projectTitle: string;
  phases: Phase[]; // For displaying phase-related navigation or info
}

// Define the views for the dashboard. Ensure ViewName in types/index.ts covers these.
const views: { name: ViewName; label: string; icon: string }[] = [
  { name: 'blueprint', label: 'Blueprint', icon: '🗺️' },
  { name: 'tasks', label: 'Tasks', icon: '✅' },
  { name: 'projects', label: 'Projects', icon: '🏗️' },
  { name: 'clients', label: 'Clients', icon: '🧑‍💼' },
  { name: 'crm', label: 'CRM', icon: '👥' },
  { name: 'finance', label: 'Finance', icon: '💰' },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeView, setActiveView, projectTitle, phases }) => {
  return (
    <aside className="w-72 bg-slate-800 text-white p-5 space-y-6 shadow-lg min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-sky-400 truncate" title={projectTitle}>
          {projectTitle || "Project Dashboard"}
        </h2>
        <p className="text-xs text-slate-400">Consultancy Toolkit</p>
      </div>

      <nav className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Main Views</h3>
        {views.map(view => (
          <button
            key={view.name}
            onClick={() => setActiveView(view.name)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ease-in-out
                        ${activeView === view.name
                          ? 'bg-sky-500 text-white shadow-md'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-sky-300'
                        }`}
          >
            <span className="text-lg">{view.icon}</span>
            <span>{view.label}</span>
          </button>
        ))}
      </nav>

      {phases && phases.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2">Project Phases</h3>
          <ul className="space-y-1">
            {phases.map(phase => (
              <li key={phase.id}>
                <a
                  href={`#phase-${phase.id}`} // Example link, could be onClick to scroll or select
                  onClick={(e) => {
                    e.preventDefault();
                    // Potentially set active view to blueprint and scroll to phase
                    setActiveView('blueprint');
                    // Add scroll logic if BlueprintView supports it
                    const element = document.getElementById(`phase-card-${phase.id}`); // Assuming PhaseCard has an id like this
                    if(element) element.scrollIntoView({ behavior: 'smooth' });
                    console.log(`Navigating to phase: ${phase.title}`);
                  }}
                  className="block px-3 py-1.5 text-xs text-slate-400 hover:text-sky-400 rounded-md hover:bg-slate-700/50 transition-colors"
                >
                  {phase.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
       <div className="pt-4 mt-auto border-t border-slate-700">
        <p className="text-xs text-slate-500">Fae Intelligence Dashboard</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
