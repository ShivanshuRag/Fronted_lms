import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
// import GoogleButton from 'react-google-button';
import { toast } from 'react-hot-toast';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { isEmail, isValidPassword } from '../Helpers/regexMatcher.js';
import HomeLayout from '../Layouts/HomeLayout.jsx';
import { createAccount } from '../Redux/Slices/AuthSlice.js';
import { googleAuth } from '../Redux/Slices/AuthSlice.js';


function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        // phoneNumber: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(event) {
        event.preventDefault();
        // getting the image
        const uploadedImage = event.target.files[0];

        if(uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            })
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.phoneNumber ||!signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }

        // checking name field length
        if(signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters")
            return;
        }
        // checking valid email
        if(!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }

        // checking valid phone number
        // if (!/^\d{10}$/.test(signupData.phoneNumber)) {
        //     alert('Please enter a valid 10-digit phone number');
        //     return;
        //   }
        // checking password validation
        if(!isValidPassword(signupData.password)) {
            toast.error("Password should be 6 - 16 character long with atleast a number and special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("phoneNumber", signupData.phoneNumber);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        // dispatch create account action
        const response = await dispatch(createAccount(formData));
        if(response?.payload?.success)
            navigate("/");

        setSignupData({
            fullName: "",
            email: "",
            // phoneNumber: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("");


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
          navigate("/") 
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

    return (
        <HomeLayout>
            <div className='flex overflow-x-auto items-center m-4 justify-center h-[100vh]'>
                <form noValidate onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
                        )}
                    </label>
                    <input 
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />

                     {/* ======== Username ====== */}

                    <div className='flex flex-col gap-1'>
                    <label className="label">
                        <span className="label-text text-slate-400">Username</span>
                     </label>
                    <label className="input input-bordered flex items-center gap-2 bg-slate-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                         type="text"
                         className="grow"
                          placeholder="Username"
                          name="fullName"
                          value={signupData.fullName}
                          onChange={handleUserInput}
                          id='fullName'

                           />
                        </label>
                    </div>

                      {/* ========== Email =============== */}
                      <div className='flex flex-col gap-1'>
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
                    <input 
                        type="text"
                        className="grow"
                        placeholder="Email"
                        name='email'
                        value={signupData.email}
                        onChange={handleUserInput}
                        id="email"
                      />
                    </label>
                    </div>
                    {/* ========== phoneNumber =============== */}

                    {/* <div className='flex flex-col gap-1'>
                        <label htmlFor="phoneNumber" className='font-semibold'> PhoneNumber </label>
                        <input 
                            type="tel" 
                            required pattern="[0-9]{10}"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Enter your phoneNumber.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.phoneNumber}
                        />
                    </div> */}

                    {/* ========== Password =============== */}

                    <div className='flex flex-col gap-1'>
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
                        <input 
                        type="password" 
                        className="grow"
                        name='password'
                        placeholder="Password"
                        id="password"
                        value={signupData.password}
                        onChange={handleUserInput}
                         />
                        </label>
                    </div>

                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer'>
                        Create account
                    </button>

                    <p className="text-center">
                        Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
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
    );
}

export default Signup;