
import axios from "axios";

const BASE_URL = "https://backend-lms-aoxs.onrender.com/api/v1";



const axiosInstance  = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }

export default axiosInstance;

