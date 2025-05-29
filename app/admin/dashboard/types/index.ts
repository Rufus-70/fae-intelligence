// Placeholder for types/index.ts
// The actual content from the Consultancy Dashboard's types.ts should be placed here.

export interface Activity {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  // Add other activity-specific fields if any
}

export interface MonitoringPoint {
  id: string;
  metric: string;
  value: string | number;
  // Add other monitoring point-specific fields if any
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  activities: Activity[];
  monitoringPoints: MonitoringPoint[];
  // Add other phase-specific fields if any
}

export interface MonitoringTip {
  id: string;
  content: string;
  category: 'efficiency' | 'risk' | 'quality' | 'general'; // Added 'general' for flexibility
}

export interface BlueprintData {
  projectName: string;
  phases: Phase[];
  monitoringTips?: MonitoringTip[]; // Added optional monitoringTips
  // Add other global blueprint fields if any
}

// ViewName for navigation within the dashboard
export type ViewName = 'blueprint' | 'crm' | 'finance' | 'projects' | 'clients' | 'tasks';

// Add any other types that were in the original types.ts file.
