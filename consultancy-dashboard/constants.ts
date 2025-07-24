
import { BlueprintData, Client, CommunicationLogEntry, Deal, Project, Task, Expense, RevenueItem, ExpenseCategory, RevenueSource, Invoice, InvoiceStatus, InvoiceLineItem, invoiceStatuses as validInvoiceStatuses, revenueSources as validRevenueSources } from './types';

export const blueprintData: BlueprintData = {
  title: "The Long-Term Blueprint: Building Your Integrated Consultancy Operations Dashboard",
  phases: [
    {
      id: "phase-0",
      title: "Phase 0: Foundation & Core System Setup",
      duration: "Initial Setup (Ongoing Refinement)",
      objective: "Establish the core data structures and foundational modules of the consultancy dashboard application.",
      keyActivities: [
        {
          id: "activity-0-1",
          title: "Data Structure & Core Entity Design",
          prompt: "Design and implement core data models for clients, projects, tasks, and financial records (invoices, expenses, revenue) within the application. Establish initial categories, statuses, and relationships.",
          outcome: "Structured data foundation for the consultancy dashboard, enabling organized information management.",
          status: "Done",
          priority: "High",
          planningNotes: "Core entities (Clients, Projects, Tasks, Invoices, Expenses, Revenue) established with key fields and relationships.",
          assignedTo: "System Architect/Developer",
          startDate: "2024-07-01",
          dueDate: "2024-07-31",
        },
        {
          id: "activity-0-2",
          title: "Dashboard Application - Initial Development & UI",
          prompt: "Develop the initial version of the Consultancy Dashboard application, including user interface, navigation framework, and basic CRUD operations for core entities. Implement TailwindCSS for styling and ensure basic responsiveness.",
          outcome: "A functional dashboard for managing core consultancy operations with a consistent user experience.",
          status: "Done",
          priority: "High",
          planningNotes: "Main views, sidebar, header, footer, and basic form/table layouts are complete.",
          assignedTo: "Lead Developer",
          startDate: "2024-07-15",
          dueDate: "2024-08-30",
        },
        {
          id: "activity-0-3",
          title: "Knowledge Management Hub Strategy",
          prompt: "Define strategy for using an external knowledge management hub (e.g., Notion, Obsidian) for strategic documents, SOPs, and research, complementing the operational data managed within the dashboard.",
          outcome: "Clear guidelines on what information resides in the dashboard vs. an external KM tool.",
          status: "In Progress",
          priority: "Medium",
          assignedTo: "Consultant (Self)",
        }
      ]
    },
    {
      id: "phase-1",
      title: "Phase 1: Essential Modules & Workflow Implementation",
      duration: "Months 1-3 (Post-Foundation)",
      objective: "Implement and refine essential operational modules for client management, project execution, and financial tracking.",
      keyActivities: [
        {
          id: "activity-1-1",
          title: "Client Relationship Management (CRM) - Core Module",
          prompt: "Implement core CRM functionalities within the dashboard: Client List (add/edit), Client Profiles (view details, basic communication log display), and Communication Log (add/view entries, filter by client). Basic Lead and Deal tracking views.",
          outcome: "Centralized client and lead information, interaction history, and basic sales pipeline visibility.",
          status: "Done",
          priority: "High",
          planningNotes: "Client list, profile, comm logs implemented. Basic CRM overview, leads, deals views established.",
          assignedTo: "Developer",
          dueDate: "2024-09-30",
          crmDetails: {
            isCrmActivity: true,
            customerName: "Internal System",
            dealStage: "Proposal", // Representing the proposal to build this module
            estimatedValue: 0, // Internal
            crmNotes: "Development of the core CRM module itself."
          }
        },
        {
          id: "activity-1-2",
          title: "Project & Task Management System - Core Module",
          prompt: "Develop the Project Hub: Project Dashboard (metrics like total, active, completed, overdue), Project List (add/edit/delete, filter), Project Detail View (overview, task list). Implement Task Management: 'My Tasks' view, task creation/editing, status updates, project linking, task board view.",
          outcome: "A robust system for tracking projects and associated tasks from planning through completion, with visual dashboards.",
          status: "Done",
          priority: "High",
          planningNotes: "Project dashboard, list, detail, and task board views are functional. Task management for 'My Tasks' is complete.",
          assignedTo: "Developer",
          dueDate: "2024-10-31",
        },
        {
          id: "activity-1-3",
          title: "Financial Tracking & Invoicing - Foundational Module",
          prompt: "Implement foundational financial modules: Expense tracking (categories, project linking, add/edit/delete), Revenue item logging (sources, client/project linking, add/edit/delete), and Invoice generation (line items, tax, status tracking, add/edit/delete). Basic financial summary view.",
          outcome: "Ability to record income and expenses, issue and manage invoices, and view a basic financial overview.",
          status: "Done",
          priority: "High",
          planningNotes: "Expenses, Revenue, Invoices, and Summary views are functional.",
          assignedTo: "Developer",
          dueDate: "2024-11-30",
        }
      ]
    },
    {
      id: "phase-2",
      title: "Phase 2: Enhancing Operational Efficiency & Visibility",
      duration: "Months 4-6",
      objective: "Refine existing modules for better workflow integration, data visibility, and initial strategic alignment features.",
      keyActivities: [
        {
          id: "activity-2-1",
          title: "Advanced Financial Management & Project-Level Financials",
          prompt: "Enhance financial modules: automatically link revenue to paid invoices, update invoice status and payment dates. Implement project-specific financial summaries (total billed from paid invoices, total expenses, net profit/loss) in the Project Detail View. Refine the overall Financial Summary dashboard.",
          outcome: "Clear visibility into overall and project-specific financial health, with automated links between invoices and revenue.",
          status: "Done",
          priority: "High",
          planningNotes: "Project financial card implemented in ProjectDetailView. Finance Summary enhanced.",
          assignedTo: "Developer",
          dueDate: "2024-12-31",
        },
        {
          id: "activity-2-2",
          title: "Integrated Task Board & Workflow Visualization",
          prompt: "Develop a Kanban-style task board for projects, allowing visual tracking of task progress across different stages (To Do, In Progress, Review, Done). Implement project-based filtering on the board.",
          outcome: "Improved workflow visualization and task management for projects.",
          status: "Done",
          priority: "Medium",
          planningNotes: "ProjectTaskBoardView is implemented.",
          assignedTo: "Developer",
        },
        {
          id: "activity-2-3",
          title: "CRM Enhancements - Blueprint Linking & Activity Tracking",
          prompt: "Enhance CRM functionality by enabling tasks to be linked to CRM-related activities defined in the Strategic Blueprint. Display CRM context (customer, deal stage, value) on linked tasks. Show blueprint-derived CRM activities on CRM Overview.",
          outcome: "Better sales pipeline visibility and direct connection between strategic blueprint goals and operational tasks.",
          status: "Done",
          priority: "Medium",
          planningNotes: "Task linking to blueprint CRM activities and CRM info snippet display is complete.",
          assignedTo: "Developer",
          crmDetails: {
            isCrmActivity: true,
            leadSource: "Internal Strategy",
            customerName: "Consultancy Business",
            dealStage: "Negotiation", // For the feature itself
            estimatedValue: 0,
            crmNotes: "Developing the feature to link operational tasks back to strategic CRM goals from the blueprint."
          }
        },
        {
          id: "activity-2-4",
          title: "Advanced Client Onboarding & Lifecycle Automation (Future)",
          prompt: "Design and implement workflows for client onboarding, potentially triggered by deal closure (e.g., create project shell, task templates based on service type). Enhance client profile with more dynamic data like LTV, project history summaries.",
          outcome: "Streamlined client setup, standardized project initiation, and deeper client insights.",
          status: "To Do",
          priority: "Medium",
          planningNotes: "Consider how to template tasks or projects based on client type or service agreement.",
          assignedTo: "Developer/Consultant",
        }
      ]
    },
    {
      id: "phase-3",
      title: "Phase 3: Scaling, Reporting & Strategic Alignment",
      duration: "Months 7-12+",
      objective: "Develop advanced reporting capabilities, further automate CRM and project workflows, and ensure continuous system improvement.",
      keyActivities: [
        {
          id: "activity-3-1",
          title: "Comprehensive Reporting & Analytics Dashboard (Future)",
          prompt: "Develop an integrated analytics dashboard within the application. Provide visual insights into project performance (budget vs. actual, timeliness), financial trends (revenue/expense over time, profitability analysis), client engagement metrics, and task completion rates. Explore charting libraries.",
          outcome: "Data-driven decision-making capabilities through comprehensive, visual reports and customizable dashboards.",
          status: "To Do",
          priority: "High",
          planningNotes: "This will build upon existing summary views to offer more dynamic and visual data exploration.",
          assignedTo: "Developer",
        },
        {
          id: "activity-3-2",
          title: "Advanced CRM - Sales Automation & Forecasting (Future)",
          prompt: "Implement advanced CRM features: visual sales pipeline (Kanban for deals), deal probability tracking, automated follow-up task generation based on deal stage or inactivity. Explore basic sales forecasting based on pipeline data.",
          outcome: "A more proactive and powerful CRM for driving sales, improving follow-ups, and gaining insight into future revenue.",
          status: "To Do",
          priority: "High",
          planningNotes: "Look into drag-and-drop for deal stages. Automations could link to the task system.",
          assignedTo: "Developer",
          crmDetails: {
            isCrmActivity: true,
            dealStage: "Proposal",
            crmNotes: "Planning advanced CRM automation and forecasting capabilities."
          }
        },
        {
          id: "activity-3-3",
          title: "Continuous Improvement & System Iteration",
          prompt: "Establish and maintain a regular review cadence (e.g., monthly/quarterly) to assess system efficiency, gather user feedback (self-feedback initially, client feedback if applicable later), identify bottlenecks, and prioritize future development. Utilize the 'Improvement Details' feature in blueprint activities to log insights and actions.",
          outcome: "A living, evolving system that adapts to changing business needs and growth, with documented improvements.",
          status: "In Progress",
          priority: "High",
          planningNotes: "The 'Improvement Details' fields on blueprint activities are implemented. Regular review process needs to be maintained.",
          assignedTo: "Consultant (Self)/System Owner",
          improvementDetails: { // This is an example, the actual data is on 'activity-3-4' in old blueprint.
            feedbackLog: [
              "Initial financial summary is good, but visual charts would be better.",
              "Task creation from project detail view is very helpful."
            ],
            improvementIdeas: [
              "Add a chart for revenue vs. expenses on the Finance Summary.",
              "Explore batch-updating task statuses."
            ],
            actionItems: [
              { id: 'bp_cia_1', text: "Research charting libraries for Phase 3 reporting.", completed: false },
              { id: 'bp_cia_2', text: "Consider UI for batch task updates.", completed: false }
            ]
          }
        },
        {
          id: "activity-3-4",
          title: "User Roles & Permissions (Future)",
          prompt: "If the dashboard needs to support multiple users (e.g., team members, contractors, or even clients for specific views), design and implement a robust user roles and permissions system. This will control access to different modules, data, and actions.",
          outcome: "Secure and granular access control, enabling collaboration while protecting sensitive information.",
          status: "To Do",
          priority: "Medium",
          planningNotes: "Consider roles like Admin, Project Manager, Team Member, Client (Read-Only for specific project).",
          assignedTo: "Developer",
        },
        {
          id: "activity-3-5",
          title: "External Integrations & Advanced Automation (Future)",
          prompt: "Explore and implement integrations with key external services. Examples: Google Calendar for task due dates, email marketing platforms for leads from CRM, or a dedicated accounting software if custom financial tools become limiting. Develop more complex automations between dashboard modules.",
          outcome: "Enhanced system capabilities, reduced manual data entry, and a more connected operational ecosystem.",
          status: "To Do",
          priority: "Low",
          planningNotes: "Identify high-value integrations first. Zapier/Make might be alternatives for some P0 integrations if custom dev is too complex.",
          assignedTo: "Developer/Consultant",
        }
      ]
    }
  ],
  monitoringTips: [ // These tips are general and can remain useful
    {
      id: "tip-1",
      title: "Dashboard as Your Command Center",
      description: "Utilize the various dashboards (Project, Finance, CRM Overview) as your primary command center to monitor progress and identify areas needing attention."
    },
    {
      id: "tip-2",
      title: "Weekly Review & Planning",
      description: "Dedicate time each week to review your project statuses, task lists, financial summaries, and CRM pipeline within the dashboard. Plan key actions for the upcoming week."
    },
    {
      id: "tip-3",
      title: "Maintain Data Hygiene",
      description: "Consistently update statuses, log communications, record financials, and complete tasks in the system. Accurate data is key to useful insights."
    },
    {
      id: "tip-4",
      title: "Leverage Linking",
      description: "Utilize the linking features (tasks to projects, revenue to invoices, tasks to CRM activities) to maintain context and see relationships across your operations."
    },
    {
      id: "tip-5",
      title: "Iterate & Improve",
      description: "Use the 'Continuous Improvement' activity in your blueprint (and its logging features) to note down ideas for enhancing the dashboard or your processes as you use it."
    }
  ]
};

