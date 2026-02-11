"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { catagories } from "./ui/navbar";
import { usePathname } from "next/navigation";

export function MobileNav(){
    const pathname = usePathname();
    return <Sheet>
        <SheetTrigger asChild className="md:hidden">
           <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5"/>
           </Button>
        </SheetTrigger>
        <SheetContent side="left" >
            <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-4 p-4">
                <SheetClose asChild>
                    <Link href="/">Home</Link>
                </SheetClose>
               <SheetClose asChild>
                    <Link href="/products">Products</Link>
                </SheetClose>

                <div>
                    <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                        Categories
                    </h3>   
                   {catagories.map((catagory) => {
              const isActive = pathname === catagory.href;
              return (
                <SheetClose asChild key={catagory.id}>
                  <Link
                    href={catagory.href}
                    className={`
                      block font-medium transition-all duration-200
                      ${isActive ? "text-foreground " : "text-muted-foreground "}
                      hover:text-foreground hover:text-2xl
                    `}
                  >
                    {catagory.name}
                  </Link>
                </SheetClose>
              );
            })}

                </div>
               

            </nav>

        </SheetContent>
    </Sheet>
}