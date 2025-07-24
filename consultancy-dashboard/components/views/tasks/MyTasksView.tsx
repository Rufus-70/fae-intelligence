import React, { useState, useMemo } from 'react';
import { Task, NewTaskData, TaskStatus, TaskPriority, Project, MyTasksViewProps, CrmInfoSnippet } from '../../../types';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddTaskForm } from './AddTaskForm';

const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  let bgColor = 'bg-slate-500'; let textColor = 'text-white';
  switch (status) {
    case 'In Progress': bgColor = 'bg-blue-500'; break;
    case 'Review': bgColor = 'bg-purple-500'; break;
    case 'Done': bgColor = 'bg-green-500'; break;
    case 'Blocked': bgColor = 'bg-red-500'; break;
    case 'To Do': default: bgColor = 'bg-slate-400'; textColor = 'text-slate-800'; break;
  }
  return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>{status}</span>;
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
    return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) { return 'Invalid Date'; }
};

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null || isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const CrmInfoTooltip: React.FC<{ snippet: CrmInfoSnippet }> = ({ snippet }) => (
  <div className="absolute z-10 invisible group-hover:visible bg-slate-900 text-slate-200 text-xs rounded-md shadow-lg p-2 min-w-[250px] border border-slate-700 transform -translate-y-full -translate-x-1/2 left-1/2 mt-1">
    <p className="font-bold text-sky-400 mb-1">Linked CRM Activity:</p>
    <p className="mb-0.5">Title: {snippet.blueprintActivityTitle || 'N/A'}</p>
    <p className="mb-0.5">Customer: {snippet.customerName || 'N/A'}</p>
    <p className="mb-0.5">Stage: {snippet.dealStage || 'N/A'}</p>
    <p>Value: {formatCurrency(snippet.estimatedValue)}</p>
  </div>
);


export const MyTasksView: React.FC<MyTasksViewProps> = ({ tasks, projects, onSaveTask, onDeleteTask, onUpdateTaskStatus, crmBlueprintActivities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  
  const currentUser = "Consultant"; 
  const myTasks = useMemo(() => tasks.filter(task => task.assignedTo === currentUser || !task.assignedTo ), [tasks, currentUser]);


  const handleOpenModal = (task?: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setTaskToEdit(undefined);
    setIsModalOpen(false);
  };

  const handleSave = (formData: NewTaskData, idToUpdate?: string) => {
    onSaveTask(formData, idToUpdate);
    handleCloseModal();
  };

  const confirmDelete = (taskId: string, taskTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the task "${taskTitle}"?`)) {
      onDeleteTask(taskId);
    }
  };

  return (
    <>
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-sky-300">My Tasks</h3>
          <button
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center"
            onClick={() => handleOpenModal()}
            aria-label="Add New Task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Task
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden sm:table-cell">Project</th>
                <th className="px-2 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Due Date</th>
                <th className="px-2 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/30 divide-y divide-slate-700">
              {myTasks.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-400">No tasks assigned to you or unassigned. Enjoy the peace!</td></tr>
              ) : (
                myTasks.map((task, idx) => (
                  <tr key={task.id} className={`${idx % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40`}>
                    <td className="px-4 py-3 text-sm font-medium text-slate-100">
                      <div className="flex items-center relative group">
                        {task.crmInfoSnippet && (
                          <>
                            <span className="mr-2 text-lime-400" aria-label="CRM Linked Task">🤝</span>
                            <CrmInfoTooltip snippet={task.crmInfoSnippet} />
                          </>
                        )}
                        {task.title}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300 hidden sm:table-cell">{task.projectName || <span className="italic text-slate-500">N/A</span>}</td>
                    <td className="px-2 py-3 text-sm text-center"><PriorityDisplay priority={task.priority} /></td>
                    <td className="px-4 py-3 text-sm text-slate-300">{formatDate(task.dueDate)}</td>
                    <td className="px-2 py-3 text-sm text-center"><StatusBadge status={task.status} /></td>
                    <td className="px-4 py-3 text-sm text-center space-x-1">
                      <button onClick={() => handleOpenModal(task)} className="text-sky-400 hover:text-sky-300 p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg></button>
                      {task.status !== 'Done' && <button onClick={() => onUpdateTaskStatus(task.id, 'Done')} className="text-green-400 hover:text-green-300 p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></button>}
                      <button onClick={() => confirmDelete(task.id, task.title)} className="text-red-400 hover:text-red-300 p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c-.34-.059-.68-.114-1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={taskToEdit ? `Edit Task: ${taskToEdit.title}` : "Add New Task"}
        >
          <AddTaskForm 
            projects={projects}
            crmBlueprintActivities={crmBlueprintActivities}
            initialData={taskToEdit}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};