export const dummyClients: Client[] = [
  {
    id: 'cli_001',
    clientName: 'Innovatech Solutions Ltd.',
    contactPerson: 'Alice Wonderland',
    email: 'alice.w@innovatech.com',
    phone: '555-0101',
    status: 'Active',
    projectsCount: 3,
    lastInteraction: '2024-07-15T10:30:00Z',
  },
  {
    id: 'cli_002',
    clientName: 'Synergy Corp Inc.',
    contactPerson: 'Bob The Builder',
    email: 'bob.b@synergycorp.com',
    phone: '555-0102',
    status: 'Prospect',
    projectsCount: 0,
    lastInteraction: '2024-07-20T14:00:00Z',
  },
  {
    id: 'cli_003',
    clientName: 'Momentum Ventures',
    contactPerson: 'Carol Danvers',
    email: 'carol.d@momentum.io',
    phone: '555-0103',
    status: 'Lead',
    projectsCount: 0,
    lastInteraction: '2024-07-22T09:15:00Z',
  },
  {
    id: 'cli_004',
    clientName: 'Legacy Systems Co.',
    contactPerson: 'David Copperfield',
    email: 'david.c@legacysys.com',
    phone: '555-0104',
    status: 'Inactive',
    projectsCount: 5,
    lastInteraction: '2023-12-10T11:00:00Z',
  },
  {
    id: 'cli_005',
    clientName: 'FutureProof Tech',
    contactPerson: 'Eveolution Now',
    email: 'eve.n@futureproof.tech',
    phone: '555-0105',
    status: 'Active',
    projectsCount: 1,
    lastInteraction: '2024-07-18T16:45:00Z',
  }
];

