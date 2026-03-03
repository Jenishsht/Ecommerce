import CartEntry from "@/components/cart-entry";
import CartOverall from "@/components/cart-overall";
import { getCart } from "@/lib/Action"

export default async function CartPage(){
    const cart = await getCart();


    return (
        <main className="container mx-auto py-4">
            {!cart || cart.items.length ===0 ?(
                <div className="text-center">
                    <h2 className="text-2xl">Your cart is empty</h2>
                    <p className="text-gray-500">Add some items to your cart to get Started.</p>
                </div>
            ):(
                <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                         {cart.items.map((item) => (
                        <CartEntry key={item.id} cartItem={item} />
                     ))}
                </div>
                <div className="w-full lg:w-96 flex-shrink-0">
                    <CartOverall />
                </div>
            </div>
             )}
        </main>
    )
}