"use client";

import { useCallback, useEffect, useState } from "react";

import dashboardService from "@/services/dashboard";
import { DashboardResponse } from "@/types/dashboard";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      // Prefer the logged-in merchant (set by useAuth on login/signup).
      // Falls back to the env var so this still works if auth hasn't
      // run yet (e.g. a page refresh before the session check resolves).
      const merchantId =
        localStorage.getItem("merchant_id") ||
        process.env.NEXT_PUBLIC_MERCHANT_ID!;

      const data = await dashboardService.getDashboard(merchantId);

      setDashboard(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    const timer = setInterval(() => {
      loadDashboard();
    }, 300000); // 5 minutes

    return () => clearInterval(timer);
  }, [loadDashboard]);

  return {
    dashboard,
    loading,
    error,
    refresh: loadDashboard,
  };
}