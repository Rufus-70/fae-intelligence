// app/admin/prompts/components/PromptForm.tsx
import React, { useState, useEffect } from 'react';
import { Prompt } from '../../types'; // Corrected path relative to app/admin/prompts/components/

interface PromptFormProps {
  prompt?: Prompt | null; // For editing
  onSubmit: (promptData: Omit<Prompt, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ prompt, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState(''); // Comma-separated string
  const [variablesStr, setVariablesStr] = useState(''); // JSON string for simplicity e.g. [{"name":"var1","type":"text"}]
  const [expectedOutputFormat, setExpectedOutputFormat] = useState('');


  useEffect(() => {
    if (prompt) {
      setTitle(prompt.title || '');
      setContent(prompt.content || '');
      setCategory(prompt.category || '');
      setTags(prompt.tags?.join(', ') || '');
      setVariablesStr(prompt.variables ? JSON.stringify(prompt.variables, null, 2) : '');
      setExpectedOutputFormat(prompt.expectedOutputFormat || '');
    } else {
      // Reset form for new prompt
      setTitle('');
      setContent('');
      setCategory('');
      setTags('');
      setVariablesStr('');
      setExpectedOutputFormat('');
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let parsedVariables = [];
    try {
      if(variablesStr.trim()) parsedVariables = JSON.parse(variablesStr);
    } catch (error) {
      console.error("Error parsing variables JSON:", error);
      alert("Variables field is not valid JSON. Please correct it or leave it empty.");
      return;
    }
    const promptData = {
      title,
      content,
      category: category || undefined, // Store as undefined if empty
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Store as empty array if no tags
      variables: parsedVariables.length > 0 ? parsedVariables : undefined,
      expectedOutputFormat: expectedOutputFormat || undefined,
    };
    onSubmit(promptData as any); // Cast as any to bypass strict Omit for now, userId/timestamps handled by service
  };

  const inputClass = "w-full p-2.5 bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500 transition-colors";
  const labelClass = "block mb-1.5 text-sm font-medium text-sky-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>Title <span className="text-red-500">*</span></label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="content" className={labelClass}>Content <span className="text-red-500">*</span></label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} required className={`${inputClass} min-h-[100px]`} />
      </div>
      <div>
        <label htmlFor="category" className={labelClass}>Category</label>
        <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="tags" className={labelClass}>Tags (comma-separated)</label>
        <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="variables" className={labelClass}>Variables (JSON format: e.g., [{"{name}"}:"name", "{type}":"text"}])</label>
        <textarea id="variables" value={variablesStr} onChange={(e) => setVariablesStr(e.target.value)} rows={3} className={inputClass} placeholder='[{"name":"exampleVar", "type":"text"}]' />
        <p className="text-xs text-slate-400 mt-1">Example: `[{"name":"customerName", "type":"text"}, {"name":"product", "type":"text"}]`</p>
      </div>
       <div>
        <label htmlFor="expectedOutputFormat" className={labelClass}>Expected Output Format (e.g., JSON, Markdown)</label>
        <input id="expectedOutputFormat" type="text" value={expectedOutputFormat} onChange={(e) => setExpectedOutputFormat(e.target.value)} className={inputClass} />
      </div>
      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
        <button 
          type="button" 
          onClick={onClose} 
          className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors"
        >
          {prompt ? 'Update Prompt' : 'Create Prompt'}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
