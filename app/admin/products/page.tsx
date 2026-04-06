"use client";

import { useState } from "react";
import AdminProductList from "./AdminProductList";
import AdminProductForm from "@/components/AdminProductForm";
import { Product } from "@prisma/client";

// Helper to convert Prisma product to form input
const mapProductToFormInput = (product: Product) => ({
  id: product.id,
  name: product.name,
  description: product.description ?? undefined,
  price: product.price,
  inventory: product.inventory,
  slug: product.slug,
  image: product.image ?? undefined,
  catagoryId: product.catagoryId,
});

export default function AdminProductsPage() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Products</h1>

      <button
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold shadow"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        + Add New Product
      </button>

      {showForm && (
        <div className="mt-6">
          <AdminProductForm
            product={editingProduct ? mapProductToFormInput(editingProduct) : undefined}
            onSuccess={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      <div className="mt-8">
        <AdminProductList
          onEdit={(product) => {
            setEditingProduct(product);
            setShowForm(true);
          }}
        />
      </div>
    </div>
  );
}