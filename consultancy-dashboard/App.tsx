
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { BlueprintView } from './components/BlueprintView';
import { blueprintData as initialBlueprintData, dummyProjects, dummyTasks, dummyExpenses, dummyRevenueItems, dummyInvoices, dummyDeals } from './constants';
import { MonitoringSection } from './components/MonitoringSection';
import { Sidebar } from './components/Sidebar';
import { 
  BlueprintData, Activity, ViewName, ViewConfig, Project, Task, NewProjectData, NewTaskData, Client, ProjectFilterStatus, 
  CrmBlueprintActivity, Expense, NewExpenseData, RevenueItem, NewRevenueData, Invoice, NewInvoiceData, InvoiceStatus, 
  InvoiceLineItem, RevenueSource, Deal, NewDealData, FinanceSubViewTarget, ParsedProjectPlan, ParsedTask 
} from './types';
import { StructuredViewLayout } from './components/StructuredViewLayout';
import { ImportProjectModal } from './components/views/projects/ImportProjectModal'; // Added

// Define view configurations
const viewConfigurations: Record<ViewName, ViewConfig> = {
  blueprint: {
    label: "Strategic Blueprint",
    icon: '🗺️', 
  },
  clients: {
    label: "Clients Management",
    icon: '🧑‍💼',
    defaultSubViewId: 'list',
    subViews: [
      { id: 'list', label: 'Client List', icon: '👥' },
      { id: 'profiles', label: 'Client Profiles', icon: '👤'},
      { id: 'communication', label: 'Communication Log', icon: '💬' }
    ]
  },
  projects: {
    label: "Project Hub",
    icon: '🏗️',
    defaultSubViewId: 'dashboard',
    subViews: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'all', label: 'All Projects', icon: '📚' },
      { id: 'detail', label: 'Project Details', icon: '📄' }, 
      // { id: 'board', label: 'Task Board', icon: '📋' } // Removed Task Board
    ]
  },
  tasks: {
    label: "Task Management",
    icon: '✅',
    defaultSubViewId: 'my_tasks',
    subViews: [
      { id: 'my_tasks', label: 'My Tasks', icon: '🙋‍♂️'},
      { id: 'team_tasks', label: 'Team Tasks', icon: '👨‍👩‍👧‍👦' },
      { id: 'calendar', label: 'Calendar View', icon: '📅' },
      { id: 'board', label: 'Task Board', icon: '📋' } // Task Board can exist here
    ]
  },
  crm: {
    label: "CRM Dashboard",
    icon: '🤝',
    defaultSubViewId: 'overview',
    subViews: [
      { id: 'overview', label: 'Overview', icon: '🌍' },
      { id: 'leads', label: 'Leads', icon: '🎣' },
      { id: 'prospects', label: 'Prospects', icon: '🎯' }, // Added Prospects
      { id: 'deals', label: 'Deals', icon: '💰'},
      { id: 'contacts', label: 'Contacts', icon: '📒'}
    ]
  },
  finance: {
    label: "Financial Overview",
    icon: '💰',
    defaultSubViewId: 'summary',
    subViews: [
      { id: 'summary', label: 'Summary', icon: '🧾' },
      { id: 'invoices', label: 'Invoices', icon: '✉️' },
      { id: 'revenue', label: 'Revenue', icon: '📈' },
      { id: 'expenses', label: 'Expenses', icon: '💸' }
    ]
  },
  blog: {
    label: "Blog Editor",
    icon: '📝',
    defaultSubViewId: 'editor',
    subViews: [
      { id: 'editor', label: 'Visual Editor', icon: '🎨' },
      { id: 'posts', label: 'All Posts', icon: '📚' },
      { id: 'settings', label: 'Settings', icon: '⚙️' }
    ]
  }
};

