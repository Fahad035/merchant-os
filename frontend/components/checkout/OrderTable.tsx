import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CheckoutOrder } from "@/types/checkout";

import PaymentBadge from "./PaymentBadge";

interface Props {
  orders: CheckoutOrder[];
}

export default function OrderTable({
  orders,
}: Props) {
  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Customer</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Payment</TableHead>

          <TableHead>Amount</TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {orders.slice(0, 20).map((order) => (
          <TableRow key={order.id}>

            <TableCell>
              {order.customer_name}
            </TableCell>

            <TableCell>
              {order.status}
            </TableCell>

            <TableCell>

              <PaymentBadge
                status={
                  order.payment_status
                }
              />

            </TableCell>

            <TableCell>
              ₹
              {Number(
                order.total_amount
              ).toLocaleString()}
            </TableCell>

          </TableRow>
        ))}

      </TableBody>

    </Table>
  );
}