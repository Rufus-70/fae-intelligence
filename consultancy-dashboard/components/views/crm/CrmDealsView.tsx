import React, { useState, useEffect, useMemo } from 'react';
import { Deal, NewDealData, CrmDealStage } from '../../../types';
import { dummyDeals, dummyClients } from '../../../constants';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddDealForm } from './AddDealForm';

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
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const DealStageBadge: React.FC<{ stage: CrmDealStage }> = ({ stage }) => {
  let bgColor = 'bg-slate-500';
  let textColor = 'text-white';

  switch (stage) {
    case 'Lead': bgColor = 'bg-blue-500'; break;
    case 'Contacted': bgColor = 'bg-sky-500'; break;
    case 'Proposal': bgColor = 'bg-indigo-500'; break;
    case 'Negotiation': bgColor = 'bg-purple-500'; break;
    case 'Closed Won': bgColor = 'bg-green-500'; break;
    case 'Closed Lost': bgColor = 'bg-red-500'; break;
    default: bgColor = 'bg-slate-400'; textColor = 'text-slate-800'; break;
  }
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {stage}
    </span>
  );
};

export const CrmDealsView: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);

  useEffect(() => {
    const sortedDeals = [...dummyDeals].sort((a, b) => 
      new Date(b.expectedCloseDate).getTime() - new Date(a.expectedCloseDate).getTime()
    );
    setDeals(sortedDeals);
  }, []);

  const handleSaveDeal = (dealData: NewDealData) => {
    const client = dummyClients.find(c => c.id === dealData.clientId);
    if (!client) {
      console.error("Client not found for new deal");
      return;
    }
    const newDeal: Deal = {
      ...dealData,
      id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      clientName: client.clientName,
    };
    setDeals(prevDeals => [...prevDeals, newDeal].sort((a, b) => 
      new Date(b.expectedCloseDate).getTime() - new Date(a.expectedCloseDate).getTime()
    ));
    setIsAddDealModalOpen(false);
  };

  return (
    <>
      <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-sky-300">Manage Deals</h3>
          <button
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center"
            onClick={() => setIsAddDealModalOpen(true)}
            aria-label="Add New Deal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Deal
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Deal Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Client Name</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sky-300 uppercase tracking-wider">Value</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Stage</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Expected Close</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden md:table-cell">Assigned To</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/30 divide-y divide-slate-700">
              {deals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                    No deals found. Add one to get started!
                  </td>
                </tr>
              ) : (
                deals.map((deal, index) => (
                  <tr key={deal.id} className={`${index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40 transition-colors duration-150`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-100">{deal.dealName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{deal.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 text-right">{formatCurrency(deal.value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <DealStageBadge stage={deal.stage} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{formatDate(deal.expectedCloseDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 hidden md:table-cell">{deal.assignedTo || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-2">
                      <button 
                        className="text-sky-400 hover:text-sky-300 transition-colors text-xs font-medium"
                        disabled // Placeholder
                      >
                        Details
                      </button>
                      <button 
                        className="text-amber-400 hover:text-amber-300 transition-colors text-xs font-medium"
                        disabled // Placeholder
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {isAddDealModalOpen && (
        <Modal
          isOpen={isAddDealModalOpen}
          onClose={() => setIsAddDealModalOpen(false)}
          title="Add New Deal"
        >
          <AddDealForm 
            clients={dummyClients}
            onSave={handleSaveDeal}
            onCancel={() => setIsAddDealModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};