import Image from "next/image";
import React from "react";

const ExperienceHero = () => {
  return (
    <>
   
      <div className="hero mt-2 mb-28 cursor-auto">
        <div className="hero-content drop-shadow-xl flex-col lg:flex-row">
          <img
            src="https://themakeoverz.com/images/gallery/gallery1481715089_66.jpg"
            alt="image"
            loading="lazy"
            className="max-w-xs h-fit rounded-lg drop-shadow-2xl"
          />
          <div className="drop-shadow-xl ml-4 rounded-xl bg-base-100 p-16">
            <span>
              <p className="text-2xl font-bold">Spa for 2 Persons </p>{" "}
              <p className="py-6 italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                perferendis, adipisci error aliquid quis quae provident et
                facere necessitatibus laudantium a aliquam molestiae nemo quas
                cumque ea praesentium magnam inventore!
              </p>
            </span>
            <div className="space-x-5">
              <button className="btn btn-accent text-white btn-sm">view</button>
              <button className="btn btn-accent text-white btn-sm">Edit</button>
              <button className="btn btn-accent text-white btn-sm">
                Duplicate
              </button>
              <button className="btn btn-accent text-white btn-sm">
                Archive
              </button>
              <button className="btn btn-error text-white btn-sm">End</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceHero;
