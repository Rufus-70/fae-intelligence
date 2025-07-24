
import React, { useState, useEffect } from 'react';
import { Client, ClientStatus, NewClientData } from '../../../types';
import { dummyClients } from '../../../constants'; // To initialize local state
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { ClientForm } from './AddClientForm'; // Updated import to match filename

interface ClientListViewProps {
  onViewProfile: (clientId: string) => void;
  onNavigateToCommLog: (clientId: string) => void; // Added for navigating to comm log
}

const StatusBadge: React.FC<{ status: ClientStatus }> = ({ status }) => {
  let bgColor = 'bg-slate-500'; // Default: Professional Gray based
  let textColor = 'text-white';

  switch (status) {
    case 'Active': bgColor = 'bg-[#38A169]'; break; // Success Green
    case 'Prospect': bgColor = 'bg-[#1B365D]'; break; // Fae Blue
    case 'Lead': bgColor = 'bg-yellow-400'; textColor = 'text-slate-800'; break; // Kept yellow for distinct visual cue
    case 'Inactive': default: bgColor = 'bg-slate-300'; textColor = 'text-[#4A5568]'; break; // Light Gray with Professional Gray text
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

export const ClientListView: React.FC<ClientListViewProps> = ({ onViewProfile, onNavigateToCommLog }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  useEffect(() => {
    setClients(dummyClients);
  }, []);

  const handleOpenEditModal = (client: Client) => {
    setClientToEdit(client);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setClientToEdit(null); 
  };
  
  const handleOpenAddModal = () => {
    setClientToEdit(null); // Ensure no previous edit data lingers
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveClient = (formData: NewClientData, idToUpdate?: string) => {
    if (idToUpdate) {
      // Update existing client
      setClients(prevClients =>
        prevClients.map(client =>
          client.id === idToUpdate
            ? { ...client, ...formData, lastInteraction: new Date().toISOString() } // Update fields, keep others like projectsCount
            : client
        )
      );
      handleCloseEditModal();
    } else {
      // Add new client
      const newClient: Client = {
        ...formData,
        id: `cli_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        projectsCount: 0,
        lastInteraction: new Date().toISOString(),
      };
      setClients(prevClients => [newClient, ...prevClients]);
      handleCloseAddModal();
    }
  };

  return (
    <>
      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-[#1B365D]">Client Directory</h3> {/* Fae Blue title */}
          <button
            className="bg-[#1B365D] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center" /* Fae Blue button */
            onClick={handleOpenAddModal}
            aria-label="Add New Client"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Client
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200"> {/* Light divider */}
            <thead className="bg-slate-100"> {/* Lighter header bg */}
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Client Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Contact Person</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Phone</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Projects</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Last Interaction</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200"> {/* White body bg, light divider */}
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-slate-500"> {/* Professional Gray variant */}
                    No clients found. Add one to get started!
                  </td>
                </tr>
              ) : (
                clients.map((client, index) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-colors duration-150"> {/* Lighter hover */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4A5568]">{client.clientName}</td> {/* Professional Gray */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{client.contactPerson || 'N/A'}</td> {/* Darker Professional Gray variant */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <a href={`mailto:${client.email}`} className="hover:text-[#1B365D] transition-colors">{client.email}</a> {/* Fae Blue link hover */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{client.phone || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-center">{client.projectsCount ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {client.lastInteraction ? (
                        <button
                          onClick={() => onNavigateToCommLog(client.id)}
                          className="text-[#1B365D] hover:text-blue-700 underline transition-colors"
                          aria-label={`View communication log for ${client.clientName}, last interaction on ${formatDate(client.lastInteraction)}`}
                          title="View communication log"
                        >
                          {formatDate(client.lastInteraction)}
                        </button>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-2">
                      <button 
                        className="text-[#1B365D] hover:text-blue-700 transition-colors text-xs font-medium" /* Fae Blue */
                        onClick={() => onViewProfile(client.id)}
                        aria-label={`View profile for ${client.clientName}`}
                      >
                        Profile
                      </button>
                      <button 
                        className="text-[#DD6B20] hover:text-orange-700 transition-colors text-xs font-medium" /* Warning Orange */
                        onClick={() => handleOpenEditModal(client)}
                        aria-label={`Edit ${client.clientName}`}
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
      
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          title="Add New Client"
        >
          <ClientForm 
            onSave={handleSaveClient}
            onCancel={handleCloseAddModal}
            // initialData is implicitly undefined, which is correct for add mode
          />
        </Modal>
      )}

      {isEditModalOpen && clientToEdit && (
         <Modal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            title={`Edit Client: ${clientToEdit.clientName}`}
        >
            <ClientForm
                initialData={clientToEdit}
                onSave={handleSaveClient}
                onCancel={handleCloseEditModal}
            />
        </Modal>
      )}
    </>
  );
};