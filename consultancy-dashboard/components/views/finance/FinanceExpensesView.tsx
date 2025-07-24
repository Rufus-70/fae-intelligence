import React, { useState } from 'react';
import { FinanceExpensesViewProps, Expense, NewExpenseData, Project } from '../../../types';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddExpenseForm } from './AddExpenseForm'; // To be created

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

export const FinanceExpensesView: React.FC<FinanceExpensesViewProps> = ({
  expenses,
  projects,
  onSaveExpense,
  onDeleteExpense,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | undefined>(undefined);

  const handleOpenModal = (expense?: Expense) => {
    setExpenseToEdit(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setExpenseToEdit(undefined);
    setIsModalOpen(false);
  };

  const handleSave = (formData: NewExpenseData, idToUpdate?: string) => {
    onSaveExpense(formData, idToUpdate);
    handleCloseModal();
  };

  const confirmDelete = (expenseId: string, description: string) => {
    if (window.confirm(`Are you sure you want to delete the expense "${description}"?`)) {
      onDeleteExpense(expenseId);
    }
  };

  const sortedExpenses = [...expenses].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-sky-300">Manage Expenses</h3>
          <button
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center"
            onClick={() => handleOpenModal()}
            aria-label="Add New Expense"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Expense
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-sky-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden sm:table-cell">Project</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/30 divide-y divide-slate-700">
              {sortedExpenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    No expenses recorded yet. Add one to get started!
                  </td>
                </tr>
              ) : (
                sortedExpenses.map((expense, index) => (
                  <tr key={expense.id} className={`${index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40 transition-colors duration-150`}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">{formatDate(expense.date)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">{expense.category}</td>
                    <td className="px-4 py-4 text-sm text-slate-100 max-w-xs truncate" title={expense.description}>{expense.description}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-red-400 text-right">{formatCurrency(expense.amount)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 hidden sm:table-cell">{expense.projectName || <span className="italic text-slate-500">N/A</span>}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center space-x-2">
                      <button 
                        className="text-sky-400 hover:text-sky-300 transition-colors text-xs font-medium"
                        onClick={() => handleOpenModal(expense)}
                        aria-label={`Edit expense: ${expense.description}`}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 transition-colors text-xs font-medium"
                        onClick={() => confirmDelete(expense.id, expense.description)}
                        aria-label={`Delete expense: ${expense.description}`}
                      >
                        Delete
                      </button>
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
          title={expenseToEdit ? `Edit Expense: ${expenseToEdit.description}` : "Add New Expense"}
        >
          <AddExpenseForm
            projects={projects}
            initialData={expenseToEdit}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};
