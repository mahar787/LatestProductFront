"use client";
import AdminNav from "@/app/components/AdminNav";
import Alert from "@/app/components/Alert";
import getReq from "@/app/utilities/getReq";
import postReq from "@/app/utilities/postReq";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

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
  let { productId } = useParams();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [product, setProduct] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  useEffect(() => {
    if (product?.product?.images) {
      setExistingImages(product.product.images.map((img) => img.url));
    }
  }, [product]);

  async function getAllCollections() {
    try {
      let result = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getCategories`
      );
      setCollections(result.response.data);
    } catch (error) {
      console.log("Error in fetching all collections", error);
    }
  }
  async function getProductDetails() {
    let result = await postReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getSpecificProduct`,
      { productId }
    );
    setProduct(result.response);
    console.log(result.response);
  }
  useEffect(() => {
    getAllCollections();
    getProductDetails();
  }, []);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      descriptionPoints: [""],
    },
  });
  useEffect(() => {
    setValue("name", product.product?.productName);
    setValue("discountedPrice", product.product?.discountedPrice);
    setValue("originalPrice", product.product?.originalPrice);
    setValue("stock", product.product?.stock);
    setValue("brandName", product.product?.brandName);

    setValue(
      "sizes",
      product.product?.sizes.map((size) => size)
    );
    setValue(
      "colors",
      product.product?.colors.map((color) => color)
    );
    setValue("descriptionPoints", product.product?.descriptionPoints);
  }, [product, setValue]);
  const onSubmit = async (data) => {
    setLoading(true);
    setApiResponse("");

    try {
      // setLoading(true);
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("name", data.name);
      formData.append("brandName", data.brandName);
      formData.append("discountedPrice", data.discountedPrice);
      formData.append("originalPrice", data.originalPrice);
      formData.append("stock", data.stock);
      formData.append("allowBackOrders", data.allowBackOrders);
      formData.append("showStockToUser", data.showStockToUser);
      formData.append("sizeType", data.sizeType);
      formData.append("sizes", data.sizes);
      formData.append("colors", data.colors);
      formData.append(
        "descriptionPoints",
        JSON.stringify(data.descriptionPoints)
      );

      formData.append("parentCollection", data.parentCollection);

      // Append images user wants to keep
      formData.append("existingImages", JSON.stringify(existingImages));
      console.log("dd form", data);
      // Append new image files
      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("files", file);
        });
      }

      // Send request
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/updateProduct`,
        {
          method: "POST",
          body: formData,
        }
      );

      let result = await response.json();

      setApiResponse(result.message);
      setLoading(false);
      getProductDetails();
    } catch (error) {
      console.error("Error updating product:", error);
      setApiResponse("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("files", files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };
  return (
    <>
      <AdminNav />
      <main className="min-h-screen flex-col w-screen  items-center p-6">
        <Alert message={apiResponse} />
        <div className="flex gap-3 my-3 flex-wrap">
          {existingImages.map((imageUrl) => (
            <div key={imageUrl} className="relative">
              <img
                src={imageUrl}
                className="h-[10vh] sm:h-[15vh] md:h-[25vh] w-auto"
              />
              <button
                onClick={() =>
                  setExistingImages(
                    existingImages.filter((img) => img !== imageUrl)
                  )
                }
                className="absolute cursor-pointer top-1 right-1 bg-red-600 text-white p-1 rounded"
              >
                ✖
              </button>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-black text-white max-w-lg w-full  shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>

          <InputField
            label="Product Name"
            name="name"
            register={register}
            errors={errors}
            required
          />
          <InputField
            label="Brand Name"
            name="brandName"
            register={register}
            errors={errors}
            required
          />
          <div className="my-2">
            <label>Original Price</label>
            <input
              type="number"
              className="bg-gray-800 border border-gray-700 p-2 w-full "
              placeholder="Original Price"
              {...register("originalPrice")}
            />
          </div>

          <InputField
            label="Discounted Price"
            name="discountedPrice"
            register={register}
            errors={errors}
            required
            type="number"
          />
          <InputField
            label="Stock"
            name="stock"
            register={register}
            errors={errors}
            required
            type="number"
          />
          {/* <InputField
          label="Sizes (Comma Separated)"
          name="sizes"
          register={register}
          errors={errors}
          required
        /> */}
          <div className="my-2">
            <label>Sizes (Enter Comma Seperated Values)</label>
            <input
              type="text"
              className="bg-gray-800 border border-gray-700 p-2 w-full "
              placeholder="Sizes"
              {...register("sizes")}
            />
          </div>
          <div className="my-2">
            <label>Colors (Enter Comma Seperated Values)</label>
            <input
              type="text"
              className="bg-gray-800 border border-gray-700 p-2 w-full "
              placeholder="Colors"
              {...register("colors", {})}
            />
          </div>
          {/* <InputField
          label="Colors (Comma Separated)"
          name="colors"
          register={register}
          errors={errors}
          required
        /> */}
          <div className="flex gap-3 my-2">
            <label>Allow Back Orders</label>
            <div className="flex gap-2">
              <label>Yes</label>
              <input
                type="radio"
                {...register("allowBackOrders")}
                value={true}
              />
            </div>
            <div className="flex gap-2">
              <label>No</label>
              <input
                type="radio"
                {...register("allowBackOrders")}
                defaultChecked
                value={false}
              />
            </div>
          </div>
          <div className="flex gap-3 my-2">
            <label>Show Stock To User</label>
            <div className="flex gap-2">
              <label>Yes</label>
              <input
                type="radio"
                value={true}
                {...register("showStockToUser")}
              />
            </div>
            <div className="flex gap-2">
              <label>No</label>
              <input
                type="radio"
                {...register("showStockToUser")}
                defaultChecked
                value={false}
              />
            </div>
          </div>
          <select
            {...register("sizeType", {
              required: "Please select a size",
            })}
            className="p-2 w-full bg-gray-800 border border-gray-700"
          >
            <option value="">Select Size</option>

            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
          {errors.sizeType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.sizeType.message}
            </p>
          )}

          {/* Collection Dropdown */}
          <select
            {...register("parentCollection", {
              required: "Please select a collection",
            })}
            className="p-2 w-full bg-gray-800 border border-gray-700"
          >
            <option value={product.collection?._id}>
              {product.collection?.name}
            </option>
            {collections.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </select>
          {errors.parentCollection && (
            <p className="text-red-500 text-xs mt-1">
              {errors.parentCollection.message}
            </p>
          )}

          {/* File Upload */}
          <div className="">
            <label className="text-sm font-medium">
              Upload Images Click Here
            </label>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              className="input-field border"
              onChange={handleFileChange}
            />
            {previewImages.length > 0 &&
              previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="w-full h-32 object-cover rounded mt-2"
                />
              ))}
          </div>

          {/* Multi-Point Sections */}
          <MultiPointSection
            title="Product Description"
            name="descriptionPoints"
            control={control}
            setValue={setValue}
            watch={watch}
          />

          <button
            type="submit"
            className="w-full p-2 cursor-pointer bg-white text-black rounded font-semibold mt-4"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </>
  );
};

// ✅ Reusable Input Field Component
function InputField({
  label,
  name,
  register,
  errors,
  required,
  type = "text",
  pattern,
}) {
  return (
    <div className="mb-3">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        {...register(name, {
          required: required && `${label} is required`,
          pattern,
        })}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
}

// ✅ Multi-Point Input Component
function MultiPointSection({ title, name, control, setValue, watch }) {
  const points = watch(name) || [];

  return (
    <div className="bg-gray-800 p-3 rounded mt-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {points.map((point, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <Controller
            control={control}
            name={`${name}[${index}]`}
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            )}
          />
          <button
            type="button"
            onClick={() =>
              setValue(
                name,
                points.filter((_, i) => i !== index)
              )
            }
            className="p-2 bg-red-600 text-white rounded"
          >
            ✖
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setValue(name, [...points, ""])}
        className="mt-2 p-2 bg-green-600 text-white rounded"
      >
        + Add Point
      </button>
    </div>
  );
}

export default Page;
