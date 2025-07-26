import React, { useState, useEffect } from 'react';
import { AddExpenseFormProps, NewExpenseData, ExpenseCategory, expenseCategories, Project, Expense } from '../../../types';

const inputBaseStyle = "block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-sky-300 mb-1";
const textareaBaseStyle = `${inputBaseStyle} min-h-[80px]`;

interface FormErrors {
  date?: string;
  category?: string;
  description?: string;
  amount?: string;
}

const getInitialFormData = (expense?: Expense): NewExpenseData => ({
  expenseName: expense?.description ? expense.description.substring(0, 50) + ' - ' + expense.date : '', // Derive expenseName from description and date
  date: expense?.date ? expense.date.split('T')[0] : new Date().toISOString().split('T')[0],
  category: expense?.category || expenseCategories[0],
  description: expense?.description || '',
  amount: expense?.amount || 0,
  projectId: expense?.projectId || undefined,
  receiptUrl: expense?.receiptUrl || '',
});

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ projects, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewExpenseData>(getInitialFormData(initialData));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(getInitialFormData(initialData));
    setErrors({});
  }, [initialData]);

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

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
    } catch (e) { return ''; }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    if (formData.amount === undefined || formData.amount === null || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Ensure amount is a number
      const dataToSave: NewExpenseData = {
        ...formData,
        expenseName: formData.description.substring(0, 50) + ' - ' + formData.date, // Derive expenseName
        amount: Number(formData.amount)
      };
      onSave(dataToSave, initialData?.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className={labelBaseStyle}>Date <span className="text-red-400">*</span></label>
          <input
            type="date"
            name="date"
            id="date"
            value={formatDateForInput(formData.date)}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.date ? 'border-red-500' : 'border-slate-600'}`}
            aria-required="true"
            aria-invalid={!!errors.date}
          />
          {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="category" className={labelBaseStyle}>Category <span className="text-red-400">*</span></label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.category ? 'border-red-500' : 'border-slate-600'}`}
            aria-required="true"
            aria-invalid={!!errors.category}
          >
            {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelBaseStyle}>Description <span className="text-red-400">*</span></label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          className={`${textareaBaseStyle} ${errors.description ? 'border-red-500' : 'border-slate-600'}`}
          aria-required="true"
          aria-invalid={!!errors.description}
        />
        {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
      </div>
      
      <div>
        <label htmlFor="amount" className={labelBaseStyle}>Amount ($) <span className="text-red-400">*</span></label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={formData.amount === undefined ? '' : formData.amount}
          onChange={handleChange}
          className={`${inputBaseStyle} ${errors.amount ? 'border-red-500' : 'border-slate-600'}`}
          placeholder="e.g., 49.99"
          step="0.01"
          aria-required="true"
          aria-invalid={!!errors.amount}
        />
        {errors.amount && <p className="mt-1 text-xs text-red-400">{errors.amount}</p>}
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
          <option value="">-- No Associated Project --</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.projectName}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="receiptUrl" className={labelBaseStyle}>Receipt URL (Optional)</label>
        <input
          type="url"
          name="receiptUrl"
          id="receiptUrl"
          value={formData.receiptUrl || ''}
          onChange={handleChange}
          className={inputBaseStyle}
          placeholder="https://example.com/receipt.pdf"
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
          {initialData ? 'Update Expense' : 'Save Expense'}
        </button>
      </div>
    </form>
  );
};
