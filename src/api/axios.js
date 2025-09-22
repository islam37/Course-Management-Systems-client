import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

const instance = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:3000" 
    : "https://course-management-server-lime.vercel.app", //  Production backend on Vercel
  headers: { "Content-Type": "application/json" },
});

export default instance;
