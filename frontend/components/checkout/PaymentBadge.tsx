import { Badge } from "@/components/ui/badge";

type Props = {
  status?: string;
};

export default function PaymentBadge({ status }: Props) {
  const value = (status ?? "pending").toLowerCase();

  switch (value) {
    case "paid":
    case "completed":
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
          {status ?? "Unknown"}
        </Badge>
      );
  }
}