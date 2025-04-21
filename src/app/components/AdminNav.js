"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { name: "Dashboard", path: "/admin" },
  { name: "Add Product", path: "/admin/addProduct" },
  { name: "Add Category", path: "/admin/addCategory" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Payments", path: "/admin/payments" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Settings", path: "/admin/settings" },
];

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false); // Close menu on route change
  }, [pathname]);

  return (
    <nav className="bg-black text-white items-center">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            Store
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`w-6 h-0.5 bg-white mb-1 transition-transform ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-white ${isOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`w-6 h-0.5 bg-white mt-1 transition-transform ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:ml-6 space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="px-3 py-2 transition-all duration-300 hover:text-gray-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-3 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block px-4 py-2 transition-all duration-300 hover:bg-gray-800"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
