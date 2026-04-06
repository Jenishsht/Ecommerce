"use client";

import { useState } from "react";
import AdminProductList from "./AdminProductList";
import AdminProductForm from "@/components/AdminProductForm";
import { Product } from "@prisma/client";

export default function AdminProductsPage() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel - Products</h1>

      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        + Create Product
      </button>

      {showForm && (
        <AdminProductForm
          product={
            editingProduct
              ? {
                  ...editingProduct,
                  description: editingProduct.description ?? undefined,
                  image: editingProduct.image ?? undefined,
                }
              : undefined
          }
          onSuccess={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <AdminProductList
        onEdit={(product) => {
          setEditingProduct(product);
          setShowForm(true);
        }}
      />
    </div>
  );
}