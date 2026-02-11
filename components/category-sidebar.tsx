"use client";
import Link from "next/link";
import { useParams } from "next/navigation";


type Catagory ={
    name: string;
    slug: string;
};
type Props= {
    catagories :Catagory[];
}
export function CategorySidebar({catagories}:Props){
    const params = useParams();
    const activeCatagory =params.slug as string;
    return(
        <div className="w-31.25 flex-none">
            <h3 className=" text-xs text-muted-foreground mb-2">Collection</h3>
                <ul>
                    {catagories.map((catagory)=>(
                        <li key={catagory.slug}>
                            <Link href={`/search/${catagory.slug}`} 
                            className={`text-sm  hover:text-primary ${activeCatagory ===catagory.slug? "underline" : ""}`}>
                                {catagory.name}
                            </Link>
                        </li>
                    ))}
                </ul>   
        </div>
    )
}