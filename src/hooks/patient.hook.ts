import { confirmDonorResponse, createBloodRequest, getAllBloodRequests, getBloodReqById, getMyBloodRequests, updateRequest, updateRequestStatus } from "@/api/patient.api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateBloodRequest=()=>{
    return useMutation({
        mutationFn:createBloodRequest
    })
}
export const useGetMyBloodRequests=()=>{
    return useQuery({
        queryKey:["bloodRequest"],
        queryFn:getMyBloodRequests,
       
    })
}
export const useGetAllBloodRequests=()=>{
    return useQuery({
        queryKey:["bloodRequest"],
        queryFn:getAllBloodRequests,
       
    })
}
export const useGetBloodReqById=(id:string)=>{
    return useQuery({
        queryKey:["bloodRequest",id],
        queryFn:()=>getBloodReqById(id),
        enabled: !!id
       
    })
}
export const useUpdateBloodRequest=()=>{
    return useMutation({
        mutationFn:updateRequest
    })
}
export const useUpdateBloodRequestStatus=()=>{
    return useMutation({
        mutationFn:updateRequestStatus
    })
}
export const useConfirmDonorResponse=()=>{
    return useMutation({
        mutationFn:confirmDonorResponse
    })
}