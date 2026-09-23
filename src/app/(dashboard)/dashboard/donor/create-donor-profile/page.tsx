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
import { useGetMe } from "@/hooks";
import { useForm } from "@tanstack/react-form";
import { useCreateDonorProfile } from "@/hooks/donor.hook";
import { toast } from "@/components/ui/toast";

export default function CreateDonorProfileForm() {
  const { data: user } = useGetMe();
  const { mutate: createDonorProfile, isPending } = useCreateDonorProfile();

  const form = useForm({
    defaultValues: {
      name: user?.data.name,
      phone: user?.data.phone,
      address: user?.data.address,
      bloodGroup: "",
      totalDonation: "",
      lastDonation: "",
    },

    onSubmit: async ({ value }) => {
      const payload = {
        bloodGroup: value.bloodGroup,
        lastDonatedAt: new Date(value.lastDonation),
        totalDonations: Number(value.totalDonation),
      };
      createDonorProfile(payload, {
        onSuccess: (res) => {
          toast.add({
            title: res.message || "Donor Profile Create Successfull",
            type: "success",
          });
        },
        onError: (err: any) => {
          const errorMessage =
            err?.data?.message ||
            err?.data?.error ||
            err?.message ||
            "Something Went Wrong";

          toast.add({
            title: errorMessage,
            type: "error",
          });
        },
      });
    },
  });

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}

          <form.Field name="name">
            {(field) => {
              return (
                <div className="space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                  </span>
                  <input
                    id={field.name}
                    readOnly
                    disabled
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    placeholder="e.g. John Doe"
                    className="w-full bg-gray-500 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              );
            }}
          </form.Field>

          {/* Phone Number */}
          <form.Field name="phone">
            {(field) => {
              return (
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone
                    Number
                  </span>
                  <input
                    id={field.name}
                    readOnly
                    disabled
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    placeholder="01700000000"
                    className="w-full bg-gray-500 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              );
            }}
          </form.Field>

          {/* Location */}
          <form.Field name="address">
            {(field) => {
              return (
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
                  </span>
                  <input
                    id={field.name}
                    readOnly
                    disabled
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    className="w-full bg-gray-500 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              );
            }}
          </form.Field>

          {/* Blood Group */}
          <form.Field name="bloodGroup">
            {(field) => {
              return (
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-slate-400" /> Blood
                    Group
                  </span>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
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
              );
            }}
          </form.Field>

          {/* Total Donations */}
          <form.Field name="totalDonation">
            {(field) => {
              return (
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-400" /> Total
                    Donations
                  </span>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              );
            }}
          </form.Field>

          {/* Last Donated At */}
          <form.Field name="lastDonation">
            {(field) => {
              return (
                <div className="space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Last
                    Donated Date
                  </span>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              );
            }}
          </form.Field>
        </div>

        {/* Submit Button */}
        <div className="border-t border-slate-800 pt-5 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl px-6 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
          >
            {isPending ? (
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
