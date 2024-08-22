import Experience from "@/components/Brandfluencer/Experiences/Experiences";
import Title from "@/components/Brandfluencer/Title/Title";
import { getI18n } from "@locales/server";
import { authOptions } from "@utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Experiences = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(" /brandfluencer/login");
  }
  
  const t = await getI18n();

  return (
    <>
      <Title title={t("experience")} />
      <Experience />
    </>
  );
};

export default Experiences;
