// app/admin/prompts/page.tsx
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar'; // Corrected path
import PromptCard from '../components/PromptCard'; // Corrected path
import Modal from '../components/Modal'; // Corrected path
import PromptForm from '../components/PromptForm'; // Corrected path
import GeminiInteractionModal from '../components/GeminiInteractionModal'; // Corrected path
import { getPrompts, addPrompt, updatePrompt, deletePrompt as deletePromptService } from '../services/firebaseService'; // Corrected path
import { Prompt } from '../types'; // Corrected path
// Assuming icons are components, e.g., import { IconSearch } from '../constants';

// Styles (if any were in App.css, consider moving to global.css or using Tailwind)
// import './App.css'; 

export default function PromptManagementPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]); // Example filter state
  const [isLoading, setIsLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  
  const [currentEditingPrompt, setCurrentEditingPrompt] = useState<Prompt | null>(null);
  const [promptToTest, setPromptToTest] = useState<Prompt | null>(null);

  const fetchPrompts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedPrompts = await getPrompts();
      setPrompts(fetchedPrompts);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      // Handle error (e.g., show a toast notification)
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearchTerm = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                prompt.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = filterTags.length === 0 || (prompt.tags && filterTags.every(tag => prompt.tags!.includes(tag)));
      return matchesSearchTerm && matchesTags;
    });
  }, [prompts, searchTerm, filterTags]);

  const handleOpenFormModal = (prompt: Prompt | null = null) => {
    setCurrentEditingPrompt(prompt);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setCurrentEditingPrompt(null);
    setIsFormModalOpen(false);
  };

  const handleFormSubmit = async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    // Assuming userId will be handled by the service or is added here if available from session
    const userId = "admin-user"; // Placeholder for actual user ID from session
    try {
      if (currentEditingPrompt) {
        await updatePrompt(currentEditingPrompt.id, { ...promptData, userId });
      } else {
        await addPrompt({ ...promptData, userId });
      }
      await fetchPrompts(); // Refresh data
      handleCloseFormModal();
    } catch (error) {
      console.error("Error submitting prompt:", error);
      // Handle error (e.g., show a toast notification in the modal)
    }
  };

  const handleDeletePrompt = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        await deletePromptService(id);
        await fetchPrompts(); // Refresh data
      } catch (error) {
        console.error("Error deleting prompt:", error);
        // Handle error
      }
    }
  };
  
  const handleOpenTestModal = (prompt: Prompt) => {
    setPromptToTest(prompt);
    setIsTestModalOpen(true);
  };

  const handleCloseTestModal = () => {
    setPromptToTest(null);
    setIsTestModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-slate-900 text-white min-h-screen">
      <Navbar 
        onSearchChange={setSearchTerm} 
        onAddNew={() => handleOpenFormModal(null)}
        // onFilterChange={setFilterTags} // Example if Navbar handles tag filtering
      />

      <header className="my-6 md:my-8">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-400 text-center">
          Prompt Management Hub
        </h1>
        <p className="text-center text-slate-400 mt-2">
          Curate, test, and deploy your AI prompts efficiently.
        </p>
      </header>

      {isLoading ? (
        <p className="text-center text-sky-300">Loading prompts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map(prompt => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onEdit={() => handleOpenFormModal(prompt)}
                onDelete={() => handleDeletePrompt(prompt.id)}
                onTest={() => handleOpenTestModal(prompt)}
              />
            ))
          ) : (
            <p className="text-center text-slate-500 md:col-span-2 lg:col-span-3 py-10">
              No prompts found. Try adjusting your search or filters, or add a new prompt!
            </p>
          )}
        </div>
      )}

      {isFormModalOpen && (
        <Modal isOpen={isFormModalOpen} onClose={handleCloseFormModal} title={currentEditingPrompt ? "Edit Prompt" : "Create New Prompt"}>
          <PromptForm 
            prompt={currentEditingPrompt} 
            onSubmit={handleFormSubmit} 
            onClose={handleCloseFormModal} 
          />
        </Modal>
      )}

      {isTestModalOpen && promptToTest && (
        <GeminiInteractionModal
          isOpen={isTestModalOpen}
          onClose={handleCloseTestModal}
          promptToTest={promptToTest}
        />
      )}
    </div>
  );
}
