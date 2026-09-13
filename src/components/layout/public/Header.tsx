"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Search,
  Bell,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  // Auth & Notifications Data
  const user = {
    name: "Rasel",
    role: "DONOR", // 'PATIENT' | 'DONOR' | 'ADMIN'
  };

  const notifications = [
    {
      id: 1,
      title: "Emergency Request!",
      message: "O+ Blood needed near Mirpur-10",
      time: "5m ago",
    },
    {
      id: 2,
      title: "Request Approved",
      message: "Patient confirmed your donation response",
      time: "1h ago",
    },
  ];

  const handleLogout = () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center p-2 rounded-xl bg-rose-600 text-white group-hover:scale-105 transition-transform">
            <Heart className="h-5 w-5 fill-current animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent">
            LifeFlow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-rose-600 transition-colors">
            Home
          </Link>

          {user?.role === "DONOR" && (
            <Link
              href="/matching-requests"
              className="flex items-center gap-1.5 hover:text-rose-600 transition-colors"
            >
              <Search className="h-4 w-4" />
              Find Requests
            </Link>
          )}

          {user?.role === "PATIENT" && (
            <Link href="/create-request">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
              >
                <PlusCircle className="h-4 w-4" />
                Request Blood
              </Button>
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 font-semibold text-slate-800 hover:text-rose-600 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-rose-600" />
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* 🔔 NOTIFICATION POPOVER */}
              <Popover>
                <PopoverTrigger className="relative inline-flex items-center justify-center p-2 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none cursor-pointer">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <>
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-600 animate-ping" />
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-600" />
                    </>
                  )}
                </PopoverTrigger>

                <PopoverContent align="end" className="w-80 p-0 z-[100] bg-white border shadow-lg">
                  <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-slate-800">Notifications</h4>
                    <span className="text-xs bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                      {notifications.length} New
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((item) => (
                      <div key={item.id} className="p-3 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-slate-800">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* 👤 PROFILE DROPDOWN */}
             {/* 👤 PROFILE DROPDOWN */}
<DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
  <DropdownMenuTrigger >
    <button
      type="button"
      className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer border-0 bg-transparent"
    >
      <Avatar className="h-8 w-8 bg-rose-600 text-white">
        <AvatarFallback className="bg-rose-600 text-white font-semibold">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-slate-700">
        {user.name}
      </span>
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="w-56 mt-2 z-[100] bg-white border shadow-lg p-1"
  >
    <DropdownMenuGroup>
      <DropdownMenuLabel className="font-normal p-2">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs font-semibold text-rose-600 uppercase">
            {user.role}
          </p>
        </div>
      </DropdownMenuLabel>
    </DropdownMenuGroup>
    
    <DropdownMenuSeparator />
    
    <DropdownMenuGroup>
      <DropdownMenuItem 
        onSelect={() => {
          setIsProfileOpen(false);
          router.push("/profile");
        }} 
        className="cursor-pointer flex items-center gap-2 w-full p-2 hover:bg-rose-50 rounded-md"
      >
        <User className="h-4 w-4" />
        <span>My Profile</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    
    <DropdownMenuSeparator />
    
    <DropdownMenuGroup>
      <DropdownMenuItem
        onSelect={handleLogout}
        className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 flex items-center gap-2 w-full p-2 rounded-md"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Bell Icon */}
          {user && (
            <Popover>
              <PopoverTrigger className="relative p-2 rounded-full text-slate-600 hover:bg-rose-50 focus:outline-none">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-600" />
                )}
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 p-0 z-[100] bg-white border shadow-lg">
                <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-800">Notifications</h4>
                  <span className="text-[10px] bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                    {notifications.length} New
                  </span>
                </div>
                <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((item) => (
                    <div key={item.id} className="p-2.5 hover:bg-slate-50 transition-colors">
                      <p className="text-xs font-bold text-slate-800">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.message}</p>
                      <span className="text-[9px] text-slate-400 mt-0.5 block">{item.time}</span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
          </Button>
        </div>
      </div>

      {/* 📱 MOBILE DROPDOWN MENU PANEL */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-rose-100 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          
          {/* User Info (Mobile) */}
          {user && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-100">
              <Avatar className="h-10 w-10 bg-rose-600 text-white">
                <AvatarFallback className="bg-rose-600 text-white font-semibold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                <span className="text-xs font-bold text-rose-600 uppercase">{user.role}</span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-600">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              Home
            </Link>

            {user?.role === "DONOR" && (
              <Link
                href="/matching-requests"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <Search className="h-4 w-4" />
                Find Requests
              </Link>
            )}

            {user?.role === "PATIENT" && (
              <Link
                href="/create-request"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                Request Blood
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors font-semibold"
              >
                <LayoutDashboard className="h-4 w-4 text-rose-600" />
                Admin Panel
              </Link>
            )}

            {user && (
              <Link
                href="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <User className="h-4 w-4" />
                My Profile
              </Link>
            )}
          </div>

          {/* Mobile Auth Actions */}
          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <Button
                variant="destructive"
                className="w-full justify-center gap-2 bg-rose-600 hover:bg-rose-700"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}