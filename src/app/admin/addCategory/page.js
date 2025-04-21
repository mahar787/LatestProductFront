"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import Alert from "../../components/Alert.js";
import getReq from "@/app/utilities/getReq.js";
import AdminNav from "@/app/components/AdminNav.js";
import postReq from "@/app/utilities/postReq.js";
import { useRouter } from "next/navigation.js";

const Page = () => {
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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [categories, setCategories] = useState([]);
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
    getParentCategories();
  }, []);
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("parentCategory", data.parentCategory);
    formData.append("file", data.file[0]);
    console.log("aa", data);
    console.log(formData);
    if (!data.file || data.file.length === 0) {
      setApiResponse("Please upload an image or PDF.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addCategory`,
        {
          method: "POST",
          body: formData, // ✅ FormData is now correctly formatted
        }
      );
      const responseData = await res.json();
      setApiResponse(responseData.message);
      setLoading(false);
      reset();
      setFilePreview(null);
    } catch (err) {
      setLoading(false);
      console.log("Error in adding category", err);
      setApiResponse("Error in uploading file!");
    }
  };

  return (
    <>
      <AdminNav />
      <main className="h-screen flex justify-center items-center">
        <Alert message={apiResponse} />
        <div className="p-6 bg-black text-white max-w-lg mx-auto rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add Category</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <input
              type="text"
              placeholder="Category Name"
              {...register("name", { required: "Enter Category Name" })}
              className="w-full p-2 rounded bg-gray-900 border border-gray-700"
            />
            {errors.name && (
              <span className="text-red-600 font-bold">
                {errors.name.message}
              </span>
            )}
            {/* Image Upload */}
            <input
              type="file"
              accept="image/*,application/pdf"
              {...register("file", { required: true })}
              className="w-full p-2 rounded bg-gray-900 border border-gray-700"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.type === "application/pdf") {
                  setFilePreview("/pdf-preview-icon.png"); // ✅ Static preview
                } else if (file.type.startsWith("image/")) {
                  setFilePreview(URL.createObjectURL(file)); // ✅ Show actual image preview
                } else {
                  setFilePreview(null);
                }
              }}
            />
            {filePreview && (
              <img
                src={filePreview}
                alt="Preview"
                className="mt-2 w-full h-32 object-cover rounded"
              />
            )}

            <div className="bg-gray-800 p-2 flex gap-3 items-center">
              <label>Select Parent Category</label>
              <select
                className="border text-black bg-white p-1"
                onChange={(e) => {
                  setValue("parentCategory", e.target.value || null);
                }}
                {...register("parentCategory")}
              >
                <option value={null}>Select Category</option>
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
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 cursor-pointer bg-white text-black rounded font-semibold"
            >
              {loading ? "Submitting" : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Page;
