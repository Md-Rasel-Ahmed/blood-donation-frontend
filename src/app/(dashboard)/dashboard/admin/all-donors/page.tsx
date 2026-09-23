"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  ArrowUpDown,
  ListOrdered,
  Phone,
  MapPin,
  Droplet,
  Calendar,
  Award,
  HeartHandshake,
  UserCheck,
  UserX,
  Edit,
  Trash2,
} from "lucide-react";
import { useGetAllDonor } from "@/hooks/admin.hook";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TQueryPrams } from "@/types/TQueryPrams";
import AllUserLoading from "@/components/layout/dashboard/admin/AllUserLoading";
import { useDebounce } from "@/hooks/debounce.hook";

export default function GetAllDonors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [limit, setLimit] = useState("10");
  const debounceValue = useDebounce(searchTerm);

  const queryPrams: TQueryPrams = {
    bloodGroup: selectedBloodGroup === "ALL" ? undefined : selectedBloodGroup,
    sortOrder: sortOrder,
    limit: Number(limit),
    searchTerm: debounceValue,
  };
  const { data: donors, isPending } = useGetAllDonor(queryPrams);
  const allDonor = donors?.data.data || [];
  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-6 space-y-6">
      {/* Top Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-rose-500" />
            <span>All Registered Donors</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Browse, search, and manage blood donors profiles and availability.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-2 self-start sm:self-auto">
          <Droplet className="w-4 h-4 text-rose-500" />
          <span className="text-xs text-slate-300 font-medium">
            Total Donors:{" "}
            <strong className="text-rose-400 text-sm">{allDonor.length}</strong>
          </span>
        </div>
      </div>

      {/* Control Bar (Search, Blood Group, Sort, Limit) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
        {/* 1. Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name or address..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        {/* 2. Blood Group Filter Select */}
        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="ALL">All Blood Groups</option>
            <option value="A_POSITIVE">A+</option>
            <option value="A_NEGATIVE">A-</option>
            <option value="B_POSITIVE">B+</option>
            <option value="B_NEGATIVE">B-</option>
            <option value="O_POSITIVE">O+</option>
            <option value="O_NEGATIVE">O-</option>
            <option value="AB_POSITIVE">AB+</option>
            <option value="AB_NEGATIVE">AB-</option>
          </select>
        </div>

        {/* 3. Sort Order Select */}
        <div className="relative">
          <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="desc">Newest Donors (Desc)</option>
            <option value="asc">Oldest Donors (Asc)</option>
          </select>
        </div>

        {/* 4. Limit Select */}
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

      {/* Donors Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4">Donor</th>
              <th className="p-4">Blood Group</th>
              <th className="p-4">Total Donations</th>
              <th className="p-4">Last Donated</th>
              <th className="p-4">Availability</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
            {isPending &&
              [1, 2, 3].map((item) => (
                <AllUserLoading key={item}></AllUserLoading>
              ))}
            {allDonor.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500">
                  No donors found matching the criteria.
                </td>
              </tr>
            ) : (
              allDonor.map((donor) => (
                <tr
                  key={donor.id}
                  className="hover:bg-slate-950/50 transition-colors"
                >
                  {/* Donor Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-rose-500 font-bold">
                        <Droplet className="w-5 h-5 fill-rose-500/20" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100">
                          {donor.user.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" />{" "}
                            {donor.user.phone}
                          </span>
                          <span className="flex items-center gap-1 border-l border-slate-800 pl-2">
                            <MapPin className="w-3 h-3 text-slate-500" />{" "}
                            {donor.user.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Blood Group */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-extrabold text-xs">
                      {/* {formatBloodGroup(donor.bloodGroup)} */}
                      {donor.bloodGroup.slice(0, 3)}
                    </span>
                  </td>

                  {/* Total Donations */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{donor.totalDonations} Times</span>
                    </div>
                  </td>

                  {/* Last Donated At */}
                  <td className="p-4 text-slate-300">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <Tooltip>
                        <TooltipTrigger>
                          {moment(donor.lastDonatedAt).format("ll")}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{moment(donor.lastDonatedAt).fromNow()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </td>

                  {/* Availability */}
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 w-fit ${
                        donor.isAvailable
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {donor.isAvailable ? (
                        <>
                          <UserCheck className="w-3 h-3" />
                          <span>Available</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-3 h-3" />
                          <span>Unavailable</span>
                        </>
                      )}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        title="Edit Donor"
                        className="w-8 h-8 bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        title="Delete Donor"
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
