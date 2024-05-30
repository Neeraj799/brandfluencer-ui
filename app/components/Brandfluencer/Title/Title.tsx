import React from "react";

const Title = ({title}:any) => {
  return (
    <div className="flex m-4 justify-center items-center w-screen p-5">
      <div className=" p-5 rounded-xl shadow-lg shadow-accent">
        <div className="flex items-end gap-1">
          <span className="text-4xl uppercase font-bold antialiased tracking-widest drop-shadow-2xl text-accent">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Title;
