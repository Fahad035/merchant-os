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

export default function SecuritySettings({
  settings,
  updateField,
}: Props) {
  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-5">
        Security
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span>Two-Factor Authentication</span>

          <Switch
            checked={settings.two_factor_auth}
            onCheckedChange={(v) =>
              updateField(
                "two_factor_auth",
                v
              )
            }
          />

        </div>

        <Input
          type="number"
          value={settings.session_timeout}
          onChange={(e) =>
            updateField(
              "session_timeout",
              Number(e.target.value)
            )
          }
          placeholder="Session Timeout"
        />

        <Input
          value={settings.api_key}
          onChange={(e) =>
            updateField(
              "api_key",
              e.target.value
            )
          }
        />

      </div>

    </Card>
  );
}