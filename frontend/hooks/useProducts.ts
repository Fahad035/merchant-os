"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getLowStockProducts,
  getProducts,
} from "@/lib/product-api";

import { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const [allProducts, lowStockProducts] =
          await Promise.all([
            getProducts(),
            getLowStockProducts(),
          ]);

        setProducts(allProducts.products);
        setLowStock(lowStockProducts);
      } catch (err: any) {
        setError(
          err?.message ||
            "Unable to load catalog."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const categories = useMemo(() => {
    const values = new Set(
      products.map((p) => p.category)
    );

    return ["All", ...Array.from(values)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [products, search, category]);

  return {
    loading,

    error,

    products: filteredProducts,

    totalProducts: products.length,

    lowStock,

    categories,

    search,

    setSearch,

    category,

    setCategory,
  };
}