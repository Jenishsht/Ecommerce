"use client"

import { signOut, useSession } from "next-auth/react"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { LogIn, LogOut, User,  } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";


 export default function AuthStatus(){
    
    const {status,data:session} =useSession();
    if(status ==="loading"){
        return <Skeleton className="w-8 h-8"/>
    }
    if(status ==="unauthenticated")
    {
        return (
            <Button variant="ghost" size="icon" asChild>
                    <Link href="/auth/signin">
                        <LogIn className="h-5 w-5"/>
                    </Link>
            </Button>
        )
    }
     return (
             <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
        

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
            {session?.user?.name}
            
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

     );
 }
