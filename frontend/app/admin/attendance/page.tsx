"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search01Icon,
  CheckmarkCircle01Icon,
  HelpCircleIcon,
  CancelCircleIcon,
  Download01Icon,
  Clock01Icon,
  Location01Icon,
  Loading03Icon,
  ComputerIcon,
  FlowIcon,
  CalendarAdd01Icon,
  PencilEdit02Icon,
  Logout01Icon,
  DashboardSquare01Icon,
  UserCircleIcon,
  Calendar01Icon,
  FilterIcon,
} from "@hugeicons/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminDropdown from "@/components/ui/AdminDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { mockApi } from "@/lib/mockApi";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import AdminInput from "@/components/ui/AdminInput";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { ChevronDown, ChevronUp, X, RotateCcw } from "lucide-react";

// --- Mock Data for Charts ---
const weeklyTrend = [
  { name: "Mon", present: 42, absent: 5, late: 3 },
  { name: "Tue", present: 45, absent: 3, late: 2 },
  { name: "Wed", present: 38, absent: 8, late: 4 },
  { name: "Thu", present: 40, absent: 6, late: 4 },
  { name: "Fri", present: 44, absent: 4, late: 2 },
  { name: "Sat", present: 15, absent: 35, late: 0 },
  { name: "Sun", present: 0, absent: 50, late: 0 },
];

const leaveData = [
  { name: "Sick Leave", value: 400, color: "#4DA3FF" },
  { name: "Casual Leave", value: 300, color: "#00C07D" },
  { name: "Earned Leave", value: 300, color: "#F97316" },
  { name: "Maternity", value: 200, color: "#A855F7" },
];

