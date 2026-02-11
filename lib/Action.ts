"use server";


import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { ShoppingCart } from "lucide-react";
import { cookies } from "next/dist/server/request/cookies";


    export interface GetproductsParams{
        query?:string;
        slug?: string;
        sort?: string;
        page?: number;
        pageSize?: number;

    }

    export async function getProducts({
        query,
        slug,
        sort,
        page=1,
        pageSize=3
    }: GetproductsParams){
        const where : Prisma.ProductWhereInput ={};

        if(query){
            where.OR =[
                {name: {contains :query, mode:"insensitive"}},
                {description:{contains:query,mode:"insensitive"}},
            ]; 
        }
        if(slug){
                where.catagory={
                    slug:slug,
                };
        }


        let orderBy : Record<string,"asc" | "desc"> | undefined=undefined;
            if(sort === "price-asc"){
                orderBy ={price:"asc"};
            }else if(sort === "price-desc"){
                orderBy={price: "desc"};
            }

            const skip = pageSize? (page-1)* pageSize :undefined;
            const take =pageSize;

            return await prisma.product.findMany({
                where,
                orderBy,
                skip,
                take,
            }
        )
    }

    export async function getProductBySlug(slug :string)
    {
        const product = await prisma.product.findUnique({
            where : { slug },
            include :{
                catagory :true,
                
            }
        });
        
        if(!product) return null;

        return product;

    }
export type CartWithProducts = Prisma.CartGetPayload<{
    include : {items :{include : {product: true}}};
}>;

export type ShoppingCart =CartWithProducts & {
    size:     number;
    subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null>{
    const cardId = (await cookies()).get("cardId")?.value;

    const cart = cardId
    ? await prisma.cart.findUnique({
        where: {id:cardId},
        include: {
            items: {
                include:{
                    product: true,
                },
            },
            

        },
    })
    :null;
    if(!cart){
        return null;
    }
    return {
        ...cart,
        size: cart.items.length,
        subtotal: cart.items.reduce(
            (total,item)=> total + item.product.price * item.quantity,
            0
        )
    };
}