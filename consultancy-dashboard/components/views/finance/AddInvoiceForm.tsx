import React, { useState, useEffect, useCallback } from 'react';
import { AddInvoiceFormProps, NewInvoiceData, InvoiceStatus, invoiceStatuses, Client, Project, Invoice, InvoiceLineItem } from '../../../types';

const inputBaseStyle = "block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-sky-300 mb-1";
const textareaBaseStyle = `${inputBaseStyle} min-h-[80px]`;

interface FormErrors {
  clientId?: string;
  issueDate?: string;
  dueDate?: string;
  status?: string;
  lineItems?: string | { index: number, field: keyof InvoiceLineItem, message: string }[];
  taxRate?: string;
}

const getInitialFormData = (invoice?: Invoice, clients?: Client[], projects?: Project[]): NewInvoiceData => {
  const defaultLineItem: Omit<InvoiceLineItem, 'id' | 'total'> = { description: '', quantity: 1, unitPrice: 0 };
  return {
    clientId: invoice?.clientId || (clients && clients.length > 0 ? clients[0].id : ''),
    projectId: invoice?.projectId || undefined,
    issueDate: invoice?.issueDate ? invoice.issueDate.split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate ? invoice.dueDate.split('T')[0] : new Date().toISOString().split('T')[0],
    lineItems: invoice?.lineItems.map(li => ({ description: li.description, quantity: li.quantity, unitPrice: li.unitPrice })) || [defaultLineItem],
    taxRate: invoice?.taxRate === undefined ? undefined : invoice.taxRate,
    status: invoice?.status || 'Draft',
    notes: invoice?.notes || '',
  };
};

