import { getMe, gooleLoginCallback, userLogin, userLogout } from "@/api"
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