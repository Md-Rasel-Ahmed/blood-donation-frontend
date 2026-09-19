export type TUserRole= "ADMIN" | "DONOR" | "PATIENT";
export type TUserStatus= "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION"


export interface IUser  {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: TUserRole;
  status: TUserStatus;
  createdAt: string;
}