// app/admin/workflows/components/WorkflowList.tsx
import React from 'react';
import { Workflow } from '../../types'; // Corrected path
import PlusIcon from '../icons/PlusIcon'; // Corrected path
import EyeIcon from '../icons/EyeIcon'; // Corrected path
import PencilIcon from '../icons/PencilIcon'; // Corrected path
import TrashIcon from '../icons/TrashIcon'; // Corrected path

interface WorkflowListProps {
  workflows: Workflow[];
  onViewWorkflow: (id: string) => void;
  onEditWorkflow: (id: string) => void;
  onDeleteWorkflow: (id: string) => void;
  onCreateWorkflow: () => void;
  isLoading?: boolean; // Optional loading state for overall list or individual items
}

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  onViewWorkflow,
  onEditWorkflow,
  onDeleteWorkflow,
  onCreateWorkflow,
  isLoading
}) => {
  return (
    <div className="bg-slate-800 shadow-xl rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-sky-400">Workflows</h2>
        <button
          onClick={onCreateWorkflow}
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center space-x-2 shadow-sm"
          title="Create New Workflow"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create New Workflow</span>
        </button>
      </div>

      {isLoading && workflows.length === 0 && <p className="text-center text-slate-400">Loading workflows...</p>}
      {!isLoading && workflows.length === 0 && (
        <p className="text-center text-slate-400 py-8">
          No workflows found. Get started by creating a new one!
        </p>
      )}

      {workflows.length > 0 && (
        <ul className="space-y-4">
          {workflows.map((workflow) => (
            <li
              key={workflow.id}
              className="bg-slate-700/50 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-grow mb-3 sm:mb-0">
                <h3 className="text-lg font-medium text-sky-300">{workflow.title}</h3>
                <p className="text-xs text-slate-400">
                  Version: {workflow.version} | Last Updated: {new Date(workflow.updatedAt as string).toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-400 mt-1 truncate max-w-md">{workflow.description}</p>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <button
                  onClick={() => onViewWorkflow(workflow.id)}
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md transition duration-150 flex items-center"
                  title="View Workflow"
                >
                  <EyeIcon className="h-4 w-4 mr-1" /> View
                </button>
                <button
                  onClick={() => onEditWorkflow(workflow.id)}
                  className="text-xs bg-yellow-500 hover:bg-yellow-600 text-slate-900 py-1.5 px-3 rounded-md transition duration-150 flex items-center"
                  title="Edit Workflow"
                >
                  <PencilIcon className="h-4 w-4 mr-1" /> Edit
                </button>
                <button
                  onClick={() => onDeleteWorkflow(workflow.id)}
                  className="text-xs bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-md transition duration-150 flex items-center"
                  title="Delete Workflow"
                >
                  <TrashIcon className="h-4 w-4 mr-1" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkflowList;
