
import React, { useMemo } from 'react';
import { Card } from '../../ui/Card';
import { CrmDealStage, Client, Deal, CrmOverviewViewProps, Task, CrmBlueprintActivity } from '../../../types';
import { MetricCard as CustomMetricCard } from '../../ui/MetricCard'; // Use the custom MetricCard


interface QuickNavButtonProps {
  label: string;
  subViewId: string;
  onClick: (id: string) => void;
  icon: JSX.Element;
}

const QuickNavButton: React.FC<QuickNavButtonProps> = ({ label, subViewId, onClick, icon }) => (
  <button
    onClick={() => onClick(subViewId)}
    className="bg-[#1B365D] hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-colors duration-150 flex flex-col items-center justify-center text-center w-full h-full text-sm" /* Fae Blue button */
    aria-label={`Navigate to ${label}`}
  >
    <span className="mb-1 text-2xl">{icon}</span>
    {label}
  </button>
);


const DealStageBadge: React.FC<{ stage: CrmDealStage, count: number }> = ({ stage, count }) => {
  let bgColor = 'bg-slate-400';
  let textColor = 'text-[#4A5568]'; // Default: Professional Gray text for light badges

  switch (stage) {
    case 'Lead': bgColor = 'bg-yellow-400'; break; // Keep yellow for distinction
    case 'Contacted': bgColor = 'bg-sky-300'; break; // Lighter Sky
    case 'Proposal': bgColor = 'bg-[#1B365D]'; textColor = 'text-white'; break; // Fae Blue
    case 'Negotiation': bgColor = 'bg-purple-400'; break; // Lighter Purple
    case 'Closed Won': bgColor = 'bg-[#38A169]'; textColor = 'text-white'; break; // Success Green
    case 'Closed Lost': bgColor = 'bg-[#DD6B20]'; textColor = 'text-white'; break; // Warning Orange
    default: bgColor = 'bg-slate-300'; break; // Light Gray
  }
  return (
    <div className={`p-2.5 rounded-lg shadow ${bgColor} ${textColor} flex flex-col items-center justify-center`}>
      <span className="text-xs font-medium uppercase tracking-wider">{stage}</span>
      <span className="text-xl font-bold">{count}</span>
    </div>
  );
};


const KeyMetric: React.FC<{ title: string; value: string | number; icon?: JSX.Element; onClick?: () => void; description?: string }> = ({ title, value, icon, onClick, description }) => {
  const content = (
    <>
      {icon && <div className="text-3xl text-[#1B365D] mb-2">{icon}</div>}
      <h4 className="text-sm font-semibold text-[#4A5568] uppercase tracking-wider mb-1">{title}</h4>
      <p className="text-3xl font-bold text-[#1B365D]">{value}</p>
      {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
    </>
  );

  // Consistent base styling, including min-height from MetricCard for potential future use if this component is used.
  const baseCardStyling = `bg-white p-4 rounded-lg shadow-lg border border-slate-200 text-center flex flex-col items-center justify-center min-h-[170px]`;
  
  const ariaLabelString = `${title}: ${value}. ${description || ''}${onClick ? ' Click to view details.' : ''}`;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseCardStyling} w-full cursor-pointer hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F7FAFC] focus:ring-[#1B365D]`}
        aria-label={ariaLabelString}
      >
        {content}
      </button>
    );
  }

  return (
    <Card className={`${baseCardStyling}`}>
      {content}
    </Card>
  );
};

