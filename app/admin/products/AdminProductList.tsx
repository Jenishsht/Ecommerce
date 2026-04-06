/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct, getCategories, restoreProduct } from "@/lib/admin";
import { Product } from "@prisma/client";
import toast from "react-hot-toast";

type Props = {
  onEdit?: (product: Product) => void;
};

export default function AdminProductList({ onEdit }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string>>({});

  const fetchProducts = async () => {
    try {
      const prods = await getAllProducts();
      setProducts(prods);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  const fetchCategories = async () => {
    const cats = await getCategories();
    const map: Record<string, string> = {};
    cats.forEach((c) => (map[c.id] = c.name));
    setCategoriesMap(map);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


const handleDelete = async (id: string) => {
  try {
    await deleteProduct(id); // soft delete
    fetchProducts(); // refresh product list immediately

    // Show toast with Undo button
    const undoToast = toast(
      (t) => (
        <div className="flex items-center justify-between">
          <span>Product deleted</span>
          <button
            className="ml-4 text-blue-500 underline"
            onClick={async () => {
              await restoreProduct(id); // undo delete
              fetchProducts();
              toast.dismiss(t.id); // close the toast
            }}
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 } // 5 seconds
    );
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete product");
  }
};

  if (!products.length) return <p>Loading products...</p>;

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Inventory</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td className="border p-2">{p.name}</td>
            <td className="border p-2">${p.price}</td>
            <td className={`border p-2 ${p.inventory <= 0 ? "text-red-600" : ""}`}>
              {p.inventory <= 0 ? "Out of stock" : p.inventory}
            </td>
            <td className="border p-2">{categoriesMap[p.catagoryId] || "N/A"}</td>
            <td className="border p-2 space-x-2">
              <button className="text-blue-600" onClick={() => onEdit?.(p)}>Edit</button>
              <button className="text-red-600" onClick={() => handleDelete(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}