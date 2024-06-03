import { getI18n } from "@locales/server";
import Image from "next/image";
import React from "react";

const NewBanner = async () => {
  const t = await getI18n();

  return (
    <div>
      <section>
        <div className="text-white py-14 md:py-20 mb-2 md:mb-40">
          <div className="container mx-auto flex flex-col md:flex-row items-center  md:my-24">
            <div className="flex flex-col w-full lg:w-1/3 order-2 md:order-1 justify-center items-start p-8">
              <div className="flex flex-wrap flex-col h-24 md:h-32 z-10 items-center justify-center">
                <img
                  className="h-20 sm:h-24 md:h-32 lg:h-32 xl:h-40 animate-in slide-in-from-left-72 delay-800 duration-700"
                  src={t("revolu")}
                  alt="text"
                ></img>
                <span className="h-32 sm:h-24 md:h-32 lg:h-36 xl:h-48 flex items-center justify-center animate-in slide-in-from-right-72 delay-800 duration-700">
                  <p className="text-7xl ml-1 sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-semibold bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
                    {t("tion")}
                  </p>
                </span>
              </div>
              <div className="flex flex-col md:mt-4 w-full sm:w-1/2 flex-wrap">
                <span className="text-2xl text-wrap sm:text-3xl md:text-4xl font-medium mb-2">
                  <div className="flex flex-row flex-wrap md:flex-nowrap">
                    <span className="text-gray-400">Of</span>
                    <span className="line-through text-error ml-2">
                      {t("infleuncers")}
                    </span>
                    <span
                      className="text-accent ml-2"
                      style={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {t("brandfluencers")}
                    </span>
                  </div>
                </span>
                <p className="w-full sm:w-3/4 md:w-96 text-slate-500 antialiased">
                  {t("desc")}
                </p>
              </div>
            </div>
            <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 order-1 md:order-2 md:ml-96 lg:w-2/3  justify-center">
              <div className="h-48 flex flex-wrap content-center">
                {/* <div>
                  <img
                    className="inline-block mt-28 hidden xl:block"
                    src="https://user-images.githubusercontent.com/54521023/116969935-c13d5b00-acd4-11eb-82b1-5ad2ff10fb76.png"
                    alt="Image 1"
                  />
                </div> */}
                <div>
                  <img
                    className="inline-block md:ml-8 md:mt-0 p-8 md:p-0 "
                    src="/home/homeGirl.png"
                    alt="Image 2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewBanner;
