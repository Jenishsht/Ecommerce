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

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";
import { stripe } from "@/lib/stripe";


type SearchParams = { [key: string]: string | string[] | undefined };
  const pageSize = 3;
   


export default async function HomePage(props: {searchParams :SearchParams}) {
  const searchParams =await props.searchParams;
  const page = Number(searchParams.page) || 1 ;



  const total = await prisma.product.count();
  const totalPages = Math.ceil(total/pageSize);



  return (
    <>
      {/* PAGE CONTENT */}
      <main className=" container mx-auto py-4   ">
          <Breadcrumbs
          items={[
            { label: "Products", href: "/" }
          ]}
          />

     
    <Suspense key ={page} fallback={<ProductsSkeleton/>}>
      < ProductListServerWrapper params={{page,pageSize}}/>
    </Suspense>

        <Pagination className="mt-8">

          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`?page=${page - 1}`} />
            </PaginationItem>


            {/* DYNAMIC  page number like  after  next page it show that hightlight  page number */}
            {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={page===index+1}
              >
                {index + 1}
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
