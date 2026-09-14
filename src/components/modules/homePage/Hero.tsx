"use client";

import React from "react";
import Link from "next/link";
import { Heart, Search, ArrowRight, ShieldCheck, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-16 lg:py-24">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/40 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-rose-300/30 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-ping" />
              Emergency Blood Network
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Connecting Blood <br className="hidden sm:inline" />
              Donors with <span className="bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent">Every Lifesaver</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              LifeFlow is a real-time blood donor search engine. Find blood donors near your location in minutes or register as a donor to save precious lives.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white gap-2 font-medium px-7 py-6 text-base rounded-xl shadow-lg shadow-rose-600/25 transition-all hover:scale-[1.02]">
                  Become a Donor
                  <Heart className="h-5 w-5 fill-current" />
                </Button>
              </Link>
              
              <Link href="/donors" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-slate-200 hover:bg-slate-100 text-slate-700 gap-2 font-medium px-7 py-6 text-base rounded-xl transition-all">
                  <Search className="h-5 w-5 text-slate-500" />
                  Find Donors
                </Button>
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/60">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">10k+</p>
                <p className="text-xs text-slate-500 font-medium">Active Donors</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">64</p>
                <p className="text-xs text-slate-500 font-medium">Districts Covered</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">24/7</p>
                <p className="text-xs text-slate-500 font-medium">Emergency Support</p>
              </div>
            </div>

          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Interactive Preview Card */}
            <div className="w-full max-w-md bg-white p-6 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-300/50 space-y-6 relative z-10">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Emergency Requests</h3>
                    <p className="text-xs text-slate-400">Real-time status</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 rounded-full border border-amber-200">
                  Urgent
                </span>
              </div>

              {/* Sample Emergency Item 1 */}
              <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">O+ Positive Needed</h4>
                    <p className="text-[11px] text-slate-500">Dhaka Medical College</p>
                  </div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    2 Bags
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Posted 10 mins ago</span>
                  <Link href="/requests" className="text-rose-600 font-semibold hover:underline flex items-center gap-1">
                    Donate <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Sample Emergency Item 2 */}
              <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">AB- Negative Needed</h4>
                    <p className="text-[11px] text-slate-500">Square Hospital, Mirpur</p>
                  </div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    1 Bag
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Posted 25 mins ago</span>
                  <Link href="/requests" className="text-rose-600 font-semibold hover:underline flex items-center gap-1">
                    Donate <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Floating Shield Badge */}
              <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 justify-center">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>100% Verified Donor Contact Info</span>
              </div>

            </div>

            {/* Decorative Floating Element */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg border border-slate-100 z-20">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">250+ Donors Joined</p>
                <p className="text-[10px] text-slate-400">In the last 24 hours</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}