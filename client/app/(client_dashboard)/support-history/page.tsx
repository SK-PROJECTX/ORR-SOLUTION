"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useSupportStore } from "@/store/supportStore";

export default function SupportHistory() {
  const { tickets, isLoading, fetchTickets } = useSupportStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-6 md:p-12">
      {/* ========== Top Header ========== */}
      <div className=" mx-auto">
        <div className="flex ">
          <h1 className="text-lemon text-xl font-semibold mb-6 text-nowrap">
            Support history
          </h1>
          <div className="w-full flex justify-center mb-10">
            <div className="w-full max-w-xl bg-card border border-lemon rounded-full px-5 py-3 flex items-center">
              <input
                placeholder="Search anything here..."
                className="flex-1 bg-card outline-none text-sm placeholder-foreground/50 text-foreground"
              />
              <Search className="text-lemon text-lg" />
            </div>
          </div>
        </div>

        {/* Search Bar */}

        <div className="bg-card p-4 rounded-3xl">
          {/* ========== Main Card ========== */}
          <div className="w-full bg-card rounded-3xl p-10 shadow-lg relative border border-secondary">
            <h2 className="text-2xl font-semibold mb-10 text-foreground">History</h2>

            {/* Vertical accent line */}
            <div className="absolute left-10 top-32 bottom-10 w-[4px] bg-lemon rounded-full" />

            {/* Support Tickets List */}
            <div className="flex flex-col gap-6 ml-10">
              {isLoading ? (
                <div className="text-center py-8 text-foreground/70">
                  Loading support history...
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-8 text-foreground/70">
                  No support tickets found
                </div>
              ) : (
                tickets.map((ticket, i) => (
                  <div
                    key={ticket.ticket_id}
                    className="w-full bg-lemon rounded-xl p-6 pr-12 relative cursor-pointer transition-all text-background"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-bold">ID: {ticket.ticket_id.slice(0, 8)}...</p>
                      <span className="text-xs px-2 py-1 rounded bg-background/20 font-semibold uppercase">
                        {ticket.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{ticket.subject || 'No Subject'}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-90 mb-2">
                      <p><span className="font-medium">Priority:</span> {ticket.priority}</p>
                      <p><span className="font-medium">Source:</span> {ticket.source}</p>
                      <p><span className="font-medium">Date:</span> {new Date(ticket.created_at).toLocaleDateString()}</p>
                    </div>

                    {/* Dropdown Icon */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      <ChevronDown
                        className={`text-background text-xl transition-all ${openIndex === i ? "rotate-180" : ""
                          }`}
                      />
                    </div>

                    {/* Expanded Section */}
                    {openIndex === i && (
                      <div className="mt-4 text-sm text-background/90 border-t border-background/20 pt-4">
                        <p>This ticket was created via <strong>{ticket.source}</strong> with a <strong>{ticket.priority}</strong> priority level.</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
