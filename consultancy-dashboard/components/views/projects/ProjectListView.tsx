
import React, { useState, useMemo } from 'react';
import { Project, NewProjectData, ProjectStatus, Client, ProjectListViewProps } from '../../../types';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddProjectForm } from './AddProjectForm';
// ImportProjectModal is now handled in App.tsx

const StatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  let bgColor = 'bg-slate-500';
  let textColor = 'text-white';

  switch (status) {
    case 'Active': bgColor = 'bg-green-500'; break;
    case 'Planning': bgColor = 'bg-blue-400'; break;
    case 'On Hold': bgColor = 'bg-yellow-500'; textColor = 'text-slate-800'; break;
    case 'Completed': bgColor = 'bg-teal-500'; break;
    case 'Cancelled': bgColor = 'bg-red-500'; break;
    default: bgColor = 'bg-slate-400'; textColor = 'text-slate-800'; break;
  }
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return 'Invalid Date';
  }
};

export const ProjectListView: React.FC<ProjectListViewProps> = ({ 
  projects, 
  clients, 
  onSaveProject, 
  onDeleteProject,
  activeFilter,
  onClearProjectFilter,
  onViewProjectDetails,
  onOpenImportModal, // Added prop
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(undefined);

  const handleOpenModal = (project?: Project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setProjectToEdit(undefined);
    setIsModalOpen(false);
  };

  const handleSave = (formData: NewProjectData, idToUpdate?: string) => {
    onSaveProject(formData, idToUpdate);
    handleCloseModal();
  };
  
  const confirmDelete = (projectId: string, projectName: string) => {
    if (window.confirm(`Are you sure you want to delete the project "${projectName}"? This will also delete associated tasks.`)) {
      onDeleteProject(projectId);
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    if (activeFilter === 'Overdue') {
      const now = new Date();
      return projects.filter(p => 
        p.dueDate && new Date(p.dueDate).getTime() < now.setHours(0,0,0,0) && p.status !== 'Completed' && p.status !== 'Cancelled'
      );
    }
    return projects.filter(p => p.status === activeFilter);
  }, [projects, activeFilter]);


  return (
    <>
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h3 className="text-2xl font-semibold text-sky-300">
            {activeFilter !== 'All' ? `${activeFilter} Projects` : 'All Projects'}
          </h3>
          <div className="flex flex-wrap items-center gap-3"> {/* Added flex-wrap */}
            {activeFilter !== 'All' && (
              <button
                onClick={onClearProjectFilter}
                className="bg-slate-600 hover:bg-slate-500 text-slate-300 font-medium py-2 px-4 rounded-lg shadow text-sm transition-colors"
                aria-label="Clear project filter"
              >
                Show All Projects
              </button>
            )}
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center"
              onClick={onOpenImportModal} // Use the new prop
              aria-label="Import Project with AI"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688 0-1.25-.561-1.25-1.25s.562-1.25 1.25-1.25c.687 0 1.25.561 1.25 1.25s-.563 1.25-1.25 1.25zm0-8.75c-.688 0-1.25-.561-1.25-1.25s.562-1.25 1.25-1.25c.687 0 1.25.561 1.25 1.25s-.563 1.25-1.25 1.25zm0 17.5c-.688 0-1.25-.561-1.25-1.25s.562-1.25 1.25-1.25c.687 0 1.25.561 1.25 1.25s-.563 1.25-1.25 1.25zM4.75 12.55V7.5c0-1.38.82-2.5 2-2.5h10.5c1.18 0 2 .921 2 2.051v5.006c0 .87-.419 1.49-.868 1.943l-3.35 3.35c-.452.452-1.071.868-1.942.868H6.75c-1.18 0-2-.921-2-2.051V12.55zm2.75-.8a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
              </svg>
              Import with AI
            </button>
            <button
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center"
              onClick={() => handleOpenModal()}
              aria-label="Add New Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Project
            </button>
          </div>
        </div>

        {activeFilter !== 'All' && (
          <p className="text-sm text-slate-400 mb-4 italic">
            Showing projects filtered by: {activeFilter}.
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Project Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden sm:table-cell">Client</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden md:table-cell">Start Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Due Date</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/30 divide-y divide-slate-700">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    No projects found{activeFilter !== 'All' ? ` for filter: ${activeFilter}` : ""}.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project, index) => (
                  <tr key={project.id} className={`${index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40 transition-colors duration-150`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-100">{project.projectName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 hidden sm:table-cell">{project.clientName || <span className="italic text-slate-500">Internal</span>}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 hidden md:table-cell">{formatDate(project.startDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{formatDate(project.dueDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-2">
                       <button 
                        className="text-teal-400 hover:text-teal-300 transition-colors text-xs font-medium"
                        onClick={() => onViewProjectDetails(project.id)}
                        aria-label={`View details for ${project.projectName}`}
                      >
                        Details
                      </button>
                      <button 
                        className="text-sky-400 hover:text-sky-300 transition-colors text-xs font-medium"
                        onClick={() => handleOpenModal(project)}
                        aria-label={`Edit ${project.projectName}`}
                      >
                        Edit
                      </button>
                       <button 
                        className="text-red-400 hover:text-red-300 transition-colors text-xs font-medium"
                        onClick={() => confirmDelete(project.id, project.projectName)}
                        aria-label={`Delete ${project.projectName}`}
                      >
                        Delete
                      </button>
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
          title={projectToEdit ? `Edit Project: ${projectToEdit.projectName}` : "Add New Project"}
        >
          <AddProjectForm 
            clients={clients}
            initialData={projectToEdit}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};
