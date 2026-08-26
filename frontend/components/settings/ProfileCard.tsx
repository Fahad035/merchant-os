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

export default function ProfileCard({
  settings,
  updateField,
}: Props) {
  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-5">
        Merchant Profile
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <Input
          placeholder="Merchant Name"
          value={settings.merchant_name}
          onChange={(e) =>
            updateField(
              "merchant_name",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Email"
          value={settings.email}
          onChange={(e) =>
            updateField(
              "email",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Phone"
          value={settings.phone}
          onChange={(e) =>
            updateField(
              "phone",
              e.target.value
            )
          }
        />

        <Input
          placeholder="GST Number"
          value={settings.gst_number}
          onChange={(e) =>
            updateField(
              "gst_number",
              e.target.value
            )
          }
        />

      </div>

    </Card>
  );
}