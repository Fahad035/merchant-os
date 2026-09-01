export interface CheckoutOrder {
  id: string;
  order_number: string;
  customer_name: string;
  status: string;
  amount: number;
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