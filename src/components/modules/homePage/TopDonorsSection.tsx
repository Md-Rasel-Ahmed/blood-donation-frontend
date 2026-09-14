"use client";

import React from "react";
import Link from "next/link";
import { Award, Droplet, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const donors = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    bloodGroup: "O+",
    location: "Mirpur, Dhaka",
    donationsCount: 14,
    lastDonated: "10 days ago",
    badge: "Super Donor",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    bloodGroup: "A-",
    location: "Agrabad, Chattogram",
    donationsCount: 8,
    lastDonated: "1 month ago",
    badge: "Hero Donor",
  },
  {
    id: 3,
    name: "Rahim Chowdhury",
    bloodGroup: "B+",
    location: "Zindabazar, Sylhet",
    donationsCount: 19,
    lastDonated: "2 weeks ago",
    badge: "Life Saver",
  },
  {
    id: 4,
    name: "Sabbir Hossain",
    bloodGroup: "AB+",
    location: "Boalia, Rajshahi",
    donationsCount: 11,
    lastDonated: "3 days ago",
    badge: "Active Donor",
  },
];

export default function TopDonorsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-xs font-semibold">
              <Award className="h-3.5 w-3.5" />
              Donor Leaderboard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Lifesaver Community
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Honoring regular donors who consistently contribute to saving lives.
            </p>
          </div>
          
          <Link href="/donors" className="shrink-0">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 gap-2 font-medium">
              View All Donors
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Donors Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donors.map((donor) => (
            <div
              key={donor.id}
              className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-rose-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Blood Group */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                    {donor.badge}
                  </span>
                  <div className="flex items-center gap-1 font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg text-sm border border-rose-100">
                    <Droplet className="h-3.5 w-3.5 fill-current" />
                    {donor.bloodGroup}
                  </div>
                </div>

                {/* Name & Details */}
                <h3 className="text-base font-bold text-slate-900 mb-2">{donor.name}</h3>
                
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{donor.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>Last Donated: {donor.lastDonated}</span>
                  </div>
                </div>
              </div>

              {/* Donation Count Tag */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Total Donations</span>
                <span className="font-extrabold text-slate-900 bg-slate-200/60 px-2.5 py-0.5 rounded-full">
                  {donor.donationsCount} Times
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}