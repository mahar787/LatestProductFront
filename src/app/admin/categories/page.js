"use client";
import getReq from "@/app/utilities/getReq";
import { useState, useEffect } from "react";
import spinner from "../../../../public/spinner.gif";
import Image from "next/image";
import postReq from "@/app/utilities/postReq";
import AdminNav from "@/app/components/AdminNav";
import { useRouter } from "next/navigation";
const ProductsPage = () => {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("azsxdc");
    if (!token) {
      router.push("/admin/adminLogin");
    }
    postReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/loginVerify`,
      { token }
    ).then((data) => {
      if (!data.response.authorization) {
        router.push("/admin/adminLogin");
      }
    });
  });
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCollections() {
    try {
      const res = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getCategories`
      );
      setCollections(res.response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);
  async function handleDelete(id) {
    let confirmation = window.confirm("Are you sure you want to delete?");
    if (confirmation) {
      setLoading(true);
      let data = {
        itemId: id,
        model: "category",
      };
      try {
        let result = await postReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/deleteItem`,
          { data }
        );
        setApiResponse(result.response.msg);
        setLoading(false);
        fetchCollections();
      } catch (error) {
        setLoading(false);
        console.log("Error in deleting item", error);
      }
    }
  }

  return (
    <>
      <AdminNav />
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Image height={200} width={200} src={spinner} alt="Spinner" />
        </div>
      ) : (
        <div className="min-h-screen p-4 bg-gray-100">
          <h1 className="text-3xl font-bold text-center my-6">
            Our Categories
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(collections) &&
              collections.length > 0 &&
              collections?.map((product, i) => (
                <div key={i} className="flex items-start">
                  <button
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                    className="bg-red-600 py-1 px-2 text-white m-2 cursor-pointer"
                  >
                    X
                  </button>
                  <a
                    href={`/admin/categories/${product._id}`}
                    className="bg-white p-4 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    <img
                      src={product.image?.url}
                      alt={product?.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h2 className="text-xl font-semibold mt-2">
                      {product?.name}
                    </h2>
                  </a>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
