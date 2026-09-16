"use client";

import React, { useState } from "react";
import {
  Droplet,
  Calendar,
  MapPin,
  Building2,
  Clock,
  Eye,
  Edit3,
  Trash2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Plus,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ডামি ডেমো ডাটা (আপনার ব্যাকএন্ড থেকে আসা ডাটা স্ট্রাকচার অনুযায়ী)
const MOCK_REQUESTS = [
  {
    id: "req-01",
    patientName: "Rahat Chowdhury",
    bloodGroup: "O+",
    unitsNeeded: 2,
    hospitalName: "Dhaka Medical College Hospital",
    district: "Dhaka",
    area: "Dhanmondi",
    neededDate: "2026-09-20",
    urgency: "Critical",
    status: "Pending", // Pending | Approved | Completed | Cancelled
    createdAt: "2026-09-16",
  },
  {
    id: "req-02",
    patientName: "Sumi Akter",
    bloodGroup: "AB-",
    unitsNeeded: 1,
    hospitalName: "Square Hospital",
    district: "Dhaka",
    area: "Panthapath",
    neededDate: "2026-09-25",
    urgency: "Normal",
    status: "Approved",
    createdAt: "2026-09-14",
  },
  {
    id: "req-03",
    patientName: "Abdul Karim",
    bloodGroup: "B+",
    unitsNeeded: 3,
    hospitalName: "Chittagong Medical College",
    district: "Chittagong",
    area: "Panchlaish",
    neededDate: "2026-09-10",
    urgency: "Critical",
    status: "Completed",
    createdAt: "2026-09-08",
  },
];

export default function MyBloodRequests() {
  const [filterStatus, setFilterStatus] = useState("All");

  // স্ট্যাটাস অনুযায়ী ব্যাজ কালার
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Approved":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Cancelled":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Droplet className="w-6 h-6 text-rose-500 fill-rose-500" />
            My Blood Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage, track, or update all the blood requests created by you.
          </p>
        </div>

        {/* Filter Dropdown & New Request Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500 transition-all cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <Button className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-rose-600/20 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Request</span>
          </Button>
        </div>
      </div>

      {/* Request Cards / List */}
      <div className="grid grid-cols-1 gap-4">
        {MOCK_REQUESTS.map((request) => (
          <div
            key={request.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 sm:p-6 transition-all space-y-4"
          >
            {/* Top Bar: Blood Group, Patient Name & Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Blood Group Badge */}
                <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex flex-col items-center justify-center text-rose-500 font-bold leading-none">
                  <span className="text-base">{request.bloodGroup}</span>
                  <span className="text-[9px] uppercase font-normal text-slate-400 mt-0.5">
                    {request.unitsNeeded} Bag
                    {request.unitsNeeded > 1 ? "s" : ""}
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    {request.patientName}
                    {request.urgency === "Critical" && (
                      <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full font-semibold">
                        Critical
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Requested on: {request.createdAt}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold border ${getStatusBadge(
                  request.status,
                )}`}
              >
                {request.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Building2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="truncate">{request.hospitalName}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="truncate">
                  {request.area}, {request.district}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>
                  Needed Date:{" "}
                  <strong className="text-slate-200">
                    {request.neededDate}
                  </strong>
                </span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3.5">
              <span className="text-[11px] text-slate-500">
                ID: {request.id}
              </span>

              <div className="flex items-center gap-2">
                {/* View Details */}
                <Button
                  title="View Details"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </Button>

                {/* Edit Request */}
                <Button
                  title="Edit Request"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>

                {/* Delete Request */}
                <Button
                  title="Delete Request"
                  className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
