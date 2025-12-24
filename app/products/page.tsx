// app/products/page.tsx  ← Make sure the file is here for route /products

export default function Products() {
  return (
    <section className="pt-24 min-h-screen bg-gray-50">  {/* ← Key fix: pt-24 pushes content down */}
      <div className="container mx-auto px-5 py-8">
        <h1 className="text-4xl font-bold text-center mb-10">
          Products
        </h1>
        
        {/* Add your product grid here later */}
        <p className="text-center text-gray-600">
          Product list coming soon...
        </p>
      </div>
    </section>
  );
}