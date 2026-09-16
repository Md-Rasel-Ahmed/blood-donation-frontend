import apiClient from "@/lib/apiClient"

export const createBloodRequest=(payload:any)=>{
        return apiClient("/patient/blood-requests",{
        method:"POST",
        body:payload
    })
}
export const getMyBloodRequests=()=>{
        return apiClient("/patient/my-requests")
}
export const getAllBloodRequests=()=>{
        return apiClient("/patient/blood-requests")
}