import apiClient from "@/lib/apiClient"

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