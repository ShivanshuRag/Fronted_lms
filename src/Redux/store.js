
import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice.jsx';
const store = configureStore({
    reducer: {
      auth : authSliceReducer,
    }
});


export default store;