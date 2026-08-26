"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
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
    <Card className="transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {value}
            </h2>

            {change && (
              <div
                className={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  positive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {positive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {change}
              </div>
            )}
          </div>

          <div className="rounded-2xl brand-gradient p-3 shadow-pop">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}