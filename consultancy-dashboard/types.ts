export type ActivityStatus = 'To Do' | 'In Progress' | 'Done' | 'Blocked' | 'On Hold';
export type ActivityPriority = 'High' | 'Medium' | 'Low';

export type CrmDealStage = 'Lead' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export interface CrmDetails {
  isCrmActivity?: boolean;
  leadSource?: string;
  customerName?: string;
  dealStage?: CrmDealStage;
  estimatedValue?: number;
  crmNotes?: string;
}

// New types for the Continuous Improvement Loop feature
export interface ImprovementActionItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ImprovementDetails {
  feedbackLog: string[]; // Each string is an item
  improvementIdeas: string[]; // Each string is an item
  actionItems: ImprovementActionItem[];
}

export interface Activity {
  id: string;
  title: string;
  prompt: string;
  outcome:string;
  status?: ActivityStatus;
  priority?: ActivityPriority;
  planningNotes?: string;
  assignedTo?: string;
  startDate?: string; // ISO date string e.g., "2024-08-01"
  dueDate?: string;   // ISO date string
  dependencies?: string; // Comma-separated list of activity IDs
  crmDetails?: CrmDetails;
  improvementDetails?: ImprovementDetails; // Added for continuous improvement
}

export interface Phase {
  id: string;
  title: string;
  duration?: string;
  objective: string;
  keyActivities: Activity[];
}

export interface MonitoringPoint {
  id: string;
  title: string;
  description: string;
}

export interface BlueprintData {
  title: string;
  phases: Phase[];
  monitoringTips: MonitoringPoint[];
}

// New and/or updated types for view and sub-view management
export type ViewName = 'blueprint' | 'clients' | 'projects' | 'tasks' | 'crm' | 'finance'; 

export interface SubViewItem {
  id: string;
  label: string;
  icon?: string | JSX.Element; // Emoji (string) or SVG/JSX icon
}

export interface ViewConfig {
  label: string;
  icon?: string | JSX.Element; // Icon for the main view itself
  defaultSubViewId?: string;
  subViews?: SubViewItem[];
}

// Client types
export type ClientStatus = 'Active' | 'Prospect' | 'Lead' | 'Inactive';

export interface Client {
  id: string;
  clientName: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  status: ClientStatus;
  projectsCount?: number; // This might be dynamically calculated or stored
  lastInteraction?: string; // ISO date string e.g., "2024-07-15"
}

// Data type for adding a new client (omits id, projectsCount, lastInteraction)
export interface NewClientData {
  clientName: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  status: ClientStatus;
}

// Communication Log Types
export type CommunicationType = 'Email' | 'Call' | 'Meeting' | 'Note';

export interface CommunicationLogEntry {
  id: string;
  clientId: string;
  clientName: string; // For easy display
  date: string; // ISO date string
  type: CommunicationType;
  summary: string;
  notes?: string;
  recordedBy?: string;
}

export interface NewCommunicationLogData {
  clientId: string;
  date: string; 
  type: CommunicationType;
  summary: string;
  notes?: string;
  recordedBy?: string;
}

// CRM Lead Specific Types
export interface NewLeadData {
  leadName: string; 
  contactPerson?: string;
  email: string;
  phone?: string;
  leadSource?: string;
  status: 'Lead' | 'Prospect'; 
  initialNotes?: string;
}

// CRM Deal Specific Types
export interface Deal {
  id: string;
  dealName: string;
  clientId: string; 
  clientName: string; 
  value: number;
  stage: CrmDealStage;
  expectedCloseDate: string; // ISO date string
  assignedTo?: string;
  notes?: string;
}

export interface NewDealData {
  dealName: string;
  clientId: string;
  value: number;
  stage: CrmDealStage;
  expectedCloseDate: string;
  assignedTo?: string;
  notes?: string;
}

// Project Types
export type ProjectStatus = 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
export type ProjectFilterStatus = ProjectStatus | 'Overdue' | 'All';

export interface Project {
  id: string;
  projectName: string;
  description?: string;
  clientId?: string; // Optional: link to a client
  clientName?: string; // Denormalized for display
  status: ProjectStatus;
  startDate?: string; // ISO date string
  dueDate?: string;   // ISO date string
  teamMembers?: string[]; // Array of user names/IDs (simple for now)
}

export interface NewProjectData {
  projectName: string;
  description?: string;
  clientId?: string;
  status: ProjectStatus;
  startDate?: string;
  dueDate?: string;
  teamMembers?: string[];
}

// Task Types
export type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Done' | 'Blocked';
export type TaskPriority = 'Urgent' | 'High' | 'Medium' | 'Low';

export interface CrmInfoSnippet {
  blueprintActivityTitle?: string;
  customerName?: string;
  dealStage?: CrmDealStage;
  estimatedValue?: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId?: string; // Link to a project
  projectName?: string; // Denormalized for display
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string; // User name/ID
  startDate?: string;  // ISO date string
  dueDate?: string;    // ISO date string
  estimatedCost?: number;
  actualCost?: number;
  potentialRevenue?: number;
  linkedBlueprintActivityId?: string; // New field
  crmInfoSnippet?: CrmInfoSnippet;    // New field
}

