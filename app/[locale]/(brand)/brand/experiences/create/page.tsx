"use client";

import ConfirmStep from "@/components/Brand/Forms/ConfirmStep/ConfirmStep";
import FirstStep from "@/components/Brand/Forms/FirstStep/FirstStep";
import SecondStep from "@/components/Brand/Forms/SecondStep/SecondStep";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { data: session, status } = useSession();

  if(!session){
    redirect(" /brand/login");
  }
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  let StepComponent;

  switch (currentStep) {
    case 1:
      StepComponent = (
        <>
          <ul className="steps mb-20 mt-16">
            <li className="step step-accent ">Step 1</li>
            <li className="step ">Step 2</li>
            <li className="step " data-content="3">
              Step 3
            </li>
          </ul>
          <FirstStep onNextStep={handleNextStep} />;
        </>
      );
      break;
    case 2:
      StepComponent = (
        <>
          <ul className="steps mb-20 mt-16">
            <li className="step step-accent ">Step 1</li>
            <li className="step step-accent">Step 2</li>
            <li className="step " data-content="3">
              Step 3
            </li>
          </ul>
          <SecondStep onNextStep={handleNextStep} onPreviousStep={handlePreviousStep}/>;
        </>
      );
      break;
    case 3:
      StepComponent = (
        <>
          <ul className="steps mb-20 mt-16">
            <li className="step step-accent ">Step 1</li>
            <li className="step step-accent">Step 2</li>
            <li className="step step-accent" data-content="3">
              Step 3
            </li>
          </ul>
          <ConfirmStep onPreviousStep={handlePreviousStep}/>;
        </>
      );
      break;
  }

  return <div className="flex justify-center flex-col">{StepComponent}</div>;
};

export default page;
