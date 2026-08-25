"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { RecentOrder } from "@/types/dashboard";

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export default function RecentOrders({
  orders,
}: RecentOrdersProps) {
  function getStatusVariant(status: string) {
    switch (status.toLowerCase()) {
      case "paid":
        return "default";

      case "pending":
        return "secondary";

      case "refunded":
        return "destructive";

      default:
        return "outline";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.id}
                </TableCell>

                <TableCell>
                  {order.customer}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={getStatusVariant(order.status)}
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  ₹{order.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}