import { ProductCardSkeleton } from "./ProductCardSkeleton";

export  default function ProductsSkeleton(){
    return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({length: 3}).map((_,i) => (
                           <ProductCardSkeleton key={i} />
                        ))}
                     </div>
    )
}