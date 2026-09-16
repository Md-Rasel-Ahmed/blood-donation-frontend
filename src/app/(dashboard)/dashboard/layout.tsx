"use client";

import React, { useMemo, useState } from "react";
import {
  Droplet,
  LayoutDashboard,
  HeartHandshake,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  PlusCircle,
  Search,
} from "lucide-react";
import { Button } from "@base-ui/react";
import { useGetMe } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { data: user, isLoading } = useGetMe();

  const patientRoutes = [
    {
      name: "Create Blood Request",
      url: "/dashboard/patient/create-blood-request",
    },
    { name: "My Blood Requests", url: "/dashboard/patient/my-blood-requests" },
  ];
  const donorRoutes = [
    {
      name: "Create Donor Profile",
      url: "/dashboard/donor/create-donor-profile",
    },
    { name: "Donation History", url: "/dashboard/donor/donation-history" },
    { name: "Match Requests", url: "/dashboard/donor/match-request" },
  ];
  const adminRoutes = [
    { name: "All Users", url: "/dashboard/patient/create-blood-request" },
    { name: "All Donor", url: "/dashboard/patient/my-blood-requests" },
    { name: "All Blood Requests", url: "/dashboard/patient/my-blood-requests" },
  ];

  const routes = useMemo(() => {
    switch (user?.data.role) {
      case "PATIENT":
        return patientRoutes;
      case "DONOR":
        return donorRoutes;
      case "ADMIN":
        return adminRoutes;
      default:
        return [];
    }
  }, [user?.data.role]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* ==================== 1. TOPBAR ==================== */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
        {/* Left Side: Mobile Menu Button & Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle Button */}
          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
            aria-label="Toggle Navigation"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center text-rose-500">
              <Droplet className="w-5 h-5 fill-rose-500" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white hidden sm:inline-block">
              LifeFlow
            </span>
          </div>
        </div>

        {/* Right Side: Actions, Search & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Bar (Desktop) */}
          <div className="relative hidden md:block w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
            />
          </div>

          {/* New Request Quick Button */}
          {/* <Button className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-md shadow-rose-600/20">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">New Request</span>
          </Button> */}

          {/* Notification Button */}
          <Button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 bg-rose-500 rounded-full absolute top-2 right-2 ring-2 ring-slate-900" />
          </Button>

          <hr className="h-6 w-[1px] bg-slate-800" />

          {/* User Avatar */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-rose-500">
              {user?.data.name.charAt(0, 2)}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-slate-200 leading-none">
                {user?.data.name}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {user?.data.role}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== BODY CONTAINER ==================== */}
      <div className="flex flex-1 relative">
        {/* Mobile Backdrop (Click outside to close drawer) */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}

        {/* ==================== 2. SIDEBAR ==================== */}
        <aside
          className={`
            fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-slate-900 border-r border-slate-800
            flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Main Navigation Links */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
              Menu
            </p>

            {routes?.map((route) => {
              const isActive = pathname === route.url;
              return (
                <Link
                  key={route.url}
                  href={route.url}
                  // className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-rose-500/10 text-rose-500 border border-rose-500/20 transition-all"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-sm" // Active Class
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60" // Normal Class
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{route.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Preferences & Logout Section */}
          <div className="space-y-1.5 border-t border-slate-800/80 pt-4">
            <Link
              href="/dashboard/patient/setting"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ==================== 3. MAIN CONTENT AREA ==================== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
