"use client";

import { UserCog } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminButton() {
  const { data: session } = useSession();

  if (session?.user?.role !== "ADMIN") return null;

  return (
  <Link
  href="/admin/products"
  className="p-2 rounded-full"
>
  <UserCog className="w-5 h-5" />
</Link>
  );
}