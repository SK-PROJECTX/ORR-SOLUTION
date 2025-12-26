"use client";

import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, FileText, Calendar, Clock, CheckCircle, AlertCircle, XCircle, Plus, MoreHorizontal, User, Building } from 'lucide-react';

interface Contract {
  id: string;
  title: string;
  client: string;
  type: 'service' | 'consulting' | 'retainer' | 'project';
  status: 'draft' | 'pending' | 'active' | 'completed' | 'expired' | 'cancelled';
  value: number;
  startDate: string;
  endDate: string;
  lastModified: string;
  description: string;
  progress?: number;
}

const contracts: Contract[] = [
  {
    id: 'CON-001',
    title: 'Strategic Business Consulting Agreement',
    client: 'TechCorp Solutions',
    type: 'consulting',
    status: 'active',
    value: 75000,
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    lastModified: '2024-01-20',
    description: 'Comprehensive business strategy development and implementation support',
    progress: 65
  },
  {
    id: 'CON-002',
    title: 'Digital Transformation Project',
    client: 'RetailMax Inc.',
    type: 'project',
    status: 'pending',
    value: 120000,
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    lastModified: '2024-01-18',
    description: 'End-to-end digital transformation initiative for retail operations'
  },
  {
    id: 'CON-003',
    title: 'Monthly Advisory Retainer',
    client: 'StartupXYZ',
    type: 'retainer',
    status: 'active',
    value: 15000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    lastModified: '2024-01-22',
    description: 'Ongoing strategic advisory services and business mentorship',
    progress: 25
  },
  {
    id: 'CON-004',
    title: 'Risk Assessment Services',
    client: 'FinanceFirst Bank',
    type: 'service',
    status: 'completed',
    value: 45000,
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    lastModified: '2024-01-05',
    description: 'Comprehensive risk assessment and mitigation strategy development',
    progress: 100
  },
  {
    id: 'CON-005',
    title: 'Operational Excellence Program',
    client: 'ManufacturingPro Ltd.',
    type: 'consulting',
    status: 'draft',
    value: 95000,
    startDate: '2024-03-01',
    endDate: '2024-09-01',
    lastModified: '2024-01-25',
    description: 'Operational efficiency improvement and process optimization'
  },
  {
    id: 'CON-006',
    title: 'Market Entry Strategy',
    client: 'GlobalTech Ventures',
    type: 'project',
    status: 'expired',
    value: 60000,
    startDate: '2023-06-01',
    endDate: '2023-12-01',
    lastModified: '2023-12-15',
    description: 'Strategic market analysis and entry planning for European markets'
  }
];

