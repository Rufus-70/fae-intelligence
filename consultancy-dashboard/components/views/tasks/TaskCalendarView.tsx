
import React, { useState, useMemo } from 'react';
import { Task, Activity, Project, TaskCalendarViewProps } from '../../../types';
import { Card } from '../../ui/Card';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatDateISO = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Primary date for display (e.g., due date)
  startDate?: string;
  endDate?: string;
  type: 'task' | 'blueprint' | 'project';
  original: Task | Activity | Project;
}

const EventItem: React.FC<{ event: CalendarEvent; onClick: () => void }> = ({ event, onClick }) => {
  let bgColor = 'bg-sky-700 hover:bg-sky-600'; // Default for tasks
  let icon = '✅';

  if (event.type === 'blueprint') {
    bgColor = 'bg-purple-700 hover:bg-purple-600';
    icon = '🗺️';
  } else if (event.type === 'project') {
    bgColor = 'bg-emerald-700 hover:bg-emerald-600';
    icon = '🏗️';
  }

  return (
    <button
      onClick={onClick}
      className={`block w-full text-left p-1.5 mb-1 rounded-md shadow text-xs text-white truncate transition-colors duration-150 ${bgColor}`}
      title={`${icon} ${event.title}${event.type === 'project' ? ` (Active)`: ''}`}
      aria-label={`View details for ${event.type}: ${event.title}`}
    >
      <span role="img" aria-hidden="true" className="mr-1">{icon}</span>
      {event.title}
    </button>
  );
};

export const TaskCalendarView: React.FC<TaskCalendarViewProps> = ({ tasks, blueprintActivities, projects }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = useMemo(() => new Date(currentYear, currentMonth, 1).getDay(), [currentMonth, currentYear]);
  const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log("Event clicked:", event.type, event.original);
    // Future: Open a modal to view/edit details
    alert(`${event.type.toUpperCase()}: ${event.title}\nDate: ${new Date(event.date).toLocaleDateString()}`);
  };
  
  const allEvents = useMemo(() => {
    const calendarEvents: CalendarEvent[] = [];

    tasks.forEach(task => {
      if (task.dueDate) {
        calendarEvents.push({
          id: `task-${task.id}`,
          title: task.title,
          date: task.dueDate,
          startDate: task.startDate,
          endDate: task.dueDate,
          type: 'task',
          original: task,
        });
      } else if (task.startDate) { // If no due date, use start date
         calendarEvents.push({
          id: `task-start-${task.id}`,
          title: task.title,
          date: task.startDate,
          startDate: task.startDate,
          endDate: task.startDate, // Treat as single day event for now if only start date
          type: 'task',
          original: task,
        });
      }
    });

    blueprintActivities.forEach(activity => {
      if (activity.dueDate) {
        calendarEvents.push({
          id: `bp-${activity.id}`,
          title: activity.title,
          date: activity.dueDate,
          startDate: activity.startDate,
          endDate: activity.dueDate,
          type: 'blueprint',
          original: activity,
        });
      } else if (activity.startDate) {
         calendarEvents.push({
          id: `bp-start-${activity.id}`,
          title: activity.title,
          date: activity.startDate,
          startDate: activity.startDate,
          endDate: activity.startDate,
          type: 'blueprint',
          original: activity,
        });
      }
    });
    
    // Projects are handled separately for "active on day" logic, but could be added here if needed for a different display
    
    return calendarEvents;
  }, [tasks, blueprintActivities]);


  const renderCalendarGrid = () => {
    const days = [];
    // Calculate padding days for the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`pad-start-${i}`} className="border border-slate-700 p-2 h-32 sm:h-36"></div>);
    }

    // Render days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentYear, currentMonth, day);
      const cellDateStr = formatDateISO(cellDate);
      const todayStr = formatDateISO(new Date());
      const isToday = cellDateStr === todayStr;

      const eventsForDay = allEvents.filter(event => {
        if (event.date) { // For tasks and blueprint activities with a due/start date
          return formatDateISO(new Date(event.date)) === cellDateStr;
        }
        return false;
      });

      const activeProjectsForDay = projects.filter(project => {
        if (project.startDate && project.dueDate) {
          const projectStart = new Date(project.startDate);
          projectStart.setHours(0,0,0,0); // Normalize to start of day
          const projectEnd = new Date(project.dueDate);
          projectEnd.setHours(23,59,59,999); // Normalize to end of day
          return cellDate >= projectStart && cellDate <= projectEnd;
        }
        return false;
      });

      days.push(
        <div
          key={`day-${day}`}
          className={`border border-slate-700 p-2 h-32 sm:h-36 overflow-y-auto 
                      ${isToday ? 'bg-sky-800/50 ring-2 ring-sky-500' : 'bg-slate-800/30 hover:bg-slate-700/50'} 
                      transition-colors duration-150`}
          aria-label={`Day ${day}, ${eventsForDay.length} tasks/activities, ${activeProjectsForDay.length} active projects`}
        >
          <div className={`font-semibold mb-1 ${isToday ? 'text-sky-300' : 'text-slate-300'}`}>{day}</div>
          <div className="space-y-1">
            {activeProjectsForDay.map(project => (
                 <EventItem 
                    key={`project-active-${project.id}-${cellDateStr}`} 
                    event={{
                        id: `project-active-${project.id}-${cellDateStr}`,
                        title: project.projectName,
                        date: cellDateStr, // Date for this cell
                        type: 'project',
                        original: project
                    }} 
                    onClick={() => handleEventClick({
                        id: `project-${project.id}`,
                        title: project.projectName,
                        date: cellDateStr, type:'project', original:project
                    })} 
                />
            ))}
            {eventsForDay.map(event => (
              <EventItem key={event.id} event={event} onClick={() => handleEventClick(event)} />
            ))}
          </div>
        </div>
      );
    }

    // Calculate padding days for the end of the month
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7; // Ensure full weeks
    const remainingCells = totalCells - (firstDayOfMonth + daysInMonth);
    for (let i = 0; i < remainingCells; i++) {
        days.push(<div key={`pad-end-${i}`} className="border border-slate-700 p-2 h-32 sm:h-36"></div>);
    }

    return days;
  };
  
  const unassignedEventsCount = useMemo(() => {
    let count = 0;
    tasks.forEach(t => { if (!t.dueDate && !t.startDate) count++; });
    blueprintActivities.forEach(a => { if(!a.dueDate && !a.startDate) count++; });
    return count;
  }, [tasks, blueprintActivities]);

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-sky-300 transition-colors"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        </button>
        <h3 className="text-xl sm:text-2xl font-semibold text-sky-300 text-center">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-sky-300 transition-colors"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-slate-700 border border-slate-700 rounded-md overflow-hidden" role="grid" aria-labelledby="calendar-title">
        <h4 id="calendar-title" className="sr-only">Calendar for {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium text-center p-2" role="columnheader" aria-label={day}>
            {day}
          </div>
        ))}
        {renderCalendarGrid()}
      </div>
       {unassignedEventsCount > 0 && (
          <p className="text-xs text-slate-500 mt-4 text-center">
            Note: {unassignedEventsCount} task(s)/activiti(es) do not have a due or start date and won't appear on the calendar.
          </p>
        )}
    </Card>
  );
};