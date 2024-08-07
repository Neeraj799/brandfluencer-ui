"use client"
import RequestTable from "@/components/Brand/RequestTable/RequestTable";
import Title from "@/components/Brand/Title/Title";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Requests = () => {
  const { data: session, status } = useSession();
  if(!session){
    redirect(" /brand/login");
  }
  return (
    <>
      <Title Title={"MY REQUESTS"} />
      <RequestTable />
    </>
  );
};

export default Requests;
