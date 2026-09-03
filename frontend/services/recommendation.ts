import api from "./api";

export interface Recommendation {
  id: string;
  action_id: string;
  title: string;
  explanation: string;
  action_type: string;
  expected_revenue: number;
  confidence: number;
  risk_level: string;
  requires_approval: boolean;
  status: string;
}

class RecommendationService {
  async getRecommendations(merchantId: string): Promise<Recommendation[]> {
    const response = await api.get<Recommendation[]>("/recommendations", {
      params: {
        merchant_id: merchantId,
      },
    });

    return response.data;
  }

  async approveRecommendation(recommendationId: string) {
    const response = await api.post("/recommendations/approve", {
      recommendation_id: recommendationId,
    });

    return response.data;
  }

  async rejectRecommendation(recommendationId: string) {
    const response = await api.post("/recommendations/reject", {
      recommendation_id: recommendationId,
    });

    return response.data;
  }

  async executeRecommendation(recommendationId: string) {
    const response = await api.post("/recommendations/execute", {
      recommendation_id: recommendationId,
    });

    return response.data;
  }
}

export default new RecommendationService();