export const dummyCommunicationLogs: CommunicationLogEntry[] = [
  {
    id: 'comm_001',
    clientId: 'cli_001',
    clientName: 'Innovatech Solutions Ltd.',
    date: '2024-07-28T10:00:00Z',
    type: 'Email',
    summary: 'Sent project update and Q3 roadmap.',
    notes: 'Alice acknowledged receipt, no immediate questions.',
    recordedBy: 'Consultant',
  },
  {
    id: 'comm_002',
    clientId: 'cli_002',
    clientName: 'Synergy Corp Inc.',
    date: '2024-07-27T14:30:00Z',
    type: 'Call',
    summary: 'Follow-up call regarding proposal.',
    notes: 'Bob requested a revised quote with Tier 2 services. Scheduled follow-up for next week.',
    recordedBy: 'Consultant',
  },
  {
    id: 'comm_003',
    clientId: 'cli_001',
    clientName: 'Innovatech Solutions Ltd.',
    date: '2024-07-25T09:00:00Z',
    type: 'Meeting',
    summary: 'Q2 Review Meeting & Q3 Planning.',
    notes: 'Discussed performance metrics and upcoming project phases. Action items assigned.',
    recordedBy: 'Consultant',
  },
  {
    id: 'comm_004',
    clientId: 'cli_005',
    clientName: 'FutureProof Tech',
    date: '2024-07-26T11:00:00Z',
    type: 'Email',
    summary: 'Shared initial design mockups for App v2.',
    notes: 'Eve provided feedback, mostly positive. Minor revisions requested.',
    recordedBy: 'Consultant',
  },
  {
    id: 'comm_005',
    clientId: 'cli_003',
    clientName: 'Momentum Ventures',
    date: '2024-07-29T16:00:00Z',
    type: 'Note',
    summary: 'Internal note: Research new market trends for Momentum.',
    notes: 'Based on last call, Carol is interested in expanding to new sectors.',
    recordedBy: 'Consultant',
  }
];

