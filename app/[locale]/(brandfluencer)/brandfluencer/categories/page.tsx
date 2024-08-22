"use client";
import { useI18n } from "@locales/client";
import CategoriesGrid from "@/components/Brandfluencer/Categories/Categories";
import Title from "@/components/Brandfluencer/Title/Title";
import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Categories = () => {
  const { data: session, status } = useSession();
  if (!session) {
    redirect("/brand/login");
  }
  const t = useI18n();

  return (
    <div className="flex flex-col justify-center gap-6 items-center">
      <Title title={t("categories")} />
      <CategoriesGrid />
    </div>
  );
};

export default Categories;
