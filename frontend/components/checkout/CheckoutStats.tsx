import {
  ShoppingCart,
  CheckCircle2,
  Clock3,
  IndianRupee,
} from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

export default function CheckoutStats({
  totalOrders,
  completedOrders,
  pendingOrders,
  totalRevenue,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-4">

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Orders
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalOrders}
            </h2>

          </div>

          <ShoppingCart className="h-9 w-9" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Completed
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {completedOrders}
            </h2>

          </div>

          <CheckCircle2 className="h-9 w-9 text-green-600" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Pending
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {pendingOrders}
            </h2>

          </div>

          <Clock3 className="h-9 w-9 text-orange-500" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{totalRevenue.toLocaleString()}
            </h2>

          </div>

          <IndianRupee className="h-9 w-9" />

        </div>

      </Card>

    </div>
  );
}