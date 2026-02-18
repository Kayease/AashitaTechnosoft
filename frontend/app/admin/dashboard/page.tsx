"use client";

import { motion } from "framer-motion";
import {
  UserMultipleIcon,
  UserGroupIcon,
  PencilEdit02Icon,
  Calendar01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/react";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const stats = [
  {
    label: "Total Users",
    value: "1,284",
    change: "+12.5%",
    isUp: true,
    icon: UserMultipleIcon,
    color: "text-[#4DA3FF]",
    lightColor: "bg-[#EAF4FF]",
    href: "/admin/users",
  },
  {
    label: "Active Teams",
    value: "24",
    change: "Stable",
    isUp: true,
    icon: UserGroupIcon,
    color: "text-[#00C07D]",
    lightColor: "bg-[#E6F9F0]",
    href: "/admin/teams",
  },
  {
    label: "Pending Posts",
    value: "12",
    change: "-2 today",
    isUp: false,
    icon: PencilEdit02Icon,
    color: "text-[#F97316]",
    lightColor: "bg-[#FFF7ED]",
    href: "/admin/blog",
  },
  {
    label: "Engagement",
    value: "86%",
    change: "+4.2% avg",
    isUp: true,
    icon: Calendar01Icon,
    color: "text-[#6366F1]",
    lightColor: "bg-[#EEF2FF]",
    href: "/admin/analytics", // non-existent for now
  },
];

export default function DashboardPage() {
  const { showToast } = useToast();
  const router = useRouter();

  const handleExport = () => {
    showToast("Preparing dashboard report...", "info");
    setTimeout(() => {
      showToast("Dashboard_Report_Feb2026.pdf downloaded", "success");
    }, 2000);
  };

  const handleSystemManage = () => {
    showToast("System diagnostic started...", "info");
  };

  return (
    <div className="space-y-12 h-full flex flex-col">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1E2A3A]">
            Dashboard Overview
          </h1>
          <p className="text-[#6B7A90] font-medium mt-1">
            Welcome back. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="secondary-btn-admin">
            Export Data
          </button>
          <button onClick={handleSystemManage} className="primary-btn-admin">
            Manage System
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link href={stat.href} key={index} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  cubicBezier: [0.4, 0, 0.2, 1],
                }}
                className="stat-card-v2 cursor-pointer hover:border-[#4DA3FF]/30 h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-14 h-14 ${stat.lightColor} rounded-2xl flex items-center justify-center transition-transform hover:scale-110`}
                  >
                    <Icon size={26} className={stat.color} variant="bulk" />
                  </div>
                  <div
                    className={`badge-v2 ${stat.isUp ? "badge-green" : "badge-red"}`}
                  >
                    {stat.isUp ? (
                      <ArrowUp01Icon size={14} />
                    ) : (
                      <ArrowDown01Icon size={14} />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <p className="text-[#6B7A90] font-bold text-xs uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-[#1E2A3A] mt-2">
                  {stat.value}
                </h3>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Content Grid - Force minimum height and grid integrity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 flex-1 min-h-[500px]">
        {/* Main Table Card */}
        <div className="xl:col-span-2 glass-card-v2 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-black text-[#1E2A3A]">
                Activity Log
              </h2>
              <p className="text-[#6B7A90] text-sm font-medium mt-1">
                Reviewing latest system interactions.
              </p>
            </div>
            <button className="action-btn">
              <MoreHorizontalIcon size={20} />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="data-table-v2 w-full">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Permission</th>
                  <th>Status</th>
                  <th>Timeline</th>
                  <th className="text-right">Manage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Siddharth Verma",
                    email: "sid@aashita.ai",
                    role: "Developer",
                    status: "Active",
                    date: "2 Hours ago",
                  },
                  {
                    name: "Ananya Sharma",
                    email: "anu@aashita.ai",
                    role: "Manager",
                    status: "On Leave",
                    date: "1 Day ago",
                  },
                  {
                    name: "Rahul Kapoor",
                    email: "rahul@aashita.ai",
                    role: "Designer",
                    status: "Active",
                    date: "3 Days ago",
                  },
                  {
                    name: "Priya Singh",
                    email: "priya@aashita.ai",
                    role: "Admin",
                    status: "Active",
                    date: "Just now",
                  },
                ].map((row, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F6FAFF] border border-[#4DA3FF]/10 flex items-center justify-center font-black text-xs text-[#4DA3FF]">
                          {row.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1E2A3A]">
                            {row.name}
                          </p>
                          <p className="text-[11px] text-[#6B7A90] mt-0.5">
                            {row.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-bold text-[#6B7A90]">
                        {row.role}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge-v2 ${row.status === "Active" ? "badge-blue" : "badge-orange"}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-bold text-[#6B7A90]">
                        {row.date}
                      </span>
                    </td>
                    <td className="text-right">
                      <button className="action-btn">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel - Ensure layout stability */}
        <div className="space-y-8 flex flex-col h-full">
          <div className="rounded-2xl bg-gradient-to-br from-[#4DA3FF] to-[#3C92F0] text-white border-none shadow-[0_12px_30px_rgba(77,163,255,0.3)] p-8 transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-black mb-2">Cloud Integrity</h3>
            <p className="text-white/80 text-sm font-medium mb-8">
              All AI nodes are operating within optimal latency ranges.
            </p>
            <div className="space-y-5">
              {[
                { label: "Neural Engine", val: "94%" },
                { label: "API Gateway", val: "100%" },
                { label: "Sync Latency", val: "12ms" },
              ].map((sys, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
                    <span>{sys.label}</span>
                    <span>{sys.val}</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: sys.val.includes("%") ? sys.val : "80%",
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-v2 p-8 flex-1">
            <h3 className="text-xl font-black text-[#1E2A3A] mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["Security Logs", "Billing API", "Dev Portal", "UI Library"].map(
                (link, idx) => (
                  <button
                    key={idx}
                    onClick={() => showToast(`Opening ${link}...`, "info")}
                    className="p-4 border border-[#4DA3FF]/10 rounded-2xl text-[11px] font-bold text-[#6B7A90] hover:bg-[#F6FAFF] hover:border-[#4DA3FF]/30 transition-all text-left"
                  >
                    {link}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
