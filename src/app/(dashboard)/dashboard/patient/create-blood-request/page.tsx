"use client";

import React, { useState } from "react";
import {
  Droplet,
  User,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Upload,
  FileText,
  X,
  CheckCircle2,
} from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function CreateBloodRequestUI() {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // ফাইল ইনপুট সিলেক্ট হ্যান্ডলার (ডিজাইন ভিউয়ের জন্য)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-950 px-6 py-8 sm:px-10 border-b border-slate-800 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center text-rose-500">
              <Droplet className="w-6 h-6 fill-rose-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Create Blood Request
            </h1>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm pl-13">
            Fill in the details below to request urgent blood for your patient.
          </p>
        </div>

        {/* Form Layout */}
        <form className="p-6 sm:p-10 space-y-6">
          {/* Patient Details Section */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-4 flex items-center gap-2">
              <User className="w-4 h-4" /> Patient Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Patient Name *
                </span>
                <input
                  type="text"
                  placeholder="e.g. Rahat Chowdhury"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
              </div>

              {/* Blood Group */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Blood Group Needed *
                </span>
                <select className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all">
                  <option value="">Select Group</option>
                  {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group} className="bg-slate-900">
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              {/* Units Needed */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Bags / Units Needed *
                </span>
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  max="10"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
              </div>

              {/* Urgency Level */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Urgency Level
                </span>
                <select className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-rose-400 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all">
                  <option
                    value="Normal"
                    className="bg-slate-900 text-slate-100"
                  >
                    Normal
                  </option>
                  <option
                    value="Critical"
                    className="bg-slate-900 text-rose-500"
                  >
                    Critical (Immediate)
                  </option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-800/80" />

          {/* Hospital & Location Section */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Hospital & Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hospital Name */}
              <div className="sm:col-span-2">
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Hospital / Medical Center *
                </span>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              {/* District */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  District *
                </span>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Dhaka"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              {/* Area / Thana */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Specific Area / Thana *
                </span>
                <input
                  type="text"
                  placeholder="e.g. Dhanmondi, Road 27"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
              </div>

              {/* Needed Date */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Date Needed *
                </span>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all dark:[color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Needed Time */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Time Needed
                </span>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="time"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all dark:[color-scheme:dark]"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-800/80" />

          {/* Contact & Attachments Section */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Contact & Medical Documents
            </h2>
            <div className="space-y-4">
              {/* Phone Number */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Contact Phone Number *
                </span>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="01712345678"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Additional Instructions / Note
                </span>
                <textarea
                  rows={3}
                  placeholder="Mention any specific details (e.g. Operation time, specific donor requirements...)"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none"
                />
              </div>

              {/* Prescription Upload Area */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Medical Document / Prescription (Optional)
                </span>

                {!selectedFileName ? (
                  <span className="border-2 border-dashed border-slate-800 hover:border-rose-500/50 bg-slate-950 hover:bg-slate-950/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all">
                    <Upload className="w-6 h-6 text-slate-500 mb-1" />
                    <span className="text-xs text-slate-300 font-medium">
                      Click or drag file to upload prescription
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      PNG, JPG, PDF up to 5MB
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </span>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      <span className="text-xs font-medium text-slate-200 truncate">
                        {selectedFileName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFileName(null)}
                      className="p-1 hover:bg-rose-500/20 rounded-lg text-rose-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 text-sm cursor-pointer mt-4"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Post Blood Request</span>
          </button>
        </form>
      </div>
    </div>
  );
}
