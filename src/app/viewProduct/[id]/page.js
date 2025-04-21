"use client";
import Alert from "@/app/components/Alert";
import postReq from "@/app/utilities/postReq";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otherProducts, setOtherProducts] = useState([]);
  const [resError, setResError] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  async function getProduct() {
    let result = await postReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getProductById`,
      {
        id,
      }
    );
    setProduct(result.response.data);
    console.log(result.response.data);
    setOtherProducts(result.response.otherProducts);
    console.log("othersss", result.response.otherProducts);
    setMainImage(result.response.data.images[0].url);
  }
  function addToCart(
    productId,
    productName,
    productPrice,
    quantity,
    color,
    size
  ) {
    if (quantity <= 0) {
      setResError("Quantity must be at least 1!");
      return;
    }
    let alreadyCartLength = localStorage.getItem("cartLength");
    localStorage.setItem("cartLength", alreadyCartLength + 1);
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Cart ko get karo

    // let existingItem = cart.find((item) => item?.name === productName && item.color===);

    // if (existingItem) {
    //   existingItem.quantity += quantity; // Agar item pehle se hai, toh quantity badhao
    // } else {
    let product = {
      number: alreadyCartLength + 1,
      id: productId,
      name: productName,
      price: productPrice,
      quantity: quantity,
      size: size,
      color: color,
    };
    cart.push(product);
    // }

    localStorage.setItem("cart", JSON.stringify(cart)); // Cart ko save karo
    alert(`${quantity} x ${productName} added to cart!`);
  }

  const handleChoiceSubmit = async () => {
    if (product?.sizes.length > 1 && selectedSize == "") {
      setResError("Please Select A Size!");
      return;
    }
    if (product?.colors.length > 1 && selectedColor == "") {
      setResError("Please Select A Color!");
      return;
    }
    if (quantity == 0) {
      setResError("Please Select At Least One Product");
      return;
    }
    if (quantity < 0) {
      setResError("Please Select At Least One Product");
      return;
    } else {
      if (product?.allowBackorders == "false" && quantity > product?.stock) {
        setResError(
          "Sorry! Your Required Amount Of Products Are Not Available."
        );
        return;
      }
      setLoading(true);

      let Item = {
        quantity,
        itemPrice: product.discountedPrice,
        itemId: product._id,
        color: selectedColor,
        size: selectedSize,
      };
      addToCart(
        Item.itemId,
        product?.productName,
        Item.itemPrice,
        Item.quantity,
        Item.color,
        Item.size
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <section
        className="py-12 h-auto sm:py-16 overflow-x-hidden w-screen text-gray-800"
        style={{ position: "relative" }}
      >
        <Alert message={resError} />
        <div className="" style={{ position: "relative" }}></div>
        <div className="container mx-auto px-4">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden ">
                    <img
                      className="h-full w-full max-w-full object-cover"
                      src={mainImage ? mainImage : "#"}
                      alt="Product Image"
                    />
                  </div>
                </div>
                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                  <div className="flex flex-row items-start lg:flex-col">
                    {Array.isArray(product.images) &&
                      product.images.map((item) => {
                        return (
                          <button
                            key={item._id}
                            type="button"
                            className="flex-1 cursor-pointer aspect-square mb-3 h-20 overflow-hidden  border-2 border-gray-900 text-center"
                            onClick={() => {
                              setMainImage(item.url);
                            }}
                          >
                            <img
                              className="h-full w-full object-cover"
                              src={item.url}
                              alt="Product Image"
                            />
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="text-2xl my-4 font-bold text-black sm:text-3xl">
                {product?.allowBackorders == "false" && product?.stock <= 0 ? (
                  <span className="text-base bg-black p-2 text-white md:text-lg">
                    Out Of Stock
                  </span>
                ) : (
                  <span className="text-base bg-black text-white p-2 md:text-lg">
                    In Stock
                  </span>
                )}
              </h1>
              <h1 className="text-2xl my-2 font-bold text-black sm:text-3xl">
                {product?.productName}
              </h1>

              <div className="">
                <label className="text-black font-bold">
                  {product?.sizes &&
                  Array.isArray(product?.sizes) &&
                  product?.sizes.length > 1
                    ? "Available Sizes :"
                    : ""}
                </label>
              </div>
              <div className="flex gap-1 mt-3 flex-wrap">
                {product?.sizes &&
                  Array.isArray(product?.sizes) &&
                  product?.sizes.length > 1 &&
                  product?.sizes.map((item) => {
                    return (
                      <label key={item}>
                        <input
                          type="radio"
                          name="size"
                          value={item}
                          className="peer sr-only"
                          onChange={() => setSelectedSize(item)}
                        />
                        <p
                          className={`peer-checked:bg-black  peer-checked:text-white  
                             border px-6 py-2 font-bold ${
                               selectedSize.includes(item)
                                 ? "bg-white text-black"
                                 : ""
                             }`}
                        >
                          {item}
                        </p>
                      </label>
                    );
                  })}
              </div>
              {/* colors */}
              <div className="my-3">
                <label className="text-black font-bold">
                  {product?.colors &&
                  Array.isArray(product?.colors) &&
                  product?.colors.length > 1
                    ? "Available Colors :"
                    : ""}
                </label>
              </div>
              <div className="flex gap-1 mt-3 flex-wrap">
                {product?.colors &&
                  Array.isArray(product?.colors) &&
                  product?.colors.length > 1 &&
                  product?.colors.map((item) => {
                    return (
                      <label key={item}>
                        <input
                          type="radio"
                          name="color"
                          value={item}
                          className="peer sr-only"
                          onChange={() => setSelectedColor(item)}
                        />
                        <p
                          className={`peer-checked:bg-black  peer-checked:text-white  
                             border px-6 py-2 font-bold ${
                               selectedColor.includes(item)
                                 ? "bg-white text-black"
                                 : ""
                             }`}
                        >
                          {item}
                        </p>
                      </label>
                    );
                  })}
              </div>
              {/* colors */}

              <div className="my-2">
                <div className="my-2">Quantity</div>
                <div className="flex gap-3 items-center justify-between w-40">
                  <button
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                    className="bg-black cursor-pointer text-white font-bold px-4  shadow-lg py-2"
                  >
                    +
                  </button>

                  <input
                    className="w-12"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      setQuantity(quantity - 1);
                    }}
                    disabled={quantity == 0 ? true : false}
                    className="bg-black cursor-pointer text-white font-bold px-4  shadow-lg py-2"
                  >
                    -
                  </button>
                </div>
              </div>
              {/* Available quantity */}
              {product?.showStockToUser == "true" ? (
                <div className="my-2 flex gap-4 items-center">
                  <div className="my-2 font-bold text-base md:text-lg">
                    Available Quantity :{" "}
                  </div>
                  <p className="font-bold text-base md:text-lg bg-black text-white py-1 px-2">
                    {product?.stock}
                  </p>
                </div>
              ) : (
                ""
              )}
              {/* Available quantity */}

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold text-black">
                    {product?.discountedPrice}
                  </h1>
                  {product?.originalPrice > 0 && (
                    <h2 className="text-base line-through font-semibold mx-1 text-black">
                      {product?.originalPrice}
                    </h2>
                  )}
                  <span className="text-base text-black">./RS</span>
                </div>

                <button
                  type="submit"
                  onClick={() => {
                    handleChoiceSubmit();
                  }}
                  disabled={
                    product?.allowBackorders == "false" && product?.stock < 1
                  }
                  className={`inline-flex ${
                    product?.allowBackorders == "false" && product?.stock < 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } items-center justify-center  border-2 border-transparent bg-black bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[white] hover:text-black`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 mr-3 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {loading ? "Adding" : "Add to cart"}
                </button>
              </div>

              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-black">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      className=""
                    ></path>
                  </svg>
                  Provide Shipping All Over Pakistan
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="mt-8 flow-root sm:mt-12">
                <h1 className="text-3xl text-black font-bold">Description</h1>
                {Array.isArray(product?.descriptionPoints) &&
                  product.descriptionPoints.map((des, i) => {
                    return (
                      <li className=" text-lg mt-3" key={i}>
                        {des}
                      </li>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* for desktop */}
        {Array.isArray(otherProducts) && otherProducts.length > 0 ? (
          <h2 className="text-2xl font-bold mx-3">More Products Like This</h2>
        ) : (
          ""
        )}
        <div className={`hidden md:grid md:grid-cols-4 gap-8 `}>
          {Array.isArray(otherProducts) &&
            otherProducts.length > 0 &&
            otherProducts.map((product) => {
              return (
                <div
                  key={product._id}
                  className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md"
                >
                  <a href={`/viewProduct/${product._id}`}>
                    <img
                      className="h-60 w-auto mx-auto rounded-t-lg object-cover"
                      src={product?.images[0]?.url}
                      alt="product image"
                    />
                  </a>
                  <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-xs text-white">
                    {product?.stock !== 0 ? "In Stock" : "Out Of Stock"}
                  </span>
                  <div className="mt-4 px-5 pb-5">
                    <a href={`/viewProduct/${product._id}`}>
                      <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                        {product?.productName}
                      </h5>
                    </a>
                    <div className="mt-2.5 mb-5 flex items-center">
                      <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        Brand: {product?.brandName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>
                        <span className="sm:text-xl md:text-2xl font-bold text-slate-900">
                          {product?.discountedPrice}
                        </span>
                        <span className="text-sm text-slate-900 line-through">
                          {product?.originalPrice}
                        </span>
                      </p>
                      <a
                        href={`/viewProduct/${product._id}`}
                        className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
              );
            })}
        </div>
        {/* for desktop */}

        {/* for mobile */}
        <div className={` md:hidden flex overflow-x-auto overflow-y-hidden`}>
          {Array.isArray(otherProducts) &&
            otherProducts.length > 0 &&
            otherProducts.map((product) => {
              return (
                <div
                  key={product._id}
                  className="relative m-3 flex-none w-full max-w-3xs overflow-hidden rounded-lg bg-white shadow-md"
                >
                  <a href={`/viewProduct/${product._id}`}>
                    <img
                      className="h-40 w-auto mx-auto rounded-t-lg object-cover"
                      src={product?.images[0]?.url}
                      alt="product image"
                    />
                  </a>
                  <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-xs text-white">
                    {product?.stock !== 0 ? "In Stock" : "Out Of Stock"}
                  </span>
                  <div className="mt-4 px-5 pb-5">
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
                        <span className="sm:text-xl md:text-2xl font-bold text-slate-900">
                          {product?.discountedPrice}
                        </span>
                        <span className="text-sm text-slate-900 line-through">
                          {product?.originalPrice}
                        </span>
                        ./Rs
                      </p>
                      <a
                        href={`/viewProduct/${product._id}`}
                        className="flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              );
            })}
        </div>
        {/* for mobile */}
      </section>
    </>
  );
};

export default Page;
