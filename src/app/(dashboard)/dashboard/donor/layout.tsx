"use client";
import RoleGaurd from "@/components/auth/role-guard";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <RoleGaurd roles={["DONOR"]}>{children}</RoleGaurd>;
}
