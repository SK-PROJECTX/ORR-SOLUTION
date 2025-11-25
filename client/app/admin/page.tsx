'use client';

import React from 'react';

const tableData = [
  { id: '#1001', service: 'Home Automation', price: '$14', visits: '720', type: 'Emails', status: 'Newsletters' },
  { id: '#1001', service: 'Home Automation', price: '$14', visits: '720', type: 'Emails', status: 'Newsletters' },
  { id: '#1001', service: 'Home Automation', price: '$14', visits: '720', type: 'Emails', status: 'Newsletters' },
  { id: '#1001', service: 'Home Automation', price: '$14', visits: '720', type: 'Emails', status: 'Newsletters' },
  { id: '#1001', service: 'Home Automation', price: '$14', visits: '720', type: 'Emails', status: 'Newsletters' },
  { id: '#1001', service: 'Home Automation', price: '$14', visits: '720', type: 'Emails', status: 'Newsletters' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">SEO and Analytics</h1>
        
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="space-y-4">
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-foreground/10">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-foreground/40 rounded-full"></div>
                        <span className="text-white/70 font-medium">{row.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-white font-medium">{row.service}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white/70">{row.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white/70">{row.visits}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white/70">{row.type}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