const statusConfig = {
  draft: { icon: Edit, color: 'text-gray-400', bg: 'bg-gray-400/20', label: 'Draft' },
  pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/20', label: 'Pending' },
  active: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20', label: 'Active' },
  completed: { icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-400/20', label: 'Completed' },
  expired: { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-400/20', label: 'Expired' },
  cancelled: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/20', label: 'Cancelled' }
};

const typeConfig = {
  service: { label: 'Service Agreement', icon: FileText },
  consulting: { label: 'Consulting', icon: User },
  retainer: { label: 'Retainer', icon: Calendar },
  project: { label: 'Project Contract', icon: Building }
};

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('lastModified');

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || contract.status === selectedStatus;
    const matchesType = selectedType === 'all' || contract.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'value') return b.value - a.value;
    if (sortBy === 'startDate') return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
  });

  const getStatusStats = () => {
    const stats = contracts.reduce((acc, contract) => {
      acc[contract.status] = (acc[contract.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: contracts.length,
      active: stats.active || 0,
      pending: stats.pending || 0,
      completed: stats.completed || 0,
      draft: stats.draft || 0
    };
  };

  const stats = getStatusStats();
  const totalValue = contracts.reduce((sum, contract) => sum + contract.value, 0);

  const StatusBadge = ({ status }: { status: keyof typeof statusConfig }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const ContractCard = ({ contract }: { contract: Contract }) => (
    <div className="bg-card border border-secondary rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground text-lg">{contract.title}</h3>
            <StatusBadge status={contract.status} />
          </div>
          <p className="text-foreground/60 text-sm mb-1">{contract.client}</p>
          <p className="text-xs text-foreground/50">{contract.id}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-foreground/60" />
          </button>
        </div>
      </div>
      
      <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{contract.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-foreground/50 mb-1">Contract Value</p>
          <p className="font-semibold text-primary">${contract.value.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-foreground/50 mb-1">Type</p>
          <p className="text-sm text-foreground">{typeConfig[contract.type].label}</p>
        </div>
      </div>
      
      {contract.progress !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-foreground/50">Progress</span>
            <span className="text-xs font-medium text-foreground">{contract.progress}%</span>
          </div>
          <div className="w-full bg-secondary/30 rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${contract.progress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between text-xs text-foreground/50 mb-4">
        <span>Start: {new Date(contract.startDate).toLocaleDateString()}</span>
        <span>End: {new Date(contract.endDate).toLocaleDateString()}</span>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Eye className="w-4 h-4" />
          View
        </button>
        <button className="flex items-center justify-center gap-2 py-2 px-4 border border-secondary rounded-lg hover:border-primary hover:bg-primary/10 transition-colors">
          <Download className="w-4 h-4 text-foreground" />
        </button>
        <button className="flex items-center justify-center gap-2 py-2 px-4 border border-secondary rounded-lg hover:border-primary hover:bg-primary/10 transition-colors">
          <Edit className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-full p-6 bg-background">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contracts</h1>
            <p className="text-foreground/60 mt-1">Manage and track all your business contracts</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium w-fit">
            <Plus className="w-4 h-4" />
            New Contract
          </button>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-card border border-secondary rounded-xl p-4">
            <p className="text-xs text-foreground/50 mb-1">Total Contracts</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card border border-secondary rounded-xl p-4">
            <p className="text-xs text-foreground/50 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          </div>
          <div className="bg-card border border-secondary rounded-xl p-4">
            <p className="text-xs text-foreground/50 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </div>
          <div className="bg-card border border-secondary rounded-xl p-4">
            <p className="text-xs text-foreground/50 mb-1">Completed</p>
            <p className="text-2xl font-bold text-blue-400">{stats.completed}</p>
          </div>
          <div className="bg-card border border-secondary rounded-xl p-4">
            <p className="text-xs text-foreground/50 mb-1">Draft</p>
            <p className="text-2xl font-bold text-gray-400">{stats.draft}</p>
          </div>
          <div className="bg-card border border-secondary rounded-xl p-4">
            <p className="text-xs text-foreground/50 mb-1">Total Value</p>
            <p className="text-xl font-bold text-primary">${totalValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-secondary rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search contracts, clients, or contract IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-secondary rounded-lg text-foreground placeholder:text-foreground/40 focus:border-primary outline-none"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  showFilters ? 'bg-primary text-black border-primary' : 'border-secondary hover:border-primary'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none"
              >
                <option value="lastModified">Last Modified</option>
                <option value="startDate">Start Date</option>
                <option value="value">Contract Value</option>
              </select>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-secondary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none"
                  >
                    <option value="all">All Statuses</option>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none"
                  >
                    <option value="all">All Types</option>
                    {Object.entries(typeConfig).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-foreground/60">
            Showing {filteredContracts.length} of {contracts.length} contracts
          </p>
          
          <div className="flex gap-2">
            {selectedStatus !== 'all' && (
              <StatusBadge status={selectedStatus as keyof typeof statusConfig} />
            )}
            {selectedType !== 'all' && (
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                {typeConfig[selectedType as keyof typeof typeConfig].label}
              </span>
            )}
          </div>
        </div>

        {/* Contracts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContracts.map(contract => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No contracts found</h3>
            <p className="text-foreground/60 mb-4">Try adjusting your search criteria or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
                setSelectedType('all');
              }}
              className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
