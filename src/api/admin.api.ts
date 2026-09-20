import apiClient from "@/lib/apiClient"
import { IBloodRequest } from "@/types/IBloodRequest";
import { IDonor } from "@/types/IDonor";
import { IUser } from "@/types/IUser"
import { TApiResponse } from "@/types/TApiResponse"
import { TQueryPrams } from "@/types/TQueryPrams";

export const getAllUsers=(params:TQueryPrams)=>{
    console.log(params);
    return apiClient<TApiResponse<IUser[]>>("admin/all-users",{
        params,
    })
}
export const getAllDonors=(params:TQueryPrams)=>{
    // console.log(params);
    return apiClient<TApiResponse<IDonor[]>>("admin/all-donor",{
        params,
    })
}
export const getAllBloodRequest=(params:TQueryPrams)=>{
    // console.log(params);
    return apiClient<TApiResponse<IBloodRequest[]>>("admin/blood-requests",{
        params,
    })
}