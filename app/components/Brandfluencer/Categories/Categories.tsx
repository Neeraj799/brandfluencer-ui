"use client";
import Link from "next/link";
import React, { useState } from "react";
import { categories } from "./Utils";

const CategoriesGrid = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-16 cursor-pointer gap-14">
        {categories.map((val, i) => (
          <Link key={i} href={val.link}>
            <div key={i} className="card w-80 h-52 bg-base-300 shadow-xl image-full">
              <figure>
                <img src={val.image} alt="Shoes" className="w-full h-full object-fill"/>
              </figure>
              <div className="card-body justify-center items-center">
                <h2 className="card-title uppercase text-3xl font-bold antialiased tracking-widest [text-shadow:_0_4px_0_rgb(1_1_0_/_90%)]">
                  {val.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
