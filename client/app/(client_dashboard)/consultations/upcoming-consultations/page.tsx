"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  Navigate,
} from "react-big-calendar";
import {format, startOfWeek, getDay} from "date-fns";
import {enUS, it} from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarCog, ChevronLeft, ChevronRight } from "lucide-react";
import { useMeetingStore } from "@/store/meetingStore";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageContext";

// Simple parse function to replace date-fns parse
const simpleParse = (dateString: string) => new Date(dateString);

const locales = { "en": enUS, "it": it };
const localizer = dateFnsLocalizer({ format, parse: simpleParse, startOfWeek, getDay, locales });

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

type EventItem = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
};



function EventSidebar({ items, isLoading }: { items: EventItem[]; isLoading: boolean }) {
  const { t, language } = useLanguage();
  return (
    <div className="h-full">
      <div className="bg-card rounded-xl p-4 h-full flex flex-col">
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-xl text-lemon font-semibold mb-1">{interpolate(t.dashboard.consultations.upcoming.detailsDay)}</h3>
          <p className="text-sm text-foreground/70">{interpolate(t.dashboard.consultations.upcoming.dontMiss)}</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
          {isLoading ? (
            <div className="text-center py-8 text-foreground/70">
              {interpolate(t.dashboard.common.loading)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-foreground/70">
              {interpolate(t.dashboard.consultations.upcoming.noMeetings)}
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-background rounded-md p-3 flex gap-3 items-start">
                <div className="flex-shrink-0 mt-1">
                  {/* <div className="w-8 h-8 rounded bg-lemon flex items-center justify-center text-black">📅</div> */}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-foreground/70">{interpolate(t.dashboard.consultations.upcoming.onlineMeeting)}</p>
                    </div>
                    <div className="text-xs text-foreground bg-card px-2 py-1 rounded">
                      {format(item.start, "h:mm a")} - {format(item.end, "h:mm a")}
                    </div>
                  </div>

                 <p className="text-xs text-foreground/70 mt-3 flex gap-2">  <CalendarCog size={14}/>  {format(item.start, "EEEE, MMM d, yyyy", { locale: language === 'it' ? it : enUS })}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CustomToolbar({ localizer, label, onNavigate, view, onView }: any) {
  const { t } = useLanguage();
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
        <button onClick={() => onNavigate('TODAY')} className="bg-lemon text-black px-3 py-1 rounded">{interpolate(t.dashboard.consultations.upcoming.today)}</button>
        <div className="relative inline-block text-left">
          <select
            value={view}
            onChange={(e) => onView(e.target.value)}
            className="bg-card px-3 py-1 rounded text-sm text-foreground"
          >
            <option value={Views.MONTH} className="bg-card text-foreground">{interpolate(t.dashboard.consultations.upcoming.views.month)}</option>
            <option value={Views.WEEK} className="bg-card text-foreground">{interpolate(t.dashboard.consultations.upcoming.views.week)}</option>
            <option value={Views.DAY} className="bg-card text-foreground">{interpolate(t.dashboard.consultations.upcoming.views.day)}</option>
          </select>
        </div>
        <button className="px-2 py-2">⋮</button>
      </div>
    </div>
  );
}

export default function SchedulingPage() {
  const { t, language } = useLanguage();
  const { meetings, isLoading, fetchMyMeetings, getUpcomingMeetings } = useMeetingStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

  useEffect(() => {
    fetchMyMeetings();
  }, [fetchMyMeetings]);

  const upcomingMeetings = getUpcomingMeetings();

  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
  }, []);

  const handleViewChange = useCallback((view: any) => {
    setCurrentView(view);
  }, []);

  const handleSelectEvent = useCallback((event: EventItem) => {
    // Handle event click - could open a modal or navigate to details
    console.log('Selected event:', event);
  }, []);

  const handleSelectSlot = useCallback((slotInfo: any) => {
    // Handle clicking on empty calendar slot - could create new event
    console.log('Selected slot:', slotInfo);
  }, []);

  // Convert meetings to calendar events
  const events: EventItem[] = upcomingMeetings.map(meeting => {
    const startDate = new Date(meeting.requested_datetime);
    const endDate = new Date(startDate.getTime() + 60 * 60000); // Default 1 hour duration
    
    return {
      id: meeting.id,
      title: `${meeting.meeting_type.replace('_', ' ')} - ${meeting.agenda?.substring(0, 30) || 'Meeting'}...`,
      start: startDate,
      end: endDate,
      color: "var(--color-secondary)"
    };
  });

  // Inject custom styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = calendarStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
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
          <h1 className="text-3xl font-semibold text-lemon">{interpolate(t.dashboard.consultations.upcoming.title)}</h1>
          <div className="w-full max-w-md mx-auto hidden md:block">
            <div className="relative">
              <input
                placeholder={interpolate(t.dashboard.common.search)}
                className="w-full rounded-full py-2 pl-4 pr-10 bg-card text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lemon">🔍</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <EventSidebar items={events} isLoading={isLoading} />
          </aside>

          <main className="flex-1">
            <div className="bg-card rounded-xl p-6 h-full">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                view={currentView}
                onNavigate={handleNavigate}
                onView={handleViewChange}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                style={{ height: '100%' }}
                culture={language}
                components={{ toolbar: CustomToolbar }}
                eventPropGetter={(ev: any) => eventStyleGetter(ev as EventItem)}
                popup
                step={30}
                showMultiDayTimes
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
