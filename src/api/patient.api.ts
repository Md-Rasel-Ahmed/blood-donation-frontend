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
export const getBloodReqById=(id:string)=>{
        return apiClient(`/patient/blood-requests/${id}/responses`)
}
export const updateRequest=(payload:any)=>{
       return apiClient(`patient/bloodRequiest/${payload.id}`,{
            method:"PATCH",
            body:payload.value
        })
}