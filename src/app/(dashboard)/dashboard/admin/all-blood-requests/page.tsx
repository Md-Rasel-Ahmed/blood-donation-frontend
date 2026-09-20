"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  ArrowUpDown,
  ListOrdered,
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Phone,
  User,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock3,
  Edit,
  Trash2,
} from "lucide-react";
import { useGetAllBloodRequest } from "@/hooks/admin.hook";
import { TQueryPrams } from "@/types/TQueryPrams";
import moment from "moment";

export default function GetAllBloodRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [urgency, setUrgency] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [limit, setLimit] = useState("10");
  const params: TQueryPrams = {
    searchTerm,
    urgency: urgency === "ALL" ? undefined : urgency,
    status: selectedStatus === "ALL" ? undefined : selectedStatus,
    sortOrder,
    limit: Number(limit),
  };
  const { data, isPending } = useGetAllBloodRequest(params);

  const requests = data?.data.data || [];
  console.log(requests);

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-6 space-y-6">
      {/* Top Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Droplet className="w-6 h-6 text-rose-500 fill-rose-500/20" />
            <span>All Blood Requests</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Monitor, filter, and manage all emergency blood donation requests.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-2 self-start sm:self-auto">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-300 font-medium">
            Total Requests:{" "}
            <strong className="text-rose-400 text-sm">{requests.length}</strong>
          </span>
        </div>
      </div>

      {/* Control Bar (Search, Status, Blood Group, Sort, Limit) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
        {/* 1. Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Patient,Hospital"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        {/* 2. Status Filter Select */}
        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="FULFILLED">Fulfilled</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* 3. Blood Group Filter Select */}
        <div className="relative">
          <Droplet className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="ALL">All</option>
            <option value="NORMAL">Normal</option>
            <option value="CRITICAL">Critical</option>
            <option value="EMERGENCY">Emergency</option>
          </select>
        </div>

        {/* 4. Sort Order Select */}
        <div className="relative">
          <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="desc">Newest Requests (Desc)</option>
            <option value="asc">Oldest Requests (Asc)</option>
          </select>
        </div>

        {/* 5. Limit Select */}
        <div className="relative">
          <ListOrdered className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="5">Show 5 per page</option>
            <option value="10">Show 10 per page</option>
            <option value="20">Show 20 per page</option>
            <option value="50">Show 50 per page</option>
          </select>
        </div>
      </div>

      {/* Blood Requests Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4">Patient / Recipient</th>
              <th className="p-4">Group & Bags</th>
              <th className="p-4">Hospital & Location</th>
              <th className="p-4">Donation Time</th>
              <th className="p-4">Urgency</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  No blood requests found matching the criteria.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-slate-950/50 transition-colors"
                >
                  {/* Recipient Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 font-bold">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100">
                          {req.patient.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{req.patient.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Blood Group & Bags */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-extrabold text-xs">
                        {/* {formatBloodGroup(req.bloodGroup)} */}
                        {req.bloodGroup.slice(0, 3)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {req.bagsNeeded} Bag{req.bagsNeeded > 1 ? "s" : ""}
                      </span>
                    </div>
                  </td>

                  {/* Hospital Info */}
                  <td className="p-4">
                    <div>
                      <h5 className="font-medium text-slate-200">
                        {req.hospitalName}
                      </h5>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{req.hospitalAddr}</span>
                      </div>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="p-4 text-slate-300">
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{moment(req.neededBy).format("ll")}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{moment(req.neededBy).format("LT")}</span>
                      </div>
                    </div>
                  </td>

                  {/* Urgency Level */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase border ${
                        req.urgency === "CRITICAL"
                          ? "bg-rose-600/20 text-rose-400 border-rose-500/40 animate-pulse"
                          : req.urgency === "EMERGENCY"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {req.urgency}
                    </span>
                  </td>

                  {/* Request Status */}
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 w-fit ${
                        req.status === "ACCEPTED"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : req.status === "FULFILLED"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : req.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {req.status === "ACCEPTED" && (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      {req.status === "FULFILLED" && (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      {req.status === "PENDING" && (
                        <Clock3 className="w-3 h-3" />
                      )}
                      {req.status === "CANCELLED" && (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>{req.status}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        title="Edit Request"
                        className="w-8 h-8 bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        title="Delete Request"
                        className="w-8 h-8 bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20 text-rose-400 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
