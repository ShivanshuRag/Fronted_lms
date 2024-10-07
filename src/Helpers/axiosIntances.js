
import axios from "axios";

const BASE_URL = "https://persona-bknd3.vercel.app";


const axiosInstance  = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;

