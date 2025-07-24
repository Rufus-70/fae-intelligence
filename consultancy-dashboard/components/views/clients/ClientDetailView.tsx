
import React from 'react';
import { Client, ClientStatus, CommunicationLogEntry, CommunicationType } from '../../../types';
import { dummyClients, dummyCommunicationLogs } from '../../../constants'; 
import { Card } from '../../ui/Card';

interface ClientDetailViewProps {
  clientId: string;
  onBackToList: () => void; 
  onNavigateToCommunicationLog?: (clientId: string) => void;
}

// Local version of TypeIcon for ClientDetailView
const LocalTypeIcon: React.FC<{ type: CommunicationType }> = ({ type }) => {
  let iconSvg;
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
  return <span title={type} className="mr-2">{iconSvg}</span>;
};

const localFormatDate = (dateString?: string, options?: Intl.DateTimeFormatOptions) => {
  if (!dateString) return 'N/A';
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  try {
    return new Date(dateString).toLocaleDateString(undefined, options || defaultOptions);
  } catch (e) {
    return 'Invalid Date';
  }
};

const DetailItem: React.FC<{ label: string; value?: string | number | null | JSX.Element; icon?: JSX.Element; className?: string; isBeingDeveloped?: boolean; isClickable?: boolean; onClick?: () => void; }> = ({ label, value, icon, className = '', isBeingDeveloped, isClickable, onClick }) => (
  <div className={`mb-3 ${className}`}>
    <h4 className="text-sm font-semibold text-[#1B365D] mb-0.5 flex items-center"> {/* Fae Blue label */}
      {icon && <span className="mr-2 h-5 w-5 opacity-80">{icon}</span>}
      {label}
    </h4>
    {isClickable && typeof value === 'string' && value !== 'N/A' && value !== 'No interactions recorded' ? (
      <button
        onClick={onClick}
        className="text-[#4A5568] text-base whitespace-pre-line hover:text-[#1B365D] hover:underline focus:outline-none"
        aria-label={`View details for ${label}`}
      >
        {isBeingDeveloped ? `Being developed\n${value}` : value}
      </button>
    ) : React.isValidElement(value) ? (
      isBeingDeveloped ? <p className="text-[#4A5568] text-base whitespace-pre-line">Being developed<br/>{value}</p> : value /* Professional Gray */
    ) : (
      <p className="text-[#4A5568] text-base whitespace-pre-line"> {/* Professional Gray */}
        {isBeingDeveloped ? `Being developed\n${value || 'N/A'}` : (value || 'N/A')}
      </p>
    )}
  </div>
);


