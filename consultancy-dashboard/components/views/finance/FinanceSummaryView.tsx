

import React, { useMemo } from 'react';
import { Project, Task, FinanceSummaryViewProps, Invoice, Expense, RevenueItem, InvoiceStatus } from '../../../types';
import { MetricCard } from '../../ui/MetricCard'; // Updated import
import { Card } from '../../ui/Card'; // Added import

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null || isNaN(value)) return '$0';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const SimpleBarChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const chartHeight = 150;
  const barWidth = 50;
  const barMargin = 20;
  const maxValue = Math.max(...data.map(d => d.value), 0); 
  const scale = maxValue === 0 ? 0 : chartHeight / maxValue;

  if (data.every(d => d.value === 0)) {
    return <p className="text-slate-400 text-center py-4">No data to display in chart yet.</p>;
  }

  return (
    <svg 
        width={(barWidth + barMargin) * data.length - barMargin + 40} 
        height={chartHeight + 40} 
        aria-labelledby="chart-title" 
        role="img"
        className="mx-auto"
    >
      <title id="chart-title">Bar chart of financial figures</title>
      <text x="0" y="15" fontSize="10" fill="#94a3b8">{formatCurrency(maxValue)}</text>
      <line x1="35" y1="10" x2="35" y2={chartHeight + 10} stroke="#475569" strokeWidth="1"/>
      <text x="0" y={chartHeight+10} fontSize="10" fill="#94a3b8">{formatCurrency(0)}</text>

      {data.map((d, i) => {
        const barHeight = d.value * scale;
        const x = i * (barWidth + barMargin) + 40; 
        const y = chartHeight - barHeight + 10; 
        return (
          <g key={d.label} role="listitem" aria-label={`${d.label}: ${formatCurrency(d.value)}`}>
            <rect x={x} y={y} width={barWidth} height={Math.max(0, barHeight)} fill={d.color} rx="3" ry="3"/>
            <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="10" fill="#cbd5e1">{formatCurrency(d.value)}</text>
            <text x={x + barWidth / 2} y={chartHeight + 25} textAnchor="middle" fontSize="12" fill="#cbd5e1">{d.label}</text>
          </g>
        );
      })}
      <line x1="35" y1={chartHeight+10} x2={(barWidth + barMargin) * data.length - barMargin + 35} y2={chartHeight+10} stroke="#475569" strokeWidth="1"/>
    </svg>
  );
};


