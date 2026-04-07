/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
  getCategories,
  restoreProduct,
} from "@/lib/admin";
import { Product } from "@prisma/client";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { PencilIcon, TrashIcon } from "lucide-react";
import AdminProductsLoading from "@/app/admin/products/Loading";

type Props = {
  onEdit?: (product: Product) => void;
};

export default function AdminProductList({ onEdit }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string>>({});
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const prods = await getAllProducts();
      setProducts(prods);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Fetch categories and create map
  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      const map: Record<string, string> = {};
      cats.forEach((c) => (map[c.id] = c.name));
      setCategoriesMap(map);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Delete product with undo
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id); // soft delete
      fetchProducts();
      setDeleteModalId(null);

      toast(
        (t) => (
          <div className="flex items-center justify-between gap-4">
            <span>Product deleted</span>
            <button
              className="text-blue-500 underline"
              onClick={async () => {
                await restoreProduct(id);
                fetchProducts();
                toast.dismiss(t.id);
              }}
            >
              Undo
            </button>
          </div>
        ),
        { duration: 5000 }
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };


  return (
    <>
      {loading ? (
        <AdminProductsLoading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform duration-200 bg-white flex flex-col"
            >
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name}
                className="h-48 w-full object-cover rounded-t-lg bg-gray-100"
              />

              <div className="p-4 flex flex-col flex-1 ">
                  <div className="flex justify-between items-center">
                    
                    <h2 className="text-lg font-semibold text-black">{p.name}</h2>
                    <p className="text-black text-base font-medium">${p.price.toFixed(2)}</p>
                  </div>

                <Badge
                  variant={p.inventory <= 0 ? "destructive" : "default"}
                  className={`mt-2 ${
                    p.inventory > 0 && p.inventory <= 5 ? "bg-yellow-200 text-yellow-800" : ""
                  }`}
                >
                  {p.inventory <= 0 ? "Out of stock" : `${p.inventory} in stock`}
                </Badge>

                <Badge variant="outline" className="mt-2 text-black">
                  {categoriesMap[p.catagoryId] || "N/A"}
                </Badge>

                <div className="mt-auto flex justify-between items-center gap-2">
                  <button
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => onEdit?.(p)}
                  >
                    <PencilIcon className="h-5 w-5" />
                    Edit
                  </button>

                  <button
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium"
                    onClick={() => setDeleteModalId(p.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 animate-scale-up">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setDeleteModalId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => handleDelete(deleteModalId)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}