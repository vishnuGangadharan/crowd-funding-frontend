import { AxiosError } from "axios";
import axios from "axios";
import {toast} from "react-toastify";



interface IErrorResponse {
    message: string;
    accountType?: string;
  }

const errorHandler = (error: Error | AxiosError) => {
    if(axios.isAxiosError(error)){
        const axiosError = error as AxiosError;
        console.log("oooo",axiosError);
        if(axiosError.response?.data){
            const errorResposnce = axiosError.response.data as IErrorResponse
            if(axiosError.response.status === 403 && errorResposnce.accountType==="user"){
                toast.error(errorResposnce.message)
                
                if(window.location.pathname !=='/home'){
                    setTimeout(()=>{
                        window.location.href = '/home'
                    },2000)
                }
             
            }else if(axiosError.response.status ===400){
                console.log('errorResposncexxxxxx',errorResposnce);
                
                toast.error(errorResposnce.message)
                
            }else if(axiosError.message){
                toast.error(axiosError.message)
              
            }else{
                console.log("Error response has no messages");
                toast.error("An error occurred. Please try again!3")
            }
        }else{
            toast.error("An error occurred. Please try again!2");
            console.log("axiosError", axiosError.message);
        }
        
    }else{
        //  toast.error("An error occurred. Please try again!1");
        console.log("Error", error.message);
    }
}

export default errorHandler;



