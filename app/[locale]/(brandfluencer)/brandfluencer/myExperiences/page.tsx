import MyExperiencesTable from "@/components/Brandfluencer/MyExperiencesTable/MyExperiencesTable";
import Title from "@/components/Brandfluencer/Title/Title";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@utils/authOptions";
import { getI18n } from "@locales/server";

const MyExperiences = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(" /brandfluencer/login");
  }
  const t = await getI18n();
  return (
    <>
    <Title title={t("myExperiences")} />
      <MyExperiencesTable />
    </>
  );
};

export default MyExperiences;
