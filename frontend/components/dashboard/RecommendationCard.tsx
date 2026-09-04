"use client";

import { useState } from "react";

import {
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Recommendation } from "@/services/recommendation";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onExecute: (id: string) => Promise<void>;
}

export default function RecommendationCard({
  recommendation,
  onApprove,
  onReject,
  onExecute,
}: RecommendationCardProps) {
  const [loading, setLoading] = useState<
    "approve" | "reject" | "execute" | null
  >(null);

  const statusVariant =
    recommendation.status === "approved"
      ? "default"
      : recommendation.status === "rejected"
      ? "destructive"
      : "secondary";

  async function handleApprove() {
    setLoading("approve");
    await onApprove(recommendation.id);
    setLoading(null);
  }

  async function handleReject() {
    setLoading("reject");
    await onReject(recommendation.id);
    setLoading(null);
  }

  async function handleExecute() {
    setLoading("execute");
    await onExecute(recommendation.id);
    setLoading(null);
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {recommendation.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {recommendation.explanation}
          </p>
        </div>

        <Badge variant={statusVariant}>
          {recommendation.status}
        </Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-muted/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />

            <span className="text-xs text-muted-foreground">
              Expected Revenue
            </span>
          </div>

          <p className="text-lg font-bold">
            ₹{recommendation.expected_revenue}
          </p>
        </div>

        <div className="rounded-lg bg-muted/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />

            <span className="text-xs text-muted-foreground">
              Confidence
            </span>
          </div>

          <p className="text-lg font-bold">
            {recommendation.confidence}%
          </p>
        </div>

        <div className="rounded-lg bg-muted/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-orange-500" />

            <span className="text-xs text-muted-foreground">
              Risk Level
            </span>
          </div>

          <p className="text-lg font-bold capitalize">
            {recommendation.risk_level}
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        {recommendation.status === "pending" && (
          <>
            <Button
              disabled={loading !== null}
              onClick={handleApprove}
            >
              {loading === "approve" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Approve
            </Button>

            <Button
              variant="destructive"
              disabled={loading !== null}
              onClick={handleReject}
            >
              {loading === "reject" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Reject
            </Button>
          </>
        )}

        {recommendation.status === "approved" && (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading !== null}
            onClick={handleExecute}
          >
            {loading === "execute" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Execute
          </Button>
        )}

        {recommendation.status === "executed" && (
          <div className="rounded bg-green-100 px-3 py-2 text-green-700">
            ✓ Executed
          </div>
        )}
      </div>
    </div>
  );
}