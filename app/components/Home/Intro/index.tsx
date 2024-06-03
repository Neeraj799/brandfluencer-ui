import { getI18n } from "@locales/server";
import React from "react";

const Intro = async () => {
  const t = await getI18n();
  return (
    <>
      <h1 className="text-center text-4xl mt-32 text-accent font-extrabold">
        {t("whatis")}
      </h1>
      <h1 className="text-center text-4xl mt-4 text-error font-bold">|</h1>
      <div className="w-full mb-36 flex justify-center ">
        <div
          className="border-2 h-96 border-error rounded-md mt-10"
          style={{ padding: "15.25% 5% 3% 10%", position: "relative" }}
        >
          <iframe
            src="https://player.vimeo.com/video/721092324?h=e34193a83c&autoplay=1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allow="fullscreen;"
            allowFullScreen
          ></iframe>
          <script src="https://player.vimeo.com/api/player.js"></script>
          <p>
            <a href="https://vimeo.com/721092324">Brandfluencer Bulgaria</a>{" "}
            from <a href="https://vimeo.com/brandfluencer">Brandfluencer</a> on{" "}
            <a href="https://vimeo.com">Vimeo</a>.
          </p>
        </div>
      </div>
     
    </>
  );
};

export default Intro;