const StatusDisplay: React.FC<{ status: ClientStatus }> = ({ status }) => {
  let bgColor = 'bg-slate-400'; 
  let textColor = 'text-[#4A5568]';

  switch (status) {
    case 'Active': bgColor = 'bg-[#38A169]'; textColor = 'text-white'; break; // Success Green
    case 'Prospect': bgColor = 'bg-[#1B365D]'; textColor = 'text-white'; break; // Fae Blue
    case 'Lead': bgColor = 'bg-yellow-400'; textColor = 'text-slate-800'; break; // Keep yellow for distinction
    case 'Inactive': default: bgColor = 'bg-slate-300'; textColor = 'text-[#4A5568]'; break; // Light Gray
  }
  return (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${bgColor} ${textColor} inline-block`}>
      {status}
    </span>
  );
};

export const ClientDetailView: React.FC<ClientDetailViewProps> = ({ clientId, onBackToList, onNavigateToCommunicationLog }) => {
  const client = dummyClients.find(c => c.id === clientId);

  const clientLogs = client 
    ? dummyCommunicationLogs
        .filter(log => log.clientId === client.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];
  
  const recentLogsForDisplay = clientLogs.slice(0, 3);
  // Use client.lastInteraction if available and more reliable, otherwise fallback to latest log.
  // For dummy data, client.lastInteraction might be more representative.
  const mostRecentInteractionDate = client?.lastInteraction || (clientLogs.length > 0 ? clientLogs[0].date : null);


  if (!client) {
    return (
      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl text-center border border-slate-200"> {/* Light Gray bg */}
        <h3 className="text-2xl font-semibold text-[#DD6B20] mb-4">Client Not Found</h3> {/* Warning Orange */}
        <p className="text-[#4A5568] mb-6">The requested client could not be found.</p> {/* Professional Gray */}
        <button
          onClick={onBackToList}
          className="bg-[#1B365D] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center mx-auto" /* Fae Blue button */
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          Back to Profile Selection
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-[#1B365D]">{client.clientName}</h2> {/* Fae Blue title */}
        <button
          onClick={onBackToList}
          className="bg-slate-200 hover:bg-slate-300 text-[#4A5568] font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 flex items-center" /* Light Gray button */
          aria-label="Back to profile selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          Back to Profile Selection
        </button>
      </div>

      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-[#1B365D] mb-4 border-b border-slate-300 pb-2">Contact Information</h3> {/* Fae Blue title, light border */}
            <DetailItem 
              label="Contact Person" 
              value={client.contactPerson} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>} 
            />
            <DetailItem 
              label="Email Address" 
              value={client.email}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>}
            />
            <DetailItem 
              label="Phone Number" 
              value={client.phone}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>}
            />
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-[#1B365D] mb-4 border-b border-slate-300 pb-2">Activity Summary</h3> {/* Fae Blue title, light border */}
            <DetailItem
                label="Status"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-80"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                value={<StatusDisplay status={client.status} />}
            />
            <DetailItem 
              label="Active Projects" 
              value={client.projectsCount}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6M9 20.25h6" /></svg>}
              isBeingDeveloped={true}
            />
            <DetailItem 
              label="Last Interaction" 
              value={mostRecentInteractionDate 
                        ? localFormatDate(mostRecentInteractionDate, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
                        : 'No interactions recorded'}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
              isClickable={!!mostRecentInteractionDate && !!onNavigateToCommunicationLog}
              onClick={mostRecentInteractionDate && onNavigateToCommunicationLog ? () => onNavigateToCommunicationLog(client.id) : undefined}
            />
          </div>
        </div>
      </Card>

      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#1B365D]">Recent Communications</h3> {/* Fae Blue title */}
            {onNavigateToCommunicationLog && (
                <button
                    onClick={() => onNavigateToCommunicationLog(client.id)}
                    className="text-sm text-[#1B365D] hover:text-blue-700 hover:underline transition-colors" /* Fae Blue link */
                    aria-label={`View full communication log for ${client.clientName}`}
                >
                    View Full Log
                </button>
            )}
        </div>
        {recentLogsForDisplay.length > 0 ? (
          <ul className="space-y-3">
            {recentLogsForDisplay.map(log => (
              <li key={log.id} className="p-3 bg-white rounded-md shadow border border-slate-200"> {/* White item bg */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <LocalTypeIcon type={log.type} />
                    <span className="text-xs text-slate-500 ml-1">{localFormatDate(log.date, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <p className="text-sm text-[#4A5568] truncate" title={log.summary}>{log.summary}</p> {/* Professional Gray */}
                {log.notes && <p className="text-xs text-slate-500 mt-1 truncate" title={log.notes}>Notes: {log.notes}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <div className="mt-4 text-4xl text-slate-400 mb-4">📭</div> {/* Lighter Professional Gray */}
            <p className="text-slate-500">No communication logs recorded for this client yet.</p> {/* Lighter Professional Gray */}
          </div>
        )}
         <p className="text-xs text-slate-400 mt-3 text-right"> {/* Lighter Professional Gray */}
            Showing last {recentLogsForDisplay.length} of {clientLogs.length} total logs.
        </p>
      </Card>

      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
        <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Associated Projects</h3> {/* Fae Blue title */}
         <div className="text-center py-8">
          <div className="mt-4 text-4xl text-slate-400 mb-4">🏗️</div> {/* Lighter Professional Gray */}
          <p className="text-slate-500">Connections Needed to list associated projects.</p> {/* Lighter Professional Gray */}
          <p className="text-sm text-slate-400 mt-1"> {/* Lighter Professional Gray */}
            Known project count: {client.projectsCount ?? 0}
          </p>
        </div>
      </Card>
    </div>
  );
};