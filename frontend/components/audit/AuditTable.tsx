import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { AuditLog } from "@/types/audit";

import AuditStatusBadge from "./AuditStatusBadge";

interface Props {
  logs: AuditLog[];
  onView?: (log: AuditLog) => void;
}

export default function AuditTable({
  logs,
  onView,
}: Props) {
  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Action</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Time</TableHead>

          <TableHead></TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {logs.map((log) => (

          <TableRow key={log.id}>

            <TableCell>

              <div>

                <div className="font-medium">
                  {log.action}
                </div>

                <div className="text-xs text-muted-foreground mt-1">
                  {log.reasoning}
                </div>

              </div>

            </TableCell>

            <TableCell>

              <AuditStatusBadge
                status={log.status}
              />

            </TableCell>

            <TableCell>
              {new Date(
                log.created_at
              ).toLocaleString()}
            </TableCell>

            <TableCell>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onView?.(log)
                }
              >
                View
              </Button>

            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>
  );
}