
import React from 'react';
import { Client, ClientStatus } from '../../../types';
import { dummyClients } from '../../../constants';
import { Card } from '../../ui/Card';
import { ClientDetailView } from './ClientDetailView';

interface ClientProfileViewProps {
  selectedClientId: string | null;
  onClientSelected: (clientId: string | null) => void;
  onReturnToList?: () => void; 
  onNavigateToCommLog?: (clientId: string) => void; // New prop
}

export const ClientProfileView: React.FC<ClientProfileViewProps> = ({
  selectedClientId,
  onClientSelected,
  onReturnToList,
  onNavigateToCommLog, // Destructure new prop
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onClientSelected(value || null); 
  };

  if (selectedClientId) {
    return (
      <ClientDetailView
        clientId={selectedClientId}
        onBackToList={() => onClientSelected(null)} 
        onNavigateToCommunicationLog={onNavigateToCommLog} // Pass it down
      />
    );
  }

  return (
    <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl min-h-[400px] flex flex-col items-center border border-slate-200"> {/* Light Gray bg */}
      <div className="w-full max-w-md text-center">
        <h3 className="text-2xl font-semibold text-[#1B365D] mb-6"> {/* Fae Blue title */}
          View Client Profile
        </h3>
        
        <div className="mb-6">
          <label htmlFor="client-select" className="block text-sm font-medium text-[#4A5568] mb-2"> {/* Professional Gray text */}
            Select a client to view their details:
          </label>
          <select
            id="client-select"
            value={selectedClientId || ""}
            onChange={handleSelectChange}
            className="block w-full bg-white border-slate-300 rounded-md shadow-sm focus:ring-[#1B365D] focus:border-[#1B365D] sm:text-sm text-[#4A5568] p-2.5" /* Light input style */
            aria-label="Select a client"
          >
            <option value="">-- Select a Client --</option>
            {dummyClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.clientName}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 text-6xl text-slate-400 opacity-50"> {/* Lighter Professional Gray */}
          👤
        </div>
        <p className="text-slate-500 mt-4"> {/* Lighter Professional Gray */}
          Or navigate from the 'Client List' by clicking a client's "Profile" button.
        </p>

        {onReturnToList && (
          <button
            onClick={onReturnToList}
            className="mt-8 bg-[#1B365D] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center mx-auto" /* Fae Blue button */
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            Back to Full Client List
          </button>
        )}
      </div>
    </Card>
  );
};