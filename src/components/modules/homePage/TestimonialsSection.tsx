"use client";

import React from "react";
import { Quote, Star, HeartHandshake } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "My father urgently required 3 bags of O- negative blood during a heart surgery. Through LifeFlow, we found donors within 40 minutes. Eternal gratitude to this platform!",
    author: "Mahmudur Rahman",
    role: "Patient's Son",
    location: "Dhaka",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "As a regular donor, LifeFlow makes it so easy to find real emergencies around my area. The direct connection feature without middle-man delays is brilliant.",
    author: "Dr. Farhana Yasmin",
    role: "Blood Donor",
    location: "Chattogram",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "During dengue season, getting A+ platelets seemed impossible until we posted an emergency request here. Two donors showed up at the hospital within hours.",
    author: "Kamrul Hasan",
    role: "Blood Recipient",
    location: "Sylhet",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-rose-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <HeartHandshake className="h-3.5 w-3.5" />
            Real Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Stories of Hope and Survival
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Hear from blood recipients and donors whose lives were touched by our community.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                    <Quote className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.author}</h4>
                  <p className="text-xs text-slate-400">
                    {item.role} • {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}