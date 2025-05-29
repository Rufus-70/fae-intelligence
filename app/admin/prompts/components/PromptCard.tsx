// app/admin/prompts/components/PromptCard.tsx
import React from 'react';
import { Prompt } from '../../types'; // Corrected path relative to app/admin/prompts/components/
// Assuming icons like PencilIcon, TrashIcon might be used from constants
// import { PencilIcon, TrashIcon, BeakerIcon } from '../../constants'; // Example path

interface PromptCardProps {
  prompt: Prompt;
  onEdit: () => void; // Changed to () => void as page.tsx passes () => handleOpenFormModal(prompt)
  onDelete: () => void; // Changed to () => void as page.tsx passes () => handleDeletePrompt(prompt.id)
  onTest: () => void; // Changed to () => void as page.tsx passes () => handleOpenTestModal(prompt)
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onEdit, onDelete, onTest }) => {
  const { title, content, tags, category, updatedAt } = prompt;

  return (
    <div className="bg-slate-800 shadow-lg rounded-lg p-5 flex flex-col justify-between hover:shadow-sky-500/30 transition-shadow duration-300">
      <div>
        <h3 className="text-xl font-semibold text-sky-400 mb-2">{title}</h3>
        <p className="text-sm text-slate-400 mb-3 h-20 overflow-y-auto custom-scrollbar">{content}</p>
        {category && <p className="text-xs text-slate-500 mb-1">Category: <span className="font-semibold text-sky-500">{category}</span></p>}
        {tags && tags.length > 0 && (
          <div className="mb-3">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-sky-700 text-sky-200 px-2 py-0.5 rounded-full mr-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        {updatedAt && (
          <p className="text-xs text-slate-500 mb-3">
            Last updated: {new Date(updatedAt as any /* Assume Date or string that can be parsed */).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-2 pt-3 border-t border-slate-700">
        <button
          onClick={onTest}
          className="text-xs bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-md transition duration-150"
          title="Test Prompt"
        >
          {/* <BeakerIcon className="h-4 w-4 mr-1 inline-block" /> */}
          Test
        </button>
        <button
          onClick={onEdit}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md transition duration-150"
          title="Edit Prompt"
        >
          {/* <PencilIcon className="h-4 w-4 mr-1 inline-block" /> */}
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-xs bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md transition duration-150"
          title="Delete Prompt"
        >
          {/* <TrashIcon className="h-4 w-4 mr-1 inline-block" /> */}
          Delete
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
