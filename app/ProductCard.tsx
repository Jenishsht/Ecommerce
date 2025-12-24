
import { FormatPrice } from "@/lib/utils";
import Image from "next/image";
import { Product } from "./generated/prisma/browser";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
 export function ProductCard ( {product} : {product :Product}){

    return(
            <Card className=" pt-0 ">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  {product.image && (  
               <Image 
                    src= {product.image}
                    alt={product.name} 
                    className="object-cover"          
                    fill // image stretches to fit its parent box. You don’t give width or height to the image
                    loading="eager" //load the image immediately
                    sizes="{max-width : 768px} 100vm,{max-width :1200px} 50vm,33vm"
                />
                 )} 
            </div>
            <CardHeader>
                <CardTitle>
                    {product.name}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <p>{FormatPrice(product.price)}</p>
            
            </CardFooter>
         
        </Card>
    )
 }