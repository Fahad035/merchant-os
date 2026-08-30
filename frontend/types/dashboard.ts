export interface RevenuePoint {
  day: string;
  sales: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: string;
}

export interface AIRecommendation {
  action_id: string;

  title: string;

  explanation: string;

  expected_revenue: number;

  confidence: number;

  risk_level: "Low" | "Medium" | "High";

  requires_approval: boolean;

  action_type:
    | "campaign"
    | "bundle"
    | "upsell"
    | "discount";
}

export interface DashboardResponse {
  revenue: number;

  orders: number;

  conversion_rate: number;

  opportunities: number;

  chart: RevenuePoint[];

  recent_orders: RecentOrder[];

  insights: string[];
}