export const FinanceSummaryView: React.FC<FinanceSummaryViewProps> = ({ projects, tasks, expenses, revenueItems, invoices, onNavigateToFilteredView }) => {

  const financialOverview = useMemo(() => {
    const totalRevenue = revenueItems.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const totalPaidInvoices = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.totalAmount, 0);
    const outstandingInvoices = invoices.filter(inv => inv.status === 'Sent' || inv.status === 'Overdue').reduce((sum, inv) => sum + inv.totalAmount, 0);
    const revenueFromInvoices = revenueItems.filter(rev => rev.invoiceId && invoices.find(inv => inv.id === rev.invoiceId && inv.status === 'Paid')).reduce((sum, item) => sum + item.amount, 0);
    return { totalRevenue, totalExpenses, netProfit, totalInvoiced, totalPaidInvoices, outstandingInvoices, revenueFromInvoices };
  }, [revenueItems, expenses, invoices]);

  const projectFinancialsDirect = useMemo(() => {
    return projects.map(project => {
      const projectPaidInvoicesTotal = invoices.filter(inv => inv.projectId === project.id && inv.status === 'Paid').reduce((sum, inv) => sum + inv.totalAmount, 0);
      const projectExpensesTotal = expenses.filter(exp => exp.projectId === project.id).reduce((sum, exp) => sum + exp.amount, 0);
      return { id: project.id, name: project.projectName, clientName: project.clientName || "Internal", totalBilledPaid: projectPaidInvoicesTotal, totalExpenses: projectExpensesTotal, netProfit: projectPaidInvoicesTotal - projectExpensesTotal };
    });
  }, [projects, invoices, expenses]);

  const chartData = [
    { label: "Total Revenue", value: financialOverview.totalRevenue, color: "#34d399" },
    { label: "Total Expenses", value: financialOverview.totalExpenses, color: "#f87171" }
  ];

  return (
    <div className="space-y-8">
      <section aria-labelledby="overall-financial-metrics-title">
         <h2 id="overall-financial-metrics-title" className="sr-only">Overall Financial Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <MetricCard title="Total Revenue" value={formatCurrency(financialOverview.totalRevenue)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0L21.75 12M16.5 7.5h4.5m-4.5 0V12" /></svg>} colorClass="text-green-400" subtext={`From Invoices: ${formatCurrency(financialOverview.revenueFromInvoices)}`} onClick={() => onNavigateToFilteredView('revenue')} ariaLabel="View all revenue items"/>
            <MetricCard title="Total Expenses" value={formatCurrency(financialOverview.totalExpenses)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>} colorClass="text-red-400" onClick={() => onNavigateToFilteredView('expenses')} ariaLabel="View all expenses"/>
            <MetricCard title="Net Profit" value={formatCurrency(financialOverview.netProfit)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>} colorClass={financialOverview.netProfit >= 0 ? 'text-sky-400' : 'text-pink-400'} />
            <MetricCard title="Total Invoiced" value={formatCurrency(financialOverview.totalInvoiced)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" /></svg>} colorClass="text-indigo-400" onClick={() => onNavigateToFilteredView('invoices', 'All')} ariaLabel="View all invoices"/>
            <MetricCard title="Paid Invoices" value={formatCurrency(financialOverview.totalPaidInvoices)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>} colorClass="text-teal-400" onClick={() => onNavigateToFilteredView('invoices', 'Paid' as InvoiceStatus)} ariaLabel="View paid invoices"/>
            <MetricCard title="Outstanding Invoices" value={formatCurrency(financialOverview.outstandingInvoices)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>} colorClass="text-amber-400" onClick={() => onNavigateToFilteredView('invoices', 'Overdue' as InvoiceStatus)} ariaLabel="View overdue invoices"/>
        </div>
      </section>

      <section aria-labelledby="financial-snapshot-title">
        <Card className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-xl">
          <h2 id="financial-snapshot-title" className="text-xl font-semibold text-sky-300 mb-4 text-center">Financial Snapshot</h2>
          <div className="min-h-[220px] flex items-center justify-center"><SimpleBarChart data={chartData} /></div>
        </Card>
      </section>

      <section aria-labelledby="project-financial-breakdown-title">
        <Card className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-xl">
            <h2 id="project-financial-breakdown-title" className="text-xl font-semibold text-sky-300 mb-4">Project Financial Breakdown</h2>
            <p className="text-sm text-slate-400 mb-4 italic">Note: This breakdown is based on 'Paid' invoices and recorded expenses linked to each project.</p>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Project Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider hidden sm:table-cell">Client</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-sky-300 uppercase tracking-wider">Total Billed (Paid)</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-sky-300 uppercase tracking-wider">Total Expenses</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-sky-300 uppercase tracking-wider">Net Profit</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-800/30 divide-y divide-slate-700">
                        {projectFinancialsDirect.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400">No projects with financial data from invoices or expenses.</td></tr>
                        ) : (
                            projectFinancialsDirect.map((proj, idx) => (
                                <tr key={proj.id} className={`${idx % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-750/20'} hover:bg-slate-700/40`}>
                                    <td className="px-4 py-3 text-sm font-medium text-slate-100">{proj.name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-300 hidden sm:table-cell">{proj.clientName}</td>
                                    <td className={`px-4 py-3 text-sm text-right text-green-400`}>{formatCurrency(proj.totalBilledPaid)}</td>
                                    <td className={`px-4 py-3 text-sm text-right ${proj.totalExpenses > 0 ? 'text-red-400' : 'text-slate-300'}`}>{formatCurrency(proj.totalExpenses)}</td>
                                    <td className={`px-4 py-3 text-sm font-bold text-right ${proj.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatCurrency(proj.netProfit)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
      </section>
    </div>
  );
};