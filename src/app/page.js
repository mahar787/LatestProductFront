"use client";
import Banner from "./components/Banner.js";
import Categories from "./components/Categories.js";
import RandomCategories from "./components/RandomCategories.js";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Banner />
      <Categories />
      <RandomCategories />
    </main>
  );
}
