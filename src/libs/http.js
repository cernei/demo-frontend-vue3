import axios from "axios";

const host = import.meta.env.VITE_HOST ? import.meta.env.VITE_HOST : 'https://demo-laravel-backend.cernei.md';

const http = axios.create({
    baseURL: host,
    withCredentials: true
});
export default http;