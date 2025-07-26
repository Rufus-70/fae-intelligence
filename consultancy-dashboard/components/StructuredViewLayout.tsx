
import React from 'react';
import {
  ViewConfig, ViewName, Project, Task, NewProjectData, NewTaskData, Client, ProjectFilterStatus,
  CrmBlueprintActivity, Expense, NewExpenseData, RevenueItem, NewRevenueData, Invoice, NewInvoiceData, InvoiceStatus,
  FinanceSummaryViewProps, FinanceExpensesViewProps, FinanceRevenueViewProps, FinanceInvoicesViewProps,
  ProjectDashboardViewProps, ProjectListViewProps, ProjectDetailViewProps, ProjectTaskBoardViewProps,
  MyTasksViewProps, Deal, NewDealData, CrmOverviewViewProps, FinanceSubViewTarget, ParsedProjectPlan, Activity,
  CrmLeadsViewProps, CrmProspectsViewProps // Added CrmLeadsViewProps and CrmProspectsViewProps
} from '../types';

// Client View Imports
import { ClientListView } from './views/clients/ClientListView';
import { ClientProfileView } from './views/clients/ClientProfileView';
import { CommunicationLogView } from './views/clients/CommunicationLogView';

// CRM View Imports
import { CrmOverviewView } from './views/crm/CrmOverviewView';
import { CrmLeadsView } from './views/crm/CrmLeadsView';
import { CrmProspectsView } from './views/crm/CrmProspectsView'; // Added
import { CrmDealsView } from './views/crm/CrmDealsView';
import { CrmContactsView } from './views/crm/CrmContactsView';

// Project View Imports
import { ProjectDashboardView } from './views/projects/ProjectDashboardView';
import { ProjectListView } from './views/projects/ProjectListView';
import { ProjectDetailView } from './views/projects/ProjectDetailView';
import { ProjectTaskBoardView } from './views/projects/ProjectTaskBoardView'; // Still imported for "Tasks" view

// Task View Imports
import { MyTasksView } from './views/tasks/MyTasksView';
import { TeamTasksView } from './views/tasks/TeamTasksView';
import { TaskCalendarView } from './views/tasks/TaskCalendarView';

// Finance View Imports
import { FinanceSummaryView } from './views/finance/FinanceSummaryView';
import { FinanceInvoicesView } from './views/finance/FinanceInvoicesView';
import { FinanceExpensesView } from './views/finance/FinanceExpensesView';
import { FinanceRevenueView } from './views/finance/FinanceRevenueView';

interface StructuredViewLayoutProps {
  viewName: ViewName;
  config: ViewConfig;
  activeSubViewId: string | null;
  onSetSubViewId: (subViewId: string) => void;

  // Props for client profile navigation
  selectedClientIdForProfile?: string | null;
  onViewClientProfileFromList?: (clientId: string) => void;
  onClientSelectedInProfileView?: (clientId: string | null) => void;
  onBackToClientList?: () => void;
  onNavigateToCommLogForClient?: (clientId: string) => void;

  // Props for Projects
  projects: Project[]; 
  onSaveProject: (projectData: NewProjectData, idToUpdate?: string) => void; 
  onDeleteProject: (projectId: string) => void; 
  projectListFilter: ProjectFilterStatus; 
  onApplyProjectFilter?: (filter: ProjectFilterStatus) => void;
  onClearProjectFilter?: () => void;
  onViewProjectDetails?: (projectId: string) => void;
  selectedProjectIdForDetail?: string | null; 
  onBackToProjectList?: () => void;
  onOpenImportModal?: () => void; // Added for AI Project Import

  // Props for Tasks
  tasks: Task[]; 
  onSaveTask: (taskData: NewTaskData, idToUpdate?: string) => void; 
  onDeleteTask: (taskId: string) => void; 
  onUpdateTaskStatus: (taskId: string, status: Task['status']) => void; 

  // Props for Finance
  expenses: Expense[]; 
  onSaveExpense: (expenseData: NewExpenseData, idToUpdate?: string) => void; 
  onDeleteExpense: (expenseId: string) => void; 
  revenueItems: RevenueItem[]; 
  onSaveRevenue: (revenueData: NewRevenueData, idToUpdate?: string) => void; 
  onDeleteRevenue: (revenueId: string) => void; 
  invoices: Invoice[];
  onSaveInvoice: (invoiceData: NewInvoiceData, idToUpdate?: string) => void;
  onDeleteInvoice: (invoiceId: string) => void;
  onUpdateInvoiceStatus: (invoiceId: string, status: InvoiceStatus, paymentDate?: string) => void;
  onGenerateRevenueFromInvoice: (invoice: Invoice) => void;
  invoiceListFilter: InvoiceStatus | 'All'; 
  onClearInvoiceFilter?: () => void; 
  onNavigateToFinanceFilteredView?: (targetView: FinanceSubViewTarget, filter?: InvoiceStatus | string) => void; 


