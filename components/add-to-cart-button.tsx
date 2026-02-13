"use client";
import { Product } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addToCart } from "@/lib/Action";

 export function AddtoCartButton({product}:{product: Product}){

   const [isadding,setIsAdding]= useState(false);
   

   const handleAddToCart = async() =>{
    try {

        setIsAdding(true);
        await addToCart(product.id, 1);
  

    }catch(error){
        console.error("Error adding to cart:", error);

    } finally{
        setIsAdding(false);

    }

   }
   

     
    return (  
        <Button
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
                className="w-full flex items-center justify-center gap-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inventory > 0 ? "Add to cart" : "Out of Stock"}
        </Button>
    );
 }