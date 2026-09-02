export interface CheckoutOrder {
  id: string;

  customer_name: string;

  status: string;

  payment_status: string;

  total_amount: number;
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