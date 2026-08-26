import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import CampaignStatusBadge from "./CampaignStatusBadge";

import { Campaign } from "@/types/campaign";

interface Props {
  campaign: Campaign;
}

export default function CampaignCard({
  campaign,
}: Props) {
  return (
    <Card className="p-6 space-y-5">

      <div className="flex justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            {campaign.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {campaign.audience}
          </p>

        </div>

        <CampaignStatusBadge
          status={campaign.status}
        />

      </div>

      <p className="text-sm">
        {campaign.description}
      </p>

      <div className="grid grid-cols-2 gap-4">

        <div>

          <p className="text-xs text-muted-foreground">
            Discount
          </p>

          <p className="font-semibold">
            {campaign.discount_percentage}%
          </p>

        </div>

        <div>

          <p className="text-xs text-muted-foreground">
            Confidence
          </p>

          <Badge>
            {campaign.confidence}%
          </Badge>

        </div>

        <div>

          <p className="text-xs text-muted-foreground">
            Expected Revenue
          </p>

          <p className="font-bold text-lg">
            ₹{Number(
              campaign.expected_revenue
            ).toLocaleString()}
          </p>

        </div>

        <div>

          <p className="text-xs text-muted-foreground">
            Approval
          </p>

          <Badge
            variant={
              campaign.requires_approval
                ? "secondary"
                : "default"
            }
          >
            {campaign.requires_approval
              ? "Required"
              : "Not Required"}
          </Badge>

        </div>

      </div>

      <Button className="w-full">
        Review Campaign
      </Button>

    </Card>
  );
}