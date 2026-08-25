"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value: string;
  categories: string[];
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  value,
  categories,
  onChange,
}: Props) {
  return (
    <Select
      value={value}
      // Highlight-start: Safely convert null to an empty string
      onValueChange={(val) => onChange(val ?? "")} 
      // Highlight-end
    >
      <SelectTrigger className="w-55">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category}
            value={category}
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
