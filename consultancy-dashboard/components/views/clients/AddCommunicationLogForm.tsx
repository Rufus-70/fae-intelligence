import React, { useState, useEffect } from 'react';
import { NewCommunicationLogData, CommunicationType, Client, CommunicationLogEntry, AddCommunicationLogFormProps } from '../../../types';
// dummyClients import removed as clients are passed via props

const inputBaseStyle = "block w-full bg-slate-50 border-slate-300 rounded-md shadow-sm focus:ring-[#1B365D] focus:border-[#1B365D] sm:text-sm text-[#4A5568] p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-[#1B365D] mb-1";
const textareaBaseStyle = `${inputBaseStyle} min-h-[100px]`;

interface FormErrors {
  clientId?: string;
  date?: string;
  type?: string;
  summary?: string;
}

const communicationTypes: CommunicationType[] = ['Email', 'Call', 'Meeting', 'Note'];

const getInitialFormData = (logEntry?: CommunicationLogEntry, clients?: Client[]): Partial<NewCommunicationLogData> => {
    if (logEntry) {
        return {
            clientId: logEntry.clientId,
            date: logEntry.date ? logEntry.date.split('T')[0] : new Date().toISOString().split('T')[0],
            type: logEntry.type,
            summary: logEntry.summary,
            notes: logEntry.notes || '',
            recordedBy: logEntry.recordedBy || 'Consultant',
        };
    }
    return {
        clientId: clients && clients.length > 0 ? clients[0].id : '',
        date: new Date().toISOString().split('T')[0], // Default to today
        type: 'Email', // Default type
        summary: '',
        notes: '',
        recordedBy: 'Consultant', // Default user
    };
};


export const AddCommunicationLogForm: React.FC<AddCommunicationLogFormProps> = ({ clients, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<NewCommunicationLogData>>(getInitialFormData(initialData, clients));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(getInitialFormData(initialData, clients));
    setErrors({}); 
  }, [initialData, clients]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.clientId) newErrors.clientId = 'Client is required.';
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.type) newErrors.type = 'Type is required.';
    if (!formData.summary || formData.summary.trim() === '') newErrors.summary = 'Summary is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // The onSave function now expects (logData, idToUpdate?)
      onSave(formData as NewCommunicationLogData, initialData?.id); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="clientId" className={labelBaseStyle}>Client <span className="text-[#DD6B20]">*</span></label>
        <select
          name="clientId"
          id="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.clientId ? 'border-[#DD6B20]' : 'border-slate-300'}`}
          aria-required="true"
          aria-invalid={!!errors.clientId}
        >
          <option value="" disabled>Select a client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.clientName}</option>
          ))}
        </select>
        {errors.clientId && <p className="mt-1 text-xs text-[#DD6B20]">{errors.clientId}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className={labelBaseStyle}>Date <span className="text-[#DD6B20]">*</span></label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.date ? 'border-[#DD6B20]' : 'border-slate-300'}`}
            aria-required="true"
            aria-invalid={!!errors.date}
          />
          {errors.date && <p className="mt-1 text-xs text-[#DD6B20]">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="type" className={labelBaseStyle}>Type <span className="text-[#DD6B20]">*</span></label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.type ? 'border-[#DD6B20]' : 'border-slate-300'}`}
            aria-required="true"
            aria-invalid={!!errors.type}
          >
            {communicationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && <p className="mt-1 text-xs text-[#DD6B20]">{errors.type}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelBaseStyle}>Summary <span className="text-[#DD6B20]">*</span></label>
        <textarea
          name="summary"
          id="summary"
          value={formData.summary}
          onChange={handleChange}
          rows={3}
          className={`${textareaBaseStyle} ${errors.summary ? 'border-[#DD6B20]' : 'border-slate-300'}`}
          aria-required="true"
          aria-invalid={!!errors.summary}
        />
        {errors.summary && <p className="mt-1 text-xs text-[#DD6B20]">{errors.summary}</p>}
      </div>

      <div>
        <label htmlFor="notes" className={labelBaseStyle}>Notes (Optional)</label>
        <textarea
          name="notes"
          id="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className={textareaBaseStyle}
        />
      </div>
      
      <div>
        <label htmlFor="recordedBy" className={labelBaseStyle}>Recorded By (Optional)</label>
        <input
          type="text"
          name="recordedBy"
          id="recordedBy"
          value={formData.recordedBy}
          onChange={handleChange}
          className={inputBaseStyle}
        />
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
          {initialData ? 'Update Log Entry' : 'Save Log Entry'}
        </button>
      </div>
    </form>
  );
};