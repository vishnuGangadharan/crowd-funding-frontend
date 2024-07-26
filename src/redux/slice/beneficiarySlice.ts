import { createSlice } from "@reduxjs/toolkit";



const getStoredBeneficiaryInfo = () => {
    const storedBeneficiaryInfo = localStorage.getItem("beneficiaries")
    try {
      return storedBeneficiaryInfo ? JSON.parse(storedBeneficiaryInfo): null;

    }catch(error) {
        console.log("Error in parsing stored beneficiary info",error);
        localStorage.removeItem("beneficiaries");
        return null;
    }
  }


  const initialState = {
    beneficiaries: getStoredBeneficiaryInfo(),
  };
  

  const beneficiarySlice = createSlice({

    name: "beneficiary",
    initialState,
    reducers: {
        setBeneficiaryData : (state,action) => {
            state.beneficiaries = action.payload;
            localStorage.setItem("beneficiaries",JSON.stringify(action.payload));
        },

        deleteBeneficiaryData : (state) => {
            state.beneficiaries = null
            localStorage.removeItem("beneficiaries");
        }


    }

  });



 export const {setBeneficiaryData,deleteBeneficiaryData} = beneficiarySlice.actions;

 export default beneficiarySlice.reducer;