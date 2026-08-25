"use client";

import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import KpiCard from "./KpiCard";

interface Props {
  revenue: number;
  orders: number;
  conversion: number;
  opportunities: number;
}

export default function KpiGrid({
  revenue,
  orders,
  conversion,
  opportunities,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Revenue"
        value={`₹${revenue.toLocaleString()}`}
        icon={DollarSign}
        change="+12.4%"
      />

      <KpiCard
        title="Orders"
        value={orders}
        icon={ShoppingBag}
        change="+8.3%"
      />

      <KpiCard
        title="Conversion"
        value={`${conversion}%`}
        icon={TrendingUp}
        change="+0.6%"
      />

      <KpiCard
        title="AI Opportunities"
        value={opportunities}
        icon={Sparkles}
        change="5 Active"
      />
    </div>
  );
}