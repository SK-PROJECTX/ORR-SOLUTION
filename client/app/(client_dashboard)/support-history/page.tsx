"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, MessageSquare, Clock, CheckCircle, Send } from "lucide-react";
import { useSupportStore } from "@/store/supportStore";

interface TicketMessage {
  id: number;
  message: string;
  sender: {
    username: string;
    first_name: string;
    last_name: string;
  };
  created_at: string;
  is_internal: boolean;
}

interface Ticket {
  id: number;
  ticket_id: string;
  subject: string;
  status: string;
  priority: string;
  source: string;
  created_at: string;
  messages?: TicketMessage[];
}

export default function SupportHistory() {
  const { tickets, isLoading, fetchTickets } = useSupportStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [clientTickets, setClientTickets] = useState<Ticket[]>([]);
  const [ticketMessages, setTicketMessages] = useState<{[key: number]: TicketMessage[]}>({});
  const [newMessage, setNewMessage] = useState<{[key: number]: string}>({});
  const [sendingMessage, setSendingMessage] = useState<number | null>(null);

  useEffect(() => {
    fetchTickets();
    fetchClientTickets();
  }, [fetchTickets]);

  const fetchClientTickets = async () => {
    try {
      // Use the correct token key from localStorage
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      console.log('Fetching tickets with token:', token ? 'Token exists' : 'No token');
      
      const response = await fetch('https://orr-backend-web-latest.onrender.com/tickets/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle different response formats
        let ticketsArray = [];
        if (Array.isArray(data)) {
          ticketsArray = data;
        } else if (data && Array.isArray(data.data)) {
          ticketsArray = data.data;
        } else if (data && Array.isArray(data.results)) {
          ticketsArray = data.results;
        } else if (data && Array.isArray(data.tickets)) {
          ticketsArray = data.tickets;
        } else {
          console.error('Unexpected response format:', data);
          return;
        }
        
        setClientTickets(ticketsArray);
      } else {
        console.error('Failed to fetch tickets:', response.status, response.statusText);
        if (response.status === 401) {
          console.error('Authentication failed - check your login status');
        }
      }
    } catch (error) {
      console.error('Failed to fetch client tickets:', error);
    }
  };

  const fetchTicketMessages = async (ticketId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        console.error('No authentication token found for messages');
        return;
      }
      
      const response = await fetch(`https://orr-backend-web-latest.onrender.com/tickets/${ticketId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const ticketData = await response.json();
        // Extract messages from ticket data
        const messages = ticketData.messages || [];
        setTicketMessages(prev => ({ ...prev, [ticketId]: messages }));
      } else {
        console.error('Failed to fetch messages:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch ticket messages:', error);
    }
  };

  const sendMessage = async (ticketId: number) => {
    const message = newMessage[ticketId]?.trim();
    if (!message) return;

    try {
      setSendingMessage(ticketId);
      
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        console.error('No authentication token found for sending message');
        return;
      }
      
      const response = await fetch(`https://orr-backend-web-latest.onrender.com/tickets/${ticketId}/send-message/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        // Refresh messages
        await fetchTicketMessages(ticketId);
        setNewMessage(prev => ({ ...prev, [ticketId]: '' }));
      } else {
        console.error('Failed to send message:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSendingMessage(null);
    }
  };

  const handleTicketClick = async (index: number, ticketId: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      if (!ticketMessages[ticketId]) {
        await fetchTicketMessages(ticketId);
      }
    }
  };

  const allTickets = [...(tickets || []), ...clientTickets];

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-6 md:p-12">
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

        <div className="bg-card p-4 rounded-3xl">
          <div className="w-full bg-card rounded-3xl p-10 shadow-lg relative border border-secondary">
            <h2 className="text-2xl font-semibold mb-10 text-foreground">History</h2>

            <div className="absolute left-10 top-32 bottom-10 w-[4px] bg-lemon rounded-full" />

            <div className="flex flex-col gap-6 ml-10">
              {isLoading ? (
                <div className="text-center py-8 text-foreground/70">
                  Loading support history...
                </div>
              ) : allTickets.length === 0 ? (
                <div className="text-center py-8 text-foreground/70">
                  No support tickets found
                </div>
              ) : (
                allTickets.map((ticket, i) => {
                  const messages = ticketMessages[ticket.id] || [];
                  const hasAutoReply = messages.some(msg => msg.sender.username === 'system_auto_reply');
                  
                  return (
                    <div
                      key={ticket.ticket_id}
                      className="w-full bg-lemon rounded-xl p-6 pr-12 relative transition-all text-background"
                    >
                      <div 
                        className="cursor-pointer"
                        onClick={() => handleTicketClick(i, ticket.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-bold">ID: {ticket.ticket_id}</p>
                          <div className="flex items-center gap-2">
                            {hasAutoReply && (
                              <span className="text-xs px-2 py-1 rounded bg-green-600 text-white font-semibold flex items-center gap-1">
                                <CheckCircle size={12} />
                                Auto-replied
                              </span>
                            )}
                            <span className="text-xs px-2 py-1 rounded bg-background/20 font-semibold uppercase">
                              {ticket.status}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{ticket.subject || 'No Subject'}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-90 mb-2">
                          <p><span className="font-medium">Priority:</span> {ticket.priority}</p>
                          <p><span className="font-medium">Source:</span> {ticket.source}</p>
                          <p><span className="font-medium">Date:</span> {new Date(ticket.created_at).toLocaleDateString()}</p>
                          {messages.length > 0 && (
                            <p><span className="font-medium">Messages:</span> {messages.length}</p>
                          )}
                        </div>

                        <div className="absolute right-6 top-1/2 -translate-y-1/2">
                          <ChevronDown
                            className={`text-background text-xl transition-all ${
                              openIndex === i ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {/* Expanded Section */}
                      {openIndex === i && (
                        <div className="mt-4 text-sm text-background/90 border-t border-background/20 pt-4">
                          {/* Messages */}
                          {messages.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <MessageSquare size={16} />
                                Conversation
                              </h4>
                              <div className="space-y-3 max-h-60 overflow-y-auto">
                                {messages.map((message) => (
                                  <div key={message.id} className="bg-background/10 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium">
                                        {message.sender.username === 'system_auto_reply' 
                                          ? '🤖 Auto Reply System' 
                                          : `${message.sender.first_name} ${message.sender.last_name}`.trim() || message.sender.username
                                        }
                                      </span>
                                      <span className="text-xs opacity-70">
                                        {new Date(message.created_at).toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-sm">{message.message}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Send Message */}
                          <div className="mt-4">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage[ticket.id] || ''}
                                onChange={(e) => setNewMessage(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage(ticket.id)}
                                className="flex-1 px-3 py-2 bg-background/20 border border-background/30 rounded-lg text-background placeholder-background/60 focus:outline-none focus:border-background/50"
                              />
                              <button
                                onClick={() => sendMessage(ticket.id)}
                                disabled={sendingMessage === ticket.id || !newMessage[ticket.id]?.trim()}
                                className="px-4 py-2 bg-background text-lemon rounded-lg hover:bg-background/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                              >
                                {sendingMessage === ticket.id ? (
                                  <Clock className="animate-spin" size={16} />
                                ) : (
                                  <Send size={16} />
                                )}
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
