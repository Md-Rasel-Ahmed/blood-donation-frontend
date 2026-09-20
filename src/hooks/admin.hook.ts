import { getAllBloodRequest, getAllDonors, getAllUsers } from "@/api/admin.api"
import { TQueryPrams } from "@/types/TQueryPrams"
import { useQuery } from "@tanstack/react-query"

export const useGetAllUsers=(prams:TQueryPrams)=>{
    return useQuery({
        queryKey:["users",prams],
        queryFn:()=>getAllUsers(prams)
    })
}
export const useGetAllDonor=(prams:TQueryPrams)=>{
    return useQuery({
        queryKey:["donors",prams],
        queryFn:()=>getAllDonors(prams)
    })
}
export const useGetAllBloodRequest=(prams:TQueryPrams)=>{
    return useQuery({
        queryKey:["bloodRequest",prams],
        queryFn:()=>getAllBloodRequest(prams)
    })
}