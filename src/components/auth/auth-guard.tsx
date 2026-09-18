import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./AuthLoading";

export default function AuthGaurd({ children }: { children: ReactNode }) {
  const { data: user, isPending, isError } = useGetMe();
  const router = useRouter();
  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user?.data) {
      router.replace("/login");
    }
  }, [user, router, isError, isPending]);

  if (isPending) {
    return <AuthLoading label="Verifying Account..."></AuthLoading>;
  }

  if (isError || !user?.data) {
    return <AuthLoading label="Redirecting User..."></AuthLoading>;
  }

  return <>{children}</>;
}
