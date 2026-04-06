"use server";

import { Product } from "@prisma/client";
import { prisma } from "./prisma";

export type ProductInput = {
  name: string;
  description?: string;
  price: number;
  inventory: number;
  slug: string;
  image?: string;
  catagoryId: string;
};

export async function createProduct(data: ProductInput) {
  return prisma.product.create({ data });
}

export async function updateProduct(id: string, data: ProductInput) {
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(productId: string): Promise<Product> {
  return prisma.product.update({
    where: { id: productId },
    data: { deleted: true }, // mark as deleted instead of removing
  });
}

export async function getAllProducts() {
  return prisma.product.findMany({
    where: { deleted: false }, // only show non-deleted products
    orderBy: { name: "asc" },
  });
}

export async function getCategories() {
  return prisma.catagory.findMany({ orderBy: { name: "asc" } });
}
export async function restoreProduct(productId: string) {
  return prisma.product.update({
    where: { id: productId },
    data: { deleted: false }, // undo soft delete
  });
}