export const AddInvoiceForm: React.FC<AddInvoiceFormProps> = ({ clients, projects, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewInvoiceData>(getInitialFormData(initialData, clients, projects));
  const [errors, setErrors] = useState<FormErrors>({});

  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotals = useCallback(() => {
    let currentSubtotal = 0;
    formData.lineItems.forEach(item => {
      currentSubtotal += (item.quantity || 0) * (item.unitPrice || 0);
    });
    setSubtotal(currentSubtotal);

    const currentTaxRate = formData.taxRate === undefined || isNaN(formData.taxRate) ? 0 : formData.taxRate;
    const currentTaxAmount = currentSubtotal * currentTaxRate;
    setTaxAmount(currentTaxAmount);
    setTotalAmount(currentSubtotal + currentTaxAmount);
  }, [formData.lineItems, formData.taxRate]);

  useEffect(() => {
    setFormData(getInitialFormData(initialData, clients, projects));
    setErrors({});
  }, [initialData, clients, projects]);

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number | undefined = value;
    if (type === 'number' || name === 'taxRate') {
      processedValue = value === '' ? undefined : parseFloat(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLineItemChange = (index: number, field: keyof Omit<InvoiceLineItem, 'id'|'total'>, value: string | number) => {
    const newLineItems = [...formData.lineItems];
    const item = newLineItems[index];
    if (item) {
        (item[field] as any) = (field === 'quantity' || field === 'unitPrice') ? (value === '' ? 0 : parseFloat(value as string)) : value;
        // Ensure quantity and unitPrice are not negative
        if (field === 'quantity' && item.quantity < 0) item.quantity = 0;
        if (field === 'unitPrice' && item.unitPrice < 0) item.unitPrice = 0;

        setFormData(prev => ({ ...prev, lineItems: newLineItems }));
    }
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', quantity: 1, unitPrice: 0 }],
    }));
  };

  const removeLineItem = (index: number) => {
    if (formData.lineItems.length <= 1) {
        // Optionally, clear the last item instead of removing it, or show an error.
        // For now, allow removal but it might lead to an empty lineItems array which needs validation.
         setErrors(prev => ({...prev, lineItems: "At least one line item is required."}));
         return; // Prevent removing the last item if desired or show an error.
    }
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
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
    if (!formData.clientId) newErrors.clientId = 'Client is required.';
    if (!formData.issueDate) newErrors.issueDate = 'Issue date is required.';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required.';
    else if (new Date(formData.dueDate) < new Date(formData.issueDate)) {
        newErrors.dueDate = 'Due date cannot be before issue date.';
    }
    if (!formData.status) newErrors.status = 'Status is required.';

    if (formData.lineItems.length === 0) {
        newErrors.lineItems = "At least one line item is required.";
    } else {
        const lineItemErrors: { index: number, field: keyof InvoiceLineItem, message: string }[] = [];
        formData.lineItems.forEach((item, index) => {
            if (!item.description.trim()) {
                lineItemErrors.push({index, field: 'description', message: "Description is required."});
            }
            if (item.quantity === undefined || isNaN(item.quantity) || item.quantity <= 0) {
                lineItemErrors.push({index, field: 'quantity', message: "Quantity must be > 0."});
            }
            if (item.unitPrice === undefined || isNaN(item.unitPrice) || item.unitPrice < 0) { // Allow 0 for free items
                lineItemErrors.push({index, field: 'unitPrice', message: "Unit price must be >= 0."});
            }
        });
        if (lineItemErrors.length > 0) newErrors.lineItems = lineItemErrors;
    }
    
    if (formData.taxRate !== undefined && (isNaN(formData.taxRate) || formData.taxRate < 0 || formData.taxRate > 1)) {
        newErrors.taxRate = "Tax rate must be between 0 (0%) and 1 (100%). E.g., 0.07 for 7%.";
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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Client and Project Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="clientId" className={labelBaseStyle}>Client <span className="text-red-400">*</span></label>
          <select name="clientId" id="clientId" value={formData.clientId} onChange={handleChange} className={`${inputBaseStyle} ${errors.clientId ? 'border-red-500' : ''}`} aria-required="true">
            <option value="" disabled>Select a client</option>
            {clients.map(client => (<option key={client.id} value={client.id}>{client.clientName}</option>))}
          </select>
          {errors.clientId && <p className="mt-1 text-xs text-red-400">{errors.clientId}</p>}
        </div>
        <div>
          <label htmlFor="projectId" className={labelBaseStyle}>Project (Optional)</label>
          <select name="projectId" id="projectId" value={formData.projectId || ''} onChange={handleChange} className={inputBaseStyle}>
            <option value="">-- No Associated Project --</option>
            {projects.filter(p => !formData.clientId || p.clientId === formData.clientId).map(project => (
              <option key={project.id} value={project.id}>{project.projectName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates and Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="issueDate" className={labelBaseStyle}>Issue Date <span className="text-red-400">*</span></label>
          <input type="date" name="issueDate" id="issueDate" value={formatDateForInput(formData.issueDate)} onChange={handleChange} className={`${inputBaseStyle} ${errors.issueDate ? 'border-red-500' : ''}`} aria-required="true"/>
          {errors.issueDate && <p className="mt-1 text-xs text-red-400">{errors.issueDate}</p>}
        </div>
        <div>
          <label htmlFor="dueDate" className={labelBaseStyle}>Due Date <span className="text-red-400">*</span></label>
          <input type="date" name="dueDate" id="dueDate" value={formatDateForInput(formData.dueDate)} onChange={handleChange} className={`${inputBaseStyle} ${errors.dueDate ? 'border-red-500' : ''}`} aria-required="true"/>
          {errors.dueDate && <p className="mt-1 text-xs text-red-400">{errors.dueDate}</p>}
        </div>
        <div>
          <label htmlFor="status" className={labelBaseStyle}>Status <span className="text-red-400">*</span></label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className={`${inputBaseStyle} ${errors.status ? 'border-red-500' : ''}`} aria-required="true">
            {invoiceStatuses.map(s => (<option key={s} value={s}>{s}</option>))}
          </select>
          {errors.status && <p className="mt-1 text-xs text-red-400">{errors.status}</p>}
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-3 pt-3 border-t border-slate-700">
        <h4 className="text-md font-semibold text-sky-300">Line Items</h4>
        {formData.lineItems.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-x-3 gap-y-2 items-end p-3 bg-slate-700/50 rounded-md">
            <div className="col-span-12 sm:col-span-5">
              <label htmlFor={`lineItemDesc-${index}`} className={`${labelBaseStyle} text-xs`}>Description</label>
              <input type="text" id={`lineItemDesc-${index}`} value={item.description} onChange={e => handleLineItemChange(index, 'description', e.target.value)} className={`${inputBaseStyle} py-1.5 text-sm`} placeholder="Service or product description"/>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label htmlFor={`lineItemQty-${index}`} className={`${labelBaseStyle} text-xs`}>Quantity</label>
              <input type="number" id={`lineItemQty-${index}`} value={item.quantity} onChange={e => handleLineItemChange(index, 'quantity', e.target.value)} className={`${inputBaseStyle} py-1.5 text-sm`} placeholder="1" min="0.01" step="0.01"/>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label htmlFor={`lineItemPrice-${index}`} className={`${labelBaseStyle} text-xs`}>Unit Price</label>
              <input type="number" id={`lineItemPrice-${index}`} value={item.unitPrice} onChange={e => handleLineItemChange(index, 'unitPrice', e.target.value)} className={`${inputBaseStyle} py-1.5 text-sm`} placeholder="0.00" min="0" step="0.01"/>
            </div>
            <div className="col-span-4 sm:col-span-2 text-right self-center pt-5">
                <p className="text-sm text-slate-200 font-medium">{(item.quantity * item.unitPrice).toFixed(2)}</p>
            </div>
            <div className="col-span-12 sm:col-span-1 text-right self-center pt-4">
              {formData.lineItems.length > 0 && ( // Show remove button if more than one item or if it's not the only item and becomes empty
                 <button type="button" onClick={() => removeLineItem(index)} className="text-red-400 hover:text-red-300 p-1" aria-label={`Remove line item ${index + 1}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c-.34-.059-.68-.114-1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                </button>
              )}
            </div>
            {typeof errors.lineItems === 'object' && errors.lineItems.filter(err => err.index === index).map(err => (
                 <p key={`${err.index}-${err.field}`} className="col-span-12 mt-1 text-xs text-red-400">Error in item {err.index+1}, field "{err.field}": {err.message}</p>
            ))}
          </div>
        ))}
        {typeof errors.lineItems === 'string' && <p className="mt-1 text-xs text-red-400">{errors.lineItems}</p>}

        <button type="button" onClick={addLineItem} className="text-sm text-sky-400 hover:text-sky-300 flex items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Add Line Item
        </button>
      </div>
      
      {/* Totals Section */}
        <div className="pt-4 border-t border-slate-700 mt-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2"> {/* Spacer */} </div>
                <div>
                    <label htmlFor="taxRate" className={labelBaseStyle}>Tax Rate (e.g., 0.07 for 7%)</label>
                    <input type="number" name="taxRate" id="taxRate" value={formData.taxRate === undefined ? '' : formData.taxRate} onChange={handleChange} className={`${inputBaseStyle} ${errors.taxRate ? 'border-red-500' : ''}`} placeholder="e.g. 0.07" step="0.001" min="0" max="1"/>
                    {errors.taxRate && <p className="mt-1 text-xs text-red-400">{errors.taxRate}</p>}
                </div>
            </div>
            <div className="flex justify-end">
                <div className="w-full md:w-1/3 space-y-1 text-right">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Subtotal:</span>
                        <span className="text-slate-100 font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Tax ({((formData.taxRate || 0) * 100).toFixed(1)}%):</span>
                        <span className="text-slate-100 font-medium">${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-1 border-t border-slate-600">
                        <span className="text-sky-300">Total:</span>
                        <span className="text-sky-300">${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>


      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelBaseStyle}>Notes (Optional)</label>
        <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={3} className={textareaBaseStyle}/>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors">{initialData ? 'Update Invoice' : 'Save Invoice'}</button>
      </div>
    </form>
  );
};
