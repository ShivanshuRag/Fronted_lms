

import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
 import{ toast } from "react-hot-toast";

 import axiosInstance from "../../Helpers/axiosIntances.js";

 const intialState = {
    courseData: []
 }
