import { Button } from "./ui/button";
import {  ShoppingCart } from "lucide-react";
import Link from "next/link";
 
 export async function CartIndicatorSkeleton() {
    
    return (
            <Button variant="ghost" size="icon" asChild 
                    className="relative animate-pluse" 
                    disabled>
                <Link href="/card">
                    <ShoppingCart className="h-5 w-5"/>
                </Link>
            </Button>
    )
 }