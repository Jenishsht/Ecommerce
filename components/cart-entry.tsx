
"use client";

import { CartItemWithProduct, setProductQuantity } from "@/lib/Action";
import { FormatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

export default function CartEntry({ cartItem }: CartEntryProps) {
  const [isLoading, setIsLoading] = useState(false);
  

  const handleIncrement = async () => {
    setIsLoading(true);
    try {
      await setProductQuantity(cartItem.product.id, cartItem.quantity + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async () => {
    setIsLoading(true);
    try {
      if (cartItem.quantity === 1) {
        await setProductQuantity(cartItem.product.id, 0);
      } else {
        await setProductQuantity(cartItem.product.id, cartItem.quantity - 1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = cartItem.product.price * cartItem.quantity;

  return (

    
    <div className="border-b border-muted flex py-4 justify-between">

      <div className="flex space-x-4 ">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden border">
          <Image
            src={cartItem.product.image ?? "/placeholder.png"}
            alt={cartItem.product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg">{cartItem.product.name}</h3>
            {/* <p className="text-sm text-muted-foreground">Size: M • Color: Black</p> */}
          </div>
          <p className="text-sm text-muted-foreground">
            {FormatPrice(cartItem.product.price)} × {cartItem.quantity}
          </p>
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

          <span className=" text-primary px-3 text-sm font-medium">{cartItem.quantity}</span>

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