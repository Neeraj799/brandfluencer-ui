"use client";
import { useI18n } from "@locales/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Profile } from "./types";
import BrandModal from "../Brand/BrandModal/BrandModal";
import Modal from "../Brandfluencer/Modal/Modal";

const Profile = () => {
  const path = usePathname();
  const [profile, setProfile] = useState<Profile>({});
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>();
  const t = useI18n();

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    try {
      if (session && session.user && session.token) {
        setToken(session.token);
      }
    } catch (error) {
      console.error(error);
    }
  }, [session]);
  const headers: any = {
    "Content-Type": "application/json",
    authorization: `${token}`,
  };


  return (
    profile && (
      <main className="profile-page  md:m-0 mb-20">
        {session?.user?.role === "brand" ? (
          <BrandModal profile={user} />
        ) : (
          <Modal profile={user}/>
        )}
        <section className="relative block">
          <div>
            <img
              className="w-full h-96 top-0"
              src="https://images.unsplash.com/photo-1614852207233-e8d771f8e9fc?q=80&w=2710&auto=format&fit=crop"
              alt=""
            />
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200 mt-52 md:m-0">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full h-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={user?.image?.[0]}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-24 max-w-48"
                      />
                    </div>
                  </div>
                  <div className="w-full text-left lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 sm:mt-0">
                      {/* The button to open modal */}
                      <label
                        htmlFor="my_modal_7"
                        className="btn btn-xs md:btn-sm text-right btn-error text-white px-5 antialiased tracking-wide"
                      >
                        Edit
                      </label>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 mt-16 sm:mt-0 lg:order-1">
                    <div className="flex py-4 lg:pt-4 pt-4">
                      {/* <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Followers
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Experiences
                        </span>
                      </div> */}
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-semibold block uppercase tracking-wide text-blueGray-600">
                          {new Date(
                            user?.created_at ?? ""
                          ).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Joined
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center md:mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 md:mb-2">
                    {user?.brand || user?.name}
                  </h3>
                  
                  {user?.companyRep && (
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-600 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
                    {t("companyRepresentativeName")} - {user?.companyRep || " "}
                  </div>
                  )}
                  
                  {user?.instaID && (
                    <div className="mb-2 text-blueGray-600 mt-8">
                      <i className="fas fa-briefcase mr-2 text-lg"></i>
                      {t("instaProfileLink")} - {user?.instaID}
                    </div>
                  )}
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-briefcase mr-2 text-lg"></i>
                    {t("email")} - {user?.email}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    {t("mobile")} - {user?.mobile}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dolorum, dignissimos laborum cupiditate ex
                        adipisci esse earum facilis voluptate. Quis, ex
                        similique. Hic quos corporis consequuntur cupiditate non
                        ipsa eius quae!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  );
};

export default Profile;
