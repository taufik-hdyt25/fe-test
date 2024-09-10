import axios from "axios";

export const API = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});

API.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
