import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";
import errorHandler from "./error";
import { beneficiary } from "../services/interface/interface";
import { userFormData } from "../services/interface/user";
import { PasswordData } from "../services/interface/user";

export const signup  = async (userData: userFormData) => {
    try {
        console.log("2ndsingup");
        
        const response = await Api.post(userRoutes.signup, userData);
        return response;
        
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}
export const verifyOtp = async(otp:number ,email:string)=>{
    try{
        const response = await Api.post(userRoutes.userOtpVerify ,{otp,email})
        return response
    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }   
}


export const login = async(userData: userFormData) => {
    try {
        console.log('here');
        
        const response = await Api.post(userRoutes.login, userData);
        console.log("jjjj",response.data.message);
        return response;
        
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}

export const editUserProfile = async(userData: userFormData) => {
    try {
        const response = await Api.post(userRoutes.editUserProfile, userData);
        return response;
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}


export const beneficiaryVerification = async(data: beneficiary) => {
    try{
        const response = await Api.post(userRoutes.beneficiaryVerification,data)
        return response
    }catch(error){
        let err:Error = error as Error;
        errorHandler(err)
    }
}
///beneficiary-otpverify


export const beneficiaryOtpVerify = async(otp:number ,email:string)=>{
    try{
        const response = await Api.post(userRoutes.beneficiaryOtpVerification ,{otp,email})
        return response
    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }   
}


export const fundraisingRegister = async(registerData:beneficiary )=>{
    try{
        const response = await Api.post(userRoutes.fundraisingRegister,registerData)
        return response
        
    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }

}


export const fileUploader = async(data:beneficiary)=> {
    try {
        const response = await Api.post(userRoutes.fileUpload,data);
         return response;

        
    } catch (error) {
        const err:Error = error as Error;
        errorHandler(err);
    }
}


export const fundraising = async(userId:string)=>{
    try{

        const response = await Api.get(userRoutes.fundraising,{params:{userId}})
        return response.data
    }catch(error){
        const err:Error = error as Error;
        errorHandler(err);
    }
}


export const getUser = async(userId:string) =>{
    try{
         const response = await Api.get(userRoutes.getUser, {params: {userId}})
         return response.data
    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}


export const getPostDetails = async(postId:string) => {
    try {

        const response = await Api.get(userRoutes.getPostDetails, {params: {postId}})
        return response.data

    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}

export const postComment = async(comment:string , postId:string,userId:string) => {
    try {
        const response = await Api.post(userRoutes.postComment, {comment , postId, userId})
        return response.data
    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}


export const geComments = async(id: string)=> {
    try{
        const response = await Api.get(userRoutes.getComment,{params: {id}})
        return response.data
    }catch(error){
        let err : Error = error as Error
        errorHandler(err)
    }
}

export const allPosts = async ()=> {
    try{
        const response = await Api.get(userRoutes.allPost)
        
        return response.data
    }catch(error){
        let err : Error = error as Error
        errorHandler(err)
    }
}


export const updatePassword  = async(passwordData : PasswordData, userId: string) => {
    try{
        const response = await Api.post(`${userRoutes.updatePassword}/${userId}`,passwordData)
        return response

    }catch(error){
        let err : Error = error as Error
        errorHandler(err)
    }

}