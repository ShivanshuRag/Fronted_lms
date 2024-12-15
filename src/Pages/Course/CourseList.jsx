
import { useEffect } from "react";
import { useDispatch  } from "react-redux";
import { useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard.jsx";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { getAllCourses } from "../../Redux/Slices/CourseSlice.js";

function CourseList(){
  
    const dispatch = useDispatch();

    let {courseData} = useSelector((state)=> state.course);
    
    async function loadCourses(){
        await dispatch(getAllCourses());
    }

    useEffect(()=>{
    
        loadCourses();

    }  );


    return(
        <HomeLayout>
       <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
         <h1 className="text-center text-3xl font-semibold mb-5">
         Explore the courses made by
         <span className="font-bold  text-yellow-500">
                       {" "} Industry experts
                       
            </span>

         </h1>

         <div className="mb-10 flex flex-wrap gap-14 justify-center">
          {courseData?.map((element)=>{
            return <CourseCard key={element._id} data={element} />
          })}
         </div>

    </div>
       
           
        </HomeLayout>
       
       );
}



export default CourseList;