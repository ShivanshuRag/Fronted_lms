
import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn')|| false,
    role: localStorage.getItem('role')|| " ",
}


const authSlice = createSlice({
   name : "auth",
    initialState,
    reducers:{}
});

export default authSlice.reducer;