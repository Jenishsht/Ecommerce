/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { mockProducts } from "@/lib/mocks";
import { ProductCard } from "./ProductCard";
import { prisma } from "@/lib/prisma";



export default async function HomePage() {
 const products = await prisma.product.findMany();
  await new Promise((resolve) =>setTimeout(resolve,3000));
  
  
  return (
    <>
      
       

      {/* PAGE CONTENT */}
      <main className="container mx-auto px-5 pt-30 pb-8">
     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </main>
      
    </>
  );
}
