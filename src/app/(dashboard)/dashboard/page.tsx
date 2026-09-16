"use client";

import React from "react";
import {
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Activity,
  Users,
} from "lucide-react";
import { useGetMe } from "@/hooks";

interface WelcomeBannerProps {
  userName?: string;
}

export default function WelcomeBanner() {
  const { data: user } = useGetMe();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/70 via-slate-900 to-slate-950 border border-rose-500/20 p-6 sm:p-8 shadow-2xl">
      {/* Background Decorative Glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left Section: Info */}
        <div className="space-y-3.5 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>Dashboard Overview</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-rose-500">
              {user?.data.name}
            </span>
            ! 👋
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Manage your blood requests, track real-time updates, and connect
            with potential donors to help save lives directly from your
            dashboard.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Requests
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-xl">
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              Direct Connect
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-xl">
              <Activity className="w-4 h-4 text-sky-400" />
              Live Activity
            </span>
          </div>
        </div>

        {/* Right Section: Visual Card Widget */}
        <div className="w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md shadow-inner">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">
                Community Goal
              </p>
              <p className="text-sm font-semibold text-white">
                Saving Lives Together ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
