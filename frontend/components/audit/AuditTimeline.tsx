"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { AuditLog } from "@/types/audit";

interface Props {
  logs: AuditLog[];
}

function badgeVariant(event: string) {
  switch (event.toLowerCase()) {
    case "approved":
      return "default";

    case "rejected":
      return "destructive";

    case "executed":
      return "secondary";

    default:
      return "outline";
  }
}

export default function AuditTimeline({
  logs,
}: Props) {
  if (logs.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No audit events found.
      </Card>
    );
  }

  return (
    <Card className="p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {logs.slice(0, 10).map((log) => (
          <div
            key={log.id}
            className="flex gap-4"
          >

            <div className="mt-2 h-3 w-3 rounded-full bg-primary shrink-0" />

            <div className="flex-1 border-l pl-5">

              <div className="flex flex-wrap items-center gap-3">

                <Badge
                  variant={badgeVariant(log.event_type) as any}
                >
                  {log.event_type}
                </Badge>

                <span className="font-medium">
                  {log.actor}
                </span>

              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {log.details}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(
                  log.created_at
                ).toLocaleString()}
              </p>

            </div>

          </div>
        ))}

      </div>

    </Card>
  );
}