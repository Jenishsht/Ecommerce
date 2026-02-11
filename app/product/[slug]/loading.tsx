import { BreadcrumbsSkeleton } from "@/components/Breadcrumbs-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";



export default async function Loading(){
   
    return(
      <main className="container mx-auto px-6 pt-24 pb-16">
        <BreadcrumbsSkeleton/>
        <Card>
          <CardContent className="p-8">
           <Skeleton className="h-10 w-3/4 "/>

            <div className="flex items-center gap-3 mb-6">
               <Skeleton className="h-6 w-24 "/>
                <Skeleton className="h-6 w-32 "/>
            </div>

            <Separator className="mb-6" />

            <div className="space-y-3">
                <Skeleton className="h-6  w-32 "/>
                <Skeleton className="h-8 w-full "/>
            </div>
          </CardContent>
        </Card>
      </main>
    )
    
} 