import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndPoints";
import errorHandler from "./error";



export const fetchUsers = async ()=>{
    try{
        const users = await Api.post(adminRoutes.listUsers)
        return users
    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }
}