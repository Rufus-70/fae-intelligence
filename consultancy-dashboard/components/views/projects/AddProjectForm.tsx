import React, { useState, useEffect } from 'react';
import { NewProjectData, ProjectStatus, Client, Project } from '../../../types';

interface AddProjectFormProps {
  clients: Client[];
  initialData?: Project; // Used for pre-filling form in edit mode
  onSave: (formData: NewProjectData, idToUpdate?: string) => void;
  onCancel: () => void;
}

const inputBaseStyle = "block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-sky-300 mb-1";
const textareaBaseStyle = `${inputBaseStyle} min-h-[100px]`;

interface FormErrors {
  projectName?: string;
  status?: string;
  dueDate?: string;
}

const projectStatuses: ProjectStatus[] = ['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled'];

const getInitialFormData = (project?: Project): NewProjectData => ({
  projectName: project?.projectName || '',
  description: project?.description || '',
  clientId: project?.clientId || undefined,
  status: project?.status || 'Planning',
  startDate: project?.startDate ? project.startDate.split('T')[0] : undefined,
  dueDate: project?.dueDate ? project.dueDate.split('T')[0] : undefined,
  teamMembers: project?.teamMembers || [],
});


export const AddProjectForm: React.FC<AddProjectFormProps> = ({ clients, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewProjectData>(getInitialFormData(initialData));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(getInitialFormData(initialData));
    setErrors({}); 
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'teamMembers' ? value.split(',').map(s => s.trim()).filter(Boolean) : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
    } catch (e) { return ''; }
  };


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required.';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required.';
    }
     if (formData.startDate && formData.dueDate && new Date(formData.startDate) > new Date(formData.dueDate)) {
      newErrors.dueDate = 'Due date cannot be earlier than start date.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData, initialData?.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="projectName" className={labelBaseStyle}>Project Name <span className="text-red-400">*</span></label>
        <input
          type="text"
          name="projectName"
          id="projectName"
          value={formData.projectName}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.projectName ? 'border-red-500' : 'border-slate-600'}`}
          aria-required="true"
          aria-invalid={!!errors.projectName}
        />
        {errors.projectName && <p className="mt-1 text-xs text-red-400">{errors.projectName}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelBaseStyle}>Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={textareaBaseStyle}
        />
      </div>
      
      <div>
        <label htmlFor="clientId" className={labelBaseStyle}>Client (Optional)</label>
        <select
          name="clientId"
          id="clientId"
          value={formData.clientId || ''}
          onChange={handleChange}
          className={inputBaseStyle}
        >
          <option value="">-- Select a Client --</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.clientName}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className={labelBaseStyle}>Status <span className="text-red-400">*</span></label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.status ? 'border-red-500' : 'border-slate-600'}`}
            aria-required="true"
          >
            {projectStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.status && <p className="mt-1 text-xs text-red-400">{errors.status}</p>}
        </div>
        <div>
            <label htmlFor="teamMembers" className={labelBaseStyle}>Team Members (comma-separated)</label>
            <input
            type="text"
            name="teamMembers"
            id="teamMembers"
            value={formData.teamMembers?.join(', ') || ''}
            onChange={handleChange}
            className={inputBaseStyle}
            placeholder="e.g., Member A, Member B"
            />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className={labelBaseStyle}>Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formatDateForInput(formData.startDate)}
            onChange={handleChange}
            className={inputBaseStyle}
          />
        </div>
        <div>
          <label htmlFor="dueDate" className={labelBaseStyle}>Due Date</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={formatDateForInput(formData.dueDate)}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.dueDate ? 'border-red-500' : 'border-slate-600'}`}
            aria-describedby={errors.dueDate ? "dueDate-error" : undefined}
          />
           {errors.dueDate && <p id="dueDate-error" className="mt-1 text-xs text-red-400">{errors.dueDate}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors"
        >
          {initialData ? 'Update Project' : 'Save Project'}
        </button>
      </div>
    </form>
  );
};
