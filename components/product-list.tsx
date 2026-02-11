"use client"

import { ProductCard } from "@/app/ProductCard";
import { Product } from "@prisma/client";

type ProductListProps={
    products :Product[];
}
  export function ProductList({ products } :ProductListProps)
  {
      if(products.length===0){
        return(
            <div className="text-center text-muted-foreground">
                No Product Found
            </div>
        )
      }


    return (
          <> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
    )
  }