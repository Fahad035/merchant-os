import api from "./api";

import {
  CheckoutDashboard,
  CheckoutOrder,
} from "@/types/checkout";

export async function getCheckoutDashboard(
  merchantId: string,
): Promise<CheckoutDashboard> {
  const { data } = await api.get<CheckoutDashboard>(
    "/checkout",
    {
      params: {
        merchant_id: merchantId,
      },
    },
  );

  return data;
}

export async function getCheckoutRecommendation() {
  const merchantId = localStorage.getItem("merchant_id");

  const { data } = await api.get(
    "/checkout/recommendation",
    {
      params: {
        merchant_id: merchantId,
      },
    }
  );

  return data;
}
export async function getRecentOrders(
  merchantId: string,
): Promise<CheckoutOrder[]> {
  const { data } = await api.get<CheckoutOrder[]>(
    "/checkout/recent",
    {
      params: {
        merchant_id: merchantId,
      },
    },
  );

  return data;
}