// Placeholder for types/index.ts from Prompt Management App
// Actual content (Prompt type, etc.) should be migrated here.

export interface Prompt {
  id: string;
  title: string;
  content: string;
  tags?: string[]; // Optional tags
  userId: string; // Assuming prompts are user-specific
  createdAt: Date; // Or string, depending on Firebase setup
  updatedAt: Date; // Or string
  // Add other fields relevant to a Prompt
  category?: string;
  variables?: { name: string; type: 'text' | 'number' }[];
  expectedOutputFormat?: string;
}

// Add other types that might have been in the original types.ts
// For example, if there were specific types for filters or user profiles.
// export interface PromptFilter {
//   searchTerm?: string;
//   tags?: string[];
//   category?: string;
// }

console.log("prompt types/index.ts placeholder loaded.");
