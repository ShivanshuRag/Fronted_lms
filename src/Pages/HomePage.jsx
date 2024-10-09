
import { useEffect } from "react";
// import { toast} from "react-hot-toast"
import { useDispatch} from "react-redux"
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation'

import StudyImage_1 from "../Assets/Images/StudyImage_1.jpg"
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { getUserData } from "../Redux/Slices/AuthSlice.js";
function HomePage(){
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const userData = useSelector((state)=> state?.auth.data)
 
  
const isLoggedIn = useSelector((state)=> state?.auth.isLoggedIn)
 
 
 
useEffect(() => {
  if (isLoggedIn) {
    dispatch(getUserData());
  }
}, [isLoggedIn, dispatch]); //  // eski vajah se otp user fetch kar pa raha hai

 
   function clickAvatar (){
   
    navigate("/user/profile")

 }
 return(
  <>
  {isLoggedIn && (
        <div className="flex flex-col h-10">
          <div className="absolute top-20 right-20">
            <img
              src={userData?.avatar?.secure_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-400"
              onClick={clickAvatar}
            />
          </div>
        </div>
      )}
    
    
    
       
       
     
 <HomeLayout> 
  
   <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
    
   <div className="w-1/2 space-y-6">
   <h1 className="text-5xl font-semibold">
      
    
      <TypeAnimation
       sequence={[
         // Same substring at the start will only be typed out once, initially
         ' Find Out Bestest',
         1000, // wait 1s before replacing "Mice" with "Hamsters"
         ' Find Out Skills',
         1000,
         ' Find Out Talent',
         1000,
         ' Find Out Yourself',
         1000
       ]}
       wrapper="span"
       speed={30}
       style={{  display: 'inline-block', color: '#eab308' , filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
       repeat={Infinity}
       className="font-effect-3d"
     />
       
      
     </h1>

    <p className=" text-xl text-grey-200">
    We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
    </p>
     
    <div className="space-x-6">
        <Link to="/courses">
          <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 ">
          Explore courses
          </button>
        </Link>
        <Link to="/contact">
        <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
            Contact Us
        </button>
        </Link>
    </div>
   </div>

   <div className="w-1/2 flex items-center justify-center  "
    style={{
      filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
  }}
   >
    <img src={StudyImage_1} alt="imge" className="rounded-xl" />
   </div>

   </div>

 </HomeLayout>
 </>
 )

}
export default HomePage;