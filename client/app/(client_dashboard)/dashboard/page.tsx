"use client";

import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip } from 'recharts';
import { Search, Bell, Calendar, Clock, Headphones, Wallet, TrendingUp, Users, MousePointer, DollarSign, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMeetingStore } from '@/store/meetingStore';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, trend }) => {
  return (
    <div className="bg-card border border-secondary rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
          {icon}
        </div>
        {change && (
          <span className={`text-xs px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-foreground opacity-70 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const { fetchMyMeetings, getUpcomingMeetings, isLoading } = useMeetingStore();

  useEffect(() => {
    fetchMyMeetings();
  }, [fetchMyMeetings]);

  const upcomingMeetings = getUpcomingMeetings();

  const formatMeetingDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.getDate().toString(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    };
  };

  const formatMeetingType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <main className="min-h-full p-6 bg-background">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-foreground opacity-60 mt-1">Welcome back! Here's your overview</p>
          </div>

          <div className="flex items-center gap-4">
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground opacity-40 w-4 h-4" />
                <input
                  className="pl-10 pr-4 py-2 bg-card border border-secondary rounded-lg text-foreground placeholder:opacity-60 focus:border-primary outline-none w-80"
                  placeholder="Search anything..."
                />
              </div> */}
            
            <button 
              onClick={() => router.push('/updates')}
              className="relative p-3 rounded-lg bg-card border border-secondary hover:bg-secondary transition-colors"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Users className="w-6 h-6 text-white" />}
            title="Total Meetings"
            value="24"
            change="+12%"
            trend="up"
          />
          <StatCard 
            icon={<MousePointer className="w-6 h-6 text-white" />}
            title="Engagement Rate"
            value="89%"
            change="+5%"
            trend="up"
          />
          <StatCard 
            icon={<DollarSign className="w-6 h-6 text-white" />}
            title="Revenue"
            value="$12,450"
            change="+8%"
            trend="up"
          />
          <StatCard 
            icon={<Package className="w-6 h-6 text-white" />}
            title="Active Projects"
            value="12"
            change="-2%"
            trend="down"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-card border border-secondary rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl">
                  👋
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Good morning!</h2>
                  <p className="text-foreground opacity-60">Ready to tackle today's goals?</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-sm text-foreground opacity-70">Active Projects</p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <p className="text-sm text-foreground opacity-70">Completed This Month</p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <p className="text-sm text-foreground opacity-70">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-card border border-secondary rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Performance Overview</h3>
                <div className="flex items-center gap-2 text-sm text-foreground opacity-60">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>This Month</span>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Jan', value: 120 },
                    { month: 'Feb', value: 180 },
                    { month: 'Mar', value: 90 },
                    { month: 'Apr', value: 200 },
                    { month: 'May', value: 150 },
                    { month: 'Jun', value: 170 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-secondary)" />
                    <XAxis dataKey="month" stroke="var(--color-foreground)" opacity={0.6} />
                    <YAxis stroke="var(--color-foreground)" opacity={0.6} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-card)', 
                        border: '1px solid var(--color-secondary)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-primary)" 
                      strokeWidth={3}
                      dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Card */}
            <div className="bg-card border border-secondary rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-foreground">My Wallet</h4>
              </div>
              <p className="text-sm text-foreground opacity-60 mb-2">Current Balance</p>
              <p className="text-3xl font-bold text-primary mb-4">$735.20</p>
              <button 
                onClick={() => router.push('/account/wallet')}
                className="w-full py-3 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
              >
                View My Wallet
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-secondary rounded-xl p-6">
              <h5 className="font-semibold text-foreground mb-4">Quick Actions</h5>
              <div className="space-y-3">
                {[
                  { icon: <Calendar className="w-5 h-5" />, title: "Schedule Meeting", desc: "Book consultation", path: "/meeting-request" },
                  { icon: <Clock className="w-5 h-5" />, title: "View Schedule", desc: "Upcoming consultations", path: "/scheduling" },
                  { icon: <Headphones className="w-5 h-5" />, title: "Get Support", desc: "Contact our team", path: "/support" },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => router.push(action.path)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-primary/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      {action.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">{action.title}</p>
                      <p className="text-xs text-foreground opacity-60">{action.desc}</p>
                    </div>
                    <div className="text-primary group-hover:translate-x-1 transition-transform">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Consultations */}
            <div className="bg-card border border-secondary rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h6 className="font-semibold text-foreground">Upcoming Consultations</h6>
                {upcomingMeetings.length > 0 && (
                  <button 
                    onClick={() => router.push('/consultations/upcoming-consultations')}
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    View All
                  </button>
                )}
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : upcomingMeetings.length > 0 ? (
                  upcomingMeetings.map((meeting) => {
                    const { date, day, time } = formatMeetingDate(meeting.requested_datetime);
                    return (
                      <div key={meeting.id} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer"
                           onClick={() => router.push('/consultations/upcoming-consultations')}>
                        <div className="text-center min-w-[45px] flex-shrink-0">
                          <div className="text-lg font-bold text-primary">{date}</div>
                          <div className="text-xs text-foreground opacity-60">{day}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{formatMeetingType(meeting.meeting_type)}</p>
                          <p className="text-xs text-foreground opacity-60">{time}</p>
                          <p className="text-xs text-primary capitalize">{meeting.status}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-foreground opacity-30 mx-auto mb-3" />
                    <p className="text-foreground opacity-60 text-sm">No upcoming consultations</p>
                    <button 
                      onClick={() => router.push('/meeting-request')}
                      className="text-xs text-primary hover:text-primary/80 transition-colors mt-2"
                    >
                      Schedule your first meeting
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}