"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, FileText, Star, Search, Filter, ChevronDown } from 'lucide-react';
import { useSchedulingStore } from '@/store/schedulingStore';

interface PastConsultation {
  id: number;
  title: string;
  type: string;
  date: string;
  duration: string;
  client: string;
  status: 'completed' | 'cancelled' | 'no-show';
  rating?: number;
  notes?: string;
  outcome?: string;
}

// Mock data for past consultations
const mockPastConsultations: PastConsultation[] = [
  {
    id: 1,
    title: "Strategy Consultation",
    type: "Discovery",
    date: "2024-01-15",
    duration: "60 min",
    client: "John Smith",
    status: "completed",
    rating: 5,
    notes: "Discussed digital transformation roadmap",
    outcome: "Follow-up meeting scheduled"
  },
  {
    id: 2,
    title: "Project Review",
    type: "Follow-up",
    date: "2024-01-10",
    duration: "45 min",
    client: "Tech Corp",
    status: "completed",
    rating: 4,
    notes: "Reviewed implementation progress",
    outcome: "Action items assigned"
  },
  {
    id: 3,
    title: "Initial Assessment",
    type: "First meeting",
    date: "2024-01-08",
    duration: "90 min",
    client: "StartupXYZ",
    status: "completed",
    rating: 5,
    notes: "Comprehensive business analysis",
    outcome: "Discovery meeting proposed"
  },
  {
    id: 4,
    title: "Report Presentation",
    type: "Report review",
    date: "2024-01-05",
    duration: "75 min",
    client: "Enterprise Ltd",
    status: "completed",
    rating: 4,
    notes: "Presented findings and recommendations",
    outcome: "Implementation plan approved"
  },
  {
    id: 5,
    title: "Quick Check-in",
    type: "Follow-up",
    date: "2024-01-03",
    duration: "30 min",
    client: "Local Business",
    status: "cancelled",
    notes: "Client requested reschedule"
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'no-show':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-secondary text-foreground border-secondary';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RatingStars = ({ rating }: { rating?: number }) => {
  if (!rating) return null;
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
        />
      ))}
      <span className="text-xs text-foreground opacity-60 ml-1">({rating}/5)</span>
    </div>
  );
};

export default function PastConsultationsPage() {
  const [consultations, setConsultations] = useState<PastConsultation[]>(mockPastConsultations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredConsultations = consultations
    .filter(consultation => {
      const matchesSearch = consultation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           consultation.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
      const matchesType = filterType === 'all' || consultation.type === filterType;
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'client':
          return a.client.localeCompare(b.client);
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Discovery':
        return 'bg-blue-500/20 text-blue-400';
      case 'First meeting':
        return 'bg-green-500/20 text-green-400';
      case 'Follow-up':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Report review':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-secondary text-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Past Consultations</h1>
            <p className="text-foreground opacity-60">Review your consultation history and outcomes</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground opacity-40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search consultations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-card border border-secondary rounded-lg text-foreground placeholder:opacity-60 focus:border-primary outline-none w-80"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-card rounded-lg border border-secondary">
          <Filter className="w-5 h-5 text-primary" />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-secondary border border-secondary rounded-md px-3 py-2 text-foreground text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-secondary border border-secondary rounded-md px-3 py-2 text-foreground text-sm"
          >
            <option value="all">All Types</option>
            <option value="First meeting">First Meeting</option>
            <option value="Discovery">Discovery</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Report review">Report Review</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary border border-secondary rounded-md px-3 py-2 text-foreground text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="client">Sort by Client</option>
          </select>

          <div className="ml-auto text-sm text-foreground opacity-60">
            {filteredConsultations.length} of {consultations.length} consultations
          </div>
        </div>

        {/* Consultations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredConsultations.map((consultation) => (
            <div key={consultation.id} className="bg-card border border-secondary rounded-xl p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{consultation.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(consultation.type)}`}>
                    {consultation.type}
                  </span>
                </div>
                <StatusBadge status={consultation.status} />
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-foreground opacity-70">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(consultation.date)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-foreground opacity-70">
                  <Clock className="w-4 h-4" />
                  <span>{consultation.duration}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-foreground opacity-70">
                  <User className="w-4 h-4" />
                  <span>{consultation.client}</span>
                </div>
              </div>

              {/* Rating */}
              {consultation.rating && (
                <div className="mb-4">
                  <RatingStars rating={consultation.rating} />
                </div>
              )}

              {/* Notes */}
              {consultation.notes && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Notes</span>
                  </div>
                  <p className="text-sm text-foreground opacity-70 bg-secondary/30 p-3 rounded-lg">
                    {consultation.notes}
                  </p>
                </div>
              )}

              {/* Outcome */}
              {consultation.outcome && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-primary mb-1">Outcome</div>
                  <p className="text-sm text-foreground opacity-70">
                    {consultation.outcome}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-secondary">
                <button className="flex-1 py-2 px-3 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                  View Details
                </button>
                <button className="flex-1 py-2 px-3 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredConsultations.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-foreground opacity-30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No consultations found</h3>
            <p className="text-foreground opacity-60">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all' 
                ? 'Try adjusting your filters or search terms'
                : 'Your past consultations will appear here once completed'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}