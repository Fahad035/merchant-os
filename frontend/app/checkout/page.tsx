"use client";

import Script from "next/script";

import { Card } from "@/components/ui/card";

import { useCheckout } from "@/hooks/useCheckout";

import CheckoutStats from "@/components/checkout/CheckoutStats";
import AIUpsellCard from "@/components/checkout/AIUpsellCard";
import OrderSearch from "@/components/checkout/OrderSearch";
import OrderCard from "@/components/checkout/OrderCard";
import OrderTable from "@/components/checkout/OrderTable";

export default function CheckoutPage() {
  const {
    loading,
    error,

    orders,

    totalOrders,
    completedOrders,
    pendingOrders,
    totalRevenue,
    aiRevenue,

    search,
    setSearch,
  } = useCheckout();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-10">
        Loading checkout...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="space-y-8 p-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Checkout
            </h1>

            <p className="mt-2 text-muted-foreground">
              Monitor customer orders, payments and AI checkout opportunities.
            </p>

          </div>

        </div>

        {/* Stats */}

        <CheckoutStats
          totalOrders={totalOrders}
          completedOrders={completedOrders}
          pendingOrders={pendingOrders}
          totalRevenue={totalRevenue}
        />

        {/* AI Upsell */}

        <AIUpsellCard />

        {/* Revenue */}

        <Card className="border-primary p-6">

          <h2 className="text-xl font-semibold">
             AI Revenue Opportunity
          </h2>

          <p className="mt-3 text-muted-foreground">
            AI predicts an additional revenue of{" "}
            <span className="font-semibold">
              ₹{aiRevenue.toLocaleString()}
            </span>{" "}
            by enabling intelligent checkout upsells.
          </p>

        </Card>

        {/* Search */}

        <OrderSearch
          value={search}
          onChange={setSearch}
        />

        {/* Recent Orders */}

        <div>

          <h2 className="mb-5 text-2xl font-semibold">
            Recent Orders
          </h2>

          {orders.length === 0 ? (

            <Card className="p-10 text-center text-muted-foreground">
              No orders found.
            </Card>

          ) : (

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {orders.slice(0, 6).map((order) => (

                <OrderCard
                  key={order.id}
                  order={order}
                />

              ))}

            </div>

          )}

        </div>

        {/* Orders Table */}

        <Card className="p-6">

          <h2 className="mb-5 text-xl font-semibold">
            Order History
          </h2>

          <OrderTable
            orders={orders}
          />

        </Card>

      </div>
    </>
  );
}