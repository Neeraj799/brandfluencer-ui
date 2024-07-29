import MyExperiencesTable from "@/components/Brandfluencer/MyExperiencesTable/MyExperiencesTable";
import Title from "@/components/Brandfluencer/Title/Title";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@utils/authOptions";

const MyExperiences = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(" /brandfluencer/login");
  }
  return (
    <>
    <Title title={"My Experiences"} />
      <MyExperiencesTable />
    </>
  );
};

export default MyExperiences;
