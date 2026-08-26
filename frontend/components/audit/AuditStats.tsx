import {
  Brain,
  CheckCircle2,
  XCircle,
  PlayCircle,
} from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  total: number;
  approved: number;
  rejected: number;
  executed: number;
}

export default function AuditStats({
  total,
  approved,
  rejected,
  executed,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-4">

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              AI Decisions
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {total}
            </h2>

          </div>

          <Brain className="h-9 w-9" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Approved
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {approved}
            </h2>

          </div>

          <CheckCircle2 className="h-9 w-9 text-green-600" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Rejected
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {rejected}
            </h2>

          </div>

          <XCircle className="h-9 w-9 text-red-600" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Executed
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {executed}
            </h2>

          </div>

          <PlayCircle className="h-9 w-9 text-blue-600" />

        </div>

      </Card>

    </div>
  );
}