"use client";

import { AlertTriangle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  onRetry: () => void;
}

export default function DashboardError({
  onRetry,
}: Props) {
  return (
    <Card>
      <CardContent className="py-20">
        <div className="flex flex-col items-center">
          <AlertTriangle className="mb-5 h-16 w-16 text-red-500" />

          <h2 className="text-2xl font-bold">
            Couldn't load dashboard
          </h2>

          <p className="mt-3 text-center text-muted-foreground">
            Please check your backend server and try again.
          </p>

          <Button
            className="mt-8"
            onClick={onRetry}
          >
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}