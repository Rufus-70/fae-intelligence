
import React, { useState, useEffect } from 'react';
import { Activity, ActivityStatus, ActivityPriority, CrmDetails, CrmDealStage, ImprovementDetails, ImprovementActionItem } from '../types';
import { Card } from './ui/Card';

interface ActivityItemProps {
  activity: Activity;
  phaseId: string;
  onUpdateActivity: (phaseId: string, activityId: string, updatedActivityData: Partial<Activity>) => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode; className?: string }> = ({ title, children, icon, className }) => (
  <div className={`mb-3 ${className}`}>
    <h5 className="text-md font-semibold text-[#1B365D] mb-1 flex items-center"> {/* Fae Blue for section titles */}
      {icon && <span className="mr-2">{icon}</span>}
      {title}:
    </h5>
    <div className="text-[#4A5568] text-sm leading-relaxed whitespace-pre-wrap">{children}</div> {/* Professional Gray for content */}
  </div>
);

const StatusBadge: React.FC<{ status: ActivityStatus }> = ({ status }) => {
  let bgColor = 'bg-slate-500'; // Default: Professional Gray
  let textColor = 'text-white';

  switch (status) {
    case 'In Progress': bgColor = 'bg-[#1B365D]'; break; // Fae Blue
    case 'Done': bgColor = 'bg-[#38A169]'; break; // Success Green
    case 'Blocked': bgColor = 'bg-[#DD6B20]'; break; // Warning Orange
    case 'On Hold': bgColor = 'bg-yellow-400'; textColor = 'text-slate-800'; break; // Kept yellow for distinctness
    case 'To Do': default: bgColor = 'bg-slate-300'; textColor = 'text-[#4A5568]'; break; // Light Gray with Professional Gray text
  }
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const PriorityDisplay: React.FC<{ priority: ActivityPriority }> = ({ priority }) => {
  let textColor = 'text-[#4A5568]'; // Professional Gray
  switch (priority) {
    case 'High': textColor = 'text-[#DD6B20]'; break; // Warning Orange
    case 'Medium': textColor = 'text-yellow-500'; break; // Kept yellow
    case 'Low': textColor = 'text-green-500'; break; // Lighter Green
  }
  return (
    <span className={`text-xs font-semibold ${textColor}`}>
      Priority: {priority}
    </span>
  );
};

// Updated input styles for light card backgrounds
const inputBaseStyle = "block w-full bg-slate-50 border-slate-300 rounded-md shadow-sm focus:ring-[#1B365D] focus:border-[#1B365D] sm:text-sm text-[#4A5568] p-2 placeholder-slate-400";
const textareaBaseStyle = `${inputBaseStyle} min-h-[80px]`;
const labelBaseStyle = "block text-sm font-medium text-[#1B365D] mb-1"; // Fae Blue for labels
const checkboxLabelStyle = "flex items-center text-sm font-medium text-[#1B365D]"; // Fae Blue for checkbox labels
const checkboxStyle = "h-4 w-4 text-[#1B365D] border-slate-400 rounded focus:ring-[#1B365D] mr-2";


// Temporary type for form data to handle textareas for arrays
interface ActivityFormData extends Omit<Activity, 'improvementDetails'> {
  improvementDetails?: Omit<ImprovementDetails, 'feedbackLog' | 'improvementIdeas'> & {
    feedbackLogString?: string;
    improvementIdeasString?: string;
  };
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, phaseId, onUpdateActivity }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const initializeFormData = (act: Activity): ActivityFormData => ({
    ...act,
    crmDetails: act.crmDetails || { isCrmActivity: false },
    improvementDetails: act.improvementDetails 
      ? {
          ...act.improvementDetails,
          feedbackLogString: act.improvementDetails.feedbackLog.join('\n'),
          improvementIdeasString: act.improvementDetails.improvementIdeas.join('\n'),
        }
      : { feedbackLog: [], improvementIdeas: [], actionItems: [], feedbackLogString: '', improvementIdeasString: '' }
  });

  const [formData, setFormData] = useState<ActivityFormData>(initializeFormData(activity));

  useEffect(() => {
    setFormData(initializeFormData(activity));
  }, [activity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name.startsWith("crmDetails.")) {
      const crmField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        crmDetails: {
          ...(prev.crmDetails || { isCrmActivity: false }),
          [crmField]: type === 'checkbox' 
            ? checked 
            : (crmField === 'estimatedValue' ? (value === '' ? undefined : parseFloat(value)) : value),
        }
      }));
    } else if (name.startsWith("improvementDetails.")) {
      const imprField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        improvementDetails: {
          ...(prev.improvementDetails!), // Already initialized
          [imprField]: value,
        }
      }));
    }
     else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };
  
  const handleActionItemChange = (index: number, field: keyof ImprovementActionItem, value: string | boolean) => {
    setFormData(prev => {
      const newActionItems = [...(prev.improvementDetails?.actionItems || [])];
      if (newActionItems[index]) {
        (newActionItems[index] as any)[field] = value;
      }
      return {
        ...prev,
        improvementDetails: {
          ...(prev.improvementDetails!),
          actionItems: newActionItems,
        }
      };
    });
  };

  const addActionItem = () => {
    setFormData(prev => ({
      ...prev,
      improvementDetails: {
        ...(prev.improvementDetails!),
        actionItems: [
          ...(prev.improvementDetails?.actionItems || []),
          { id: `ia_${Date.now()}`, text: '', completed: false }
        ]
      }
    }));
  };

  const removeActionItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      improvementDetails: {
        ...(prev.improvementDetails!),
        actionItems: (prev.improvementDetails?.actionItems || []).filter((_, i) => i !== index),
      }
    }));
  };


  const handleSave = () => {
    // Destructure to separate improvementDetails (which has a different shape in formData)
    // and crmDetails (which is mostly fine but we'll process it cleanly for saving)
    const { 
      improvementDetails: formImprovementDetailsData, 
      crmDetails: formCrmDetailsData, 
      ...activityCoreData 
    } = formData;
    
    let activityToSave: Partial<Activity> = { 
      ...activityCoreData // Core properties like title, prompt, status, etc.
    };

    // Process CRM Details
    // formCrmDetailsData is always initialized as an object in formData
    if (!formCrmDetailsData.isCrmActivity) {
      activityToSave.crmDetails = undefined;
    } else {
      // Create a mutable copy for saving, ensuring `estimatedValue` is valid
      const crmDetailsForSave = { ...formCrmDetailsData };
      if (typeof crmDetailsForSave.estimatedValue === 'number' && isNaN(crmDetailsForSave.estimatedValue)) {
        crmDetailsForSave.estimatedValue = undefined; // Convert NaN to undefined
      }
      activityToSave.crmDetails = crmDetailsForSave;
    }

    // Process Improvement Details
    // formImprovementDetailsData is always initialized as an object in formData
    const { feedbackLogString, improvementIdeasString, actionItems } = formImprovementDetailsData;
    const processedImprovementDetails: ImprovementDetails = {
      feedbackLog: feedbackLogString ? feedbackLogString.split('\n').filter(s => s.trim() !== '') : [],
      improvementIdeas: improvementIdeasString ? improvementIdeasString.split('\n').filter(s => s.trim() !== '') : [],
      actionItems: actionItems || [], // actionItems in formImprovementDetailsData are already ImprovementActionItem[]
    };
    
    const isEmptyProcessedImprovementDetails =
      processedImprovementDetails.feedbackLog.length === 0 &&
      processedImprovementDetails.improvementIdeas.length === 0 &&
      (!processedImprovementDetails.actionItems || processedImprovementDetails.actionItems.length === 0);

    if (isEmptyProcessedImprovementDetails) {
      activityToSave.improvementDetails = undefined;
    } else {
      activityToSave.improvementDetails = processedImprovementDetails;
    }
    
    onUpdateActivity(phaseId, activity.id, activityToSave);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initializeFormData(activity));
    setIsEditing(false);
  };
  
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch (e) {
      return ''; 
    }
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };


  if (isEditing) {
    const currentCrmDetails = formData.crmDetails || { isCrmActivity: false };
    const currentImprovementDetails = formData.improvementDetails || { feedbackLogString: '', improvementIdeasString: '', actionItems: [] };
    return (
      <Card className="bg-white p-4 rounded-lg shadow-lg border border-slate-200"> {/* Updated: light bg for edit mode */}
        <div className="space-y-4">
          <div>
            <label htmlFor={`title-${activity.id}`} className={labelBaseStyle}>Title</label>
            <input type="text" name="title" id={`title-${activity.id}`} value={formData.title} onChange={handleInputChange} className={inputBaseStyle} />
          </div>
          <div>
            <label htmlFor={`prompt-${activity.id}`} className={labelBaseStyle}>Prompt</label>
            <textarea name="prompt" id={`prompt-${activity.id}`} value={formData.prompt} onChange={handleInputChange} className={textareaBaseStyle} />
          </div>
          <div>
            <label htmlFor={`outcome-${activity.id}`} className={labelBaseStyle}>Outcome</label>
            <textarea name="outcome" id={`outcome-${activity.id}`} value={formData.outcome} onChange={handleInputChange} className={textareaBaseStyle} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`status-${activity.id}`} className={labelBaseStyle}>Status</label>
              <select name="status" id={`status-${activity.id}`} value={formData.status || 'To Do'} onChange={handleInputChange} className={inputBaseStyle}>
                {(['To Do', 'In Progress', 'Done', 'Blocked', 'On Hold'] as ActivityStatus[]).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor={`priority-${activity.id}`} className={labelBaseStyle}>Priority</label>
              <select name="priority" id={`priority-${activity.id}`} value={formData.priority || 'Medium'} onChange={handleInputChange} className={inputBaseStyle}>
                {(['Low', 'Medium', 'High'] as ActivityPriority[]).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor={`assignedTo-${activity.id}`} className={labelBaseStyle}>Assigned To</label>
            <input type="text" name="assignedTo" id={`assignedTo-${activity.id}`} value={formData.assignedTo || ''} onChange={handleInputChange} className={inputBaseStyle} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`startDate-${activity.id}`} className={labelBaseStyle}>Start Date</label>
              <input type="date" name="startDate" id={`startDate-${activity.id}`} value={formatDateForInput(formData.startDate)} onChange={handleInputChange} className={inputBaseStyle} />
            </div>
            <div>
              <label htmlFor={`dueDate-${activity.id}`} className={labelBaseStyle}>Due Date</label>
              <input type="date" name="dueDate" id={`dueDate-${activity.id}`} value={formatDateForInput(formData.dueDate)} onChange={handleInputChange} className={inputBaseStyle} />
            </div>
          </div>
          <div>
            <label htmlFor={`dependencies-${activity.id}`} className={labelBaseStyle}>Dependencies (IDs, comma-separated)</label>
            <input type="text" name="dependencies" id={`dependencies-${activity.id}`} value={formData.dependencies || ''} onChange={handleInputChange} className={inputBaseStyle} />
          </div>
          <div>
            <label htmlFor={`planningNotes-${activity.id}`} className={labelBaseStyle}>Planning/Review Cadence Notes</label>
            <textarea name="planningNotes" id={`planningNotes-${activity.id}`} value={formData.planningNotes || ''} onChange={handleInputChange} className={textareaBaseStyle} />
          </div>

          {/* Improvement Details Edit Section */}
          <div className="pt-4 border-t border-slate-200"> {/* Updated border color */}
            <h5 className="text-lg font-semibold text-[#1B365D] mb-3">Continuous Improvement Details</h5> {/* Updated text color */}
            <div>
              <label htmlFor={`improvementDetails.feedbackLogString-${activity.id}`} className={labelBaseStyle}>Feedback Log (one item per line)</label>
              <textarea name="improvementDetails.feedbackLogString" id={`improvementDetails.feedbackLogString-${activity.id}`} 
                        value={currentImprovementDetails.feedbackLogString || ''} onChange={handleInputChange} className={textareaBaseStyle} rows={3}/>
            </div>
            <div>
              <label htmlFor={`improvementDetails.improvementIdeasString-${activity.id}`} className={labelBaseStyle}>Improvement Ideas (one item per line)</label>
              <textarea name="improvementDetails.improvementIdeasString" id={`improvementDetails.improvementIdeasString-${activity.id}`} 
                        value={currentImprovementDetails.improvementIdeasString || ''} onChange={handleInputChange} className={textareaBaseStyle} rows={3}/>
            </div>
            <div className="mt-3">
              <label className={labelBaseStyle}>Action Items</label>
              {currentImprovementDetails.actionItems && currentImprovementDetails.actionItems.map((item, index) => (
                <div key={item.id || index} className="flex items-center space-x-2 mb-2 bg-slate-100 p-2 rounded"> {/* Updated bg */}
                  <input 
                    type="checkbox" 
                    checked={item.completed} 
                    onChange={(e) => handleActionItemChange(index, 'completed', e.target.checked)}
                    className={checkboxStyle} 
                    aria-label={`Mark action item ${index + 1} as completed`}
                  />
                  <input 
                    type="text" 
                    value={item.text} 
                    onChange={(e) => handleActionItemChange(index, 'text', e.target.value)}
                    className={`${inputBaseStyle} flex-grow`}
                    placeholder="Action item description"
                  />
                  <button type="button" onClick={() => removeActionItem(index)} className="text-[#DD6B20] hover:text-orange-700 p-1" aria-label={`Remove action item ${index + 1}`}> {/* Warning Orange for remove */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c-.34-.059-.68-.114-1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                  </button>
                </div>
              ))}
              <button type="button" onClick={addActionItem} className="mt-1 text-sm text-[#1B365D] hover:text-blue-700 flex items-center"> {/* Fae Blue for add */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Add Action Item
              </button>
            </div>
          </div>


          {/* CRM Details Edit Section */}
          <div className="pt-4 border-t border-slate-200"> {/* Updated border color */}
            <h5 className="text-lg font-semibold text-[#1B365D] mb-3">CRM Tracking</h5> {/* Updated text color */}
            <div className="mb-3">
              <label htmlFor={`crmDetails.isCrmActivity-${activity.id}`} className={checkboxLabelStyle}>
                <input type="checkbox" name="crmDetails.isCrmActivity" id={`crmDetails.isCrmActivity-${activity.id}`} 
                       checked={!!currentCrmDetails.isCrmActivity} onChange={handleInputChange} className={checkboxStyle} />
                Is this a CRM-related activity?
              </label>
            </div>

            {currentCrmDetails.isCrmActivity && (
              <div className="space-y-4 pl-6 border-l-2 border-[#1B365D]/50 ml-2"> {/* Fae Blue border */}
                <div>
                  <label htmlFor={`crmDetails.leadSource-${activity.id}`} className={labelBaseStyle}>Lead Source</label>
                  <input type="text" name="crmDetails.leadSource" id={`crmDetails.leadSource-${activity.id}`} value={currentCrmDetails.leadSource || ''} onChange={handleInputChange} className={inputBaseStyle} />
                </div>
                <div>
                  <label htmlFor={`crmDetails.customerName-${activity.id}`} className={labelBaseStyle}>Customer Name</label>
                  <input type="text" name="crmDetails.customerName" id={`crmDetails.customerName-${activity.id}`} value={currentCrmDetails.customerName || ''} onChange={handleInputChange} className={inputBaseStyle} />
                </div>
                <div>
                  <label htmlFor={`crmDetails.dealStage-${activity.id}`} className={labelBaseStyle}>Deal Stage</label>
                  <select name="crmDetails.dealStage" id={`crmDetails.dealStage-${activity.id}`} value={currentCrmDetails.dealStage || 'Lead'} onChange={handleInputChange} className={inputBaseStyle}>
                    {(['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'] as CrmDealStage[]).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor={`crmDetails.estimatedValue-${activity.id}`} className={labelBaseStyle}>Estimated Value ($)</label>
                  <input type="number" name="crmDetails.estimatedValue" id={`crmDetails.estimatedValue-${activity.id}`} value={currentCrmDetails.estimatedValue === undefined ? '' : currentCrmDetails.estimatedValue} onChange={handleInputChange} className={inputBaseStyle} placeholder="e.g., 5000" />
                </div>
                <div>
                  <label htmlFor={`crmDetails.crmNotes-${activity.id}`} className={labelBaseStyle}>CRM Notes</label>
                  <textarea name="crmDetails.crmNotes" id={`crmDetails.crmNotes-${activity.id}`} value={currentCrmDetails.crmNotes || ''} onChange={handleInputChange} className={textareaBaseStyle} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-[#4A5568] bg-slate-200 hover:bg-slate-300 rounded-md transition-colors">Cancel</button> {/* Updated button */}
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-[#1B365D] hover:bg-blue-800 rounded-md transition-colors">Save Changes</button> {/* Fae Blue button */}
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 hover:shadow-md transition-shadow duration-300"> {/* Updated: light bg */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-xl font-semibold text-[#1B365D]">{activity.title}</h4> {/* Fae Blue title */}
        <button onClick={() => setIsEditing(true)} className="text-[#1B365D] hover:text-blue-700 transition-colors p-1 -mr-1"> {/* Fae Blue icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
      </div>
      
      {(activity.status || activity.priority) && (
        <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-slate-200"> {/* Light border */}
          {activity.status && <StatusBadge status={activity.status} />}
          {activity.priority && <PriorityDisplay priority={activity.priority} />}
        </div>
      )}

      <DetailSection title="Prompt" icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#1B365D]"> {/* Fae Blue icon */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
      }>
        {activity.prompt}
      </DetailSection>
      <DetailSection title="Outcome" icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#38A169]"> {/* Success Green icon */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      }>
        {activity.outcome}
      </DetailSection>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        {activity.assignedTo && (
            <DetailSection title="Assigned To" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-500"> {/* Maintained teal for this icon */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            }>{activity.assignedTo}</DetailSection>
        )}
        {activity.startDate && (
            <DetailSection title="Start Date" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-500"> {/* Maintained cyan */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
            }>{new Date(activity.startDate).toLocaleDateString()}</DetailSection>
        )}
        {activity.dueDate && (
            <DetailSection title="Due Date" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-pink-500"> {/* Maintained pink */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008Z" />
                </svg>
            }>{new Date(activity.dueDate).toLocaleDateString()}</DetailSection>
        )}
        {activity.dependencies && (
            <DetailSection title="Dependencies" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-500"> {/* Maintained purple */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
            }>{activity.dependencies}</DetailSection>
        )}
      </div>

      {activity.planningNotes && (
         <DetailSection title="Planning/Review Cadence Notes" className="mt-3 pt-3 border-t border-slate-200" icon={ /* Light border */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500"> {/* Maintained yellow */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
         }>
           {activity.planningNotes}
         </DetailSection>
      )}
      
      {/* CRM Details View Section */}
      {activity.crmDetails && activity.crmDetails.isCrmActivity && (
        <div className="mt-4 pt-4 border-t border-slate-200"> {/* Light border */}
          <h5 className="text-lg font-semibold text-[#1B365D] mb-3 flex items-center"> {/* Fae Blue title */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-[#38A169]"> {/* Success Green icon */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
            CRM Details
          </h5>
          <div className="space-y-2 pl-1">
            {activity.crmDetails.leadSource && (
              <DetailSection title="Lead Source" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#38A169]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" /></svg>
              }>{activity.crmDetails.leadSource}</DetailSection>
            )}
            {activity.crmDetails.customerName && (
              <DetailSection title="Customer Name" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#38A169]"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              }>{activity.crmDetails.customerName}</DetailSection>
            )}
            {activity.crmDetails.dealStage && (
              <DetailSection title="Deal Stage" icon={
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#38A169]"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12H19.875c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 19.875v-6.75ZM12 15.75h.008v.008H12v-.008Z" /></svg>
              }>{activity.crmDetails.dealStage}</DetailSection>
            )}
            {activity.crmDetails.estimatedValue !== undefined && (
              <DetailSection title="Est. Value" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#38A169]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              }>{formatCurrency(activity.crmDetails.estimatedValue)}</DetailSection>
            )}
            {activity.crmDetails.crmNotes && (
              <DetailSection title="CRM Notes" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#38A169]"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
              }>{activity.crmDetails.crmNotes}</DetailSection>
            )}
          </div>
        </div>
      )}

      {/* Improvement Details View Section */}
      {activity.improvementDetails && (activity.improvementDetails.feedbackLog.length > 0 || activity.improvementDetails.improvementIdeas.length > 0 || activity.improvementDetails.actionItems.length > 0) && (
        <div className="mt-4 pt-4 border-t border-slate-200"> {/* Light border */}
           <h5 className="text-lg font-semibold text-[#1B365D] mb-3 flex items-center"> {/* Fae Blue title */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-indigo-500"> {/* Maintained Indigo */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Continuous Improvement Details
          </h5>
          {activity.improvementDetails.feedbackLog.length > 0 && (
            <DetailSection title="Feedback Log" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-500"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}>
              <ul className="list-disc list-inside pl-1 space-y-1">
                {activity.improvementDetails.feedbackLog.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </DetailSection>
          )}
          {activity.improvementDetails.improvementIdeas.length > 0 && (
            <DetailSection title="Improvement Ideas" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3 .378A6.011 6.011 0 0 1 12 15.75c-1.618 0-3.099.618-4.242 1.622M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>}>
              <ul className="list-disc list-inside pl-1 space-y-1">
                {activity.improvementDetails.improvementIdeas.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </DetailSection>
          )}
          {activity.improvementDetails.actionItems.length > 0 && (
             <DetailSection title="Action Items" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-500"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
              <ul className="space-y-1">
                {activity.improvementDetails.actionItems.map((item) => (
                  <li key={item.id} className={`flex items-center ${item.completed ? 'line-through text-slate-500' : 'text-[#4A5568]'}`}> {/* Professional Gray for text */}
                    <span className="mr-2 text-sm">{item.completed ? '✅' : '⬜️'}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}
        </div>
      )}
    </Card>
  );
};