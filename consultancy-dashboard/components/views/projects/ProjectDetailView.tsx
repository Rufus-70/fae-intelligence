

import React, { useState, useMemo } from 'react';
import { Project, Task, Client, NewProjectData, NewTaskData, ProjectDetailViewProps, TaskStatus, TaskPriority, CrmInfoSnippet, Invoice, Expense } from '../../../types';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddProjectForm } from './AddProjectForm';
import { AddTaskForm } from '../tasks/AddTaskForm'; 

const StatusBadge: React.FC<{ status: Project['status'] | Task['status'] }> = ({ status }) => {
  let bgColor = 'bg-slate-500'; let textColor = 'text-white';
  switch (status) {
    // Project Statuses
    case 'Active': bgColor = 'bg-green-500'; break;
    case 'Planning': bgColor = 'bg-blue-400'; break;
    case 'On Hold': bgColor = 'bg-yellow-500'; textColor = 'text-slate-800'; break;
    case 'Completed': bgColor = 'bg-teal-500'; break;
    case 'Cancelled': bgColor = 'bg-red-600'; break;
    // Task Statuses
    case 'In Progress': bgColor = 'bg-blue-500'; break;
    case 'Review': bgColor = 'bg-purple-500'; break;
    case 'Done': bgColor = 'bg-green-600'; break; // Slightly different green for tasks
    case 'Blocked': bgColor = 'bg-red-500'; break;
    case 'To Do': default: bgColor = 'bg-slate-400'; textColor = 'text-slate-800'; break;
  }
  return <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>{status}</span>;
};

const PriorityDisplay: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  let color = 'text-slate-300';
  switch (priority) {
    case 'Urgent': color = 'text-red-400 font-bold'; break;
    case 'High': color = 'text-orange-400'; break;
    case 'Medium': color = 'text-yellow-400'; break;
    case 'Low': color = 'text-sky-400'; break;
  }
  return <span className={`text-xs ${color}`}>{priority}</span>;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) { return 'Invalid Date'; }
};

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null || isNaN(value)) return '$0'; // Default to $0 if undefined or NaN
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

const DetailItem: React.FC<{ label: string; value?: string | string[] | React.ReactElement | null; icon?: React.ReactElement; className?: string; }> = ({ label, value, icon, className = "" }) => (
  <div className={`mb-3 ${className}`}>
    <h4 className="text-sm font-semibold text-sky-400 mb-0.5 flex items-center">
      {icon && <span className="mr-2 h-5 w-5 opacity-80">{icon}</span>}
      {label}
    </h4>
    {React.isValidElement(value) ? value : (
      Array.isArray(value) ? (
        value.length > 0 ? (
          <ul className="list-disc list-inside pl-1">
            {value.map((item, idx) => <li key={idx} className="text-slate-200 text-base">{item}</li>)}
          </ul>
        ) : <p className="text-slate-400 text-base italic">None</p>
      ) : (
        <p className="text-slate-200 text-base">{value || <span className="italic text-slate-400">N/A</span>}</p>
      )
    )}
  </div>
);

const CrmInfoTooltipProjectDetail: React.FC<{ snippet: CrmInfoSnippet }> = ({ snippet }) => (
  <div className="absolute z-10 invisible group-hover:visible bg-slate-900 text-slate-200 text-xs rounded-md shadow-lg p-2 min-w-[250px] border border-slate-700 transform -translate-y-full -translate-x-1/2 left-1/2 mt-1">
    <p className="font-bold text-sky-400 mb-1">Linked CRM Activity:</p>
    <p className="mb-0.5">Title: {snippet.blueprintActivityTitle || 'N/A'}</p>
    <p className="mb-0.5">Customer: {snippet.customerName || 'N/A'}</p>
    <p className="mb-0.5">Stage: {snippet.dealStage || 'N/A'}</p>
    <p>Value: {formatCurrency(snippet.estimatedValue)}</p>
  </div>
);


