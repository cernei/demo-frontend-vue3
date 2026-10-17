import axios from "axios";

const host = import.meta.env.VITE_HOST ? import.meta.env.VITE_HOST : 'https://demo-laravel-backend.cernei.md';

const http = axios.create({
    baseURL:  host + '/api/admin',
    withCredentials: true
});
export default http;