import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {Link , useNavigate} from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { verifyPhone } from "../Redux/Slices/AuthSlice.js";

function VerifyOTP(){

 const dispatch = useDispatch();
 const naviagte = useNavigate();

 const [ loginData , setLoginData] = useState({
   
    otp : ""

 });
  
 function handleUserInput(e){
  const {name , value} = e.target;
   setLoginData({
    ...loginData,
    [name] : value
   })
 }

 async function onLogin(event){
  event.preventDefault();

  if(!loginData.otp ){
    toast.error(" Invalid OTP , try Again..")
  }
   
  const response = await dispatch(verifyPhone(loginData));
  
  if(response?.payload?.success)

    naviagte("/")

    setLoginData({
      opt: ""
    });

 }

return(
<HomeLayout>
  <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
     <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]" >
       <h1 className="text-center text-2xl font-bold">Login Verification</h1>
        <div className="flex flex-col gap-1">
        <label htmlFor="otp" className="font-semibold"> OTP Code</label>
         <input
         type="tel"
         required  
         id="otp"
         name="otp"
         placeholder="Enter your OTP"
         className="bg-transparent px-2 py-1 border"
         onChange={handleUserInput}
         value={loginData.otp}
          
         />

        </div>
         
         <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Continue
        </button>
        <p className="text-center">
    Donot hanve an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
      </p>
         
     </form>

  </div>




</HomeLayout>

)

}

export default VerifyOTP;