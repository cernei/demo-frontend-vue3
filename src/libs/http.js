import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});
export default http;