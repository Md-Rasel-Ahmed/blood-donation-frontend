export type TApiResponse <T> = {
    success:boolean,
    statusCode:number,
    message:string,
    data:{
        data:T
        meta:{
            page:number,
            total:number,
            limit:number,
            totalPage:number
            
        }
    }
}