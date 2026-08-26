import { Card } from "@/components/ui/card";

import { CheckoutOrder } from "@/types/checkout";

import PaymentBadge from "./PaymentBadge";

interface Props {
  order: CheckoutOrder;
}

export default function OrderCard({
  order,
}: Props) {
  return (
    <Card className="p-6 space-y-4">

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold">
            {order.customer_name}
          </h3>

          <p className="text-sm text-muted-foreground">
            Order #{order.id.slice(0, 8)}
          </p>

        </div>

        <PaymentBadge
          status={order.payment_status}
        />

      </div>

      <div className="flex justify-between">

        <span>Status</span>

        <strong>{order.status}</strong>

      </div>

      <div className="flex justify-between">

        <span>Total</span>

        <strong>
          ₹{Number(
            order.total_amount
          ).toLocaleString()}
        </strong>

      </div>

    </Card>
  );
}