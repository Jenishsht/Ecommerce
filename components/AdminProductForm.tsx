/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { createProduct, updateProduct, getCategories } from "@/lib/admin";
import toast from "react-hot-toast";

type Props = {
  product?: any;
  onSuccess?: () => void;
};

export default function AdminProductForm({ product, onSuccess }: Props) {
  const [categories, setCategories] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ?? "",
    inventory: product?.inventory ?? "",
    slug: product?.slug || "",
    image: product?.image || "",
    catagoryId: product?.catagoryId || "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };
    loadCategories();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.catagoryId) {
      toast.error("Select category");
      return;
    }

    const finalData = {
      ...form,
      price: Number(form.price),
      inventory: Number(form.inventory),
    };

    try {
      if (product?.id) {
        await updateProduct(product.id, finalData);
        toast.success("Product updated");
      } else {
        await createProduct(finalData);
        toast.success("Product created");
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Error saving product");
    }
  };

  return (
    <form className="border p-4 rounded shadow mb-4 max-w-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">{product ? "Edit Product" : "Create Product"}</h2>

      <input
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        type="number"
        name="price"
        placeholder="0"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        type="number"
        name="inventory"
        placeholder="0"
        value={form.inventory}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <select
        name="catagoryId"
        value={form.catagoryId}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}