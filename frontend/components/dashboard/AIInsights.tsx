"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AIInsightCard from "./AIInsightCard";

import { AIRecommendation } from "@/types/dashboard";

interface Props {
  insights: AIRecommendation[];
}

export default function AIInsights({
  insights,
}: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          AI Recommendations
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <AIInsightCard
            key={insight.action_id}
            insight={insight}
          />
        ))}
      </CardContent>
    </Card>
  );
}