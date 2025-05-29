// Placeholder for blueprintData.ts
// The actual content from the Consultancy Dashboard's constants/blueprintData.ts should be placed here.
// This file should export a variable like 'initialBlueprintData'.

// import { BlueprintData } from '../types'; // Assuming types will be in ../types/index.ts

export const initialBlueprintData: any /* BlueprintData */ = {
  projectName: "Placeholder Project",
  phases: [
    {
      id: "phase-1",
      title: "Phase 1: Discovery",
      description: "Initial research and requirement gathering.",
      activities: [
        { id: "act-1-1", name: "Kick-off meeting", status: "completed" },
        { id: "act-1-2", name: "Stakeholder interviews", status: "pending" },
      ],
      monitoringPoints: [
        { id: "mp-1-1", metric: "Interviews Conducted", value: "5/10" },
      ],
    },
    {
      id: "phase-2",
      title: "Phase 2: Development",
      description: "Building the solution.",
      activities: [
        { id: "act-2-1", name: "Develop feature X", status: "in-progress" },
      ],
      monitoringPoints: [],
    },
  ],
  // Add other fields that BlueprintData might have
};

// If the original file uses 'export default', adjust accordingly.
// export default initialBlueprintData;
