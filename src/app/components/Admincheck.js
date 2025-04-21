"use client";
import { usePathname } from "next/navigation";

export default function AdminCheck({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return isAdminRoute ? null : children;
}
