
import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice.js';
import courseSliceReducer from './Slices/CourseSlice.js'
import RazorpaySliceReducer from './Slices/RazorpaySlice.js';
const store = configureStore({
    reducer: {
      auth : authSliceReducer,
      course :courseSliceReducer,
      razorpay : RazorpaySliceReducer,
    },
    devTools : true
});


export default store;