"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import getReq from "@/app/utilities/getReq";
import postReq from "@/app/utilities/postReq";
import AdminNav from "@/app/components/AdminNav";
const Page = () => {
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    async function getAdditionals() {
      try {
        let result = await getReq(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/getAdditionals`
        );
        if (result.statusCode == 200) {
          setValue("deliveryFee", result.response.data[0]?.deliveryCharges);
          setValue(
            "accountHolderName",
            result.response.data[0]?.accountHolderName
          );
          setValue("accountNumber", result.response.data[0]?.accountNumber);
          setValue("IBAN", result.response.data[0]?.IBAN);
          // setValue(
          //   "easyPaisaName",
          //   result.response.data[0].accountHolderEasyPaisa
          // );
          // setValue(
          //   "easyPaisaNumber",
          //   result.response.data[0].accountNumberEasyPaisa
          // );
          // setValue("jazzCashName", result.response.data[0].accountHolderJazzCash);
          // setValue(
          //   "jazzCashNumber",
          //   result.response.data[0].accountNumberJazzCash
          // );
          setValue(
            "perProductCharges",
            result.response.data[0]?.perProductCharges
          );
        }
      } catch (error) {
        console.log("Error in fetching additionals !");
      }
    }
    getAdditionals();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let result = await postReq(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/management/addAdditionals`,
        data
      );
      if (result.statusCode == 200) {
        setValue("deliveryFee", result.response.data[0]?.deliveryCharges);
        setValue(
          "accountHolderName",
          result.response.data[0]?.accountHolderName
        );
        setValue("accountNumber", result.response.data[0]?.accountNumber);
        setValue("IBAN", result.response.data[0]?.IBAN);
        // setValue(
        //   "easyPaisaName",
        //   result.response.data[0].accountHolderEasyPaisa
        // );
        // setValue(
        //   "easyPaisaNumber",
        //   result.response.data[0].accountNumberEasyPaisa
        // );
        // setValue("jazzCashName", result.response.data[0].accountHolderJazzCash);
        // setValue(
        //   "jazzCashNumber",
        //   result.response.data[0].accountNumberJazzCash
        // );
        setValue(
          "perProductCharges",
          result.response.data[0]?.perProductCharges
        );
      }
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      reset();
      console.log("Error in updating additionals");
    }
  };
  return (
    <>
      <AdminNav />
      <section>
        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex">
                <div className="w-full flex-col justify-center items-center gap-4 flex">
                  <h2 className="text-center text-black text-4xl font-bold font-manrope leading-normal">
                    Settings Of Delivery Charges
                  </h2>
                </div>
                <div className="w-full flex-col justify-start items-start gap-6 flex">
                  <div className="w-full flex-col justify-start items-start gap-8 flex">
                    <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                      <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                        <label className="text-black text-base font-medium leading-relaxed">
                          Delivery Fee
                        </label>
                        <input
                          type="number"
                          {...register("deliveryFee")}
                          className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                          placeholder="250"
                        />
                      </div>
                    </div>
                    {/* easypaisa */}
                    {/* <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-[#F24C28] text-base font-medium leading-relaxed">
                        Account Holder Name EasyPaisa
                      </label>
                      <input
                        type="text"
                        {...register("easyPaisaName")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="EasyPaisa Account Holder Name"
                      />
                    </div>
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-[#F24C28] text-base font-medium leading-relaxed">
                        Account Number EasyPaisa
                      </label>
                      <input
                        type="text"
                        {...register("easyPaisaNumber")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="EasyPaisa Account Number"
                      />
                    </div>
                  </div>
                  */}
                    {/* easypaisa */}
                    {/* jazzcash */}

                    {/*
                  <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-[#F24C28] text-base font-medium leading-relaxed">
                        Account Holder Name JazzCash
                      </label>
                      <input
                        type="text"
                        {...register("jazzCashName")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="JazzCash Account Holder Name"
                      />
                    </div>
                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                      <label className="text-[#F24C28] text-base font-medium leading-relaxed">
                        Account Number JazzCash
                      </label>
                      <input
                        type="text"
                        {...register("jazzCashNumber")}
                        className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                        placeholder="JazzCash Account Number"
                      />
                    </div>
                  </div> */}
                    {/* jazzcash */}
                    {/* account holder name */}
                    <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                      <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                        <label className="text-black text-base font-medium leading-relaxed">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          {...register("accountHolderName")}
                          className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                          placeholder="Account Holder Name"
                        />
                      </div>
                    </div>
                    {/* account holder name */}
                    {/* account number */}
                    <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                      <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                        <label className="text-black text-base font-medium leading-relaxed">
                          Account Number
                        </label>
                        <input
                          type="number"
                          {...register("accountNumber")}
                          className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                          placeholder="Account Number"
                        />
                      </div>
                    </div>
                    {/* account number */}
                    {/* IBAN */}
                    <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                      <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                        <label className="text-black text-base font-medium leading-relaxed">
                          IBAN
                        </label>
                        <input
                          type="text"
                          {...register("IBAN")}
                          className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                          placeholder="IBAN"
                        />
                      </div>
                    </div>
                    {/* IBAN */}
                    <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                      <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                        <label className="text-black text-base font-medium leading-relaxed">
                          Per Product Charges
                        </label>
                        <input
                          type="number"
                          {...register("perProductCharges")}
                          className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow border border-gray-200"
                          placeholder="Per Product Charges"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mx-auto sm:w-fit w-full px-9 py-3 bg-black cursor-pointer transition-all duration-700 rounded-xl shadow text-white text-lg font-semibold"
                >
                  {loading ? "Submitting" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  );
};

export default Page;
