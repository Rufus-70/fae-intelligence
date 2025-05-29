// app/admin/workflows/components/WorkflowViewer.tsx
import React from 'react';
import { Workflow, Step } from '../../types'; // Corrected path
import { Prompt } from '../../../prompts/types'; // Standardized Prompt type
import StepNode from './StepNode'; // Corrected path
import PencilIcon from '../icons/PencilIcon'; // Corrected path
import EyeIcon from '../icons/EyeIcon'; // Placeholder for a "Generate Docs" icon or use text

interface WorkflowViewerProps {
  workflow: Workflow | null;
  availablePrompts: Prompt[]; // To resolve prompt details if steps only store IDs
  onEdit: (id: string) => void;
  onGenerateDocs: (id: string) => void;
  onClose: () => void;
}

const WorkflowViewer: React.FC<WorkflowViewerProps> = ({
  workflow,
  availablePrompts,
  onEdit,
  onGenerateDocs,
  onClose,
}) => {
  if (!workflow) {
    return (
      <div className="text-center py-10 text-slate-400">
        <p>No workflow selected, or workflow data is unavailable.</p>
        <button onClick={onClose} className="mt-4 text-sm bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-md">
          Back to List
        </button>
      </div>
    );
  }

  // Helper to find prompt details if a step's prompt is an ID
  const getPromptForStep = (stepPrompt: string | Prompt | undefined): Prompt | undefined => {
    if (!stepPrompt) return undefined;
    if (typeof stepPrompt === 'string') {
      return availablePrompts.find(p => p.id === stepPrompt);
    }
    return stepPrompt as Prompt; // Assume it's already a populated Prompt object
  };

  return (
    <div className="bg-slate-800 shadow-xl rounded-lg p-6 relative">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-slate-400 hover:text-sky-300 p-1 rounded-full hover:bg-slate-700"
        aria-label="Close viewer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <header className="mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-3xl font-bold text-sky-400">{workflow.title}</h2>
        <p className="text-sm text-slate-400 mt-1">Version: {workflow.version}</p>
        {workflow.tags && workflow.tags.length > 0 && (
          <div className="mt-2">
            {workflow.tags.map(tag => (
              <span key={tag} className="text-xs bg-sky-700 text-sky-200 px-2 py-0.5 rounded-full mr-1.5">
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-slate-300 mt-3">{workflow.description}</p>
      </header>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-sky-300 mb-3">Steps:</h3>
        {workflow.steps && workflow.steps.length > 0 ? (
          <div className="space-y-4">
            {/* This is a simplified view; a more complex visualizer (like React Flow) might be used here */}
            {workflow.steps.map((step, index) => (
              <StepNode 
                key={step.id || index} 
                step={step} 
                onClick={() => { /* Maybe select step for details? */ }}
                // isSelected={false} // Add selection logic if needed
                getPromptDetails={getPromptForStep} // Pass helper to resolve prompt details
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-400">This workflow currently has no steps defined.</p>
        )}
      </div>

      <footer className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          onClick={() => onEdit(workflow.id)}
          className="flex items-center justify-center text-sm bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium py-2 px-4 rounded-md transition duration-150"
        >
          <PencilIcon className="h-4 w-4 mr-2" /> Edit Workflow
        </button>
        <button
          onClick={() => onGenerateDocs(workflow.id)}
          className="flex items-center justify-center text-sm bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
        >
          <EyeIcon className="h-4 w-4 mr-2" /> Generate Documentation
        </button>
      </footer>
    </div>
  );
};

export default WorkflowViewer;
