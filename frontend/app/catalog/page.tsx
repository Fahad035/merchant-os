"use client";

import { Package, AlertTriangle, Layers } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import ProductCard from "@/components/catalog/ProductCard";
import ProductTable from "@/components/catalog/ProductTable";
import ProductSearch from "@/components/catalog/ProductSearch";
import CategoryFilter from "@/components/catalog/CategoryFilter";

import { useProducts } from "@/hooks/useProducts";

export default function CatalogPage() {
  const {
    loading,
    error,

    products,

    totalProducts,

    lowStock,

    categories,

    search,

    setSearch,

    category,

    setCategory,
  } = useProducts();

  if (loading) {
    return (
      <div className="p-8">
        Loading catalog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Product Catalog
        </h1>

        <p className="text-muted-foreground mt-1">
          Manage your products and discover AI selling opportunities.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        <Card className="p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-muted-foreground text-sm">
                Total Products
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalProducts}
              </h2>

            </div>

            <Package className="h-10 w-10 text-primary" />

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-muted-foreground text-sm">
                Categories
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {categories.length - 1}
              </h2>

            </div>

            <Layers className="h-10 w-10 text-primary" />

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-muted-foreground text-sm">
                Low Stock
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {lowStock.length}
              </h2>

            </div>

            <AlertTriangle className="h-10 w-10 text-red-500" />

          </div>

        </Card>

      </div>

      {/* AI Recommendation */}

      <Card className="p-6 border-primary">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-xl font-semibold">
              AI Bundle Opportunity
            </h2>

            <p className="text-muted-foreground mt-2">
              Customers purchasing <strong>Running Shoes</strong> frequently
              add <strong>Sports Socks</strong> within the same checkout
              session.
            </p>

          </div>

          <Badge>
            +₹18,000 Potential
          </Badge>

        </div>

      </Card>

      {/* Filters */}

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">

        <div className="w-full md:max-w-md">

          <ProductSearch
            value={search}
            onChange={setSearch}
          />

        </div>

        <CategoryFilter
          value={category}
          categories={categories}
          onChange={setCategory}
        />

      </div>

      {/* Product Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      {/* Table */}

      <Card className="p-6">

        <h2 className="text-xl font-semibold mb-6">
          Product Inventory
        </h2>

        <ProductTable
          products={products}
        />

      </Card>

    </div>
  );
}