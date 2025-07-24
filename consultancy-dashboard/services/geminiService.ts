
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ParsedProjectPlan } from '../types';

const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

// Ensure API_KEY is accessed correctly from environment variables
// The build system or environment should make `process.env.API_KEY` available.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY for Gemini is not set in environment variables.");
  // Depending on the app's structure, you might throw an error or handle this state.
  // For now, we'll let it proceed, but calls will fail if the key isn't truly available.
}

const ai = new GoogleGenAI({ apiKey: apiKey! }); // Non-null assertion for apiKey

function generateClientSideId() {
  return `csid_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

export async function parseProjectPlanWithGemini(planText: string): Promise<ParsedProjectPlan> {
  const systemInstruction = `You are an expert project plan parser. Analyze the provided text, which represents a project plan, and extract its details into a structured JSON format.

  Your output MUST be a valid JSON object adhering to the following structure:
  {
    "projectName": "string (The main title or name of the project)",
    "projectDescription": "string (Overall project goal, key success metrics, risks, and mitigation combined. Make this comprehensive.)",
    "projectManager": "string (If a project manager is explicitly mentioned, otherwise null)",
    "startDate": "string (Overall project start date in YYYY-MM-DD format if available, otherwise null)",
    "endDate": "string (Overall project end date in YYYY-MM-DD format if available, otherwise null)",
    "phases": [
      {
        "clientSideId": "string (A unique client-side ID you generate, e.g., 'phase_123')",
        "title": "string (The title of the phase, e.g., 'Phase 1: Strategy & Foundation')",
        "objective": "string (The objective of the phase, if stated)",
        "tasks": [
          {
            "clientSideId": "string (A unique client-side ID you generate, e.g., 'task_456')",
            "title": "string (The title of the task, e.g., 'Define Blog Goals & Audience')",
            "description": "string (A comprehensive description combining Deliverables, Tools/Resources, Notes, and any other relevant details for this task. Format with newlines for readability if appropriate.)",
            "assignedTo": "string (The responsible party for the task, if specified, otherwise null)",
            "startDate": "string (Task start date in YYYY-MM-DD format if available or inferable, otherwise null. If a range like 'Week 1-2' is given and today is YYYY-MM-DD, try to estimate.)",
            "dueDate": "string (Task due date in YYYY-MM-DD format if available or inferable, otherwise null. If a range or duration is given, try to estimate.)"
          }
        ]
      }
    ]
  }

  Important Parsing Instructions:
  1.  Identify the main project title.
  2.  Look for sections detailing overall project goals, success metrics, risks, and mitigation strategies. Combine these into the 'projectDescription'.
  3.  Identify distinct phases. Each phase usually has a title (e.g., "Phase X: Title") and an objective.
  4.  Within each phase, identify individual tasks. Tasks might be presented in tables or lists.
  5.  For each task:
      *   Extract its title (Task Description in the example plan).
      *   Combine information from columns like "Deliverables", "Tools/Resources", and "Notes" into a single, well-formatted "description" field for the task.
      *   Extract the "Responsible Party" as "assignedTo".
      *   Attempt to parse or infer "startDate" and "dueDate" from "Estimated Timeline". If specific dates are given, use YYYY-MM-DD. If a range (e.g., "Week 1-2" or "Months 1-3") or a duration is given, make a reasonable estimation for start/due dates if possible, otherwise, leave them as null. Be cautious with date estimations. If a general project start date is mentioned, use it as a reference for relative timelines.
  6.  Generate unique 'clientSideId' for each phase and task for client-side processing.
  7.  If information for a field is not present or cannot be reliably extracted, use null for optional string fields or an empty string/array as appropriate for the schema.
  8.  Do not include any explanatory text or markdown formatting (like \`\`\`json) around the JSON output. The entire response should be the JSON object itself.
  9.  Pay close attention to table structures if present in the input text for extracting task details.
  10. If the plan mentions "Project Manager", extract that.
  11. If the plan has "Project Start Date" and "Project End Date" at a high level, extract those.
  12. Ensure all text values are properly escaped within the JSON strings.`;


  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ role: "user", parts: [{text: planText }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        // temperature: 0.2 // Lower temperature for more deterministic output
      }
    });
    
    let jsonStr = response.text.trim();
    
    // Remove markdown fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedJson = JSON.parse(jsonStr);

    // Add clientSideIds if Gemini didn't (though prompt asks it to)
    // This is a fallback to ensure frontend has keys
    if (parsedJson.phases) {
      parsedJson.phases.forEach((phase: any) => {
        if (!phase.clientSideId) {
          phase.clientSideId = generateClientSideId();
        }
        if (phase.tasks) {
          phase.tasks.forEach((task: any) => {
            if (!task.clientSideId) {
              task.clientSideId = generateClientSideId();
            }
          });
        } else {
          phase.tasks = []; // Ensure tasks array exists
        }
      });
    } else {
      parsedJson.phases = []; // Ensure phases array exists
    }
    
    // Basic validation of the parsed structure (can be expanded)
    if (!parsedJson.projectName || !Array.isArray(parsedJson.phases)) {
        throw new Error("Parsed JSON is missing essential project plan structure (projectName or phases).");
    }

    return parsedJson as ParsedProjectPlan;

  } catch (error: any) {
    console.error("Error calling Gemini API or parsing its response:", error);
    if (error.message.includes("JSON")) {
        throw new Error("AI parsing failed: The response was not valid JSON. The AI might have had trouble understanding the plan format. Try simplifying the plan or checking its structure.");
    }
    throw new Error(`AI interaction error: ${error.message}`);
  }
}
