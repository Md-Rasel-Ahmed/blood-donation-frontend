import { deleteFaceBloodReq, deleteUser, getAllBloodRequest, getAllDonors, getAllUsers, updateBloodReqStatus, updateUser } from "@/api/admin.api"
import { TQueryPrams } from "@/types/TQueryPrams"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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


export const useDeleteUser=()=>{
  const queryClient=useQueryClient()
 return useMutation({
    mutationFn:deleteUser,
       onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["users"]})
    }
  })
}
export const useDeleteFakeBloodReq=()=>{
   const queryClient=useQueryClient()
 return useMutation({
    mutationFn:deleteFaceBloodReq,
      onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["bloodRequest"]})
    }
  })
}
export const useUpdateUser=()=>{
  const queryClient=useQueryClient()
 return useMutation({
    mutationFn:updateUser,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["users"]})
    }
  })
}
export const useUpdateBloodReqStatus=()=>{
   const queryClient=useQueryClient()
 return useMutation({
    mutationFn:updateBloodReqStatus,
      onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["bloodRequest"]})
    }
    
  })
}