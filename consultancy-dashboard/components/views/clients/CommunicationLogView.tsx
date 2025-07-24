import React, { useState, useEffect, useMemo } from 'react';
import { CommunicationLogEntry, NewCommunicationLogData, CommunicationType } from '../../../types';
import { dummyCommunicationLogs, dummyClients } from '../../../constants';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { AddCommunicationLogForm } from './AddCommunicationLogForm';

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return 'Invalid Date';
  }
};

const TypeIcon: React.FC<{ type: CommunicationType }> = ({ type }) => {
  let iconSvg;
  // Icons maintained for variety, colors adjusted slightly if needed for contrast on light bg
  switch (type) {
    case 'Email':
      iconSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>;
      break;
    case 'Call':
      iconSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>;
      break;
    case 'Meeting':
      iconSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-600"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m8.117 0a7.47 7.47 0 0 0-3.06-.517M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
      break;
    case 'Note':
      iconSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;
      break;
    default:
      iconSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
  }
  return <span title={type}>{iconSvg}</span>;
};

interface CommunicationLogViewProps {
  initialFilterClientId?: string | null; // Optional prop to pre-filter
}

export const CommunicationLogView: React.FC<CommunicationLogViewProps> = ({ initialFilterClientId }) => {
  const [logs, setLogs] = useState<CommunicationLogEntry[]>([]);
  const [isAddOrEditModalOpen, setIsAddOrEditModalOpen] = useState(false);
  const [logToEdit, setLogToEdit] = useState<CommunicationLogEntry | null>(null);
  const [filterClientId, setFilterClientId] = useState<string>(initialFilterClientId || '');

  useEffect(() => {
    const sortedLogs = [...dummyCommunicationLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setLogs(sortedLogs);
  }, []);

  // Update filter if initialFilterClientId changes (e.g., parent state updated)
  useEffect(() => {
    setFilterClientId(initialFilterClientId || '');
  }, [initialFilterClientId]);

  const handleOpenAddModal = () => {
    setLogToEdit(null);
    setIsAddOrEditModalOpen(true);
  };

  const handleOpenEditModal = (log: CommunicationLogEntry) => {
    setLogToEdit(log);
    setIsAddOrEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setLogToEdit(null);
    setIsAddOrEditModalOpen(false);
  };

  const handleSaveLog = (logData: NewCommunicationLogData, idToUpdate?: string) => {
    const client = dummyClients.find(c => c.id === logData.clientId);
    if (!client) {
      console.error("Client not found for log entry");
      // Optionally show an error to the user
      return;
    }

    if (idToUpdate) {
      // Update existing log
      setLogs(prevLogs =>
        prevLogs.map(log =>
          log.id === idToUpdate
            ? { ...log, ...logData, clientName: client.clientName } // Update existing log with new data
            : log
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    } else {
      // Add new log
      const newLogEntry: CommunicationLogEntry = {
        ...logData,
        id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        clientName: client.clientName,
      };
      setLogs(prevLogs => [...prevLogs, newLogEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
    handleCloseModal();
  };

  const filteredLogs = useMemo(() => {
    if (!filterClientId) {
      return logs;
    }
    return logs.filter(log => log.clientId === filterClientId);
  }, [logs, filterClientId]);

  return (
    <>
      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-2xl font-semibold text-[#1B365D]">Communication Log</h3> {/* Fae Blue title */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <select
              value={filterClientId}
              onChange={(e) => setFilterClientId(e.target.value)}
              className="block w-full sm:w-auto bg-white border-slate-300 rounded-md shadow-sm focus:ring-[#1B365D] focus:border-[#1B365D] sm:text-sm text-[#4A5568] p-2.5" /* Light select style */
              aria-label="Filter logs by client"
            >
              <option value="">All Clients</option>
              {dummyClients.map(client => (
                <option key={client.id} value={client.id}>{client.clientName}</option>
              ))}
            </select>
            <button
              className="w-full sm:w-auto bg-[#1B365D] hover:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center justify-center" /* Fae Blue button */
              onClick={handleOpenAddModal}
              aria-label="Add New Log Entry"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Log
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200"> {/* Light divider */}
            <thead className="bg-slate-100"> {/* Lighter header bg */}
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Client</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Date</th>
                <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Type</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider">Summary</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#1B365D] uppercase tracking-wider hidden md:table-cell">Recorded By</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-[#1B365D] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200"> {/* White body bg, light divider */}
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500"> {/* Professional Gray variant */}
                    No communication logs found{filterClientId ? " for this client" : ""}.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors duration-150"> {/* Lighter hover */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-[#4A5568]">{log.clientName}</td> {/* Professional Gray */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{formatDate(log.date)}</td> {/* Darker Professional Gray variant */}
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-center"><TypeIcon type={log.type} /></td>
                    <td className="px-4 py-4 text-sm text-slate-600 max-w-xs truncate" title={log.summary}>{log.summary}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500 hidden md:table-cell">{log.recordedBy || 'N/A'}</td> {/* Lighter Professional Gray variant */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                      <button
                        onClick={() => handleOpenEditModal(log)}
                        className="text-[#1B365D] hover:text-blue-700 transition-colors text-xs font-medium"
                        aria-label={`Edit log for ${log.clientName} on ${formatDate(log.date)}`}
                      >
                        Edit
                      </button>
                      {/* Delete button could be added here later */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {isAddOrEditModalOpen && (
        <Modal
          isOpen={isAddOrEditModalOpen}
          onClose={handleCloseModal}
          title={logToEdit ? `Edit Communication Log: ${logToEdit.clientName}` : "Add New Communication Log"}
        >
          <AddCommunicationLogForm
            clients={dummyClients} // Pass clients for the dropdown
            initialData={logToEdit || undefined} // Pass logToEdit as initialData
            onSave={handleSaveLog}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};