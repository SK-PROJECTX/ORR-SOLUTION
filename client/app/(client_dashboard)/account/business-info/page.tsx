"use client";

import React, { useState } from 'react';
import { Save, Edit, Building, MapPin, Phone, Mail, Globe, Users, Calendar, DollarSign, FileText, Camera, Check, X, Plus, Trash2 } from 'lucide-react';

interface BusinessInfo {
  companyName: string;
  legalName: string;
  industry: string;
  businessType: string;
  foundedYear: string;
  employeeCount: string;
  annualRevenue: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  socialMedia: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  keyPersonnel: Array<{
    id: string;
    name: string;
    position: string;
    email: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}

const initialBusinessInfo: BusinessInfo = {
  companyName: 'ORR Consulting Group',
  legalName: 'ORR Consulting Group LLC',
  industry: 'Management Consulting',
  businessType: 'LLC',
  foundedYear: '2018',
  employeeCount: '25-50',
  annualRevenue: '$1M-$5M',
  description: 'Strategic business consulting firm specializing in organizational transformation and operational excellence.',
  website: 'https://orrconsulting.com',
  email: 'info@orrconsulting.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Business District Ave, Suite 400',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  socialMedia: {
    linkedin: 'https://linkedin.com/company/orr-consulting',
    twitter: 'https://twitter.com/orrconsulting',
    facebook: 'https://facebook.com/orrconsulting'
  },
  keyPersonnel: [
    {
      id: '1',
      name: 'John Smith',
      position: 'CEO & Founder',
      email: 'john.smith@orrconsulting.com'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      position: 'COO',
      email: 'sarah.johnson@orrconsulting.com'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'ISO 9001:2015 Quality Management',
      issuer: 'ISO',
      date: '2023-06-15'
    },
    {
      id: '2',
      name: 'Project Management Professional (PMP)',
      issuer: 'PMI',
      date: '2023-03-20'
    }
  ]
};

const industries = [
  'Management Consulting',
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Real Estate',
  'Other'
];

const businessTypes = ['LLC', 'Corporation', 'Partnership', 'Sole Proprietorship', 'Non-Profit'];
const employeeCounts = ['1-10', '11-25', '26-50', '51-100', '101-500', '500+'];
const revenueRanges = ['<$100K', '$100K-$500K', '$500K-$1M', '$1M-$5M', '$5M-$10M', '$10M+'];

export default function BusinessInfoPage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(initialBusinessInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string, section?: string) => {
    setHasChanges(true);
    if (section) {
      setBusinessInfo(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof BusinessInfo] as any,
          [field]: value
        }
      }));
    } else {
      setBusinessInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const addKeyPersonnel = () => {
    const newPerson = {
      id: Date.now().toString(),
      name: '',
      position: '',
      email: ''
    };
    setBusinessInfo(prev => ({
      ...prev,
      keyPersonnel: [...prev.keyPersonnel, newPerson]
    }));
    setHasChanges(true);
  };

  const removeKeyPersonnel = (id: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      keyPersonnel: prev.keyPersonnel.filter(person => person.id !== id)
    }));
    setHasChanges(true);
  };

  const updateKeyPersonnel = (id: string, field: string, value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      keyPersonnel: prev.keyPersonnel.map(person => 
        person.id === id ? { ...person, [field]: value } : person
      )
    }));
    setHasChanges(true);
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };
    setBusinessInfo(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
    setHasChanges(true);
  };

  const removeCertification = (id: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
    setHasChanges(true);
  };

  const updateCertification = (id: string, field: string, value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving business info:', businessInfo);
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to initial state or fetch from backend
    setBusinessInfo(initialBusinessInfo);
    setHasChanges(false);
    setIsEditing(false);
  };

  const sections = [
    { id: 'basic', label: 'Basic Information', icon: Building },
    { id: 'contact', label: 'Contact Details', icon: Phone },
    { id: 'personnel', label: 'Key Personnel', icon: Users },
    { id: 'certifications', label: 'Certifications', icon: FileText }
  ];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
          <input
            type="text"
            value={businessInfo.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Legal Name *</label>
          <input
            type="text"
            value={businessInfo.legalName}
            onChange={(e) => handleInputChange('legalName', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Industry *</label>
          <select
            value={businessInfo.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Business Type *</label>
          <select
            value={businessInfo.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          >
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Founded Year</label>
          <input
            type="text"
            value={businessInfo.foundedYear}
            onChange={(e) => handleInputChange('foundedYear', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Employee Count</label>
          <select
            value={businessInfo.employeeCount}
            onChange={(e) => handleInputChange('employeeCount', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          >
            {employeeCounts.map(count => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Annual Revenue</label>
          <select
            value={businessInfo.annualRevenue}
            onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          >
            {revenueRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Company Description</label>
        <textarea
          value={businessInfo.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          disabled={!isEditing}
          rows={4}
          className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60 resize-none"
          placeholder="Describe your business, services, and mission..."
        />
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Business Email *</label>
          <input
            type="email"
            value={businessInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
          <input
            type="tel"
            value={businessInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Website</label>
        <input
          type="url"
          value={businessInfo.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          disabled={!isEditing}
          className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
        />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Business Address</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Street Address *</label>
            <input
              type="text"
              value={businessInfo.address.street}
              onChange={(e) => handleInputChange('street', e.target.value, 'address')}
              disabled={!isEditing}
              className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">City *</label>
              <input
                type="text"
                value={businessInfo.address.city}
                onChange={(e) => handleInputChange('city', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">State *</label>
              <input
                type="text"
                value={businessInfo.address.state}
                onChange={(e) => handleInputChange('state', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
              <input
                type="text"
                value={businessInfo.address.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
              <input
                type="text"
                value={businessInfo.address.country}
                onChange={(e) => handleInputChange('country', e.target.value, 'address')}
                disabled={!isEditing}
                className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Social Media</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">LinkedIn</label>
            <input
              type="url"
              value={businessInfo.socialMedia.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value, 'socialMedia')}
              disabled={!isEditing}
              className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Twitter</label>
            <input
              type="url"
              value={businessInfo.socialMedia.twitter}
              onChange={(e) => handleInputChange('twitter', e.target.value, 'socialMedia')}
              disabled={!isEditing}
              className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Facebook</label>
            <input
              type="url"
              value={businessInfo.socialMedia.facebook}
              onChange={(e) => handleInputChange('facebook', e.target.value, 'socialMedia')}
              disabled={!isEditing}
              className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonnel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-foreground">Key Personnel</h4>
        {isEditing && (
          <button
            onClick={addKeyPersonnel}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Person
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {businessInfo.keyPersonnel.map((person) => (
          <div key={person.id} className="bg-card border border-secondary rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => updateKeyPersonnel(person.id, 'name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                <input
                  type="text"
                  value={person.position}
                  onChange={(e) => updateKeyPersonnel(person.id, 'position', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
                />
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={person.email}
                    onChange={(e) => updateKeyPersonnel(person.id, 'email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
                  />
                </div>
                {isEditing && (
                  <div className="flex items-end">
                    <button
                      onClick={() => removeKeyPersonnel(person.id)}
                      className="p-3 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-foreground">Certifications & Credentials</h4>
        {isEditing && (
          <button
            onClick={addCertification}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {businessInfo.certifications.map((cert) => (
          <div key={cert.id} className="bg-card border border-secondary rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
                />
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-2">Date Obtained</label>
                  <input
                    type="date"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    disabled={!isEditing}
                    className="w-full p-3 bg-background border border-secondary rounded-lg text-foreground focus:border-primary outline-none disabled:opacity-60"
                  />
                </div>
                {isEditing && (
                  <div className="flex items-end">
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className="p-3 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'basic': return renderBasicInfo();
      case 'contact': return renderContactInfo();
      case 'personnel': return renderPersonnel();
      case 'certifications': return renderCertifications();
      default: return renderBasicInfo();
    }
  };

  return (
    <main className="min-h-full p-6 bg-background">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Business Information</h1>
            <p className="text-foreground/60 mt-1">Manage your company profile and business details</p>
          </div>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-secondary rounded-lg hover:border-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit Information
              </button>
            )}
          </div>
        </header>

        {hasChanges && (
          <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-lg p-4">
            <p className="text-yellow-400 text-sm">
              You have unsaved changes. Don't forget to save your updates.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-secondary rounded-xl p-4">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary text-black'
                          : 'hover:bg-secondary/50 text-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-secondary rounded-xl p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}