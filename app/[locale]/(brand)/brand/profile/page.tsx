"use client"

import Profile from "@/components/Profile/Profile";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  if(!session){
    redirect(" /brand/login");
  }

  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
