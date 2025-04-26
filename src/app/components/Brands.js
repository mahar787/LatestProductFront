"use client";

import dg from "../../../public/dg.png";
import brand2 from "../../../public/brand2.png";
import gucci from "../../../public/gucci.png";
import apple from "../../../public/apple.png";
import chanel from "../../../public/chanel.png";
import prada from "../../../public/prada.png";
import louis from "../../../public/louis.png";
import armani from "../../../public/armani.png";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Image from "next/image";

const brands = [
  { id: 1, img: dg, name: "Dollce & Gabbana" },
  { id: 2, img: brand2, name: "ESPN" },
  { id: 3, img: gucci, name: "Gucci" },
  { id: 4, img: apple, name: "Apple" },
  { id: 5, img: chanel, name: "Chanel" },
  { id: 6, img: prada, name: "Prada" },
  { id: 7, img: louis, name: "Louis Vuitton" },
  { id: 8, img: armani, name: "Armani" },
];

export default function BrandsSection() {
  return (
    <section
      style={{
        backgroundColor: "rgba(0,0,0,.8)",
        backdropFilter: "blur(10px)",
      }}
      className="bg-black py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 text-white text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-[#b08d57] via-[#d7b87c] to-[#b08d57] bg-clip-text text-transparent drop-shadow-[0_1px_6px_rgba(255,215,0,0.6)]"
        >
          Our Premium Collaborations
        </motion.h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={2000}
          loop={true}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          spaceBetween={30}
          className="w-full"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-white rounded-lg p-4 flex items-center justify-center shadow-lg h-44 md:h-60 w-full"
              >
                <div
                  className="relative w-50 h-28 md:w-60 md:h-36"
                  title={`${brand.name}`}
                >
                  <Image
                    src={brand.img}
                    alt={`Brand ${brand.id}`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
