import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  toast  from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosIntances.js";




const initialState = { 
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    // data: JSON.parse(localStorage.getItem('token')) || {}
    data: localStorage.getItem('token') != undefined ? JSON.parse(localStorage.getItem('token')) : {}

    // != undefined ? JSON.parse(localStorage.getItem('token')) : {}
    
}
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res =  axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        //  return res.data
        return (await res).data;
    } catch(error) {
        toast.error(error?.res?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res =  axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            
            error: "Failed to log in"
        });
        //   return res.data
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res =  axiosInstance.post("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
        // return res.data
        return (await res).data;
    } catch(error) {
        toast.error(error?.res?.data?.message);
    }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res =   axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
        // return res.data
    } catch(error) {
        toast.error(error?.res?.data?.message);
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
        // return res.data
      } catch (error) {
         toast.error(error?.res?.data?.message)
      }
})

export const getUserData = createAsyncThunk("/auth/details", async () => {
    try {
        // const Token = localStorage.getItem('token');
        const res =  axiosInstance.get("user/me" );
      
          
    //    console.log( "getUserData > " , res);
        return (await res).data
         
    } catch(error) {
        toast.error(error?.message);
    }
})
  
//  crateAsyncThunk me jo navigation ("/auth/ number") hai , ye client side ke liye hai  
export const loginPhone = createAsyncThunk("/auth/number" , async(data)=>{
    try {
        const response = axiosInstance.post("user/sendotp" , data);
         toast.promise( response ,{
            loading : "Wait! authentication in progress...",
             success : (data)=>{
                 return data?.data?.message
             },
            //  success : " OTP send successfully",
             error :  " Failed to send OTP"
         })
          return  (await response).data;
    } catch (error) {
         toast.error(error.response.message);
    }
})

export const verifyPhone = createAsyncThunk("/auth/verify" , async(data)=>{
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
 
export const googleAuth = createAsyncThunk("/auth/google" , async(code)=>{
   
    try {
        
        const response = axiosInstance.get(`/user/google?code=${code}`  );
        toast.promise( response , {
            loading: "Verifing your code..",
            success : (data)=>{
                 return data?.data?.message
            } ,
            error: "Failed to verify Code , Try Again..."
        })

        return ( await response).data ;
    } catch (error) {
         toast.error( error?.message)
    }
});

  
        


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
        }).addCase(verifyPhone.fulfilled , (state , action)=>{

            localStorage.setItem('token' , JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn' , true);
            localStorage.setItem('role', action?.payload?.user?.role  );
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
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
        })
        .addCase(googleAuth.fulfilled, (state, action) => {
            localStorage.setItem('token', JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })    
        .addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem('token', JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })
       
    
       
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;