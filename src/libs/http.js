import axios from "axios";

const host = import.meta.env.VITE_HOST ? import.meta.env.VITE_HOST : 'http://localhost:8080/backend';

const http = axios.create({
    baseURL: host,
    withCredentials: true
});
export default http;