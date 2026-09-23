"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  User,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Save,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateUser } from "@/hooks/admin.hook";
import { toast } from "@/components/ui/toast";

export default function EditUserModal({
  isOpen,
  onClose,
  setOnClose,
  refetch,
  user,
}: any) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [status, setStatus] = useState("ACTIVE");
  const { mutate: updateUser, isPending } = useUpdateUser();
  useEffect(() => {
    setIsDeleted(user.isDeleted);
    setStatus(user.status);
  }, [user]);

  if (!isOpen) return null;

  const handleSave = () => {
    const payload = {
      email: user.email,
      isDeleted,
      status: status === user.status ? undefined : status,
    };
    updateUser(payload, {
      onSuccess: (res) => {
        setOnClose(false);
        toast.add({
          title: res.message || "User Update Successfull",
          type: "success",
        });
      },
      onError: (err: any) => {
        setOnClose(false);
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
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-7 text-white shadow-2xl relative space-y-6 overflow-hidden">
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500" />

        {/* Header Section */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-rose-500 shadow-inner">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 tracking-wide">
                Edit User Account
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Manage user access & visibility
              </p>
            </div>
          </div>

          {/* Close Icon Button */}
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form / Content Section */}
        <div className="space-y-5">
          {/* 1. Is Deleted Toggle Card */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-4 transition-all hover:border-slate-700/60">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trash2
                  className={`w-4 h-4 transition-colors ${
                    isDeleted ? "text-rose-500" : "text-slate-400"
                  }`}
                />
                <span className="text-sm font-semibold text-slate-200">
                  Is Deleted Status
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Marking true will soft-delete this record.
              </p>
            </div>

            {/* Custom UI Toggle Switch */}
            <button
              type="button"
              onClick={() => setIsDeleted(!isDeleted)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isDeleted ? "bg-rose-600" : "bg-slate-800"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isDeleted ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* 2. User Status Selection */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>Select Account Status</span>
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Active */}
              <button
                type="button"
                onClick={() => setStatus("ACTIVE")}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  status === "ACTIVE"
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-950/20"
                    : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Active</span>
              </button>

              {/* Pending */}
              <button
                type="button"
                onClick={() => setStatus("PENDING_VERIFICATION")}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  status === "PENDING_VERIFICATION"
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-lg shadow-amber-950/20"
                    : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Pending</span>
              </button>

              {/* Suspended */}
              <button
                type="button"
                onClick={() => setStatus("SUSPENDED")}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  status === "SUSPENDED"
                    ? "bg-orange-500/15 border-orange-500/40 text-orange-400 shadow-lg shadow-orange-950/20"
                    : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Suspended</span>
              </button>
            </div>
          </div>
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
            type="button"
            disabled={isPending}
            onClick={handleSave}
            className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl px-5 py-2 text-xs font-semibold shadow-lg shadow-rose-900/30 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isPending ? "Save Changing..." : "Save Changes"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
