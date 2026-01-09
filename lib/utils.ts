import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function FormatPrice(price :number): string {
  return new Intl.NumberFormat("en-Us",{
    style : "currency",
    currency: "USD"
  }).format(price);

}
export async function sleep(ms :number){
  return new Promise((reslove)=> setTimeout(reslove,ms));
}