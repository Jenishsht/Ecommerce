"use client";

import { CartItemWithProduct, getCart } from "@/lib/Action";
import { FormatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CartOverallProps {
  cart: { items: CartItemWithProduct[] };
}


export default function CartOverall({ cart }: CartOverallProps) {

  const [voucher, setVoucher] = useState("");  
  const [discount, setDiscount] = useState(0); 
  const [voucherMessage, setVoucherMessage] = useState("");



  if (!cart) return null;

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const taxes = 0;
  const shipping = 0;


const handleApplyVoucher = () => {
  const code = voucher.trim().toLowerCase();
  if (code === "save10") {
    const newDiscount = subtotal * 0.1;
    setDiscount(newDiscount);
    setVoucherMessage(`Voucher applied! You saved ${FormatPrice(newDiscount)}`);
  } else if (code === "") {
    setDiscount(0);
    setVoucherMessage("Please enter a voucher code.");
    setTimeout(() => setVoucherMessage(""), 3000);
  } else {
    setDiscount(0);
    setVoucherMessage("Invalid voucher code.");
    setTimeout(() => setVoucherMessage(""), 3000);
  }
};

  const total = subtotal + taxes + shipping - discount;

  return (
    <div className="sticky top-8">
      <div className="bg-white border rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-primary border-b pb-2 mb-2">
          Order Summary
        </h2>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-primary">{FormatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount</span>
              <span>-{FormatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
        </div>

       <div className="flex flex-col space-y-1">
  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
    <input
      type="text"
      placeholder="Enter voucher code"
      className="flex-1 px-3 py-2 text-sm text-primary outline-none"
      value={voucher}
      onChange={(e) => setVoucher(e.target.value)}
    />
    <button
      onClick={handleApplyVoucher}
      className="bg-primary px-4 py-2 text-sm text-white"
    >
      Apply
    </button>
  </div>
  
      {voucherMessage && (
        <p
          className={`text-sm ${
            discount > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {voucherMessage}
        </p>
      )}
    </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-2 text-base font-semibold">
          <span className="text-primary">Total</span>
          <span className="text-primary">{FormatPrice(total)}</span>
        </div>

        <Button size="lg" asChild className="w-full mt-2">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}