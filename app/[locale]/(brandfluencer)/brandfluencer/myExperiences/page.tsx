"use client";

import MyExperiencesTable from "@/components/Brandfluencer/MyExperiencesTable/MyExperiencesTable";
import Title from "@/components/Brandfluencer/Title/Title";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const MyExperiences = () => {
  const { data: session, status } = useSession();
  if(!session){
      redirect("/en/brandfluencer/login");
    }
  return (
    <>
    <Title title={"My Experiences"} />
      <MyExperiencesTable />
    </>
  );
};

export default MyExperiences;
