"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  Phone,
  MapPin,
  CheckCircle2,
  Check,
  User,
  Clock,
  ArrowLeft,
  Droplet,
  Loader2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useConfirmDonorResponse, useGetBloodReqById } from "@/hooks";
import { toast } from "@/components/ui/toast";

interface DonorResponse {
  id: string;
  donorName: string;
  phone: string;
  bloodGroup: string;
  location: string;
  status: "PENDING" | "ACCEPTED" | "CONFIRMED";
  appliedAt: string;
}

interface DonorResponsesListProps {
  requestId: string;
  responses?: DonorResponse[];
  onBack?: () => void;
}

const dummyResponses: DonorResponse[] = [
  {
    id: "res-1",
    donorName: "Rahim Ahmed",
    phone: "01700000000",
    bloodGroup: "O+",
    location: "Mirpur, Dhaka",
    status: "PENDING",
    appliedAt: "10 mins ago",
  },
  {
    id: "res-2",
    donorName: "Tanvir Hasan",
    phone: "01800000000",
    bloodGroup: "O+",
    location: "Dhanmondi, Dhaka",
    status: "PENDING",
    appliedAt: "25 mins ago",
  },
];

export default function DonorResponsesList({
  requestId,
  responses = dummyResponses,
  onBack,
}: DonorResponsesListProps) {
  const { id } = useParams();
  const {
    data: requestResponse,
    isLoading,
    refetch,
  } = useGetBloodReqById(id as string);
  const { mutate: confirmResponse, isPending } = useConfirmDonorResponse();

  console.log(requestResponse?.data.responses);
  const handleAccept = (responseId: string) => {
    console.log("Accepting response:", responseId);
  };

  const handleConfirm = (responseId: string) => {
    confirmResponse(responseId, {
      onSuccess: (res) => {
        toast.add({
          title: res.message || "Blood Request Confirm",
          type: "success",
        });
        refetch();
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
      {/* Header Section */}
      <div className="border-b border-slate-800 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              onClick={onBack}
              variant="outline"
              className="p-2 bg-slate-950 border-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6 text-rose-500" />
              <span>Donor Responses</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Showing all responses for Request ID:{" "}
              <span className="text-rose-400 font-mono">{id || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* Total Badge */}
        <div className="self-start sm:self-auto bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs text-slate-300 font-medium">
          Total Responses:{" "}
          <strong className="text-rose-400">
            {requestResponse?.data.responses.length}
          </strong>
        </div>
      </div>

      {/* Responses List */}
      {isLoading && (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
          <p className="text-sm font-medium">Loading request response...</p>
        </div>
      )}

      <div className="space-y-4">
        {requestResponse?.data.responses.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800/50">
            <Droplet className="w-10 h-10 text-slate-700 mx-auto mb-3 animate-pulse" />
            <p className="text-sm font-medium">No donor responses found yet.</p>
          </div>
        ) : (
          requestResponse?.data.responses.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 sm:p-6 transition-all space-y-4"
            >
              {/* Top Bar: Donor Info & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  {/* Blood Group Badge */}
                  <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 font-bold text-base shadow-inner">
                    {item.request.bloodGroup.slice(0, 3)}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      {item.donor.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Applied {item.createdAt}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                    item.status === "PENDING"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : item.status === "ACCEPTED"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Contact and Location Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <a
                    href={`tel:${item.donor.phone}`}
                    className="hover:underline text-rose-400 font-semibold"
                  >
                    {item.donor.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{item.donor.address}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-800/80 pt-3.5">
                {/* Accept Button */}
                <Button
                  disabled={isPending || item.request.status === "FULFILLED"}
                  onClick={() => handleAccept(item.id)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>Accept</span>
                </Button>

                {/* Confirm Button */}
                <Button
                  disabled={isPending || item.request.status === "FULFILLED"}
                  onClick={() => handleConfirm(item.donorId)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
