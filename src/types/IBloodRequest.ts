export interface IBloodRequest {
  id: string;
  patient:{
  phone:string,
  name:string
  },
 
  bloodGroup: string;
  bagsNeeded: number;
  hospitalName: string;
  hospitalAddr: string;
  neededBy:string

  urgency: "EMERGENCY" | "CRITICAL" | "NORMAL";
  status: "PENDING" | "ACCEPTED" | "CANCELLED" | "FULFILLED";
  createdAt: string;
}
    