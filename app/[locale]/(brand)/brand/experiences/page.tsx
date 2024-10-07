"use client";
import ExperienceHero from "@/components/Brand/ExperienceHero/ExperienceHero";
import FloatButton from "@/components/Brand/FloatButton/FloatButton";
import Title from "@/components/Brand/Title/Title";
import { useI18n } from "@locales/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [approvedExperiences, setApprovedExperiences] = useState([]);
  const [pendingExperiences, setPendingExperiences] = useState([]);
  const [closedExperiences, setClosedExperiences] = useState([]);
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const t = useI18n();

  useEffect(() => {
    try {
      if (session && session.user && session.token) {
        setToken(session.token);
      }
    } catch (error) {
      console.error(error);
    }
  }, [session]);

  if (!session) {
    redirect(" /brand/login");
  }

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const headers: any = {
          "Content-Type": "application/json",
          authorization: `${token}`,
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/brand/experience/list`,
          {
            headers: headers,
          }
        );
        const data = await res.json();
        console.log(data);

        setExperiences(data?.experiences);
        setApprovedExperiences(
          data?.experiences.filter(
            (e: any) => e.experienceStatus === "Approved"
          )
        );
        setPendingExperiences(
          data?.experiences.filter((e: any) => e.experienceStatus === "Pending")
        );
        setClosedExperiences(
          data?.experiences.filter((e: any) => e.experienceStatus === "Closed")
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [token, refresh]);
  return (
    <>
      <Title Title={t("myExperiences")} />
      {experiences?.length > 0 ? (
        <>
          {approvedExperiences.length > 0 && (
            <div className="mr-4">
              <div className="sm:text-xl md:text-2xl lg:text-3xl mt-20 underline mb-8 text-center font-bold tracking-wider antialiased text-accent ">
                ACTIVE EXPERIENCES
              </div>
              <ExperienceHero
                setRefresh={setRefresh}
                refresh={refresh}
                token={token}
                experiences={approvedExperiences}
              />
            </div>
          )}
          {pendingExperiences.length > 0 && (
            <div>
              <div className="sm:text-xl md:text-2xl lg:text-3xl mt-28 underline mb-8 text-center font-bold tracking-wider antialiased text-neutral-content ">
                PENDING EXPERIENCES
              </div>
              <ExperienceHero
                token={token}
                setRefresh={setRefresh}
                refresh={refresh}
                experiences={pendingExperiences}
              />
            </div>
          )}
          {closedExperiences.length > 0 && (
            <div>
              <div className="sm:text-xl md:text-2xl lg:text-3xl mt-28 underline mb-8 text-center font-bold tracking-wider antialiased text-error ">
                INACTIVE/CLOSED EXPERIENCES
              </div>
              <ExperienceHero
                setRefresh={setRefresh}
                refresh={refresh}
                experiences={closedExperiences}
              />
            </div>
          )}
        </>
      ) : (
        <div className="sm:text-xl md:text-2xl lg:text-3xl mt-28 mb-8 text-center font-bold tracking-wider antialiased text-accent ">
          NO EXPERIENCES
        </div>
      )}
      <FloatButton />
    </>
  );
};

export default Experiences;
