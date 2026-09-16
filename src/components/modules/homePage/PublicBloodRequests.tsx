"use client";

import React, { useState } from "react";
import {
  Droplet,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  User,
  Check,
  Search,
  Filter,
  ArrowUpDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllBloodRequests } from "@/hooks";
import { Spinner } from "@/components/ui/spinner";

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  bagsNeeded: number;
  urgency: string;
  hospitalName: string;
  district: string;
  upazila: string;
  neededBy: string;

  neededTime: string;
  phone: string;
  details?: string;
  isAccepted?: boolean;
}

export default function PublicBloodRequests() {
  const { data: bloodRequests, isLoading } = useGetAllBloodRequests();

  const [searchQuery, setSearchQuery] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("all"); // 'all' | 'Critical' | 'Normal'
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'accepted' | 'pending'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' | 'desc'

  const handleResetFilters = () => {
    setSearchQuery("");
    setUrgencyFilter("all");
    setStatusFilter("all");
    setSortOrder("desc");
  };
  console.log(bloodRequests);
  return (
    <section className="w-full bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Droplet className="w-6 h-6 text-rose-500 fill-rose-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Emergency Blood Requests
              </h2>
            </div>
            <p className="text-slate-400 text-sm">
              Explore public blood requests and accept to save a life today.
            </p>
          </div>
          <div className="relative flex gap-2 items-center">
            <div className="relative flex items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-rose-600 animate-ping" />
              <span className="h-3 w-3 rounded-full bg-rose-600" />
            </div>
            <div>
              <span className="px-4 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full text-xs font-semibold text-rose-400">
                Live Feed
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-lg space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, hospital, group..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              />
            </div>

            {/* Urgency Filter */}
            <div className="lg:col-span-3 relative">
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer appearance-none"
              >
                <option value="all">Urgency: All</option>
                <option value="Critical">Critical Only</option>
                <option value="Normal">Normal Only</option>
              </select>
              <Filter className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="lg:col-span-3 relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer appearance-none"
              >
                <option value="all">Status: All</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
              </select>
              <Filter className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Order (ASC / DESC) */}
            <div className="lg:col-span-2 relative">
              <button
                type="button"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center justify-between"
              >
                <span className="truncate">
                  {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                </span>
                <ArrowUpDown className="w-4 h-4 text-rose-500 shrink-0 ml-1" />
              </button>
            </div>
          </div>

          {/* Active Filter Bar & Reset Button */}
          {(searchQuery ||
            urgencyFilter !== "all" ||
            statusFilter !== "all" ||
            sortOrder !== "desc") && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
              <span>Filter active</span>
              <Button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </Button>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center">
            <Button variant="outline" disabled size="sm">
              <Spinner data-icon="inline-start" />
              Please wait
            </Button>
          </div>
        )}
        {/* Request Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bloodRequests?.data.data.length > 0 &&
            bloodRequests?.data.data.map((request: BloodRequest) => (
              <div
                key={request.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all shadow-xl flex flex-col justify-between relative overflow-hidden"
              >
                {/* Urgency Badge (Top-Right) */}
                <div className="absolute top-6 right-6">
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    {request.urgency === "CRITICAL" && (
                      <span className="text-[10px] bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 rounded-full font-semibold">
                        {request.urgency}
                      </span>
                    )}
                    {request.urgency === "EMERGENCY" && (
                      <span className="text-[10px] bg-rose-500/10 text-rose-200 border border-rose-500/20 px-2 py-0.5 rounded-full font-semibold">
                        {request.urgency}
                      </span>
                    )}
                    {request.urgency === "NORMAL" && (
                      <span className="text-[10px] bg-rose-500/10 text-green-400 border border-rose-500/20 px-2 py-0.5 rounded-full font-semibold">
                        {request.urgency}
                      </span>
                    )}
                  </h2>
                </div>

                <div>
                  {/* Header: Blood Group & Patient Name */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 bg-rose-600/10 border border-rose-500/30 rounded-2xl flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                        {request.bagsNeeded}{" "}
                        {request.bagsNeeded > 1 ? "Bags" : "Bag"}
                      </span>
                    </div>

                    <div className="pr-16">
                      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-500" />
                        {request.patientName}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        {request.hospitalName}
                      </p>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800/80 mb-4 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                      <span className="truncate">
                        {request.upazila}, {request.district}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{request.neededBy}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{request.neededTime}10.00 PM </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                      <a
                        href={`tel:${request.phone}`}
                        className="hover:underline text-rose-400 font-medium"
                      >
                        {request.phone}
                        0170000000000
                      </a>
                    </div>
                  </div>

                  {/* Extra Note */}
                  {request.details && (
                    <p className="text-xs text-slate-400 italic mb-5 line-clamp-2">
                      "{request.details}"
                    </p>
                  )}
                </div>

                {/* Accept Button */}
                <div>
                  {request.isAccepted ? (
                    <Button
                      disabled
                      className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" />
                      <span>Request Accepted</span>
                    </Button>
                  ) : (
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 text-sm cursor-pointer">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept Request</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
