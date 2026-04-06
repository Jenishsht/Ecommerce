"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProductsLoading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
    

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border rounded-lg shadow bg-white flex flex-col animate-pulse"
          >
            {/* Image skeleton */}
            <Skeleton className="h-48 w-full rounded-t-lg bg-gray-300" />

            {/* Text info skeleton */}
            <div className="p-4 flex flex-col space-y-2">
              <Skeleton className="h-5 w-3/4 rounded bg-gray-300" /> {/* Product Name */}
              <Skeleton className="h-5 w-1/3 rounded bg-gray-300" /> {/* Price */}
              <Skeleton className="h-5 w-1/2 rounded bg-gray-300" /> {/* Inventory */}
              <Skeleton className="h-5 w-1/4 rounded bg-gray-300" /> {/* Category */}
              <Skeleton className="h-5 w-5/6 rounded bg-gray-300" /> {/* Extra text */}
            </div>

            {/* Buttons skeleton */}
            <div className="p-4 flex justify-between gap-2 mt-auto">
              <Skeleton className="h-8 w-20 rounded bg-gray-300" /> {/* Edit */}
              <Skeleton className="h-8 w-20 rounded bg-gray-300" /> {/* Delete */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}