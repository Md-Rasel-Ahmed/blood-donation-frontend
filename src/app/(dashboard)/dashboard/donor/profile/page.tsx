"use client";

import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Calendar,
  ShieldCheck,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks";
import moment from "moment";

export default function Profile() {
  const { data: userProfile, isLoading } = useGetMe();

  console.log(userProfile);
  const user = {
    name: userProfile?.data.name || "Jhon Dou",
    email: userProfile?.data.email || "jhon@example.com",
    phone: userProfile?.data.phone || "+880 1712-345678",
    bloodGroup: userProfile?.data.donor.bloodGroup || "N/A",
    location: userProfile?.data.address || "Dhaka, Bangladesh",
    lastDonationDate: userProfile?.data.donor?.lastDonatedAt || "00,00,00",
    bio: "Regular blood donor. Ready to help anytime in emergency situations.",
    avatarUrl: userProfile?.data.imgURL || "",
  };

  const handleEditClick = () => {};

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border border-rose-500/20 p-6 sm:p-8 shadow-2xl">
        {/* Background Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Profile Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 p-1 shadow-lg shrink-0">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-rose-400">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* User Basic Info & Edit Button */}
          <div className="flex-1 text-center sm:text-left space-y-2 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {user.name}
                </h1>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>

              {/* Edit Profile Button */}
              <Button
                onClick={handleEditClick}
                className="bg-rose-600 hover:bg-rose-700 text-white font-medium border border-rose-500/30 rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-rose-600/20"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                <Droplet className="w-3.5 h-3.5 fill-rose-500/20" />
                Blood Group: {user.bloodGroup}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED {userProfile?.data.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Static Personal Details */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <User className="w-5 h-5 text-rose-500" />
          <span>Personal Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" /> Full Name
            </p>
            <p className="text-base font-semibold text-white">{user.name}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" /> Email Address
            </p>
            <p className="text-base font-semibold text-white">{user.email}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-500" /> Phone Number
            </p>
            <p className="text-base font-semibold text-white">{user.phone}</p>
          </div>

          {userProfile?.data.role === "DONOR" && (
            <>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-slate-500" /> Blood Group
                </p>
                <p className="text-base font-semibold text-rose-400">
                  {user.bloodGroup}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-slate-500" />
                  Is Available?
                </p>
                <p className="text-base font-semibold ">
                  {userProfile?.data.donor.isAvailable ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-rose-400">No</span>
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Last Donation Date
                </p>
                <p className="text-base font-semibold ">
                  {userProfile?.data.donor.lastDonatedAt} /
                  {moment(userProfile?.data.donor.lastDonatedAt).fromNow()}
                </p>
              </div>
            </>
          )}

          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location
            </p>
            <p className="text-base font-semibold text-white">
              {user.location}
            </p>
          </div>

          <div className="sm:col-span-2 space-y-1 pt-2">
            <p className="text-xs font-medium text-slate-400">Bio / Notes</p>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              {user.bio || "No bio added."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
