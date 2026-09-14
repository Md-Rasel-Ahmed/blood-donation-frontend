"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from '@tanstack/react-form'
import { loginUserZodSchema } from "@/validation";
import { FieldError } from "@/components/ui/field";


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
 const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators:{
      onSubmit:loginUserZodSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      
    },
  })
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
        <form  onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }} className="space-y-5">
          {/* Email Input */}
          <form.Field name="email">
              {(field)=>{
                const isInvalid=field.state.meta.isTouched && !field.state.meta.isValid
                  
                return (
                 
                     <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">
              Email Address
            </span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                
                name={field.name}
                onChange={(e)=>field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                value={field.state.value}

                placeholder="name@example.com"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
            </div>
              {isInvalid && <FieldError errors={field.state.meta.errors}/>}
          </div>
                )
                 
              }}
          </form.Field>

          {/* Password Input */}
          <form.Field name="password">
             {(field)=>{
              const isInvalid=field.state.meta.isTouched && !field.state.meta.isValid
                 return (
                   <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Password
              </span>
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
                type={showPassword ? "text" : "password"}
                name={field.name}
                onChange={(e)=>field.handleChange(e.target.value)}
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
              {isInvalid && <FieldError errors={field.state.meta.errors}/>}
          </div>
                 )
             }}
          </form.Field>
         

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white gap-2 font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </Button>
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