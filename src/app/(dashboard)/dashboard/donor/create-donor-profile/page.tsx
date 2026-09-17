"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Droplet,
  Calendar,
  Award,
  Phone,
  MapPin,
  Save,
  Loader2,
  HeartHandshake,
} from "lucide-react";

interface CreateDonorProfileFormProps {
  onSubmit?: (data: {
    name: string;
    phone: string;
    location: string;
    bloodGroup: string;
    lastDonatedAt: string;
    totalDonations: number;
  }) => void;
  isLoading?: boolean;
}

export default function CreateDonorProfileForm({
  onSubmit,
  isLoading = false,
}: CreateDonorProfileFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bloodGroup: "O_POSITIVE",
    lastDonatedAt: "",
    totalDonations: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ISO string ফরম্যাটে তারিখ রূপান্তর (API এর সাথে মিল রাখতে)
    const payload = {
      ...formData,
      lastDonatedAt: formData.lastDonatedAt
        ? new Date(formData.lastDonatedAt).toISOString()
        : new Date().toISOString(),
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      console.log("Submitted Payload:", payload);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <HeartHandshake className="w-6 h-6 text-rose-500" />
          <span>Create Donor Profile</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Provide your blood donation details to register as a donor.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01700000000"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Dhaka"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Blood Group */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-slate-400" /> Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
            >
              <option value="A_POSITIVE">A+</option>
              <option value="A_NEGATIVE">A-</option>
              <option value="B_POSITIVE">B+</option>
              <option value="B_NEGATIVE">B-</option>
              <option value="O_POSITIVE">O+</option>
              <option value="O_NEGATIVE">O-</option>
              <option value="AB_POSITIVE">AB+</option>
              <option value="AB_NEGATIVE">AB-</option>
            </select>
          </div>

          {/* Total Donations */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-slate-400" /> Total Donations
            </label>
            <input
              type="number"
              name="totalDonations"
              min="0"
              value={formData.totalDonations}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Last Donated At */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Last Donated
              Date
            </label>
            <input
              type="datetime-local"
              name="lastDonatedAt"
              value={formData.lastDonatedAt}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t border-slate-800 pt-5 flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl px-6 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Profile...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Create Profile</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
