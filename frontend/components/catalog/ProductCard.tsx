import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import StockBadge from "./StockBadge";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <Card className="p-5 space-y-4">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="font-semibold text-lg">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {product.sku}
          </p>

        </div>

        <Badge>
          {product.category}
        </Badge>

      </div>

      <p className="text-sm text-muted-foreground">
        {product.description}
      </p>

      <div className="flex justify-between">

        <div>

          <p className="text-xs text-muted-foreground">
            Price
          </p>

          <p className="font-bold text-xl">
            ₹{Number(product.price).toLocaleString()}
          </p>

        </div>

        <StockBadge stock={product.stock} />

      </div>

    </Card>
  );
}