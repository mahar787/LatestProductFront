import Image from "next/image";
import spinner from "../../public/spinner.gif";
import React from "react";
const Loading = () => {
  return (
    <div
      className="w-[100vw] min-h-[100vh] flex justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,.3)" }}
    >
      <Image src={spinner} width={100} height={100} alt="spinner" />
    </div>
  );
};

export default Loading;
