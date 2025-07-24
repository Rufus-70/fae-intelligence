
import React, { useState } from 'react';
import { FinanceRevenueViewProps, RevenueItem, NewRevenueData, Project, Client, Invoice } from '../../../types';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddRevenueForm } from './AddRevenueForm'; 

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

export const FinanceRevenueView: React.FC<FinanceRevenueViewProps> = ({
  revenueItems,
  projects,
  clients,
  invoices, 
  onSaveRevenue,
  onDeleteRevenue,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [revenueItemToEdit, setRevenueItemToEdit] = useState<RevenueItem | undefined>(undefined);

  const handleOpenModal = (item?: RevenueItem) => {
    setRevenueItemToEdit(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setRevenueItemToEdit(undefined);
    setIsModalOpen(false);
  };

  const handleSave = (formData: NewRevenueData, idToUpdate?: string) => {
    onSaveRevenue(formData, idToUpdate);
    handleCloseModal();
  };

  const confirmDelete = (revenueId: string, description: string) => {
    if (window.confirm(`Are you sure you want to delete the revenue item "${description}"?`)) {
      onDeleteRevenue(revenueId);
    }
  };
  
  const sortedRevenueItems = [...revenueItems].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-sky-300">Manage Revenue</h3>
          <button
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center"
            onClick={() => handleOpenModal()}
            aria-label="Add New Revenue Item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Revenue
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Source</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-sky-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden md:table-cell">Project</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden lg:table-cell">Client</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Invoice #</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/30 divide-y divide-slate-700">
              {sortedRevenueItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-slate-400">
                    No revenue items recorded yet. Add one to get started!
                  </td>
                </tr>
              ) : (
                sortedRevenueItems.map((item, index) => {
                  const linkedInvoice = item.invoiceId ? invoices.find(inv => inv.id === item.invoiceId) : undefined;
                  return (
                    <tr key={item.id} className={`${index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40 transition-colors duration-150`}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">{formatDate(item.date)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">{item.source}</td>
                      <td className="px-4 py-4 text-sm text-slate-100 max-w-xs truncate" title={item.description}>{item.description}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-green-400 text-right">{formatCurrency(item.amount)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 hidden md:table-cell">{item.projectName || <span className="italic text-slate-500">N/A</span>}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 hidden lg:table-cell">{item.clientName || <span className="italic text-slate-500">N/A</span>}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">
                        {linkedInvoice ? linkedInvoice.invoiceNumber : (item.invoiceId ? <span title={`ID: ${item.invoiceId}`} className="italic text-slate-500">Linked</span> : <span className="italic text-slate-500">N/A</span>)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-center space-x-2">
                        <button 
                          className="text-sky-400 hover:text-sky-300 transition-colors text-xs font-medium"
                          onClick={() => handleOpenModal(item)}
                          aria-label={`Edit revenue: ${item.description}`}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-400 hover:text-red-300 transition-colors text-xs font-medium"
                          onClick={() => confirmDelete(item.id, item.description)}
                          aria-label={`Delete revenue: ${item.description}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={revenueItemToEdit ? `Edit Revenue: ${revenueItemToEdit.description}` : "Add New Revenue Item"}
        >
          <AddRevenueForm
            projects={projects}
            clients={clients}
            invoices={invoices} 
            initialData={revenueItemToEdit}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};
