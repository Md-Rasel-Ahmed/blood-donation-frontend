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
  Phone,
  MapPin,
  Building,
  Home,
  UserCheck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { createUserZodSchema } from "@/validation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "donor",
      district: "",
      upazila: "",
      address: "",
      password: "",
    },
    validators: {
      onSubmit: createUserZodSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Registration Values:", value);
      // Backend registration API call here
    },
  });

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
        
        {/* Header / Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-1">
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
            Join our network to save lives or request blood when needed
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name Field */}
            <form.Field name="fullName">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors &&
                  field.state.meta.errors.length > 0;

                return (
                  <div className="space-y-1.5">
                    <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="John Doe"
                        className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none transition-colors ${
                          isInvalid
                            ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                            : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        }`}
                      />
                    </div>
                    {isInvalid && (
                      <div className="space-y-1">
                        {field.state.meta.errors.map((error, index) => {
                          const errMessage = typeof error === "string" ? error : error?.message;
                          return (
                            <div key={`${field.name}-err-${index}`} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>{errMessage}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Email Field */}
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors &&
                  field.state.meta.errors.length > 0;

                return (
                  <div className="space-y-1.5">
                    <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        id={field.name}
                        type="email"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="name@example.com"
                        className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none transition-colors ${
                          isInvalid
                            ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                            : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        }`}
                      />
                    </div>
                    {isInvalid && (
                      <div className="space-y-1">
                        {field.state.meta.errors.map((error, index) => {
                          const errMessage = typeof error === "string" ? error : error?.message;
                          return (
                            <div key={`${field.name}-err-${index}`} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>{errMessage}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }}
            </form.Field>

          </div>

          {/* Phone & Role Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone Field */}
            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors &&
                  field.state.meta.errors.length > 0;

                return (
                  <div className="space-y-1.5">
                    <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        id={field.name}
                        type="tel"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="01700000000"
                        className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none transition-colors ${
                          isInvalid
                            ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                            : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        }`}
                      />
                    </div>
                    {isInvalid && (
                      <div className="space-y-1">
                        {field.state.meta.errors.map((error, index) => {
                          const errMessage = typeof error === "string" ? error : error?.message;
                          return (
                            <div key={`${field.name}-err-${index}`} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>{errMessage}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Role Select Field */}
            <form.Field name="role">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors &&
                  field.state.meta.errors.length > 0;

                return (
                  <div className="space-y-1.5">
                    <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                      Account Role
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none transition-colors bg-white text-slate-700 ${
                          isInvalid
                            ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                            : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        }`}
                      >
                        <option value="donor">Donor</option>
                        <option value="Patient">Patient</option>
                      </select>
                    </div>
                    {isInvalid && (
                      <div className="space-y-1">
                        {field.state.meta.errors.map((error, index) => {
                          const errMessage = typeof error === "string" ? error : error?.message;
                          return (
                            <div key={`${field.name}-err-${index}`} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>{errMessage}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }}
            </form.Field>

          </div>

          {/* District & Upazila Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* District Field */}
            <form.Field name="district">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors &&
                  field.state.meta.errors.length > 0;

                return (
                  <div className="space-y-1.5">
                    <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                      District
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <input
                        id={field.name}
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="e.g. Dhaka"
                        className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none transition-colors ${
                          isInvalid
                            ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                            : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        }`}
                      />
                    </div>
                    {isInvalid && (
                      <div className="space-y-1">
                        {field.state.meta.errors.map((error, index) => {
                          const errMessage = typeof error === "string" ? error : error?.message;
                          return (
                            <div key={`${field.name}-err-${index}`} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>{errMessage}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Upazila Field */}
            <form.Field name="upazila">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors &&
                  field.state.meta.errors.length > 0;

                return (
                  <div className="space-y-1.5">
                    <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                      Upazila
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building className="h-4 w-4" />
                      </div>
                      <input
                        id={field.name}
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="e.g. Mirpur"
                        className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none transition-colors ${
                          isInvalid
                            ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                            : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        }`}
                      />
                    </div>
                    {isInvalid && (
                      <div className="space-y-1">
                        {field.state.meta.errors.map((error, index) => {
                          const errMessage = typeof error === "string" ? error : error?.message;
                          return (
                            <div key={`${field.name}-err-${index}`} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>{errMessage}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }}
            </form.Field>

          </div>

          {/* Address Field */}
          <form.Field name="address">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-1.5">
                  <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                    Full Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Home className="h-4 w-4" />
                    </div>
                    <input
                      id={field.name}
                      type="text"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="House, Road, Area details..."
                      className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none transition-colors ${
                        isInvalid
                          ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                          : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      }`}
                    />
                  </div>
                  {isInvalid && (
                    <div className="space-y-1">
                      {field.state.meta.errors.map((error, index) => {
                        const errMessage = typeof error === "string" ? error : error?.message;
                        return (
                          <div key={`${field.name}-err-${index}`} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{errMessage}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Password Field */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-1.5">
                  <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="••••••••"
                      className={`w-full pl-9 pr-10 py-2 text-sm border rounded-lg focus:outline-none transition-colors ${
                        isInvalid
                          ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                          : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      }`}
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
                  {isInvalid && (
                    <div className="space-y-1">
                      {field.state.meta.errors.map((error, index) => {
                        const errMessage = typeof error === "string" ? error : error?.message;
                        return (
                          <div key={`${field.name}-err-${index}`} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{errMessage}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Submit Button */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white gap-2 font-medium py-2.5 rounded-lg transition-colors mt-2 disabled:opacity-50"
              >
                {isSubmitting ? "Registering..." : "Register Now"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </form.Subscribe>
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