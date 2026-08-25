"use client";

import { useCallback, useEffect, useState } from "react";

import dashboardService from "@/services/dashboard";
import { DashboardResponse } from "@/types/dashboard";

export function useDashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const data =
        await dashboardService.getDashboard();

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
    }, 30000);

    return () => clearInterval(timer);
  }, [loadDashboard]);

  return {
    dashboard,
    loading,
    error,
    refresh: loadDashboard,
  };
}