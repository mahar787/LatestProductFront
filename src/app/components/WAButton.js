"use client";
import React from "react";
import { useEffect, useState } from "react";
import whatsapp from "../../../public/whatsapp.png";
import Image from "next/image";
const WAButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <a
      href="https://wa.me/923265378067"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform ${
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } hover:scale-110 hover:shadow-xl flex items-center justify-center`}
    >
      {/* <BsWhatsapp className="text-2xl" /> */}
      <Image src={whatsapp} height={40} width={40} alt="whatsapp's icon" />
    </a>
  );
};

export default WAButton;
