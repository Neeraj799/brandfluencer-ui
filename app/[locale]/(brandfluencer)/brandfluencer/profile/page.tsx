"use client"
import Loading from "@/[locale]/loading";
import Profile from "@/components/Profile/Profile";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (!session && status !== "loading") {
    redirect(" /brand/login");
  }
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
