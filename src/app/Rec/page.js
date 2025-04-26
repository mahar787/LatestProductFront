"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import postReq from "../utilities/postReq";

export default function Receipt() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState([]);
  async function getOrder(orderId) {
    try {
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getSpecificOrder
            `,
        { orderId }
      );
      setOrder(result.response.order);
      console.log("rec", result.response.order);
    } catch (error) {
      console.log("error in getting order for recipit", error);
    }
  }
  useEffect(() => {
    getOrder(orderId);
  }, []);
  const products = [
    { name: "Blue Denim Shirt", price: 1200, quantity: 2 },
    { name: "White Sneakers", price: 3000, quantity: 1 },
    { name: "Leather Wallet", price: 1500, quantity: 1 },
  ];

  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl my-2 mx-3 md:mx-auto p-4 border border-black shadow-md bg-white text-black font-mono text-sm sm:text-base">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase">Mariana Clothing</h1>
        <p className="text-sm sm:text-base">
          Contact: 0300-1234567 | 0315-7654321
        </p>

        <p className="mt-1 font-semibold">Order ID: {order?._id}</p>
        <p className="mt-2 text-xs italic">
          Please take a screenshot of this receipt.
        </p>
      </div>
      <div className="text-center mb-4">
        <span className="font-bold">Buyer: </span>
        <span>
          {order?.firstName} {order?.lastName}
        </span>
      </div>
      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-black text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-2 py-1">Product</th>
              <th className="border border-black px-2 py-1">Price</th>
              <th className="border border-black px-2 py-1">Qty</th>
              <th className="border border-black px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.items?.map((p, idx) => (
              <tr key={idx}>
                <td className="border border-black px-2 py-1">{p.name}</td>
                <td className="border border-black px-2 py-1">Rs. {p.price}</td>
                <td className="border border-black px-2 py-1">{p.quantity}</td>
                <td className="border border-black px-2 py-1">
                  Rs. {p.price * p.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="mt-4 space-y-1 text-right">
        <p>
          Payment Method:{" "}
          <span className="font-semibold">
            {order?.paymentMethod?.toUpperCase()}
          </span>
        </p>

        <p>
          Delivery Charges:{" "}
          <span className="font-semibold">Rs. {order?.deliveryCharges}</span>
        </p>
        <p className="text-lg font-bold">
          Grand Total: Rs. {order?.totalPrice}
        </p>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-center text-xs text-gray-600 italic">
        Thank you for shopping with us!
      </p>
    </div>
  );
}
