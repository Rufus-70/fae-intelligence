import React from 'react';
import { Client } from '../../../types';
import { dummyClients } from '../../../constants';
import { Card } from '../../ui/Card';

export const CrmContactsView: React.FC = () => {
  // For now, contacts are derived directly from clients
  const contacts = dummyClients.filter(client => client.contactPerson && client.contactPerson.trim() !== '');

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-sky-300">Company Contacts</h3>
        {/* Add Contact button could be added later if contacts become separate entities */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Contact Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Company Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Phone</th>
              {/* Add Actions column later if needed */}
            </tr>
          </thead>
          <tbody className="bg-slate-800/30 divide-y divide-slate-700">
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                  No contacts with contact persons found.
                </td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact.id} className={`${index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40 transition-colors duration-150`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-100">{contact.contactPerson}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{contact.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <a href={`mailto:${contact.email}`} className="hover:text-sky-400 transition-colors">{contact.email}</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{contact.phone || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};