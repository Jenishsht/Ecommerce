"use server";

import { cookies } from "next/headers";
import { getCart } from "./Action";
import { prisma } from "./prisma";
import { createCheckOutSession, OrderWithItemsAndProduct } from "./stripe";
import { auth } from "./auth";

export type processCheckoutResponse ={
    sessionUrl: string;
    order:  OrderWithItemsAndProduct;
}

export async function processCheckout():Promise<processCheckoutResponse> {
    const cart= await getCart();
    const session = await auth();
    const userId = session?.user?.id;
    



    if(!cart || cart.items.length===0){
        throw new Error("Cart is empty");
    }

    let orderId: string| null =null;


    
    try{
        const order =await prisma.$transaction(async(tx)=>{
            const total = cart.subtotal;
            const newOrder =await tx.order.create({
                data:{
                    total,
                               ...(userId ? { userId } : {}), 
                }
            });
        const  orderItem =cart.items.map((item)=>({
            productId:item.product.id,
            quantity: item.quantity,
            orderId: newOrder.id,
            price: item.product.price,

        }));

        await tx.orderItem.createMany({
            data: orderItem,
        });
        await tx.cartItem.deleteMany({
            where:{
                cartId: cart.id,

            }
        });
        await tx.cart.delete({
            where:{
                id: cart.id
            }
        });
        return newOrder;
        });

        orderId=order.id

        //1. reload full order

        const fullOrder = await prisma.order.findUnique({
             where :{
                id: order.id,

             },
             include :{
                items:{
                    include:{
                        product:true,
                    }
                },
                user:true

             }
        });
        //2. conform the order was loaded

         if(!fullOrder){
            throw new Error("Order not found");
         }
         //3. create the stripe session
         const {sessionId,sessionUrl}= await createCheckOutSession(fullOrder);

         //4. return the sessssion url and handdle teh error
         if(!sessionId || !sessionUrl){
            throw new Error("Failed tp create Stripe session");
         }
         //5. store the session id in the order and change the order status

         await prisma.order.update({
            where :{
                id: fullOrder.id,
    
            },
            data:{
                stripeSessionID :sessionId,
                status: "pending_payment",
            }
         });
        


        (await cookies()).delete("cartId");
        return {
            sessionUrl,
            order: fullOrder,
        };
        }catch(error){ 

            //1.change order status to failed
            if(orderId && error instanceof Error && error.message.includes("Stripe")){
                
                await prisma.order.update({
                    where: {
                        id: orderId,
                    },
                    data:{
                        status:"failed",
                    }
                });
            }

            
            console.error("Error creating oder:",error);
            throw new Error("Failed to create order");

    }
}
