"use client";

import React from "react";
import { UserPlus, Search, PhoneCall, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create an Account",
    description:
      "Register as a blood donor or a seeker in less than 2 minutes. Fill in your blood group and location details.",
    badge: "Fast Registration",
  },
  {
    number: "02",
    icon: Search,
    title: "Find Donors or Request Blood",
    description:
      "Use our smart location filter to search nearby donors or post an emergency blood request instantly.",
    badge: "Real-time Search",
  },
  {
    number: "03",
    icon: PhoneCall,
    title: "Connect Directly",
    description:
      "Get direct access to verified phone numbers or WhatsApp. Communicate directly without any middleman.",
    badge: "Direct Contact",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Save a Life",
    description:
      "Meet at the specified hospital or blood bank. Complete the blood donation and help save a precious human life.",
    badge: "Life Saver",
  },
];

export default function HowItWork() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-rose-200/30 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold">
            Simple & Transparent Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How <span className="text-rose-600">LifeFlow</span> Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Four simple steps to connect blood donors with critical patients in emergency situations.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group"
              >
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-slate-200 group-hover:text-rose-500/20 transition-colors">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                    {step.badge}
                  </span>
                </div>

                {/* Icon & Details */}
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Decorator for Large Screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-16 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Ready to save someone&apos;s life today?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Join thousands of donors registered across Bangladesh.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/register">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-5 rounded-xl gap-2 shadow-md shadow-rose-600/20">
                Register Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}