import axios from "axios";
import errorHandler from "../api/error";

const BASE_URL = "http://localhost:3008/api";

const Api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

Api.interceptors.response.use( 
    (response) => response,
    (error)=>{
        if(error.response){
            console.log('axios response error message',error.response.data);
            
            return errorHandler(error);
        }else{
            console.log('axios response error',error);
            
        }
        return Promise.reject(error);
    }
)


Api.interceptors.request.use(
    (config) =>{
        console.log('axios request config',config);
        
        const token = localStorage.getItem('token');
        if(token){
            console.log('token',token);
            
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        console.log('axios request error message',error);
        return Promise.reject(error);
    }
)

export default Api;