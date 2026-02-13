import { getCart } from "@/lib/Action";
import { Button } from "./ui/button";
import {  ShoppingCart } from "lucide-react";
import Link from "next/link";

 
 export async function CartIndicator() {

    const cart = await getCart();
    const cartSize = cart?.size ?? 0;


    return (
            <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart">
                    <ShoppingCart className="h-5 w-5"/>
                    {cartSize > 0 && (
                        <span className="absolute top-0 right-0 flex h-3 w-3
                                         items-center justify-center rounded-full
                                         bg-red-500 text-sm text-white">
                                {cartSize}
                        </span>
                    )}
                </Link>
            </Button>
    )
 }