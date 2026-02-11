
import { BreadcrumbsSkeleton } from "@/components/Breadcrumbs-skeleton";
import ProductsSkeleton from "./ProductsSkeleton";

export default function Loading() {
  return (

     <main className="container mx-auto px-5 pt-30 pb-8">
          <BreadcrumbsSkeleton/>
          <ProductsSkeleton/>
          </main>
  );
}