"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  RotateCw,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useResendOTP, useVerifyEmail } from "@/hooks";
import { toast } from "@/components/ui/toast";

export default function EmailOtpVerificationUI() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { mutate: verifyEmail, isPending } = useVerifyEmail();
  const { mutate: resendOTP, isPending: resendPending } = useResendOTP();
  const router = useRouter();

  // ----------------- Countdown Timer Logic (5 Minutes) -----------------
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes = 300 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format seconds to MM:SS (e.g., 04:59)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };
  // --------------------------------------------------------------------

  const form = useForm({
    defaultValues: {
      email: email,
      otp: "",
    },

    onSubmit: async ({ value }) => {
      const verifyEmailPayload = {
        email: value.email as string,
        otp: value.otp,
      };
      console.log("Registration Values:", value);
      verifyEmail(verifyEmailPayload, {
        onSuccess: (res) => {
          toast.add({
            title: res.message || "Email Verification Successfull",
            type: "success",
          });
          router.push("/login");
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

  const handleResendOTP = () => {
    if (timeLeft > 0 || resendPending) return; // Prevent resend if timer active

    const payload = {
      email: email as string,
    };
    resendOTP(payload, {
      onSuccess: (res) => {
        toast.add({
          title: res.message || "Email Verification Code Sent",
          type: "success",
        });
        setTimeLeft(300); // Resend সফল হলে টাইমার আবার ৫ মিনিটে রিসেট হবে
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
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Verify Email with OTP
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your email to receive a verification code
          </p>
        </div>

        {/* Form Container */}

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Email Field */}
          <form.Field name="email">
            {(field) => {
              return (
                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </span>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id={field.name}
                      name={field.name}
                      // type={field.name}
                      value={(field.state.value as string) || ""}
                      disabled
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-800 cursor-not-allowed"
                    />
                  </div>
                </div>
              );
            }}
          </form.Field>

          {/* OTP Field */}
          <form.Field name="otp">
            {(field) => {
              return (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="block text-xs font-semibold text-slate-700">
                      Enter OTP Code
                    </span>

                    {/* Resend OTP Button with Countdown */}
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={timeLeft > 0 || resendPending}
                      className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                        timeLeft > 0 || resendPending
                          ? "text-slate-400 cursor-not-allowed"
                          : "text-rose-600 hover:text-rose-700 cursor-pointer"
                      }`}
                    >
                      <RotateCw
                        className={`w-3 h-3 ${
                          resendPending ? "animate-spin" : ""
                        }`}
                      />
                      <span>
                        {timeLeft > 0
                          ? `Resend in ${formatTime(timeLeft)}`
                          : "Resend OTP"}
                      </span>
                    </button>
                  </div>

                  <div className="relative">
                    <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Enter 6-digit OTP"
                      className="w-full pl-11 pr-4 py-2.5 text-sm tracking-widest bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-800 font-mono"
                    />
                  </div>
                </div>
              );
            }}
          </form.Field>

          {/* Verify OTP Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-slate-900/10 cursor-pointer disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isPending ? "Verifying..." : "Verify OTP"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
