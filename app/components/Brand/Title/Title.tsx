import React from "react";

const Title = ({Title}) => {
  return (
    <div className="flex mt-6 justify-center items-center w-screen p-5">
      <div className=" p-5 rounded-xl shadow-lg shadow-red-500">
        <div className="flex items-end gap-1">
          <span className="text-5xl font-bold antialiased tracking-widest drop-shadow-2xl text-error">
            {Title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Title;
