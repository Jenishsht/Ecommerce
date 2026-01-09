import { ProductCard } from "./ProductCard";
import { prisma } from "@/lib/prisma"; 

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import { sleep } from "@/lib/utils";

type SearchParams = { [key: string]: string | string[] | undefined };
  const pageSize = 3;
  async function Products({page} :{page :number})
  {


      const skip = (page - 1) * pageSize;

      //Fetch products 
      const products = await  prisma.product.findMany({
            skip,
            take :pageSize,
          });
     
await sleep(1000); //simulate a delay for loading
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


export default async function HomePage(props: {searchParams :SearchParams}) {
  const searchParams =await props.searchParams;
  const page = Number(searchParams.page) || 1 ;


  const total = await prisma.product.count();
  const totalPages = Math.ceil(total/pageSize);

  return (
    <>
      {/* PAGE CONTENT */}
      <main className="container mx-auto px-5 pt-30 pb-8">
     
    <Suspense key ={page} fallback={<ProductsSkeleton/>}>
      <Products page={page} />
    </Suspense>

        <Pagination className="mt-8">

          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`?page=${page - 1}`} />
            </PaginationItem>


            {/* DYNAMIC  page number like  after  next page it show that hightlight  page number */}
            {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={`?page=${i + 1}`}
                className={page === i + 1 ? "font-bold underline" : ""}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

            <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>

          </PaginationContent>
        </Pagination>

      </main>
      
    </>
  );
}
