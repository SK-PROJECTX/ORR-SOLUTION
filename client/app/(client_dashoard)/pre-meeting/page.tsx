"use client";
import React, { useState } from "react";
import { usePreMeetingStore } from "@/store/preMeetingStore";
import { useSearchParams, useRouter } from "next/navigation";

export default function FirstMeetingPrepPage() {
  const [formData, setFormData] = useState({
    basic_context: '',
    goals: '',
    pain_points: ''
  });
  const { submitPreMeetingForm, isLoading } = usePreMeetingStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const meetingId = parseInt(searchParams.get('meetingId') || '1');

  const handleSubmit = async () => {
    if (!formData.basic_context.trim() || !formData.goals.trim() || !formData.pain_points.trim()) {
      alert('Please fill all fields');
      return;
    }
    await submitPreMeetingForm(meetingId, formData);
    router.push('/meeting-request');
  };

  return (
    <div className="min-h-screen w-full bg-background flex justify-center items-start py-20 px-4">
      <div className="w-full max-w-xl bg-card rounded-3xl p-10 border border-secondary shadow-xl">
        <h1 className="text-3xl font-semibold text-primary mb-8">First meeting prep</h1>

        <div className="space-y-10">
          {/* Basic context */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Basic context</h2>
            <p className="text-sm text-foreground opacity-70 leading-relaxed mb-4">
              Die genaue Modellbezeichnung befindet sich meistens auf einem Etikett
              auf der Rückseite des Notebooks. Diese brauchst du, um das
              Notebook-Modell zu identifizieren.
            </p>
            <textarea
              value={formData.basic_context}
              onChange={(e) => setFormData({...formData, basic_context: e.target.value})}
              className="w-full h-24 bg-secondary text-foreground rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Goals */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Goals</h2>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              className="w-full h-24 bg-secondary text-foreground rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Main pain points */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Main pain points</h2>
            <textarea
              value={formData.pain_points}
              onChange={(e) => setFormData({...formData, pain_points: e.target.value})}
              placeholder="Schreiben Sie uns..."
              className="w-full h-28 bg-secondary text-foreground rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-primary placeholder:text-foreground placeholder:opacity-50"
            />
          </div>
        </div>

        {/* Save button */}
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-10 bg-primary hover:bg-opacity-90 text-background font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
