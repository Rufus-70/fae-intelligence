import React from 'react';
import { Task, Project } from '../../../types';
import { Card } from '../../ui/Card';

interface TeamTasksViewProps {
  tasks: Task[];
  projects: Project[];
  // Add filters and handlers as needed later
}

export const TeamTasksView: React.FC<TeamTasksViewProps> = ({ tasks, projects }) => {
  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
      <h3 className="text-2xl font-semibold text-sky-300 mb-6">Team Tasks</h3>
      <div className="text-center py-10 bg-slate-800/40 backdrop-blur-sm rounded-lg shadow-inner min-h-[300px] flex flex-col justify-center items-center">
        <div className="text-6xl text-slate-500 mb-4">👨‍👩‍👧‍👦</div>
        <h4 className="text-xl font-semibold text-sky-400">Team Task Overview & Filters</h4>
        <p className="text-slate-400 mt-2">
          This section will display tasks across the team, with advanced filtering options.
        </p>
        <p className="text-sm text-slate-500 mt-1">(Under Development)</p>
         <p className="text-xs text-slate-400 mt-4">Currently showing {tasks.length} total tasks as a placeholder.</p>
      </div>
    </Card>
  );
};
