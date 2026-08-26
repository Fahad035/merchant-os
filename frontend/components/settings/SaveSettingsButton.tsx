"use client";

import { Button } from "@/components/ui/button";

interface Props {
  saving: boolean;
  onSave: () => void;
}

export default function SaveSettingsButton({
  saving,
  onSave,
}: Props) {
  return (
    <Button
      className="w-full"
      size="lg"
      onClick={onSave}
      disabled={saving}
    >
      {saving
        ? "Saving..."
        : "Save Settings"}
    </Button>
  );
}