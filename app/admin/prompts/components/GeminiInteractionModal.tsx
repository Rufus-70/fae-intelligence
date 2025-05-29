// app/admin/prompts/components/GeminiInteractionModal.tsx
import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Corrected path
import { Prompt } from '../../types'; // Corrected path

interface GeminiInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptToTest: Prompt | null;
}

const GeminiInteractionModal: React.FC<GeminiInteractionModalProps> = ({ isOpen, onClose, promptToTest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [variableInputs, setVariableInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize variableInputs when promptToTest changes or modal opens
    if (promptToTest && promptToTest.variables) {
      const initialInputs: Record<string, string> = {};
      promptToTest.variables.forEach(variable => {
        initialInputs[variable.name] = ''; // Default to empty string
      });
      setVariableInputs(initialInputs);
    } else {
      setVariableInputs({});
    }
    setTestResult(null); // Reset result when modal opens for a new test
  }, [isOpen, promptToTest]);

  const handleVariableChange = (variableName: string, value: string) => {
    setVariableInputs(prev => ({ ...prev, [variableName]: value }));
  };

  const handleTestPrompt = async () => {
    if (!promptToTest) return;
    setIsLoading(true);
    setTestResult(null);

    // Simulate substituting variables into the prompt content
    let populatedPrompt = promptToTest.content;
    if (promptToTest.variables) {
      promptToTest.variables.forEach(variable => {
        const regex = new RegExp(`{{${variable.name}}}`, 'g');
        populatedPrompt = populatedPrompt.replace(regex, variableInputs[variable.name] || `[${variable.name}]`);
      });
    }
    
    // Simulate API call
    console.log("Testing prompt:", promptToTest.title, "with inputs:", variableInputs);
    console.log("Populated prompt content:", populatedPrompt);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    // Placeholder: This is where you would call the actual Gemini API
    // For now, just echoing the populated prompt or a mock response.
    setTestResult(`Simulated Gemini Output for prompt "${promptToTest.title}":\n\n${populatedPrompt}\n\n(Actual API call would be made here)`);
    setIsLoading(false);
  };
  
  const inputClass = "w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500";
  const labelClass = "block mb-1 text-sm font-medium text-sky-300";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Test Prompt: ${promptToTest?.title || ''}`} size="lg">
      {promptToTest ? (
        <div className="space-y-4">
          <div>
            <h4 className={`${labelClass} mb-2`}>Prompt Content Preview:</h4>
            <div className="p-3 bg-slate-700/50 rounded-md max-h-40 overflow-y-auto text-sm text-slate-300 custom-scrollbar">
              <pre className="whitespace-pre-wrap">{promptToTest.content}</pre>
            </div>
          </div>

          {promptToTest.variables && promptToTest.variables.length > 0 && (
            <div>
              <h4 className={`${labelClass} mb-2`}>Test Variables:</h4>
              <div className="space-y-3">
                {promptToTest.variables.map(variable => (
                  <div key={variable.name}>
                    <label htmlFor={`var-${variable.name}`} className={`${labelClass} capitalize`}>{variable.name} ({variable.type})</label>
                    <input
                      id={`var-${variable.name}`}
                      type={variable.type === 'number' ? 'number' : 'text'}
                      value={variableInputs[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                      className={inputClass}
                      placeholder={`Enter value for ${variable.name}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={handleTestPrompt}
              disabled={isLoading}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Testing...' : 'Run Test'}
            </button>
          </div>

          {testResult && (
            <div className="mt-4">
              <h4 className={`${labelClass} mb-2`}>Test Result:</h4>
              <div className="p-3 bg-slate-900/70 border border-slate-700 rounded-md max-h-60 overflow-y-auto text-sm text-slate-200 custom-scrollbar">
                <pre className="whitespace-pre-wrap">{testResult}</pre>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-400">No prompt selected for testing.</p>
      )}
    </Modal>
  );
};

export default GeminiInteractionModal;
