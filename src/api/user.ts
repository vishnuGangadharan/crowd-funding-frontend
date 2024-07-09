import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";
import errorHandler from "./error";


interface userFormData {
    name?: string;
    email?: string;
    mobile?: string;
    password?: string;
  }

export const signup  = async (userData: userFormData) => {
    try {
        
        const response = await Api.post(userRoutes.signup, userData);
        return response.data;
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

