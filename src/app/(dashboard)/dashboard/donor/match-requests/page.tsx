"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Droplet,
  MapPin,
  Building2,
  Calendar,
  User,
  Sparkles,
  Phone,
  Clock,
  Send,
  Loader2,
} from "lucide-react";
import { useAcceptedRequest, useGetMatchRequests } from "@/hooks/donor.hook";
import { toast } from "@/components/ui/toast";

export default function MatchedRequests() {
  const { data: matchRequests, isPending: matchPending } =
    useGetMatchRequests();
  const { mutate: acceptedRequest, isPending } = useAcceptedRequest();

  const handleAccepet = (id: string) => {
    acceptedRequest(id, {
      onSuccess: (res) => {
        toast.add({
          title: res.message || "Request Accepted Successfull",
          type: "success",
        });
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
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
            <span>Matched Blood Requests</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Requests matching your blood group (
            <span className="text-rose-400 font-bold">
              {/* {formatBloodGroup(donorBloodGroup)} */}
            </span>
            ) & location (<span className="text-slate-200 font-medium">{}</span>
            )
          </p>
        </div>

        <div className="self-start sm:self-auto bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-xl text-xs text-rose-400 font-semibold">
          {matchRequests?.data.length} Direct Matches
        </div>
      </div>

      {matchPending && (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
          <p className="text-sm font-medium">Loading Match Requests...</p>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {matchRequests?.data.length === 0 ? (
          <div className="py-14 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800/50">
            <Droplet className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <p className="text-sm font-medium">
              No matching blood requests found at the moment.
            </p>
          </div>
        ) : (
          matchRequests?.data.map((request) => (
            <div
              key={request.id}
              className="bg-slate-950/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 sm:p-6 transition-all space-y-4"
            >
              {/* Top Section */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex flex-col items-center justify-center text-rose-500 font-bold leading-none">
                    <span className="text-base">
                      {request.bloodGroup.slice(0, 3)}
                      {/* {formatBloodGroup(request.bloodGroup)} */}
                    </span>
                    <span className="text-[9px] uppercase font-normal text-slate-400 mt-1">
                      {request.bagsNeeded} Bag
                      {request.bagsNeeded > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      {request.patientName}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      <span>Needed By: {request.neededBy}</span>
                    </p>
                  </div>
                </div>

                {/* Urgency Badge */}
                <span
                  className={`text-[11px] px-3 py-1 rounded-full font-semibold border ${
                    request.urgency === "CRITICAL"
                      ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      : request.urgency === "EMERGENCY"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {request.urgency}
                </span>
              </div>

              {/* Location & Hospital Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{request.hospitalName}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">
                    {request.upazila}, {request.district}
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3.5">
                {request.patient.phone ? (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>Contact: {request.patient.phone}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">
                    ID: {request.id}
                  </span>
                )}

                <Button
                  // onClick={() => onRespond && onRespond(request.id)}
                  onClick={() => handleAccepet(request.id)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-medium rounded-xl flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isPending ? "Accepeting.." : "Accepet"}</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
