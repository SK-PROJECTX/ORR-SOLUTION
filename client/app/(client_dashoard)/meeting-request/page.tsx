"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMeetingStore } from "@/store/meetingStore";

const meetingTypes = [
  "First meeting",
  "Discovery",
  "Follow-up",
  "Report review",
];

const times = ["5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM", "9:30 PM"];

export default function MeetingRequestPage() {
  const [selectedType, setSelectedType] = useState("Discovery");
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [agenda, setAgenda] = useState("");
  const { createMeeting, isLoading } = useMeetingStore();

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !agenda.trim()) {
      alert('Please fill all fields');
      return;
    }

    const datetime = new Date(`2023-09-${selectedDate} ${selectedTime}`);
    const meetingData = {
      meeting_type: selectedType.toLowerCase().replace(' ', '_') as 'discovery' | 'first_meeting' | 'follow_up' | 'report_review',
      requested_datetime: datetime.toISOString(),
      agenda: agenda.trim(),
    };

    await createMeeting(meetingData);
  };

  return (
    <div className="min-h-screen w-full bg-[#041428] text-white px-4 py-8 md:px-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-xl font-semibold text-[#18E3A3]">
          Meeting Request System
        </h1>

        {/* Search Box */}
        <div className="flex items-center bg-[#08233E] px-5 py-2 rounded-full w-[320px] gap-3 border border-white/10">
          <input
            type="text"
            placeholder="Search anything here..."
            className="bg-transparent outline-none text-sm w-full"
          />
          <svg
            className="w-4 h-4 text-white opacity-70"
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
      <div className="max-w-6xl mx-auto bg-[#0A2540] rounded-3xl px-6 py-10 shadow-xl border border-white/10">

        {/* SECTION TITLE */}
        <p className="text-sm opacity-80 mb-2">Form-based way to request official meetings</p>

        <p className="text-lg font-semibold text-[#18E3A3]">
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
                      ? "bg-[#18E3A3] text-[#041428]"
                      : "bg-[#0F334F] text-white"
                  }
                `}
              >
                {type}
              </button>

              {idx !== meetingTypes.length - 1 && (
                <div className="relative flex items-center">
                  <div className="w-12 h-[2px] bg-[#18E3A3]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#18E3A3] absolute left-1/2 -translate-x-1/2"></div>
                </div>
              )}

            </div>
          ))}

        </div>

        {/* DATE + TIME SECTION */}
        <p className="text-center text-lg font-semibold mt-10 mb-6">
          Choose Preferred Date And Time
        </p>

        <div className="w-full bg-[#071B33] p-8 rounded-3xl flex flex-col md:flex-row gap-8 justify-center">

          {/* CALENDAR */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <button className="p-2 rounded-full bg-[#0A2540]">
                <ChevronLeft size={18} />
              </button>

              <h3 className="text-lg font-semibold">September 2023</h3>

              <button className="p-2 rounded-full bg-[#0A2540]">
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-4 text-center text-sm opacity-70 mb-4">
              <div>So.</div>
              <div>Mo.</div>
              <div>Di.</div>
              <div>Mi.</div>
              <div>Do.</div>
              <div>Fr.</div>
              <div>Sa.</div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-4 text-center text-sm">

              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all
                    ${
                      selectedDate === day
                        ? "bg-[#18E3A3] text-[#041428] font-semibold"
                        : "bg-[#0F334F] text-white"
                    }
                  `}
                >
                  {day}
                </button>
              ))}

            </div>
          </div>

          {/* TIME SELECTION */}
          <div className="w-full md:w-1/2 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-white/20">
            <h3 className="text-lg font-semibold mb-6">Monday, 18. September</h3>

            <div className="flex flex-col gap-4">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-6 py-3 rounded-lg text-center text-sm font-semibold transition-all
                    ${
                      selectedTime === time
                        ? "bg-[#18E3A3] text-[#041428]"
                        : "bg-[#18E3A3]/30 text-white"
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
          className="w-full h-40 bg-[#0F334F] rounded-xl p-4 outline-none text-sm text-white"
        />

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-10 py-2 bg-[#18E3A3] text-[#041428] rounded-full font-semibold text-sm disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

      </div>
    </div>
  );
}
