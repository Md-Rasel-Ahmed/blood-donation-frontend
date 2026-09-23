import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 text-center relative z-10 shadow-2xl space-y-6">
        {/* Top Icon Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-800/80 border border-slate-700/60 text-rose-500 shadow-inner">
          <SearchX className="w-10 h-10 animate-bounce" />
        </div>

        {/* 404 Big Text */}
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-100">Page Not Found</h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Oops! The page you are looking for doesn't exist, was removed, or is
            temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Button className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg shadow-rose-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Link href="/" className="flex justify-center items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Footer Note */}
        <div className="pt-2 border-t border-slate-800/60">
          <p className="text-[11px] text-slate-500">
            Error Code: 404_PAGE_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
}
