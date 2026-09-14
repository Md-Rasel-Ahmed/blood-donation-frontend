"use client";

import React from "react";
import { Users, Droplets, MapPin, Heart, Award } from "lucide-react";

const stats = [
  {
    icon: Droplets,
    value: "15,400+",
    label: "Bags of Blood Donated",
    description: "Successfully provided to critical patients",
  },
  {
    icon: Heart,
    value: "12,200+",
    label: "Lives Saved",
    description: "Impacted lives across the nation",
  },
  {
    icon: Users,
    value: "25,000+",
    label: "Registered Donors",
    description: "Active community members ready to help",
  },
  {
    icon: MapPin,
    value: "64",
    label: "Districts Covered",
    description: "Seamless support in all districts",
  },
];

export default function ImpactStatsSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <Award className="h-3.5 w-3.5" />
            Our Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Making a Real Difference Every Day
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Together with our amazing donor community, we are bridging the gap between emergency blood needs and donors.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div
                key={stat.value}
                className="bg-slate-800/50 border border-slate-700/60 p-6 sm:p-8 rounded-2xl hover:border-rose-500/40 hover:bg-slate-800 transition-all duration-300 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center mx-auto">
                  <IconComp className="h-6 w-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">{stat.label}</h3>
                  <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}