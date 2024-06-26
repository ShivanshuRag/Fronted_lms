
import {Link} from "react-router-dom"

import StudyImage_1 from "../Assets/Images/StudyImage_1.jpg"
import HomeLayout from "../Layouts/HomeLayout.jsx";
function HomePage(){
 return(
 <HomeLayout> 
   <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
  
   <div className="w-1/2 space-y-6">
    <h1 className="text-5xl font-semibold">
     Find Out Bestest

     <span className="text-pink-500  font-bold">

     </span>
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

   <div className="w-1/2 flex items-center justify-center"
    style={{
      filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
  }}
   >
    <img src={StudyImage_1} alt="imge" />
   </div>

   </div>

 </HomeLayout>

 )

}
export default HomePage;