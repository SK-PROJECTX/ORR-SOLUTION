"use client";

import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, Filter, Search, BarChart3, TrendingUp } from 'lucide-react';
import { useLanguage, interpolate } from '@/lib/i18n/LanguageContext';

interface Report {
  id: number;
  title: string;
  type: 'analysis' | 'summary' | 'financial' | 'operational';
  date: string;
  status: 'completed' | 'pending' | 'draft';
  size: string;
  description: string;
}

const mockReports: Report[] = [];

export default function ReportsPage() {
  const { t, language: currentLang } = useLanguage();
  const [reports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'draft':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-secondary text-foreground border-secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return <BarChart3 className="w-5 h-5" />;
      case 'summary':
        return <FileText className="w-5 h-5" />;
      case 'financial':
        return <TrendingUp className="w-5 h-5" />;
      case 'operational':
        return <Calendar className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{interpolate(t.dashboard.reports.title)}</h1>
            <p className="text-foreground opacity-60">{interpolate(t.dashboard.reports.subtitle)}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground opacity-40 w-4 h-4" />
              <input
                type="text"
                placeholder={interpolate(t.dashboard.reports.searchPlace)}
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
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-secondary border border-secondary rounded-md px-3 py-2 text-foreground text-sm"
          >
            <option value="all">{interpolate(t.dashboard.reports.allTypes)}</option>
            <option value="analysis">{interpolate(t.dashboard.reports.types.analysis)}</option>
            <option value="summary">{interpolate(t.dashboard.reports.types.summary)}</option>
            <option value="financial">{interpolate(t.dashboard.reports.types.financial)}</option>
            <option value="operational">{interpolate(t.dashboard.reports.types.operational)}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-secondary border border-secondary rounded-md px-3 py-2 text-foreground text-sm"
          >
            <option value="all">{interpolate(t.dashboard.reports.allStatus)}</option>
            <option value="completed">{interpolate(t.dashboard.reports.status.completed)}</option>
            <option value="pending">{interpolate(t.dashboard.reports.status.pending)}</option>
            <option value="draft">{interpolate(t.dashboard.reports.status.draft)}</option>
          </select>

          <div className="ml-auto text-sm text-foreground opacity-60">
            {filteredReports.length} {interpolate(t.dashboard.reports.resultsCount, { count: reports.length })}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-card border border-secondary rounded-xl p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white">
                    {getTypeIcon(report.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{report.title}</h3>
                    <p className="text-sm text-foreground opacity-60 capitalize">{interpolate(t.dashboard.reports.types[report.type] || report.type)}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                  {interpolate(t.dashboard.reports.status[report.status] || report.status)}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground opacity-70 mb-4 line-clamp-2">
                {report.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center justify-between text-sm text-foreground opacity-60 mb-4">
                <span>{new Date(report.date).toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US')}</span>
                <span>{report.size}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                  <Eye className="w-4 h-4" />
                  {interpolate(t.dashboard.common.view)}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                  <Download className="w-4 h-4" />
                  {interpolate(t.dashboard.account.wallet.transactions.download)}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-foreground opacity-30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">{interpolate(t.dashboard.reports.noResults)}</h3>
            <p className="text-foreground opacity-60">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                ? interpolate(t.dashboard.reports.tryAdjust)
                : interpolate(t.dashboard.reports.willAppear)
              }
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-secondary rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {reports.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-sm text-foreground opacity-60">{interpolate(t.dashboard.reports.stats.completed)}</div>
          </div>
          <div className="bg-card border border-secondary rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {reports.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-sm text-foreground opacity-60">{interpolate(t.dashboard.reports.stats.pending)}</div>
          </div>
          <div className="bg-card border border-secondary rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {reports.filter(r => r.status === 'draft').length}
            </div>
            <div className="text-sm text-foreground opacity-60">{interpolate(t.dashboard.reports.stats.draft)}</div>
          </div>
          <div className="bg-card border border-secondary rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">{reports.length}</div>
            <div className="text-sm text-foreground opacity-60">{interpolate(t.dashboard.reports.stats.total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}