export const dummyDeals: Deal[] = [
  {
    id: 'deal_001',
    dealName: 'Innovatech Q4 Expansion Project',
    clientId: 'cli_001',
    clientName: 'Innovatech Solutions Ltd.',
    value: 75000,
    stage: 'Proposal',
    expectedCloseDate: '2024-09-30T00:00:00Z',
    assignedTo: 'Consultant',
    notes: 'Proposal sent. Follow up scheduled for next week.'
  },
  {
    id: 'deal_002',
    dealName: 'Synergy Corp Website Revamp',
    clientId: 'cli_002',
    clientName: 'Synergy Corp Inc.',
    value: 45000,
    stage: 'Negotiation',
    expectedCloseDate: '2024-08-15T00:00:00Z',
    assignedTo: 'Consultant',
    notes: 'Client reviewing final terms. Positive feedback so far.'
  },
  {
    id: 'deal_003',
    dealName: 'Momentum Market Analysis',
    clientId: 'cli_003',
    clientName: 'Momentum Ventures',
    value: 20000,
    stage: 'Lead',
    expectedCloseDate: '2024-10-15T00:00:00Z',
    assignedTo: 'Consultant',
    notes: 'Initial contact made. Client expressed interest in market research services.'
  },
  {
    id: 'deal_004',
    dealName: 'FutureProof App Phase 2 Development',
    clientId: 'cli_005',
    clientName: 'FutureProof Tech',
    value: 120000,
    stage: 'Closed Won',
    expectedCloseDate: '2024-07-01T00:00:00Z', // A deal that was recently closed
    assignedTo: 'Consultant',
    notes: 'Contract signed. Project kickoff next Monday.'
  }
];

