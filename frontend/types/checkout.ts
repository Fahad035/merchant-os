export interface CheckoutOrder {
  id: string;

  merchant_id: string;

  customer_name: string;

  total_amount: number;

  payment_status: string;

  status: string;
}

export interface CheckoutSummary {
  total_orders: number;

  completed_orders: number;

  pending_orders: number;

  total_revenue: number;

  ai_expected_revenue: number;
}

export interface CheckoutDashboard {
  summary: CheckoutSummary;

  orders: CheckoutOrder[];
}