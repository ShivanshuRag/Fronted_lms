

import './App.css'

import { Route,Routes  } from 'react-router-dom'

import AboutUs from './Pages/AboutUsPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import NotFound from './Pages/NotFound.jsx'
import Signup from './Pages/Signup.jsx'

function App() {
 

  return (
   <>
   <h1
   className="text-3xl font-bold underline"> Hello  I am Shiavanshu SinghRag</h1>
    <Routes>
    <Route path="/" element={<HomePage />} ></Route>
    <Route path="/about" element={<AboutUs/>} ></Route>
    <Route path="/signup" element={<Signup/>} ></Route>

    <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    
   </>
  )
}

export default App
 