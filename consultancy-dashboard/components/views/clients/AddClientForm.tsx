
import React, { useState, useEffect } from 'react';
import { NewClientData, ClientStatus, Client } from '../../../types';

interface ClientFormProps {
  initialData?: Client; // Used for pre-filling form in edit mode
  onSave: (formData: NewClientData, idToUpdate?: string) => void;
  onCancel: () => void;
}

const inputBaseStyle = "block w-full bg-slate-50 border-slate-300 rounded-md shadow-sm focus:ring-[#1B365D] focus:border-[#1B365D] sm:text-sm text-[#4A5568] p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-[#1B365D] mb-1";

interface FormErrors {
  clientName?: string;
  email?: string;
  status?: string;
}

const getInitialFormData = (client?: Client): NewClientData => ({
  clientName: client?.clientName || '',
  contactPerson: client?.contactPerson || '',
  email: client?.email || '',
  phone: client?.phone || '',
  status: client?.status || 'Lead', // Default status for new clients
});

export const ClientForm: React.FC<ClientFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewClientData>(getInitialFormData(initialData));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(getInitialFormData(initialData));
    setErrors({}); // Clear errors when initial data changes (e.g. new form instance)
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as ClientStatus | string })); // Cast for status
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required.';
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
      onSave(formData, initialData?.id); // Pass initialData.id if it exists (edit mode)
    }
  };

  const clientStatuses: ClientStatus[] = ['Active', 'Prospect', 'Lead', 'Inactive'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="clientName" className={labelBaseStyle}>Client Name <span className="text-[#DD6B20]">*</span></label> {/* Warning Orange for required */}
        <input
          type="text"
          name="clientName"
          id="clientName"
          value={formData.clientName}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.clientName ? 'border-[#DD6B20]' : 'border-slate-300'}`}
          aria-required="true"
          aria-invalid={!!errors.clientName}
          aria-describedby={errors.clientName ? "clientName-error" : undefined}
        />
        {errors.clientName && <p id="clientName-error" className="mt-1 text-xs text-[#DD6B20]">{errors.clientName}</p>}
      </div>

      <div>
        <label htmlFor="contactPerson" className={labelBaseStyle}>Contact Person</label>
        <input
          type="text"
          name="contactPerson"
          id="contactPerson"
          value={formData.contactPerson || ''}
          onChange={handleChange}
          className={inputBaseStyle}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelBaseStyle}>Email <span className="text-[#DD6B20]">*</span></label> {/* Warning Orange for required */}
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.email ? 'border-[#DD6B20]' : 'border-slate-300'}`}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="mt-1 text-xs text-[#DD6B20]">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={labelBaseStyle}>Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          className={inputBaseStyle}
        />
      </div>

      <div>
        <label htmlFor="status" className={labelBaseStyle}>Status <span className="text-[#DD6B20]">*</span></label> {/* Warning Orange for required */}
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.status ? 'border-[#DD6B20]' : 'border-slate-300'}`}
          aria-required="true"
          aria-invalid={!!errors.status}
          aria-describedby={errors.status ? "status-error" : undefined}
        >
          {clientStatuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.status && <p id="status-error" className="mt-1 text-xs text-[#DD6B20]">{errors.status}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-[#4A5568] bg-slate-200 hover:bg-slate-300 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#1B365D] hover:bg-blue-800 rounded-md transition-colors"
        >
          {initialData ? 'Update Client' : 'Save Client'}
        </button>
      </div>
    </form>
  );
};