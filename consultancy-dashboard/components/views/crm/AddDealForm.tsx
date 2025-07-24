import React, { useState } from 'react';
import { NewDealData, CrmDealStage, Client } from '../../../types';

interface AddDealFormProps {
  clients: Client[];
  onSave: (dealData: NewDealData) => void;
  onCancel: () => void;
}

const inputBaseStyle = "block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-sky-300 mb-1";
const textareaBaseStyle = `${inputBaseStyle} min-h-[100px]`;

interface FormErrors {
  dealName?: string;
  clientId?: string;
  value?: string;
  stage?: string;
  expectedCloseDate?: string;
}

const dealStages: CrmDealStage[] = ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

export const AddDealForm: React.FC<AddDealFormProps> = ({ clients, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<NewDealData>>({
    dealName: '',
    clientId: clients.length > 0 ? clients[0].id : '',
    value: undefined,
    stage: 'Lead',
    expectedCloseDate: new Date().toISOString().split('T')[0],
    assignedTo: 'Consultant',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? undefined : parseFloat(value)) : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.dealName || formData.dealName.trim() === '') newErrors.dealName = 'Deal name is required.';
    if (!formData.clientId) newErrors.clientId = 'Associated client is required.';
    if (formData.value === undefined || formData.value === null || isNaN(Number(formData.value)) || Number(formData.value) <= 0) {
      newErrors.value = 'Valid deal value is required.';
    }
    if (!formData.stage) newErrors.stage = 'Deal stage is required.';
    if (!formData.expectedCloseDate) newErrors.expectedCloseDate = 'Expected close date is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData as NewDealData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="dealName" className={labelBaseStyle}>Deal Name <span className="text-red-400">*</span></label>
        <input
          type="text"
          name="dealName"
          id="dealName"
          value={formData.dealName}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.dealName ? 'border-red-500' : 'border-slate-600'}`}
          aria-required="true"
          aria-invalid={!!errors.dealName}
        />
        {errors.dealName && <p className="mt-1 text-xs text-red-400">{errors.dealName}</p>}
      </div>

      <div>
        <label htmlFor="clientId" className={labelBaseStyle}>Associated Client <span className="text-red-400">*</span></label>
        <select
          name="clientId"
          id="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.clientId ? 'border-red-500' : 'border-slate-600'}`}
          aria-required="true"
          aria-invalid={!!errors.clientId}
        >
          <option value="" disabled>Select a client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.clientName}</option>
          ))}
        </select>
        {errors.clientId && <p className="mt-1 text-xs text-red-400">{errors.clientId}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="value" className={labelBaseStyle}>Deal Value ($) <span className="text-red-400">*</span></label>
          <input
            type="number"
            name="value"
            id="value"
            value={formData.value === undefined ? '' : formData.value}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.value ? 'border-red-500' : 'border-slate-600'}`}
            placeholder="e.g., 5000"
            aria-required="true"
            aria-invalid={!!errors.value}
          />
          {errors.value && <p className="mt-1 text-xs text-red-400">{errors.value}</p>}
        </div>
        <div>
          <label htmlFor="stage" className={labelBaseStyle}>Stage <span className="text-red-400">*</span></label>
          <select
            name="stage"
            id="stage"
            value={formData.stage}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.stage ? 'border-red-500' : 'border-slate-600'}`}
            aria-required="true"
            aria-invalid={!!errors.stage}
          >
            {dealStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          {errors.stage && <p className="mt-1 text-xs text-red-400">{errors.stage}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="expectedCloseDate" className={labelBaseStyle}>Expected Close Date <span className="text-red-400">*</span></label>
        <input
          type="date"
          name="expectedCloseDate"
          id="expectedCloseDate"
          value={formData.expectedCloseDate}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.expectedCloseDate ? 'border-red-500' : 'border-slate-600'}`}
          aria-required="true"
          aria-invalid={!!errors.expectedCloseDate}
        />
        {errors.expectedCloseDate && <p className="mt-1 text-xs text-red-400">{errors.expectedCloseDate}</p>}
      </div>
      
      <div>
        <label htmlFor="assignedTo" className={labelBaseStyle}>Assigned To</label>
        <input
          type="text"
          name="assignedTo"
          id="assignedTo"
          value={formData.assignedTo || ''}
          onChange={handleChange}
          className={inputBaseStyle}
        />
      </div>

      <div>
        <label htmlFor="notes" className={labelBaseStyle}>Notes</label>
        <textarea
          name="notes"
          id="notes"
          value={formData.notes || ''}
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
          Save Deal
        </button>
      </div>
    </form>
  );
};