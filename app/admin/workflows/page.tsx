// app/admin/workflows/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import WorkflowList from '../components/WorkflowList'; // Corrected path
import WorkflowEditor from '../components/WorkflowEditor'; // Corrected path
import WorkflowViewer from '../components/WorkflowViewer'; // Corrected path
import { Workflow, Step } from '../types'; // Corrected path
import { Prompt } from '../../prompts/types'; // Corrected path - Standardized Prompt type
import { getWorkflows, addWorkflow, updateWorkflow, deleteWorkflow as deleteWorkflowService } from '../services/workflowService'; // Corrected path
import { getPrompts as getAvailablePrompts } from '../../prompts/services/firebaseService'; // Corrected path
import { DEFAULT_AUTHOR_ID } from '../constants'; // Corrected path
import { useSession } from 'next-auth/react'; // For user ID

type ViewType = 'list' | 'editor' | 'viewer';

export default function WorkflowManagementPage() {
  const { data: session } = useSession();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [availablePrompts, setAvailablePrompts] = useState<Prompt[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkflowsAndPrompts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedWorkflows, fetchedPrompts] = await Promise.all([
        getWorkflows(),
        getAvailablePrompts()
      ]);
      setWorkflows(fetchedWorkflows);
      setAvailablePrompts(fetchedPrompts);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load workflows or prompts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkflowsAndPrompts();
  }, [fetchWorkflowsAndPrompts]);

  useEffect(() => {
    if (currentView === 'list') {
      setSelectedWorkflow(null);
      setEditingWorkflow(null);
    }
  }, [currentView]);

  const handleCreateWorkflow = () => {
    // Get current user ID from session if available, otherwise use default
    const authorId = session?.user?.id || DEFAULT_AUTHOR_ID;
    const newWorkflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'> = {
      title: "New Untitled Workflow",
      description: "",
      authorId: authorId,
      version: "1.0",
      tags: [],
      steps: [],
    };
    // We don't set an ID here, Firestore will generate it.
    // We pass the partial data to editor, and onSave will call addWorkflow.
    setEditingWorkflow({ ...newWorkflow, id: '', createdAt: '', updatedAt: '' }); // Provide dummy id/dates for editor state
    setCurrentView('editor');
  };

  const handleEditWorkflow = (id: string) => {
    const workflowToEdit = workflows.find(wf => wf.id === id);
    if (workflowToEdit) {
      setEditingWorkflow(workflowToEdit);
      setCurrentView('editor');
    }
  };
  
  const handleViewWorkflow = (id: string) => {
    const workflowToView = workflows.find(wf => wf.id === id);
    if (workflowToView) {
      setSelectedWorkflow(workflowToView);
      setCurrentView('viewer');
    }
  };

  const handleSaveWorkflow = async (workflowData: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'> | Workflow) => {
    setIsLoading(true);
    try {
      const authorId = session?.user?.id || DEFAULT_AUTHOR_ID;
      if ('id' in workflowData && workflowData.id) { // Existing workflow
        await updateWorkflow(workflowData.id, { ...workflowData, authorId }); // Ensure authorId is passed
      } else { // New workflow
        await addWorkflow({ ...workflowData, authorId });
      }
      await fetchWorkflowsAndPrompts(); // Refresh data
      setCurrentView('list');
    } catch (err) {
      console.error("Error saving workflow:", err);
      setError("Failed to save workflow.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteWorkflow = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this workflow? This action cannot be undone.")) {
      setIsLoading(true);
      try {
        await deleteWorkflowService(id);
        await fetchWorkflowsAndPrompts(); // Refresh data
        if (selectedWorkflow?.id === id) setSelectedWorkflow(null);
        if (editingWorkflow?.id === id) setEditingWorkflow(null);
        setCurrentView('list'); // Go back to list view
      } catch (err) {
        console.error("Error deleting workflow:", err);
        setError("Failed to delete workflow.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGenerateDocs = (workflowId: string) => {
    const workflow = workflows.find(wf => wf.id === workflowId);
    console.log("Generating documentation for (placeholder):", workflow?.title);
    // Actual documentation generation logic will be implemented later.
    alert(`Placeholder: Generate documentation for ${workflow?.title}`);
  };
  
  const renderContent = () => {
    if (isLoading && !error && currentView === 'list' && workflows.length === 0) { // Initial load
      return <p className="text-center text-sky-300 py-10">Loading workflows...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500 py-10">{error}</p>;
    }

    switch (currentView) {
      case 'editor':
        return (
          <WorkflowEditor
            workflowToEdit={editingWorkflow} // Can be a new (partial) or existing workflow
            availablePrompts={availablePrompts}
            onSaveWorkflow={handleSaveWorkflow}
            onCancel={() => setCurrentView('list')}
          />
        );
      case 'viewer':
        return selectedWorkflow ? (
          <WorkflowViewer
            workflow={selectedWorkflow}
            availablePrompts={availablePrompts}
            onEdit={() => handleEditWorkflow(selectedWorkflow.id)}
            onGenerateDocs={() => handleGenerateDocs(selectedWorkflow.id)}
            onClose={() => setCurrentView('list')}
          />
        ) : <p className="text-center text-slate-400">No workflow selected for viewing.</p>;
      case 'list':
      default:
        return (
          <WorkflowList
            workflows={workflows}
            onViewWorkflow={handleViewWorkflow}
            onEditWorkflow={handleEditWorkflow}
            onDeleteWorkflow={handleDeleteWorkflow}
            onCreateWorkflow={handleCreateWorkflow}
            isLoading={isLoading} // Pass loading state to list for individual item feedback if needed
          />
        );
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-slate-900 text-white min-h-screen">
      <header className="my-6 md:my-8">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-400 text-center">
          Workflow Documentation Generator
        </h1>
        <p className="text-center text-slate-400 mt-2">
          Design, manage, and document your complex workflows.
        </p>
      </header>
      {renderContent()}
    </div>
  );
}