export const dummyProjects: Project[] = [
  {
    id: 'proj_001',
    projectName: 'Website Redesign for Innovatech',
    clientId: 'cli_001',
    clientName: 'Innovatech Solutions Ltd.',
    status: 'Active',
    startDate: '2024-07-01T00:00:00Z',
    dueDate: '2024-09-30T00:00:00Z',
    description: 'Complete overhaul of the main corporate website, focusing on UX and mobile responsiveness.',
    teamMembers: ['Consultant', 'Designer A', 'Developer B'],
  },
  {
    id: 'proj_002',
    projectName: 'CAPA App MVP Development',
    status: 'Planning',
    startDate: '2024-08-15T00:00:00Z',
    dueDate: '2024-12-15T00:00:00Z',
    description: 'Develop the Minimum Viable Product for the new Corrective and Preventive Action application.',
    teamMembers: ['Consultant', 'Developer C'],
  },
  {
    id: 'proj_003',
    projectName: 'Marketing Campaign for Synergy Corp',
    clientId: 'cli_002',
    clientName: 'Synergy Corp Inc.',
    status: 'On Hold',
    startDate: '2024-06-01T00:00:00Z',
    dueDate: '2024-08-30T00:00:00Z',
    description: 'Launch a new digital marketing campaign to increase lead generation.',
    teamMembers: ['Consultant', 'Marketing Specialist D'],
  },
  {
    id: 'proj_004',
    projectName: 'FutureProof App Phase 2',
    clientId: 'cli_005',
    clientName: 'FutureProof Tech',
    status: 'Completed',
    startDate: '2024-04-01T00:00:00Z',
    dueDate: '2024-07-15T00:00:00Z',
    description: 'Phase 2 development including advanced reporting and user roles.',
    teamMembers: ['Consultant', 'Developer E', 'QA F'],
  },
  {
    id: 'proj_005',
    projectName: 'Internal Knowledge Base Migration',
    status: 'Active',
    startDate: '2024-07-20T00:00:00Z',
    dueDate: '2024-08-20T00:00:00Z',
    description: 'Migrate existing documentation to the new Notion/Obsidian knowledge base.',
    teamMembers: ['Consultant'],
  }
];

