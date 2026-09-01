"use client";

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

import { createOrder, verifyPayment } from "@/services/checkout";

interface Props {
  amount: number;
  recommendationId?: string;
}

export default function CheckoutButton({
  amount,
  recommendationId,
}: Props) {
  const payNow = async () => {
    try {
      const merchantId = localStorage.getItem("merchant_id");

      if (!merchantId) {
        alert("Merchant not found.");
        return;
      }

      const order = await createOrder(
        merchantId,
        amount,
      );

      const options = {
        key: order.key,

        amount: order.amount,

        currency: order.currency,

        order_id: order.order_id,

        name: "MerchantOS",

        description: "AI Recommendation Execution",

        theme: {
          color: "#6366F1",
        },

        handler: async (response: any) => {
          await verifyPayment({
            merchant_id: merchantId,

            recommendation_id: recommendationId,

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature,
          });

          alert("✅ Payment Successful");
        },

        modal: {
          ondismiss() {
            alert("Payment cancelled");
          },
        },

        prefill: {
          name: "Merchant",
          email: "merchant@example.com",
        },
      };

      const razorpay = new (window as any).Razorpay(
        options,
      );

      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    }
  };

  return (
    <Button
      onClick={payNow}
      className="w-full"
    >
      <CreditCard className="mr-2 h-4 w-4" />

      Pay ₹{amount}
    </Button>
  );
}