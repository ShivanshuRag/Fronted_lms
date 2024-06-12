import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
 import {toast} from "react-hot-toast"

 import axiosInstance from "../../Helpers/axiosIntances.js";


const initialState ={
    allUserCount : 0,
    subscribedUser : 0
}
 
export const getStatsData = createAsyncThunk("/stats/get" , async ()=>{
   try {
     const response = axiosInstance.get("/admin/stats/users");
     toast.promise(response , {
       loading: " Getting statics..",
       success : (data)=>{
            return data?.data?.message
       },
       error : " Failed to load data Statics"
       
     })
      
     return ( await response).data;
   } catch (error) {
    toast.error(error?.response?.data?.message);
   }

})

const StaticsSlice = createSlice({
    name : 'state',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
     
        builder.addCase(getStatsData.fulfilled , (state , action)=>{

            state.allUserCount = action?.payload?.allUserCount;
            state.subscribedUser = action?.payload?.subscribedUser;
        })
         
    } 
})

export default StaticsSlice.reducer;