import Profile from "@/components/Profile/Profile";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = () => {

  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
