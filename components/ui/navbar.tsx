import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import { MobileNav } from "../mobile-nav";
import { SearchInput } from "../search-input";
import { CartIndicator } from "../cart-indicator";
import { Suspense } from "react";
import { CartIndicatorSkeleton } from "../cart-indicator-skeleton";



export const catagories =[
    {id :1 ,name:"Electronic" ,href:"/search/electronics"},
    {id :2,name:"clothing" ,href:"/search/clothing"},
    {id :3 ,name:"Home" ,href:"/search/home"},
    {id :4 ,name:"Sport" ,href:"/search/sport"},
]

export function Navbar(){
     return (
     
      <div className="flex items-center gap-6 px-10  py-3 border-b mx-auto max-w-7xl text-white">
          
          {/* Logo */}
  
          <Link className="flex flex-col items-center border-r border-white pr-6 hidden md:block" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
              />
            </svg>

            <h3 className="text-xl font-semibold uppercase" >Bondify</h3>
          </Link> 
         

          {/* Nav */}
         <nav className=" hidden md:flex  gap-6 uppercase text-sm">
            {catagories.map((catagory)=>(
                
              <Link key={catagory.id} 
              className="text-foreground text-xl hover:text-2xl transition-colors"
                    href={catagory.href}>{catagory.name} </Link>
            ))}

          </nav>
            {/* mobile nav */}
            <MobileNav/>

            <div className="block w-full mx-4 md:mx-8">
              <SearchInput/>
            </div>

             <div className="ml-auto flex items-center gap-4">
             
              <Suspense fallback={<CartIndicatorSkeleton/>}>
                <CartIndicator/>
              </Suspense>

                 <ModeToggle/>
            </div>
        </div>
     
     )
}