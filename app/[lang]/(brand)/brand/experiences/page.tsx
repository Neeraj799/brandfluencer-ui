import ExperienceHero from "@/components/Brand/ExperienceHero.tsx/ExperienceHero";
import FloatButton from "@/components/Brand/FloatButton/FloatButton";
import Title from "@/components/Brand/Title/Title";
import React from "react";

const Experiences = () => {
  return (
    <>
      <Title />
      <div className="text-3xl mt-28 underline mb-8 text-center font-bold tracking-wider antialiased text-accent ">
        ACTIVE EXPERIENCES
      </div>
      <ExperienceHero />
      <div className="text-3xl mt-28 underline mb-8 text-center font-bold tracking-wider antialiased text-neutral-content ">
        PENDING EXPERIENCES
      </div>
      <ExperienceHero />
      <div className="text-3xl mt-28 underline mb-8 text-center font-bold tracking-wider antialiased text-error ">
        INACTIVE/CLOSED EXPERIENCES
      </div>
      <ExperienceHero />
      <FloatButton />
      
    </>
  );
};

export default Experiences;
