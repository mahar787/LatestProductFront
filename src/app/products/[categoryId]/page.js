"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce function to delay API calls
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchProducts = async () => {
    if (!categoryId) return;
    const queryParams = new URLSearchParams({
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(sortBy && { sortBy }),
      ...(order && { order }),
    }).toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getProducts/${categoryId}?${queryParams}`
    );
    const data = await res.json();
    setProducts(data);
  };

  // Debounced API call
  useEffect(() => {
    const debouncedFetch = debounce(fetchProducts, 500);
    debouncedFetch();
  }, [categoryId, minPrice, maxPrice, order]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Filters & Sorting */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="border px-4 py-2 rounded-md shadow-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-gray-100 p-4 rounded-md mb-4 flex gap-4 flex-wrap">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border px-3 py-2 rounded-md w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border px-3 py-2 rounded-md w-32"
          />
        </div>
      )}

      {/* Product Grid */}
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 `}>
        {Array.isArray(products) &&
          products.length > 0 &&
          products.map((product) => (
            <div
              key={product._id}
              className="relative m-1 w-full max-w-3xs overflow-hidden rounded-lg bg-white shadow-md"
            >
              <a href={`/viewProduct/${product._id}`}>
                <img
                  className="h-40 mx-auto rounded-t-lg object-cover"
                  src={product?.images[0]?.url}
                  alt="product image"
                />
              </a>
              <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-xs text-white">
                {/* {product?.stock > 0 ? "In Stock" : "Out Of Stock"} */}
                {product?.allowBackorders == "false" && product?.stock <= 0
                  ? "No Stock"
                  : "In Stock"}
              </span>
              <div className="mt-3 px-3 pb-3">
                <a href={`/viewProduct/${product._id}`}>
                  <h5 className="text-base font-semibold tracking-tight text-slate-900">
                    {product?.productName}
                  </h5>
                </a>
                <div className="mt-1.5 mb-1 flex items-center">
                  <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                    Brand: {product?.brandName}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p>
                    <span className="text-sm sm:text-lg md:text-2xl font-bold text-slate-900">
                      {product?.discountedPrice && product?.discountedPrice}
                    </span>
                    &nbsp;
                    <span className="text-sm text-slate-900 line-through">
                      {product?.originalPrice > 0 && product?.originalPrice}
                    </span>
                    ./Rs
                  </p>
                  <a
                    href={`/viewProduct/${product._id}`}
                    className="flex items-center justify-center mt-2 rounded-md bg-slate-900 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsPage;
