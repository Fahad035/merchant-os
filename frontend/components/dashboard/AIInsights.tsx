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
  insights: string[];
}

export default function AIInsights({ insights }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {insights.map((text, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              {text}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}