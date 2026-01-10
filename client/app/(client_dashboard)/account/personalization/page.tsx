"use client";

import React, { useState, useEffect } from 'react';
import { User, Palette, Bell, Globe, Moon, Sun, Monitor, Save } from 'lucide-react';
import { useTheme } from '../../../components/ThemeProvider';

export default function PersonalizationPage() {
  const { theme: currentTheme, toggleTheme } = useTheme();
  const [theme, setTheme] = useState(currentTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === 'system') {
      // For system theme, we'll use the detected system preference
      const effectiveTheme = systemTheme;
      document.documentElement.className = effectiveTheme;
      localStorage.setItem('theme', 'system');
      setTheme('system');
    } else {
      // For light/dark, use the existing toggle or set directly
      if (newTheme !== currentTheme) {
        toggleTheme();
      }
      setTheme(newTheme as 'light' | 'dark');
    }
  };
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });
  const [preferences, setPreferences] = useState({
    timezone: 'UTC+00:00',
    dateFormat: 'DD/MM/YYYY',
    currency: 'USD'
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Personalization</h1>
          <p className="text-foreground opacity-60">Customize your experience to match your preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme Settings */}
          <div className="bg-card border border-secondary rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', icon: Sun, label: 'Light' },
                    { id: 'dark', icon: Moon, label: 'Dark' },
                    { id: 'system', icon: Monitor, label: 'System' }
                  ].map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => handleThemeChange(id)}
                      className={`p-3 rounded-lg border transition-all ${
                        theme === id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-secondary hover:border-primary/50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2 text-foreground" />
                      <span className="text-sm text-foreground">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-secondary border border-secondary rounded-lg px-3 py-2 text-foreground"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card border border-secondary rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-foreground capitalize">{key} Notifications</span>
                  <button
                    onClick={() => setNotifications({...notifications, [key]: !value})}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-primary' : 'bg-secondary'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Settings */}
          <div className="bg-card border border-secondary rounded-xl p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Regional Preferences</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                  className="w-full bg-secondary border border-secondary rounded-lg px-3 py-2 text-foreground"
                >
                  <option value="UTC+00:00">UTC+00:00 (London)</option>
                  <option value="UTC+01:00">UTC+01:00 (Paris)</option>
                  <option value="UTC-05:00">UTC-05:00 (New York)</option>
                  <option value="UTC-08:00">UTC-08:00 (Los Angeles)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date Format</label>
                <select
                  value={preferences.dateFormat}
                  onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                  className="w-full bg-secondary border border-secondary rounded-lg px-3 py-2 text-foreground"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                <select
                  value={preferences.currency}
                  onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                  className="w-full bg-secondary border border-secondary rounded-lg px-3 py-2 text-foreground"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}