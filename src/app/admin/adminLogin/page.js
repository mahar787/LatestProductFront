"use client";

import postReq from "@/app/utilities/postReq";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@/app/components/Alert";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/login`,
        data
      );
      setLoading(false);
      if (result.response.allowLogin) {
        localStorage.setItem("azsxdc", result.response.token);
        router.push("/admin");
      } else {
        setApiResponse(result.response.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("error in login", error);
    }
  };
  return (
    <>
      <Alert message={apiResponse} />
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              {loading ? "Loading" : "Sign In"}
            </button>
          </form>
          {/* <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-black font-medium">
            Register
          </a>
        </p> */}
        </div>
      </div>
    </>
  );
}
