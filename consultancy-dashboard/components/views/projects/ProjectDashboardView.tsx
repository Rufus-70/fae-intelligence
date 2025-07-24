
import React from 'react';
import { Project, Task, ProjectFilterStatus, ProjectDashboardViewProps } from '../../../types';
import { Card } from '../../ui/Card';
import { MetricCard } from '../../ui/MetricCard'; // Updated import

const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return 'Invalid Date';
    }
  };

export const ProjectDashboardView: React.FC<ProjectDashboardViewProps> = ({ projects, tasks, onApplyFilter }) => {
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  
  const now = new Date();
  const overdueProjectsCount = projects.filter(p => 
    p.dueDate && new Date(p.dueDate).getTime() < now.setHours(0,0,0,0) && p.status !== 'Completed' && p.status !== 'Cancelled'
  ).length;

  const upcomingDeadlines = projects
    .filter(p => p.dueDate && new Date(p.dueDate) >= now && p.status !== 'Completed' && p.status !== 'Cancelled')
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  const metricCardData = [
    { title: "Total Projects", value: totalProjects, filter: 'All' as ProjectFilterStatus, icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6M9 20.25h6" /></svg>, colorClass: "text-blue-400" },
    { title: "Active Projects", value: activeProjects, filter: 'Active' as ProjectFilterStatus, icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z" /></svg>, colorClass: "text-green-400" },
    { title: "Completed", value: completedProjects, filter: 'Completed' as ProjectFilterStatus, icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068M15.75 21A9 9 0 1 0 4.25 12A9 9 0 0 0 15.75 21Z" /></svg>, colorClass: "text-teal-400" },
    { title: "Overdue", value: overdueProjectsCount, filter: 'Overdue' as ProjectFilterStatus, icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" /></svg>, colorClass: "text-red-400" }
  ];

  return (
    <div className="space-y-8">
      <section aria-labelledby="project-metrics-title">
        <h2 id="project-metrics-title" className="sr-only">Project Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricCardData.map(card => (
            <MetricCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              colorClass={card.colorClass}
              onClick={() => onApplyFilter(card.filter)}
              ariaLabel={`View ${card.filter.toLowerCase()} projects`}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="upcoming-deadlines-title">
        <Card className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-xl">
          <h2 id="upcoming-deadlines-title" className="text-xl font-semibold text-sky-300 mb-4">Upcoming Project Deadlines</h2>
          {upcomingDeadlines.length > 0 ? (
            <ul className="space-y-3">
              {upcomingDeadlines.map(project => (
                <li key={project.id} className="p-3 bg-slate-700/50 rounded-md shadow flex justify-between items-center">
                  <div>
                    <h4 className="text-md font-semibold text-white">{project.projectName}</h4>
                    <p className="text-xs text-slate-400">{project.clientName || 'Internal Project'}</p>
                  </div>
                  <span className="text-sm font-medium text-amber-400">{formatDate(project.dueDate)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl text-slate-500 mb-3">🎉</div>
              <p className="text-slate-400">No upcoming project deadlines. Time to plan!</p>
            </div>
          )}
        </Card>
      </section>
      
      <section aria-labelledby="more-summaries-title">
        <Card className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-xl min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl text-slate-500 mb-3">📊</div>
            <h2 id="more-summaries-title" className="text-xl font-semibold text-sky-300">Additional Summaries</h2>
            <p className="text-slate-400 mt-1">Project status charts and task distributions coming soon!</p>
          </div>
        </Card>
      </section>
    </div>
  );
};