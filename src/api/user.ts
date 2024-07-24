import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";
import errorHandler from "./error";
import { beneficiary } from "../services/interface/interface";
import { userFormData } from "../services/interface/user";
// interface userFormData {
//     name?: string;
//     email?: string;
//     mobile?: string;
//     password?: string;
//     confirmPassword?: string;
//     profilePicture?: File | string;
//     newPassword?: string | undefined;
//   }

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
