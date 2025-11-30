import React from "react";

export default function FirstMeetingPrepPage() {
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
              className="w-full h-24 bg-secondary text-foreground rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Goals */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Goals</h2>
            <textarea
              className="w-full h-24 bg-secondary text-foreground rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Main pain points */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Main pain points</h2>
            <textarea
              placeholder="Schreiben Sie uns..."
              className="w-full h-28 bg-secondary text-foreground rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-primary placeholder:text-foreground placeholder:opacity-50"
            />
          </div>
        </div>

        {/* Save button */}
        <button className="mt-10 bg-primary hover:bg-opacity-90 text-background font-semibold px-6 py-3 rounded-lg transition-all">
          Save
        </button>
      </div>
    </div>
  );
}
