import Image from "next/image";
import React from "react";

const SocialMedia = () => {
  return (
    <>
      <h1 className="text-center text-4xl mt-20 text-error font-extrabold antialiased">
        CONNECT WITH US
      </h1>
      <div className="flex mb-36 flex-wrap w-full justify-center gap-8 mt-8 items-center">
        <Image
          src="/icons/instagram.svg"
          height={150}
          width={100}
          alt="Email Icon"
          className="transition-transform duration-500 hover:-translate-y-4"
        />
        <Image
          src="/icons/facebook.svg"
          height={150}
          width={100}
          alt="Email Icon"
          className="transition-transform duration-500 hover:-translate-y-4"

        />
        <Image
          src="/icons/tiktok.svg"
          height={150}
          width={100}
          alt="Email Icon"
          className="transition-transform duration-500 hover:-translate-y-4"

        />
        <Image
          src="/icons/youtube.svg"
          height={150}
          width={100}
          alt="Email Icon"
          className="transition-transform duration-500 hover:-translate-y-4"

        />
        <Image
          src="/icons/snapchat.svg"
          height={150}
          width={100}
          alt="Email Icon"
          className="transition-transform duration-500 hover:-translate-y-4"

        />
      </div>
    </>
  );
};

export default SocialMedia;
