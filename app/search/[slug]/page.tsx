import { Breadcrumbs } from "@/components/breadcrumbs";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import ProductsSkeleton from "../../ProductsSkeleton";
import { notFound } from "next/navigation";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";

type CatagoryPageProps ={
   params: Promise<{slug :string}>;
   searchParams :Promise<{sort? :string}>
   
} 
 


export default async function CatagoryPage({params ,searchParams}: CatagoryPageProps) {

 const { slug } =await params;
 const  {sort} =await searchParams;

 const catagory =await prisma.catagory.findUnique({
        where :
            {slug},
        select:
            {
                name:true,
                slug:true,
             },

 })

    if(!catagory){
        notFound();
    }

 const breadcrumbs=[
    {label:"Product",href:"/"},
    {label: catagory.name,
        href:`/search/${catagory.slug}`,

    }
 ]

    return (
       <>
        <Breadcrumbs items={breadcrumbs} />
      
        <Suspense key={`${slug} - ${sort}`} fallback={ <ProductsSkeleton/>}>
          <ProductListServerWrapper params={{slug,sort}}/>
        </Suspense>
   
          

       </>
    );

 
}