import { acceptedRequest, crateDonorProfile, getDonationHistory, getMatchRequests } from "@/api/donor.api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateDonorProfile=()=>{
    return useMutation({
        mutationFn:crateDonorProfile
    })
}

export const useGetDonationHistory=()=>{
    return useQuery({
        queryKey:["myDonations"],
        queryFn:getDonationHistory
    })
}
export const useAcceptedRequest=()=>{
  return useMutation({
    mutationFn:acceptedRequest
  })
}
export const useGetMatchRequests=()=>{
    return useQuery({
        queryKey:["matchRequest"],
        queryFn:getMatchRequests
    })
}

