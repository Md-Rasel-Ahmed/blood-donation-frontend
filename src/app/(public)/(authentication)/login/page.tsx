"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { loginUserZodSchema } from "@/validation";
import { FieldError } from "@/components/ui/field";
import {  useGooleLoginCallback, useLogin } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {mutate:login,isPending}=useLogin()
  const {data:user,isLoading}=useGooleLoginCallback()
  const queryClient=useQueryClient()
  const searchParams = useSearchParams();
 const router=useRouter()

useEffect(() => {
    const status = searchParams.get("status");
    const message = searchParams.get("message");

    if (status === "success") {
      toast.add({
        title:message || "Goole Loging Successfull",
        type:"success"
      })
      router.push("/")
    } 
    
    if (status === "error") {
       toast.add({
        title:message || "Goole Loging Failed",
        type:"error"
      })
      router.push("/login")
    }
  }, [searchParams, router]);

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

const handleGooleLogin=async()=>{
 window.location.href = "http://localhost:5000/api/v1/auth/google";
 
}
console.log(user);
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
                {isPending ? "Signing in..." : "Sign In"}
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
        <div className="flex gap-2 justify-around">
           <Button
                onClick={handleGooleLogin}
               
                className=" flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 gap-2 font-medium py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
               Login With
                <svg
     
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
              </Button>
               <Button
                type="submit"
               
                className=" flex items-center justify-center bg-[#1877F2] hover:bg-[#166fe5] text-white gap-2 font-medium py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                Login With
                <a
    href="https://facebook.com"
    target="_blank"
   
    rel="noreferrer"
    className="p-2 rounded-full hover:bg-slate-800 hover:text-rose-400 transition-colors"
    aria-label="Facebook"
  >
    <svg
      className="h-4 w-4 fill-current"
      viewBox="0 0 24 24"
    
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  </a>
              </Button>
        </div>
      </div>
    </div>
  );
}