import axios from "axios"

export const axiosInstance = axios.create({ 
    baseURL : "https://ltweb-blog.herokuapp.com/api/"
})