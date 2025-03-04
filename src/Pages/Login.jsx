
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from "react";
// import GoogleButton from 'react-google-button'
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
    return toast.error("please fill all details")
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
  // console.log(" ye hai auth result",authResult);
     try {
    
      if(authResult["code"] ){
       console.log(authResult.code);
        const response = await dispatch(googleAuth(authResult.code));
    // const response = await googleAuth(authResult.code); 
    
    if(response?.payload?.success)
      naviagte("/") 
    console.log('result------', response);

   
    // props.setUser(response.data.data.user);  
    
    
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
  <div className="flex mb-3 overflow-x-auto items-center justify-center h-[100vh]  ">
     <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3  p-4 text-white w-96 shadow-[0_0_10px_black]     rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-100 hover:shadow-white hover:shadow-lg" >
     <h1 className="text-center text-2xl font-bold mb-5 text-yellow-500 ">Login Page</h1>

        <div className="flex flex-col gap-1">
        <label className="label">
            <span className="label-text text-slate-400">Email</span>
          </label>
        <label className="input input-bordered flex items-center gap-2 bg-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" value={loginData.email} name='email' onChange={handleUserInput} />
          </label>

        </div>

         {/*  ======= password ========  */}
        
         <div className="flex flex-col gap-1">
         <label className="label">
            <span className="label-text text-slate-400">Password</span>
          </label>
         <label className="input input-bordered flex items-center gap-2 bg-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" 
               className="grow"
               name='password'
               value={loginData.password}
               onChange={handleUserInput} 
               placeholder="password" />
          </label>

         </div>
         <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer '>
                       Login
        </button>
        <p className="text-center">
    Donot hanve an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
      </p>
            <div className="flex items-center justify-center">
              <button className="btn btn-primary w-full h-12 bg-blue-600 text-white border border-black hover:bg-blue-700 flex items-center justify-center gap-6 text-base" onClick={googleLogin}>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="h-6 w-6"/>
                  Continue with Google
              </button>
              </div>   
        
     </form>

  </div>




</HomeLayout>

)

}

export default Login;