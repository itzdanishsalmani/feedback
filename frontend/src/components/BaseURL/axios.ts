import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://testimonial-backend-ukzx.onrender.com"
}) 

export default axiosInstance