// Notion Integration Function
const createNotionExpensePage = async (expense: Expense) => {
  try {
    // For now, we'll use a simple webhook approach or direct API call
    // This would integrate with Notion API to create a new expense page
    const notionData = {
      parent: { database_id: process.env.REACT_APP_NOTION_EXPENSES_DB_ID || 'your-expenses-db-id' },
      properties: {
        'Name': {
          title: [{ text: { content: `${expense.description} - $${expense.amount}` } }]
        },
        'Category': {
          select: { name: expense.category }
        },
        'Amount': {
          number: expense.amount
        },
        'Date': {
          date: { start: expense.date.split('T')[0] }
        },
        'Project': {
          rich_text: [{ text: { content: expense.projectName || 'No Project' } }]
        },
        'Description': {
          rich_text: [{ text: { content: expense.description } }]
        }
      }
    };

    // For development - log what would be sent to Notion
    console.log('Creating Notion expense page:', notionData);
    
    // Notion API integration enabled
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(notionData)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Notion expense page created:', result.url);
    } else {
      console.error('❌ Notion API error:', await response.text());
    }
  } catch (error) {
    console.error('Error creating Notion expense page:', error);
  }
};

const App: React.FC = () => {
  const [currentBlueprintData, setCurrentBlueprintData] = useState<BlueprintData>(initialBlueprintData);
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [clients, setClients] = useState<Client[]>([]); 
  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [revenueItems, setRevenueItems] = useState<RevenueItem[]>(dummyRevenueItems);
  const [invoices, setInvoices] = useState<Invoice[]>(dummyInvoices);
  const [deals, setDeals] = useState<Deal[]>(dummyDeals); 

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, projectsRes, tasksRes, expensesRes, revenueItemsRes, invoicesRes, dealsRes] = await Promise.all([
          fetch('http://localhost:3001/api/clients'),
          fetch('http://localhost:3001/api/projects'),
          fetch('http://localhost:3001/api/tasks'),
          fetch('http://localhost:3001/api/expenses'),
          fetch('http://localhost:3001/api/revenue-items'),
          fetch('http://localhost:3001/api/invoices'),
          fetch('http://localhost:3001/api/deals'),
        ]);

        const clientsData = await clientsRes.json();
        const projectsData = await projectsRes.json();
        const tasksData = await tasksRes.json();
        const expensesData = await expensesRes.json();
        const revenueItemsData = await revenueItemsRes.json();
        const invoicesData = await invoicesRes.json();
        const dealsData = await dealsRes.json();

        setClients(clientsData);
        setProjects(projectsData);
        setTasks(tasksData);
        setExpenses(expensesData);
        setRevenueItems(revenueItemsData);
        setInvoices(invoicesData);
        setDeals(dealsData);

      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchData();
  }, []);

  const [activeView, setActiveView] = useState<ViewName>('blueprint');
  const [activeSubViewId, setActiveSubViewId] = useState<string | null>(() => {
    const initialConfig = viewConfigurations['blueprint'];
    return initialConfig?.defaultSubViewId || null;
  });
  const [selectedClientIdForProfile, setSelectedClientIdForProfile] = useState<string | null>(null);
  
  const [projectListFilter, setProjectListFilter] = useState<ProjectFilterStatus>('All');
  const [selectedProjectIdForDetail, setSelectedProjectIdForDetail] = useState<string | null>(null);
  const [invoiceListFilter, setInvoiceListFilter] = useState<InvoiceStatus | 'All'>('All');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false); // For AI Project Import Modal


  const crmBlueprintActivities = useMemo((): CrmBlueprintActivity[] => {
    const activities: CrmBlueprintActivity[] = [];
    currentBlueprintData.phases.forEach(phase => {
      phase.keyActivities.forEach(activity => {
        if (activity.crmDetails?.isCrmActivity && activity.crmDetails) {
          activities.push({
            id: activity.id,
            title: activity.title,
            crmDetails: activity.crmDetails,
          });
        }
      });
    });
    return activities;
  }, [currentBlueprintData]);

  const allBlueprintActivities = useMemo((): Activity[] => {
    return currentBlueprintData.phases.flatMap(phase => phase.keyActivities);
  }, [currentBlueprintData]);


  useEffect(() => {
    const currentViewConfig = viewConfigurations[activeView];
    if (!currentViewConfig) return;

    // Case 1: Project selected, and user intends to see its details.
    // This state should be preserved.
    if (activeView === 'projects' && selectedProjectIdForDetail && activeSubViewId === 'detail') {
      return; // Do nothing, let the intended project-specific view render.
    }

    // Case 2: On a project-specific view (detail) but no project is selected.
    // This is an invalid state; revert to the project dashboard.
    if (activeView === 'projects' && 
        activeSubViewId === 'detail' && 
        selectedProjectIdForDetail === null) {
      setActiveSubViewId(currentViewConfig.defaultSubViewId || 'dashboard');
      return;
    }

    // Case 3: General subview validity check and default setting for the activeView.
    // This applies if Cases 1 and 2 are not met (e.g., changing main views, or on non-project-specific subviews).
    const isValidSubView = currentViewConfig.subViews?.find(sv => sv.id === activeSubViewId);
    if (currentViewConfig.defaultSubViewId && (activeSubViewId === null || !isValidSubView)) {
      setActiveSubViewId(currentViewConfig.defaultSubViewId);
    }
  }, [activeView, activeSubViewId, selectedProjectIdForDetail]);


  const handleUpdateActivity = useCallback((phaseId: string, activityId: string, updatedActivityData: Partial<Activity>) => {
    setCurrentBlueprintData(prevData => {
      const newPhases = prevData.phases.map(phase => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            keyActivities: phase.keyActivities.map(activity => {
              if (activity.id === activityId) {
                return { ...activity, ...updatedActivityData };
              }
              return activity;
            }),
          };
        }
        return phase;
      });
      return { ...prevData, phases: newPhases };
    });
  }, []);

  const handleSetActiveView = useCallback((view: ViewName) => {
    setActiveView(view);
    setSelectedClientIdForProfile(null); 
    setSelectedProjectIdForDetail(null); 
    const config = viewConfigurations[view];
    setActiveSubViewId(config?.defaultSubViewId || null);
    if (view !== 'projects') { 
      setProjectListFilter('All');
    }
    if (view !== 'finance' || (view === 'finance' && config?.defaultSubViewId !== 'invoices')) {
      setInvoiceListFilter('All');
    }
  }, []);

  const handleSetSubViewId = useCallback((subViewId: string | null) => {
    setActiveSubViewId(subViewId);
    if (activeView === 'projects' && subViewId !== 'detail') { // No 'board' check needed here anymore for projects
        setSelectedProjectIdForDetail(null); 
    }
     if (activeView === 'projects' && subViewId === 'all') { 
        setSelectedProjectIdForDetail(null);
    }
    if (activeView === 'finance' && subViewId !== 'invoices') {
        setInvoiceListFilter('All'); 
    }
  }, [activeView]);

  const handleViewClientProfileFromList = useCallback((clientId: string) => {
    setSelectedClientIdForProfile(clientId);
    setActiveSubViewId('profiles'); 
  }, []);

  const handleClientSelectionInProfileView = useCallback((clientId: string | null) => {
    setSelectedClientIdForProfile(clientId);
    if (activeSubViewId !== 'profiles') { 
        setActiveSubViewId('profiles');
    }
  }, [activeSubViewId]);
  
  const handleBackToClientList = useCallback(() => {
    setSelectedClientIdForProfile(null);
    setActiveSubViewId('list'); 
  }, []);

  const handleNavigateToCommLogForClient = useCallback((clientId: string) => {
    setSelectedClientIdForProfile(clientId); // Set client context
    if (activeView !== 'clients') setActiveView('clients'); // Switch to clients view if not already there
    setActiveSubViewId('communication'); // Switch to communication log
  }, [activeView]);

  const handleSaveProject = useCallback(async (projectData: NewProjectData, idToUpdate?: string): Promise<void> => {
    let projectId = idToUpdate;
    try {
      let response;
      if (idToUpdate) {
        response = await fetch(`http://localhost:3001/api/projects/${idToUpdate}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
      } else {
        response = await fetch('http://localhost:3001/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const savedProject = await response.json();
      setProjects(prev => {
        if (idToUpdate) {
          return prev.map(p => p.id === idToUpdate ? { ...p, ...savedProject } : p);
        } else {
          return [savedProject, ...prev];
        }
      });
      // Removed return statement to make it void
    } catch (error) {
      console.error("Error saving project:", error);
      throw error; // Re-throw to be handled by caller
    }
  }, []);

  const handleDeleteProject = useCallback(async (projectId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setProjects(prev => prev.filter(p => p.id !== projectId));
      // Also delete related tasks, invoices, expenses, revenue items from local state
      setTasks(prevTasks => prevTasks.filter(t => t.projectId !== projectId));
      setInvoices(prevInvoices => prevInvoices.map(inv => inv.projectId === projectId ? {...inv, projectId: undefined, projectName: undefined} : inv));
      setExpenses(prevExpenses => prevExpenses.map(exp => exp.projectId === projectId ? {...exp, projectId: undefined, projectName: undefined} : exp));
      setRevenueItems(prevRevenue => prevRevenue.map(rev => rev.projectId === projectId ? {...rev, projectId: undefined, projectName: undefined} : rev));

      if (selectedProjectIdForDetail === projectId) { 
        setSelectedProjectIdForDetail(null);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }, [selectedProjectIdForDetail]);

  const handleSaveTask = useCallback(async (taskData: NewTaskData, idToUpdate?: string) => {
    try {
      let response;
      if (idToUpdate) {
        response = await fetch(`http://localhost:3001/api/tasks/${idToUpdate}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
      } else {
        response = await fetch('http://localhost:3001/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const savedTask = await response.json();
      setTasks(prev => {
        if (idToUpdate) {
          return prev.map(t => t.id === idToUpdate ? { ...t, ...savedTask } : t);
        } else {
          return [savedTask, ...prev];
        }
      });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }, []);

  const handleDeleteTask = useCallback(async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }, []);

  const handleUpdateTaskStatus = useCallback(async (taskId: string, status: Task['status']) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }, []);

  const handleApplyProjectFilterAndNavigate = useCallback((filter: ProjectFilterStatus) => {
    setProjectListFilter(filter);
    setActiveView('projects');
    setActiveSubViewId('all');
    setSelectedProjectIdForDetail(null); 
  }, []);

  const handleClearProjectFilter = useCallback(() => {
    setProjectListFilter('All');
  }, []);

  const handleSelectProjectForNavigation = useCallback((projectId: string) => {
    setSelectedProjectIdForDetail(projectId);
    setActiveView('projects'); 
    setActiveSubViewId('detail'); // Navigate to project detail view
  }, []);

  const handleBackToProjectList = useCallback(() => { 
    setSelectedProjectIdForDetail(null);
    setActiveSubViewId('all'); 
  }, []);

  const handleSaveExpense = useCallback(async (expenseData: NewExpenseData, idToUpdate?: string) => {
    try {
      if (idToUpdate) {
        // Update existing expense
        setExpenses(prev => 
          prev.map(exp => exp.id === idToUpdate ? {
            ...exp,
            date: expenseData.date,
            category: expenseData.category,
            description: expenseData.description,
            amount: expenseData.amount,
            projectId: expenseData.projectId,
            projectName: expenseData.projectId ? projects.find(p => p.id === expenseData.projectId)?.projectName : undefined,
            receiptUrl: expenseData.receiptUrl
          } : exp)
        );
      } else {
        // Create new expense
        const newExpense: Expense = {
          id: `exp_${Date.now()}`,
          date: expenseData.date,
          category: expenseData.category,
          description: expenseData.description,
          amount: expenseData.amount,
          projectId: expenseData.projectId,
          projectName: expenseData.projectId ? projects.find(p => p.id === expenseData.projectId)?.projectName : undefined,
          receiptUrl: expenseData.receiptUrl
        };
        setExpenses(prev => [newExpense, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        
        // Notion Integration - Create expense page
        await createNotionExpensePage(newExpense);
      }
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  }, [projects]);

  const handleDeleteExpense = useCallback(async (expenseId: string) => {
    try {
      setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }, []);

  const handleSaveRevenueItem = useCallback(async (revenueData: NewRevenueData, idToUpdate?: string) => {
    try {
      let response;
      if (idToUpdate) {
        response = await fetch(`http://localhost:3001/api/revenue-items/${idToUpdate}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(revenueData),
        });
      } else {
        response = await fetch('http://localhost:3001/api/revenue-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(revenueData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const savedRevenueItem = await response.json();
      setRevenueItems(prev => {
        if (idToUpdate) {
          return prev.map(rev => rev.id === idToUpdate ? { ...rev, ...savedRevenueItem } : rev);
        } else {
          return [savedRevenueItem, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      });
    } catch (error) {
      console.error("Error saving revenue item:", error);
    }
  }, []);

  const handleDeleteRevenueItem = useCallback(async (revenueId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/revenue-items/${revenueId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRevenueItems(prev => prev.filter(rev => rev.id !== revenueId));
    } catch (error) {
      console.error("Error deleting revenue item:", error);
    }
  }, []);

  const handleSaveDeal = useCallback(async (dealData: NewDealData, idToUpdate?: string) => {
    try {
      let response;
      if (idToUpdate) {
        response = await fetch(`http://localhost:3001/api/deals/${idToUpdate}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dealData),
        });
      } else {
        response = await fetch('http://localhost:3001/api/deals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dealData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const savedDeal = await response.json();
      setDeals(prev => {
        if (idToUpdate) {
          return prev.map(deal => deal.id === idToUpdate ? { ...deal, ...savedDeal } : deal);
        } else {
          return [savedDeal, ...prev];
        }
      });
    } catch (error) {
      console.error("Error saving deal:", error);
    }
  }, []);

  const handleDeleteDeal = useCallback(async (dealId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/deals/${dealId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setDeals(prev => prev.filter(deal => deal.id !== dealId));
    } catch (error) {
      console.error("Error deleting deal:", error);
    }
  }, []);

  const generateInvoiceNumber = useCallback(async (): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3001/api/invoices/latest-number');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.latestInvoiceNumber;
    } catch (error) {
      console.error("Error fetching latest invoice number:", error);
      return `INV-${new Date().getFullYear()}-001`; // Fallback
    }
  }, []);

  const calculateInvoiceTotals = (lineItems: Array<Omit<InvoiceLineItem, 'id' | 'total'>>, taxRate?: number) => {
    const itemsWithTotals = lineItems.map((item, index) => ({ ...item, id: `li_${Date.now()}_${index}`, total: item.quantity * item.unitPrice }));
    const subtotal = itemsWithTotals.reduce((sum, item) => sum + item.total, 0);
    const currentTaxRate = taxRate === undefined || isNaN(taxRate) ? 0 : taxRate;
    const taxAmount = subtotal * currentTaxRate;
    const totalAmount = subtotal + taxAmount;
    return { itemsWithTotals, subtotal, taxAmount, totalAmount };
  };

  const handleSaveInvoice = useCallback(async (invoiceData: NewInvoiceData, idToUpdate?: string) => {
    try {
      const { itemsWithTotals, subtotal, taxAmount, totalAmount } = calculateInvoiceTotals(invoiceData.lineItems, invoiceData.taxRate);
      const invoicePayload = {
        ...invoiceData,
        lineItems: itemsWithTotals, // Send line items with generated IDs and totals
        subtotal,
        taxAmount,
        totalAmount,
        invoiceNumber: idToUpdate ? invoiceData.invoiceNumber : await generateInvoiceNumber(),
      };

      let response;
      if (idToUpdate) {
        response = await fetch(`http://localhost:3001/api/invoices/${idToUpdate}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoicePayload),
        });
      } else {
        response = await fetch('http://localhost:3001/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoicePayload),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const savedInvoice = await response.json();
      setInvoices(prev => {
        if (idToUpdate) {
          return prev.map(inv => inv.id === idToUpdate ? { ...inv, ...savedInvoice } : inv);
        } else {
          return [savedInvoice, ...prev].sort((a,b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
        }
      });
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  }, [generateInvoiceNumber]);

  const handleDeleteInvoice = useCallback(async (invoiceId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/invoices/${invoiceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
      setRevenueItems(prev => prev.map(rev => rev.invoiceId === invoiceId ? {...rev, invoiceId: undefined, description: rev.description.replace(/Payment for Invoice.*$/, "Previously linked invoice deleted")} : rev));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  }, []);
  
  const handleUpdateInvoiceStatus = useCallback(async (invoiceId: string, status: InvoiceStatus, paymentDateOverride?: string) => {
    try {
      const updatePayload: { status: InvoiceStatus; paymentDate?: string } = { status };
      if (status === 'Paid') {
        updatePayload.paymentDate = paymentDateOverride || new Date().toISOString();
      }

      const response = await fetch(`http://localhost:3001/api/invoices/${invoiceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedInvoice = await response.json();
      setInvoices(prevInvoices => prevInvoices.map(inv => {
        if (inv.id === invoiceId) {
          if (status === 'Paid') {
            const existingRevenue = revenueItems.find(r => r.invoiceId === invoiceId);
            if (!existingRevenue) {
              const revenueData: NewRevenueData = { date: updatedInvoice.paymentDate!, source: 'Invoice Payment' as RevenueSource, description: `Payment for Invoice ${updatedInvoice.invoiceNumber}`, amount: updatedInvoice.totalAmount, projectId: updatedInvoice.projectId, clientId: updatedInvoice.clientId, invoiceId: updatedInvoice.id };
              // Call backend to create revenue item
              fetch('http://localhost:3001/api/revenue-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(revenueData),
              }).then(res => res.json()).then(newRev => {
                setRevenueItems(prevRev => [...prevRev, newRev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
              }).catch(err => console.error("Error creating revenue item from invoice status update:", err));
            }
          }
          return { ...inv, ...updatedInvoice };
        }
        return inv;
      }));
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  }, [revenueItems]); 

  const handleGenerateRevenueFromInvoice = useCallback(async (invoice: Invoice) => {
    try {
      const existingRevenue = revenueItems.find(r => r.invoiceId === invoice.id);
      if (existingRevenue) { alert(`Revenue for invoice ${invoice.invoiceNumber} already exists.`); return; }
      const revenueData: NewRevenueData = { date: invoice.paymentDate || new Date().toISOString(), source: 'Invoice Payment' as RevenueSource, description: `Payment for Invoice ${invoice.invoiceNumber}`, amount: invoice.totalAmount, projectId: invoice.projectId, clientId: invoice.clientId, invoiceId: invoice.id };
      
      const response = await fetch('http://localhost:3001/api/revenue-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(revenueData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newRevenueItem = await response.json();
      setRevenueItems(prevRev => [...prevRev, newRevenueItem].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      alert(`Revenue item generated for invoice ${invoice.invoiceNumber}`);
    } catch (error) {
      console.error("Error generating revenue from invoice:", error);
      alert("Failed to generate revenue item.");
    }
  }, [revenueItems]);

  const handleNavigateToFinanceFilteredView = useCallback((targetView: FinanceSubViewTarget, filter?: InvoiceStatus | string) => {
    setActiveView('finance');
    setActiveSubViewId(targetView);
    if (targetView === 'invoices' && filter) {
      setInvoiceListFilter(filter as InvoiceStatus | 'All');
    } else {
      setInvoiceListFilter('All'); 
    }
  }, []);

  const handleClearInvoiceFilter = useCallback(() => {
    setInvoiceListFilter('All');
  }, []);

  // AI Project Import Handlers
  const handleOpenImportModal = useCallback(() => setIsImportModalOpen(true), []);
  const handleCloseImportModal = useCallback(() => setIsImportModalOpen(false), []);

  const handleImportProjectPlan = useCallback(async (parsedPlan: ParsedProjectPlan): Promise<string | null> => {
    try {
      const projectDescription = (parsedPlan.projectManager ? `Project Manager: ${parsedPlan.projectManager}\n\n` : '') + (parsedPlan.projectDescription || '');
      
      const newProjectCoreData: NewProjectData = {
        projectName: parsedPlan.projectName || 'Untitled Imported Project',
        description: projectDescription,
        clientId: undefined, // AI import doesn't specify client yet
        status: 'Planning',
        startDate: parsedPlan.startDate || undefined,
        dueDate: parsedPlan.endDate || undefined,
        teamMembers: [], // AI doesn't parse team members at project level yet
      };

      // Save the project via API
      const projectResponse = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjectCoreData),
      });
      if (!projectResponse.ok) {
        throw new Error(`HTTP error! status: ${projectResponse.status}`);
      }
      const savedProject = await projectResponse.json();
      const newProjectId = savedProject.id;

      // Update local state for projects
      setProjects(prev => [savedProject, ...prev]);

      if (newProjectId && parsedPlan.phases) {
        for (const phase of parsedPlan.phases) {
          if (phase.tasks) {
            for (const parsedTask of phase.tasks) {
              const newTaskData: NewTaskData = {
                title: parsedTask.title || 'Untitled Task',
                description: parsedTask.description || '',
                projectId: newProjectId,
                status: 'To Do',
                priority: 'Medium',
                assignedTo: parsedTask.assignedTo || undefined,
                startDate: parsedTask.startDate || undefined,
                dueDate: parsedTask.dueDate || undefined,
              };
              // Save the task via API
              const taskResponse = await fetch('http://localhost:3001/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTaskData),
              });
              if (!taskResponse.ok) {
                console.error("Error saving task during import:", await taskResponse.text());
                continue; // Continue with other tasks even if one fails
              }
              const savedTask = await taskResponse.json();
              // Update local state for tasks
              setTasks(prev => [savedTask, ...prev]);
            }
          }
        }
      }
      setActiveView('projects'); // Navigate to projects view
      handleSelectProjectForNavigation(newProjectId); // Navigate to the new project's detail view
      return newProjectId;
    } catch (error) {
      console.error("Error importing project plan:", error);
      // Potentially set an error state to show in UI
      return null;
    }
  }, [handleSelectProjectForNavigation]);


  const renderActiveView = () => {
    const currentViewConfig = viewConfigurations[activeView];
    switch (activeView) {
      case 'blueprint':
        return (<><BlueprintView phases={currentBlueprintData.phases} onUpdateActivity={handleUpdateActivity} /><MonitoringSection title="Monitoring Your Progress & Fighting Squirrels" tips={currentBlueprintData.monitoringTips} /></>);
      case 'clients': case 'projects': case 'tasks': case 'crm': case 'finance': case 'blog':
        if (!currentViewConfig) return <p className="text-center py-10 text-slate-400">Configuration missing for {activeView}.</p>;
        return (
          <StructuredViewLayout
            viewName={activeView}
            config={currentViewConfig}
            activeSubViewId={activeSubViewId}
            onSetSubViewId={handleSetSubViewId}
            
            selectedClientIdForProfile={activeView === 'clients' ? selectedClientIdForProfile : null}
            onViewClientProfileFromList={activeView === 'clients' ? handleViewClientProfileFromList : undefined}
            onClientSelectedInProfileView={activeView === 'clients' ? handleClientSelectionInProfileView : undefined}
            onBackToClientList={activeView === 'clients' ? handleBackToClientList : undefined}
            onNavigateToCommLogForClient={handleNavigateToCommLogForClient} // Pass this for all views that might use it

            projects={projects} 
            onSaveProject={handleSaveProject}
            onDeleteProject={handleDeleteProject}
            projectListFilter={activeView === 'projects' ? projectListFilter : 'All'}
            onApplyProjectFilter={activeView === 'projects' ? handleApplyProjectFilterAndNavigate : undefined}
            onClearProjectFilter={activeView === 'projects' && activeSubViewId === 'all' ? handleClearProjectFilter : undefined}
            onViewProjectDetails={activeView === 'projects' ? handleSelectProjectForNavigation : undefined} 
            selectedProjectIdForDetail={activeView === 'projects' ? selectedProjectIdForDetail : null}
            onBackToProjectList={activeView === 'projects' && activeSubViewId === 'detail' ? handleBackToProjectList : undefined}
            onOpenImportModal={activeView === 'projects' && activeSubViewId === 'all' ? handleOpenImportModal : undefined} // Pass handler
            
            tasks={tasks} 
            onSaveTask={handleSaveTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}

            expenses={expenses}
            onSaveExpense={handleSaveExpense}
            onDeleteExpense={handleDeleteExpense}
            revenueItems={revenueItems}
            onSaveRevenue={handleSaveRevenueItem}
            onDeleteRevenue={handleDeleteRevenueItem}
            invoices={invoices}
            onSaveInvoice={handleSaveInvoice}
            onDeleteInvoice={handleDeleteInvoice}
            onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
            onGenerateRevenueFromInvoice={handleGenerateRevenueFromInvoice}
            invoiceListFilter={activeView === 'finance' && activeSubViewId === 'invoices' ? invoiceListFilter : 'All'}
            onClearInvoiceFilter={activeView === 'finance' && activeSubViewId === 'invoices' ? handleClearInvoiceFilter : undefined}
            onNavigateToFinanceFilteredView={activeView === 'finance' && activeSubViewId === 'summary' ? handleNavigateToFinanceFilteredView : undefined}
            
            clients={clients} 
            deals={deals} 
            onSaveDeal={handleSaveDeal}
            onDeleteDeal={handleDeleteDeal}
            crmBlueprintActivities={crmBlueprintActivities}
            blueprintActivities={allBlueprintActivities} // Pass all blueprint activities
          />
        );
      default:
        const exhaustiveCheck: never = activeView; 
        return <p className="text-center py-10 text-slate-400">An unexpected view was selected: {exhaustiveCheck}.</p>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#1B365D] text-white antialiased"> {/* Updated: Fae Intelligence Blue bg, white text */}
      <Sidebar activeView={activeView} setActiveView={handleSetActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 md:p-6 text-center border-b border-opacity-30 border-[#4A5568] shadow-lg bg-[#1B365D]"> {/* Updated: border to Professional Gray (subtle) */}
          <h1 className="text-3xl md:text-4xl font-bold text-white">Consultancy Dashboard</h1> {/* Updated: text to white */}
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-12 bg-[#F7FAFC] text-[#4A5568]"> {/* Updated: Light Gray bg, Professional Gray text for content area */}
          {renderActiveView()}
        </main>
        <footer className="py-6 text-center text-slate-400 border-t border-opacity-30 border-[#4A5568] bg-[#1B365D]"> {/* Updated: border, text */}
          <p>&copy; {new Date().getFullYear()} Your Consultancy Dashboard. Stay Productive.</p>
        </footer>
      </div>
      {isImportModalOpen && (
        <ImportProjectModal
          isOpen={isImportModalOpen}
          onClose={handleCloseImportModal}
          onImport={handleImportProjectPlan}
        />
      )}
    </div>
  );
};

export default App;