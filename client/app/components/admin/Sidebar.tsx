'use client';

import { Home, FileText, Image, BarChart3, Settings } from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Posts', active: false },
  { icon: Image, label: 'Media', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="w-64 bg-card min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8 text-foreground">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-background rounded-sm"></div>
        </div>
        <div>
          <div className="font-bold text-lg">ORR</div>
          <div className="text-sm text-foreground/70">Solutions</div>
          <div className="text-xs text-foreground/50">Listen. Solve. Optimise.</div>
        </div>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-foreground/70 hover:bg-card hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}