/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { CartItemWithProduct } from "@/lib/Action";
import { FormatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

interface CartOverallProps {
  cart: { items: CartItemWithProduct[] };
}

export default function CartOverall({ cart }: CartOverallProps) {
  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(""); // the code applied
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0); 

  if (!cart) return null;

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const taxes = 0; 

  const AVAILABLE_VOUCHERS = [
    { code: "SAVE10", title: "10% OFF", description: "Save 10% on your order" },
    { code: "SAVE20", title: "20% OFF", description: "Save 20% on orders above 2000" },
    { code: "FREESHIP", title: "Free Shipping", description: "Free delivery on this order" },
  ];

  // Calculate total dynamically
  const total = useMemo(() => {
    return subtotal + taxes + shippingCost - discount;
  }, [subtotal, taxes, shippingCost, discount]);

  const handleApplyVoucher = () => {
    const code = voucherInput.trim().toUpperCase();
    const voucher = AVAILABLE_VOUCHERS.find(v => v.code === code);

    if (!voucherInput) {
      toast("Please enter a voucher code.", { icon: "⚠️" });
      setDiscount(0);
      setAppliedVoucher("");
      setShippingCost(0);
      return;
    }

    if (!voucher) {
      toast.error("Invalid voucher code.");
      setDiscount(0);
      setAppliedVoucher("");
      setShippingCost(0);
      return;
    }

    let newDiscount = 0;
    let newShippingCost = shippingCost;

    switch (voucher.code) {
      case "SAVE10":
        newDiscount = subtotal * 0.1;
        toast.success(`Voucher applied! You saved ${FormatPrice(newDiscount)} 🎉`);
        break;

      case "SAVE20":
        if (subtotal >= 2000) {
          newDiscount = subtotal * 0.2;
          toast.success(`Voucher applied! You saved ${FormatPrice(newDiscount)} 🎉`);
        } else {
          toast.error("SAVE20 applies only on orders above 2000.");
          setDiscount(0);
          setAppliedVoucher("");
          setShippingCost(0);
          return;
        }
        break;

      case "FREESHIP":
        newShippingCost = 0; 
        toast.success("Free shipping applied! 🚚");
        break;

      default:
        toast.error("Voucher not recognized.");
        return;
    }

    setDiscount(newDiscount);
    setShippingCost(newShippingCost);
    setAppliedVoucher(voucher.code);
  };

  // Reset discount if user changes the voucher input manually
  useEffect(() => {
    if (appliedVoucher && voucherInput.trim().toUpperCase() !== appliedVoucher) {
      setDiscount(0);
      setAppliedVoucher(""); 
      setShippingCost(0);
    }
  }, [voucherInput, appliedVoucher]);

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

        {/* Voucher input */}
        <div className="flex flex-col space-y-1">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Enter voucher code"
              className="flex-1 px-3 py-2 text-sm text-primary outline-none"
              value={voucherInput}
              onChange={(e) => setVoucherInput(e.target.value)}
            />
            <button
              onClick={handleApplyVoucher}
              className={`px-4 py-2 text-sm text-white ${
                voucherInput.trim() ? "bg-primary" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!voucherInput.trim()}
            >
              Apply
            </button>
          </div>

          <div className="space-y-2 mt-2">
            <p className="text-sm font-medium text-primary">Available Vouchers</p>
            {AVAILABLE_VOUCHERS.map((voucher) => (
              <div
                key={voucher.code}
                onClick={() => setVoucherInput(voucher.code)}
                className="border rounded-md p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-semibold text-primary">{voucher.title}</p>
                  <p className="text-xs text-muted-foreground">{voucher.description}</p>
                </div>
                <span className="text-xs font-semibold text-primary">{voucher.code}</span>
              </div>
            ))}
          </div>
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