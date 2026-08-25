import { Badge } from "@/components/ui/badge";

interface Props {
  stock: number;
}

export default function StockBadge({
  stock,
}: Props) {
  if (stock <= 5) {
    return (
      <Badge variant="destructive">
        Low Stock ({stock})
      </Badge>
    );
  }

  if (stock <= 20) {
    return (
      <Badge variant="secondary">
        Medium ({stock})
      </Badge>
    );
  }

  return (
    <Badge>
      In Stock ({stock})
    </Badge>
  );
}