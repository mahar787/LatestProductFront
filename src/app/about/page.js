"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen  text-black flex flex-col items-center justify-center px-6 py-12">
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-center mb-6"
      >
        About Us
      </motion.h1>

      {/* Introduction */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-lg md:text-xl text-gray-900 max-w-3xl text-center"
      >
        Welcome to <span className="text-black font-semibold">Trendify</span>,
        your ultimate destination for the latest fashion trends and timeless
        style. We are committed to bringing you high-quality apparel that
        complements your personality, whether you&apos;re dressing for everyday
        casuals, office wear, or special occasions.
      </motion.p>

      {/* Our Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-12 max-w-3xl text-center"
      >
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="text-gray-900 mt-4">
          At Trendify, we believe fashion is more than just clothing—it&apos;s
          an expression of who you are. Our mission is to provide high-quality,
          trendy, and affordable clothing that empowers individuals to feel
          confident and stylish.
        </p>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      >
        {[
          {
            title: "Fast Delivery",
            desc: "Get your orders quickly, right at your doorstep!",
          },
          {
            title: "Premium Quality",
            desc: "We ensure every product meets high-quality standards.",
          },
          {
            title: "24/7 Customer Support",
            desc: "Our team is always here to assist you.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-300 p-6 rounded-lg shadow-lg"
          >
            {/* You can replace this with an icon related to each service */}
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-900 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Sustainability Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-12 max-w-3xl text-center"
      >
        <h2 className="text-2xl font-bold">Sustainability & Ethical Fashion</h2>
        <p className="text-gray-900 mt-4">
          We are committed to sustainable fashion by using eco-friendly
          materials and ethical manufacturing processes. Every purchase you make
          contributes to a greener planet.
        </p>
      </motion.div>

      {/* Customer Reviews Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-12 max-w-3xl text-center"
      >
        <h2 className="text-2xl font-bold">What Our Customers Say</h2>
        <p className="text-gray-900 mt-4">
          &quot;Trendify never fails to impress! The quality and service are
          top-notch. Highly recommended!&quot; – Sarah J.
        </p>
        {/* You can replace this text with a customer review slider or testimonials section */}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mt-12"
      >
        <Link
          href="/"
          className="px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-xl"
        >
          Start Shopping Now
        </Link>
      </motion.div>
    </div>
  );
}
