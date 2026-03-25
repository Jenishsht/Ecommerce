
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { OrderStatus } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");

  if (!sessionId) return notFound();

  let orderId: string | undefined;
  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
     orderId = session.metadata?.orderId;

    if (!orderId) return notFound();

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        stripeSessionID: sessionId,
      },
    });

    if (!order) return redirect("/");

    
    if (order.status === "pending_payment") {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.PAID,
         
        },
      });

    }else{
        notFound();

    }


  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    return notFound();
  }
     
    return orderId? redirect(`/order/${orderId}`):notFound(); 
}