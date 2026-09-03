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
          <TableHead>Event</TableHead>

          <TableHead>Actor</TableHead>

          <TableHead>Details</TableHead>

          <TableHead>Time</TableHead>

          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs.slice(0, 20).map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-medium">
              {log.event_type}
            </TableCell>

            <TableCell>
              {log.actor}
            </TableCell>

            <TableCell className="max-w-md truncate">
              {log.details}
            </TableCell>

            <TableCell>
              {new Date(log.created_at).toLocaleString()}
            </TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView?.(log)}
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