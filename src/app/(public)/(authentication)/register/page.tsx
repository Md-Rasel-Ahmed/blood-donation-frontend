"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Droplet,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
        {/* Header / Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="flex items-center justify-center p-2 rounded-xl bg-rose-600 text-white group-hover:scale-105 transition-transform">
              <Heart className="h-6 w-6 fill-current animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent">
              LifeFlow
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create an Account
          </h2>
          <p className="text-xs text-slate-500">
            Join our community to donate blood and help save lives
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">
              Full Name
            </span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">
              Email Address
            </span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
            </div>
          </div>

          {/* Blood Group & Location Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Blood Group Select */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Blood Group
              </span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Droplet className="h-4 w-4" />
                </div>
                <select
                  name="bloodGroup"
                  defaultValue=""
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors bg-white text-slate-700"
                >
                  <option value="" disabled>
                    Select Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-700">
                District / Location
              </span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Dhaka"
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">
              Password
            </span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">
              Confirm Password
            </span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white gap-2 font-medium py-2.5 rounded-lg transition-colors mt-2"
          >
            Create Account
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-rose-600 hover:text-rose-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}