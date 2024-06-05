
import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice.js';
import courseSliceReducer from './Slices/CourseSlice.js'
const store = configureStore({
    reducer: {
      auth : authSliceReducer,
      courses :courseSliceReducer,
    },
    devTools : true
});


export default store;