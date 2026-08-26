"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function OrderSearch({
  value,
  onChange,
}: Props) {
  return (
    <Input
      placeholder="Search customer..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}