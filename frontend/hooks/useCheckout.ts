"use client";

import { useEffect, useMemo, useState } from "react";

import { getCheckoutDashboard } from "@/lib/checkout-api";

import { CheckoutOrder } from "@/types/checkout";

export function useCheckout() {
  const [orders, setOrders] = useState<CheckoutOrder[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [totalOrders, setTotalOrders] = useState(0);

  const [completedOrders, setCompletedOrders] = useState(0);

  const [pendingOrders, setPendingOrders] = useState(0);

  const [totalRevenue, setTotalRevenue] = useState(0);

  const [aiRevenue, setAiRevenue] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const merchantId = localStorage.getItem("merchant_id");

        if (!merchantId) {
          throw new Error("Merchant not found");
        }

        const dashboard = await getCheckoutDashboard(merchantId);

        setOrders(dashboard.orders);

        setTotalOrders(dashboard.summary.total_orders);

        setCompletedOrders(dashboard.summary.completed_orders);

        setPendingOrders(dashboard.summary.pending_orders);

        setTotalRevenue(dashboard.summary.total_revenue);

        setAiRevenue(dashboard.summary.ai_expected_revenue);
      } catch (err: any) {
        setError(
          err?.response?.data?.detail ??
            err?.message ??
            "Unable to load checkout.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.customer_name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [orders, search]);

  return {
    loading,

    error,

    orders: filteredOrders,

    totalOrders,

    completedOrders,

    pendingOrders,

    totalRevenue,

    aiRevenue,

    search,

    setSearch,
  };
}
