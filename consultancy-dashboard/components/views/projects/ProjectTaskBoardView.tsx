
import React, { useState, useMemo, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority, Project, ProjectTaskBoardViewProps } from '../../../types';
import { Card } from '../../ui/Card';

interface TaskCardProps {
  task: Task;
}

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'Urgent': return 'border-red-500';
    case 'High': return 'border-orange-500';
    case 'Medium': return 'border-yellow-500';
    case 'Low': return 'border-sky-500';
    default: return 'border-slate-600';
  }
};

const TaskCardItem: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card className={`bg-slate-700 p-3 rounded-md shadow-md mb-3 border-l-4 ${getPriorityColor(task.priority)} hover:bg-slate-600/70 transition-colors duration-150 cursor-grab`}>
      <h4 className="text-sm font-semibold text-white mb-1">{task.title}</h4>
      {task.projectName && <p className="text-xs text-sky-400 mb-1">{task.projectName}</p>}
      {task.dueDate && <p className="text-xs text-slate-400 mb-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-slate-400">{task.assignedTo || 'Unassigned'}</span>
        {/* Placeholder for actions like edit/view task details */}
      </div>
    </Card>
  );
};

const taskStatuses: TaskStatus[] = ['To Do', 'In Progress', 'Review', 'Done'];

export const ProjectTaskBoardView: React.FC<ProjectTaskBoardViewProps> = ({ tasks, projects, externallySelectedProjectId }) => {
  const [internalSelectedProjectId, setInternalSelectedProjectId] = useState<string>('');

  // Effect to reset internal filter if an external one is removed or if component mounts without one.
  useEffect(() => {
    if (!externallySelectedProjectId) {
      setInternalSelectedProjectId(''); // Or set to a default if preferred
    }
  }, [externallySelectedProjectId]);
  
  const focusedProject = useMemo(() => {
    return externallySelectedProjectId ? projects.find(p => p.id === externallySelectedProjectId) : null;
  }, [externallySelectedProjectId, projects]);

  const filteredTasks = useMemo(() => {
    if (externallySelectedProjectId) {
      return tasks.filter(task => task.projectId === externallySelectedProjectId);
    }
    if (!internalSelectedProjectId || internalSelectedProjectId === '') {
      return tasks; // Show all tasks if no project is selected internally (and no external filter)
    }
    return tasks.filter(task => task.projectId === internalSelectedProjectId);
  }, [tasks, externallySelectedProjectId, internalSelectedProjectId]);

  const tasksByStatus = useMemo(() => {
    const grouped: { [key in TaskStatus]?: Task[] } = {};
    taskStatuses.forEach(status => grouped[status] = []); 
    filteredTasks.forEach(task => {
      if (grouped[task.status]) {
        grouped[task.status]!.push(task);
      } else {
        grouped['To Do']!.push(task); 
      }
    });
    return grouped;
  }, [filteredTasks]);

  return (
    <div className="space-y-6">
        <Card className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg shadow-xl mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <label htmlFor="project-filter-board" className="text-sm font-medium text-sky-300">
                  {externallySelectedProjectId && focusedProject ? `Showing tasks for:` : "Filter by Project:"}
                </label>
                {externallySelectedProjectId && focusedProject ? (
                    <span className="text-lg font-semibold text-white bg-sky-600 px-3 py-1 rounded-md">
                        {focusedProject.projectName}
                    </span>
                ) : (
                    <select
                        id="project-filter-board"
                        value={internalSelectedProjectId}
                        onChange={(e) => setInternalSelectedProjectId(e.target.value)}
                        className="bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2 w-full sm:w-auto"
                        aria-label="Filter tasks by project"
                        disabled={!!externallySelectedProjectId} // Disable if externally filtered
                    >
                        <option value="">All Projects</option>
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.projectName}</option>
                        ))}
                    </select>
                )}
            </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {taskStatuses.map(status => (
            <div key={status} className="bg-slate-800/50 p-4 rounded-lg shadow-lg min-h-[300px] flex flex-col">
              <h3 className="text-lg font-semibold text-sky-300 mb-4 pb-2 border-b border-slate-700 text-center sticky top-0 bg-slate-800/50 z-10">
                  {status} ({tasksByStatus[status]?.length || 0})
              </h3>
              <div className="space-y-3 flex-grow overflow-y-auto pr-1 pb-2"> 
                  {tasksByStatus[status] && tasksByStatus[status]!.length > 0 ? (
                  tasksByStatus[status]!.map(task => <TaskCardItem key={task.id} task={task} />)
                  ) : (
                  <p className="text-sm text-slate-500 text-center pt-10">No tasks in this stage{focusedProject ? ` for ${focusedProject.projectName}` : (internalSelectedProjectId ? ` for selected project` : '')}.</p>
                  )}
              </div>
            </div>
        ))}
        </div>
    </div>
  );
};