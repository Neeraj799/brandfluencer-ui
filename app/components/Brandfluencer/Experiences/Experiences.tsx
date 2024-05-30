"use client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Experience = ({}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [experiences, setExperiences] = useState<any>([]);
  const [requestedIds, setRequests] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [refresh, setrefresh] = useState<Boolean>(false);
  const headers: any = {
    "Content-Type": "application/json",
    authorization: `${token}`,
  };

  useEffect(() => {
    if (session && session.user && session.token) {
      setUser(session.user);
      setToken(session.token);
    }
  }, [session, token]);

useEffect(() => {
  if (!token) return;

  (async () => {
    try {
      const res1 = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/request/experience?category=${category}`,
        {
          headers: headers,
        }
      );
      const data1 = await res1.json();
      setExperiences(data1.experiences);

      const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/request/list-requests`,
        {
          headers: headers,
        }
      );
      if (!res2.ok) {
        throw new Error(`HTTP error! status: ${res2.status}`);
      }

      const data2 = await res2.json();
      const ids = data2?.map((item: any) => item.experience._id);
      setRequests(ids);
    } catch (error) {
      console.error(error);
    }
  })();
}, [token, refresh]);

  const handleRequest = async (id: string) => {
    try {
      const headers: any = {
        "Content-Type": "application/json",
        authorization: `${token}`,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/request/create-request/${id}`,
        {
          method: "POST",
          headers: headers,
        }
      );
      const data: { error?: string } = await res.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setrefresh(!refresh);
        Swal.fire({
          title: "Request Created Succesfully",
          icon: "success",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(experiences,'experiences');
  
  return (
    <>
      <div
        className="hero mt-10 max-h-96"
        style={{ backgroundImage: "url(/home/influencersBanner.png)" }}
      >
        <div className="hero-overlay bg-opacity-60 h-full"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 py-10 antialiased text-4xl font-bold ">
              <span className="uppercase text-5xl font-bold antialiased tracking-widest [text-shadow:_0_4px_0_rgb(1_1_0_/_90%)] ">
                {category}
              </span>
            </h1>
          </div>
        </div>
      </div>
      {experiences?.length > 0 ? (
        experiences?.map((expData: any, index: number) => {
          return (
            <div key={index} className="hero mt-16 mb-28 cursor-auto">
              <div className="hero-content drop-shadow-xl flex-col lg:flex-row">
                <img
                  src={expData?.image?.[0]}
                  alt="image"
                  loading="lazy"
                  className="max-w-xs h-fit rounded-lg drop-shadow-2xl"
                />
                <div className="drop-shadow-xl ml-4 rounded-xl bg-base-100 p-16">
                  <span>
                    <p className="text-2xl font-bold">
                      {expData?.experienceName}{" "}
                    </p>{" "}
                    <p className="py-6 italic">{expData?.description}</p>
                  </span>
                  <div className="space-x-5">
                    {requestedIds.includes(expData?._id) ? (
                      <span className="btn btn-disabled btn-sm">Requested</span>
                    ) : (
                      <button
                        onClick={() => handleRequest(expData?._id)}
                        className="btn btn-accent text-white btn-sm"
                      > 
                        Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-3xl mt-28 mb-28 text-center font-bold tracking-wider antialiased text-accent ">
          NO EXPERIENCES
        </div>
      )}
    </>
  );
};

export default Experience;
