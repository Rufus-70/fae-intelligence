
import React, { useState, useEffect } from 'react';
import { NewLeadData } from '../../../types';

interface AddLeadFormProps {
  onSave: (leadData: NewLeadData) => void;
  onCancel: () => void;
  defaultStatus?: 'Lead' | 'Prospect'; // Added optional defaultStatus
}

const inputBaseStyle = "block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-sky-300 mb-1";
const textareaBaseStyle = `${inputBaseStyle} min-h-[100px]`;

interface FormErrors {
  leadName?: string;
  email?: string;
  status?: string;
}

const leadStatuses: ('Lead' | 'Prospect')[] = ['Lead', 'Prospect'];

export const AddLeadForm: React.FC<AddLeadFormProps> = ({ onSave, onCancel, defaultStatus }) => {
  const [formData, setFormData] = useState<NewLeadData>({
    leadName: '',
    contactPerson: '',
    email: '',
    phone: '',
    leadSource: '',
    status: defaultStatus || 'Lead', // Use defaultStatus if provided
    initialNotes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Update formData if defaultStatus changes (e.g. modal re-used with different default)
  useEffect(() => {
    setFormData(prev => ({ ...prev, status: defaultStatus || 'Lead' }));
  }, [defaultStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.leadName.trim()) {
      newErrors.leadName = 'Lead name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.status) {
        newErrors.status = 'Status is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="leadName" className={labelBaseStyle}>Lead/Company Name <span className="text-red-400">*</span></label>
        <input
          type="text"
          name="leadName"
          id="leadName"
          value={formData.leadName}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.leadName ? 'border-red-500' : 'border-slate-600'}`}
          aria-required="true"
          aria-invalid={!!errors.leadName}
          aria-describedby={errors.leadName ? "leadName-error" : undefined}
        />
        {errors.leadName && <p id="leadName-error" className="mt-1 text-xs text-red-400">{errors.leadName}</p>}
      </div>

      <div>
        <label htmlFor="contactPerson" className={labelBaseStyle}>Contact Person</label>
        <input
          type="text"
          name="contactPerson"
          id="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          className={inputBaseStyle}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelBaseStyle}>Email <span className="text-red-400">*</span></label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.email ? 'border-red-500' : 'border-slate-600'}`}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={labelBaseStyle}>Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputBaseStyle}
        />
      </div>
      
      <div>
        <label htmlFor="leadSource" className={labelBaseStyle}>Lead Source</label>
        <input
          type="text"
          name="leadSource"
          id="leadSource"
          value={formData.leadSource}
          onChange={handleChange}
          className={inputBaseStyle}
        />
      </div>

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
          aria-describedby={errors.status ? "status-error" : undefined}
        >
          {leadStatuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.status && <p id="status-error" className="mt-1 text-xs text-red-400">{errors.status}</p>}
      </div>

      <div>
        <label htmlFor="initialNotes" className={labelBaseStyle}>Initial Notes</label>
        <textarea
          name="initialNotes"
          id="initialNotes"
          value={formData.initialNotes}
          onChange={handleChange}
          rows={3}
          className={textareaBaseStyle}
        />
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
          Save {formData.status}
        </button>
      </div>
    </form>
  );
};
