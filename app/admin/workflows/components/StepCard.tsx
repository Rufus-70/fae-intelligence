// app/admin/workflows/components/StepCard.tsx
import React, { useState } from 'react';
import { Step } from '../../types'; // Corrected path
import { Prompt } from '../../../prompts/types'; // Standardized Prompt type
import { AVAILABLE_TOOLS } from '../../constants'; // Corrected path
import PromptDetails from './PromptDetails'; // Corrected path
// Import icons if needed for specific actions within StepCard, though editor handles most.
// import PencilIcon from '../icons/PencilIcon';
// import TrashIcon from '../icons/TrashIcon';

interface StepCardProps {
  step: Step;
  availablePrompts: Prompt[]; // To resolve prompt details if step.prompt is an ID
  // Callbacks for actions if this card becomes interactive (currently editor handles this)
  // onEdit?: (stepId: string) => void;
  // onDelete?: (stepId: string) => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, availablePrompts }) => {
  const [showPromptDetails, setShowPromptDetails] = useState(false);

  const getResolvedPrompt = (): Prompt | undefined => {
    if (!step.prompt) return undefined;
    if (typeof step.prompt === 'string') {
      return availablePrompts.find(p => p.id === step.prompt);
    }
    // If step.prompt is already a Prompt object (needs to align with how it's stored/retrieved)
    // For now, assuming it could be an object from workflow data structure.
    // This part needs careful handling based on actual data structure in Firestore.
    // The type `WorkflowPrompt` was removed from workflow types, so `step.prompt` should be `string | Prompt`
    // where Prompt is from `../../../prompts/types`.
    return step.prompt as Prompt; 
  };

  const resolvedPrompt = getResolvedPrompt();
  const tool = step.type === 'tool-usage' && step.toolId ? AVAILABLE_TOOLS.find(t => t.id === step.toolId) : null;

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow-md space-y-2">
      <h4 className="text-lg font-semibold text-sky-300">{step.title}</h4>
      <p className="text-xs text-slate-400 uppercase tracking-wider">{step.type.replace('-', ' ')}</p>
      <p className="text-sm text-slate-300">{step.description}</p>

      {step.estimatedDuration && <p className="text-xs text-slate-400">Duration: {step.estimatedDuration}</p>}
      {step.assignedTo && <p className="text-xs text-slate-400">Assigned to: {step.assignedTo}</p>}
      {step.skippable !== undefined && <p className="text-xs text-slate-400">Skippable: {step.skippable ? 'Yes' : 'No'}</p>}

      {resolvedPrompt && (
        <div className="mt-2">
          <button 
            onClick={() => setShowPromptDetails(!showPromptDetails)}
            className="text-xs text-sky-400 hover:text-sky-300"
          >
            {showPromptDetails ? 'Hide' : 'Show'} Prompt: {resolvedPrompt.title}
          </button>
          {showPromptDetails && <PromptDetails prompt={resolvedPrompt} onClose={() => setShowPromptDetails(false)} />}
        </div>
      )}

      {tool && (
        <div className="mt-2">
          <p className="text-xs text-slate-400">Tool: <span className="font-medium text-sky-400">{tool.name}</span></p>
          <p className="text-xs text-slate-500">{tool.description}</p>
        </div>
      )}
      
      {step.dependencies && step.dependencies.length > 0 && (
         <p className="text-xs text-slate-400">Depends on: {step.dependencies.join(', ')}</p>
      )}

      {/* Placeholder for other step type specific details */}
      {/* e.g., conditions for 'decision-point', subWorkflowId for 'sub-workflow' */}

      {/* Action buttons - if StepCard itself becomes editable outside WorkflowEditor context */}
      {/* <div className="flex space-x-2 mt-3">
        {onEdit && <button onClick={() => onEdit(step.id)} className="text-xs ..."><PencilIcon className="h-4 w-4"/> Edit</button>}
        {onDelete && <button onClick={() => onDelete(step.id)} className="text-xs ..."><TrashIcon className="h-4 w-4"/> Delete</button>}
      </div> */}
    </div>
  );
};

export default StepCard;
