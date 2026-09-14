"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building, Droplet, Filter, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];


const districts = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export default function SearchDonor() {
  const router = useRouter();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [upazila, setUpazila] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams({
      ...(selectedBloodGroup && { bloodGroup: selectedBloodGroup }),
      ...(district && { district }),
      ...(upazila && { upazila }),
    }).toString();

    router.push(`/donors?${query}`);
  };

  return (
    <section className="relative py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Wrapper with Shadow Card */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          
          {/* Background Gradient Blob */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/20 blur-[100px] rounded-full pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
              <Filter className="h-3.5 w-3.5" />
              Quick Donor Lookup
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Find Available Donors Near You
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Select blood group and location to instantly find active blood donors in your area.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-6">
            
            {/* Blood Group Selection Grid */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Droplet className="h-4 w-4 text-rose-500" />
                Select Blood Group
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
                {bloodGroups.map((group) => {
                  const isSelected = selectedBloodGroup === group;
                  return (
                    <button
                      key={group}
                      type="button"
                      onClick={() => setSelectedBloodGroup(isSelected ? "" : group)}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all border ${
                        isSelected
                          ? "bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/40 scale-105"
                          : "bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      {group}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location Inputs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2">
              
              {/* District Select */}
              <div className="sm:col-span-5 space-y-1.5">
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  District
                </span>
                <div className="relative">
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 text-sm bg-slate-800/80 border border-slate-700/60 rounded-xl text-slate-200 focus:outline-none focus:border-rose-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">Select District</option>
                    {districts.map((d) => (
                      <option key={d} value={d} className="bg-slate-900 text-slate-200">
                        {d}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Upazila Input */}
              <div className="sm:col-span-4 space-y-1.5">
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-rose-500" />
                  Upazila / Area
                </span>
                <input
                  type="text"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  placeholder="e.g. Mirpur, Dhanmondi"
                  className="w-full px-4 py-3 text-sm bg-slate-800/80 border border-slate-700/60 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* Search Submit Button */}
              <div className="sm:col-span-3 flex items-end">
                <Button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-6 rounded-xl gap-2 transition-all shadow-lg shadow-rose-600/30"
                >
                  <Search className="h-4 w-4" />
                  Search Donors
                </Button>
              </div>

            </div>

          </form>

          {/* Feature Highlights Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Direct Phone & WhatsApp Access</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Location-based Smart Search</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Filtered Ready Donors</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}