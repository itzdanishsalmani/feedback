import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://testimonial-backend-l8yg.onrender.com/"
    // baseURL:"http://localhost:8080"
}) 

export default axiosInstance