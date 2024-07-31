import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndPoints";
import errorHandler from "./error";



export const fetchUsers = async ()=>{
    try{
        const users = await Api.get(adminRoutes.listUsers)
        return users.data
    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }
}

export const handleBlockStatus= async (id:string,status:boolean)=>{
    try{
        const response = await Api.post(`${adminRoutes.handleBlockStatus}/${id}`,{status})
        return response

    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }
}

export const getRequest = async()=> {
    try{
        const response = await Api.get(adminRoutes.campaignRequest)
        return response.data
    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }
}

export const postApproval = async(postId : string , status : string)=>{
    try{

        const response = await Api.post(adminRoutes.adminPostApproval,{postId,status})
        return response
    }catch(error){
        const err : Error = error as Error
        errorHandler(err)
    }
}