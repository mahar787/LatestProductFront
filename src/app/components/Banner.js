"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Use Next.js Link for navigation
import ad1 from "../../../public/ad1.png";
import ad2 from "../../../public/ad2.png";
import ad3 from "../../../public/ad3.png";
import Image from "next/image";

const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const banners = [ad1, ad2, ad3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval); // ✅ Cleanup on unmount
  }, []);

  return (
    <main>
      {/* Banner Section */}
      <div className="relative w-full h-[450px]">
        {/* Overlay */}
        {/* <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center py-8">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Trendify
            </h2>
            <p className="text-lg text-white mb-4">
              Find the perfect product for every occasion!
            </p>
            <Link href="/">
              <button className="px-6 py-3 rounded-md bg-white text-black transition duration-200 hover:bg-gray-200">
                Shop Now
              </button>
            </Link>
          </div>
        </div> */}
        {/* Banner Image */}
        <Image
          src={banners[currentBannerIndex]}
          alt="Banner"
          className="w-[100vw] h-full object-contain transition-opacity duration-1000 ease-in-out"
        />
      </div>
    </main>
  );
};

export default Banner;
