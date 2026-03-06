"use client";

import { useEffect, useState } from "react";
import CartEntry from "@/components/cart-entry";
import CartOverall from "@/components/cart-overall";
import { getCart, CartItemWithProduct } from "@/lib/Action";

import { sleep } from "@/lib/utils";
import Loading from "./loading";

export default function CartPage() {
  const [cart, setCart] = useState<{ items: CartItemWithProduct[] } | null>(null);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      await sleep(1000); // simulate network delay
      const data = await getCart();
      setCart(data);
      setLoading(false);
    };
    fetchCart();
  }, []);


  const updateCartItem = (cartItemId: string, quantity: number) => {
    if (!cart) return;
    const updatedItems = cart.items
      .map(item => (item.id === cartItemId ? { ...item, quantity } : item))
      .filter(item => item.quantity > 0);
    setCart({ items: updatedItems });
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <main className="container mx-auto py-4">
      {!cart || cart.items.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl">Your cart is empty</h2>
          <p className="text-gray-500">Add some items to your cart to get started.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {cart.items.map(item => (
              <CartEntry
                key={item.id}
                cartItem={item}
                onQuantityChange={updateCartItem}
              />
            ))}
          </div>
          <div className="w-full lg:w-96 flex-shrink-0">
           
            <CartOverall cart={cart}  />
          </div>
        </div>
      )}
    </main>
  );
}