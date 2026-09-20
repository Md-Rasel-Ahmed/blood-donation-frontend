export interface IDonor {
  id:string,
  user:{
    name:string,
    phone:string,
    address:string
  }
  bloodGroup: string;
  lastDonatedAt: string;
  totalDonations: number;
  isAvailable: boolean;
  createdAt: string;
}