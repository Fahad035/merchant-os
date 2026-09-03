"use client";

import {
  CheckCircle2,
  XCircle,
  PlayCircle,
  FileText,
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
  const stats = [
    {
      title: "Total Events",
      value: total,
      icon: FileText,
    },
    {
      title: "Approved",
      value: approved,
      icon: CheckCircle2,
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
    },
    {
      title: "Executed",
      value: executed,
      icon: PlayCircle,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="p-6"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {stat.value}
                </h2>

              </div>

              <Icon className="h-8 w-8 text-primary" />

            </div>
          </Card>
        );
      })}
    </div>
  );
}