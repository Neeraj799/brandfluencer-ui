import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import revolu from "../../../../public/home/BannerText/english/revolu.png";
import tion from "../../../../public/home/BannerText/english/tion.png";
import { getI18n } from "@locales/server";

const Banner = async () => {
  const t = await getI18n()

  return (
    <>
      <div className="flex flex-col w-full h-full mb-96 items-center mt-52">
        <div className="w-4/6  ">
          <div className="flex flex-wrap h-36 ml-36 mb-16 z-10 items-center">
            <Image height={340} width={543} src={t('revolu')} alt="text"></Image>
            <Image
              height={180}
              width={310}
              src={t('tion')}
              alt="text"
              className="ml-2"
            ></Image>
            <Image
              height={587}
              width={560}
              style={{ right: "25rem" }}
              sizes="(max-width: 740px)"
              src="/home/girl-running.png"
              alt="girl"
              className="mr-16 -z-10 md:absolute top-14"
              loading="lazy"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <h1 className="text-4xl font-medium mb-2">
            Of <span className="line-through  text-error">Influencer</span><span className="text-accent ml-2">Brandfluencer</span> 
          </h1>
          <p className="w-96 text-slate-500 antialiased">
            {t('desc')}
          </p>
        </div>
        <Image
          height={1400}
          width={1150}
          src="/home/circle.png"
          alt="circle"
          className={styles.circle}
          loading="lazy"
        ></Image>
      </div>
    </>
  );
};

export default Banner;
