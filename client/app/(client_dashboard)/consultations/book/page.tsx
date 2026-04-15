"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMeetingStore } from "@/store/meetingStore";
import { useToastStore } from "@/store/toastStore";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageContext";

export default function MeetingRequestPage() {
  const { t, language: currentLang } = useLanguage();
  
  const meetingTypes = [
    { id: "first_meeting", label: interpolate(t.dashboard.consultations.types.first_meeting) },
    { id: "discovery", label: interpolate(t.dashboard.consultations.types.discovery) },
    { id: "follow_up", label: interpolate(t.dashboard.consultations.types.follow_up) },
    { id: "report_review", label: interpolate(t.dashboard.consultations.types.report_review) },
  ];

  const meetingOverviews = t.dashboard.consultations.typeDetails;

  const [selectedType, setSelectedType] = useState<keyof typeof meetingOverviews>("discovery");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [agenda, setAgenda] = useState(meetingOverviews["discovery"].agenda);
  const [basicContext, setBasicContext] = useState("");
  const [goals, setGoals] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [meetingSlots, setMeetingSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { createMeeting, isLoading } = useMeetingStore();
  const { addToast } = useToastStore();
  const router = useRouter();

  useEffect(() => {
    setAgenda(meetingOverviews[selectedType].agenda);
  }, [selectedType, currentLang]);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  useEffect(() => {
    if (eventTypes.length > 0) {
      fetchMeetingSlots();
    }
  }, [eventTypes]);

  const fetchEventTypes = async () => {
    try {
      const response = await axios.get('/event-type/');
      setEventTypes(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch event types:', error);
    }
  };

  const fetchMeetingSlots = async () => {
    if (eventTypes.length === 0) return;
    
    setLoadingSlots(true);
    try {
      const eventTypeUri = encodeURIComponent(eventTypes[0].uri);
      const response = await axios.get(`/meeting-slots/?event_type_uri=${eventTypeUri}`);
      setMeetingSlots(response.data?.data?.collection || []);
    } catch (error) {
      console.error('Failed to fetch meeting slots:', error);
    } finally {
      setLoadingSlots(false);
    }
  };

  const getAvailableDates = () => {
    const dates = new Set<string>();
    meetingSlots.forEach(slot => {
      if (slot.status === 'available') {
        const date = new Date(slot.start_time).toDateString();
        dates.add(date);
      }
    });
    return Array.from(dates);
  };

  const getTimeSlotsForDate = (date: Date) => {
    const dateString = date.toDateString();
    return meetingSlots.filter(slot => {
      const slotDate = new Date(slot.start_time).toDateString();
      return slotDate === dateString && slot.status === 'available';
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(currentLang === 'it' ? 'it-IT' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US', { month: 'long', year: 'numeric' });
  };

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return interpolate(t.dashboard.consultations.book.selectDate);
    return date.toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleSubmit = async () => {
    if (!selectedTimeSlot || !agenda.trim() || !basicContext.trim() || !goals.trim() || !painPoints.trim()) {
      addToast('Please fill all required fields and select a time slot', 'error');
      return;
    }

    const meetingData = {
      meeting_type: selectedType as 'discovery' | 'first_meeting' | 'follow_up' | 'report_review',
      requested_datetime: selectedTimeSlot.start_time,
      agenda: agenda.trim(),
      basic_context: basicContext.trim(),
      goals: goals.trim(),
      pain_points: painPoints.trim(),
      scheduling_url: eventTypes[0]?.uri || selectedTimeSlot.scheduling_url,
    };

    try {
      const response = await axios.post('/create-meeting/', meetingData);
      
      if (response.data?.success || response.status === 200 || response.status === 201) {
        addToast('Meeting created successfully! Redirecting to Calendly...', 'success');
        
        // Clear form fields
        setSelectedType("discovery");
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setAgenda(meetingOverviews["discovery"].agenda);
        setBasicContext("");
        setGoals("");
        setPainPoints("");
        
        // Open Calendly in new tab
        setTimeout(() => {
          window.open(selectedTimeSlot.scheduling_url, '_blank');
        }, 1500);
      } else {
        const errorMessage = response.data?.message || 'Failed to create meeting. Please try again.';
        addToast(errorMessage, 'error');
      }
    } catch (error: any) {
      console.error('Error creating meeting:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create meeting. Please try again.';
      addToast(errorMessage, 'error');
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-4 py-8 md:px-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-xl font-semibold text-lemon">
          {interpolate(t.dashboard.consultations.book.title)}
        </h1>

        {/* Search Box */}
        <div className="flex items-center bg-card px-5 py-2 rounded-full w-[320px] gap-3 border border-secondary">
          <input
            type="text"
            placeholder={interpolate(t.dashboard.common.search)}
            className="bg-transparent outline-none text-sm w-full"
          />
          <svg
            className="w-4 h-4 text-foreground opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto bg-card rounded-3xl px-6 py-10 shadow-xl border border-secondary">

        {/* SECTION TITLE */}
        <p className="text-sm opacity-80 mb-2">{interpolate(t.dashboard.consultations.book.subtitle)}</p>

        <p className="text-lg font-semibold text-lemon">
          {interpolate(t.dashboard.consultations.book.chooseType)}
        </p>

        {/* MEETING TYPE STEPS */}
        <div className="flex items-center gap-2 sm:gap-4 mt-6 flex-wrap">

          {meetingTypes.map((type, idx) => (
            <div key={idx} className="flex items-center gap-4">

              <button
                onClick={() => {
                  setSelectedType(type.id as keyof typeof meetingOverviews);
                  setAgenda(meetingOverviews[type.id as keyof typeof meetingOverviews].agenda);
                }}
                className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all
                  ${
                    selectedType === type.id
                      ? "bg-lemon text-background"
                      : "bg-secondary text-foreground"
                  }
                `}
              >
                {type.label}
              </button>

              {idx !== meetingTypes.length - 1 && (
                <div className="relative flex items-center">
                  <div className="w-12 h-[2px] bg-lemon"></div>
                  <div className="w-3 h-3 rounded-full bg-lemon absolute left-1/2 -translate-x-1/2"></div>
                </div>
              )}

            </div>
          ))}

        </div>

        {/* MEETING OVERVIEW */}
        <div className="mt-8 p-6 bg-secondary/30 rounded-xl border border-secondary">
          <h3 className="text-lg font-semibold text-lemon mb-3">{meetingTypes.find(t => t.id === selectedType)?.label} {interpolate(t.dashboard.consultations.book.overview)}</h3>
          <p className="text-foreground opacity-80 leading-relaxed">
            {meetingOverviews[selectedType].overview}
          </p>
        </div>

        {/* DATE + TIME SECTION */}
        <p className="text-center text-base sm:text-lg font-semibold mt-8 sm:mt-10 mb-6">
          {interpolate(t.dashboard.consultations.book.dateTime)}
        </p>

        <div className="w-full bg-background p-8 rounded-3xl flex flex-col md:flex-row gap-8 justify-center border border-secondary">

          {/* CALENDAR */}
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-full bg-card hover:bg-lemon hover:text-background transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              <h3 className="text-lg font-semibold">{formatMonthYear(currentMonth)}</h3>

              <button 
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-full bg-card hover:bg-lemon hover:text-background transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm opacity-70 mb-4">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {getDaysInMonth(currentMonth).map((date, index) => {
                const hasSlots = date && getAvailableDates().includes(date.toDateString());
                return (
                  <button
                    key={index}
                    onClick={() => date && hasSlots && setSelectedDate(date)}
                    disabled={!date || !hasSlots}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all
                      ${
                        !date
                          ? "invisible"
                          : !hasSlots
                          ? "bg-secondary/30 text-foreground/30 cursor-not-allowed"
                          : isDateSelected(date)
                          ? "bg-lemon text-background font-semibold"
                          : "bg-secondary text-foreground hover:bg-lemon/20"
                      }
                    `}
                  >
                    {date?.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TIME SELECTION */}
          <div className="w-full md:w-1/2 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-secondary">
            <h3 className="text-lg font-semibold mb-6">{formatSelectedDate(selectedDate)}</h3>

            {loadingSlots ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lemon"></div>
              </div>
            ) : selectedDate ? (
              <div className="flex flex-col gap-3 sm:gap-4 max-h-80 overflow-y-auto pr-2">
                {getTimeSlotsForDate(selectedDate).map((slot) => (
                  <button
                    key={slot.start_time}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-center text-sm font-semibold transition-all flex-shrink-0
                      ${
                        selectedTimeSlot?.start_time === slot.start_time
                          ? "bg-lemon text-background"
                          : "bg-lemon/30 text-foreground hover:bg-lemon/50"
                      }
                    `}
                  >
                    {formatTime(slot.start_time)}
                  </button>
                ))}
                {getTimeSlotsForDate(selectedDate).length === 0 && (
                  <p className="text-center text-foreground/60 py-4">{interpolate(t.dashboard.consultations.book.noSlots)}</p>
                )}
              </div>
            ) : (
              <p className="text-center text-foreground/60 py-4">{interpolate(t.dashboard.consultations.book.selectToSeeSlots)}</p>
            )}
          </div>
        </div>

        {/* MEETING AGENDA */}
        <p className="text-center text-base sm:text-lg font-semibold mt-8 sm:mt-10 mb-3">{interpolate(t.dashboard.consultations.book.agenda)}</p>
        <p className="text-center text-sm opacity-70 mb-4">{interpolate(t.dashboard.consultations.book.agendaDesc)}</p>

        <textarea
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          placeholder={interpolate(t.dashboard.consultations.book.agenda)}
          className="w-full h-40 bg-secondary rounded-xl p-4 outline-none text-sm text-foreground placeholder-foreground/50 whitespace-pre-line"
        />

        {/* BASIC CONTEXT */}
        <p className="text-center text-base sm:text-lg font-semibold mt-8 mb-3">{interpolate(t.dashboard.consultations.book.context)}</p>
        <p className="text-center text-sm opacity-70 mb-4">{interpolate(t.dashboard.consultations.book.contextDesc)}</p>

        <textarea
          value={basicContext}
          onChange={(e) => setBasicContext(e.target.value)}
          placeholder={interpolate(t.dashboard.consultations.book.contextDesc)}
          className="w-full h-32 bg-secondary rounded-xl p-4 outline-none text-sm text-foreground placeholder-foreground/50"
        />

        {/* GOALS */}
        <p className="text-center text-base sm:text-lg font-semibold mt-8 mb-3">{interpolate(t.dashboard.consultations.book.goals)}</p>
        <p className="text-center text-sm opacity-70 mb-4">{interpolate(t.dashboard.consultations.book.goalsDesc)}</p>

        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder={interpolate(t.dashboard.consultations.book.goalsDesc)}
          className="w-full h-32 bg-secondary rounded-xl p-4 outline-none text-sm text-foreground placeholder-foreground/50"
        />

        {/* PAIN POINTS */}
        <p className="text-center text-base sm:text-lg font-semibold mt-8 mb-3">{interpolate(t.dashboard.consultations.book.painPoints)}</p>
        <p className="text-center text-sm opacity-70 mb-4">{interpolate(t.dashboard.consultations.book.painPointsDesc)}</p>

        <textarea
          value={painPoints}
          onChange={(e) => setPainPoints(e.target.value)}
          placeholder={interpolate(t.dashboard.consultations.book.painPointsDesc)}
          className="w-full h-32 bg-secondary rounded-xl p-4 outline-none text-sm text-foreground placeholder-foreground/50"
        />

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleSubmit}
            disabled={isLoading || !selectedTimeSlot}
            className="px-10 py-2 bg-lemon text-background rounded-full font-semibold text-sm disabled:opacity-50"
          >
            {isLoading ? interpolate(t.dashboard.consultations.book.submitting) : interpolate(t.dashboard.consultations.book.submit)}
          </button>
        </div>

      </div>
    </div>
  );
}
