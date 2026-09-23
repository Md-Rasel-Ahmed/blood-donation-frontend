"use client";

import React from "react";
import {
  Calendar,
  Building2,
  MapPin,
  HeartHandshake,
  User,
  Clock,
  Droplet,
  CheckCircle2,
  Award,
  Loader2,
} from "lucide-react";
import { useGetDonationHistory } from "@/hooks/donor.hook";
import moment from "moment";

export default function DonationHistory() {
  const { data: donations, isPending } = useGetDonationHistory();
  console.log(donations);
  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-6">
      {/* Header Section */}
      <div className="border-b border-slate-800 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-rose-500" />
            <span>Donation History</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Track all your past blood donation records and contributions.
          </p>
        </div>

        {/* Total Donations Badge */}
        <div className="self-start sm:self-auto bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-300 font-medium">
            Total Donations:{" "}
            <strong className="text-amber-400 text-sm">
              {donations?.data.length}
            </strong>
          </span>
        </div>
      </div>

      {isPending && (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
          <p className="text-sm font-medium">Loading Donations History...</p>
        </div>
      )}

      {/* History List */}
      <div className="space-y-4">
        {donations?.data.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800/50">
            <Droplet className="w-10 h-10 text-slate-700 mx-auto mb-3 animate-pulse" />
            <p className="text-sm font-medium">
              No donation history recorded yet.
            </p>
          </div>
        ) : (
          donations?.data.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 sm:p-5 transition-all space-y-3.5 relative overflow-hidden"
            >
              {/* Top Bar: Patient Name & Status Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Blood Badge */}
                  <div className="w-11 h-11 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 font-bold text-sm shadow-inner">
                    {/* {formatBloodGroup(item.bloodGroup)} */}
                    {item.request.bloodGroup.slice(0, 3)}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Patient: {item.patientName}</span>
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />

                      {moment(item.lastDonatedAt).format("lll")}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className="text-[11px] px-3 py-1 rounded-full font-semibold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {item.status || "COMPLETED"}
                </span>
              </div>

              {/* Hospital & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{item.request.hospitalName}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">
                    {item.request.upazila},{item.request.district}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
