"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto py-4 flex flex-col lg:flex-row gap-6">
      
      <div className="flex-1 flex flex-col space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-20 w-20 rounded-xl bg-gray-300" />
              <div className="flex flex-col justify-between space-y-2 flex-1">
                <Skeleton className="h-4 w-48 bg-gray-300" />
                <Skeleton className="h-4 w-32 bg-gray-300" />
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Skeleton className="h-4 w-20 bg-gray-300" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

     =
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="space-y-3 p-6 border rounded-lg shadow-md">
         
          <Skeleton className="h-6 w-32 mb-2 bg-gray-300" />
          
          <Skeleton className="h-4 w-20 bg-gray-300" />
          
          <Skeleton className="h-4 w-24 bg-gray-300" />
         
          <Skeleton className="h-4 w-32 bg-gray-300" />
         
          <Skeleton className="h-4 w-28 bg-gray-300" />
          <Skeleton className="h-px w-full my-2 bg-gray-300" />
          
          <Skeleton className="h-10 w-full rounded-lg bg-gray-300" />
          
          <Skeleton className="h-5 w-20 mt-2 bg-gray-300" />
    
          <Skeleton className="h-12 w-full rounded-lg mt-4 bg-gray-300" />
        </div>
      </div>
    </main>
  );
}