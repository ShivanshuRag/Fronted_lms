import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {Link , useNavigate} from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { loginPhone } from "../Redux/Slices/AuthSlice.js";

function LoginWithNumber(){

 const dispatch = useDispatch();
 const naviagte = useNavigate();

 const [ loginData , setLoginData] = useState({
   
    phoneNumber: "",
    password:"",

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

  if(!loginData.phoneNumber || !loginData.password){
   return toast.error("please fill all details")
  }
   
  const response = await dispatch(loginPhone(loginData));
  
  if(response?.payload?.success)

    // naviagte("/verifyOTP")

    setLoginData({
        phoneNumber: "",
        password: "",
    });
    naviagte("/verifyOTP")
 }

return(
<HomeLayout>
  <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
     <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]" >
       <h1 className="text-center text-2xl font-bold">Login Page</h1>
        <div className="flex flex-col gap-1">
        <label htmlFor="phoneNumber" className="font-semibold">PhoneNumber</label>
         <input
         type="tel"
         required pattern="[0-9]{10}" 
         id="phoneNumber"
         name="phoneNumber"
         placeholder="Enter your PhoneNumber"
         className="bg-transparent px-2 py-1 border"
         onChange={handleUserInput}
         value={loginData.phoneNumber}
          
         />

        </div>
         <div className="flex flex-col gap-1">
         <label htmlFor="password" className="font-semibold">Password</label>
           <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={loginData.password}
            
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

export default LoginWithNumber;