import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import StockBadge from "./StockBadge";

import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function ProductTable({
  products,
}: Props) {
  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Name</TableHead>

          <TableHead>SKU</TableHead>

          <TableHead>Category</TableHead>

          <TableHead>Price</TableHead>

          <TableHead>Stock</TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {products.map((product) => (
          <TableRow key={product.id}>

            <TableCell className="font-medium">
              {product.name}
            </TableCell>

            <TableCell>
              {product.sku}
            </TableCell>

            <TableCell>
              {product.category}
            </TableCell>

            <TableCell>
              ₹{Number(product.price).toLocaleString()}
            </TableCell>

            <TableCell>
              <StockBadge stock={product.stock} />
            </TableCell>

          </TableRow>
        ))}

      </TableBody>

    </Table>
  );
}