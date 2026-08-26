import api from "./api";

import {
  CheckoutDashboard,
  CheckoutOrder,
} from "@/types/checkout";

export async function getCheckoutDashboard(): Promise<CheckoutDashboard> {
  const { data } =
    await api.get<CheckoutDashboard>(
      "/checkout"
    );

  return data;
}

export async function getRecentOrders(): Promise<
  CheckoutOrder[]
> {
  const { data } =
    await api.get<CheckoutOrder[]>(
      "/checkout/recent"
    );

  return data;
}