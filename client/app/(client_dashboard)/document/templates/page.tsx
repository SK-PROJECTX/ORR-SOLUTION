"use client";

import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Star, FileText, Calendar, Users, Briefcase, PlusCircle, Grid, List } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'document' | 'form' | 'report';
  downloads: number;
  rating: number;
  lastUpdated: string;
  tags: string[];
  preview?: string;
  filePath?: string;
}

const templates: Template[] = [
  {
    id: '1',
    title: 'Business Strategy Report Template',
    description: 'Comprehensive template for strategic business analysis and planning',
    category: 'Strategy',
    type: 'report',
    downloads: 1250,
    rating: 4.8,
    lastUpdated: '2024-01-15',
    tags: ['strategy', 'business', 'analysis'],
    preview: '/images/template-preview-1.jpg'
  },
  {
    id: '2',
    title: 'Client Consultation Form',
    description: 'Structured form for initial client consultations and requirements gathering',
    category: 'Consultation',
    type: 'form',
    downloads: 890,
    rating: 4.6,
    lastUpdated: '2024-01-12',
    tags: ['consultation', 'client', 'form']
  },
  {
    id: '3',
    title: 'ORR Cookies Policy V1.4',
    description: 'Official ORR cookies policy document outlining data collection and usage practices',
    category: 'Legal',
    type: 'document',
    downloads: 245,
    rating: 4.9,
    lastUpdated: '2026-01-05',
    tags: ['legal', 'cookies', 'policy', 'privacy'],
    filePath: '20260105_ORR_Cookiespolicy_V1.4.docx'
  },
  {
    id: '4',
    title: 'ORR Privacy Policy V1.5',
    description: 'Comprehensive privacy policy document detailing data protection and user rights',
    category: 'Legal',
    type: 'document',
    downloads: 312,
    rating: 4.9,
    lastUpdated: '2026-01-05',
    tags: ['legal', 'privacy', 'policy', 'data-protection'],
    filePath: '20260105_ORR_Privacypolicy_V1.5.docx'
  }
];

const categories = ['All', 'Strategy', 'Consultation', 'Proposals', 'Risk Management', 'Reports', 'Analysis'];
const types = ['All', 'document', 'form', 'report'];

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesType = selectedType === 'All' || template.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownload = (template: Template) => {
    if (template.filePath) {
      const link = document.createElement('a');
      link.href = `/document/templates/${template.filePath}`;
      link.download = template.filePath;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-5 h-5" />;
      case 'form': return <Users className="w-5 h-5" />;
      case 'report': return <Briefcase className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const TemplateCard = ({ template }: { template: Template }) => (
    <div className="bg-card border border-secondary rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-white">
            {getTypeIcon(template.type)}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {template.title}
            </h3>
            <span className="text-xs px-2 py-1 bg-secondary/50 rounded-full text-foreground/70">
              {template.category}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{template.rating}</span>
        </div>
      </div>
      
      <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{template.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {template.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      
      {/* <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
        <span>{template.downloads} downloads</span>
        <span>Updated {new Date(template.lastUpdated).toLocaleDateString()}</span>
      </div>
       */}
      <div className="flex gap-2">
        <button 
          onClick={() => handleDownload(template)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button className="p-2 border border-secondary rounded-lg hover:border-primary hover:bg-primary/10 transition-colors">
          <Eye className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </div>
  );

  const TemplateListItem = ({ template }: { template: Template }) => (
    <div className="bg-card border border-secondary rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
          {getTypeIcon(template.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{template.title}</h3>
            <span className="text-xs px-2 py-1 bg-secondary/50 rounded-full text-foreground/70 flex-shrink-0">
              {template.category}
            </span>
          </div>
          <p className="text-foreground/70 text-sm truncate">{template.description}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-foreground/60">
            <span>{template.downloads} downloads</span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-3 h-3 fill-current" />
              <span>{template.rating}</span>
            </div>
            <span>Updated {new Date(template.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <button 
            onClick={() => handleDownload(template)}
            className="flex items-center gap-2 py-2 px-4 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button className="p-2 border border-secondary rounded-lg hover:border-primary hover:bg-primary/10 transition-colors">
            <Eye className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-full p-6 bg-background">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">ORR's Templates</h1>
            <p className="text-foreground/60 mt-1">Professional templates to streamline your workflow</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium w-fit">
            <PlusCircle className="w-4 h-4" />
            Request Template
          </button>
        </header>

        {/* Search and Filters */}
        <div className="bg-card border border-secondary rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates, categories, or tags..."
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
              
              <div className="flex border border-secondary rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid' ? 'bg-primary text-black' : 'hover:bg-secondary/50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list' ? 'bg-primary text-black' : 'hover:bg-secondary/50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-secondary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
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
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
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
            Showing {filteredTemplates.length} of {templates.length} templates
          </p>
          
          <div className="flex gap-2">
            {selectedCategory !== 'All' && (
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                {selectedCategory}
              </span>
            )}
            {selectedType !== 'All' && (
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                {selectedType}
              </span>
            )}
          </div>
        </div>

        {/* Templates Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map(template => (
              <TemplateListItem key={template.id} template={template} />
            ))}
          </div>
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No templates found</h3>
            <p className="text-foreground/60 mb-4">Try adjusting your search criteria or filters</p>
            <button className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
