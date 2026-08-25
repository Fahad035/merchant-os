"use client";

import {
  Brain,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { AIRecommendation } from "@/types/dashboard";

interface AIInsightCardProps {
  insight: AIRecommendation;
}

export default function AIInsightCard({
  insight,
}: AIInsightCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="space-y-5 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />

            <h3 className="font-semibold">
              {insight.title}
            </h3>
          </div>

          <Badge>
            {insight.confidence}% AI
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground leading-6">
          {insight.explanation}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Expected Revenue
          </span>

          <div className="flex items-center gap-1 text-green-600 font-semibold">
            <TrendingUp className="h-4 w-4" />

            ₹{insight.expected_revenue.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Risk Level
          </span>

          <Badge
            variant={
              insight.risk_level === "Low"
                ? "default"
                : insight.risk_level === "Medium"
                ? "secondary"
                : "destructive"
            }
          >
            <ShieldCheck className="mr-1 h-3 w-3" />

            {insight.risk_level}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Approval
          </span>

          <Badge variant="outline">
            <CheckCircle2 className="mr-1 h-3 w-3" />

            {insight.requires_approval
              ? "Required"
              : "Automatic"}
          </Badge>
        </div>

        <Button className="w-full">
          Review Proposal
        </Button>
      </CardContent>
    </Card>
  );
}