"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { AuditLog } from "@/types/audit";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: AuditLog | null;
}

export default function AuditDetailsDialog({
  open,
  onOpenChange,
  log,
}: Props) {
  if (!log) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-3xl">

        <DialogHeader>
          <DialogTitle>
            Audit Event Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          <Card className="p-5">
            <div className="space-y-3">

              <h2 className="text-xl font-bold">
                {log.event_type}
              </h2>

              <Badge>
                {log.actor}
              </Badge>

            </div>
          </Card>

          <Card className="space-y-3 p-5">

            <h3 className="font-semibold">
              Details
            </h3>

            <p className="text-muted-foreground">
              {log.details}
            </p>

          </Card>

          <div className="grid gap-5 md:grid-cols-2">

            <Card className="p-5">
              <p className="text-sm text-muted-foreground">
                Recommendation ID
              </p>

              <p className="mt-2 break-all font-mono text-sm">
                {log.recommendation_id}
              </p>
            </Card>

            <Card className="p-5">
              <p className="text-sm text-muted-foreground">
                Merchant ID
              </p>

              <p className="mt-2 break-all font-mono text-sm">
                {log.merchant_id}
              </p>
            </Card>

            <Card className="p-5">
              <p className="text-sm text-muted-foreground">
                Event Type
              </p>

              <Badge className="mt-3">
                {log.event_type}
              </Badge>
            </Card>

            <Card className="p-5">
              <p className="text-sm text-muted-foreground">
                Actor
              </p>

              <Badge
                variant="secondary"
                className="mt-3"
              >
                {log.actor}
              </Badge>
            </Card>

          </div>

          <Card className="p-5">

            <h3 className="font-semibold">
              Timeline
            </h3>

            <div className="mt-4 space-y-2">

              <div>
                Event: <strong>{log.event_type}</strong>
              </div>

              <div>
                Performed by: <strong>{log.actor}</strong>
              </div>

              <div>
                {log.details}
              </div>

              <div className="text-sm text-muted-foreground">
                {new Date(log.created_at).toLocaleString()}
              </div>

            </div>

          </Card>

        </div>

      </DialogContent>
    </Dialog>
  );
}