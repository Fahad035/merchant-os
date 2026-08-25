export interface Campaign {
  id: string;

  merchant_id: string;

  title: string;

  description: string;

  audience: string;

  discount_percentage: number;

  expected_revenue: number;

  confidence: number;

  status: string;

  requires_approval: boolean;
}

export interface CampaignListResponse {
  campaigns: Campaign[];

  total: number;
}