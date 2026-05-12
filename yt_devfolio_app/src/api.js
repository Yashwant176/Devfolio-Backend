import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiry_date = decoded.exp;
        const current_time = Date.now() / 1000;

        if (expiry_date > current_time) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn("Token expired");
          localStorage.removeItem("access"); // optional: auto-remove expired token
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("access");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
