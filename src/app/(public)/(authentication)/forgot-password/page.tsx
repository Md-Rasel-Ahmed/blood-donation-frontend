"use client";

import React, { useState } from "react";
import { Mail, KeyRound, Lock, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForgotPassword, useResetPassword, useSendEmailOTP } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [otpEmail, setOtpEmail] = useState("");
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();
  const { mutate: resetPassword, isPending: resetPending } = useResetPassword();
  const { mutate: sendOTP } = useSendEmailOTP();

  // sned email otp
  const sendEmailOtp = () => {
    forgotPassword(otpEmail, {
      onSuccess: (res) => {
        toast.add({
          title: res.message || "Send OTP Successfull",
          type: "success",
        });
        setEmail(otpEmail);
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

  //   verify OTP and change password
  const handleVerifyOTP = () => {
    const resetPasswordPayload = {
      email,
      otp,
      newPassword: password,
    };
    resetPassword(resetPasswordPayload, {
      onSuccess: (res) => {
        toast.add({
          title: res.message || "Password Reset Successfull",
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
  };

  const handleSendEmailOTP = () => {
    if (!email) {
      return;
    }
    sendOTP(email, {
      onSuccess: (res) => {
        toast.add({
          title: res.message || "Email OTP Sent Successfull",
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
  };
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Form Container */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative z-10 space-y-6 overflow-hidden">
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500" />

        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-2">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100">
            Reset Password
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Enter your account email to receive an OTP and set a new password.
          </p>
        </div>

        {/* email field for reset password */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`space-y-4 ${isSuccess && "hidden"}`}
        >
          {/* 📧 Step 1: Email Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span>
            </span>
            <div className="relative">
              <input
                type="email"
                value={otpEmail}
                onChange={(e) => setOtpEmail(e.target.value)}
                placeholder="email@gmal.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          </div>
          <Button
            type="submit"
            onClick={sendEmailOtp}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl py-2.5 text-xs sm:text-sm shadow-lg shadow-rose-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Send className="w-4 h-4" />
            <span>{isPending ? "Sending OTP.." : "Send OTP"}</span>
          </Button>
        </form>

        {/* Form Fields */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`space-y-4 ${!isSuccess && "hidden"}`}
        >
          {/* 📧 Step 1: Email Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span>
            </span>
            <div className="relative">
              <input
                type="email"
                value={email}
                readOnly
                // onChange={(e)=>setPassword(e.target.value)}

                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          </div>

          {/* 🔢 Step 2: OTP Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>OTP Code</span>
            </span>
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors tracking-widest"
              />
            </div>
            <Button onClick={handleSendEmailOTP} variant={"link"}>
              Resend OTP
            </Button>
          </div>

          {/* 🔒 Step 3: New Password Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>New Password</span>
            </span>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            onClick={handleVerifyOTP}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl py-2.5 text-xs sm:text-sm shadow-lg shadow-rose-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Send className="w-4 h-4" />
            <span>{resetPending ? "Sumiting.." : "Submit"}</span>
          </Button>
        </form>

        {/* Back to Login Link */}
        <div className="pt-2 border-t border-slate-800/80 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
