import { CategorySidebar } from "@/components/category-sidebar";
import { SortingControls } from "@/components/sorting-controls";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";


async function CategorySidebarServerWrapper() {
  const catagories = await prisma.catagory.findMany({
    select: {
      name: true,
      slug: true, // only fetch what we need
    },
    orderBy: {
      name: "asc",
    },
  });

  return <CategorySidebar catagories={catagories} />;

}

export default function SearchLayout({
    children,

}:{
children: React.ReactNode})
{
    return (
        <main className="container mx-auto py-4">
         
         <div className=" flex gap-8">
            
            <div className="w-p[125px] flex-none">
            
                <Suspense fallback={ <div className="w-[125px]">Loading...</div>}>
                    <CategorySidebarServerWrapper/>
                </Suspense>
            </div>

            <div className="flex-1">
                {children}
            </div>
         <div className="w-p[125px] flex-none"><SortingControls/></div>
         </div>
        </main>
    )

}