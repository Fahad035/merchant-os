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

export default function NotificationSettings({
  settings,
  updateField,
}: Props) {
  const items = [
    ["Email Notifications", "email_notifications"],
    ["SMS Notifications", "sms_notifications"],
    ["Browser Notifications", "browser_notifications"],
  ] as const;

  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-5">
        Notifications
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