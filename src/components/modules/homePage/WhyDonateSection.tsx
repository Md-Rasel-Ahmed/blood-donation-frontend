"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  CheckCircle2,
  XCircle,
  Activity,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Scale,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Activity,
    title: "Free Health Checkup",
    description:
      "Before every donation, your pulse, blood pressure, body temperature, and hemoglobin levels are checked.",
  },
  {
    icon: RefreshCw,
    title: "Stimulates Blood Cell Production",
    description:
      "After donating, your body works to replenish the blood loss, stimulating the production of fresh blood cells.",
  },
  {
    icon: Heart,
    title: "Reduces Risk of Heart Disease",
    description:
      "Regular blood donation helps balance iron levels in the body, reducing the risk of heart attacks and strokes.",
  },
  {
    icon: Sparkles,
    title: "Mental Satisfaction & Joy",
    description:
      "Knowing that a single unit of your blood can save up to 3 lives provides deep emotional fulfillment.",
  },
];

const eligibilityCriteria = [
  {
    icon: Scale,
    label: "Weight",
    requirement: "Minimum 50 kg (110 lbs)",
    eligible: true,
  },
  {
    icon: Calendar,
    label: "Age",
    requirement: "Between 18 and 60 years old",
    eligible: true,
  },
  {
    icon: Clock,
    label: "Donation Interval",
    requirement: "At least 3 to 4 months since last donation",
    eligible: true,
  },
  {
    icon: Activity,
    label: "Hemoglobin",
    requirement: "Minimum 12.5 g/dL",
    eligible: true,
  },
];

const temporaryDeferrals = [
  "Currently suffering from fever, cold, or flu",
  "Undergone major surgery within the last 6 months",
  "Received tattoos or body piercings in the last 6-12 months",
  "Pregnant or currently breastfeeding",
  "Taking antibiotics or ongoing prescription medications",
];

export default function WhyDonateSection() {
  const [activeTab, setActiveTab] = useState<"benefits" | "eligibility">("benefits");

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-100/50 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold">
            <Heart className="h-3.5 w-3.5 fill-current" />
            Knowledge & Awareness
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Donate Blood & <span className="text-rose-600">Are You Eligible?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Learn how blood donation keeps you healthy while saving others, and check if you are ready to donate today.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex gap-1 border border-slate-200">
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "benefits"
                  ? "bg-white text-slate-900 shadow-md shadow-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Health Benefits
            </button>
            <button
              onClick={() => setActiveTab("eligibility")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "eligibility"
                  ? "bg-white text-slate-900 shadow-md shadow-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Check Eligibility
            </button>
          </div>
        </div>

        {/* Tab 1: Health Benefits */}
        {activeTab === "benefits" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {benefits.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100 hover:border-rose-200 hover:bg-white hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Eligibility Criteria */}
        {activeTab === "eligibility" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Primary Requirements List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Basic Qualification Requirements
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eligibilityCriteria.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2"
                    >
                      <div className="flex items-center gap-2.5 text-rose-600">
                        <IconComp className="h-4 w-4" />
                        <span className="text-xs font-bold text-slate-800">{item.label}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-600">{item.requirement}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Self-Check Note */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs sm:text-sm leading-relaxed flex items-start gap-3 mt-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  If you meet all the basic criteria above and feel healthy today, you are ready to register as a donor!
                </span>
              </div>
            </div>

            {/* Temporary Deferrals Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-5 shadow-xl">
              <div className="flex items-center gap-2.5 text-rose-400">
                <ShieldAlert className="h-5 w-5" />
                <h3 className="text-base font-bold text-white">Temporary Restrictions</h3>
              </div>
              <p className="text-xs text-slate-400">
                You should wait or consult a physician if any of the following apply:
              </p>
              <ul className="space-y-3">
                {temporaryDeferrals.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

        {/* CTA Footer Card */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-rose-700 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-rose-600/20">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold">Confirmed your eligibility?</h4>
            <p className="text-xs sm:text-sm text-rose-100">
              Register now to become a active blood donor in your area.
            </p>
          </div>
          <Link href="/register" className="shrink-0 w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white hover:bg-rose-50 text-rose-600 font-semibold px-6 py-5 rounded-xl gap-2 transition-all">
              Register as Donor
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}