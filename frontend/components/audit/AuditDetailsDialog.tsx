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
            AI Decision Details
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-6">

          <Card className="p-5">

            <div className="space-y-3">

              <h2 className="text-xl font-bold">
                {log.action}
              </h2>

              <Badge>
                {log.status}
              </Badge>

            </div>

          </Card>

          <Card className="p-5 space-y-3">

            <h3 className="font-semibold">
              AI Reasoning
            </h3>

            <p className="text-muted-foreground">
              {log.reasoning}
            </p>

          </Card>

          <div className="grid grid-cols-2 gap-5">

            <Card className="p-5">

              <p className="text-sm text-muted-foreground">
                Confidence
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                91%
              </h2>

            </Card>

            <Card className="p-5">

              <p className="text-sm text-muted-foreground">
                Expected Revenue
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                ₹32,000
              </h2>

            </Card>

            <Card className="p-5">

              <p className="text-sm text-muted-foreground">
                Approval
              </p>

              <Badge className="mt-3">
                Approved
              </Badge>

            </Card>

            <Card className="p-5">

              <p className="text-sm text-muted-foreground">
                Executed
              </p>

              <Badge
                variant="secondary"
                className="mt-3"
              >
                Yes
              </Badge>

            </Card>

          </div>

          <Card className="p-5">

            <h3 className="font-semibold">
              Timeline
            </h3>

            <div className="mt-4 space-y-2">

              <div>
                ✓ AI generated recommendation
              </div>

              <div>
                ✓ Merchant approved
              </div>

              <div>
                ✓ Executed successfully
              </div>

              <div>
                {new Date(
                  log.created_at
                ).toLocaleString()}
              </div>

            </div>

          </Card>

        </div>

      </DialogContent>

    </Dialog>
  );
}