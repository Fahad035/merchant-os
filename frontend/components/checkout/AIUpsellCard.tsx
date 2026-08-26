import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Sparkles } from "lucide-react";

export default function AIUpsellCard() {
  return (
    <Card className="p-6 border-primary space-y-5">

      <div className="flex items-center gap-3">

        <Sparkles className="h-6 w-6 text-primary" />

        <h2 className="text-xl font-semibold">
          AI Checkout Recommendation
        </h2>

      </div>

      <p>
        Customers purchasing Running Shoes
        frequently add a Shoe Care Kit
        during checkout.
      </p>

      <div className="flex justify-between">

        <span>Expected Revenue</span>

        <strong>₹12,000</strong>

      </div>

      <div className="flex justify-between">

        <span>Confidence</span>

        <Badge>93%</Badge>

      </div>

      <Button className="w-full">
        Enable Upsell
      </Button>

    </Card>
  );
}