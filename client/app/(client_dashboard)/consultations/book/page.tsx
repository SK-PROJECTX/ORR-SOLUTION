"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMeetingStore } from "@/store/meetingStore";
import { useToastStore } from "@/store/toastStore";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const meetingTypes = [
  "First meeting",
  "Discovery",
  "Follow-up",
  "Report review",
];

const meetingOverviews = {
  "First meeting": {
    overview: "Your introduction to ORR. This meeting focuses on understanding your organisation at a high level, clarifying your priorities, and determining whether our support is the right fit. No preparation is required — we listen first.",
    agenda: "1. Welcome & quick orientation to ORR's GP model\n2. Client introduction and current context\n3. High-level challenges and priorities\n4. Clarifying questions from ORR\n5. Outline of next steps (Discovery Meeting + documentation)\n6. Q&A"
  },
  "Discovery": {
    overview: "A structured diagnostic session where we map your organisation's systems, challenges, and desired outcomes. This is the foundation for ORR's Diagnose → Design → Deploy process. Expect targeted questions and a deeper review of how your organisation works.",
    agenda: "1. Recap of objectives and scope\n2. Deep-dive into operational, regulatory, digital, and strategic areas\n3. Review of existing documents, processes, and systems\n4. Identification of pain points and constraints\n5. Mapping desired outcomes and early hypotheses\n6. Confirmation of what ORR will analyse and deliver next"
  },
  "Follow-up": {
    overview: "A short, focused checkpoint to validate findings, close information gaps, and confirm assumptions before ORR moves into solution design. This meeting ensures accuracy and alignment.",
    agenda: "1. Review of updates since last meeting\n2. Clarifications on data, documents, or processes\n3. Validation of early observations or assumptions\n4. Additional client input needed before design\n5. Alignment on what ORR will prepare for the next stage"
  },
  "Report review": {
    overview: "A walkthrough of ORR's findings, recommendations, and the proposed roadmap. This meeting ensures full understanding before decisions are made and next steps begin.",
    agenda: "1. Summary of the discovery & diagnostic process\n2. Presentation of key findings\n3. Walkthrough of recommended actions or solutions\n4. Discussion on timelines, priorities, and resource needs\n5. Agreement on next steps (Design, Deploy, or adjustments)\n6. Q&A and final clarifications"
  }
};

interface EventType {
  name: string;
  uri: string;
}

interface TimeSlot {
  invitees_remaining: number;
  scheduling_url: string;
  start_time: string;
  status: string;
}

interface MeetingSlots {
  collection: TimeSlot[];
}

export default function MeetingRequestPage() {
  const [selectedType, setSelectedType] = useState("Discovery");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [agenda, setAgenda] = useState(meetingOverviews["Discovery"].agenda);
  const [notes, setNotes] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [meetingSlots, setMeetingSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { createMeeting, isLoading } = useMeetingStore();
  const { addToast } = useToastStore();
  const router = useRouter();

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
    return new Date(dateString).toLocaleTimeString('en-US', {
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
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return 'Select a date';
    return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleSubmit = async () => {
    if (!selectedTimeSlot || !agenda.trim()) {
      addToast('Please select a time slot and provide an agenda', 'error');
      return;
    }

    const meetingData = {
      meeting_type: selectedType.toLowerCase().replace(' ', '_') as 'discovery' | 'first_meeting' | 'follow_up' | 'report_review',
      requested_datetime: selectedTimeSlot.start_time,
      agenda: agenda.trim(),
      scheduling_url: selectedTimeSlot.scheduling_url,
    };

    try {
      const response = await axios.post('/create-meeting/', meetingData);
      console.log('Meeting creation response:', response.data);
      
      if (response.data?.success) {
        const meetingId = response.data?.data?.meeting_id;
        console.log('Meeting ID:', meetingId);
        
        if (meetingId) {
          // Clear form fields after successful submission
          setSelectedType("Discovery");
          setSelectedDate(null);
          setSelectedTimeSlot(null);
          setAgenda(meetingOverviews["Discovery"].agenda);
          setNotes("");
          // Navigate to pre-meeting form with meeting ID
          console.log('Navigating to pre-meeting with ID:', meetingId);
          router.push(`/pre-meeting?meetingId=${meetingId}`);
        } else {
          console.error('No meeting ID found in response');
          addToast('Meeting created but no ID returned. Please check your meetings.', 'warning');
          router.push('/consultations/upcoming-consultations');
        }
      } else {
        console.error('Meeting creation failed:', response.data);
        addToast('Failed to create meeting. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
      addToast('Failed to create meeting. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-4 py-8 md:px-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-xl font-semibold text-lemon">
          Meeting Request System
        </h1>

        {/* Search Box */}
        <div className="flex items-center bg-card px-5 py-2 rounded-full w-[320px] gap-3 border border-secondary">
          <input
            type="text"
            placeholder="Search anything here..."
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
        <p className="text-sm opacity-80 mb-2">Form-based way to request official meetings</p>

        <p className="text-lg font-semibold text-lemon">
          Choose meeting type
        </p>

        {/* MEETING TYPE STEPS */}
        <div className="flex items-center gap-2 sm:gap-4 mt-6 flex-wrap">

          {meetingTypes.map((type, idx) => (
            <div key={idx} className="flex items-center gap-4">

              <button
                onClick={() => {
                  setSelectedType(type);
                  setAgenda(meetingOverviews[type as keyof typeof meetingOverviews].agenda);
                }}
                className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all
                  ${
                    selectedType === type
                      ? "bg-lemon text-background"
                      : "bg-secondary text-foreground"
                  }
                `}
              >
                {type}
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
          <h3 className="text-lg font-semibold text-lemon mb-3">{selectedType} Overview</h3>
          <p className="text-foreground opacity-80 leading-relaxed">
            {meetingOverviews[selectedType as keyof typeof meetingOverviews].overview}
          </p>
        </div>

        {/* DATE + TIME SECTION */}
        <p className="text-center text-base sm:text-lg font-semibold mt-8 sm:mt-10 mb-6">
          Choose Preferred Date And Time
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
                  <p className="text-center text-foreground/60 py-4">No available slots for this date</p>
                )}
              </div>
            ) : (
              <p className="text-center text-foreground/60 py-4">Select a date to see available times</p>
            )}
          </div>
        </div>

        {/* MEETING AGENDA */}
        <p className="text-center text-base sm:text-lg font-semibold mt-8 sm:mt-10 mb-3">Standard Agenda</p>
        <p className="text-center text-sm opacity-70 mb-4">This agenda is pre-filled based on your meeting type and can be customized</p>

        <textarea
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          placeholder="Meeting agenda will be pre-filled based on meeting type"
          className="w-full h-40 bg-secondary rounded-xl p-4 outline-none text-sm text-foreground placeholder-foreground/50 whitespace-pre-line"
        />

        {/* ADDITIONAL NOTES */}
        <p className="text-center text-base sm:text-lg font-semibold mt-8 mb-3">Additional Notes</p>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes or specific topics you'd like to discuss can be provided here..."
          className="w-full h-32 bg-secondary rounded-xl p-4 outline-none text-sm text-foreground placeholder-foreground/50"
        />

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleSubmit}
            disabled={isLoading || !selectedTimeSlot}
            className="px-10 py-2 bg-lemon text-background rounded-full font-semibold text-sm disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

      </div>
    </div>
  );
}
