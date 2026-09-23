export type TUserRole= "ADMIN" | "DONOR" | "PATIENT";
export type TUserStatus= "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION"


export interface IUser  {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: TUserRole;
  isDeleted:boolean,
  status: TUserStatus;
  createdAt: string;
}