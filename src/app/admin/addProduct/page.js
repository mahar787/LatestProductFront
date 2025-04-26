"use client";
import AdminNav from "@/app/components/AdminNav";
import Alert from "@/app/components/Alert.js";
import getReq from "@/app/utilities/getReq";
import postReq from "@/app/utilities/postReq";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

export default function AddProduct() {
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
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  async function getCategories() {
    try {
      let result = await getReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getCategories`
      );
      if (result.statusCode == 200) {
        setCollections(result.response.data);
      }
    } catch (error) {
      console.log("Error in fetching categories", error);
    }
  }
  useEffect(() => {
    getCategories();
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

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    if (!data.files) {
      window.alert("Please Select At Least One Image");
      return;
    }
    if (data.files.length) {
      Array.from(data.files).forEach((file) => formData.append("files", file));
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/addProduct`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await res.json();
      reset();
      window.alert(responseData.message);
      setApiResponse(responseData.message);
      setPreviewImages([]);
    } catch {
      setApiResponse("Error in uploading product!");
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
      <main className="min-h-screen flex justify-center items-center p-6">
        <Alert message={apiResponse} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-gray-900 text-white max-w-xl w-full rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>
          {/* File Upload */}
          <span className="text-sm text-yellow-500 font-bold">
            Maximum 10 Mb File Allowed
          </span>
          <div className="">
            <label className="text-sm font-medium">
              Upload Images Click Here
            </label>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              className="input-field border p-2 cursor-pointer"
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
          <div className="my-2">
            <label>Product Name</label>
            <input
              type="text"
              className="border-2 border-white p-2 w-full "
              placeholder="Product Name"
              {...register("productName", {
                required: "Please Enter The Product Name!",
              })}
            />
          </div>
          {errors.productName && (
            <span className="text-red-600 font-bold">
              {errors.productName.message}
            </span>
          )}

          <div className="my-2">
            <label>Brand Name</label>
            <input
              type="text"
              className="border-2 border-white p-2 w-full "
              placeholder="Brand Name"
              {...register("brandName", {
                required: "Please Enter The Brand Name!",
              })}
            />
          </div>
          {errors.brandName && (
            <span className="text-red-600 font-bold">
              {errors.brandName.message}
            </span>
          )}
          <div className="my-2">
            <label>Original Price</label>
            <input
              type="number"
              className="border-2 border-white p-2 w-full "
              placeholder="Original Price"
              {...register("originalPrice")}
            />
          </div>

          <div className="my-2">
            <label>Discounted Price</label>
            <input
              type="number"
              className="border-2 border-white p-2 w-full "
              placeholder="Discounted Price"
              {...register("discountedPrice", {
                required: "Please Enter The Brand Name!",
              })}
            />
          </div>
          {errors.discountedPrice && (
            <span className="text-red-600 font-bold">
              {errors.discountedPrice.message}
            </span>
          )}
          <div className="my-2">
            <label>Stock</label>
            <input
              type="number"
              className="border-2 border-white p-2 w-full "
              placeholder="Stock"
              {...register("stock", {
                required: "Please Enter The Stock Name!",
              })}
            />
          </div>
          {errors.stock && (
            <span className="text-red-600 font-bold">
              {errors.stock.message}
            </span>
          )}
          <div className="my-2">
            <label>Colors (Enter Comma Seperated Values)</label>
            <input
              type="text"
              className="border-2 border-white p-2 w-full "
              placeholder="Colors"
              {...register("colors", {})}
            />
          </div>
          {errors.colors && (
            <span className="text-red-600 font-bold">
              {errors.colors.message}
            </span>
          )}
          <div className="my-2">
            <label>Sizes (Enter Comma Seperated Values)</label>
            <input
              type="text"
              className="border-2 border-white p-2 w-full "
              placeholder="Sizes"
              {...register("sizes")}
            />
          </div>
          {errors.sizes && (
            <span className="text-red-600 font-bold">
              {errors.sizes.message}
            </span>
          )}
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

          {/* Collection Dropdown */}
          <select
            {...register("category", {
              required: "Please select a collection",
            })}
            className="p-2 w-full bg-gray-800 border border-gray-700"
          >
            <option value="">Select Category</option>
            {Array.isArray(collections) &&
              collections?.map(({ _id, name }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
          <select
            {...register("sizeType", {
              required: "Please select a size",
            })}
            className="p-2 w-full bg-gray-800 border border-gray-700"
          >
            <option value="">Select Size For Delivery</option>

            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
          {errors.sizeType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.sizeType.message}
            </p>
          )}

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
