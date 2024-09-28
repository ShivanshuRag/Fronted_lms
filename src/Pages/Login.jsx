
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import GoogleButton from 'react-google-button'
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice.js";
import { googleAuth } from '../Redux/Slices/AuthSlice.js';
function Login(){

  // ========== Google Login ===========


  

 const dispatch = useDispatch();
 const naviagte = useNavigate();

 const [ loginData , setLoginData] = useState({
   
    email: "",
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

  if(!loginData.email || !loginData.password){
    toast.error("please fill all details")
  }
   
  const response = await dispatch(login(loginData));
  
  if(response?.payload?.success)

    naviagte("/")

    setLoginData({
        email: "",
        password: "",
    });

 }

 const handleGoogleLogin = async (authResult) => {
  console.log(" ye hai auth result",authResult);
     try {

      if(authResult["code"] ){
       console.log(authResult.code);
        const response = await dispatch(googleAuth(authResult.code));
    // const response = await googleAuth(authResult.code); 
    
        
   
    console.log('result------', response);

    
    // props.setUser(response.data.data.user);  
    naviagte("/")  
}else {
  console.log( "authResult",authResult);
  throw new Error(authResult);
}
  
} catch (error) {
console.error('Error while requesting Google code:', error);
// Display a user-friendly error message
}

}



const googleLogin = useGoogleLogin({

flow: "auth-code", 

onSuccess:handleGoogleLogin ,
onError : handleGoogleLogin,
});

return(
<HomeLayout>
  <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
     <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]" >
       <h1 className="text-center text-2xl font-bold">Login Page</h1>
        <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-semibold">Email</label>
         <input
         type="email"
         required
         id="email"
         name="email"
         placeholder="Enter your Email"
         className="bg-transparent px-2 py-1 border"
         onChange={handleUserInput}
         value={loginData.email}
          
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
         <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer '>
                       Login
        </button>
        <p className="text-center">
    Donot hanve an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
      </p>
      <div className=" flex items-center justify-center  "><GoogleButton
      label='Continue with Google'
      onClick={googleLogin}
      style={{  width: '100%' , height: '50px' ,   backgroundColor: '#4285F4' , color: 'white' , border: '1px solid black' }}
     /></div>   
        
     </form>

  </div>




</HomeLayout>

)

}

export default Login;