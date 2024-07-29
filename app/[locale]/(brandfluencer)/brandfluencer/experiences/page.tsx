import Experience from "@/components/Brandfluencer/Experiences/Experiences";
import Title from "@/components/Brandfluencer/Title/Title";
import { authOptions } from "@utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Experiences = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(" /brandfluencer/login");
  }

  return (
    <>
      <Title title={"Experiences"} />
      <Experience />
    </>
  );
};

export default Experiences;
