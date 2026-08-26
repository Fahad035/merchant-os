"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Settings } from "@/types/settings";

interface Props {
  settings: Settings;
  updateField: <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => void;
}

export default function AIPreferences({
  settings,
  updateField,
}: Props) {
  const items = [
    ["AI Recommendations", "ai_recommendations"],
    ["Auto Bundle Detection", "auto_bundle_detection"],
    ["Campaign Suggestions", "campaign_suggestions"],
    ["Checkout AI", "checkout_ai"],
    ["Planner Agent", "planner_agent"],
  ] as const;

  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-5">
        AI Preferences
      </h2>

      <div className="space-y-5">

        {items.map(([label, key]) => (

          <div
            key={key}
            className="flex justify-between items-center"
          >

            <span>{label}</span>

            <Switch
              checked={settings[key]}
              onCheckedChange={(value) =>
                updateField(key, value)
              }
            />

          </div>

        ))}

      </div>

    </Card>
  );
}