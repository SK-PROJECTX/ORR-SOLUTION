"use client";

import { useState, useEffect } from "react";
import { Mail, Home, Phone, MessageSquare, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useSupportStore } from "@/store/supportStore";
import { useRouter } from "next/navigation";

const priorityOptions = [
  { value: "low", label: "Low", color: "text-blue-400" },
  { value: "medium", label: "Medium", color: "text-yellow-400" },
  { value: "high", label: "High", color: "text-orange-400" },
  { value: "urgent", label: "Urgent", color: "text-red-400" },
];

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  new: { icon: <AlertCircle className="w-4 h-4" />, color: "text-blue-400" },
  open: { icon: <Clock className="w-4 h-4" />, color: "text-yellow-400" },
  pending: { icon: <Clock className="w-4 h-4" />, color: "text-orange-400" },
  resolved: { icon: <CheckCircle className="w-4 h-4" />, color: "text-green-400" },
  closed: { icon: <CheckCircle className="w-4 h-4" />, color: "text-gray-400" },
};

export default function SupportPage() {
  const router = useRouter();
  const { createTicket, fetchTickets, tickets, isSubmitting, isLoading } = useSupportStore();
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_website: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact_name || !formData.contact_email || !formData.description) {
      return;
    }
    try {
      await createTicket(formData);
      setFormData({ contact_name: '', contact_email: '', contact_website: '', description: '' });
      setSubmitted(true);
      fetchTickets(); // Refresh ticket list
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to create ticket', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-6 md:px-10 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-lemon">Support</h1>
          <p className="text-foreground/60 mt-1">Create a support ticket or view your existing ones</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — Ticket Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-secondary rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Create a Support Ticket</h2>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Ticket Submitted!</h3>
                  <p className="text-foreground/60 text-sm max-w-md mx-auto">
                    Your support ticket has been created. You can track its progress and reply in your support history.
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-lg bg-secondary text-foreground hover:bg-secondary/70 transition-colors text-sm font-medium"
                    >
                      Create Another
                    </button>
                    <button
                      onClick={() => router.push('/support-history')}
                      className="px-6 py-3 rounded-lg bg-lemon text-black hover:bg-lemon/90 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      View Support History <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-foreground/70 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        name="contact_name"
                        placeholder="Full name"
                        value={formData.contact_name}
                        onChange={handleChange}
                        required
                        className="w-full p-3.5 rounded-lg bg-background border border-secondary text-foreground placeholder-foreground/40 outline-none focus:border-lemon transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-foreground/70 mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="contact_email"
                        placeholder="your@email.com"
                        value={formData.contact_email}
                        onChange={handleChange}
                        required
                        className="w-full p-3.5 rounded-lg bg-background border border-secondary text-foreground placeholder-foreground/40 outline-none focus:border-lemon transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-foreground/70 mb-1.5">Website (optional)</label>
                    <input
                      type="text"
                      name="contact_website"
                      placeholder="https://yourwebsite.com"
                      value={formData.contact_website}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-lg bg-background border border-secondary text-foreground placeholder-foreground/40 outline-none focus:border-lemon transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-foreground/70 mb-1.5">Describe your issue *</label>
                    <textarea
                      name="description"
                      placeholder="Please describe what you need help with..."
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="w-full p-3.5 rounded-lg bg-background border border-secondary text-foreground placeholder-foreground/40 outline-none focus:border-lemon transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg text-black font-semibold bg-lemon hover:bg-lemon/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Ticket'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT — Contact Info + Recent Tickets */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-card border border-secondary rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-lemon w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/80">support@orr.solutions</p>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="text-lemon w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/80 leading-tight">
                    4074 Ebert Summit Suite 375<br />Lake Leonardchester
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-lemon w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/80">+44 123 654 7890</p>
                </div>
              </div>
            </div>

            {/* Recent Tickets */}
            <div className="bg-card border border-secondary rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Recent Tickets</h3>
                {tickets.length > 0 && (
                  <button
                    onClick={() => router.push('/support-history')}
                    className="text-xs text-lemon hover:text-lemon/80 transition-colors"
                  >
                    View All
                  </button>
                )}
              </div>

              {isLoading ? (
                <div className="flex justify-center py-6">
                  <div className="w-6 h-6 border-2 border-lemon border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 text-foreground/20 mx-auto mb-2" />
                  <p className="text-foreground/50 text-sm">No tickets yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {tickets.slice(0, 5).map((ticket) => {
                    const status = statusConfig[ticket.status] || statusConfig.new;
                    return (
                      <div
                        key={ticket.id}
                        onClick={() => router.push('/support-history')}
                        className="p-3 bg-background/50 rounded-lg border border-secondary/50 hover:border-lemon/30 cursor-pointer transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{ticket.subject || ticket.ticket_id}</p>
                            <p className="text-xs text-foreground/50 mt-0.5">{formatDate(ticket.created_at)}</p>
                          </div>
                          <span className={`flex items-center gap-1 text-xs capitalize ${status.color}`}>
                            {status.icon}
                            {ticket.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
