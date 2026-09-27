"use client";
import ComonProfile from "@/components/layout/dashboard/ComonProfile";
import { useGetMe } from "@/hooks";

export default function Profile() {
  const { data: userProfile, isLoading } = useGetMe();
  const user = userProfile?.data;

  return (
    <>
      <ComonProfile getMe={user}></ComonProfile>
    </>
  );
}
