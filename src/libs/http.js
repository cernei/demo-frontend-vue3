import axios from "axios";

const host = process.env.HOST ? process.env.HOST : 'http://localhost:8000';

const http = axios.create({
    baseURL: host,
    withCredentials: true
});
export default http;