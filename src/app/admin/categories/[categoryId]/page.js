"use client";
import AdminNav from "@/app/components/AdminNav";
import Alert from "@/app/components/Alert";
import getReq from "@/app/utilities/getReq";
import postReq from "@/app/utilities/postReq";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export default function UpdateCategoryForm() {
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
  let { categoryId } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [apiResponse, setApiResponse] = useState("");
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getCategory() {
    try {
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getSpecificCategory`,
        { categoryId }
      );
      setCategory(result.response);
      console.log(result.response);
      setValue("name", result.response.product.name);
    } catch (error) {
      console.log("error in fetching category!", error);
    }
  }
  async function getParentCategories() {
    try {
      let result = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getParentCategories`
      );
      if (result.statusCode == 200) {
        setCategories(result.response.data);
      }
    } catch (error) {
      console.log("Error in fetching parent categories", error);
    }
  }
  useEffect(() => {
    getCategory();
    getParentCategories();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("categoryId", categoryId);
    formData.append("name", data.name);
    formData.append("parentCategory", data.parentCategory);
    if (data.image[0]) formData.append("image", data.image[0]);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/updateCategory`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    setApiResponse(result.message);
    console.log("rr", result);
    setLoading(false);
  };

  return (
    <>
      <AdminNav />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto"
      >
        <Alert message={apiResponse} />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Already Existing Image
        </label>
        <img className="h-[250px] w-auto" src={category?.product?.image?.url} />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category Name
        </label>
        <input
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          type="text"
          placeholder="Enter category name"
        />
        <div className=" p-2 flex gap-3 items-center">
          <label>Select Parent Category</label>
          <select
            className="border text-black bg-white p-1"
            onChange={(e) => {
              setValue("parentCategory", e.target.value || null);
            }}
            {...register("parentCategory")}
          >
            {console.log("jj", category)}
            {category?.product?.parentCategory !== null ? (
              <option value={category?.collection?._id}>
                {category?.collection?.name}
              </option>
            ) : (
              <option value={null}>Select Category</option>
            )}
            {Array.isArray(categories) &&
              categories.length > 0 &&
              categories?.map((category, i) => {
                return (
                  <option key={i} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Change Category Image From Here
        </label>
        <input
          {...register("image")}
          className="w-full cursor-pointer p-2 border border-gray-300 rounded mb-4"
          type="file"
          onChange={(e) =>
            setImagePreview(URL.createObjectURL(e.target.files[0]))
          }
        />

        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mb-4 max-h-40" />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black cursor-pointer text-white py-2 rounded "
        >
          {loading ? "Updating" : "Update Category"}
        </button>
      </form>
    </>
  );
}
