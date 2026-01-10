'use client';
import { useState, useEffect } from 'react';

interface HomepageData {
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_cta_link: string;
  services_title: string;
  services_subtitle: string;
}

export default function HomepageEditor() {
  const [data, setData] = useState<HomepageData>({
    hero_title: '',
    hero_subtitle: '',
    hero_cta_text: '',
    hero_cta_link: '',
    services_title: '',
    services_subtitle: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/admin-portal/v1/cms/homepage/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        alert('Homepage updated successfully!');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-8">
      <div className="bg-card backdrop-blur-sm rounded-2xl p-6">
        <h1 className="text-4xl font-bold mb-8">Homepage Editor</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Hero Title</label>
            <input
              type="text"
              value={data.hero_title}
              onChange={(e) => setData({...data, hero_title: e.target.value})}
              className="w-full p-3 bg-white/10 border border-[#0ec277] rounded-lg text-white"
              placeholder="Transform Your Business with ORR"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
            <textarea
              value={data.hero_subtitle}
              onChange={(e) => setData({...data, hero_subtitle: e.target.value})}
              className="w-full p-3 bg-white/10 border border-[#0ec277] rounded-lg text-white h-24"
              placeholder="Strategic Advisory, Digital Innovation, and Sustainable Growth Solutions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CTA Button Text</label>
            <input
              type="text"
              value={data.hero_cta_text}
              onChange={(e) => setData({...data, hero_cta_text: e.target.value})}
              className="w-full p-3 bg-white/10 border border-[#0ec277] rounded-lg text-white"
              placeholder="Get Started"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Services Section Title</label>
            <input
              type="text"
              value={data.services_title}
              onChange={(e) => setData({...data, services_title: e.target.value})}
              className="w-full p-3 bg-white/10 border border-[#0ec277] rounded-lg text-white"
              placeholder="Quick Service Snapshot - 3 Pillars"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}