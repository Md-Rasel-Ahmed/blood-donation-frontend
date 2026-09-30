"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Calendar,
  ShieldCheck,
  Edit,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import EditProfileModal from "./patient/EditProfile";
import Image from "next/image";
import { useUpdateProfile } from "@/hooks";
import { toast } from "@/components/ui/toast";

export default function ComonProfile({ ...props }) {
  const { getMe } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: updateProfile } = useUpdateProfile();
  const user = {
    name: getMe?.name || "Jhon Dou",
    email: getMe?.email || "jhon@example.com",
    phone: getMe?.phone || "+880 1712-345678",
    bloodGroup: getMe?.donor?.bloodGroup || "N/A",
    location: getMe?.address || "Dhaka, Bangladesh",
    lastDonationDate: getMe?.donor?.lastDonatedAt || "00,00,00",
    bio: "Regular blood donor. Ready to help anytime in emergency situations.",
    avatarUrl: previewImg || getMe?.imgURL || "",
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const profileImg = e.target.files?.[0];
    updateProfile(profileImg, {
      onSuccess: (res) => {
        toast.add({
          title: "Profile Image Upload Success",
          type: "success",
        });
      },
      onError: (err: any) => {
        const errorMessage =
          err?.data?.message ||
          err?.data?.error ||
          err?.message ||
          "Something Went Wrong";
        console.log(errorMessage);
        toast.add({
          title: errorMessage,
          type: "error",
        });
      },
    });
  };

  const handleEditClick = () => {
    setIsOpen(true);
  };
  console.log(user.avatarUrl);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-950/60 via-slate-900 to-slate-950 border border-rose-500/20 p-6 sm:p-8 shadow-2xl">
        {/* Background Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* 📸 Profile Avatar with Hover Camera Overlay */}
          <div
            onClick={handleAvatarClick}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-tr from-rose-600 to-rose-400 p-1 shadow-lg shrink-0 group cursor-pointer overflow-hidden"
          >
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="text-3xl font-bold text-rose-400">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}

              {/* 🎥 Hover Overlay Layer */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 text-white">
                <Camera className="w-6 h-6 text-rose-400" />
                <span className="text-[10px] font-semibold text-slate-200">
                  Change
                </span>
              </div>
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
                VERIFIED {getMe?.role}
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

          {getMe?.role === "DONOR" && (
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
                  {getMe?.donor?.isAvailable ? (
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
                  {getMe?.donor?.lastDonatedAt} /{" "}
                  {moment(getMe?.donor?.lastDonatedAt).fromNow()}
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

      <EditProfileModal
        isOpen={isOpen}
        setIsopen={isOpen}
        onClose={() => setIsOpen(false)}
        user={getMe}
      />
    </div>
  );
}
