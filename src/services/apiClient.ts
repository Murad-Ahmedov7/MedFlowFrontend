import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});


// 🔥 1) timeout nə üçün lazımdır?
// timeout: 10000
// ✅ QISA CAVAB

// 👉 server cavab verməsə, request-i dayandırır


