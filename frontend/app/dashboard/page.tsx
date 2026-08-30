"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardError from "@/components/dashboard/DashboardError";

import KpiGrid from "@/components/dashboard/KpiGrid";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import AIInsights from "@/components/dashboard/AIInsights";
import AIActionCenter from "@/components/dashboard/AIActionCenter";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const {
    dashboard,
    loading,
    error,
    refresh,
  } = useDashboard();

  return (
    <DashboardLayout>
      {loading && <DashboardSkeleton />}

      {!loading && error && (
        <DashboardError
          onRetry={refresh}
        />
      )}

      {!loading && !error && dashboard && (
        <div className="space-y-6">

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={refresh}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          <KpiGrid
            revenue={dashboard.revenue}
            orders={dashboard.orders}
            conversion={dashboard.conversion_rate}
            opportunities={dashboard.opportunities}
          />

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="lg:col-span-2">
              <RevenueChart
                data={dashboard.chart}
              />
            </div>

            <AIInsights
              insights={dashboard.insights}
            />

          </div>

          {/* NEW */}
          <AIActionCenter />

          <RecentOrders
            orders={dashboard.recent_orders}
          />

        </div>
      )}
    </DashboardLayout>
  );
}