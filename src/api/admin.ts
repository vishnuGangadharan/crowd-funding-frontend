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

export const blockUser= async (id:string)=>{
    try{
        const response = await Api.post(`${adminRoutes.blockUser}/${id}`)
        return response

    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }
}