export interface NewTaskData {
  title: string;
  description?: string;
  projectId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  startDate?: string; // ISO date string
  dueDate?: string;   // ISO date string
  estimatedCost?: number;
  actualCost?: number;
  potentialRevenue?: number;
  linkedBlueprintActivityId?: string; // New field
  crmInfoSnippet?: CrmInfoSnippet;    // New field (though typically set by system, not form directly)
}

// For passing CRM-flagged blueprint activities to forms
export interface CrmBlueprintActivity {
  id: string;
  title: string;
  crmDetails: CrmDetails; // Ensure CrmDetails are available
}


// Props for Project Views
export interface ProjectDashboardViewProps {
  projects: Project[];
  tasks: Task[];
  onApplyFilter: (filter: ProjectFilterStatus) => void;
}

export interface ProjectListViewProps {
  projects: Project[];
  clients: Client[];
  onSaveProject: (projectData: NewProjectData, idToUpdate?: string) => void;
  onDeleteProject: (projectId: string) => void;
  activeFilter: ProjectFilterStatus;
  onClearProjectFilter: () => void;
  onViewProjectDetails: (projectId: string) => void;
  onOpenImportModal: () => void; // Added for AI import
}

export interface ProjectDetailViewProps {
  projects: Project[]; 
  tasks: Task[]; 
  clients: Client[]; 
  invoices: Invoice[];
  expenses: Expense[];
  selectedProjectId: string;
  onSaveProject: (projectData: NewProjectData, idToUpdate?: string) => void;
  onDeleteProject: (projectId: string) => void;
  onSaveTask: (taskData: NewTaskData, idToUpdate?: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, status: Task['status']) => void;
  onBackToProjectList: () => void;
  crmBlueprintActivities: CrmBlueprintActivity[];
}

export interface ProjectTaskBoardViewProps {
  tasks: Task[];
  projects: Project[];
  externallySelectedProjectId?: string | null; // Added for direct project navigation
}

// Props for Task Views
export interface MyTasksViewProps {
  tasks: Task[];
  projects: Project[];
  onSaveTask: (taskData: NewTaskData, idToUpdate?: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  crmBlueprintActivities: CrmBlueprintActivity[]; // Added
}

export interface TeamTasksViewProps {
  tasks: Task[];
  projects: Project[];
}

export interface TaskCalendarViewProps {
  tasks: Task[];
  blueprintActivities: Activity[]; // Added
  projects: Project[]; // Added
}


// Props for CRM Views
export interface CrmOverviewViewProps {
  clients: Client[];
  deals: Deal[];
  onNavigate: (subViewId: string) => void;
  tasks: Task[]; // Added
  crmBlueprintActivities: CrmBlueprintActivity[]; // Added
}

export interface CrmLeadsViewProps {
  clients: Client[];
  onViewProfile: (clientId: string) => void;
  onNavigateToCommLogForClient: (clientId: string) => void; // Added
}

export interface CrmProspectsViewProps {
  clients: Client[];
  onViewProfile: (clientId: string) => void;
  onNavigateToCommLogForClient: (clientId: string) => void; // Added
}


// --- FINANCE TYPES ---
export type ExpenseCategory = 'Software & Subscriptions' | 'Marketing & Advertising' | 'Travel & Accommodation' | 'Office Supplies & Equipment' | 'Contractors & Freelancers' | 'Utilities' | 'Bank Fees' | 'Professional Development' | 'Other';
export const expenseCategories: ExpenseCategory[] = ['Software & Subscriptions', 'Marketing & Advertising', 'Travel & Accommodation', 'Office Supplies & Equipment', 'Contractors & Freelancers', 'Utilities', 'Bank Fees', 'Professional Development', 'Other'];

export interface Expense {
  id: string;
  date: string; // ISO date string
  category: ExpenseCategory;
  description: string;
  amount: number;
  projectId?: string; // Optional link to a project
  projectName?: string; // Denormalized for display
  receiptUrl?: string; // Optional
}

export interface NewExpenseData {
  expenseName: string;
  date: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  projectId?: string;
  receiptUrl?: string;
}

export type RevenueSource = 'Project Payment' | 'Consulting Retainer' | 'Product Sale' | 'Affiliate Income' | 'Invoice Payment' | 'Other';
export const revenueSources: RevenueSource[] = ['Project Payment', 'Consulting Retainer', 'Product Sale', 'Affiliate Income', 'Invoice Payment', 'Other'];

export interface RevenueItem {
  id: string;
  date: string; // ISO date string
  source: RevenueSource;
  description: string;
  amount: number;
  projectId?: string; // Optional link to a project
  projectName?: string; // Denormalized for display
  clientId?: string; // Optional link to a client
  clientName?: string; // Denormalized for display
  invoiceId?: string; // Optional
}

export interface NewRevenueData {
  date: string;
  source: RevenueSource;
  description: string;
  amount: number;
  projectId?: string;
  clientId?: string;
  invoiceId?: string;
}

// Invoice Types
export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
export const invoiceStatuses: InvoiceStatus[] = ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'];

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number; // quantity * unitPrice
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g., INV-2024-001
  clientId: string;
  clientName: string; // Denormalized
  projectId?: string;
  projectName?: string; // Denormalized
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  lineItems: InvoiceLineItem[];
  subtotal: number; // Sum of lineItem totals
  taxRate?: number; // e.g., 0.07 for 7%
  taxAmount?: number; // subtotal * taxRate
  totalAmount: number; // subtotal + taxAmount
  status: InvoiceStatus;
  notes?: string;
  paymentDate?: string; // ISO date string, set when status becomes 'Paid'
}

