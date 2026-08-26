import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function AuditStatusBadge({
  status,
}: Props) {
  switch (status.toLowerCase()) {
    case "approved":
      return (
        <Badge className="bg-green-600 hover:bg-green-600">
          Approved
        </Badge>
      );

    case "rejected":
      return (
        <Badge variant="destructive">
          Rejected
        </Badge>
      );

    case "executed":
      return (
        <Badge>
          Executed
        </Badge>
      );

    case "pending":
      return (
        <Badge variant="secondary">
          Pending
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