"use client";

import React from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  Navigate,
  DateLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarCog, ChevronLeft, ChevronRight } from "lucide-react";

// Custom calendar styles
const calendarStyles = `
  .rbc-off-range-bg {
    background-color: var(--color-background) !important;
  }
  .rbc-today {
    background-color: var(--color-card) !important;
  }
  .rbc-date-cell {
    color: var(--color-foreground) !important;
  }
  .rbc-header {
    background-color: var(--color-card) !important;
    color: var(--color-foreground) !important;
    border-bottom: 1px solid var(--color-secondary) !important;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

// Tailwind-friendly wrapper for react-big-calendar styles
// You should also include the react-big-calendar css in your global CSS if using Next.js.

const locales = { "en-US": enUS };
const localizer: DateLocalizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

type EventItem = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
};

const events: EventItem[] = [
  { id: 1, title: "Team Sync Meeting", start: new Date(2025, 10, 27, 10, 0), end: new Date(2025, 10, 27, 11, 0), color: "var(--color-secondary)" },
  { id: 2, title: "Product Review", start: new Date(2025, 10, 28, 14, 0), end: new Date(2025, 10, 28, 15, 0), color: "var(--color-secondary)" },
  { id: 3, title: "Design Handoff", start: new Date(2025, 10, 29, 9, 0), end: new Date(2025, 10, 29, 10, 30), color: "var(--color-secondary)" },
  { id: 4, title: "UX Workshop", start: new Date(2025, 11, 5, 13, 0), end: new Date(2025, 11, 5, 16, 0), color: "var(--color-secondary)" },
  { id: 5, title: "End of Year Conference", start: new Date(2025, 11, 12), end: new Date(2025, 11, 14), color: "var(--color-secondary)" },
  { id: 6, title: "Holiday Gala", start: new Date(2025, 11, 20, 18, 0), end: new Date(2025, 11, 20, 22, 0), color: "var(--color-secondary)" },
  { id: 7, title: "Client Presentation", start: new Date(2025, 11, 3, 15, 0), end: new Date(2025, 11, 3, 16, 30), color: "var(--color-secondary)" },
  { id: 8, title: "Sprint Planning", start: new Date(2025, 11, 4, 9, 0), end: new Date(2025, 11, 4, 10, 0), color: "var(--color-secondary)" },
  { id: 9, title: "Code Review Session", start: new Date(2025, 11, 6, 11, 0), end: new Date(2025, 11, 6, 12, 0), color: "var(--color-secondary)" },
  { id: 10, title: "Marketing Sync", start: new Date(2025, 11, 7, 14, 0), end: new Date(2025, 11, 7, 15, 0), color: "var(--color-secondary)" },
  { id: 11, title: "Budget Review", start: new Date(2025, 11, 9, 10, 0), end: new Date(2025, 11, 9, 11, 30), color: "var(--color-secondary)" },
  { id: 12, title: "Team Building", start: new Date(2025, 11, 10, 16, 0), end: new Date(2025, 11, 10, 18, 0), color: "var(--color-secondary)" },
  { id: 13, title: "Performance Review", start: new Date(2025, 11, 11, 13, 0), end: new Date(2025, 11, 11, 14, 0), color: "var(--color-secondary)" },
  { id: 14, title: "Project Kickoff", start: new Date(2025, 11, 13, 9, 30), end: new Date(2025, 11, 13, 11, 0), color: "var(--color-secondary)" },
  { id: 15, title: "Stakeholder Meeting", start: new Date(2025, 11, 16, 15, 0), end: new Date(2025, 11, 16, 16, 0), color: "var(--color-secondary)" },
];

function EventSidebar({ items }: { items: EventItem[] }) {
  return (
    <div className="h-full">
      <div className="bg-card rounded-xl p-4 h-full flex flex-col">
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-xl text-lemon font-semibold mb-1">Details Day</h3>
          <p className="text-sm text-foreground/70">Don't miss scheduled events</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
          {items.map((it) => (
            <div key={it.id} className="bg-background rounded-md p-3 flex gap-3 items-start">
              <div className="flex-shrink-0 mt-1">
                {/* <div className="w-8 h-8 rounded bg-lemon flex items-center justify-center text-black">📅</div> */}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{it.title}</h4>
                    <p className="text-xs text-foreground/70">Location</p>
                  </div>
                  <div className="text-xs text-foreground bg-card px-2 py-1 rounded">12am to 2pm</div>
                </div>

               <p className="text-xs text-foreground/70 mt-3 flex gap-2">  <CalendarCog size={14}/>  {format(it.start, "EEEE, MMM d, yyyy")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomToolbar({ localizer, label, onNavigate, view, onView }: any) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('PREV')}
          className="px-3 py-2 rounded bg-secondary hover:bg-lemon hover:text-black text-foreground"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="text-lg font-semibold">{label}</div>
        <button
          onClick={() => onNavigate('NEXT')}
          className="px-3 py-2 rounded bg-secondary hover:bg-lemon hover:text-black text-foreground"
        >
          <ChevronRight size={16} />
          
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('TODAY')} className="bg-lemon text-black px-3 py-1 rounded">Today</button>
        <div className="relative inline-block text-left">
          <select
            value={view}
            onChange={(e) => onView(e.target.value)}
            className="bg-card px-3 py-1 rounded text-sm text-foreground"
          >
            <option value={Views.MONTH} className="bg-card text-foreground">Month</option>
            <option value={Views.WEEK} className="bg-card text-foreground">Week</option>
            <option value={Views.DAY} className="bg-card text-foreground">Day</option>
          </select>
        </div>
        <button className="px-2 py-2">⋮</button>
      </div>
    </div>
  );
}

export default function SchedulingPage() {
  // Inject custom styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = calendarStyles;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);
  const eventStyleGetter = (event: EventItem) => {
    const style: React.CSSProperties = {
      backgroundColor: "var(--color-secondary)",
      borderRadius: "4px",
      border: "1px solid var(--color-lemon)",
      padding: "2px 6px",
      color: "var(--color-foreground)",
      fontWeight: 600,
    };
    return { style };
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-8 md:p-10 lg:p-14">
      <div className=" mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-lemon">Scheduling</h1>
          <div className="w-full max-w-md mx-auto hidden md:block">
            <div className="relative">
              <input
                placeholder="Search anything here..."
                className="w-full rounded-full py-2 pl-4 pr-10 bg-card text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lemon">🔍</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <EventSidebar items={events} />
          </aside>

          <main className="flex-1">
            <div className="bg-card rounded-xl p-6 h-full">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={Views.MONTH}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                style={{ height: '100%' }}
                components={{ toolbar: CustomToolbar }}
                eventPropGetter={(ev) => eventStyleGetter(ev as EventItem)}
                popup
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
