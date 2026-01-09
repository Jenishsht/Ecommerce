
import { Card, CardFooter, CardHeader,  } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
 export function ProductCardSkeleton ( ){

    return(
            <Card className=" pt-0 overflow-hidden ">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
             <Skeleton className="w-full h-full"></Skeleton>
            </div>
            <CardHeader>
                <Skeleton className="h-5 w-4/5"></Skeleton>
                <Skeleton className="h-4 w-full mt-2"></Skeleton>
                <Skeleton className="h-4 w-2/3 mt-1"></Skeleton>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
                <Skeleton className="h-6 w-24"></Skeleton>
                <Skeleton className="h-5 w-20"></Skeleton>
                
            </CardFooter>
         
        </Card>
    )
 }