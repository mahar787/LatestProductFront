import React from "react";
import g404 from "../../public/g404.gif";
import Image from "next/image";
import Link from "next/link";
const Notfound = () => {
  return (
    <>
      <main className="sm:hidden md:flex flex justify-center items-center w-[100vw] h-[100vh]">
        <Link href={"/"}>
          <Image src={g404} height={1000} width={1000} alt="404 not found" />
        </Link>
      </main>
    </>
  );
};

export default Notfound;
