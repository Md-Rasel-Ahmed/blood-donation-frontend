"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetBloodReqById, useUpdateBloodRequest } from "@/hooks";
import {
  Droplet,
  MapPin,
  Calendar,
  Phone,
  User,
  FileText,
  Building,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

interface EditBloodReqProps {
  id: string | null;
  editIsOpen: boolean;

  editOnClose: () => void;
}

export default function EditBloodReq({
  id,
  editIsOpen,
  editOnClose,
}: EditBloodReqProps) {
  const { data: bloodReqById, isLoading } = useGetBloodReqById(id as string);
  const { mutate: updateReq, isPending } = useUpdateBloodRequest();
  const queryClient = useQueryClient();
  // Form State
  const [formData, setFormData] = useState({
    patientName: "",
    bagsNeeded: 1,
    urgency: "Standard",
    hospitalName: "",
    district: "",
    upazila: "",
    neededBy: "",
    details: "",
  });

  useEffect(() => {
    if (bloodReqById?.data) {
      const data = bloodReqById.data;
      setFormData({
        patientName: data.patientName || "",
        bagsNeeded: data.bagsNeeded || 1,
        urgency: data.urgency || "Standard",
        hospitalName: data.hospitalName || "",
        district: data.district || "",
        upazila: data.upazila || "",
        neededBy: data.neededBy || "",
        details: data.details || "",
      });
    }
  }, [bloodReqById]);
  console.log(formData);
  const form = useForm({
    defaultValues: formData,

    onSubmit: async ({ value }) => {
      updateReq({ id, value } as unknown as string, {
        onSuccess: (res, variables) => {
          toast.add({
            title: res.message || "Blood Request Update Successfull",
            type: "success",
          });
          queryClient.invalidateQueries({
            queryKey: ["bloodRequest", variables.id],
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
    },
  });

  return (
    <Dialog open={editIsOpen} onOpenChange={editOnClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white p-6 sm:p-8 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-slate-800 pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Droplet className="w-6 h-6 text-rose-500 fill-rose-500/20" />
            <span>Edit Blood Request</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-xs sm:text-sm">
            Update request information for ID:{" "}
            <span className="text-rose-400 font-mono">{id || "N/A"}</span>
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
            <p className="text-sm font-medium">Loading request data...</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6 pt-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Patient Name */}
              <form.Field name="patientName">
                {(field) => {
                  return (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" /> Patient
                        Name
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* Contact Number */}
              {/* <form.Field name="phone">
                {(field) => {
                  return (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> Contact
                        Number
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                  );
                }}
              </form.Field> */}

              {/* Blood Group */}
              {/* <div className="space-y-2">
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-slate-400" /> Blood Group
                </span>
                <select
                  name="bloodGroup"
                 
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
                >
                  <option value="">Select Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div> */}

              {/* Bags Needed */}
              <form.Field name="bagsNeeded">
                {(field) => {
                  return (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-slate-300">
                        Bags Needed
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* Urgency */}
              <form.Field name="urgency">
                {(field) => {
                  return (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-slate-300">
                        Urgency Level
                      </span>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
                      >
                        <option value="Emergency">Emergency</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Standard">Standard</option>
                      </select>
                    </div>
                  );
                }}
              </form.Field>

              {/* Needed Date */}
              <form.Field name="neededBy">
                {(field) => {
                  return (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date
                        Required
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* Hospital */}
              <form.Field name="hospitalName">
                {(field) => {
                  return (
                    <div className="space-y-2 sm:col-span-2">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />{" "}
                        Hospital / Clinic
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* District */}
              <form.Field name="district">
                {(field) => {
                  return (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                        District
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* Upazila */}
              <form.Field name="upazila">
                {(field) => {
                  return (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                        Upazila
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                  );
                }}
              </form.Field>

              {/* Details / Notes */}
              <form.Field name="details">
                {(field) => {
                  return (
                    <div className="space-y-2 sm:col-span-2">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />{" "}
                        Medical Reason / Notes
                      </span>
                      <textarea
                        rows={3}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-rose-500 transition-colors resize-none"
                        placeholder="Enter details about the request..."
                      />
                    </div>
                  );
                }}
              </form.Field>
            </div>

            {/* Action Buttons */}
            <DialogFooter className="pt-4 border-t border-slate-800 gap-2 sm:gap-0">
              <Button
                type="button"
                onClick={editOnClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </Button>
              <Button
                type="submit"
                className="bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl px-5 py-2 flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-600/20"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
