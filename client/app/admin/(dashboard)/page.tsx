"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const trafficData = [
  { day: "Mon", value: 2400 },
  { day: "Tue", value: 1398 },
  { day: "Wed", value: 9800 },
  { day: "Thu", value: 3908 },
  { day: "May", value: 4800 },
  { day: "Fri", value: 3800 },
  { day: "Sat", value: 4300 },
];

const engagementData = [
  { day: "Mon", value: 400 },
  { day: "Tue", value: 300 },
  { day: "Wed", value: 200 },
  { day: "Thu", value: 278 },
  { day: "Fri", value: 189 },
  { day: "Sat", value: 239 },
  { day: "Sun", value: 349 },
];

const tableData = [
  {
    id: "#1001",
    title: "HExploring the cosmos",
    date: "2024-07-26",
    author: "Ethan Carter",
    status: "Published",
  },
  {
    id: "#1001",
    title: "The Art Of Coding",
    date: "2024-07-26",
    author: "Olivia Bennet",
    status: "Draft",
  },
  {
    id: "#1001",
    title: "Sustainable living tips",
    date: "2024-07-26",
    author: "Noah Thompson",
    status: "Published",
  },
  {
    id: "#1001",
    title: "Digital marketing trends",
    date: "2024-07-26",
    author: "Ava Harper",
    status: "Published",
  },
  {
    id: "#1001",
    title: "Photography essentials",
    date: "2024-07-26",
    author: "Liam Foster",
    status: "Draft",
  },
];
function page() {
  return (
    <div>
      <div className="min-h-screen text-white relative overflow-hidden star">
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
        <div className="relative z-10 p-8">
          <div className="bg-card backdrop-blur-sm rounded-2xl p-8 flex flex-col gap-8 border border-white/10 shadow-2xl">
            <div>
              <h1 className="text-4xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 text-sm mt-2">Welcome back! Here's your overview</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="flex items-center gap-3">
                <button className="text-white bg-white/20 hover:bg-white/30 p-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                  Create Post
                </button>
                <button className="text-white bg-primary hover:bg-primary/80 p-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                  Upload Media
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Recent Posts</h2>
              <div className="overflow-x-auto border border-primary/30 rounded-xl shadow-lg bg-gradient-to-br from-white/15 to-white/5">
              <table className="w-full">
                <thead className="border-b border-primary/30 bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-primary font-semibold">Title</th>
                    <th className="text-left p-4 text-primary font-semibold">Status</th>
                    <th className="text-left p-4 text-primary font-semibold">Author</th>
                    <th className="text-left p-4 text-primary font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/10 transition-colors duration-200">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium">
                            {row.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`w-fit px-3 py-2 rounded-lg font-medium text-sm ${
                          row.status === "Published" 
                            ? "bg-primary/30 text-primary border border-primary/30" 
                            : "bg-yellow-500/30 text-yellow-300 border border-yellow-500/30"
                        }`}>
                          {row.status}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        <span>{row.author}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400">
                        <span className="text-sm">
                          {row.date}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Analytics Overview
            </h2>
            <div className="flex items-center gap-6">
              <div className="border border-primary/30 basis-1/2 p-6 rounded-xl flex flex-col gap-4 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg text-white font-semibold">Website Traffic</p>
                    <p className="text-3xl font-bold text-white mt-2">12,345</p>
                    <p className="text-primary text-sm mt-1">Last 7 Days +5%</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="day" stroke="#ffffff60" style={{ fontSize: "12px" }} />
                    <YAxis stroke="#ffffff60" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a2e",
                        border: "1px solid #0ec277",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0ec277"
                      strokeWidth={2}
                      dot={{ fill: "#0ec277", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="border border-primary/30 basis-1/2 p-6 rounded-xl flex flex-col gap-4 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg text-white font-semibold">User Engagement</p>
                    <p className="text-3xl font-bold text-white mt-2">4,567</p>
                    <p className="text-primary text-sm mt-1">Last 30 Days -2%</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="day" stroke="#ffffff60" style={{ fontSize: "12px" }} />
                    <YAxis stroke="#ffffff60" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a2e",
                        border: "1px solid #0ec277",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill="#0ec277" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
