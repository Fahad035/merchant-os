import api from "./api";

import { DashboardResponse } from "@/types/dashboard";

class DashboardService {
  async getDashboard(): Promise<DashboardResponse> {
    const response = await api.get<DashboardResponse>("/dashboard");

    return response.data;
  }
}

export default new DashboardService();