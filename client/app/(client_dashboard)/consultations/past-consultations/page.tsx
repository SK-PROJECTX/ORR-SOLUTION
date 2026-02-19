"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, FileText, Star, Search, Filter, Link as LinkIcon, Loader2 } from 'lucide-react';

interface PastConsultation {
  id: number;
  client_name: string;
  title: string;
  type_display: string;
  status: 'requested' | 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  status_display: string;
  color: string;
  formatted_date: string;
  formatted_time: string;
  meeting_notes: string;
  outcome: string;
  rating: string;
  meeting_link: string;
}

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

const RatingStars = ({ rating }: { rating?: string }) => {
  if (!rating) return null;
  
  const numericRating = parseFloat(rating) || 0;
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= numericRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
        />
      ))}
      <span className="text-xs text-foreground opacity-60 ml-1">({numericRating}/5)</span>
    </div>
  );
};

export default function PastConsultationsPage() {
  const [consultations, setConsultations] = useState<PastConsultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('-formatted_date');

  const fetchPastConsultations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }

      // Build query params
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (sortBy) params.append('ordering', sortBy);
      
      const queryString = params.toString();
      const url = `https://orr-backend.orr.solutions/past-consultations/${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Handle different response formats
        let consultationsArray: PastConsultation[] = [];
        if (Array.isArray(data)) {
          consultationsArray = data;
        } else if (data && Array.isArray(data.data)) {
          consultationsArray = data.data;
        } else if (data && Array.isArray(data.results)) {
          consultationsArray = data.results;
        }
        
        setConsultations(consultationsArray);
      } else {
        console.error('Failed to fetch past consultations:', response.status);
        setError('Failed to fetch past consultations');
      }
    } catch (err) {
      console.error('Error fetching past consultations:', err);
      setError('An error occurred while fetching consultations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPastConsultations();
  }, [sortBy]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPastConsultations();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredConsultations = consultations
    .filter(consultation => {
      const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
      return matchesStatus;
    });

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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary border border-secondary rounded-md px-3 py-2 text-foreground text-sm"
          >
            <option value="-formatted_date">Sort by Date (Newest)</option>
            <option value="formatted_date">Sort by Date (Oldest)</option>
            <option value="-rating">Sort by Rating (High)</option>
            <option value="rating">Sort by Rating (Low)</option>
            <option value="client_name">Sort by Client (A-Z)</option>
            <option value="-client_name">Sort by Client (Z-A)</option>
          </select>

          <div className="ml-auto text-sm text-foreground opacity-60">
            {filteredConsultations.length} of {consultations.length} consultations
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="ml-3 text-foreground opacity-60">Loading consultations...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">{error}</div>
            <button
              onClick={fetchPastConsultations}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Consultations Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredConsultations.map((consultation) => (
              <div key={consultation.id} className="bg-card border border-secondary rounded-xl p-6 hover:shadow-lg transition-shadow" style={consultation.color ? { borderLeftColor: consultation.color, borderLeftWidth: '4px' } : {}}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{consultation.title}</h3>
                    {consultation.type_display && (
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-secondary text-foreground">
                        {consultation.type_display}
                      </span>
                    )}
                  </div>
                  <StatusBadge status={consultation.status_display || consultation.status} />
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-foreground opacity-70">
                    <Calendar className="w-4 h-4" />
                    <span>{consultation.formatted_date}</span>
                  </div>
                  
                  {consultation.formatted_time && (
                    <div className="flex items-center gap-2 text-sm text-foreground opacity-70">
                      <Clock className="w-4 h-4" />
                      <span>{consultation.formatted_time}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-foreground opacity-70">
                    <User className="w-4 h-4" />
                    <span>{consultation.client_name}</span>
                  </div>
                </div>

                {/* Rating */}
                {consultation.rating && (
                  <div className="mb-4">
                    <RatingStars rating={consultation.rating} />
                  </div>
                )}

                {/* Notes */}
                {consultation.meeting_notes && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Notes</span>
                    </div>
                    <p className="text-sm text-foreground opacity-70 bg-secondary/30 p-3 rounded-lg">
                      {consultation.meeting_notes}
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
                {/* <div className="flex gap-2 pt-4 border-t border-secondary">
                  {consultation.meeting_link && (
                    <a
                      href={consultation.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Meeting Link
                    </a>
                  )}
                  <button className="flex-1 py-2 px-3 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                    View Details
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredConsultations.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-foreground opacity-30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No consultations found</h3>
            <p className="text-foreground opacity-60">
              {searchTerm || filterStatus !== 'all' 
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