// app/admin/workflows/components/WorkflowEditor.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Workflow, Step, StepType } from '../../types'; // Corrected path
import { Prompt } from '../../../prompts/types'; // Standardized Prompt type
import { AVAILABLE_TOOLS, DEFAULT_AUTHOR_ID } from '../../constants'; // Corrected path
import PlusIcon from '../icons/PlusIcon'; // Corrected path
import TrashIcon from '../icons/TrashIcon'; // Corrected path
import { useSession } from 'next-auth/react';

interface WorkflowEditorProps {
  workflowToEdit: Partial<Workflow> | null; // Can be partial for new workflow
  availablePrompts: Prompt[];
  onSaveWorkflow: (workflowData: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'> | Workflow) => void;
  onCancel: () => void;
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({
  workflowToEdit,
  availablePrompts,
  onSaveWorkflow,
  onCancel,
}) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [version, setVersion] = useState('1.0');
  const [tagsStr, setTagsStr] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    if (workflowToEdit) {
      setTitle(workflowToEdit.title || 'New Untitled Workflow');
      setDescription(workflowToEdit.description || '');
      setVersion(workflowToEdit.version || '1.0');
      setTagsStr(workflowToEdit.tags?.join(', ') || '');
      setSteps(workflowToEdit.steps || []);
    } else {
      // Reset for new workflow form
      setTitle('New Untitled Workflow');
      setDescription('');
      setVersion('1.0');
      setTagsStr('');
      setSteps([]);
    }
  }, [workflowToEdit]);

  const handleSave = () => {
    const authorId = session?.user?.id || workflowToEdit?.authorId || DEFAULT_AUTHOR_ID;
    const workflowData: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'> & { id?: string } = {
      title,
      description,
      authorId,
      version,
      tags: tagsStr.split(',').map(tag => tag.trim()).filter(Boolean),
      steps,
    };
    if (workflowToEdit && workflowToEdit.id) {
        (workflowData as Workflow).id = workflowToEdit.id; // Keep existing ID for update
    }
    onSaveWorkflow(workflowData as any); // Type assertion needed due to conditional ID
  };

  const addStep = (type: StepType) => {
    const newStep: Step = {
      id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`, // Temporary unique ID
      title: `New ${type.replace('-', ' ')} Step`,
      description: '',
      type: type,
      // Initialize other fields based on type if needed
    };
    setSteps(prevSteps => [...prevSteps, newStep]);
  };

  const updateStep = (index: number, updatedStepData: Partial<Step>) => {
    setSteps(prevSteps =>
      prevSteps.map((step, i) => (i === index ? { ...step, ...updatedStepData } : step))
    );
  };

  const removeStep = (index: number) => {
    setSteps(prevSteps => prevSteps.filter((_, i) => i !== index));
  };
  
  const inputClass = "w-full p-2.5 bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500 transition-colors";
  const labelClass = "block mb-1.5 text-sm font-medium text-sky-300";
  const buttonClass = "bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out shadow-sm";


  return (
    <div className="bg-slate-800 shadow-xl rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-sky-400 border-b border-slate-700 pb-3">
        {workflowToEdit?.id ? 'Edit Workflow' : 'Create New Workflow'}
      </h2>

      <div>
        <label htmlFor="wf-title" className={labelClass}>Title <span className="text-red-500">*</span></label>
        <input id="wf-title" type="text" value={title} onChange={e => setTitle(e.target.value)} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="wf-description" className={labelClass}>Description</label>
        <textarea id="wf-description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className={`${inputClass} min-h-[80px]`} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wf-version" className={labelClass}>Version</label>
          <input id="wf-version" type="text" value={version} onChange={e => setVersion(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="wf-tags" className={labelClass}>Tags (comma-separated)</label>
          <input id="wf-tags" type="text" value={tagsStr} onChange={e => setTagsStr(e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Steps Management Section - Simplified */}
      <div className="space-y-4 pt-4 border-t border-slate-700">
        <h3 className="text-xl font-semibold text-sky-300">Steps</h3>
        {steps.map((step, index) => (
          <div key={step.id || index} className="bg-slate-700/50 p-4 rounded-md space-y-3 shadow">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium text-sky-400">Step {index + 1}: {step.title} ({step.type})</h4>
              <button onClick={() => removeStep(index)} className="text-red-500 hover:text-red-400 p-1" title="Remove Step">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <input 
              type="text" 
              value={step.title} 
              onChange={e => updateStep(index, { title: e.target.value })} 
              placeholder="Step Title"
              className={`${inputClass} text-sm`} 
            />
            <textarea 
              value={step.description} 
              onChange={e => updateStep(index, { description: e.target.value })} 
              placeholder="Step Description"
              rows={2}
              className={`${inputClass} text-sm min-h-[60px]`} 
            />
             {/* Simplified: Add more fields based on step.type */}
            {step.type === 'ai-prompt' && (
              <select 
                value={typeof step.prompt === 'string' ? step.prompt : (step.prompt as Prompt)?.id || ''} 
                onChange={e => updateStep(index, { prompt: e.target.value })} // Store prompt ID as string for now
                className={`${inputClass} text-sm`}
              >
                <option value="">Select a Prompt</option>
                {availablePrompts.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            )}
            {step.type === 'tool-usage' && (
               <select 
                value={step.toolId || ''} 
                onChange={e => updateStep(index, { toolId: e.target.value })}
                className={`${inputClass} text-sm`}
              >
                <option value="">Select a Tool</option>
                {AVAILABLE_TOOLS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            )}
          </div>
        ))}
        <div className="flex space-x-2 pt-2">
          {(['human-action', 'ai-prompt', 'tool-usage', 'decision-point', 'sub-workflow'] as StepType[]).map(type => (
             <button key={type} onClick={() => addStep(type)} className="text-xs bg-slate-600 hover:bg-slate-500 text-white py-1.5 px-3 rounded-md transition duration-150 flex items-center">
                <PlusIcon className="h-4 w-4 mr-1" /> Add {type.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-slate-700">
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors">
          Cancel
        </button>
        <button onClick={handleSave} className={`${buttonClass} px-6`}>
          Save Workflow
        </button>
      </div>
    </div>
  );
};

export default WorkflowEditor;
