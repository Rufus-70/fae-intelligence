// app/admin/workflows/services/workflowService.ts
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, Timestamp, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApp';
import { Workflow, Step } from '../types'; // Assuming Step is also defined here

const WORKFLOWS_COLLECTION = 'workflows';

// Helper to convert Firestore Timestamps in steps if necessary
// For now, assuming steps do not have their own top-level timestamps needing conversion.
// If a step's sub-properties (e.g., step.prompt.createdAt) are Timestamps,
// they would need specific handling if not automatically converted or if used directly.
const convertStepTimestamps = (steps: any[]): Step[] => {
    return steps.map(step => {
        const newStep = { ...step };
        // Example: if a step itself had a 'lastModified' Timestamp field:
        // if (newStep.lastModified instanceof Timestamp) {
        //   newStep.lastModified = newStep.lastModified.toDate().toISOString();
        // }
        // If step.prompt is an object and has timestamps, it needs careful handling.
        // However, the current Step type defines prompt as `Prompt | string`.
        // If it's a full Prompt object from Firestore, its timestamps would need conversion.
        // For now, this function is a placeholder for deeper step conversions if needed.
        return newStep as Step;
    });
};

const workflowFromDoc = (docSnapshot: any): Workflow => {
    const data = docSnapshot.data();
    return {
        id: docSnapshot.id,
        title: data.title || 'Untitled Workflow',
        description: data.description || '',
        authorId: data.authorId || '',
        version: data.version || '1.0',
        tags: data.tags || [],
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        steps: data.steps ? convertStepTimestamps(data.steps) : [],
    } as Workflow;
};

export const getWorkflows = async (): Promise<Workflow[]> => {
    const q = query(collection(db, WORKFLOWS_COLLECTION), orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(workflowFromDoc);
};

export const addWorkflow = async (workflowData: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const docRef = await addDoc(collection(db, WORKFLOWS_COLLECTION), {
        ...workflowData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
};

export const updateWorkflow = async (id: string, workflowData: Partial<Omit<Workflow, 'id' | 'createdAt' | 'authorId'>>): Promise<void> => {
    const workflowDoc = doc(db, WORKFLOWS_COLLECTION, id);
    await updateDoc(workflowDoc, {
        ...workflowData,
        updatedAt: serverTimestamp(),
    });
};

export const deleteWorkflow = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, WORKFLOWS_COLLECTION, id));
};

console.log("workflowService.ts loaded. Interacting with Firestore collection:", WORKFLOWS_COLLECTION);
