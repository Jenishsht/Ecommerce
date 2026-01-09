
import ProductsSkeleton from "./ProductsSkeleton";

export default function Loading() {
  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-50">
    //   <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-600 rounded-full animate-spin"></div>
    // </div>
     <main className="container mx-auto px-5 pt-30 pb-8">
         <h1 className="text-3xl font-bold">Home</h1>
          <ProductsSkeleton/>
          </main>
  );
}