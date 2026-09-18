import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./AuthLoading";
import { UserRole } from "@/types/IUserRole";
import AccessDenied from "./AccessDenied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGaurd({ children, roles }: IProps) {
  const { data: user, isPending, isError } = useGetMe();
  const router = useRouter();
  const isAuthorized = !!user && roles.includes(user?.data.role);

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

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
