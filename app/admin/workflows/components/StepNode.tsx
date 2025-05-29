// app/admin/workflows/components/StepNode.tsx
import React from 'react';
import { Step } from '../../types'; // Corrected path
import { Prompt } from '../../../prompts/types'; // Standardized Prompt type

// Import specific icons based on step type
import HumanActionIcon from '../icons/HumanActionIcon'; // Corrected path
import EyeIcon from '../icons/EyeIcon'; // Example for AI/View
// Potentially add icons for Tool, Decision, Sub-workflow
// import { CogIcon, AdjustmentsHorizontalIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'; // Example for other types

interface StepNodeProps {
  step: Step;
  onClick: (stepId: string) => void;
  isSelected?: boolean;
  getPromptDetails: (stepPrompt: string | Prompt | undefined) => Prompt | undefined;
}

const StepNode: React.FC<StepNodeProps> = ({ step, onClick, isSelected, getPromptDetails }) => {
  const resolvedPrompt = step.type === 'ai-prompt' ? getPromptDetails(step.prompt) : undefined;

  const renderIcon = () => {
    switch (step.type) {
      case 'human-action':
        return <HumanActionIcon className="h-5 w-5 text-sky-400" />;
      case 'ai-prompt':
        return <EyeIcon className="h-5 w-5 text-purple-400" />; // Or a specific AI icon
      case 'tool-usage':
        // return <CogIcon className="h-5 w-5 text-orange-400" />;
        return <span title="Tool Usage">⚙️</span>; // Placeholder if CogIcon not available
      case 'decision-point':
        // return <AdjustmentsHorizontalIcon className="h-5 w-5 text-yellow-400" />;
        return <span title="Decision Point">🔀</span>; // Placeholder
      case 'sub-workflow':
        // return <DocumentDuplicateIcon className="h-5 w-5 text-green-400" />;
        return <span title="Sub-workflow">📑</span>; // Placeholder
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onClick(step.id)}
      className={`bg-slate-700 p-3 rounded-md shadow hover:bg-slate-600/70 transition-all duration-150 cursor-pointer border-l-4 ${
        isSelected ? 'border-sky-500 ring-2 ring-sky-500' : 'border-slate-600'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">{renderIcon()}</div>
        <div className="flex-grow">
          <h5 className="text-sm font-semibold text-sky-300 truncate">{step.title}</h5>
          <p className="text-xs text-slate-400 capitalize">{step.type.replace('-', ' ')}</p>
          {resolvedPrompt && (
            <p className="text-xs text-purple-300 truncate">Prompt: {resolvedPrompt.title}</p>
          )}
          {step.type === 'tool-usage' && step.toolId && (
             <p className="text-xs text-orange-300 truncate">Tool: {step.toolId}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepNode;
