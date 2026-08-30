import api from "./api";
import { DashboardResponse } from "@/types/dashboard";

class DashboardService {
  async getDashboard(
    merchantId: string
  ): Promise<DashboardResponse> {
    const response = await api.get(
      "/dashboard",
      {
        params: {
          merchant_id: merchantId,
        },
      }
    );

    return response.data;
  }
}

export default new DashboardService();