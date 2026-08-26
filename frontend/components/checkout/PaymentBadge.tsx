import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function PaymentBadge({
  status,
}: Props) {
  switch (status.toLowerCase()) {
    case "paid":
      return (
        <Badge className="bg-green-600 hover:bg-green-600">
          Paid
        </Badge>
      );

    case "pending":
      return (
        <Badge variant="secondary">
          Pending
        </Badge>
      );

    case "failed":
      return (
        <Badge variant="destructive">
          Failed
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}