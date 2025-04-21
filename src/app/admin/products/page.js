"use client";
import Alert from "@/app/components/Alert";
import getReq from "@/app/utilities/getReq";
import postReq from "@/app/utilities/postReq";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import spinner from "../../../../public/spinner.gif";
import Image from "next/image";
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
  const [products, setProducts] = useState([]);
  const [apiResponse, setApiResponse] = useState("");
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchProducts(pageNumber, categoryId = "") {
    setLoading(true);
    try {
      const res = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getAllProducts?page=${pageNumber}&categoryId=${categoryId}`
      );
      console.log("response", res.response);
      setProducts(res.response.products);
      setTotalPages(res.response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

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
    fetchProducts(page, selectedCollection);
  }, [page, selectedCollection]);
  async function handleDelete(id) {
    let confirmation = window.confirm("Are you sure you want to delete?");
    if (confirmation) {
      setLoading(true);
      let data = {
        itemId: id,
        model: "product",
      };
      try {
        let result = await postReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/deleteItem`,
          { data }
        );
        setApiResponse(result.response.msg);
        setLoading(false);
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
          <Alert message={apiResponse} />
          <h1 className="text-3xl font-bold text-center my-6">Our Products</h1>

          <div className="mb-4 flex justify-center">
            <select
              className="p-2 border rounded-md"
              value={selectedCollection}
              onChange={(e) => {
                setSelectedCollection(e.target.value);
                console.log(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              {collections.map((col) => (
                <option key={col._id} value={col._id}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
          <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[white] shadow-md rounded-lg border border-gray-200">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-4 py-2 text-left ">Product Name</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Brand</th>
                    <th className="px-4 py-2 text-left">Discounted Price</th>
                    <th className="px-4 py-2 text-left">Original Price</th>
                    <th className="px-4 py-2 text-left">Update</th>
                    <th className="px-4 py-2 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-gray-200">
                      <td className="px-4 py-2">{product.productName}</td>
                      <td className="px-4 py-2">{product.stock}</td>
                      <td className="px-4 py-2">{product.brandName}</td>
                      <td className="px-4 py-2">{product.discountedPrice}</td>
                      <td className="px-4 py-2">{product.originalPrice}</td>
                      <td className="bg-black cursor-pointer border-2 border-white px-3 py-2 text-white font-bold">
                        <a href={`/admin/products/${product._id}`}>Update</a>
                      </td>
                      <td
                        onClick={() => {
                          handleDelete(product._id);
                        }}
                        className="bg-black cursor-pointer border-2 border-white px-3 py-2  text-white font-bold"
                      >
                        Delete
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* </div> */}

          <div className="flex justify-center items-center space-x-4 my-6">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1 || loading}
            >
              Previous
            </button>

            <span className="text-lg font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages || loading}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
