
import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Card } from '../../ui/Card';
import { ParsedProjectPlan, ParsedPhase, ParsedTask } from '../../../types';
import { parseProjectPlanWithGemini } from '../../../services/geminiService';

interface ImportProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (parsedPlan: ParsedProjectPlan) => Promise<string | null>;
}

const inputBaseStyle = "block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 p-2.5 placeholder-slate-400";
const textareaBaseStyle = `${inputBaseStyle} min-h-[200px] font-mono text-xs`;

export const ImportProjectModal: React.FC<ImportProjectModalProps> = ({ isOpen, onClose, onImport }) => {
  const [planText, setPlanText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedProjectPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleParse = async () => {
    if (!planText.trim()) {
      setError("Please paste your project plan text first.");
      return;
    }
    setIsParsing(true);
    setError(null);
    setParsedData(null);
    try {
      const result = await parseProjectPlanWithGemini(planText);
      setParsedData(result);
    } catch (err: any) {
      console.error("Parsing error:", err);
      setError(err.message || "Failed to parse project plan. Check console for details.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleImportConfirm = async () => {
    if (!parsedData) return;
    setIsImporting(true);
    setError(null);
    try {
      const newProjectId = await onImport(parsedData);
      if (newProjectId) {
        // Optionally, could navigate to the new project or show a success message.
        // For now, just close.
        onClose(); 
      } else {
        setError("Failed to import project. Please try again or check the console.");
      }
    } catch (err: any) {
      console.error("Import error:", err);
      setError(err.message || "An unexpected error occurred during import.");
    } finally {
      setIsImporting(false);
    }
  };
  
  const handleCloseAndReset = () => {
    setPlanText('');
    setParsedData(null);
    setError(null);
    setIsParsing(false);
    setIsImporting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseAndReset} title="Import Project Plan from Text">
      <div className="space-y-4">
        {!parsedData && (
          <div>
            <label htmlFor="projectPlanText" className="block text-sm font-medium text-sky-300 mb-1">
              Paste your project plan text below:
            </label>
            <textarea
              id="projectPlanText"
              value={planText}
              onChange={(e) => setPlanText(e.target.value)}
              className={textareaBaseStyle}
              rows={15}
              placeholder="Paste your detailed project plan here..."
              aria-label="Project plan text input"
              disabled={isParsing}
            />
          </div>
        )}

        {error && (
          <Card className="bg-red-900/50 p-3 rounded-md border border-red-700">
            <p className="text-sm text-red-300">{error}</p>
          </Card>
        )}

        {isParsing && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500 mx-auto mb-2"></div>
            <p className="text-sky-300">Parsing project plan with AI...</p>
          </div>
        )}

        {parsedData && !isParsing && (
          <div className="space-y-3 max-h-[50vh] overflow-y-auto p-1 bg-slate-700/30 rounded-md">
            <h4 className="text-lg font-semibold text-sky-300 sticky top-0 bg-slate-800 py-2 px-1 z-10">Preview of Parsed Plan:</h4>
            <p><strong className="text-sky-400">Project Name:</strong> {parsedData.projectName}</p>
            {parsedData.projectDescription && <p className="text-sm"><strong className="text-sky-400">Description:</strong> <span className="text-slate-300 whitespace-pre-line">{parsedData.projectDescription}</span></p>}
            
            {parsedData.phases.map((phase: ParsedPhase) => (
              <Card key={phase.clientSideId} className="bg-slate-700/70 p-3 rounded my-2">
                <h5 className="text-md font-semibold text-sky-400">{phase.title}</h5>
                {phase.objective && <p className="text-xs italic text-slate-400 mb-1">{phase.objective}</p>}
                {phase.tasks.length > 0 ? (
                  <ul className="list-disc list-inside pl-4 space-y-0.5">
                    {phase.tasks.map((task: ParsedTask) => (
                      <li key={task.clientSideId} className="text-xs text-slate-300">
                        {task.title}
                        {task.assignedTo && <span className="text-slate-400 text-xxs"> (Assignee: {task.assignedTo})</span>}
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-xs text-slate-400">No tasks found for this phase.</p>}
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-3 border-t border-slate-700">
          <button
            type="button"
            onClick={handleCloseAndReset}
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors"
            disabled={isParsing || isImporting}
          >
            Cancel
          </button>
          {!parsedData && (
            <button
              type="button"
              onClick={handleParse}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors"
              disabled={isParsing || !planText.trim()}
            >
              {isParsing ? 'Parsing...' : 'Parse with AI & Preview'}
            </button>
          )}
          {parsedData && (
             <button
              type="button"
              onClick={handleImportConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
              disabled={isImporting || isParsing}
            >
              {isImporting ? 'Importing...' : 'Confirm & Create Project'}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
