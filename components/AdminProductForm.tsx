/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { createProduct, updateProduct, ProductInput } from "@/lib/admin";
import toast from "react-hot-toast";
import { catagories } from "./ui/navbar";

type Props = {
  product?: Partial<ProductInput> & { id: string };
  onSuccess?: () => void;
};

export default function AdminProductForm({ product, onSuccess }: Props) {
  const [form, setForm] = useState<ProductInput>({
    name: "",
    description: "",
    price: 0,
    inventory: 0,
    slug: "",
    image: "",
    catagoryId: "",
  });


  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        inventory: product.inventory || 0,
        slug: product.slug || "",
        image: product.image || "",
        catagoryId: product.catagoryId || "",
      });
    } else {
      // Reset form when creating new product
      setForm({
        name: "",
        description: "",
        price: 0,
        inventory: 0,
        slug: "",
        image: "",
        catagoryId: "",
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product?.id) {
        await updateProduct(product.id, form);
        toast.success("Product updated");
      } else {
        await createProduct(form);
        toast.success("Product created");
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg shadow-md bg-white">
      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="price"
        placeholder="0"
        value={form.price}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="quantity"
        placeholder="0"
        value={form.inventory}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="catagoryId"
        value={form.catagoryId}
        onChange={handleChange}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        {catagories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold"
      >
        {product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}