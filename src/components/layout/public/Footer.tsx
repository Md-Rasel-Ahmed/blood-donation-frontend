"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* 🟢 Top Call to Action (CTA) Banner */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Heart className="h-6 w-6 text-rose-500 fill-current animate-pulse" />
              Ready to Save a Life Today?
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Join thousands of donors making an immediate impact in emergency situations.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/register">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white gap-2 font-medium">
                Become a Donor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/matching-requests">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                Find Urgent Requests
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 🔵 Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & About (Spans 2 cols on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center p-2 rounded-xl bg-rose-600 text-white">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                LifeFlow
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              LifeFlow is an emergency blood donation platform connecting real-time blood seekers directly with verified voluntary donors across the country.
            </p>
            <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 border border-rose-900/40 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>100% Verified Donors & Secure Requests</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-rose-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/matching-requests" className="hover:text-rose-400 transition-colors">
                  Find Blood Donors
                </Link>
              </li>
              <li>
                <Link href="/create-request" className="hover:text-rose-400 transition-colors">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rose-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-rose-400 transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-rose-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-rose-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info & Emergency Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Emergency Contact
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-slate-400">
                <Phone className="h-4 w-4 text-rose-500 shrink-0" />
                <span>+880 1800-LIFEFLOW</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <Mail className="h-4 w-4 text-rose-500 shrink-0" />
                <span>support@lifeflow.org</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 text-rose-500 shrink-0 mt-1" />
                <span>Mirpur-10, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 🔴 Bottom Bar: Copyright & Socials */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LifeFlow. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
  {/* Facebook */}
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

  {/* Twitter / X */}
  <a
    href="https://twitter.com"
    target="_blank"
    rel="noreferrer"
    className="p-2 rounded-full hover:bg-slate-800 hover:text-rose-400 transition-colors"
    aria-label="Twitter"
  >
    <svg
      className="h-4 w-4 fill-current"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  </a>

  {/* Instagram */}
  <a
    href="https://instagram.com"
    target="_blank"
    rel="noreferrer"
    className="p-2 rounded-full hover:bg-slate-800 hover:text-rose-400 transition-colors"
    aria-label="Instagram"
  >
    <svg
      className="h-4 w-4 fill-current"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noreferrer"
    className="p-2 rounded-full hover:bg-slate-800 hover:text-rose-400 transition-colors"
    aria-label="LinkedIn"
  >
    <svg
      className="h-4 w-4 fill-current"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  </a>
</div>
          </div>
        </div>
      </div>
    </footer>
  );
}