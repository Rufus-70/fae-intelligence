
import React, { useState, useEffect, useMemo } from 'react';
import { Client, ClientStatus, NewLeadData, CrmProspectsViewProps } from '../../../types'; // Updated import
// Removed dummyClients import as clients will be passed via props
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddLeadForm } from './AddLeadForm';

// interface CrmProspectsViewProps { // Props interface moved to types.ts
//   clients: Client[];
//   onViewProfile: (clientId: string) => void;
//   onNavigateToCommLogForClient: (clientId: string) => void; // Added
// }

const StatusBadge: React.FC<{ status: ClientStatus }> = ({ status }) => {
  // Consistent with other views
  let bgColor = 'bg-slate-500'; 
  let textColor = 'text-white';

  switch (status) {
    case 'Active': bgColor = 'bg-[#38A169]'; break;
    case 'Prospect': bgColor = 'bg-[#1B365D]'; break; 
    case 'Lead': bgColor = 'bg-yellow-400'; textColor = 'text-slate-800'; break;
    case 'Inactive': default: bgColor = 'bg-slate-300'; textColor = 'text-[#4A5568]'; break;
  }
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

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

export const CrmProspectsView: React.FC<CrmProspectsViewProps> = ({ clients: globalClients, onViewProfile, onNavigateToCommLogForClient }) => {
  const [prospects, setProspects] = useState<Client[]>([]);
  const [isAddProspectModalOpen, setIsAddProspectModalOpen] = useState(false);

  useEffect(() => {
    const initialProspects = globalClients.filter(
      client => client.status === 'Prospect'
    );
    setProspects(initialProspects.sort((a,b) => new Date(b.lastInteraction || 0).getTime() - new Date(a.lastInteraction || 0).getTime()));
  }, [globalClients]);

  const handleOpenAddProspectModal = () => {
    setIsAddProspectModalOpen(true);
  };

  const handleCloseAddProspectModal = () => {
    setIsAddProspectModalOpen(false);
  };

  const handleSaveProspect = (prospectData: NewLeadData) => {
    // This function would ideally call a handler passed from App.tsx to update global clients
    // For now, it simulates local update and ensures status is 'Prospect'.
    const newProspect: Client = {
      id: `prospect_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      clientName: prospectData.leadName,
      contactPerson: prospectData.contactPerson,
      email: prospectData.email,
      phone: prospectData.phone,
      status: 'Prospect', // Explicitly set status
      projectsCount: 0,
      lastInteraction: new Date().toISOString(),
    };
    // If managing prospects globally, this would be props.onSaveProspect(newProspect);
    setProspects(prevProspects => [newProspect, ...prevProspects].sort((a,b) => new Date(b.lastInteraction || 0).getTime() - new Date(a.lastInteraction || 0).getTime()));
    console.warn("Prospect saved locally in CrmProspectsView. Consider managing state globally via App.tsx for data persistence across views.");
    handleCloseAddProspectModal();
  };

  return (
    <>
      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-[#1B365D]">Manage Prospects</h3>
          <button
            className="bg-[#1B365D] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center"
            onClick={handleOpenAddProspectModal}
            aria-label="Add New Prospect"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Prospect
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Prospect Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Last Interaction</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {prospects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No prospects found.
                  </td>
                </tr>
              ) : (
                prospects.map((prospect) => (
                  <tr key={prospect.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4A5568]">{prospect.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{prospect.contactPerson || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <a href={`mailto:${prospect.email}`} className="hover:text-[#1B365D] transition-colors">{prospect.email}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <StatusBadge status={prospect.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                       {prospect.lastInteraction ? (
                        <button
                          onClick={() => onNavigateToCommLogForClient(prospect.id)}
                          className="text-[#1B365D] hover:text-blue-700 underline transition-colors"
                          aria-label={`View communication log for ${prospect.clientName}, last interaction on ${formatDate(prospect.lastInteraction)}`}
                          title="View communication log"
                        >
                          {formatDate(prospect.lastInteraction)}
                        </button>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-2">
                      <button 
                        className="text-[#1B365D] hover:text-blue-700 transition-colors text-xs font-medium"
                        onClick={() => onViewProfile(prospect.id)}
                        aria-label={`View profile for ${prospect.clientName}`}
                      >
                        Profile
                      </button>
                      <button 
                        className="text-[#38A169] hover:text-green-700 transition-colors text-xs font-medium"
                        // onClick={() => {/* TODO: onConvertToDeal(prospect.id) */}}
                        aria-label={`Convert ${prospect.clientName} to deal`}
                        disabled // Placeholder
                      >
                        Convert to Deal
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {isAddProspectModalOpen && (
        <Modal
          isOpen={isAddProspectModalOpen}
          onClose={handleCloseAddProspectModal}
          title="Add New Prospect"
        >
          <AddLeadForm 
            onSave={handleSaveProspect} // This should eventually call a global handler
            onCancel={handleCloseAddProspectModal}
            defaultStatus="Prospect" // Set default status for this form instance
          />
        </Modal>
      )}
    </>
  );
};