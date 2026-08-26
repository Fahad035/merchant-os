import { Card } from "@/components/ui/card";

import {
  CheckCircle2,
  XCircle,
  PlayCircle,
  Clock3,
} from "lucide-react";

import { AuditLog } from "@/types/audit";

interface Props {
  logs: AuditLog[];
}

function icon(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
      return (
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      );

    case "rejected":
      return (
        <XCircle className="h-5 w-5 text-red-600" />
      );

    case "executed":
      return (
        <PlayCircle className="h-5 w-5 text-blue-600" />
      );

    default:
      return (
        <Clock3 className="h-5 w-5 text-orange-500" />
      );
  }
}

export default function AuditTimeline({
  logs,
}: Props) {
  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-6">
        AI Decision Timeline
      </h2>

      <div className="space-y-5">

        {logs.slice(0, 6).map((log) => (

          <div
            key={log.id}
            className="flex gap-4"
          >

            {icon(log.status)}

            <div className="flex-1">

              <div className="flex justify-between">

                <h3 className="font-medium">
                  {log.action}
                </h3>

                <span className="text-xs text-muted-foreground">
                  {new Date(
                    log.created_at
                  ).toLocaleString()}
                </span>

              </div>

              <p className="text-sm text-muted-foreground mt-1">
                {log.reasoning}
              </p>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}