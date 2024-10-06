import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://testimonial-backend-8ylm.onrender.com/"
    // baseURL:"http://localhost:8080"
}) 

export default axiosInstance