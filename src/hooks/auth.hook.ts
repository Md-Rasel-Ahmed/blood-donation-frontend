import { forgotPassword, getMe, gooleLoginCallback, register, resendOTP, resetPassword, sendEmailOTP, updateProfile, userLogin, userLogout, verifyEmail } from "@/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useLogin=()=>{
    return useMutation({
        mutationFn:userLogin
    })
}
export const useLogout=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:userLogout,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["user"]})
        }
    
    })
}
export const useGooleLoginCallback=()=>{
   return useQuery({
        queryKey:["user"],
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
export const useUpdateProfile=()=>{
     const queryClient=useQueryClient()
    return useMutation({
        mutationFn:updateProfile,
         onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["user"]})
    }
    })
}
export const useForgotPassword=()=>{
    return useMutation({
        mutationFn:forgotPassword
    })
}
export const useResetPassword=()=>{
    return useMutation({
        mutationFn:resetPassword
    })
}
export const useSendEmailOTP=()=>{
    return useMutation({
        mutationFn:sendEmailOTP
    })
}