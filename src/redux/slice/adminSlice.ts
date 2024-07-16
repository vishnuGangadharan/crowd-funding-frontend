import { createSlice } from "@reduxjs/toolkit";


const getStoredAdminInfo=()=>{
    const storedAdminInfo = localStorage.getItem("adminInfo");
    try{
        return storedAdminInfo ? JSON.parse(storedAdminInfo) : null;
    }catch(error){
        console.log("Error in parsing stored user info",error);
        localStorage.removeItem("adminInfo");
        return null;
        
    }
}


const initialState = {
    adminInfo : getStoredAdminInfo(),
}

const authSlice = createSlice({

    name:"authAdmin",
    initialState,
    reducers:{
        setAdminData: (state, action)=>{
            state.adminInfo = action.payload
            localStorage.setItem("adminInfo",JSON.stringify(action.payload))
        },
        adminLogout: (state)=>{
            state.adminInfo = null;
            localStorage.removeItem("adminInfo")
        },
        
    }
})

export const {setAdminData, adminLogout} = authSlice.actions

export default authSlice.reducer