"use client";
import ExperienceHero from "@/components/Brand/ExperienceHero/ExperienceHero";
import FloatButton from "@/components/Brand/FloatButton/FloatButton";
import Title from "@/components/Brand/Title/Title";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Experiences = () => {
  const [experiences, setExperiences] = useState([] || null);
  const [approvedExperiences, setApprovedExperiences] = useState([]);
  const [pendingExperiences, setPendingExperiences] = useState([]);
  const [closedExperiences, setClosedExperiences] = useState([]);
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (session && session.user && session.token) {
        setToken(session.token);
      }
    } catch (error) {
      console.error(error);
    }
  }, [session]);

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
        setExperiences(data?.experiences);
        setApprovedExperiences(data?.experiences.filter((e: any) => e.status === 'Approved'));
        setPendingExperiences(data?.experiences.filter((e: any) => e.status === 'Pending'));
        setClosedExperiences(data?.experiences.filter((e: any) => e.status === 'Closed'));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [token]);
  return (
    <>
      <Title Title={"MY EXPERIENCES"}/>
      {experiences?.length > 0 ? (
        <>
          <div className="text-3xl mt-28 underline mb-8 text-center font-bold tracking-wider antialiased text-accent ">
            ACTIVE EXPERIENCES
          </div>
          <ExperienceHero experiences={approvedExperiences} />
          <div className="text-3xl mt-28 underline mb-8 text-center font-bold tracking-wider antialiased text-neutral-content ">
            PENDING EXPERIENCES
          </div>
          <ExperienceHero experiences={pendingExperiences} />
          <div className="text-3xl mt-28 underline mb-8 text-center font-bold tracking-wider antialiased text-error ">
            INACTIVE/CLOSED EXPERIENCES
          </div>
          <ExperienceHero experiences={closedExperiences} />
        </>
      ) : (
        <div className="text-3xl mt-28 mb-8 text-center font-bold tracking-wider antialiased text-accent ">
          NO EXPERIENCES
        </div>
      )}
      <FloatButton />
    </>
  );
};

export default Experiences;