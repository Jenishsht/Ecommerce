"use client";

import { CartItemWithProduct, setProductQuantity } from "@/lib/Action";
import { FormatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  onQuantityChange: (cartItemId: string, quantity: number) => void;
}

export default function CartEntry({ cartItem, onQuantityChange }: CartEntryProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = async () => {
    setIsLoading(true);
    try {
      const newQuantity = cartItem.quantity + 1;
      await setProductQuantity(cartItem.product.id, newQuantity);
      onQuantityChange(cartItem.id, newQuantity);
    } catch (error) {
      console.error("Error incrementing cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async () => {
    setIsLoading(true);
    try {
      const newQuantity = cartItem.quantity === 1 ? 0 : cartItem.quantity - 1;
      await setProductQuantity(cartItem.product.id, newQuantity);
      onQuantityChange(cartItem.id, newQuantity);
    } catch (error) {
      console.error("Error decrementing cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async () => {
  setIsLoading(true);
  try {
    await setProductQuantity(cartItem.product.id, 0);
    onQuantityChange(cartItem.id, 0);
  } catch (error) {
    console.error("Error removing item:", error);
  } finally {
    setIsLoading(false);
  }
};

  const subtotal = cartItem.product.price * cartItem.quantity;

  return (
    <div className="border-b border-muted flex py-4 justify-between">
      <div className="flex space-x-4">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden border">
          <Image
            src={cartItem.product.image ?? "/placeholder.png"}
            alt={cartItem.product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div >
            <h3 className="font-semibold text-lg">{cartItem.product.name}</h3>
          </div>

            <div className="flex items-center gap-10 mt-2">
            <p className="text-sm text-muted-foreground">
              {FormatPrice(cartItem.product.price)} × {cartItem.quantity}
            </p>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveItem}
              className="text-primary
                bg-transparent
                hover:bg-transparent
                hover:text-primary
                active:bg-transparent
                active:text-primary
                focus:bg-transparent
                focus:text-primary
                focus-visible:ring-0
                focus-visible:ring-offset-0
                shadow-none"
            >
              <Trash2 className="h-4 w-4 " />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold text-lg text-primary">{FormatPrice(subtotal)}</p>
        
        <div className="flex items-center bg-muted rounded-full px-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrement}
            disabled={isLoading}
          >
            {cartItem.quantity === 1 ? (
              <Trash2 className="h-4 w-4 text-red-500" />
            ) : (
              <Minus className="h-4 w-4 text-primary" />
            )}
          </Button>

          <span className="text-primary px-3 text-sm font-medium">{cartItem.quantity}</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrement}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}