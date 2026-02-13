
import { AddtoCartButton } from "@/components/add-to-cart-button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/Action";
import { FormatPrice, sleep } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";





export async function generateMetadata({
    params,
}:{
    params : Promise<{slug :string}>;

}){
   const {slug} = await params;
    const product = await getProductBySlug(slug);

    if(!product){
       return{};
    }

    return {
      title: product.name,
      description :product.description,
      openGraph: {
          title: product.name,
         description: product.description ,

          images:[
            {
              url: product.image,
            },
          ],

      },
    };
}


export default async function ProductPage({
    params,
}:{
    params : Promise<{slug :string}>;

}){
    const {slug} = await params;
    const product = await getProductBySlug(slug);
    if(!product){
       notFound();
    }

    const breadcrumbs =[
      {label:"Products", href:"/"},

      {label:product.catagory?.name, 
        href:`/search/${product.catagory?.slug}`},

      {label:product.name,
         href:`/product/${product.slug}`, 
         active: true},

    ];
    await sleep(1000);

    
    return(
      <main className="container mx-auto  py-4">
        
         <Breadcrumbs items={breadcrumbs}/>


        <Card>
          
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                  <div className="  relative rounded-lg overflow-hidden h-[200px] md:h-[400px] ">
                      {product.image && (<Image 
                        src= {product.image} 
                        alt={product.name} 
                        fill
                        priority  
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                        )}
                  </div>
      
              <div>
                  <h1 className="text-3xl font-semibold tracking-tight mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl font-semibold">
                    {FormatPrice(product.price)}
                  </span>

                  <Badge variant="secondary">
                    {product.catagory?.name}
                  </Badge>
                </div>
              


                <Separator className="mb-6" />

                <div className="space-y-3">
                  <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Description
                  </h2>

                  <p className="leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              <Separator className="mb-4" />

                <div className="space-y-3 mb-6">
                  <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Availability
                  </h2>
                  <div className="flex items-center gap-2">
                    {product.inventory > 0 ? (
                      <Badge variant="outline" className="text-green-600">In Stock</Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600">Out of stock</Badge>
                    )}
                    {product.inventory > 0 && (
                      <span className="text-xs text-gray-500">{product.inventory} item available</span>
                    )}
                  </div>
                </div>


              <Separator className="mb-4" /> 

             <AddtoCartButton product={product}/>
            </div>
          </CardContent>
        </Card>
      </main>
    )
    
}