  // General & CRM
  clients: Client[]; 
  deals: Deal[];
  onSaveDeal: (dealData: NewDealData, idToUpdate?: string) => void;
  onDeleteDeal: (dealId: string) => void;
  crmBlueprintActivities: CrmBlueprintActivity[]; 
  blueprintActivities: Activity[]; // Added
}

export const StructuredViewLayout: React.FC<StructuredViewLayoutProps> = (props) => {
  const {
    viewName, config, activeSubViewId, onSetSubViewId,
    selectedClientIdForProfile, onViewClientProfileFromList, onClientSelectedInProfileView, onBackToClientList, onNavigateToCommLogForClient,
    projects, onSaveProject, onDeleteProject, projectListFilter, onApplyProjectFilter, onClearProjectFilter, onViewProjectDetails, selectedProjectIdForDetail, onBackToProjectList: onBackToProjListHandler, onOpenImportModal,
    tasks, onSaveTask, onDeleteTask, onUpdateTaskStatus,
    expenses, onSaveExpense, onDeleteExpense, revenueItems, onSaveRevenue, onDeleteRevenue,
    invoices, onSaveInvoice, onDeleteInvoice, onUpdateInvoiceStatus, onGenerateRevenueFromInvoice,
    invoiceListFilter, onClearInvoiceFilter, onNavigateToFinanceFilteredView,
    clients, deals, onSaveDeal, onDeleteDeal, crmBlueprintActivities, blueprintActivities
  } = props;

  const renderActiveSubView = () => {
    if (!activeSubViewId) {
      return <p className="text-center py-10 text-slate-500">No sub-view selected or available.</p>; // Updated text color
    }

    switch (viewName) {
      case 'clients':
        switch (activeSubViewId) {
          case 'list':
            return <ClientListView 
                      onViewProfile={onViewClientProfileFromList!} 
                      onNavigateToCommLog={onNavigateToCommLogForClient!} // Pass down
                    />;
          case 'profiles':
            return <ClientProfileView 
                      selectedClientId={selectedClientIdForProfile || null} 
                      onClientSelected={onClientSelectedInProfileView!} 
                      onReturnToList={onBackToClientList}
                      onNavigateToCommLog={onNavigateToCommLogForClient}
                    />;
          case 'communication':
            return <CommunicationLogView initialFilterClientId={selectedClientIdForProfile}/>;
          default:
            return <p className="text-slate-500">Client sub-view not found: {activeSubViewId}</p>; // Updated text color
        }
      case 'crm':
        switch (activeSubViewId) {
          case 'overview':
            return <CrmOverviewView 
                      clients={clients} 
                      deals={deals} 
                      onNavigate={onSetSubViewId}
                      tasks={tasks}
                      crmBlueprintActivities={crmBlueprintActivities} 
                    />;
          case 'leads':
            return <CrmLeadsView 
                      clients={clients} 
                      onViewProfile={onViewClientProfileFromList!} 
                      onNavigateToCommLogForClient={onNavigateToCommLogForClient!} // Pass down
                    />;
          case 'prospects':
            return <CrmProspectsView 
                      clients={clients} 
                      onViewProfile={onViewClientProfileFromList!} 
                      onNavigateToCommLogForClient={onNavigateToCommLogForClient!} // Pass down
                    />;
          case 'deals':
            return <CrmDealsView />;
          case 'contacts':
            return <CrmContactsView />;
          default:
            return <p className="text-slate-500">CRM sub-view not found: {activeSubViewId}</p>; // Updated text color
        }
      case 'projects':
        switch (activeSubViewId) {
          case 'dashboard':
            return <ProjectDashboardView projects={projects} tasks={tasks} onApplyFilter={onApplyProjectFilter!} />;
          case 'all':
            return <ProjectListView 
                      projects={projects} 
                      clients={clients} 
                      onSaveProject={onSaveProject} 
                      onDeleteProject={onDeleteProject} 
                      activeFilter={projectListFilter}
                      onClearProjectFilter={onClearProjectFilter!}
                      onViewProjectDetails={onViewProjectDetails!}
                      onOpenImportModal={onOpenImportModal!} // Pass prop
                    />;
          case 'detail': 
            if (!selectedProjectIdForDetail) return <p className="text-slate-500">No project selected for details.</p>; // Updated text color
            return <ProjectDetailView 
                      projects={projects}
                      tasks={tasks}
                      clients={clients}
                      invoices={invoices}
                      expenses={expenses}
                      selectedProjectId={selectedProjectIdForDetail}
                      onSaveProject={onSaveProject}
                      onDeleteProject={onDeleteProject}
                      onSaveTask={onSaveTask}
                      onDeleteTask={onDeleteTask}
                      onUpdateTaskStatus={onUpdateTaskStatus}
                      onBackToProjectList={onBackToProjListHandler!}
                      crmBlueprintActivities={crmBlueprintActivities}
                    />;
          // case 'board': // Removed task board from projects view
          //   return <ProjectTaskBoardView 
          //               tasks={tasks} 
          //               projects={projects}
          //               externallySelectedProjectId={selectedProjectIdForDetail} 
          //           />;
          default:
            return <p className="text-slate-500">Project sub-view not found: {activeSubViewId}</p>; // Updated text color
        }
      case 'tasks':
         switch (activeSubViewId) {
          case 'my_tasks':
            return <MyTasksView 
                      tasks={tasks} 
                      projects={projects} 
                      onSaveTask={onSaveTask} 
                      onDeleteTask={onDeleteTask} 
                      onUpdateTaskStatus={onUpdateTaskStatus}
                      crmBlueprintActivities={crmBlueprintActivities}
                    />;
          case 'team_tasks':
            return <TeamTasksView tasks={tasks} projects={projects} />;
          case 'calendar':
            return <TaskCalendarView 
                        tasks={tasks} 
                        blueprintActivities={blueprintActivities} 
                        projects={projects} 
                    />;
          case 'board': // Task board can still be used under the main "Tasks" view
            return <ProjectTaskBoardView 
                        tasks={tasks} 
                        projects={projects}
                        // externallySelectedProjectId might not be relevant here, or managed differently
                    />;
          default:
            return <p className="text-slate-500">Task sub-view not found: {activeSubViewId}</p>; // Updated text color
        }
      case 'finance':
        switch (activeSubViewId) {
          case 'summary':
            return <FinanceSummaryView 
                      projects={projects} 
                      tasks={tasks} 
                      expenses={expenses} 
                      revenueItems={revenueItems} 
                      invoices={invoices} 
                      onNavigateToFilteredView={onNavigateToFinanceFilteredView!} 
                    />;
          case 'expenses':
             return <FinanceExpensesView 
                        expenses={expenses} 
                        projects={projects} 
                        onSaveExpense={onSaveExpense} 
                        onDeleteExpense={onDeleteExpense} 
                    />;
          case 'revenue':
             return <FinanceRevenueView 
                        revenueItems={revenueItems} 
                        projects={projects} 
                        clients={clients} 
                        invoices={invoices} 
                        onSaveRevenue={onSaveRevenue} 
                        onDeleteRevenue={onDeleteRevenue} 
                    />;
          case 'invoices':
            return <FinanceInvoicesView 
                        invoices={invoices}
                        clients={clients}
                        projects={projects}
                        onSaveInvoice={onSaveInvoice}
                        onDeleteInvoice={onDeleteInvoice}
                        onUpdateInvoiceStatus={onUpdateInvoiceStatus}
                        onGenerateRevenueFromInvoice={onGenerateRevenueFromInvoice}
                        activeFilter={invoiceListFilter} 
                        onClearFilter={onClearInvoiceFilter!} 
                    />;
          default:
            return <p className="text-slate-500">Finance sub-view not found: {activeSubViewId}</p>; // Updated text color
        }
      default:
        return <p className="text-center py-10 text-slate-500">Unknown view: {viewName}.</p>; // Updated text color
    }
  };

  return (
    <div className="space-y-6">
      {config.subViews && config.subViews.length > 0 && (
        <nav 
            className="mb-6 pb-3 border-b border-slate-300 flex flex-wrap gap-2 items-center" /* Light border for content area */
            aria-label={`${config.label} sub-navigation`}
        >
          {config.subViews.map((subView) => (
             (viewName === 'projects' && subView.id === 'detail' && !selectedProjectIdForDetail) ? null : (
              <button
                key={subView.id}
                onClick={() => onSetSubViewId(subView.id)}
                aria-current={activeSubViewId === subView.id ? 'page' : undefined}
                disabled={viewName === 'projects' && subView.id === 'detail' && !selectedProjectIdForDetail} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1B365D] focus:ring-offset-2 focus:ring-offset-[#F7FAFC]
                  ${activeSubViewId === subView.id
                    ? 'bg-[#1B365D] text-white shadow-md hover:bg-blue-800' /* Fae Blue for active */
                    : 'bg-slate-200 text-[#4A5568] hover:bg-slate-300 hover:text-[#1B365D]' /* Light Gray for inactive */
                  }
                  ${viewName === 'projects' && subView.id === 'detail' && !selectedProjectIdForDetail ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
              >
                {typeof subView.icon === 'string' && <span className="mr-2" role="img" aria-hidden="true">{subView.icon}</span>}
                {React.isValidElement(subView.icon) && <span className="mr-2 h-4 w-4 inline-block align-middle" aria-hidden="true">{subView.icon}</span>}
                {subView.label}
              </button>
            )
          ))}
        </nav>
      )}
      <div role="tabpanel" aria-labelledby={activeSubViewId ? `${viewName}-${activeSubViewId}-tab` : undefined}>
        {renderActiveSubView()}
      </div>
    </div>
  );
};