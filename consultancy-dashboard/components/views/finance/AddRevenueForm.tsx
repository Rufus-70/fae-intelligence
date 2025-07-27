
import React, { useState, useEffect } from 'react';
import { AddRevenueFormProps, NewRevenueData, RevenueSource, revenueSources, Project, Client, RevenueItem, Invoice } from '../../../types';

const inputBaseStyle = "block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5 placeholder-slate-400";
const labelBaseStyle = "block text-sm font-medium text-sky-300 mb-1";
const textareaBaseStyle = `${inputBaseStyle} min-h-[80px]`;
const disabledInputStyle = "bg-slate-600 cursor-not-allowed";

interface FormErrors {
  date?: string;
  source?: string;
  description?: string;
  amount?: string;
  invoiceId?: string;
  attachments?: string;
}

const getInitialFormData = (item?: RevenueItem): NewRevenueData => ({
  date: item?.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0],
  source: item?.source || revenueSources.find(s => s === 'Invoice Payment') || revenueSources[0],
  description: item?.description || '',
  amount: item?.amount || 0,
  projectId: item?.projectId || undefined,
  clientId: item?.clientId || undefined,
  invoiceId: item?.invoiceId || undefined,
  attachments: item?.attachments || [],
});

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null || isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export const AddRevenueForm: React.FC<AddRevenueFormProps> = ({ projects, clients, invoices, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewRevenueData>(getInitialFormData(initialData));
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  
  const isInvoiceLinked = !!formData.invoiceId;

  useEffect(() => {
    const newInitialData = getInitialFormData(initialData);
    setFormData(newInitialData);
    setImagePreview(newInitialData.attachments || []);
    
    if (newInitialData.invoiceId) { // If initialData has an invoiceId, trigger population
        const selectedInvoice = invoices.find(inv => inv.id === newInitialData.invoiceId);
        if (selectedInvoice) {
             setFormData(prev => ({
                ...prev, // Keep initial data that might not be from invoice
                amount: selectedInvoice.totalAmount,
                description: (!newInitialData.description || newInitialData.description.startsWith("Payment for Invoice")) 
                             ? `Payment for Invoice ${selectedInvoice.invoiceNumber}` 
                             : newInitialData.description,
                clientId: selectedInvoice.clientId,
                projectId: selectedInvoice.projectId || undefined,
                date: (selectedInvoice.paymentDate || selectedInvoice.issueDate).split('T')[0],
                source: 'Invoice Payment',
            }));
        }
    }
    setErrors({});
  }, [initialData, invoices]);


  const handleInvoiceLinkChange = (selectedInvoiceId: string) => {
    const selectedInvoice = invoices.find(inv => inv.id === selectedInvoiceId);
    if (selectedInvoice) {
        setFormData(prev => ({
            ...prev,
            invoiceId: selectedInvoice.id,
            amount: selectedInvoice.totalAmount,
            description: (!prev.description || prev.description.startsWith("Payment for Invoice")) 
                         ? `Payment for Invoice ${selectedInvoice.invoiceNumber}` 
                         : prev.description,
            clientId: selectedInvoice.clientId,
            projectId: selectedInvoice.projectId || undefined,
            date: (selectedInvoice.paymentDate || selectedInvoice.issueDate).split('T')[0],
            source: 'Invoice Payment',
        }));
    } else { 
         setFormData(prev => ({
            ...prev,
            invoiceId: undefined,
            // Revert to a default state or allow user to manually edit
            // For now, if unlinking, amount becomes editable, other fields remain for manual adjustment
            // User might want to keep pre-filled client/project even if they detach invoice temporarily
            source: prev.source === 'Invoice Payment' ? (revenueSources.find(s => s === 'Project Payment') || revenueSources[0]) : prev.source, // Change source if it was 'Invoice Payment'
         }));
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (name === 'invoiceId') {
        handleInvoiceLinkChange(value);
        return;
    }
    
    let processedValue: string | number | undefined = value;
    if (name === 'amount') {
        processedValue = value === '' ? undefined : parseFloat(value);
    } else if (type === 'number' && name !== 'amount') { 
        processedValue = value === '' ? undefined : parseFloat(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) { // 5MB limit
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          setFormData(prev => ({
            ...prev,
            attachments: [...(prev.attachments || []), base64String]
          }));
          setImagePreview(prev => [...prev, base64String]);
        };
        reader.readAsDataURL(file);
      } else if (file.size > 5 * 1024 * 1024) {
        // Show error for large files
        setErrors(prev => ({ 
          ...prev, 
          attachments: `File "${file.name}" is too large. Please use images under 5MB.` 
        }));
      }
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index) || []
    }));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    // Clear any attachment errors when removing images
    if (errors.attachments) {
      setErrors(prev => ({ ...prev, attachments: undefined }));
    }
  };

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.source) newErrors.source = 'Source is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
     if (formData.amount === undefined || formData.amount === null || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid positive amount is required.';
    }
    if (formData.source === 'Invoice Payment' && !formData.invoiceId) {
        newErrors.invoiceId = 'Please select an invoice if source is "Invoice Payment". Or change source.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSave: NewRevenueData = {
        ...formData,
        amount: Number(formData.amount) 
      };
      onSave(dataToSave, initialData?.id);
    }
  };

  const availableInvoicesForLinking = invoices.filter(inv => inv.status === 'Paid' || inv.status === 'Sent' || inv.status === 'Overdue');

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
            className={`${inputBaseStyle} ${errors.date ? 'border-red-500' : ''} ${isInvoiceLinked ? disabledInputStyle : ''}`}
            aria-required="true"
            aria-invalid={!!errors.date}
            disabled={isInvoiceLinked} 
          />
          {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="source" className={labelBaseStyle}>Source <span className="text-red-400">*</span></label>
          <select
            name="source"
            id="source"
            value={formData.source}
            onChange={handleChange}
            className={`${inputBaseStyle} ${errors.source ? 'border-red-500' : ''} ${isInvoiceLinked ? disabledInputStyle : ''}`}
            aria-required="true"
            aria-invalid={!!errors.source}
            disabled={isInvoiceLinked} 
          >
            {revenueSources.map(src => <option key={src} value={src}>{src}</option>)}
          </select>
          {errors.source && <p className="mt-1 text-xs text-red-400">{errors.source}</p>}
        </div>
      </div>

      <div>
          <label htmlFor="invoiceId" className={labelBaseStyle}>Link to Invoice (Optional)</label>
          <select
              name="invoiceId"
              id="invoiceId"
              value={formData.invoiceId || ''}
              onChange={handleChange}
              className={`${inputBaseStyle} ${errors.invoiceId ? 'border-red-500' : ''}`}
          >
              <option value="">-- Select an Invoice --</option>
              {availableInvoicesForLinking.map(inv => (
                  <option key={inv.id} value={inv.id}>
                      {inv.invoiceNumber} - {inv.clientName} ({formatCurrency(inv.totalAmount)}) - Status: {inv.status}
                  </option>
              ))}
          </select>
           {errors.invoiceId && <p className="mt-1 text-xs text-red-400">{errors.invoiceId}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelBaseStyle}>Description <span className="text-red-400">*</span></label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          className={`${textareaBaseStyle} ${errors.description ? 'border-red-500' : ''} ${isInvoiceLinked && formData.description.startsWith("Payment for Invoice") ? disabledInputStyle : ''}`}
          aria-required="true"
          aria-invalid={!!errors.description}
          disabled={isInvoiceLinked && formData.description.startsWith("Payment for Invoice")}
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
          className={`${inputBaseStyle} ${errors.amount ? 'border-red-500' : ''} ${isInvoiceLinked ? disabledInputStyle : ''}`}
          placeholder="e.g., 1500.00"
          step="0.01"
          aria-required="true"
          aria-invalid={!!errors.amount}
          disabled={isInvoiceLinked}
        />
        {errors.amount && <p className="mt-1 text-xs text-red-400">{errors.amount}</p>}
      </div>

      {/* Image Upload Section */}
      <div>
        <label htmlFor="images" className={labelBaseStyle}>
          🎨 Attach Images <span className="text-slate-400">(Optional - Marketing Assets, Receipts, Invoices)</span>
        </label>
        <div className="text-xs text-slate-400 mb-2">
          Perfect for: Stock photos, marketing materials, campaign assets, receipts, payment confirmations
        </div>
        <div className="space-y-3">
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="images"
            className={`${inputBaseStyle} border-2 border-dashed border-slate-500 hover:border-sky-400 cursor-pointer flex items-center justify-center text-center py-8 transition-colors group`}
          >
            <div className="space-y-3">
              <div className="text-sky-400 text-3xl group-hover:scale-110 transition-transform">�️</div>
              <div className="text-sm">
                <span className="text-sky-300 font-medium">Click to upload marketing images</span>
                <br />
                <span className="text-slate-400">Stock photos, designs, receipts • PNG, JPG, JPEG (max 5MB each)</span>
                <br />
                <span className="text-xs text-emerald-400">✨ Perfect for tracking marketing asset purchases</span>
              </div>
            </div>
          </label>
          
          {/* Enhanced Image Preview Grid */}
          {(formData.attachments && formData.attachments.length > 0) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sky-300 font-medium">
                  📁 Attached Files ({formData.attachments.length})
                </span>
                <span className="text-xs text-slate-400">
                  Hover to remove • Click to preview
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formData.attachments.map((attachment, index) => (
                  <div key={index} className="relative group">
                    <div className="relative overflow-hidden rounded-lg border-2 border-slate-600 hover:border-sky-400 transition-colors">
                      <img
                        src={attachment}
                        alt={`Marketing Asset ${index + 1}`}
                        className="w-full h-24 object-cover transition-transform group-hover:scale-105"
                        onClick={() => window.open(attachment, '_blank')}
                        style={{ cursor: 'pointer' }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                        <span className="text-white text-xs opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 px-2 py-1 rounded">
                          🔍 Click to view
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm transition-all opacity-0 group-hover:opacity-100 shadow-lg hover:shadow-red-500/25"
                      title="Remove image"
                    >
                      ✕
                    </button>
                    {/* Image type indicator */}
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
              {/* Quick actions for multiple images */}
              {formData.attachments.length > 1 && (
                <div className="flex items-center gap-2 pt-2 border-t border-slate-600">
                  <span className="text-xs text-slate-400">Quick actions:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, attachments: [] }));
                      setImagePreview([]);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    🗑️ Clear all
                  </button>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-emerald-400">
                    💡 Great for marketing campaigns!
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        {errors.attachments && <p className="mt-1 text-xs text-red-400">{errors.attachments}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="projectId" className={labelBaseStyle}>Associated Project</label>
          <select
            name="projectId"
            id="projectId"
            value={formData.projectId || ''}
            onChange={handleChange}
            className={`${inputBaseStyle} ${isInvoiceLinked ? disabledInputStyle : ''}`}
            disabled={isInvoiceLinked}
          >
            <option value="">-- No Associated Project --</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.projectName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="clientId" className={labelBaseStyle}>Associated Client</label>
          <select
            name="clientId"
            id="clientId"
            value={formData.clientId || ''}
            onChange={handleChange}
            className={`${inputBaseStyle} ${isInvoiceLinked ? disabledInputStyle : ''}`}
            disabled={isInvoiceLinked}
          >
            <option value="">-- No Associated Client --</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.clientName}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Manual Invoice ID entry is removed as linking from dropdown is preferred. 
          If source is not 'Invoice Payment' but user wants to type an ID, they can use description.
          Or, for more robust system, invoice ID should only be set via dropdown.
      */}

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
          {initialData ? 'Update Revenue' : 'Save Revenue'}
        </button>
      </div>
    </form>
  );
};
