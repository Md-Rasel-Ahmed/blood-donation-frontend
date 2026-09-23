import apiClient from "@/lib/apiClient"
import { IBloodRequest } from "@/types/IBloodRequest";
import { IDonor } from "@/types/IDonor";
import { IUser } from "@/types/IUser"
import { TApiResponse } from "@/types/TApiResponse"
import { TQueryPrams } from "@/types/TQueryPrams";

export const getAllUsers=(params:TQueryPrams)=>{
    
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

export const deleteUser=(email:string)=>{
  
    return apiClient(`admin/users/${email}`,{method:"DELETE"})
}
export const deleteFaceBloodReq=(id:string)=>{
    return apiClient(`admin/blood-requests/${id}`,{method:"DELETE"})
}
export const updateUser=(payload:{email:string,status:string | undefined,isDeleted:boolean})=>{
    return apiClient(`admin/user-status`,{method:"PATCH",body:payload})
}
export const updateBloodReqStatus=(id:string)=>{
    return apiClient(`admin/blood-requests/${id}`,{method:"PATCH",})
}