import { getMe, gooleLoginCallback, register, resendOTP, userLogin, userLogout, verifyEmail } from "@/api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useLogin=()=>{
    return useMutation({
        mutationFn:userLogin
    })
}
export const useLogout=()=>{
    return useMutation({
        mutationFn:userLogout,
    
    })
}
export const useGooleLoginCallback=()=>{
   return useQuery({
        queryKey:["goole"],
        queryFn:gooleLoginCallback,
        retry:false
    })
}

export const useGetMe=()=>{
    return useQuery({
        queryKey:["user"],
        queryFn:getMe,
        retry:false
    })
}

export const useRegister=()=>{
    return useMutation({
        mutationFn:register
    })
}

export const useVerifyEmail=()=>{
     return useMutation({
        mutationFn:verifyEmail
    })
}

export const useResendOTP=()=>{
    return useMutation({
        mutationFn:resendOTP
    })
}