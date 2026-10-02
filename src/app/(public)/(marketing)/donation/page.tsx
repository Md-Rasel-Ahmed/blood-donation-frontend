"use client";
import React, { useState } from "react";
import { Heart, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreatePayment } from "@/hooks/donaton.hook";
import { toast } from "@/components/ui/toast";

const defaultAmount = [100, 500, 1000, 2000];

export default function DonationUI() {
  const [amount, setAmount] = useState(100);
  const { mutate: createPayment, isPending } = useCreatePayment();
  // make donaton
  const handleMakeDonation = () => {
    const payload = {
      amount,
    };
    createPayment(payload, {
      onSuccess: (res) => {
        console.log(res);
        const paymentURL = res.data.PaymentURL;
        window.location.href = paymentURL;
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
    <Card className="w-full max-w-md mx-auto shadow-2xl border-emerald-500/20 bg-slate-900 text-white overflow-hidden rounded-3xl my-3">
      {/* Header Banner */}
      <CardHeader className="bg-gradient-to-b from-emerald-950/60 to-slate-900 text-center pb-6 border-b border-slate-800">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
          <Heart className="w-7 h-7 fill-emerald-500/20 text-emerald-400" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
          Support Our Mission <Sparkles className="w-4 h-4 text-amber-400" />
        </CardTitle>
        <CardDescription className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
          Our services are completely free. However, a small contribution helps
          us keep saving lives!
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Preset Amounts */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Select Amount (BDT)
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {defaultAmount.map((taka) => (
              <Button
                key={taka}
                onClick={() => setAmount(Number(taka))}
                type="button"
                variant="outline"
                className={`h-11  border-slate-800 bg-slate-950 hover:border-emerald-500 hover:text-emerald-400 ${amount === taka && "bg-emerald-500"} text-slate-200 font-semibold text-sm rounded-xl transition-all`}
              >
                {taka}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Or Custom Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              ৳
            </span>
            <Input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              className="pl-8 h-11 bg-slate-950 border-slate-800 focus-visible:ring-emerald-500 text-white font-medium text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Payment Options (Static Visual UI) */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Payment Method
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {/* bKash */}
            <div className="border-2 border-emerald-500 bg-emerald-500/10 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all">
              <span className="text-xs font-bold text-pink-400">bKash</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-1" />
            </div>

            {/* Nagad */}
            <div className="border-2 border-slate-800 bg-slate-950 hover:border-slate-700 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all">
              <span className="text-xs font-bold text-orange-400">Nagad</span>
            </div>

            {/* Card / Other */}
            <div className="border-2 border-slate-800 bg-slate-950 hover:border-slate-700 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all">
              <span className="text-xs font-bold text-blue-400">Card</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
        <Button
          type="button"
          disabled={isPending}
          onClick={handleMakeDonation}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-950/50 h-12 text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>{isPending ? "Redirecting..." : "Donate Now"}</span>
        </Button>
        <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Secured with SSL Encryption
        </p>
      </CardFooter>
    </Card>
  );
}
