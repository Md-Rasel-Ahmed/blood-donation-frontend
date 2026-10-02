import apiClient from "@/lib/apiClient"

export const createPayment=(payload:{amount:number})=>{
    return apiClient("/donation/create-donation",{
        method:"POST",
        body:JSON.stringify(payload)
    })
}