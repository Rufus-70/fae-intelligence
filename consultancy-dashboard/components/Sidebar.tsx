
import React from 'react';

// Updated ViewName to match App.tsx for consistency
type ViewName = 'blueprint' | 'clients' | 'projects' | 'tasks' | 'crm' | 'finance';

interface SidebarProps {
  activeView: ViewName;
  setActiveView: (view: ViewName) => void;
}

const NavItem: React.FC<{
  viewName: ViewName;
  currentView: ViewName;
  onClick: () => void;
  icon: React.ReactElement;
  label: string;
}> = ({ viewName, currentView, onClick, icon, label }) => {
  const isActive = viewName === currentView;
  return (
    <li>
      <button
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
                    ${isActive 
                      ? 'bg-[#38A169] text-white shadow-md'  // Updated: Success Green bg
                      : 'text-slate-200 hover:bg-[#102a4c] hover:text-white' // Updated: hover for Fae Blue variant
                    }`}
      >
        <span className="mr-3 h-6 w-6">{icon}</span>
        {label}
      </button>
    </li>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 h-screen bg-[#102a4c]/90 backdrop-blur-md p-5 space-y-6 shadow-2xl flex flex-col"> {/* Updated: Darker Fae Blue variant for sidebar bg */}
      <div className="pt-6 pb-4 text-center">
        <h2 className="text-2xl font-semibold text-white">My Dashboard</h2>
      </div>
      <nav className="flex-1 overflow-y-auto"> {/* Added overflow-y-auto */}
        <ul className="space-y-2">
          <NavItem
            viewName="blueprint"
            currentView={activeView}
            onClick={() => setActiveView('blueprint')}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12A2.25 2.25 0 0 0 20.25 14.25V3m-16.5 0h16.5M3.75 3c0-1.125.75-2.25 2.25-2.25h10.5A2.25 2.25 0 0 1 18.75 3v11.25A2.25 2.25 0 0 1 16.5 16.5h-1.875a.375.375 0 0 0-.375.375V18.75m0-1.875a.375.375 0 0 1 .375-.375h1.875m-1.875 0h-1.875a.375.375 0 0 0-.375.375V18.75m0-1.875h2.25A2.25 2.25 0 0 0 18.75 15V3M3.75 14.25V3" />
              </svg>
            }
            label="Strategic Blueprint"
          />
          <NavItem
            viewName="crm"
            currentView={activeView}
            onClick={() => setActiveView('crm')}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            }
            label="CRM"
          />
           <NavItem
            viewName="clients"
            currentView={activeView}
            onClick={() => setActiveView('clients')}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m8.117 0a7.47 7.47 0 0 0-3.06-.517M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            }
            label="Clients"
          />
          <NavItem
            viewName="projects"
            currentView={activeView}
            onClick={() => setActiveView('projects')}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6M9 20.25h6" />
              </svg>
            }
            label="Projects"
          />
          <NavItem
            viewName="finance"
            currentView={activeView}
            onClick={() => setActiveView('finance')}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.159c1.518 0 2.986.609 4.005 1.628A5.235 5.235 0 0 0 12 21.75a5.235 5.235 0 0 0 5.995-2.003 4.007 4.007 0 0 0 4.005-1.628c.303-.303.507-.655.507-1.026V6.321A2.25 2.25 0 0 0 19.5 4.071h-15A2.25 2.25 0 0 0 2.25 6.321v10.812c0 .371.204.723.507 1.026ZM9 12.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
              </svg>
            }
            label="Finance"
          />
           <NavItem
            viewName="tasks"
            currentView={activeView}
            onClick={() => setActiveView('tasks')}
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0A2.25 2.25 0 0 0 18 12h-1.75a2.25 2.25 0 0 0-2.25 2.25v1.5A2.25 2.25 0 0 0 16.25 18h.75m.75-1.5V18a2.25 2.25 0 0 1-2.25 2.25H9A2.25 2.25 0 0 1 6.75 18v-1.5m0 0V9A2.25 2.25 0 0 1 9 6.75h1.5" />
                </svg>
            }
            label="Tasks"
          />
        </ul>
      </nav>
      <div className="mt-auto p-2 text-center text-xs text-slate-400">
        Dashboard v0.1
      </div>
    </aside>
  );
};