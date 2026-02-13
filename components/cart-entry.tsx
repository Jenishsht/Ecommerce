"use client";
import { CartItemWithProduct, setProductQuantity } from "@/lib/Action";
import { FormatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";



interface CartEntryProps {
    cartItem : CartItemWithProduct;
}

export default function CartEntry({cartItem}: CartEntryProps){
    const [isLoading,setIsLoading] = useState(false);

    const handleIncrement = async() => {
        setIsLoading(true);
        try
        {
            await setProductQuantity(cartItem.product.id,cartItem.quantity+1);

        }catch(error){
            console.error("Error incrementing cart item:", error);
        } finally{
            setIsLoading(false);
        }

    }

     const handleDecrement = async() =>{
        setIsLoading(true);
        try
        {
            await setProductQuantity(cartItem.product.id, cartItem.quantity - 1);

        }catch(error){
            console.error("Error decrementing cart item:", error);
        } finally{
            setIsLoading(false);
        }
    }

    return ( 
    <li className="border-b border-muted flex py-4 justify-between">
            <div className="flex space-x-4">
                <div className="overflow-hidden rounded-md  border border-muted w-16 h-16">
                    <Image 
                        className="h-full w-full object-cover" 
                        width={128} height={128}
                        src={cartItem.product.image  ?? "/placeholder.png"} alt={cartItem.product.name} />

                </div>
                <div className="flex flex-col">
                    <div className=" font-medium">{cartItem.product.name}</div>
                </div>

            </div>
            <div className="flex flex-col justify-between items-end gap-2">
                <p className="font-medium">
                    {FormatPrice(cartItem.product.price)}
                </p>
                <div className="flex items-center border border-muted rounded-full">
            
                    <Button
                        variant="ghost"
                        className="p-1 rounded-full 
                                    hover:bg-secondary/20 
                                    active:bg-secondary/40 
                                    focus:outline-none focus:ring-0"
                        onClick= {handleDecrement} disabled={isLoading}
                         >
                        {cartItem.quantity === 1 ? (
                            // Inline custom trash SVG
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="h-6 w-6 text-red-500"
                                onClick={handleDecrement}
                                
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" 
                                />
                            </svg>
                        ) : (
                            <Minus className="h-4 w-4" />
                        )}
                    </Button>

                  
                    <p className="w-6 text-center">{cartItem.quantity}</p>

            
                    <Button 
                        variant="ghost" 
                         className="p-1 rounded-full 
                                    hover:bg-secondary/20 
                                    active:bg-secondary/40 
                                    focus:outline-none focus:ring-0"
                        onClick={handleIncrement} disabled={isLoading}
                        
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                    </div>
                 
            </div>
    </li>
    )

}