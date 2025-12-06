"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

const tableData = [
  {
    id: "#1001",
    service: "Home Automation",
    price: "$14",
    visits: "720",
    type: "Emails",
    status: "Newsletters",
  },
  {
    id: "#1001",
    service: "Home Automation",
    price: "$14",
    visits: "720",
    type: "Emails",
    status: "Newsletters",
  },
  {
    id: "#1001",
    service: "Home Automation",
    price: "$14",
    visits: "720",
    type: "Emails",
    status: "Newsletters",
  },
  {
    id: "#1001",
    service: "Home Automation",
    price: "$14",
    visits: "720",
    type: "Emails",
    status: "Newsletters",
  },
  {
    id: "#1001",
    service: "Home Automation",
    price: "$14",
    visits: "720",
    type: "Emails",
    status: "Newsletters",
  },
  {
    id: "#1001",
    service: "Home Automation",
    price: "$14",
    visits: "720",
    type: "Emails",
    status: "Newsletters",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 p-8 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          SEO and Analytics
        </h1>

        <div className="flex gap-4">
          <div className="flex flex-col basis-[70%] gap-4">
            <div className="flex items-center justify-between gap-3">
              <div className="bg-card backdrop-blur-sm rounded-lg p-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-green/20 w-10 h-10 rounded-full">
                    <ArrowUp className="w-6 h-6 text-primary m-2" />
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-3xl">78,987</p>
                    <div className="flex items-center justify-between">
                      <p>Visitors</p>
                      <p className="text-primary">+16.4%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card backdrop-blur-sm rounded-lg p-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 w-10 h-10 rounded-full">
                    <ArrowDown className="w-6 h-6 text-red-500 m-2" />
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-3xl">23,000.00</p>
                    <div className="flex items-center justify-between">
                      <p>Followers</p>
                      <p className="text-primary">+16.4%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card backdrop-blur-sm rounded-lg p-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 w-10 h-10 rounded-full">
                    <ArrowDown className="w-6 h-6 text-primary m-2" />
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-3xl">28,670</p>
                    <p>Sales</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto bg-card backdrop-blur-sm rounded-xl p-3 min-h-[30vh]">
              <h2 className="text-2xl text-primary">Sales Statistics</h2>
            </div>

            <div className="overflow-x-auto bg-card backdrop-blur-sm rounded-xl">
              <table className="w-full">
                <thead className="p-3">
                  <tr className="text-primary">
                    <th className="p-2">Tracking</th>
                    <th className="p-2">Product Name</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">In Stock</th>
                    <th className="p-2">Total Order</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Options</th>
                  </tr>
                </thead>
                <tbody className="space-y-4 p-3">
                  {tableData.map((row, index) => (
                    <tr key={index} className="border-b border-foreground/10">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-foreground/40 rounded-full"></div>
                          <span className="text-white/70 font-medium">
                            {row.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-sm"></div>
                          </div>
                          <span className="text-white font-medium">
                            {row.service}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white/70">{row.price}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white/70">{row.visits}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white/70 px-4 py-2 rounded text-sm font-medium">
                          {row.type}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-primary text-white px-4 py-2 rounded text-sm font-medium">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="basis-[30%] flex flex-col justify-between gap-4">
            <div className="bg-card backdrop-blur-sm rounded-2xl basis-full p-4">
              <h2 className="text-2xl ">Sales Report</h2>
            </div>
            <div className="bg-card backdrop-blur-sm rounded-2xl basis-full p-4">
              <div className="py-4 border-b flex gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-5 w-5 bg-white rounded-full"></div>
                  <p>Esther Howard</p>
                </div>
              </div>
              <div className="py-4 border-b flex gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-5 w-5 bg-white rounded-full"></div>
                  <p>Esther Howard</p>
                </div>
              </div>
              <div className="py-4 border-b flex gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-5 w-5 bg-white rounded-full"></div>
                  <p>Esther Howard</p>
                </div>
              </div>
            </div>
            <div className="bg-card backdrop-blur-sm rounded-2xl basis-full p-4">
              <h2 className="text-2xl text-center">Assistants</h2>
              <div className="py-4 border-b flex gap-4">
                
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card backdrop-blur-sm rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="space-y-4">
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-foreground/10">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-foreground/40 rounded-full"></div>
                        <span className="text-white/70 font-medium">
                          {row.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-white font-medium">
                          {row.service}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white/70">{row.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white/70">{row.visits}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white/70 px-4 py-2 rounded text-sm font-medium">
                        {row.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-primary text-white px-4 py-2 rounded text-sm font-medium">
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
