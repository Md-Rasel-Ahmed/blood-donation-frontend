import apiClient from "@/lib/apiClient"

export const crateDonorProfile=(payload:{bloodGroup:string,lastDonatedAt:Date,totalDonations:number})=>{
    return apiClient('donor/donor-profile',{
        method:'POST',
        body:payload
    })
}

export const getDonationHistory=()=>{
    return apiClient("donor/donation-history")
}
export const getMatchRequests=()=>{
    return apiClient("donor/matching-requests")
}
export const acceptedRequest=(id:string)=>{
    return apiClient(`donor/bloodRequest/${id}/accept`,{method:"POST"})
}