export const dummyTasks: Task[] = [
  {
    id: 'task_001',
    projectId: 'proj_001',
    projectName: 'Website Redesign for Innovatech',
    title: 'Draft Homepage Wireframes',
    status: 'Done',
    priority: 'High',
    assignedTo: 'Designer A',
    dueDate: '2024-07-15T00:00:00Z',
    description: 'Create detailed wireframes for the new homepage layout.',
    potentialRevenue: 500,
    estimatedCost: 200,
    actualCost: 180,
  },
  {
    id: 'task_002',
    projectId: 'proj_001',
    projectName: 'Website Redesign for Innovatech',
    title: 'Develop Navigation Component',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'Developer B',
    dueDate: '2024-07-30T00:00:00Z',
    potentialRevenue: 800,
    estimatedCost: 400,
    actualCost: 350,
  },
  {
    id: 'task_003',
    projectId: 'proj_002',
    projectName: 'CAPA App MVP Development',
    title: 'Define Core Data Models',
    status: 'To Do',
    priority: 'Urgent',
    assignedTo: 'Consultant',
    dueDate: '2024-08-25T00:00:00Z',
    description: 'Finalize Firestore data structures for CAPA records and users.',
    potentialRevenue: 1200,
    estimatedCost: 300,
  },
  {
    id: 'task_004',
    title: 'Review Q3 Budget',
    status: 'To Do',
    priority: 'Medium',
    assignedTo: 'Consultant',
    dueDate: '2024-08-05T00:00:00Z',
    description: 'Review and approve the budget for Q3 operational expenses.',
    estimatedCost: 50, // Internal cost
  },
  {
    id: 'task_005',
    projectId: 'proj_005',
    projectName: 'Internal Knowledge Base Migration',
    title: 'Migrate Project Management Docs',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Consultant',
    dueDate: '2024-08-10T00:00:00Z',
    estimatedCost: 100,
  },
  {
    id: 'task_006',
    projectId: 'proj_001',
    projectName: 'Website Redesign for Innovatech',
    title: 'Client Feedback Session for Mockups',
    status: 'Review',
    priority: 'High',
    assignedTo: 'Consultant',
    dueDate: '2024-08-01T00:00:00Z',
    potentialRevenue: 0, // Non-billable, but critical
    estimatedCost: 150, 
    actualCost: 120,
  },
   {
    id: 'task_007',
    projectId: 'proj_002',
    projectName: 'CAPA App MVP Development',
    title: 'Setup Firebase Authentication',
    status: 'To Do',
    priority: 'High',
    assignedTo: 'Developer C',
    dueDate: '2024-09-05T00:00:00Z',
    potentialRevenue: 600,
    estimatedCost: 250,
  },
  {
    id: 'task_008',
    title: 'Follow up with Lead - Momentum Ventures',
    status: 'To Do',
    priority: 'High',
    assignedTo: 'Consultant',
    dueDate: '2024-08-02T00:00:00Z',
    description: 'Schedule a follow-up call with Carol Danvers regarding market analysis proposal.',
    linkedBlueprintActivityId: 'activity-1-1', // Example Link to an old blueprint activity
    crmInfoSnippet: { 
        blueprintActivityTitle: 'Client Relationship Management (CRM) - Core Module', // Updated title
        customerName: 'Momentum Ventures', // Specific customer
        dealStage: 'Lead',
        estimatedValue: 20000,
    }
  }
];

export const dummyExpenses: Expense[] = [
  {
    id: 'exp_001',
    date: '2024-07-01T00:00:00Z',
    category: 'Software & Subscriptions',
    description: 'Monthly Figma Subscription',
    amount: 15,
  },
  {
    id: 'exp_002',
    date: '2024-07-05T00:00:00Z',
    category: 'Marketing & Advertising',
    description: 'LinkedIn Ads Campaign',
    amount: 150,
    projectId: 'proj_003', // Linked to Marketing Campaign for Synergy Corp
    projectName: 'Marketing Campaign for Synergy Corp',
  },
  {
    id: 'exp_003',
    date: '2024-07-10T00:00:00Z',
    category: 'Travel & Accommodation',
    description: 'Client Meeting Travel (Innovatech)',
    amount: 75.50,
    projectId: 'proj_001',
    projectName: 'Website Redesign for Innovatech',
  },
  {
    id: 'exp_004',
    date: '2024-07-15T00:00:00Z',
    category: 'Office Supplies & Equipment',
    description: 'New Monitor',
    amount: 299.99,
  },
  {
    id: 'exp_005',
    date: '2024-07-20T00:00:00Z',
    category: 'Contractors & Freelancers',
    description: 'Freelance Developer for CAPA App',
    amount: 500,
    projectId: 'proj_002',
    projectName: 'CAPA App MVP Development',
  }
];

export const invoiceStatuses: InvoiceStatus[] = validInvoiceStatuses; // from types.ts
export const revenueSources: RevenueSource[] = validRevenueSources; // from types.ts

const innovatchLineItems: InvoiceLineItem[] = [
  { id: 'li_001', description: 'Phase 1: Design Mockups', quantity: 1, unitPrice: 1500, total: 1500 },
  { id: 'li_002', description: 'Phase 2: Frontend Development (50 hours)', quantity: 50, unitPrice: 75, total: 3750 },
];

const futureProofLineItems: InvoiceLineItem[] = [
  { id: 'li_003', description: 'Monthly Retainer - Consulting Services', quantity: 1, unitPrice: 1500, total: 1500 },
];

