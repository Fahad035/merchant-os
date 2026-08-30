"use client";

import { useState } from "react";

import { Brain } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

export default function GenerateCampaignDialog() {
  const [goal, setGoal] = useState("");

  const [generated, setGenerated] = useState(false);

  function generate() {
    setGenerated(true);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate with AI</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Campaign Generator</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Input
            placeholder="Example: Increase shoe sales this weekend..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <Button className="w-full" onClick={generate}>
            Generate Campaign
          </Button>

          {generated && (
            <div className="space-y-6 rounded-lg border p-6">
              <div>
                <h3 className="text-xl font-semibold">Weekend Sports Sale</h3>

                <p className="text-muted-foreground mt-2">
                  AI recommends a weekend-focused campaign targeting inactive
                  shoe buyers with a limited 10% discount.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-sm text-muted-foreground">Audience</p>

                  <p className="font-medium">Inactive Customers</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Discount</p>

                  <p className="font-medium">10%</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Expected Revenue
                  </p>

                  <p className="font-bold text-xl">₹38,000</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Confidence</p>

                  <Badge>91%</Badge>
                </div>
              </div>

              <Button className="w-full">Submit For Approval</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
