import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const payload =await request.text();
    const sig= request.headers.get("Stripe-Signature")||"";
    
    if(!sig){
        return new NextResponse("Missing Stripe-Signature header", {status: 400});

    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    try{
        const event = await stripe.webhooks.constructEvent(
        payload,
        sig,
        webhookSecret
    );

    if(event.type === "checkout.session.completed" ){
        const session = event.data.object;
        const orderId = session.metadata?.orderID;

        if(!orderId){
                console.error("No OrderId found in session metadata");
                return new NextResponse("No orderId found in session metadata",{
                    status:400,
                });

        }


        //handle the checkout session completion
        //for example update your databases or send a conformation email

        //update the order status in databases
        await prisma.order.update({
            where:{
                id: orderId,
            },
            data:{
                status: OrderStatus.PAID,
                stripePaymentIntentId: session.payment_intent as string,
            }
        });
          return NextResponse.json({received:true},{status: 200});
 
      
    }else{
        console.warn(`Unhandled event type:${event.type}`);
    }
    }catch(err){
     console.error(`Errror verifying Stripe webhook:${err}`);
     return new NextResponse("Webhook Error",{status:400});

    }
  
}