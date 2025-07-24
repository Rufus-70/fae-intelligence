
import React, { useState, useMemo, useEffect } from 'react';
import { FinanceInvoicesViewProps, Invoice, NewInvoiceData, InvoiceStatus, invoiceStatuses, Client, Project } from '../../../types';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddInvoiceForm } from './AddInvoiceForm'; 

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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const InvoiceStatusBadge: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
  let bgColor = 'bg-slate-500';
  let textColor = 'text-white';

  switch (status) {
    case 'Draft': bgColor = 'bg-slate-400'; textColor = 'text-slate-800'; break;
    case 'Sent': bgColor = 'bg-blue-500'; break;
    case 'Paid': bgColor = 'bg-green-500'; break;
    case 'Overdue': bgColor = 'bg-red-500'; break;
    case 'Cancelled': bgColor = 'bg-neutral-500'; break;
    default: break;
  }
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};


export const FinanceInvoicesView: React.FC<FinanceInvoicesViewProps> = ({
  invoices,
  clients,
  projects,
  onSaveInvoice,
  onDeleteInvoice,
  onUpdateInvoiceStatus,
  onGenerateRevenueFromInvoice,
  activeFilter,
  onClearFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | undefined>(undefined);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [invoiceForStatusChange, setInvoiceForStatusChange] = useState<Invoice | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus>('Draft');
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Local filter for the dropdown, initialized by the prop
  const [currentStatusFilter, setCurrentStatusFilter] = useState<InvoiceStatus | 'All'>(activeFilter);

  useEffect(() => {
    setCurrentStatusFilter(activeFilter);
  }, [activeFilter]);


  const handleOpenModal = (invoice?: Invoice) => {
    setInvoiceToEdit(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setInvoiceToEdit(undefined);
    setIsModalOpen(false);
  };

  const handleSave = (formData: NewInvoiceData, idToUpdate?: string) => {
    onSaveInvoice(formData, idToUpdate);
    handleCloseModal();
  };

  const confirmDelete = (invoiceId: string, invoiceNumber: string) => {
    if (window.confirm(`Are you sure you want to delete invoice "${invoiceNumber}"?`)) {
      onDeleteInvoice(invoiceId);
    }
  };
  
  const handleOpenStatusModal = (invoice: Invoice) => {
    setInvoiceForStatusChange(invoice);
    setSelectedStatus(invoice.status);
    setPaymentDate(invoice.paymentDate ? invoice.paymentDate.split('T')[0] : new Date().toISOString().split('T')[0]);
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setInvoiceForStatusChange(null);
    setIsStatusModalOpen(false);
  };

  const handleConfirmStatusChange = () => {
    if (invoiceForStatusChange) {
      const payDate = selectedStatus === 'Paid' ? paymentDate : undefined;
      onUpdateInvoiceStatus(invoiceForStatusChange.id, selectedStatus, payDate);
    }
    handleCloseStatusModal();
  };


  const sortedAndFilteredInvoices = useMemo(() => {
    return invoices
      .filter(invoice => currentStatusFilter === 'All' || invoice.status === currentStatusFilter)
      .sort((a,b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
  }, [invoices, currentStatusFilter]);

  return (
    <>
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-2xl font-semibold text-sky-300">
            {currentStatusFilter !== 'All' ? `${currentStatusFilter} Invoices` : 'All Invoices'}
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <select
              value={currentStatusFilter}
              onChange={(e) => setCurrentStatusFilter(e.target.value as InvoiceStatus | 'All')}
              className="block w-full sm:w-auto bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5"
              aria-label="Filter invoices by status"
            >
              <option value="All">All Statuses</option>
              {invoiceStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center justify-center"
              onClick={() => handleOpenModal()}
              aria-label="Add New Invoice"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Invoice
            </button>
          </div>
        </div>
        
        {activeFilter !== 'All' && activeFilter === currentStatusFilter && onClearFilter && (
            <div className="mb-4 flex items-center justify-start">
                <p className="text-sm text-slate-400 italic mr-3">
                    Showing invoices filtered by: {activeFilter}.
                </p>
                <button
                    onClick={onClearFilter}
                    className="bg-slate-600 hover:bg-slate-500 text-slate-300 font-medium py-1 px-3 rounded-lg shadow text-xs transition-colors"
                    aria-label="Clear incoming filter"
                >
                    Show All Invoices
                </button>
            </div>
        )}


        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Number</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden md:table-cell">Project</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Issue Date</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Due Date</th>
                <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-sky-300 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/30 divide-y divide-slate-700">
              {sortedAndFilteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-slate-400">
                    No invoices found{currentStatusFilter !== 'All' ? ` with status "${currentStatusFilter}"` : ""}.
                  </td>
                </tr>
              ) : (
                sortedAndFilteredInvoices.map((invoice, index) => (
                  <tr key={invoice.id} className={`${index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40 transition-colors duration-150`}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-slate-100">{invoice.invoiceNumber}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-300">{invoice.clientName}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-300 hidden md:table-cell">{invoice.projectName || <span className="italic text-slate-500">N/A</span>}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-300">{formatDate(invoice.issueDate)}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-300">{formatDate(invoice.dueDate)}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-green-400 text-right">{formatCurrency(invoice.totalAmount)}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-center">
                      <button onClick={() => handleOpenStatusModal(invoice)} className="focus:outline-none" aria-label={`Change status for invoice ${invoice.invoiceNumber}`}>
                         <InvoiceStatusBadge status={invoice.status} />
                      </button>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-center space-x-2">
                      <button 
                        className="text-sky-400 hover:text-sky-300 transition-colors text-xs font-medium"
                        onClick={() => handleOpenModal(invoice)}
                        aria-label={`Edit invoice ${invoice.invoiceNumber}`}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 transition-colors text-xs font-medium"
                        onClick={() => confirmDelete(invoice.id, invoice.invoiceNumber)}
                        aria-label={`Delete invoice ${invoice.invoiceNumber}`}
                      >
                        Delete
                      </button>
                       {invoice.status === 'Paid' && (
                         <button
                            onClick={() => onGenerateRevenueFromInvoice(invoice)}
                            className="text-teal-400 hover:text-teal-300 transition-colors text-xs font-medium"
                            aria-label={`Generate revenue for invoice ${invoice.invoiceNumber}`}
                            title="Generate Revenue Item (if not auto-created)"
                          >
                            Log Revenue
                          </button>
                       )}
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
          title={invoiceToEdit ? `Edit Invoice: ${invoiceToEdit.invoiceNumber}` : "Add New Invoice"}
        >
          <AddInvoiceForm
            clients={clients}
            projects={projects}
            initialData={invoiceToEdit}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}

      {isStatusModalOpen && invoiceForStatusChange && (
        <Modal
          isOpen={isStatusModalOpen}
          onClose={handleCloseStatusModal}
          title={`Update Status: ${invoiceForStatusChange.invoiceNumber}`}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="invoiceStatus" className="block text-sm font-medium text-sky-300 mb-1">New Status</label>
              <select
                id="invoiceStatus"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as InvoiceStatus)}
                className="block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5"
              >
                {invoiceStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            {selectedStatus === 'Paid' && (
              <div>
                <label htmlFor="paymentDate" className="block text-sm font-medium text-sky-300 mb-1">Payment Date</label>
                <input
                  type="date"
                  id="paymentDate"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5"
                />
              </div>
            )}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleCloseStatusModal}
                className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusChange}
                className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};