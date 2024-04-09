import FirstStep from "@/components/Brand/Forms/FirstStep/FirstStep";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center flex-col">
      <ul className="steps mb-20 mt-16">
        <li className="step step-accent">Step 1</li>
        <li className="step ">Step 2</li>
        <li className="step " data-content="3">
          Step 3
        </li>
      </ul>
      <FirstStep />
    </div>
  );
};

export default page;
