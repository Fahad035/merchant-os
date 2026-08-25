export interface Product {
  id: string;
  merchant_id: string;

  name: string;
  sku: string;

  description: string | null;

  price: number;

  stock: number;

  category: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
}