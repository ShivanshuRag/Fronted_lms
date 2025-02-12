import { useState } from "react";
import {toast} from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { changePassword,getUserData  } from "../../Redux/Slices/AuthSlice.js";

function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password , setPassword] = useState({
        
        oldPassword : "",
        newPassword : "",
        confirmPassword:"",
        isPasswordVisible: false,
    });

    function handleInputChange(e){
      const {name , value} = e.target;

      setPassword({
        ...password,
        [name] : value
      })

    }

    const handleTogglePasswordVisibility = () => {
      setPassword((prevPassword) => ({
        ...prevPassword,
        isPasswordVisible: !prevPassword.isPasswordVisible,
      }));
    };
   
    async function onFormSubmit(e){
      e.preventDefault();

      const {oldPassword , newPassword , confirmPassword} = password
      
      if(!oldPassword || !newPassword){

        toast.error("All fields are required")
        return
      }

      if(oldPassword == newPassword){

         toast.error("oldPassword & newPassword is same , please choose another")
         return 
      }

      if( newPassword != confirmPassword){
         toast.error(" password not match, Please try again!")
      }
  
     try {
       await dispatch(changePassword(password));
        
           dispatch(getUserData());
 
         navigate("/user/profile");
     } catch (error) {
      console.log( error , "changepassword" );
       toast.error("An error occurred. Please try again later.")
     }

    }
   return(
    <HomeLayout>

      <div className=" flex items-center justify-center h-[100vh]">
       <form
        noValidate 
        onSubmit={onFormSubmit}
        className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem]  overflow-hidden cursor-pointer shadow-lg transition-transform transform hover:scale-100 hover:shadow-yellow-200 hover:shadow-lg">
        
       <h1 className=" text-center text-2xl font-semibold text-yellow-500">Change Password</h1>
        
       <div className=" flex flex-col gap-1">
            <label htmlFor="oldPassword" className="text-lg font-semibold  text-yellow-500 ">Old Password</label>
             <input
               required
               type={password.isPasswordVisible ? "text" : "password"}
               
               name="oldPassword"
               id="oldPassword"
               placeholder="Enter your old password"
               className="bg-transparent px-2 py-1 border"
               onChange={handleInputChange}
              value={password?.oldPassword}

             />
              </div>
           
              <div className=" flex flex-col gap-1">
            <label htmlFor="newPassword" className="text-lg font-semibold  text-yellow-500">New Password</label>
             <input
               required
               type={password.isPasswordVisible ? "text" : "password"}
               
               name="newPassword"
               id="newPassword"
               placeholder="Enter your new password"
               className="bg-transparent px-2 py-1 border"
               onChange={handleInputChange}
               value={password?.newPassword}

             />
              </div>

              <div className=" flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-lg font-semibold  text-yellow-500 ">Confirm Password</label>
             <input
               required
               type={password.isPasswordVisible ? "text" : "password"}
               
               name="confirmPassword"
               id="confirmPassword"
               placeholder="Enter your confirm password"
               className="bg-transparent px-2 py-1 border"
               onChange={handleInputChange}
               value={password?.confirmPassword}

             />
              </div>
             
              
              <button type="button" 
              onClick={handleTogglePasswordVisibility}
              className="text-lg font-semibold  text-accent"
              //  className=" bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer"
              >
              {password.isPasswordVisible ? "Hide Password" : "Show Password"}
             </button>
              <button 
              type="submit" 
              
              className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
              Change Password
             </button>
              
             
              <Link to="/user/profile">
              <p className=" link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                   
                   <AiOutlineArrowLeft/> Go back to profile
              
              </p>
             </Link>
       </form>

      </div>


    </HomeLayout>
   )
}

export default ChangePassword;