import React from "react";

const Title = ({ Title }: any) => {
  return (
    <div className="flex mt-6 justify-center items-center w-full">
      <div
        className="flex justify-center items-center bg-[url('/title.svg')] bg-no-repeat bg-center h-40 lg:h-60 w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
        style={{ backgroundSize: "70%" }}
      >
        <span
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold antialiased tracking-wider drop-shadow-2xl text-white"
          style={{ textShadow: "4px 4px #20afaf5a" }}
        >
          {Title}
        </span>
      </div>
    </div>
  );
};

export default Title;
