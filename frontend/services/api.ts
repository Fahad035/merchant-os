import axios from "axios";

const api = axios.create({
  // Relative path — resolved by the rewrite in next.config.ts, same as
  // lib/api.ts. Previously pointed straight at API_BASE_URL (the raw
  // backend origin) with no withCredentials, so cookie-based auth never
  // worked for anything routed through this client (dashboard,
  // recommendations) even before the cross-domain cookie issue.
  baseURL: "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    console.log(`API Request → ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    return Promise.reject(error);
  }
);

export default api;