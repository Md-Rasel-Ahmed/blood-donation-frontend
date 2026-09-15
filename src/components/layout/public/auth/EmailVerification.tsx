"use client";

import React, { useState } from "react";
import { Mail, KeyRound, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";


export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
          {isOtpSent ? <KeyRound className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          {isOtpSent ? "Verify OTP" : "Verify Your Email"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          {isOtpSent
            ? `We have sent a 6-digit verification code to ${email}`
            : "Enter your email address to receive a verification code"}
        </p>
      </div>

      {/* Form Area */}
      {!isOtpSent ? (
        /* Step 1: Email Form */
        <form  className="space-y-4">
          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </span>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-rose-600/20 disabled:opacity-60"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Send OTP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        /* Step 2: OTP Verification Form */
        <form className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="block text-xs font-semibold text-slate-700">
                Enter Verification Code
              </span>
              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="text-xs text-rose-600 hover:underline font-medium"
              >
                Change Email
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                required
                className="w-full pl-11 pr-4 py-2.5 text-sm tracking-widest bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-800 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-rose-600/20 disabled:opacity-60"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify OTP</span>
              </>
            )}
          </button>

          {/* Resend Option */}
          <div className="text-center pt-2">
            <button
              type="button"
             
              disabled={loading}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              Didn't receive code? <span className="text-rose-600 font-semibold">Resend OTP</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}