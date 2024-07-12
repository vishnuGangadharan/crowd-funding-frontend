import { createSlice } from "@reduxjs/toolkit";


const getStoredUserInfo=()=>{
    const storedUserInfo = localStorage.getItem("userInfo");
    try{
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    }catch(error){
        console.log("Error in parsing stored user info",error);
        localStorage.removeItem("userInfo");
        return null;
        
    }
}


const initialState = {
    userInfo : getStoredUserInfo(),
}

const authSlice = createSlice({

    name:"auth",
    initialState,
    reducers:{
        setUserData: (state, action)=>{
            state.userInfo = action.payload
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },
        userLogout: (state)=>{
            state.userInfo = null;
            localStorage.removeItem("userInfo")
        }
    }
})

export const {setUserData, userLogout} = authSlice.actions

export default authSlice.reducer