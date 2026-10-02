"use client";
import React from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Home,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";

// Props Type definition
export interface PaymentStatusProps {
  status?: "success" | "fail" | "cancel";
  transactionId?: string;
  amount?: string | number;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export default function PaymentStatus() {
  const params = useSearchParams();
  const status = params.get("status");
  const trxID = params.get("trxID");
  const amount = params.get("amount");

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-slate-800 bg-slate-900 text-white rounded-3xl overflow-hidden">
        {/* ================= SUCCESS STATE ================= */}
        {status === "success" && (
          <>
            <CardHeader className="bg-gradient-to-b from-emerald-950/80 to-slate-900 text-center pb-6 border-b border-slate-800/80">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-emerald-400 flex items-center justify-center gap-2">
                Thank You!{" "}
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm mt-1">
                Your Donation Successfully Accepted
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-6">
              <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Transaction ID</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {trxID}
                  </span>
                </div>
                <div className="border-t border-slate-800/60 pt-2 flex justify-between items-center text-sm">
                  <span className="text-slate-400">Amount Paid</span>
                  <span className="font-bold text-emerald-400 text-base">
                    ৳{amount} BDT
                  </span>
                </div>
              </div>
              <p className="text-xs text-center text-slate-400 leading-relaxed px-2">
                Your assistance will make our work easier. Confirmation details
                have been sent to your email or via message.
              </p>
            </CardContent>

            <CardFooter className="pt-2 pb-6">
              <Button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </CardFooter>
          </>
        )}

        {/* ================= FAILED STATE ================= */}
        {status === "failure" && (
          <>
            <CardHeader className="bg-gradient-to-b from-rose-950/80 to-slate-900 text-center pb-6 border-b border-slate-800/80">
              <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3 shadow-lg shadow-rose-950/50">
                <XCircle className="w-9 h-9 text-rose-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-rose-400">
                Payment Failed
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm mt-1">
                Sorry, Payment Can,t Completed
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-6">
              <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 text-center space-y-1">
                <p className="text-xs text-slate-400">Possible Reason</p>
                <p className="text-sm font-medium text-slate-200">
                  The payment remained incomplete due to insufficient balance or
                  network issues.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pt-2 pb-6">
              <Button
                type="button"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-950/50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold h-11 rounded-xl transition-all"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </CardFooter>
          </>
        )}

        {/* ================= CANCELLED STATE ================= */}
        {status === "cancel" && (
          <>
            <CardHeader className="bg-gradient-to-b from-amber-950/80 to-slate-900 text-center pb-6 border-b border-slate-800/80">
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-lg shadow-amber-950/50">
                <AlertTriangle className="w-9 h-9 text-amber-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-amber-400">
                Payment Cancelled
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm mt-1">
                Payment has been cancled
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-6">
              <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 text-center">
                <p className="text-sm text-slate-300">
                  No money has been deducted from your account. You can try
                  again at any time if you wish.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pt-2 pb-6">
              <Button
                type="button"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/50"
              >
                <span>Continue Donation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold h-11 rounded-xl transition-all"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
