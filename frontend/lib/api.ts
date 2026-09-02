import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const approveRecommendation = (id: string) =>
  api.post(`/recommendations/${id}/approve`);

export const rejectRecommendation = (id: string) =>
  api.post(`/recommendations/${id}/reject`);

export const executeRecommendation = (id: string) =>
  api.post(`/recommendations/${id}/execute`);


export default api;