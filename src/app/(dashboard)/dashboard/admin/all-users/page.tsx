"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  ArrowUpDown,
  ListOrdered,
  UserCheck,
  Mail,
  Phone,
  Shield,
  Trash2,
  Edit,
  User as UserIcon,
  Users,
} from "lucide-react";
import { useGetAllUsers } from "@/hooks/admin.hook";
import AllUserLoading from "@/components/layout/dashboard/admin/AllUserLoading";
import { TQueryPrams } from "@/types/TQueryPrams";

export default function GetAllUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(2);

  const queryPrams: TQueryPrams = {
    sortOrder: sortOrder,
    status: selectedStatus === "ALL" ? undefined : selectedStatus,
    searchTerm: searchTerm,
    limit: Number(limit),
  };

  const { data: users, isPending } = useGetAllUsers(queryPrams);
  const allUsers = users?.data.data || [];

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-6 space-y-6">
      {/* Top Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-500" />
            <span>All Registered Users</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Search, filter, and manage user accounts and statuses.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-2 self-start sm:self-auto">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-300 font-medium">
            Total Users:{" "}
            <strong className="text-rose-400 text-sm">{allUsers.length}</strong>
          </span>
        </div>
      </div>

      {/* Control Bar (Search, Status, Sort, Limit) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
        {/* 1. Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email or phone..."
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
            <option value="ALL">All</option>
            <option value="PENDING_VERIFICATION">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>

        {/* 3. Sort Order Select */}
        <div className="relative">
          <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="desc">Newest First (Desc)</option>
            <option value="asc">Oldest First (Asc)</option>
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
            <option value="2">Show 2 per page</option>
            <option value="10">Show 10 per page</option>
            <option value="20">Show 20 per page</option>
            <option value="50">Show 50 per page</option>
          </select>
        </div>
      </div>

      {/* Users Table / List */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
            {isPending &&
              [1, 2, 3].map((item) => (
                <AllUserLoading key={item}></AllUserLoading>
              ))}
            {allUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-500">
                  No users found matching the criteria.
                </td>
              </tr>
            ) : (
              allUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-950/50 transition-colors"
                >
                  {/* User Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 font-bold">
                        <UserIcon className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100">
                          {user.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" />{" "}
                            {user.email}
                          </span>
                          {user.phone && (
                            <span className="flex items-center gap-1 border-l border-slate-800 pl-2">
                              <Phone className="w-3 h-3 text-slate-500" />{" "}
                              {user.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-300">
                      <Shield className="w-3.5 h-3.5 text-rose-500" />
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        user.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : user.status === "PENDING"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="p-4 text-slate-400 text-xs">
                    {user.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
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
