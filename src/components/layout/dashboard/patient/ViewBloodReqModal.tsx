"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGetBloodReqById } from "@/hooks";

import {
  Droplet,
  MapPin,
  Calendar,
  Phone,
  User,
  Clock,
  FileText,
  Building,
} from "lucide-react";

interface ViewBloodReqProps {
  id: string | null;
  viewIsOpen: boolean;
  viewOnClose: () => void;
}

export default function ViewBloodReqModal({
  id,
  viewIsOpen,
  viewOnClose,
}: ViewBloodReqProps) {
  const { data: bloodReqById, isLoading } = useGetBloodReqById(id as string);

  console.log(viewOnClose);
  return (
    <Dialog open={viewIsOpen} onOpenChange={viewOnClose}>
      <DialogContent className="max-w-lg bg-slate-900 border-slate-800 text-white p-6 sm:p-8 rounded-3xl shadow-2xl">
        <DialogHeader className="border-b border-slate-800 pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Droplet className="w-6 h-6 text-rose-500 fill-rose-500/20" />
            <span>Blood Request Details</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-xs sm:text-sm">
            Request ID:{" "}
            <span className="text-rose-400 font-mono">{id || "N/A"}</span>
          </DialogDescription>
        </DialogHeader>

        {/* STATIC DATA PRESENTATION */}
        <div className="space-y-6 pt-2">
          {/* Top Highlight Card */}
          <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 font-extrabold text-xl">
                {bloodReqById?.data.bloodGroup.slice(0, 3)}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  Group Needed
                </p>
                <p className="text-sm font-semibold text-white">
                  {bloodReqById?.data.bagsNeeded} Bags Needed
                </p>
              </div>
            </div>

            {/* Urgency Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse">
              {bloodReqById?.data.urgency}
            </span>
          </div>
        </div>
        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {/* Patient Name */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" /> Patient Name
            </p>
            <p className="font-semibold text-white">
              {bloodReqById?.data.patientName}
            </p>
          </div>

          {/* Contact Number */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-500" /> Contact Number
            </p>
            <a
              href={`tel:${bloodReqById?.data.patient.phone}`}
              className="font-semibold text-rose-400 hover:underline"
            >
              {bloodReqById?.data.patient.phone}
            </a>
          </div>

          {/* Hospital */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-500" /> Hospital /
              Clinic
            </p>
            <p className="font-semibold text-white">
              {bloodReqById?.data.hospitalName}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location
            </p>
            <p className="font-semibold text-white">
              {bloodReqById?.data.upazila}
              {bloodReqById?.data.district}
            </p>
          </div>

          {/* Needed Date */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> Date Required
            </p>
            <p className="font-semibold text-white">
              {bloodReqById?.data.neededBy}
            </p>
          </div>

          {/* Needed Time */}
          {/* <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Time Required
              </p>
              <p className="font-semibold text-white">{dummyData.neededTime}</p>
            </div>
          </div> */}

          {/* Reason / Additional Note */}
          <div className="space-y-1.5 border-t border-slate-800 pt-4">
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" /> Medical Reason
              / Notes
            </p>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
              {bloodReqById?.data.details}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