export const CrmOverviewView: React.FC<CrmOverviewViewProps> = ({ clients, deals, onNavigate, tasks, crmBlueprintActivities }) => {
  const activeLeadsCount = useMemo(() => {
    return clients.filter(c => c.status === 'Lead' || c.status === 'Prospect').length;
  }, [clients]);

  const openDeals = useMemo(() => {
    return deals.filter(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost');
  }, [deals]);

  const openDealsCount = openDeals.length;
  const pipelineValue = useMemo(() => {
    return openDeals.reduce((sum, deal) => sum + deal.value, 0);
  }, [openDeals]);

  const dealsByStage = useMemo(() => {
    const stages: CrmDealStage[] = ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
    const counts = stages.reduce((acc, stage) => {
      acc[stage] = 0;
      return acc;
    }, {} as Record<CrmDealStage, number>);
    
    deals.forEach(deal => {
      if (counts[deal.stage] !== undefined) {
        counts[deal.stage]++;
      }
    });
    return stages.map(stage => ({ stage, count: counts[stage] }));
  }, [deals]);

  const keyOpenDeals = useMemo(() => {
    return openDeals
      .sort((a, b) => b.value - a.value) // Sort by value descending
      .slice(0, 3); // Take top 3
  }, [openDeals]);

  const recentActivities = useMemo(() => {
    // Combine blueprint CRM activities and tasks with CRM snippets
    const blueprintAsTasks = crmBlueprintActivities.map(act => ({
        id: `bp-${act.id}`,
        title: `Blueprint: ${act.title}`,
        date: new Date().toISOString(), // Placeholder, blueprint activities don't have dates
        type: 'Blueprint Activity' as const,
        relatedTo: act.crmDetails?.customerName || 'N/A',
        stage: act.crmDetails?.dealStage,
    }));

    const crmTasks = tasks.filter(task => task.crmInfoSnippet).map(task => ({
        id: task.id,
        title: task.title,
        date: task.dueDate || task.startDate || new Date().toISOString(), // Use due date, then start, then now
        type: 'Task' as const,
        relatedTo: task.crmInfoSnippet?.customerName || task.projectName || 'N/A',
        stage: task.crmInfoSnippet?.dealStage
    }));
    
    return [...blueprintAsTasks, ...crmTasks]
        .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

  }, [tasks, crmBlueprintActivities]);

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null || isNaN(value)) return '$0';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CustomMetricCard
          title="Active Leads"
          value={activeLeadsCount}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m8.117 0a7.47 7.47 0 0 0-3.06-.517M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>}
          colorClass="text-[#1B365D]" // Fae Blue text
          onClick={() => onNavigate('leads')}
          ariaLabel={`View ${activeLeadsCount} active leads`}
        />
        <CustomMetricCard
          title="Open Deals"
          value={openDealsCount}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>}
          colorClass="text-[#38A169]" // Success Green text
          onClick={() => onNavigate('deals')}
          ariaLabel={`View ${openDealsCount} open deals`}
        />
        <CustomMetricCard
          title="Pipeline Value"
          value={formatCurrency(pipelineValue)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          colorClass="text-[#DD6B20]" // Warning Orange text
          onClick={() => onNavigate('deals')}
          ariaLabel={`View deals with a total pipeline value of ${formatCurrency(pipelineValue)}`}
        />
         <QuickNavButton 
            label="Manage Contacts" 
            subViewId="contacts" 
            onClick={onNavigate} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>} 
        />
      </div>
      
      <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
        <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Sales Pipeline Stages</h3> {/* Fae Blue title */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {dealsByStage.map(({ stage, count }) => (
            <DealStageBadge key={stage} stage={stage} count={count} />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
          <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Key Open Deals</h3> {/* Fae Blue title */}
          {keyOpenDeals.length > 0 ? (
            <ul className="space-y-3">
              {keyOpenDeals.map(deal => (
                <li key={deal.id} className="p-3 bg-white rounded-md shadow border border-slate-200 hover:shadow-sm transition-shadow"> {/* White item bg */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-[#4A5568]">{deal.dealName}</h4> {/* Professional Gray */}
                      <p className="text-xs text-slate-500">{deal.clientName}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#38A169]">{formatCurrency(deal.value)}</span> {/* Success Green */}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Stage: {deal.stage} - Expected Close: {new Date(deal.expectedCloseDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#4A5568] text-center py-4">No open deals to display.</p> /* Professional Gray */
          )}
        </Card>

        <Card className="bg-[#F7FAFC] p-6 rounded-lg shadow-xl border border-slate-200"> {/* Light Gray bg */}
          <h3 className="text-xl font-semibold text-[#1B365D] mb-4">Recent CRM Activities</h3> {/* Fae Blue title */}
          {recentActivities.length > 0 ? (
            <ul className="space-y-3">
              {recentActivities.map(activity => (
                <li key={activity.id} className="p-3 bg-white rounded-md shadow border border-slate-200 hover:shadow-sm transition-shadow"> {/* White item bg */}
                  <h4 className="font-medium text-[#4A5568]">{activity.title}</h4> {/* Professional Gray */}
                  <div className="text-xs text-slate-500 mt-1 flex justify-between">
                    <span>{activity.type} with {activity.relatedTo}</span>
                    <span>{activity.stage && `(${activity.stage})`} {new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
             <p className="text-[#4A5568] text-center py-4">No recent CRM-related activities or tasks.</p> /* Professional Gray */
          )}
        </Card>
      </div>
    </div>
  );
};
