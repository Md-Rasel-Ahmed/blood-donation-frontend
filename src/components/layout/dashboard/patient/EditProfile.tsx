"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  Camera,
  Save,
  Droplet,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { useUpdateProfile } from "@/hooks";
import { toast } from "@/components/ui/toast";

export default function EditProfileModal({
  isOpen,
  onClose,
  setIsopen,
  user,
}: {
  isOpen?: boolean;
  setIsopen?: boolean;
  onClose: () => void;
  user: any;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      district: user?.district || "",
      upazila: user?.upazila || "",
      address: user?.address || "",
    },

    onSubmit: async ({ value }) => {
      const profileData = {
        name: value.name,
        phone: value.phone,
        district: value.district,
        upazila: value.upazila,
        address: value.address,
      };

      updateProfile(profileData, {
        onSuccess: (res) => {
          onClose();
          toast.add({
            title: res.message || "Profile Update Success",
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
    },
  });

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Container Card */}
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 text-white shadow-2xl relative space-y-6 overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 tracking-wide">
                Edit Profile
              </h3>
              <p className="text-xs text-slate-400">
                Update your personal info & avatar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                return (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Full Name</span>
                    </span>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      placeholder="Enter full name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                );
              }}
            </form.Field>

            {/* Phone */}
            <form.Field name="phone">
              {(field) => {
                return (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Phone Number</span>
                    </span>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      placeholder="Enter phone number"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                );
              }}
            </form.Field>

            {/* District */}
            <form.Field name="district">
              {(field) => {
                return (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>District</span>
                    </span>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                );
              }}
            </form.Field>

            {/* Upazila */}
            <form.Field name="upazila">
              {(field) => {
                return (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Upazila</span>
                    </span>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      placeholder="Bhola"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                );
              }}
            </form.Field>

            {/* Address */}
            <form.Field name="address">
              {(field) => {
                return (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Address</span>
                    </span>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      placeholder="City, Area"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                );
              }}
            </form.Field>
          </div>
          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl px-4 py-2 text-xs font-medium cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl px-5 py-2 text-xs font-semibold shadow-lg shadow-rose-900/30 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isPending ? "Save Changing.." : "Save Changes"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
