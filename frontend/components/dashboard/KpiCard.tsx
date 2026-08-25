"use client";

import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  positive?: boolean;
}

export default function KpiCard({
  title,
  value,
  icon: Icon,
  change,
  positive = true,
}: KpiCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {value}
            </h2>

            {change && (
              <div
                className={`mt-3 flex items-center text-sm ${
                  positive
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <ArrowUpRight className="mr-1 h-4 w-4" />

                {change}
              </div>
            )}
          </div>

          <div className="rounded-xl bg-blue-100 p-3">
            <Icon className="h-7 w-7 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}