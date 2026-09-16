import { createBloodRequest, getAllBloodRequests, getMyBloodRequests } from "@/api/patient.api"
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
        queryKey:["patient"],
        queryFn:getAllBloodRequests,
       
    })
}