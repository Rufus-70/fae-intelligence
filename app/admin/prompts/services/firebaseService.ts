// app/admin/prompts/services/firebaseService.ts
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy // Optional: if you want to order prompts
} from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApp'; // Corrected path to central Firebase config
import { Prompt } from '../types'; // Corrected path to local types

const PROMPTS_COLLECTION = 'prompts';

export const getPrompts = async (): Promise<Prompt[]> => {
  // Optional: Order by creation date, newest first
  const promptsQuery = query(collection(db, PROMPTS_COLLECTION), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(promptsQuery);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Convert Firestore Timestamps to Date objects or string representations
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
    } as Prompt;
  });
};

// The promptData here should not include id, createdAt, or updatedAt as these are handled by Firestore/service
export const addPrompt = async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, PROMPTS_COLLECTION), {
    ...promptData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(), // Also set updatedAt on creation
  });
  return docRef.id;
};

export const updatePrompt = async (id: string, promptData: Partial<Omit<Prompt, 'id' | 'createdAt'>>): Promise<void> => {
  const promptDoc = doc(db, PROMPTS_COLLECTION, id);
  await updateDoc(promptDoc, {
    ...promptData,
    updatedAt: serverTimestamp(),
  });
};

export const deletePrompt = async (id: string): Promise<void> => {
  const promptDoc = doc(db, PROMPTS_COLLECTION, id);
  await deleteDoc(promptDoc);
};

// Placeholder for potential file upload service if needed for prompts (e.g., images, documents)
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// export const uploadFileForPrompt = async (file: File, promptId: string): Promise<string> => {
//   const storage = getStorage(db.app); // Get storage instance from the app associated with db
//   const filePath = `prompts/${promptId}/${file.name}`;
//   const fileRef = ref(storage, filePath);
//   await uploadBytes(fileRef, file);
//   const downloadURL = await getDownloadURL(fileRef);
//   return downloadURL;
// };

console.log("firebaseService.ts for prompts loaded and configured with central Firebase db.");
