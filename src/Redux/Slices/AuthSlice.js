import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosIntances.js";
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('token') 
    // != undefined ? JSON.parse(localStorage.getItem('token')) : {}
}
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            
            error: "Failed to log in"
        });
       
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.post("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const changePassword = createAsyncThunk("/user/changepassword" , async (data)=>{
      try {
        
        const res =  axiosInstance.post("/user/change-password" , data);
        toast.promise(res , {
            loading : " Changing password...",
            success: (data) => {
                return data?.data?.message;
            },
            error : "Failed to change password" 
        })

        return (await res).data
      } catch (error) {
         toast.error(error?.res?.data?.message)
      }
})

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})

export const loginPhone = createAsyncThunk("/auth/login" , async(data)=>{
    try {
        const response = axiosInstance.post("user/sendotp" , data);
         toast.promise( response ,{
            loading : "Wait! authentication in progress...",
            //  success : (data)=>{
            //      return data?.data?.message
            //  },
             success : " OTP send successfully",
             error :  " Failed to send OTP"
         })
          return  (await response).data;
    } catch (error) {
         toast.error(error.message);
    }
})

export const verifyPhone = createAsyncThunk("/auth/login" , async(data)=>{
    try {
       const response = axiosInstance.post("/user/verifyotp" , data);
        toast.promise( response , {
            loading: "Verifing your OTP..",
            success : (data)=>{
                 return data?.data?.message
            } ,
            error: "Failed to verify OTP , Try Again..."
        }) 

        return ( await response).data;

    } catch (error) {
         toast.error( error?.message)
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('token', JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        }).addCase(loginPhone.fulfilled , (state , action)=>{

            localStorage.setItem('token' , JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn' , true);
            localStorage.setItem('role', action?.payload?.user?.role );
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        }).addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        }).addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem('token', JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        });
       
       
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;