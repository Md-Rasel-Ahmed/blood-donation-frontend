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
} from "lucide-react";

export interface DonationRecord {
  id: string;
  patientName: string;
  hospitalName: string;
  location: string;
  bloodGroup: string;
  donatedAt: string; // "2026-05-10T10:00:00.000Z"
  status?: "COMPLETED" | "PENDING" | "CANCELLED";
  bagsDonated?: number;
}

interface DonationHistoryProps {
  history?: DonationRecord[];
  totalDonations?: number;
}

// তারিখ ফরম্যাট করার হেলপার ফানশন
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// রক্তের গ্রুপ ফরম্যাট করার হেলপার ফানশন
const formatBloodGroup = (bg: string) => {
  if (!bg) return "";
  return bg.replace("_POSITIVE", "+").replace("_NEGATIVE", "-");
};

// ডামি ডাটা (API কানেক্ট না থাকলে এগুলো দেখাবে)
const defaultHistory: DonationRecord[] = [
  {
    id: "don-1",
    patientName: "Rahim Uddin",
    hospitalName: "Dhaka Medical College Hospital",
    location: "Dhaka",
    bloodGroup: "O_POSITIVE",
    donatedAt: "2026-05-10T10:00:00.000Z",
    status: "COMPLETED",
    bagsDonated: 1,
  },
  {
    id: "don-2",
    patientName: "Sumaiya Akter",
    hospitalName: "Square Hospital",
    location: "Dhanmondi, Dhaka",
    bloodGroup: "O_POSITIVE",
    donatedAt: "2025-12-15T11:30:00.000Z",
    status: "COMPLETED",
    bagsDonated: 1,
  },
];

export default function DonationHistory({
  history = defaultHistory,
  totalDonations,
}: DonationHistoryProps) {
  const donationCount = totalDonations ?? history.length;

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
            <strong className="text-amber-400 text-sm">{donationCount}</strong>
          </span>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800/50">
            <Droplet className="w-10 h-10 text-slate-700 mx-auto mb-3 animate-pulse" />
            <p className="text-sm font-medium">
              No donation history recorded yet.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 sm:p-5 transition-all space-y-3.5 relative overflow-hidden"
            >
              {/* Top Bar: Patient Name & Status Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Blood Badge */}
                  <div className="w-11 h-11 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 font-bold text-sm shadow-inner">
                    {formatBloodGroup(item.bloodGroup)}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Patient: {item.patientName}</span>
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      <span>Donated on: {formatDate(item.donatedAt)}</span>
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
                  <span className="truncate">{item.hospitalName}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
