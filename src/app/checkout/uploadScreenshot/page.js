"use client";
import Alert from "@/app/components/Alert";
import getReq from "@/app/utilities/getReq";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
function ImageUploadFormContent() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [IBAN, setIBAN] = useState("");
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  // redux store

  const addresss = useSelector((state) => state.cardCheckout.address);
  const paymentMethodd = useSelector(
    (state) => state.cardCheckout.paymentMethod
  );
  const cartItemss = useSelector((state) => state.cardCheckout.cartItems);
  const deliveryChargess = useSelector(
    (state) => state.cardCheckout.deliveryCharges
  );
  const totalAmountt = useSelector((state) => state.cardCheckout.totalAmount);
  // redux store

  async function getAdditionals() {
    try {
      let result = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getAdditionals`
      );
      if (result.statusCode == 200) {
        setIBAN(result.response.data[0]?.IBAN);
        setAccountHolderName(result.response.data[0]?.accountHolderName);
        setAccountNumber(result.response.data[0]?.accountNumber);
      }
    } catch (error) {}
  }
  useEffect(() => {
    getAdditionals();
    localStorage.removeItem("cart");
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("orderId", orderId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/addPayment`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setLoading(false);
    setApiResponse(data.message);
    console.log(data);
    console.log(data.status);
    //if proof submitted successfully
    if (res.status === 200) {
      const orderData = {
        ...addresss,
        paymentMethod: paymentMethodd,
        cartItems: cartItemss,
        deliveryCharges: deliveryChargess,
        totalAmount: totalAmountt,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: orderData }),
        }
      );
      const session = await res.json();
      if (session.card) {
        localStorage.removeItem("cart");
        router.push(`/Rec?orderId=${session.orderId}`);

        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Alert message={apiResponse} />
      <div className="p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-bold mb-2 text-center">
          Account Holder Name : {accountHolderName}
        </h2>
        <h2 className="text-lg font-bold mb-2 text-center">
          Account Number : {accountNumber}
        </h2>
        <h2 className="text-lg font-bold mb-2 text-center">IBAN : {IBAN}</h2>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Transfer Amount In Given Account And
        </h2>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Upload Screenshot Here
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border border-gray-700 p-4 rounded-lg flex flex-col justify-center items-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mb-3"
              />
            ) : null}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 bg-black text-white p-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black cursor-pointer text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Uploading" : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ImageUploadForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageUploadFormContent />
    </Suspense>
  );
}
