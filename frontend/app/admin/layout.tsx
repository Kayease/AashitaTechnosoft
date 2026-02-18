"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardSquare01Icon,
  UserGroupIcon,
  UserMultipleIcon,
  JobSearchIcon,
  PencilEdit02Icon,
  Calendar01Icon,
  Menu01Icon,
  Cancel01Icon,
  Notification01Icon,
  Search01Icon,
  Logout01Icon,
} from "@hugeicons/react";
import "./admin.css";
import { ToastProvider } from "@/components/ui/Toast";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: DashboardSquare01Icon },
  { label: "User Management", href: "/admin/users", icon: UserMultipleIcon },
  { label: "Teams", href: "/admin/teams", icon: UserGroupIcon },
  { label: "Careers", href: "/admin/careers", icon: JobSearchIcon },
  { label: "Blog", href: "/admin/blog", icon: PencilEdit02Icon },
  { label: "Attendance", href: "/admin/attendance", icon: Calendar01Icon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false);
        } else {
          setIsSidebarOpen(true);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="admin-layout flex min-h-screen">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen &&
        typeof window !== "undefined" &&
        window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm transition-opacity lg:hidden z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed left-0 top-0 h-full w-72 transition-all duration-300 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <span className="text-l font-black tracking-[0.3em] text-[#4DA3FF] uppercase w-full block">
            Admin
          </span>
        </div>

        <nav className="px-4 space-y-1 mt-2">
          <p className="text-[10px] uppercase font-bold text-[#6B7A90]/50 mb-4 px-6 tracking-[0.2em]">
            SaaS Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              >
                <Icon
                  size={20}
                  variant={isActive ? "solid" : "bulk"}
                  className={isActive ? "text-[#4DA3FF]" : "text-[#6B7A90]"}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-8">
          <div className="bg-[#F6FAFF] rounded-2xl p-4 border border-[#4DA3FF]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#4DA3FF] border border-[#4DA3FF]/10">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1E2A3A] truncate">
                  Admin User
                </p>
                <div className="text-[10px] text-[#00C07D] uppercase font-black tracking-widest flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#00C07D] animate-pulse" />
                  Administrator
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to logout?")) {
                    router.push("/auth"); // Updated to /auth per request
                  }
                }}
                className="text-[#6B7A90] hover:text-[#FF5A5A] transition-colors p-2 hover:bg-rose-50 rounded-lg group"
                title="Logout"
              >
                <Logout01Icon
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : "ml-0"}`}
      >
        <ToastProvider>
          {/* Top Header */}
          <header className="admin-header h-20 flex items-center justify-between px-10">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 bg-white text-[#6B7A90] hover:text-[#4DA3FF] rounded-xl transition-all border border-[#4DA3FF]/10 hover:border-[#4DA3FF]/30 shadow-sm"
              >
                <Menu01Icon size={22} />
              </button>
              <div className="relative hidden md:block">
                <Search01Icon
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A90]/60"
                />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="pl-12 pr-6 py-2.5 bg-white border border-[#4DA3FF]/10 rounded-xl w-80 text-sm focus:border-[#4DA3FF] transition-all placeholder:text-[#6B7A90]/40 shadow-sm outline-none"
                  aria-label="Search resources"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button
                className="relative p-2.5 bg-white border border-[#4DA3FF]/10 text-[#6B7A90] hover:text-[#4DA3FF] rounded-xl transition-all shadow-sm hover:border-[#4DA3FF]/30"
                aria-label="Notifications"
              >
                <Notification01Icon size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#4DA3FF] rounded-full border-2 border-white shadow-[0_0_10px_rgba(77,163,255,0.4)]"></span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-10 max-w-screen-2xl mx-auto">{children}</div>
        </ToastProvider>
      </main>
    </div>
  );
}
