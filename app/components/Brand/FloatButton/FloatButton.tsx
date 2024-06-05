"use client";
import Link from "next/link";
import React from "react";

const FloatButton = () => {
  return (
    <div className="fixed flex w-32 flex-wrap justify-center shadow-2xl shadow-red-600 items-center bg-error h-32 cursor-pointer transition-transform duration-500 hover:-translate-y-6 rounded-full bottom-4 right-4">
      <Link href={" /brand/experiences/create"}>
        <button className="btn-md text-md text-white font-extrabold tracking-wider sha">
          CREATE EXPERIENCE
        </button>
      </Link>
    </div>
  );
};

export default FloatButton;
