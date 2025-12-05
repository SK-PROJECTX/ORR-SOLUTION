"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMeetingStore } from "@/store/meetingStore";
import { useRouter } from "next/navigation";

const meetingTypes = [
  "First meeting",
  "Discovery",
  "Follow-up",
  "Report review",
];

const times = ["5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM", "9:30 PM"];

export default function MeetingRequestPage() {
  const [selectedType, setSelectedType] = useState("Discovery");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [agenda, setAgenda] = useState("");
  const [schedulingUrl, setSchedulingUrl] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { createMeeting, isLoading } = useMeetingStore();
  const router = useRouter();

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
    if (!selectedDate || !selectedTime || !agenda.trim() || !schedulingUrl.trim()) {
      alert('Please fill all fields');
      return;
    }

    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    const [hours, minutes] = selectedTime.includes('PM') && !selectedTime.startsWith('12') 
      ? [parseInt(selectedTime.split(':')[0]) + 12, parseInt(selectedTime.split(':')[1])]
      : selectedTime.startsWith('12') && selectedTime.includes('AM')
      ? [0, parseInt(selectedTime.split(':')[1])]
      : [parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(':')[1])];
    
    const datetime = new Date(selectedDate);
    datetime.setHours(hours, minutes, 0, 0);
    
    const meetingData = {
      meeting_type: selectedType.toLowerCase().replace(' ', '_') as 'discovery' | 'first_meeting' | 'follow_up' | 'report_review',
      requested_datetime: datetime.toISOString(),
      agenda: agenda.trim(),
      scheduling_url: schedulingUrl.trim(),
    };

    try {
      const meetingId = await createMeeting(meetingData);
      console.log('Meeting ID returned:', meetingId);
      
      if (meetingId) {
        // Clear form fields after successful submission
        setSelectedType("Discovery");
        setSelectedDate(null);
        setSelectedTime(null);
        setAgenda("");
        setSchedulingUrl("");
        // Navigate to pre-meeting page with meeting ID
        router.push(`/pre-meeting?meetingId=${meetingId}`);
      } else {
        console.log('No meeting ID returned, submission may have failed');
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
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
        <div className="flex items-center gap-4 mt-6 flex-wrap">

          {meetingTypes.map((type, idx) => (
            <div key={idx} className="flex items-center gap-4">

              <button
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all
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

        {/* DATE + TIME SECTION */}
        <p className="text-center text-lg font-semibold mt-10 mb-6">
          Choose Preferred Date And Time
        </p>

        <div className="w-full bg-background p-8 rounded-3xl flex flex-col md:flex-row gap-8 justify-center border border-secondary">

          {/* CALENDAR */}
          <div className="w-full md:w-1/2">
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
              {getDaysInMonth(currentMonth).map((date, index) => (
                <button
                  key={index}
                  onClick={() => date && setSelectedDate(date)}
                  disabled={!date}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all
                    ${
                      !date
                        ? "invisible"
                        : isDateSelected(date)
                        ? "bg-lemon text-background font-semibold"
                        : "bg-secondary text-foreground hover:bg-lemon/20"
                    }
                  `}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* TIME SELECTION */}
          <div className="w-full md:w-1/2 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-secondary">
            <h3 className="text-lg font-semibold mb-6">{formatSelectedDate(selectedDate)}</h3>

            <div className="flex flex-col gap-4">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-6 py-3 rounded-lg text-center text-sm font-semibold transition-all
                    ${
                      selectedTime === time
                        ? "bg-lemon text-background"
                        : "bg-lemon/30 text-foreground"
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MEETING AGENDA */}
        <p className="text-center text-lg font-semibold mt-10 mb-3">Meeting Agenda</p>

        <textarea
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          placeholder="Input text"
          className="w-full h-40 bg-secondary rounded-xl p-4 outline-none text-sm text-foreground placeholder-foreground/50"
        />

        {/* SCHEDULING URL */}
        <p className="text-center text-lg font-semibold mt-8 mb-3">Scheduling URL</p>

        <input
          type="url"
          value={schedulingUrl}
          onChange={(e) => setSchedulingUrl(e.target.value)}
          placeholder="https://calendly.com/your-link or similar scheduling URL"
          className="w-full bg-secondary rounded-xl p-4 outline-none text-sm text-foreground placeholder-foreground/50"
        />

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-10 py-2 bg-lemon text-background rounded-full font-semibold text-sm disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

      </div>
    </div>
  );
}
