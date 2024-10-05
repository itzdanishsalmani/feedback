import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://testimonial-backend-ukzx.onrender.com"
    // baseURL:"http://localhost:3000"
}) 

export default axiosInstance