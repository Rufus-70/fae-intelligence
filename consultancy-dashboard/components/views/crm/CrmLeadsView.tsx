
import React, { useState, useEffect, useMemo } from 'react';
import { Client, ClientStatus, NewLeadData, CrmLeadsViewProps } from '../../../types'; // Updated import
// dummyClients import removed as clients will be passed via props
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddLeadForm } from './AddLeadForm';

// Props definition for CrmLeadsView
// interface CrmLeadsViewProps { // Props interface moved to types.ts
//   clients: Client[]; 
//   onViewProfile: (clientId: string) => void;
//   onNavigateToCommLogForClient: (clientId: string) => void; // Added
// }

const StatusBadge: React.FC<{ status: ClientStatus }> = ({ status }) => {
  let bgColor = 'bg-slate-500'; // Default: Professional Gray based
  let textColor = 'text-white';

  switch (status) {
    case 'Active': bgColor = 'bg-[#38A169]'; break; // Success Green
    case 'Prospect': bgColor = 'bg-[#1B365D]'; break; // Fae Blue
    case 'Lead': bgColor = 'bg-yellow-400'; textColor = 'text-slate-800'; break; // Kept yellow
    case 'Inactive': default: bgColor = 'bg-slate-300'; textColor = 'text-[#4A5568]'; break; // Light Gray
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

export const CrmLeadsView: React.FC<CrmLeadsViewProps> = ({ clients: globalClients, onViewProfile, onNavigateToCommLogForClient }) => {
  const [leads, setLeads] = useState<Client[]>([]); // This can now be derived from globalClients
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  useEffect(() => {
    const initialLeads = globalClients.filter(
      client => client.status === 'Lead' // Only 'Lead' status for this view
    );
    setLeads(initialLeads.sort((a,b) => new Date(b.lastInteraction || 0).getTime() - new Date(a.lastInteraction || 0).getTime()));
  }, [globalClients]);

  const handleOpenAddLeadModal = () => {
    setIsAddLeadModalOpen(true);
  };

  const handleCloseAddLeadModal = () => {
    setIsAddLeadModalOpen(false);
  };

  const handleSaveLead = (leadData: NewLeadData) => {
    // This function would ideally call a handler passed from App.tsx to update global clients
    // For now, it simulates local update.
    const newLead: Client = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      clientName: leadData.leadName,
      contactPerson: leadData.contactPerson,
      email: leadData.email,
      phone: leadData.phone,
      status: 'Lead', // Explicitly 'Lead' for this view's add form
      projectsCount: 0,
      lastInteraction: new Date().toISOString(),
    };
    // If managing leads globally, this would be props.onSaveLead(newLead);
    setLeads(prevLeads => [newLead, ...prevLeads].sort((a,b) => new Date(b.lastInteraction || 0).getTime() - new Date(a.lastInteraction || 0).getTime()));
    console.warn("Lead saved locally in CrmLeadsView. Consider managing state globally via App.tsx for data persistence across views.");
    handleCloseAddLeadModal();
  };

  return (
    <>
      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-[#1B365D]">Manage Leads</h3> {/* Fae Blue title */}
          <button
            className="bg-[#1B365D] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center" /* Fae Blue button */
            onClick={handleOpenAddLeadModal}
            aria-label="Add New Lead"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Lead
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200"> {/* Light divider */}
            <thead className="bg-slate-100"> {/* Lighter header bg */}
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Last Interaction</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200"> {/* White body bg, light divider */}
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500"> {/* Professional Gray variant */}
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors duration-150"> {/* Lighter hover */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4A5568]">{lead.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lead.contactPerson || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <a href={`mailto:${lead.email}`} className="hover:text-[#1B365D] transition-colors">{lead.email}</a> {/* Fae Blue link hover */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {lead.lastInteraction ? (
                        <button
                          onClick={() => onNavigateToCommLogForClient(lead.id)}
                          className="text-[#1B365D] hover:text-blue-700 underline transition-colors"
                          aria-label={`View communication log for ${lead.clientName}, last interaction on ${formatDate(lead.lastInteraction)}`}
                          title="View communication log"
                        >
                          {formatDate(lead.lastInteraction)}
                        </button>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-2">
                      <button 
                        className="text-[#1B365D] hover:text-blue-700 transition-colors text-xs font-medium" /* Fae Blue */
                        onClick={() => onViewProfile(lead.id)}
                        aria-label={`View profile for ${lead.clientName}`}
                      >
                        Profile
                      </button>
                      <button 
                        className="text-[#38A169] hover:text-green-700 transition-colors text-xs font-medium" /* Success Green */
                        // onClick={() => {/* TODO: onConvertToDeal(lead.id) */}}
                        aria-label={`Convert ${lead.clientName} to deal`}
                        disabled // Placeholder
                      >
                        Convert
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {isAddLeadModalOpen && (
        <Modal
          isOpen={isAddLeadModalOpen}
          onClose={handleCloseAddLeadModal}
          title="Add New Lead"
        >
          <AddLeadForm 
            onSave={handleSaveLead} 
            onCancel={handleCloseAddLeadModal}
            defaultStatus="Lead" 
          />
        </Modal>
      )}
    </>
  );
};