export type TApiResponse <T> = {
    success:boolean,
    statusCode:number,
    message:string,
    data:{
        data:T
    }
}