import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";

interface BreadCrumbsProps {
  items: { label: string; href: string; active?: boolean }[];
}

export function Breadcrumbs({ items }: BreadCrumbsProps) {
  return (
    <Breadcrumb className="mb-4 ">
      <BreadcrumbList>
    
        <BreadcrumbItem>        
            <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>


          {items.map((item,index)=>(
            <React.Fragment key={index}>
                  <BreadcrumbSeparator/>
                    <BreadcrumbItem key={index}>
                  
                        <BreadcrumbLink key={index}
                                href={item.href}
                                className={item.active ? "active":""}
                                aria-current={item.active ? "page":undefined}>
                                
                                {item.label}
                        </BreadcrumbLink>
                     </BreadcrumbItem>
            </React.Fragment>
     
          ))}
  
      </BreadcrumbList>
    </Breadcrumb>
  );
}
