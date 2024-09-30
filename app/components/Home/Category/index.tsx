import { getI18n } from "@locales/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = async () => {
  const t = await getI18n();
  return (
    <>
      <div className="w-svw flex justify-center mb-30 flex-col">
        <h1 className="text-center font-bold uppercase mb-24 text-3xl lg:text-5xl">
          <span className="text-accent">{t("chooseYour")}</span>{" "}
          <span className="text-error">{t("category")}</span>
        </h1>
        <div className="grid md:grid-cols-2">
          <div className="bg-accent flex pe-6 justify-center">
            <Link href={" brand/login"}>
              <Image
                width={300}
                height={447}
                src={t("brandImg")}
                alt="brands"
                className="relative transition-transform duration-500 -top-16 hover:-translate-y-6 lg:w-[300px] lg:h-[380px] md:w-[280px] md:h-[350px]"
              />
            </Link>
          </div>
          <div className="bg-error pl-4 flex justify-center">
            <Link href={" /brandfluencer/login"}>
              <Image
                width={450}
                height={350}
                src={t("brandfluencerImg")}
                alt="brands"
                className="relative -top-16 transition-transform duration-500 hover:-translate-y-6 lg:w-[450px] lg:h-[370px] md:w-[370px] md:h-[350px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
