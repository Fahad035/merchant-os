"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { Settings } from "@/types/settings";

interface Props {
  settings: Settings;
  updateField: <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => void;
}

export default function AppearanceSettings({
  settings,
  updateField,
}: Props) {
  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-5">
        Appearance
      </h2>

      <div className="space-y-5">

        <Input
          value={settings.theme}
          onChange={(e) =>
            updateField(
              "theme",
              e.target.value
            )
          }
        />

        <div className="flex justify-between">

          <span>Compact Mode</span>

          <Switch
            checked={settings.compact_mode}
            onCheckedChange={(v) =>
              updateField(
                "compact_mode",
                v
              )
            }
          />

        </div>

        <div className="flex justify-between">

          <span>Animations</span>

          <Switch
            checked={settings.animations}
            onCheckedChange={(v) =>
              updateField(
                "animations",
                v
              )
            }
          />

        </div>

      </div>

    </Card>
  );
}