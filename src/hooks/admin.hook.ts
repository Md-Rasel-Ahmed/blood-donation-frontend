import { getAllUsers } from "@/api/admin.api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllUsers=(prams:any)=>{
    return useQuery({
        queryKey:["users",prams],
        queryFn:()=>getAllUsers(prams)
    })
}