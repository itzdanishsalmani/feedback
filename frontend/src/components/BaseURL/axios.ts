import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://testimonial-backend-seven.vercel.app"
    // baseURL:"http://localhost:3000"
}) 

export default axiosInstance