import apiClient from "@/lib/apiClient"
import { IRegister } from "@/types/IRegister"

export const userLogin=(payload:{email:string,password:string})=>{
    return apiClient("/auth/login",{
        method:"POST",
        body:payload
    })
}
export const userLogout=()=>{
    return apiClient("/auth/logout",{
        method:"POST",
       
    })
}
export const gooleLoginCallback=()=>{
    return apiClient("/google/login/callback")
}

export const getMe=()=>{
    return apiClient("/users/get-me")
}

export const register=(payload:IRegister)=>{
     return apiClient("/auth/singup",{
        method:"POST",
        body:payload
    })
}
export const verifyEmail=(payload:{email:string,otp:string})=>{
        return apiClient("/auth/verify-email",{
        method:"POST",
        body:payload
    })
}
export const resendOTP=(payload:{email:string})=>{
        return apiClient("/auth/sent-otp",{
        method:"POST",
        body:payload
    })
}