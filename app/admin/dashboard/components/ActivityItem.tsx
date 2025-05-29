// app/admin/dashboard/components/ActivityItem.tsx
import React from 'react';
import { Activity } from '../types'; // Corrected import path for types

interface ActivityItemProps {
  activity: Activity;
  onUpdateStatus: (activityId: string, status: Activity['status']) => void; // Added for interaction
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onUpdateStatus }) => {
  const { id, name, status } = activity;

  // Example of how status could be updated (e.g., via a select dropdown)
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(id, event.target.value as Activity['status']);
  };

  return (
    <li className="py-2 px-3 border-b border-slate-700 last:border-b-0 flex justify-between items-center hover:bg-slate-700/30 transition-colors duration-150">
      <span className={`text-sm ${status === 'completed' ? 'line-through text-slate-500' : 'text-slate-300'}`}>
        {name}
      </span>
      <select 
        value={status} 
        onChange={handleStatusChange}
        className="text-xs bg-slate-700 text-sky-300 p-1 rounded border border-slate-600 focus:ring-sky-500 focus:border-sky-500"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="blocked">Blocked</option>
      </select>
    </li>
  );
};

export default ActivityItem;