const capaAppLineItems: InvoiceLineItem[] = [
    { id: 'li_004', description: 'CAPA App - Milestone 1 Completion', quantity: 1, unitPrice: 3000, total: 3000},
];

export const dummyInvoices: Invoice[] = [
  {
    id: 'inv_001',
    invoiceNumber: 'INV-2024-001',
    clientId: 'cli_001',
    clientName: 'Innovatech Solutions Ltd.',
    projectId: 'proj_001',
    projectName: 'Website Redesign for Innovatech',
    issueDate: '2024-07-01T00:00:00Z',
    dueDate: '2024-07-31T00:00:00Z',
    lineItems: innovatchLineItems,
    subtotal: innovatchLineItems.reduce((sum, item) => sum + item.total, 0),
    taxRate: 0.0, // Example: 0% tax
    taxAmount: 0,
    totalAmount: innovatchLineItems.reduce((sum, item) => sum + item.total, 0), // Assuming no tax for simplicity here
    status: 'Paid',
    notes: 'Payment received via bank transfer.',
    paymentDate: '2024-07-05T00:00:00Z',
  },
  {
    id: 'inv_002',
    invoiceNumber: 'INV-2024-002',
    clientId: 'cli_005',
    clientName: 'FutureProof Tech',
    issueDate: '2024-07-10T00:00:00Z',
    dueDate: '2024-08-10T00:00:00Z',
    lineItems: futureProofLineItems,
    subtotal: futureProofLineItems.reduce((sum, item) => sum + item.total, 0),
    totalAmount: futureProofLineItems.reduce((sum, item) => sum + item.total, 0),
    status: 'Sent',
  },
  {
    id: 'inv_003',
    invoiceNumber: 'INV-2024-003',
    clientId: 'cli_001', // Another invoice for Innovatech
    clientName: 'Innovatech Solutions Ltd.',
    projectId: 'proj_001',
    projectName: 'Website Redesign for Innovatech',
    issueDate: '2024-08-01T00:00:00Z',
    dueDate: '2024-08-31T00:00:00Z',
    lineItems: [{ id: 'li_005', description: 'Final Project Delivery & Handover', quantity: 1, unitPrice: 2500, total: 2500 }],
    subtotal: 2500,
    totalAmount: 2500,
    status: 'Draft',
    notes: 'To be sent upon final approval.'
  },
   {
    id: 'inv_004',
    invoiceNumber: 'INV-2024-004',
    clientId: 'cli_002',
    clientName: 'Synergy Corp Inc.',
    projectId: 'proj_003',
    projectName: 'Marketing Campaign for Synergy Corp',
    issueDate: '2024-07-20T00:00:00Z',
    dueDate: '2024-07-19T00:00:00Z', // Example of an overdue invoice
    lineItems: [{ id: 'li_006', description: 'Initial Campaign Setup Fee', quantity: 1, unitPrice: 1200, total: 1200 }],
    subtotal: 1200,
    totalAmount: 1200,
    status: 'Overdue',
  }
];


export const dummyRevenueItems: RevenueItem[] = [
  {
    id: 'rev_001',
    date: '2024-07-05T00:00:00Z',
    source: 'Invoice Payment', // Updated source
    description: 'Payment for Invoice INV-2024-001', // Updated description
    amount: 5250, // from inv_001 totalAmount
    projectId: 'proj_001',
    projectName: 'Website Redesign for Innovatech',
    clientId: 'cli_001',
    clientName: 'Innovatech Solutions Ltd.',
    invoiceId: 'inv_001', // Linked to dummyInvoices
  },
  {
    id: 'rev_002',
    date: '2024-07-15T00:00:00Z',
    source: 'Consulting Retainer',
    description: 'Monthly Retainer - FutureProof Tech',
    amount: 1500,
    clientId: 'cli_005',
    clientName: 'FutureProof Tech',
    // invoiceId: 'inv_002', // This would be linked once inv_002 is paid
  },
  {
    id: 'rev_003',
    date: '2024-07-20T00:00:00Z',
    source: 'Project Payment', 
    description: 'Milestone 1 - CAPA App Development (Old Project)', // Example for project not directly from invoice
    amount: 3000,
    projectId: 'proj_002',
    projectName: 'CAPA App MVP Development',
  },
  {
    id: 'rev_004',
    date: '2024-07-25T00:00:00Z',
    source: 'Product Sale',
    description: 'Sale of "Consulting Toolkit" digital product',
    amount: 99,
  }
];
