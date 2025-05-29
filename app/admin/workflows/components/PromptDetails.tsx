// app/admin/workflows/components/PromptDetails.tsx
import React from 'react';
import { Prompt } from '../../../prompts/types'; // Standardized Prompt type

interface PromptDetailsProps {
  prompt: Prompt | null;
  onClose: () => void;
}

const PromptDetails: React.FC<PromptDetailsProps> = ({ prompt, onClose }) => {
  if (!prompt) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-slate-600/50 rounded-md border border-slate-500">
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-md font-semibold text-sky-200">{prompt.title}</h5>
        <button 
            onClick={onClose} 
            className="text-xs text-slate-300 hover:text-sky-200 p-1 rounded-full hover:bg-slate-500"
            aria-label="Close prompt details"
        >
            {/* Basic X icon, replace with IconX if available and preferred */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
      <pre className="text-xs text-slate-300 whitespace-pre-wrap bg-slate-700 p-2 rounded custom-scrollbar max-h-40 overflow-y-auto">
        {prompt.content}
      </pre>
      {prompt.category && <p className="text-xs text-slate-400 mt-1">Category: {prompt.category}</p>}
      {prompt.variables && prompt.variables.length > 0 && (
        <div className="mt-1">
          <p className="text-xs text-slate-400">Variables:</p>
          <ul className="list-disc list-inside pl-2">
            {prompt.variables.map(v => <li key={v.name} className="text-xs text-slate-300">{v.name} ({v.type})</li>)}
          </ul>
        </div>
      )}
      {prompt.expectedOutputFormat && <p className="text-xs text-slate-400 mt-1">Expected Output: {prompt.expectedOutputFormat}</p>}
    </div>
  );
};

export default PromptDetails;