export interface NewInvoiceData {
  clientId: string;
  projectId?: string;
  issueDate: string;
  dueDate: string;
  lineItems: Array<Omit<InvoiceLineItem, 'id' | 'total'>>; // For form, ID and total are generated
  taxRate?: number;
  status: InvoiceStatus; // Default to 'Draft'
  notes?: string;
  // invoiceNumber, clientName, projectName, subtotal, taxAmount, totalAmount will be derived/generated
}


// Props for Finance Views
export type FinanceSubViewTarget = 'invoices' | 'expenses' | 'revenue';

export interface FinanceSummaryViewProps {
  projects: Project[];
  tasks: Task[];
  expenses: Expense[];
  revenueItems: RevenueItem[];
  invoices: Invoice[]; 
  onNavigateToFilteredView: (targetView: FinanceSubViewTarget, filter?: InvoiceStatus | string) => void;
}

export interface FinanceExpensesViewProps {
  expenses: Expense[];
  projects: Project[];
  onSaveExpense: (expenseData: NewExpenseData, idToUpdate?: string) => void;
  onDeleteExpense: (expenseId: string) => void;
}

export interface FinanceRevenueViewProps {
  revenueItems: RevenueItem[];
  projects: Project[];
  clients: Client[];
  invoices: Invoice[]; 
  onSaveRevenue: (revenueData: NewRevenueData, idToUpdate?: string) => void;
  onDeleteRevenue: (revenueId: string) => void;
}

export interface FinanceInvoicesViewProps {
  invoices: Invoice[];
  clients: Client[];
  projects: Project[];
  onSaveInvoice: (invoiceData: NewInvoiceData, idToUpdate?: string) => void;
  onDeleteInvoice: (invoiceId: string) => void;
  onUpdateInvoiceStatus: (invoiceId: string, status: InvoiceStatus, paymentDate?: string) => void;
  onGenerateRevenueFromInvoice: (invoice: Invoice) => void;
  activeFilter: InvoiceStatus | 'All';
  onClearFilter: () => void;
}


// Props for Add Forms (Client, Comm Log, Task, Expense, Revenue, Invoice)
// ... other Add form props
export interface AddClientFormProps {
  initialData?: Client;
  onSave: (formData: NewClientData, idToUpdate?: string) => void;
  onCancel: () => void;
}

export interface AddCommunicationLogFormProps {
  clients: Client[];
  initialData?: CommunicationLogEntry; // Added for editing
  onSave: (logData: NewCommunicationLogData, idToUpdate?: string) => void; // Modified for editing
  onCancel: () => void;
}

export interface AddTaskFormProps {
  projects: Project[];
  crmBlueprintActivities: CrmBlueprintActivity[];
  initialData?: Task;
  onSave: (formData: NewTaskData, idToUpdate?: string) => void;
  onCancel: () => void;
}

export interface AddExpenseFormProps {
  projects: Project[];
  initialData?: Expense;
  onSave: (formData: NewExpenseData, idToUpdate?: string) => void;
  onCancel: () => void;
}

export interface AddRevenueFormProps {
  projects: Project[];
  clients: Client[];
  invoices: Invoice[]; // For linking existing invoices
  initialData?: RevenueItem;
  onSave: (formData: NewRevenueData, idToUpdate?: string) => void;
  onCancel: () => void;
}

export interface AddInvoiceFormProps {
  clients: Client[];
  projects: Project[];
  initialData?: Invoice;
  onSave: (formData: NewInvoiceData, idToUpdate?: string) => void;
  onCancel: () => void;
}

// Props for UI Components
export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  colorClass?: string;
  isLoading?: boolean;
  subtext?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

// For Gemini Project Plan Import
export interface ParsedTask {
  clientSideId: string;
  title: string;
  description: string;
  assignedTo: string | null;
  startDate: string | null;
  dueDate: string | null;
}

export interface ParsedPhase {
  clientSideId: string;
  title: string;
  objective: string;
  tasks: ParsedTask[];
}

export interface ParsedProjectPlan {
  projectName: string;
  projectDescription: string;
  projectManager: string | null;
  startDate: string | null;
  endDate: string | null;
  phases: ParsedPhase[];
}