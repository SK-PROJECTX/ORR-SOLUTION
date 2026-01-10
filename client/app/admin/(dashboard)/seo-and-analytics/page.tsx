"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

const salesStatisticsData = [
  { month: "Jan", value1: 4000, value2: 2400 },
  { month: "Feb", value1: 3000, value2: 1398 },
  { month: "Mar", value1: 2000, value2: 9800 },
  { month: "Apr", value1: 2780, value2: 3908 },
  { month: "May", value1: 1890, value2: 4800 },
  { month: "Jun", value1: 2390, value2: 3800 },
  { month: "Jul", value1: 3490, value2: 4300 },
  { month: "Aug", value1: 2100, value2: 3200 },
  { month: "Sep", value1: 2780, value2: 3908 },
];

const salesReportData = [
  { name: "Sales", value: 35, fill: "#0ec277" },
  { name: "Old Data", value: 25, fill: "#f59e0b" },
  { name: "Return", value: 40, fill: "#fbbf24" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            SEO and Analytics
          </h1>
          <p className="text-gray-400 text-sm">Track your performance metrics and analytics</p>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col basis-[70%] gap-6">
            <div className="flex items-center justify-between gap-4">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-xl p-6 w-full border border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/30 w-12 h-12 rounded-full flex items-center justify-center">
                    <ArrowUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-3xl text-white">78,987</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-400 text-sm">Visitors</p>
                      <p className="text-primary text-sm font-semibold">+16.4%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 backdrop-blur-sm rounded-xl p-6 w-full border border-red-500/20 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/30 w-12 h-12 rounded-full flex items-center justify-center">
                    <ArrowDown className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-3xl text-white">23,000.00</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-400 text-sm">Followers</p>
                      <p className="text-primary text-sm font-semibold">+16.4%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-xl p-6 w-full border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center gap-4">
                  <div className="bg-white/30 w-12 h-12 rounded-full flex items-center justify-center">
                    <ArrowDown className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-3xl text-white">28,670</p>
                    <p className="text-gray-400 text-sm mt-1">Sales</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-xl p-6 min-h-[30vh] flex flex-col border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Sales Statistics</h2>
                <div className="flex gap-2">
                  <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                    IN
                  </button>
                  <button className="bg-primary/30 hover:bg-primary/40 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-primary/30">
                    OUT
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesStatisticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="month" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #0ec277",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value1" fill="#0ec277" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="value2" fill="#ffffff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="text-primary text-sm border-b border-white/10 bg-white/5">
                    <th className="p-4 text-left font-semibold">Tracking</th>
                    <th className="p-4 text-left font-semibold">Product Name</th>
                    <th className="p-4 text-left font-semibold">Price</th>
                    <th className="p-4 text-left font-semibold">In-Stock</th>
                    <th className="p-4 text-left font-semibold">Total Order</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/10 transition-colors duration-200">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                          <span className="text-white/70 text-sm font-medium">
                            {row.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                            <div className="w-4 h-4 bg-white rounded-sm"></div>
                          </div>
                          <span className="text-white text-sm font-medium">
                            {row.service}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white/70 text-sm">{row.price}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white/70 text-sm">{row.visits}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white/70 text-sm">{row.type}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 border border-white/10">
                            {index % 2 === 0 ? "Pending" : "Active"}
                          </button>
                          {index === 2 && (
                            <button className="bg-primary/30 hover:bg-primary/40 text-primary px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 border border-primary/30">
                              Active
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200 hover:underline">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="basis-[30%] flex flex-col justify-between gap-6">
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-xl basis-full p-6 flex flex-col items-center border border-white/10 shadow-lg">
              <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-2xl font-semibold text-white">Sales Report</h2>
                <select className="bg-white/10 hover:bg-white/20 text-white text-xs border border-white/30 rounded-lg px-3 py-2 transition-all duration-200">
                  <option className="bg-gray-800">Month</option>
                  <option className="bg-gray-800">Week</option>
                  <option className="bg-gray-800">Year</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={salesReportData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {salesReportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-4 text-sm">
                {salesReportData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-xl basis-full p-6 border border-white/10 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
              <div className="space-y-3">
                <div className="py-3 border-b border-white/10 flex gap-3 hover:bg-white/5 px-2 rounded transition-colors duration-200">
                  <div className="h-6 w-6 bg-gradient-to-br from-primary to-primary/50 rounded-full flex-shrink-0 shadow-md"></div>
                  <p className="text-sm text-gray-300">Esther Howard</p>
                </div>
                <div className="py-3 border-b border-white/10 flex gap-3 hover:bg-white/5 px-2 rounded transition-colors duration-200">
                  <div className="h-6 w-6 bg-gradient-to-br from-primary to-primary/50 rounded-full flex-shrink-0 shadow-md"></div>
                  <p className="text-sm text-gray-300">Esther Howard</p>
                </div>
                <div className="py-3 flex gap-3 hover:bg-white/5 px-2 rounded transition-colors duration-200">
                  <div className="h-6 w-6 bg-gradient-to-br from-primary to-primary/50 rounded-full flex-shrink-0 shadow-md"></div>
                  <p className="text-sm text-gray-300">Esther Howard</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-xl basis-full p-6 border border-white/10 shadow-lg">
              <h2 className="text-lg font-semibold text-white text-center mb-4">Assistants</h2>
              <div className="flex items-center justify-center py-6">
                <p className="text-gray-400 text-sm">No assistants assigned</p>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}
