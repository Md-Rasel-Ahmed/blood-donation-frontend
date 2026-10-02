import { createPayment } from "@/api/donaton.api"
import { useMutation } from "@tanstack/react-query"

export const useCreatePayment=()=>{
    return useMutation({
        mutationFn:createPayment
    })
}