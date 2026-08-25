import api from "./api";

import {
  Product,
  ProductListResponse,
} from "@/types/product";

export async function getProducts(): Promise<ProductListResponse> {
  const { data } = await api.get<ProductListResponse>(
    "/products"
  );

  return data;
}

export async function getLowStockProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>(
    "/products/low-stock"
  );

  return data;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const { data } = await api.get<Product[]>(
    `/products/category/${encodeURIComponent(category)}`
  );

  return data;
}