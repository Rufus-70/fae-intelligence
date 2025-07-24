import React, { useState, useEffect } from 'react';
import { NewTaskData, TaskStatus, TaskPriority, Project, Task, CrmBlueprintActivity, AddTaskFormProps } from '../../../types';

const inputBaseStyle = "block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-sky-300 mb-1";
const textareaBaseStyle = `${inputBaseStyle} min-h-[100px]`;

interface FormErrors {
  title?: string;
  status?: string;
  priority?: string;
  estimatedCost?: string;
  actualCost?: string;
  potentialRevenue?: string;
  dueDate?: string; // Added for date validation
}

const taskStatuses: TaskStatus[] = ['To Do', 'In Progress', 'Review', 'Done', 'Blocked'];
const taskPriorities: TaskPriority[] = ['Low', 'Medium', 'High', 'Urgent'];

const getInitialFormData = (task?: Task): NewTaskData => ({
  title: task?.title || '',
  description: task?.description || '',
  projectId: task?.projectId || undefined,
  status: task?.status || 'To Do',
  priority: task?.priority || 'Medium',
  assignedTo: task?.assignedTo || '',
  startDate: task?.startDate ? task.startDate.split('T')[0] : undefined,
  dueDate: task?.dueDate ? task.dueDate.split('T')[0] : undefined,
  estimatedCost: task?.estimatedCost,
  actualCost: task?.actualCost,
  potentialRevenue: task?.potentialRevenue,
  linkedBlueprintActivityId: task?.linkedBlueprintActivityId || undefined,
  // crmInfoSnippet is intentionally not part of form data, it's derived in App.tsx
});

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ projects, crmBlueprintActivities, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewTaskData>(getInitialFormData(initialData));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(getInitialFormData(initialData));
    setErrors({});
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let newFormData = {
        ...formData,
        [name]: type === 'number' 
                 ? (value === '' ? undefined : parseFloat(value)) 
                 : value,
    };

    if (name === 'linkedBlueprintActivityId') {
        const selectedActivity = crmBlueprintActivities.find(act => act.id === value);
        if (selectedActivity && !initialData?.title) { // Only prefill title for new tasks or if title is empty
            newFormData.title = `CRM: ${selectedActivity.title}`;
        } else if (!value) { // If "None" is selected, clear a prefilled title
             if (formData.title.startsWith("CRM: ") && !initialData?.title) {
                newFormData.title = '';
            }
        }
    }
    
    setFormData(newFormData);

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
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required.';
    }
    if (!formData.status) newErrors.status = 'Status is required.';
    if (!formData.priority) newErrors.priority = 'Priority is required.';

    if (formData.startDate && formData.dueDate && new Date(formData.startDate) > new Date(formData.dueDate)) {
      newErrors.dueDate = 'Due date cannot be earlier than start date.';
    }

    const financialFields: (keyof NewTaskData)[] = ['estimatedCost', 'actualCost', 'potentialRevenue'];
    financialFields.forEach(field => {
        const value = formData[field];
        if (value !== undefined && isNaN(Number(value))) {
            newErrors[field as keyof FormErrors] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} must be a number.`;
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const processedFormData: NewTaskData = {
        ...formData,
        estimatedCost: formData.estimatedCost !== undefined && !isNaN(Number(formData.estimatedCost)) ? Number(formData.estimatedCost) : undefined,
        actualCost: formData.actualCost !== undefined && !isNaN(Number(formData.actualCost)) ? Number(formData.actualCost) : undefined,
        potentialRevenue: formData.potentialRevenue !== undefined && !isNaN(Number(formData.potentialRevenue)) ? Number(formData.potentialRevenue) : undefined,
        linkedBlueprintActivityId: formData.linkedBlueprintActivityId || undefined, // Ensure it's undefined if empty string
      };
      onSave(processedFormData, initialData?.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="linkedBlueprintActivityId" className={labelBaseStyle}>Link to CRM Activity (from Blueprint)</label>
        <select
          name="linkedBlueprintActivityId"
          id="linkedBlueprintActivityId"
          value={formData.linkedBlueprintActivityId || ''}
          onChange={handleChange}
          className={inputBaseStyle}
        >
          <option value="">-- None --</option>
          {crmBlueprintActivities.map(activity => (
            <option key={activity.id} value={activity.id}>
              {activity.title} (Customer: {activity.crmDetails.customerName || 'N/A'}, Stage: {activity.crmDetails.dealStage || 'N/A'})
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="title" className={labelBaseStyle}>Title <span className="text-red-400">*</span></label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.title ? 'border-red-500' : 'border-slate-600'}`}
          aria-required="true"
          aria-invalid={!!errors.title}
        />
        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelBaseStyle}>Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={3}
          className={textareaBaseStyle}
        />
      </div>
      
      <div>
        <label htmlFor="projectId" className={labelBaseStyle}>Project (Optional)</label>
        <select
          name="projectId"
          id="projectId"
          value={formData.projectId || ''}
          onChange={handleChange}
          className={inputBaseStyle}
        >
          <option value="">-- Select a Project --</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.projectName}</option>
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
            aria-invalid={!!errors.status}
          >
            {taskStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.status && <p className="mt-1 text-xs text-red-400">{errors.status}</p>}
        </div>
        <div>
          <label htmlFor="priority" className={labelBaseStyle}>Priority <span className="text-red-400">*</span></label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.priority ? 'border-red-500' : 'border-slate-600'}`}
            aria-required="true"
            aria-invalid={!!errors.priority}
          >
            {taskPriorities.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.priority && <p className="mt-1 text-xs text-red-400">{errors.priority}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="assignedTo" className={labelBaseStyle}>Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            id="assignedTo"
            value={formData.assignedTo || ''}
            onChange={handleChange}
            className={inputBaseStyle}
            placeholder="e.g., Team Member A"
          />
        </div>
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
      </div>
      <div> {/* Moved Due Date to its own row for better layout with potential error message */}
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


      {/* Financial Fields */}
      <div className="pt-4 border-t border-slate-600 mt-4">
        <h4 className="text-md font-semibold text-sky-300 mb-3">Financial Details (Optional)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label htmlFor="potentialRevenue" className={labelBaseStyle}>Potential Revenue ($)</label>
                <input type="number" name="potentialRevenue" id="potentialRevenue"
                       value={formData.potentialRevenue === undefined ? '' : formData.potentialRevenue} onChange={handleChange} 
                       className={`${inputBaseStyle} ${errors.potentialRevenue ? 'border-red-500' : 'border-slate-600'}`} 
                       placeholder="e.g., 1000" step="0.01" 
                       aria-invalid={!!errors.potentialRevenue} />
                {errors.potentialRevenue && <p className="mt-1 text-xs text-red-400">{errors.potentialRevenue}</p>}
            </div>
            <div>
                <label htmlFor="estimatedCost" className={labelBaseStyle}>Estimated Cost ($)</label>
                <input type="number" name="estimatedCost" id="estimatedCost"
                       value={formData.estimatedCost === undefined ? '' : formData.estimatedCost} onChange={handleChange} 
                       className={`${inputBaseStyle} ${errors.estimatedCost ? 'border-red-500' : 'border-slate-600'}`} 
                       placeholder="e.g., 500" step="0.01"
                       aria-invalid={!!errors.estimatedCost} />
                {errors.estimatedCost && <p className="mt-1 text-xs text-red-400">{errors.estimatedCost}</p>}
            </div>
            <div>
                <label htmlFor="actualCost" className={labelBaseStyle}>Actual Cost ($)</label>
                <input type="number" name="actualCost" id="actualCost"
                       value={formData.actualCost === undefined ? '' : formData.actualCost} onChange={handleChange} 
                       className={`${inputBaseStyle} ${errors.actualCost ? 'border-red-500' : 'border-slate-600'}`} 
                       placeholder="e.g., 450" step="0.01" 
                       aria-invalid={!!errors.actualCost}/>
                {errors.actualCost && <p className="mt-1 text-xs text-red-400">{errors.actualCost}</p>}
            </div>
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
          {initialData ? 'Update Task' : 'Save Task'}
        </button>
      </div>
    </form>
  );
};