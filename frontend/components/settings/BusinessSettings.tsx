"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Settings } from "@/types/settings";

interface Props {
  settings: Settings;
  updateField: <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => void;
}

export default function BusinessSettings({
  settings,
  updateField,
}: Props) {
  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-5">
        Business Information
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <Input
          value={settings.store_name}
          placeholder="Store Name"
          onChange={(e) =>
            updateField(
              "store_name",
              e.target.value
            )
          }
        />

        <Input
          value={settings.industry}
          placeholder="Industry"
          onChange={(e) =>
            updateField(
              "industry",
              e.target.value
            )
          }
        />

        <Input
          value={settings.address}
          placeholder="Address"
          onChange={(e) =>
            updateField(
              "address",
              e.target.value
            )
          }
        />

        <Input
          value={settings.currency}
          placeholder="Currency"
          onChange={(e) =>
            updateField(
              "currency",
              e.target.value
            )
          }
        />

        <Input
          value={settings.timezone}
          placeholder="Timezone"
          onChange={(e) =>
            updateField(
              "timezone",
              e.target.value
            )
          }
        />

      </div>

    </Card>
  );
}