export default function AttendanceAdminPage() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [dateRange, setDateRange] = useState("Today");
  const [selectedDate, setSelectedDate] = useState("");

  // Modal States
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  // Form States for Modals
  const [holidayForm, setHolidayForm] = useState({
    name: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [vacationForm, setVacationForm] = useState({
    note: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    applyToAll: true,
  });

  // WFH Requests State
  const [wfhRequests, setWfhRequests] = useState([
    {
      id: 1,
      name: "Saurabh Sharma",
      avatar: "SS",
      date: "Feb 22, 2026",
      reason: "Family event in hometown",
      requestedOn: "1 hour ago",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Singh",
      avatar: "PS",
      date: "Feb 24, 2026",
      reason: "Internet outage at local area",
      requestedOn: "3 hours ago",
      status: "Pending",
    },
    {
      id: 3,
      name: "Amit Patel",
      avatar: "AP",
      date: "Feb 21, 2026",
      reason: "Personal medical appointment",
      requestedOn: "1 day ago",
      status: "Approved",
    },
  ]);

  const [isWFHOpen, setIsWFHOpen] = useState(false);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const data = await mockApi.attendance.getAll();
      setLogs(data);
    } catch (error) {
      showToast("Failed to fetch logs", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All Status");
    setLocationFilter("All Locations");
    setDateRange("Today");
    setSelectedDate("");
    showToast("Filters reset", "info");
  };

  const handleExport = () => {
    showToast("Generating professional CSV report...", "info");
    setTimeout(() => {
      showToast("Attendance report exported successfully", "success");
    }, 1500);
  };

  const handleApplyHoliday = () => {
    if (!holidayForm.name)
      return showToast("Please enter holiday name", "error");
    showToast(`Holiday "${holidayForm.name}" applied successfully`, "success");
    setIsHolidayModalOpen(false);
  };

  const handleApplyVacation = () => {
    showToast("Vacation applied successfully", "success");
    setIsLeaveModalOpen(false);
  };

  const handleViewProfile = (name: string) => {
    showToast(`Opening digital profile for ${name}...`, "info");
  };

  const handleEditLog = (entry: any) => {
    setIsMarkModalOpen(true);
    showToast(`Editing log for ${entry.name}`, "info");
  };

  const calculateDuration = (inTime: string, outTime: string) => {
    if (
      !inTime ||
      !outTime ||
      inTime === "-" ||
      outTime === "-" ||
      outTime === "Pending" ||
      inTime === "Pending"
    )
      return "-";

    try {
      const parseTime = (timeStr: string) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const start = parseTime(inTime);
      const end = parseTime(outTime);
      let diff = end - start;
      if (diff < 0) diff += 24 * 60; // Overnight handling

      const h = Math.floor(diff / 60);
      const m = diff % 60;
      return `${h}h ${m}m`;
    } catch (e) {
      return "-";
    }
  };

  const handlePunchOut = (name: string) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setLogs((prevLogs) =>
      prevLogs.map((log) => {
        if (log.name === name) {
          const duration = calculateDuration(log.clockIn, currentTime);
          return { ...log, clockOut: currentTime, duration };
        }
        return log;
      }),
    );
    showToast(`${name} has been punched out at ${currentTime}`, "success");
  };

  const handleWFHAction = (id: number, status: "Approved" | "Rejected") => {
    setWfhRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req)),
    );
    showToast(
      `WFH Request ${status}`,
      status === "Approved" ? "success" : "info",
    );
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        log.email?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || log.status === statusFilter;
      const matchesLocation =
        locationFilter === "All Locations" || log.type === locationFilter;

      // Date filtering
      const matchesDate = !selectedDate || log.date === selectedDate;

      return matchesSearch && matchesStatus && matchesLocation && matchesDate;
    });
  }, [
    logs,
    debouncedSearch,
    statusFilter,
    locationFilter,
    dateRange,
    selectedDate,
  ]);

  const stats = [
    {
      label: "Today Present",
      val: logs.filter((l) => l.status === "Present").length,
      total: logs.length,
      icon: CheckmarkCircle01Icon,
      color: "#00C07D",
      bg: "bg-emerald-50/50",
      accent: "border-emerald-500",
    },
    {
      label: "On Leave",
      val: logs.filter((l) => l.status === "On Leave").length,
      icon: HelpCircleIcon,
      color: "#F97316",
      bg: "bg-orange-50/50",
      accent: "border-orange-500",
    },
    {
      label: "Absent / Late",
      val: logs.filter((l) => l.status === "Late" || l.status === "Absent")
        .length,
      icon: CancelCircleIcon,
      color: "#FF5A5A",
      bg: "bg-red-50/50",
      accent: "border-red-500",
    },
    {
      label: "Remote",
      val: logs.filter((l) => l.type === "Remote").length,
      icon: ComputerIcon,
      color: "#4DA3FF",
      bg: "bg-blue-50/50",
      accent: "border-blue-500",
    },
    {
      label: "Half Day",
      val: logs.filter((l) => l.status === "Half Day")?.length || 2,
      icon: FlowIcon,
      color: "#A855F7",
      bg: "bg-purple-50/50",
      accent: "border-purple-500",
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <AdminBreadcrumb />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#1E2A3A]">
              Attendance Center
            </h1>
            <p className="text-[#6B7A90] font-medium mt-1">
              Real-time monitoring and management of workforce engagement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleExport} className="secondary-btn-admin">
              <Download01Icon size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Enhanced Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 40px rgba(77, 163, 255, 0.1)",
            }}
            className={`bg-white rounded-[24px] p-6 border-l-4 ${stat.accent} shadow-sm border border-[#4DA3FF]/5 relative overflow-hidden group transition-all`}
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full opacity-50 group-hover:scale-110 transition-transform`}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-2.5 rounded-xl ${stat.bg} border border-[#4DA3FF]/5`}
                >
                  <stat.icon
                    size={20}
                    style={{ color: stat.color }}
                    variant="bulk"
                  />
                </div>
                {stat.total && (
                  <span className="text-[10px] font-black text-[#6B7A90]/40 uppercase tracking-widest">
                    Live Status
                  </span>
                )}
              </div>
              <p className="text-[10px] font-black uppercase text-[#6B7A90]/60 tracking-widest mb-1">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-black text-[#1E2A3A]">
                  <Counter end={stat.val} />
                </h4>
                {stat.total && (
                  <span className="text-sm font-bold text-[#6B7A90]/40">
                    / {stat.total}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Work From Home Requests Section */}
      <div className="mb-8 mt-5">
        <div className="bg-white rounded-[32px] shadow-sm border border-[#4DA3FF]/5 overflow-hidden">
          <button
            onClick={() => setIsWFHOpen(!isWFHOpen)}
            className="w-full px-8 py-5 flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl border border-[#4DA3FF]/10 text-[#4DA3FF] transition-all ${isWFHOpen ? "bg-[#4DA3FF] text-white" : "bg-[#EAF4FF]"}`}
              >
                <FlowIcon size={18} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-black text-[#1E2A3A] uppercase tracking-[0.2em]">
                    Work From Home Requests
                  </h3>
                  {wfhRequests.filter((r) => r.status === "Pending").length >
                    0 && (
                    <span className="flex items-center justify-center w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-sm animate-pulse">
                      {wfhRequests.filter((r) => r.status === "Pending").length}
                    </span>
                  )}
                </div>
                <p className="text-[9px] font-bold text-[#6B7A90] uppercase tracking-widest opacity-40 mt-0.5">
                  Manage remote work approvals
                </p>
              </div>
            </div>
            <div
              className={`p-2 rounded-full border bg-[#F6FAFF] text-[#6B7A90] transition-colors border-[#4DA3FF]/10 group-hover:border-[#4DA3FF]/30`}
            >
              {isWFHOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          <AnimatePresence>
            {isWFHOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left py-4 text-[10px] font-black text-[#6B7A90] uppercase tracking-widest">
                            Employee
                          </th>
                          <th className="text-left py-4 text-[10px] font-black text-[#6B7A90] uppercase tracking-widest">
                            WFH Date
                          </th>
                          <th className="text-left py-4 text-[10px] font-black text-[#6B7A90] uppercase tracking-widest">
                            Reason
                          </th>
                          <th className="text-left py-4 text-[10px] font-black text-[#6B7A90] uppercase tracking-widest">
                            Requested On
                          </th>
                          <th className="text-left py-4 text-[10px] font-black text-[#6B7A90] uppercase tracking-widest text-center">
                            Status
                          </th>
                          <th className="text-right py-4 text-[10px] font-black text-[#6B7A90] uppercase tracking-widest">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-[10px]">
                        {wfhRequests.map((req) => (
                          <tr
                            key={req.id}
                            className="group hover:bg-[#F6FAFF]/50 transition-colors"
                          >
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] flex items-center justify-center text-[10px] font-black text-[#4DA3FF] border border-[#4DA3FF]/10 uppercase">
                                  {req.avatar}
                                </div>
                                <span className="text-xs font-bold text-[#1E2A3A]">
                                  {req.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 text-xs font-bold text-[#6B7A90]">
                              {req.date}
                            </td>
                            <td
                              className="py-4 text-xs font-semibold text-[#6B7A90]/70 max-w-[200px] truncate"
                              title={req.reason}
                            >
                              {req.reason}
                            </td>
                            <td className="py-4 text-[10px] font-bold text-slate-400 uppercase">
                              {req.requestedOn}
                            </td>
                            <td className="py-4 text-center">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                                  req.status === "Pending"
                                    ? "bg-orange-50 text-orange-600 border-orange-200"
                                    : req.status === "Approved"
                                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                      : "bg-rose-50 text-rose-600 border-rose-200"
                                }`}
                              >
                                <div
                                  className={`w-1 h-1 rounded-full ${
                                    req.status === "Pending"
                                      ? "bg-orange-600"
                                      : req.status === "Approved"
                                        ? "bg-emerald-600"
                                        : "bg-rose-600"
                                  }`}
                                />
                                {req.status}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              {req.status === "Pending" ? (
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() =>
                                      handleWFHAction(req.id, "Approved")
                                    }
                                    className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleWFHAction(req.id, "Rejected")
                                    }
                                    className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                                  >
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
                                  Processed
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Unified SaaS Filter & Action Toolbar */}
      <div className="bg-[#F6FAFF] rounded-xl px-5 py-4 shadow-sm border border-[#4DA3FF]/10 flex flex-wrap xl:flex-nowrap items-center justify-between gap-4">
        {/* Left Section: Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
          {/* Search Field */}
          <div className="relative w-full xl:w-[30%] group shrink-0">
            <Search01Icon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A90]/40 group-focus-within:text-[#4DA3FF] transition-colors"
            />
            <input
              type="text"
              placeholder="Search by name, ID or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-6 bg-white border border-[#4DA3FF]/10 rounded-lg text-sm focus:border-[#4DA3FF] outline-none transition-all placeholder:text-[#6B7A90]/30 hover:border-[#4DA3FF]/30 shadow-sm"
            />
          </div>

          {/* Filters Group (Range/Filter Buttons) */}
          <div className="flex items-center gap-3 w-full xl:w-auto flex-1 md:flex-none">
            {/* Range Trigger */}
            <button
              onClick={() => setIsRangeModalOpen(true)}
              className="h-12 px-4 bg-white border border-[#4DA3FF]/10 rounded-lg text-xs font-bold text-[#1E2A3A] hover:bg-slate-50 hover:border-[#4DA3FF]/30 transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 md:w-auto"
            >
              <Calendar01Icon size={16} className="text-[#4DA3FF]" />
              <span className="md:inline">Range</span>
            </button>

            {/* Specific Date Filter Trigger */}
            <button
              onClick={() => setIsAdvancedFilterOpen(true)}
              className="h-12 px-4 bg-white border border-[#4DA3FF]/10 rounded-lg text-xs font-bold text-[#1E2A3A] hover:bg-slate-50 hover:border-[#4DA3FF]/30 transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 md:w-auto"
            >
              <FilterIcon size={16} className="text-[#4DA3FF]" />
              <span className="md:inline">
                {selectedDate ? selectedDate : "Filter Date"}
              </span>
            </button>
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full xl:w-auto sm:justify-end">
          <button
            onClick={() => setIsHolidayModalOpen(true)}
            className="flex-1 xl:flex-none h-12 px-5 bg-white border border-[#4DA3FF]/20 text-[#1E2A3A] hover:bg-[#F6FAFF] hover:border-[#4DA3FF]/40 rounded-lg text-xs font-black transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 group"
          >
            <DashboardSquare01Icon
              size={18}
              className="text-[#4DA3FF] group-hover:scale-110 transition-transform"
            />
            <span>Add Holiday</span>
          </button>
          <button
            onClick={() => setIsLeaveModalOpen(true)}
            className="flex-1 xl:flex-none h-12 px-6 bg-gradient-to-r from-[#4DA3FF] to-[#3C92F0] text-white rounded-lg text-xs font-black transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <CalendarAdd01Icon
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
            <span>Add Vacation</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            disabled={
              searchQuery === "" &&
              statusFilter === "All Status" &&
              locationFilter === "All Locations" &&
              dateRange === "Today" &&
              selectedDate === ""
            }
            className="flex-1 xl:flex-none h-12 px-4 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2 group"
            title="Clear All Filters"
          >
            <RotateCcw
              size={16}
              className="group-hover:rotate-[-45deg] transition-transform"
            />
            <span className="md:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Active Filter Chips (Subtle Row) */}
      <AnimatePresence>
        {(statusFilter !== "All Status" ||
          locationFilter !== "All Locations" ||
          debouncedSearch !== "") && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center gap-2 pt-1"
          >
            <span className="text-[10px] font-black text-[#6B7A90]/40 uppercase tracking-widest mr-2">
              Active:
            </span>
            {statusFilter !== "All Status" && (
              <span className="flex items-center gap-2 px-3 py-1.5 bg-[#EAF4FF] text-[#4DA3FF] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#4DA3FF]/10">
                {statusFilter}{" "}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("All Status")}
                />
              </span>
            )}
            {locationFilter !== "All Locations" && (
              <span className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-200">
                {locationFilter}{" "}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={() => setLocationFilter("All Locations")}
                />
              </span>
            )}
            {selectedDate && (
              <span className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-200">
                {selectedDate}{" "}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={() => setSelectedDate("")}
                />
              </span>
            )}
            {debouncedSearch && (
              <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                "{debouncedSearch}"{" "}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={() => setSearchQuery("")}
                />
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Advanced Records Table */}
      <div className="bg-white rounded-[32px] shadow-sm border border-[#4DA3FF]/5 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-[#4DA3FF]/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-[#4DA3FF] rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-xs font-black text-[#6B7A90] uppercase tracking-widest animate-pulse">
              Syncing Records...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-[450px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F6FAFF]/50 border-b border-[#4DA3FF]/5">
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-[#6B7A90]/60 tracking-[0.2em] whitespace-nowrap">
                    Employee Info
                  </th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-[#6B7A90]/60 tracking-[0.2em] whitespace-nowrap">
                    Clock Sequence
                  </th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-[#6B7A90]/60 tracking-[0.2em] whitespace-nowrap">
                    Work Duration
                  </th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-[#6B7A90]/60 tracking-[0.2em] whitespace-nowrap">
                    Status & Mode
                  </th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-[#6B7A90]/60 tracking-[0.2em] whitespace-nowrap">
                    Command Center
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4DA3FF]/5">
                <AnimatePresence mode="popLayout">
                  {filteredLogs.map((entry, idx) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-[#F6FAFF]/40 transition-all cursor-default"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative group/avatar">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4DA3FF]/5 to-[#4DA3FF]/20 flex items-center justify-center border border-[#4DA3FF]/10 overflow-hidden">
                              <span className="font-black text-sm text-[#4DA3FF]">
                                {entry.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-[#00C07D] shadow-sm" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1E2A3A] group-hover:text-[#4DA3FF] transition-colors">
                              {entry.name}
                            </p>
                            <p className="text-[10px] font-semibold text-[#6B7A90]/50 tracking-wide mt-0.5">
                              EMP-0{idx + 102} • Design Team
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 text-[#00C07D] rounded-lg text-[10px] font-bold border border-emerald-500/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#00C07D] animate-pulse" />
                              {entry.clockIn}
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1 bg-red-50 text-[#FF5A5A] rounded-lg text-[10px] font-bold border border-red-500/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5A]" />
                              {entry.clockOut}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1.5">
                          {(() => {
                            const duration = calculateDuration(
                              entry.clockIn,
                              entry.clockOut,
                            );
                            let progressWidth = "0%";
                            if (duration !== "-") {
                              const hours = parseInt(duration.split("h")[0]);
                              progressWidth = `${Math.min((hours / 9) * 100, 100)}%`;
                            }
                            return (
                              <>
                                <div className="w-full bg-[#4DA3FF]/5 rounded-full h-1.5 max-w-[100px]">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: progressWidth }}
                                    className="bg-[#4DA3FF] h-full rounded-full"
                                  />
                                </div>
                                <span className="text-[10px] font-black text-[#4DA3FF] tracking-widest">
                                  {duration}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                          <StatusBadge status={entry.status} />
                          <div className="flex items-center gap-1.5 text-[9px] font-black text-[#6B7A90]/40 uppercase tracking-widest">
                            <Location01Icon size={12} /> {entry.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end">
                          {entry.status !== "On Leave" &&
                            (entry.clockOut === "-" ||
                              entry.clockOut === "Pending") && (
                              <button
                                onClick={() => handlePunchOut(entry.name)}
                                className="p-2.5 hover:bg-rose-50 text-[#6B7A90] hover:text-rose-500 rounded-xl transition-all flex items-center gap-2 group/out"
                                title="Punch Out"
                              >
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/out:opacity-100 transition-opacity">
                                  Punch Out
                                </span>
                                <Logout01Icon size={18} />
                              </button>
                            )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Inline Analytics Panel */}
      <div className="bg-white rounded-[32px] shadow-sm border border-[#4DA3FF]/5 overflow-hidden">
        <button
          onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
          className="w-full px-8 py-5 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl border border-[#4DA3FF]/10 text-[#4DA3FF] transition-all ${isAnalyticsOpen ? "bg-[#4DA3FF] text-white" : "bg-[#EAF4FF]"}`}
            >
              <DashboardSquare01Icon size={18} />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-black text-[#1E2A3A] uppercase tracking-[0.2em]">
                Deep Insights
              </h3>
              <p className="text-[9px] font-bold text-[#6B7A90] uppercase tracking-widest opacity-40 mt-0.5">
                Attendance Trend Analysis
              </p>
            </div>
          </div>
          <div
            className={`p-2 rounded-full border bg-[#F6FAFF] text-[#6B7A90] transition-colors border-[#4DA3FF]/10 group-hover:border-[#4DA3FF]/30`}
          >
            {isAnalyticsOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
        </button>

        <AnimatePresence>
          {isAnalyticsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-8 pb-10 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 pt-10 border-t border-[#4DA3FF]/5">
                {/* Main Trend Chart */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-[#6B7A90] uppercase tracking-[0.2em]">
                      Weekly Engagement Flow
                    </h4>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-[9px] font-bold text-[#00C07D]">
                        <div className="w-2 h-2 rounded-full bg-[#00C07D]" />{" "}
                        Present
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-[#FF5A5A]">
                        <div className="w-2 h-2 rounded-full bg-[#FF5A5A]" />{" "}
                        Absent
                      </div>
                    </div>
                  </div>
                  <div className="h-[300px] w-full bg-[#F6FAFF]/30 rounded-[24px] p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyTrend}>
                        <defs>
                          <linearGradient
                            id="colorPresent"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#4DA3FF"
                              stopOpacity={0.1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#4DA3FF"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="rgba(77, 163, 255, 0.05)"
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 9,
                            fontWeight: 900,
                            fill: "#6B7A90",
                          }}
                          tickFormatter={(val) => val.toUpperCase()}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 9,
                            fontWeight: 900,
                            fill: "#6B7A90",
                          }}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "16px",
                            border: "none",
                            boxShadow: "0 10px 20px rgba(77, 163, 255, 0.1)",
                            fontSize: "10px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="present"
                          stroke="#4DA3FF"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorPresent)"
                        />
                        <Area
                          type="monotone"
                          dataKey="absent"
                          stroke="#FF5A5A"
                          strokeWidth={3}
                          fillOpacity={0}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Sub Analytics */}
                <div className="lg:col-span-4 grid grid-cols-1 gap-6">
                  <div className="bg-[#F6FAFF]/30 rounded-[24px] p-6 border border-[#4DA3FF]/5">
                    <h4 className="text-[10px] font-black text-[#6B7A90] uppercase tracking-[0.2em] mb-6">
                      Leave Distribution
                    </h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={leaveData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={8}
                            dataKey="value"
                          >
                            {leaveData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {leaveData.map((l, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: l.color }}
                          />
                          <span className="text-[9px] font-black text-[#6B7A90] uppercase">
                            {l.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty State Illustration would go here if logs length === 0 */}

      {/* Modals */}
      <Modal
        isOpen={isMarkModalOpen}
        onClose={() => setIsMarkModalOpen(false)}
        title="Quick Attendance Action"
        width="lg"
      >
        <div className="p-4 text-center">
          <div className="w-16 h-16 bg-[#EAF4FF] rounded-2xl flex items-center justify-center text-[#4DA3FF] mx-auto mb-6 border border-[#4DA3FF]/10">
            <CalendarAdd01Icon size={32} />
          </div>
          <h3 className="text-xl font-black text-[#1E2A3A] mb-2 px-10">
            Manual Log Entry
          </h3>
          <p className="text-xs font-bold text-[#6B7A90] mb-8">
            Mark attendance for an employee manually. System will track IP and
            timestamp.
          </p>
          <div className="space-y-4 text-left">
            <AdminInput label="Full Name" placeholder="Search employee..." />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                  Status
                </label>
                <AdminDropdown
                  value="Present"
                  onChange={() => {}}
                  options={[
                    { label: "Present", value: "Present" },
                    { label: "Late", value: "Late" },
                  ]}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                  Location
                </label>
                <AdminDropdown
                  value="On-site"
                  onChange={() => {}}
                  options={[
                    { label: "On-site", value: "On-site" },
                    { label: "Remote", value: "Remote" },
                  ]}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={() => setIsMarkModalOpen(false)}
                className="secondary-btn-admin flex-1"
              >
                Discard
              </button>
              <button type="button" className="primary-btn-admin flex-1">
                Finish Log
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isHolidayModalOpen}
        onClose={() => setIsHolidayModalOpen(false)}
        title="Add Company Holiday"
        width="lg"
      >
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1E2A3A] uppercase tracking-widest">
                Start Date *
              </label>
              <AdminInput
                type="date"
                value={holidayForm.startDate}
                onChange={(e) =>
                  setHolidayForm({ ...holidayForm, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1E2A3A] uppercase tracking-widest">
                End Date *
              </label>
              <AdminInput
                type="date"
                value={holidayForm.endDate}
                onChange={(e) =>
                  setHolidayForm({ ...holidayForm, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#1E2A3A] uppercase tracking-widest">
              Holiday Name
            </label>
            <AdminInput
              placeholder="e.g., Diwali, Christmas"
              value={holidayForm.name}
              onChange={(e) =>
                setHolidayForm({ ...holidayForm, name: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#4DA3FF]/5">
            <button
              onClick={() => setIsHolidayModalOpen(false)}
              className="px-6 py-2.5 bg-white border border-[#4DA3FF]/10 rounded-lg text-xs font-black text-[#6B7A90] hover:bg-[#F6FAFF] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyHoliday}
              className="px-6 py-2.5 bg-[#1E2A3A] text-white rounded-lg text-xs font-black hover:bg-[#2A3B52] transition-all shadow-sm"
            >
              Apply Holiday
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title="Add Vacation"
        width="lg"
      >
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-[#F6FAFF] rounded-xl border border-[#4DA3FF]/10">
            <input
              type="checkbox"
              id="applyAll"
              checked={vacationForm.applyToAll}
              onChange={(e) =>
                setVacationForm({
                  ...vacationForm,
                  applyToAll: e.target.checked,
                })
              }
              className="w-4 h-4 rounded border-[#4DA3FF]/30 text-[#4DA3FF] focus:ring-[#4DA3FF]"
            />
            <label
              htmlFor="applyAll"
              className="text-xs font-black text-[#4DA3FF] uppercase tracking-widest cursor-pointer"
            >
              Apply to all employees
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1E2A3A] uppercase tracking-widest">
                Start Date *
              </label>
              <AdminInput
                type="date"
                value={vacationForm.startDate}
                onChange={(e) =>
                  setVacationForm({
                    ...vacationForm,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1E2A3A] uppercase tracking-widest">
                End Date *
              </label>
              <AdminInput
                type="date"
                value={vacationForm.endDate}
                onChange={(e) =>
                  setVacationForm({ ...vacationForm, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#1E2A3A] uppercase tracking-widest">
              Vacation Note
            </label>
            <AdminInput
              placeholder="e.g., Year-end closure, Summer break"
              value={vacationForm.note}
              onChange={(e) =>
                setVacationForm({ ...vacationForm, note: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#4DA3FF]/5">
            <button
              onClick={() => setIsLeaveModalOpen(false)}
              className="px-6 py-2.5 bg-white border border-[#4DA3FF]/10 rounded-lg text-xs font-black text-[#6B7A90] hover:bg-[#F6FAFF] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyVacation}
              className="px-6 py-2.5 bg-[#1E2A3A] text-white rounded-lg text-xs font-black hover:bg-[#2A3B52] transition-all shadow-sm"
            >
              Apply Vacation
            </button>
          </div>
        </div>
      </Modal>

      {/* Advanced Filter Modal */}
      <Modal
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
        title="Filter Specific Date"
        width="md"
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#6B7A90] uppercase tracking-widest">
                Select specific date
              </label>
              <AdminInput
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex gap-3">
            <button
              className="secondary-btn-admin flex-1"
              onClick={() => {
                setSelectedDate("");
                setIsAdvancedFilterOpen(false);
              }}
            >
              Clear Date
            </button>
            <button
              className="primary-btn-admin flex-1"
              onClick={() => setIsAdvancedFilterOpen(false)}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </Modal>

      {/* Date Range Modal */}
      <Modal
        isOpen={isRangeModalOpen}
        onClose={() => setIsRangeModalOpen(false)}
        title="Custom Date Range"
        width="md"
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <AdminInput label="Start Date" type="date" />
            <AdminInput label="End Date" type="date" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex gap-3">
            <button
              className="secondary-btn-admin flex-1"
              onClick={() => setIsRangeModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="primary-btn-admin flex-1"
              onClick={() => setIsRangeModalOpen(false)}
            >
              Apply Range
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// --- Dynamic Sub-components ---

function Counter({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count}</>;
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<
    string,
    { bg: string; text: string; iconColor: string }
  > = {
    Present: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      iconColor: "bg-emerald-500",
    },
    "On Leave": {
      bg: "bg-orange-50",
      text: "text-orange-600",
      iconColor: "bg-orange-500",
    },
    Late: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      iconColor: "bg-amber-500",
    },
    "Half Day": {
      bg: "bg-blue-50",
      text: "text-blue-600",
      iconColor: "bg-blue-500",
    },
    Absent: { bg: "bg-red-50", text: "text-red-600", iconColor: "bg-red-500" },
  };

  const config = configs[status] || configs["Present"];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 ${config.bg} ${config.text} rounded-full text-[10px] font-black uppercase tracking-widest border border-current/10 shadow-sm shadow-current/5`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${config.iconColor} shadow-[0_0_8px] shadow-current`}
      />
      {status}
    </div>
  );
}
