import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosIntances.js";



const initialState ={

    lectures :[]
}

const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {},
    extraReducers: ()=>{

    }
});

export default lectureSlice.reducer;