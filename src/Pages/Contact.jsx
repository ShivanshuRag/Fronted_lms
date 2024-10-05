import { useState } from "react";
import {toast} from "react-hot-toast";

import axiosInstance from "../Helpers/axiosIntances.js";
import {isEmail} from "../Helpers/regexMatcher.js";
import HomeLayout from "../Layouts/HomeLayout.jsx";

function Contact(){
   const [userInput , setUserInput] = useState({
     name : "",
     email : "",
     message : "",

   });
    
   function handleInputChange(e){
    const { name , value} = e.target;

    setUserInput({
        ...userInput,
        [name] : value
    })
   }

   async function onFormSubmit(e){
    e.preventDefault();

    if(!userInput.name || !userInput.email|| !userInput.message){
    toast.error(" All fields are required")
      return;
    }

     if(!isEmail(userInput.email)){
        toast.error("Invalid Email")
        return;
     }

     try {
       
        const response = axiosInstance.post("/contact" , userInput);
        toast.promise( response , {
            loading : "Submitting your message",
            success : "Form submitted successfully",
            error : "Failed to the submit form",
        }) ;

        const contactResponse = await response;
         
        if(contactResponse?.data?.success){
            setUserInput({
                name: "",
                email: "",
                message: ""
            });
        }

        
     } catch (error) {
         
        toast.error("operation failed...!")
     }


   }
   
 return(
  <HomeLayout>
   <div className="flex items-center justify-center h-[100vh] ">
      <form 
        noValidate
       onSubmit={onFormSubmit}
       className="flex flex-col items-center justify-center gap-2 p-5  text-white shadow-[0_0_10px_black] w-[22rem]  rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-100 hover:shadow-white hover:shadow-lg"
      >
      <h1 className="text-3xl font-semibold">
        Contact Form
      </h1>

      <div className="flex flex-col w-full gap-1">
        <label htmlFor="name" className="text-xl font-semibold">
           Name
        </label>
        <input
        className="bg-transparent border px-2 py-1 rounded-sm"
         type="text" 
         id = "name"
         name="name"
         placeholder="Enter your Name"
         onChange={handleInputChange}
         value={userInput.name}
        
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <label htmlFor="email" className="text-xl font-semibold"> Email</label>
        <input
         type="email"
         className="bg-transparent border px-2 py-1 rounded-sm"
         id="email"
         name="email"
         placeholder="Enter your Email"
         onChange={handleInputChange}
         value={userInput.email}

         />
      </div>

      <div className="flex flex-col w-full gap-1">
        <label htmlFor="message" className="text-xl font-semibold">Message</label>
         <textarea 
         className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
         name="message" 
         id="message"
         placeholder="Enter your message"
         onChange={handleInputChange}
         value={userInput.message}
         >
         </textarea>

      </div>
        <button type="submit"
        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
       >
        Submit
       </button>

      </form>
   </div>

  </HomeLayout>

 )

}

export default Contact;

