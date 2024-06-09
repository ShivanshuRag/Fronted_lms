
import './App.css'

import { Route,Routes  } from 'react-router-dom'

import RequireAuth from './Components/Auth/RequireAuth.jsx'
import AboutUs from './Pages/AboutUsPage.jsx'
import Contact from './Pages/Contact.jsx'
import CourseDescription from './Pages/Course/CourseDescription.jsx'
import CourseList from './Pages/Course/CourseList.jsx'
import CreateCourse from './Pages/Course/CreateCourse.jsx'
import Denied from './Pages/Denied.jsx'
import HomePage from './Pages/HomePage.jsx'
import Login from './Pages/Login.jsx'
import NotFound from './Pages/NotFound.jsx'
import Checkout from './Pages/Payment/Checkout.jsx'
import CheckoutFailure from './Pages/Payment/CheckoutFailure.jsx'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess.jsx'
import Signup from './Pages/Signup.jsx' 
import EditProfile from './Pages/User/EditProfile.jsx'
import Profile from './Pages/User/Profile.jsx'

function App() { 
  
  return (
   <>
   <h1
   className="text-3xl font-bold underline"> Hello  I am Shivanshu SinghRag</h1>
    <Routes>
    <Route path="/" element={<HomePage />} ></Route>
    <Route path="/about" element={<AboutUs/>} ></Route>
    <Route path="/signup" element={<Signup/>} ></Route>
    <Route path="/login" element={<Login/>} ></Route>

    <Route path="/courses" element={<CourseList/>}></Route>
    <Route path="/course/description" element={<CourseDescription/>}></Route>
    <Route path="/contact" element={<Contact/>}></Route>
    <Route path="/denied" element={<Denied/>}></Route>

    <Route element={<RequireAuth allowedRoles={["Admin"]}/>}>
    <Route path="/course/create" element={<CreateCourse/>}></Route>
    </Route>

    <Route element={<RequireAuth allowedRoles={["Admin" , "User"]} />}>
     <Route path="/user/profile" element={<Profile/>}></Route>
      <Route path="/user/editprofile" element={<EditProfile/>}/>
      <Route path="/checkout" element={<Checkout/>}/> 
      <Route path="/checkout/success" element={<CheckoutSuccess/>}/>
      <Route path="/checkout/fail" element={<CheckoutFailure/>}/>
    </Route>
   
    <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    
   </>
  )
}

export default App
 