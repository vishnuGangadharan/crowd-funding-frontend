import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndPoints";
import errorHandler from "./error";



export const fetchUsers = async (page: number, limit: number, searchTerm: string) => {
    try {
        const users = await Api.get(adminRoutes.listUsers, { params: { page, limit, searchTerm } });
        return users.data;
    } catch (error) {
        const err: Error = error as Error;
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

export const getRequest = async(currentPage:number)=> {
    try{
        const response = await Api.get(adminRoutes.campaignRequest, {params:{currentPage}})
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

export const getReport =async() => {
    try{
        const response = await Api.get(adminRoutes.allReports)
        return response.data
    }catch(error){
        const err :Error = error as Error
        errorHandler(err)
    }
}

export const blockPost = async(postId:string) =>{
    try{
        console.log('postId',postId)

        const response = await Api.post(adminRoutes.blockPost, {
            postId,
        });
        return response.data        
    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}

export const getPostDetails = async(postId:string) => {
    try {
        const response = await Api.get(adminRoutes.getPostDetails, {params: {postId}})
        return response.data

    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}


export const getFundRequest = async(currentPage:number) => {
    try{
        const response = await Api.get(adminRoutes.getFundRequest , {params:{currentPage}})
        return response.data
    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}

export const actionOnFundRequest= async(id:string | undefined)=>{
    try{
        const response = await Api.post(adminRoutes.actionOnFundRequest,{id})
        return response
    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}

export const getDashboardData = async()=> {
    try{
        const response = await Api.get(adminRoutes.getDashboardData)
        return response.data
    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}