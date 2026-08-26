import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function CampaignStatusBadge({
  status,
}: Props) {
  switch (status.toLowerCase()) {
    case "running":
      return (
        <Badge className="bg-green-600 hover:bg-green-600">
          Running
        </Badge>
      );

    case "draft":
      return (
        <Badge variant="secondary">
          Draft
        </Badge>
      );

    case "completed":
      return (
        <Badge>
          Completed
        </Badge>
      );

    case "paused":
      return (
        <Badge variant="destructive">
          Paused
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