export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  projects, tasks, clients, invoices, expenses, selectedProjectId,
  onSaveProject, onDeleteProject, onSaveTask, onDeleteTask, onUpdateTaskStatus,
  onBackToProjectList, crmBlueprintActivities
}) => {
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const selectedProject = useMemo(() => projects.find(p => p.id === selectedProjectId), [projects, selectedProjectId]);
  const projectTasks = useMemo(() => tasks.filter(t => t.projectId === selectedProjectId).sort((a,b) => {
      const priorityOrder: Record<TaskPriority, number> = { 'Urgent': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
      if (a.dueDate && b.dueDate) {
          const dateDiff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          if (dateDiff !== 0) return dateDiff;
      } else if (a.dueDate) {
          return -1; 
      } else if (b.dueDate) {
          return 1;
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority];
  }), [tasks, selectedProjectId]);

  const projectFinancials = useMemo(() => {
    if (!selectedProject) return { billed: 0, spent: 0, profit: 0 };

    const projectBilledPaid = invoices
      .filter(inv => inv.projectId === selectedProject.id && inv.status === 'Paid')
      .reduce((sum, inv) => sum + inv.totalAmount, 0);

    const projectExpensesTotal = expenses
      .filter(exp => exp.projectId === selectedProject.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    const projectNetProfit = projectBilledPaid - projectExpensesTotal;

    return {
      billed: projectBilledPaid,
      spent: projectExpensesTotal,
      profit: projectNetProfit,
    };
  }, [selectedProject, invoices, expenses]);


  if (!selectedProject) {
    return (
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl text-center">
        <h3 className="text-2xl font-semibold text-red-400 mb-4">Project Not Found</h3>
        <p className="text-slate-300 mb-6">The selected project could not be found or is no longer available.</p>
        <button onClick={onBackToProjectList} className="btn-primary">Back to Project List</button>
      </Card>
    );
  }

  const handleOpenEditProjectModal = () => setIsEditProjectModalOpen(true);
  const handleCloseEditProjectModal = () => setIsEditProjectModalOpen(false);
  
  const handleSaveProjectModal = (data: NewProjectData, id?: string) => {
    onSaveProject(data, id);
    handleCloseEditProjectModal();
  };

  const confirmDeleteProject = () => {
    if (window.confirm(`Are you sure you want to delete project "${selectedProject.projectName}" and all its tasks?`)) {
      onDeleteProject(selectedProject.id);
    }
  };

  const handleOpenTaskModal = (task?: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };
  const handleCloseTaskModal = () => {
    setTaskToEdit(undefined);
    setIsTaskModalOpen(false);
  };
  const handleSaveTaskModal = (data: NewTaskData, id?: string) => {
    const taskDataWithProjectId = { ...data, projectId: selectedProject.id };
    onSaveTask(taskDataWithProjectId, id); 
    handleCloseTaskModal();
  };
  const confirmDeleteTask = (taskId: string, taskTitle: string) => {
    if (window.confirm(`Are you sure you want to delete task "${taskTitle}"?`)) {
      onDeleteTask(taskId);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-3xl font-semibold text-sky-300 break-all">{selectedProject.projectName}</h2>
        <button
          onClick={onBackToProjectList}
          className="bg-slate-700 hover:bg-slate-600 text-sky-300 font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center self-start sm:self-center"
          aria-label="Back to project list"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>
          Back to Projects
        </button>
      </div>

      {/* Project Details Card */}
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-700">
            <h3 className="text-xl font-semibold text-sky-400">Project Overview</h3>
            <div className="space-x-2">
                <button onClick={handleOpenEditProjectModal} className="text-sm text-amber-400 hover:text-amber-300 font-medium py-1 px-3 rounded border border-amber-400 hover:border-amber-300 transition-colors">Edit Project</button>
                <button onClick={confirmDeleteProject} className="text-sm text-red-400 hover:text-red-300 font-medium py-1 px-3 rounded border border-red-400 hover:border-red-300 transition-colors">Delete Project</button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <DetailItem label="Client" value={selectedProject.clientName || "Internal"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m8.117 0a7.47 7.47 0 0 0-3.06-.517M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>} />
          <DetailItem label="Status" value={<StatusBadge status={selectedProject.status} />} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <DetailItem label="Start Date" value={formatDate(selectedProject.startDate)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>} />
          <DetailItem label="Due Date" value={formatDate(selectedProject.dueDate)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008Z" /></svg>} />
          <DetailItem label="Team Members" value={selectedProject.teamMembers} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.192 11.999a6.375 6.375 0 0 1-6.383 0M15.192 11.999a2.625 2.625 0 0 0-2.625-2.625M15.192 11.999a2.625 2.625 0 0 1-2.625 2.625m0-5.25V6.375c0-1.036.84-1.875 1.875-1.875h.375c1.036 0 1.875.84 1.875 1.875v5.625m0 0H9.375m0 0a3.375 3.375 0 0 1-3.375-3.375V6.375A3.375 3.375 0 0 1 9.375 3h5.25A3.375 3.375 0 0 1 18 6.375v2.25" /></svg>} />
          <div className="md:col-span-2 lg:col-span-3">
            <DetailItem label="Description" value={selectedProject.description} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>} />
          </div>
        </div>
      </Card>

      {/* Project Financials Card */}
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold text-sky-400 mb-4 border-b border-slate-700 pb-2">Project Financials</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DetailItem
            label="Total Billed (Paid)"
            value={formatCurrency(projectFinancials.billed)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>}
          />
          <DetailItem
            label="Total Expenses"
            value={formatCurrency(projectFinancials.spent)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" /></svg>}
          />
          <DetailItem
            label="Net Profit/Loss"
            value={
              <span className={`font-semibold ${projectFinancials.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(projectFinancials.profit)}
              </span>
            }
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${projectFinancials.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          />
        </div>
      </Card>


      {/* Tasks Card */}
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-sky-400">Tasks for this Project ({projectTasks.length})</h3>
          <button onClick={() => handleOpenTaskModal()} className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Add Task
          </button>
        </div>
        {projectTasks.length === 0 ? (
          <p className="text-slate-400 text-center py-5">No tasks have been added to this project yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Title</th>
                  <th className="px-2 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Status</th>
                  <th className="px-2 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider hidden sm:table-cell">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden md:table-cell">Assigned To</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Due Date</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800/30 divide-y divide-slate-700">
                {projectTasks.map((task, idx) => (
                  <tr key={task.id} className={`${idx % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40`}>
                    <td 
                        className="px-4 py-3 text-sm font-medium text-slate-100"
                    >
                        <div className="flex items-center relative group">
                            {task.crmInfoSnippet && (
                              <>
                                <span className="mr-2 text-lime-400" aria-label="CRM Linked Task">🤝</span>
                                <CrmInfoTooltipProjectDetail snippet={task.crmInfoSnippet} />
                              </>
                            )}
                            <span 
                                className="cursor-pointer hover:text-sky-300 transition-colors"
                                onClick={() => handleOpenTaskModal(task)}
                                title={`Edit task: ${task.title}`}
                            >
                                {task.title}
                            </span>
                        </div>
                    </td>
                    <td className="px-2 py-3 text-sm text-center"><StatusBadge status={task.status} /></td>
                    <td className="px-2 py-3 text-sm text-center hidden sm:table-cell"><PriorityDisplay priority={task.priority} /></td>
                    <td className="px-4 py-3 text-sm text-slate-300 hidden md:table-cell">{task.assignedTo || <span className="italic text-slate-500">N/A</span>}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{formatDate(task.dueDate)}</td>
                    <td className="px-4 py-3 text-sm text-center space-x-1">
                      <button onClick={() => handleOpenTaskModal(task)} className="text-sky-400 hover:text-sky-300 p-1" aria-label={`Edit task ${task.title}`} title="Edit Task"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg></button>
                      {task.status !== 'Done' && <button onClick={() => onUpdateTaskStatus(task.id, 'Done')} className="text-green-400 hover:text-green-300 p-1" aria-label={`Mark task ${task.title} as done`} title="Mark as Done"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></button>}
                      <button onClick={() => confirmDeleteTask(task.id, task.title)} className="text-red-400 hover:text-red-300 p-1" aria-label={`Delete task ${task.title}`} title="Delete Task"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c-.34-.059-.68-.114-1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modals */}
      {isEditProjectModalOpen && selectedProject && (
        <Modal isOpen={isEditProjectModalOpen} onClose={handleCloseEditProjectModal} title={`Edit Project: ${selectedProject.projectName}`}>
          <AddProjectForm
            clients={clients}
            initialData={selectedProject}
            onSave={handleSaveProjectModal}
            onCancel={handleCloseEditProjectModal}
          />
        </Modal>
      )}

      {isTaskModalOpen && (
        <Modal isOpen={isTaskModalOpen} onClose={handleCloseTaskModal} title={taskToEdit ? `Edit Task: ${taskToEdit.title}` : 'Add New Task to Project'}>
          <AddTaskForm
            projects={projects} 
            crmBlueprintActivities={crmBlueprintActivities} // Pass here
            initialData={taskToEdit}
            onSave={handleSaveTaskModal}
            onCancel={handleCloseTaskModal}
          />
        </Modal>
      )}
    </div>
  );
};