"use client";

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, startOfWeek, getDay, addMonths, subMonths } from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, Search, HelpCircle, Settings, Menu } from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./google-calendar.css";

type ViewType = "month" | "week" | "day" | "agenda";

const parse = (dateString: string) => new Date(dateString);

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  resource?: any;
}

interface GoogleCalendarViewProps {
  events: Event[];
  onSelectEvent?: (event: Event) => void;
  onSelectSlot?: (slotInfo: any) => void;
}

const GoogleCalendarView: React.FC<GoogleCalendarViewProps> = ({
  events,
  onSelectEvent,
  onSelectSlot,
}) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<ViewType>(Views.MONTH as ViewType);

  const handleNavigate = (newDate: Date) => setDate(newDate);
  const handleViewChange = (newView: ViewType) => setView(newView);

  const CustomToolbar = (toolbarProps: any) => {
    const goToBack = () => {
      toolbarProps.onNavigate("PREV");
    };
    const goToNext = () => {
      toolbarProps.onNavigate("NEXT");
    };
    const goToToday = () => {
      toolbarProps.onNavigate("TODAY");
    };

    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-surface/50 border-b border-white/5 gap-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400">
            <Menu size={20} />
          </button>
          <div className="flex  items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h2 className="text-xl font-medium text-white hidden sm:block">Calendar</h2>
          </div>

          <div className="flex items-center gap-1 ml-4">
            <button
              onClick={goToToday}
              className="px-4 py-2 border border-white/10 rounded-md text-sm font-medium hover:bg-white/5 text-gray-300"
            >
              Today
            </button>
            <div className="flex items-center ml-2">
              <button onClick={goToBack} className="p-2 hover:bg-white/5 rounded-full text-gray-400">
                <ChevronLeft size={20} />
              </button>
              <button onClick={goToNext} className="p-2 hover:bg-white/5 rounded-full text-gray-400">
                <ChevronRight size={20} />
              </button>
            </div>
            <span className="text-lg font-medium text-white ml-2">
              {format(toolbarProps.date, "MMMM yyyy")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 mr-4">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none focus:outline-none text-sm text-white w-32"
            />
          </div>

          <select
            value={view}
            onChange={(e) => handleViewChange(e.target.value as ViewType)}
            className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value={Views.MONTH}>Month</option>
            <option value={Views.WEEK}>Week</option>
            <option value={Views.DAY}>Day</option>
            <option value={Views.AGENDA}>Agenda</option>
          </select>

          <div className="flex items-center gap-1 border-l border-white/10 ml-2 pl-2">
            <button className="p-2 hover:bg-white/5 rounded-full text-gray-400">
              <HelpCircle size={20} />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full text-gray-400">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="google-calendar-container bg-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[800px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        components={{
          toolbar: CustomToolbar,
        }}
        eventPropGetter={(event: any) => ({
          className: "google-calendar-event",
          style: {
            backgroundColor: event.resource?.color || "#0ec277",
          }
        })}
      />

      {/* Google Style Floating Action Button for mobile/tablet */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-primary hover:scale-110 transition-transform md:hidden z-50">
        <Plus size={32} />
      </button>
    </div>
  );
};

export default GoogleCalendarView;
