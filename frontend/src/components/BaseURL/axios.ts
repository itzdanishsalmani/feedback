import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://testimonial-backend-l8yg.onrender.com"
    // baseURL:"http://localhost:3000"
}) 

export default axiosInstance