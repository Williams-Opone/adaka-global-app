"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // This points to your original Navbar code

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  // If it's an admin page, we return nothing. 
  // If it's not, we show your original Navbar.
  if (isAdminPage) return null;

  return <Navbar />;
}