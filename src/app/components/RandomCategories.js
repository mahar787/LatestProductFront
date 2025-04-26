// "use client";
// import React, { useEffect, useState } from "react";
// import getReq from "../utilities/getReq";

// const RandomCategories = () => {
//   const [data, setData] = useState([]);
//   async function getRandomCollectionData() {
//     let result = await getReq(
//       `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getRandomCategories`
//     );
//     setData(result.response.data);
//   }
//   useEffect(() => {
//     getRandomCollectionData();
//   }, []);

//   return (
//     <>
//       <main className="min-h-screen mt-10 p-4">
//         {Array.isArray(data) &&
//           data.length > 0 &&
//           data.map((item) => {
//             return (
//               <section
//                 className="py-5 border-t-2 border-gray-500"
//                 key={item.collection?._id}
//               >
//                 <h1 className="text-xl sm:text-2xl md:text-3xl my-5 font-bold">
//                   {item.collection?.name}
//                 </h1>
//                 {/* for desktop */}
//                 <div className={`hidden md:grid md:grid-cols-4 gap-8 `}>
//                   {item.products.map((product) => {
//                     return (
//                       <div
//                         key={product._id}
//                         className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md"
//                       >
//                         <a href={`/viewProduct/${product._id}`}>
//                           <img
//                             className="h-60 w-auto mx-auto rounded-t-lg object-cover"
//                             src={product?.images[0]?.url}
//                             alt="product image"
//                           />
//                         </a>
//                         <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-xs text-white">
//                           {product?.stock !== 0 ? "In Stock" : "Out Of Stock"}
//                         </span>
//                         <div className="mt-4 px-5 pb-5">
//                           <a href={`/viewProduct/${product._id}`}>
//                             <h5 className="text-xl font-semibold tracking-tight text-slate-900">
//                               {product?.productName}
//                             </h5>
//                           </a>
//                           <div className="mt-2.5 mb-5 flex items-center">
//                             <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
//                               Brand: {product?.brandName}
//                             </span>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <p>
//                               <span className="sm:text-xl md:text-2xl font-bold text-slate-900">
//                                 {product?.discountedPrice}
//                               </span>
//                               {/* <span className="text-sm text-slate-900 line-through">
//                                 {
//                                   product?.originalPrice}
//                               </span> */}
//                               {product?.originalPrice > 0 && (
//                                 <span className="text-sm text-slate-900 line-through">
//                                   {product?.originalPrice}
//                                 </span>
//                               )}
//                               <span className="mr-1">./Rs</span>
//                             </p>
//                             <a
//                               href={`/viewProduct/${product._id}`}
//                               className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="mr-2 h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                                 />
//                               </svg>
//                               Add to cart
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 {/* for desktop */}

//                 {/* for mobile */}
//                 <div
//                   className={` md:hidden flex overflow-x-auto overflow-y-hidden`}
//                 >
//                   {item.products.map((product) => {
//                     return (
//                       <div
//                         key={product._id}
//                         className="relative m-3 flex-none w-full max-w-3xs overflow-hidden rounded-lg bg-white shadow-md"
//                       >
//                         <a href={`/viewProduct/${product._id}`}>
//                           <img
//                             className="h-40 w-auto mx-auto rounded-t-lg object-cover"
//                             src={product?.images[0]?.url}
//                             alt="product image"
//                           />
//                         </a>
//                         <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-xs text-white">
//                           {product?.stock !== 0 ? "In Stock" : "Out Of Stock"}
//                         </span>
//                         <div className="mt-4 px-5 pb-5">
//                           <a href={`/viewProduct/${product._id}`}>
//                             <h5 className="text-base font-semibold tracking-tight text-slate-900">
//                               {product?.productName}
//                             </h5>
//                           </a>
//                           <div className="mt-1.5 mb-1 flex items-center">
//                             <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
//                               Brand: {product?.brandName}
//                             </span>
//                           </div>
//                           <div className="flex flex-col">
//                             <p>
//                               <span className="sm:text-xl md:text-2xl font-bold text-slate-900">
//                                 {product?.discountedPrice}
//                               </span>
//                               <span className="text-sm text-slate-900 line-through">
//                                 {product?.originalPrice > 0 &&
//                                   product?.originalPrice}
//                               </span>
//                               ./Rs
//                             </p>
//                             <a
//                               href={`/viewProduct/${product._id}`}
//                               className="flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="mr-2 h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                                 />
//                               </svg>
//                               Add to cart
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 {/* for mobile */}
//               </section>
//             );
//           })}
//       </main>
//     </>
//   );
// };

// export default RandomCategories;

// =====================================================================
// server comps

import React from "react";
async function getRandomCollectionData() {
  try {
    let result = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getRandomCategories`,
      { next: { revalidate: 1800 } }
    );
    let randomData = await result.json();
    return randomData.data;
  } catch (error) {
    console.log(
      "Error in fetching products for random categories on homepage",
      error
    );
  }
}
const RandomCategories = async () => {
  const data = await getRandomCollectionData();

  return (
    <>
      <main className="min-h-screen mt-10 p-4">
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <section
                className="py-5 border-t-2 border-gray-500"
                key={item.collection?._id}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl my-5 font-bold">
                  {item.collection?.name}
                </h1>
                {/* for desktop */}
                <div className={`hidden md:grid md:grid-cols-4 gap-8 `}>
                  {item.products.map((product) => {
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
                              {/* <span className="text-sm text-slate-900 line-through">
                                {
                                  product?.originalPrice}
                              </span> */}
                              {product?.originalPrice > 0 && (
                                <span className="text-sm text-slate-900 line-through">
                                  {product?.originalPrice}
                                </span>
                              )}
                              <span className="mr-1">./Rs</span>
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
                <div
                  className={` md:hidden flex overflow-x-auto overflow-y-hidden`}
                >
                  {item.products.map((product) => {
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
                                {product?.originalPrice > 0 &&
                                  product?.originalPrice}
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
            );
          })}
      </main>
    </>
  );
};

export default RandomCategories;
