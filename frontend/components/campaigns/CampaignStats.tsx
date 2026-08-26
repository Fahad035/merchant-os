import {
  Megaphone,
  PlayCircle,
  TrendingUp,
  Brain,
} from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  totalCampaigns: number;
  runningCampaigns: number;
  expectedRevenue: number;
  confidence: number;
}

export default function CampaignStats({
  totalCampaigns,
  runningCampaigns,
  expectedRevenue,
  confidence,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-4">

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Campaigns
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalCampaigns}
            </h2>

          </div>

          <Megaphone className="h-10 w-10" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Running
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {runningCampaigns}
            </h2>

          </div>

          <PlayCircle className="h-10 w-10 text-green-600" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Expected Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{expectedRevenue.toLocaleString()}
            </h2>

          </div>

          <TrendingUp className="h-10 w-10" />

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              AI Confidence
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {confidence}%
            </h2>

          </div>

          <Brain className="h-10 w-10" />

        </div>

      </Card>

    </div>
  );
}