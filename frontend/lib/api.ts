import axios from "axios";

const api = axios.create({
  // Relative path — resolved by the rewrite in next.config.ts. The
  // browser only ever talks to its own origin, so the auth cookie set
  // in the response is scoped to *this* domain, not the backend's.
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const approveRecommendation = (id: string) =>
  api.post("/recommendations/approve", {
    recommendation_id: id,
  });

export const rejectRecommendation = (id: string) =>
  api.post("/recommendations/reject", {
    recommendation_id: id,
  });

export const executeRecommendation = (id: string) =>
  api.post("/recommendations/execute", {
    recommendation_id: id,
  });

export default api;