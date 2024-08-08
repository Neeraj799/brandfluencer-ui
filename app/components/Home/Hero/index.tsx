import { getI18n } from "@locales/server";
import React from "react";

const Hero = async () => {
  const t = await getI18n();
  return (
    <div
      id="ourStory"
      className="hero mt-20 mb-36 overflow-clip"
      style={{ backgroundImage: "url(/home/influencersBanner.png)" }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-accent antialiased text-4xl font-bold pt-5">
            {t("our story")}
          </h1>
          <p className="mb-5 antialiased font-medium text-md ">{t("story")}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
