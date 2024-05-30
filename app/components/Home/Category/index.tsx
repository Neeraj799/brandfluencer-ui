import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <>
      <div className="w-svw flex justify-center mb-36 flex-col">
        <h1 className="text-center font-bold uppercase mb-32 text-5xl">
          <span className="text-accent">Choose your</span>{" "}
          <span className="text-error">Category</span>
        </h1>
        <div className="grid md:grid-cols-2">
          <div className="bg-accent flex pe-6 justify-end">
            <Link href={" brand/login"}>
              <Image
                width={300}
                height={447}
                src="/home/Hero/brands.png"
                alt="brands"
                className="relative transition-transform duration-500 -top-16 hover:-translate-y-6 "
              />
            </Link>
          </div>
          <div className="bg-error pl-4">
            <Link href={" /brandfluencer/login"}>
              <Image
                width={450}
                height={350}
                src="/home/Hero/brandfluencer.png"
                alt="brands"
                className="relative -top-16 transition-transform duration-500  hover:-translate-y-6 "
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
