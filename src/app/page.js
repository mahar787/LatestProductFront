import Banner from "./components/Banner.js";
import Categories from "./components/Categories.js";
import RandomCategories from "./components/RandomCategories.js";
import Alert from "./components/Alert.js";
import BrandsSection from "./components/Brands.js";
// let msg = "hallo welcome";
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* <Alert message={msg} /> */}
      <Banner />
      <Categories />
      <RandomCategories />
      <BrandsSection />
    </main>
  );
}
