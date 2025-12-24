import { clsx, type ClassValue } from "clsx"
import { Currency } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { styleText } from "util"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function FormatPrice(price :number): string {
  return new Intl.NumberFormat("en-Us",{
    style : "currency",
    currency: "USD"
  }).format(price);

}