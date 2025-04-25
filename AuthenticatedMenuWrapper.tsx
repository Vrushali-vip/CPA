"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthenticatedMenu from "@/components/custom/AuthenticatedMenu";

const excludedRoutes = ["/welcome"];

export default function AuthenticatedMenuWrapper() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session || excludedRoutes.includes(pathname)) return null;

  return <AuthenticatedMenu />;
}
