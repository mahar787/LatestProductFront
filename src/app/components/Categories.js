"use client";
import React, { useEffect, useState } from "react";
import getReq from "../utilities/getReq";

const Categories = () => {
  const [collections, setCollections] = useState([]);
  async function getCollections() {
    let result = await getReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getCategories`
    );
    setCollections(result.response.data);
  }
  useEffect(() => {
    getCollections();
  }, []);
  return (
    <main className="h-auto border-t-2 border-gray-300">
      <h1 className={`text-2xl font-bold mx-5 my-10`}>Shop By Categories</h1>
      <div className="flex p-4 overflow-x-auto gap-3 sm:p-6 md:p-8">
        {Array.isArray(collections) &&
          collections.length > 0 &&
          collections.map((collection) => (
            <a
              href={`/products/${collection._id}`}
              key={collection._id}
              className="relative flex-none group"
            >
              {/* ✅ Background Image */}
              <img
                src={collection.image?.url} // ✅ Cloudinary Image
                alt={collection?.name}
                className="w-full h-[200px] md:h-[300px] object-cover transition-transform duration-300 group-hover:scale-101"
              />

              {/* ✅ Overlay and Text */}
              <div className="absolute inset-0 flex justify-center items-center ">
                <h1 className="text-white text-lg md:text-xl font-semibold">
                  {collection?.name}
                </h1>
              </div>
            </a>
          ))}
      </div>
    </main>
  );
};

export default Categories;
