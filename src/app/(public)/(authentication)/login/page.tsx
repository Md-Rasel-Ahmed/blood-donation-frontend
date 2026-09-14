"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { loginUserZodSchema } from "@/validation";
import { FieldError } from "@/components/ui/field";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast, Toast } from "@/components/ui/toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {mutate:login,isPending}=useLogin()
 const router=useRouter()

  const form = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin11",
    },
    validators: {
      onSubmit: loginUserZodSchema,
    },
    onSubmit: async ({ value }) => {
      const loginPayload={
        email:value.email,
        password:value.password
      }
    login(loginPayload,{
      onSuccess:(res)=>{
        toast.add({
  title:res.message,
  description: new Date().toLocaleString(),
  type:"success"
})
router.push("/")
      },

      onError:(err)=>{
         toast.add({
  title:"Something went wrong",
  description: new Date().toLocaleString(),
  type:"error"
})
      }
    })
     
   
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
        
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
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to manage blood requests and donor updates
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Email Input */}
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
                      name={field.name}
                      
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      placeholder="name@example.com"
                      className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none transition-colors ${
                        isInvalid
                          ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/10"
                          : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      }`}
                    />
                  </div>

                  {/* Zod Error Messages UI */}
                  {isInvalid && (
                    <div className="space-y-1">
                      {field.state.meta.errors.map((error, index) => (
                        <div key={field.name} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{typeof error === "string" ? error : error?.message}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Password Input */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
                      autoComplete="off"
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

                  {/* Zod Error Messages UI */}
                  {isInvalid && (
                    <div className="space-y-1">
                      {field.state.meta.errors.map((error, index) => (
                        <div key={field.name} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{typeof error === "string" ? error : error?.message}</span>
                        </div>
                      ))}
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
                className="w-full bg-rose-600 hover:bg-rose-700 text-white gap-2 font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </form.Subscribe>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-rose-600 hover:text-rose-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}