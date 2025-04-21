import React from "react";
import Link from "next/link";
import AdminNav from "../components/AdminNav";
import addProduct from "../../../public/addProduct.png";
import addCategory from "../../../public/addCategory.png";
import products from "../../../public/products.png";
import orders from "../../../public/orders.png";
import payments from "../../../public/payments.png";
import categories from "../../../public/categories.png";
import settings from "../../../public/settings.png";
import Image from "next/image";
const Page = () => {
  const paths = [
    {
      path: "/admin/addProduct",
      name: "Add Product",
      icon: addProduct,
    },
    {
      path: "/admin/addCategory",
      name: "Add Category",
      icon: addCategory,
    },
    {
      path: "/admin/products",
      name: "Products",
      icon: products,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: orders,
    },
    {
      path: "/admin/payments",
      name: "Payments",
      icon: payments,
    },
    {
      path: "/admin/categories",
      name: "Categories",
      icon: categories,
    },
    {
      path: "/admin/settings",
      name: "Settings",
      icon: settings,
    },
  ];
  return (
    <section className="w-[100vw] min-h-[100vh]">
      <AdminNav />
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((item, i) => {
            return (
              <Link
                key={i}
                href={item?.path}
                className="bg-black text-white p-6 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-[1.05] hover:shadow-2xl flex flex-col items-center justify-center border border-gray-700 relative overflow-hidden group"
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-50 group-hover:opacity-70 transition-all duration-300"></div>

                {/* Icon */}
                <div className="relative z-10 bg-gray-800 p-4 text-3xl rounded-full transition-all duration-300 transform group-hover:scale-110">
                  <Image height={50} width={50} alt="icon" src={item?.icon} />
                </div>

                {/* Title */}
                <h2 className="relative z-10 text-xl font-semibold mt-4 transition-all duration-300 group-hover:text-gray-300">
                  {item?.name}
                </h2>
              </Link>
            );
          })}
        </div>
      </main>
    </section>
  );
};

export default Page;
