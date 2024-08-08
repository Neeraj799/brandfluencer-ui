"use client";
import { useI18n } from "@locales/client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CommonNavbar = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>();
  const t = useI18n();

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <div className="navbar px-5  bg-base-100">
      <div className="flex-1">
        <Link href={" /"}>
          <Image
            src="/logo/logo.svg"
            alt="Brandfluencer"
            width={200}
            height={100}
          />
        </Link>
      </div>
      <div className="flex-none">
        {status === "authenticated" ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.image ?? ""}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                {user?.role === "brand" ? (
                  <Link href=" /brand/experiences">
                    <p>{t("myExperience")}</p>
                  </Link>
                ) : (
                  <Link href=" /brandfluencer/categories">
                    <p>{t("exploreExperiences")}</p>
                  </Link>
                )}
              </li>

              <li>
                {user?.role === "brand" ? (
                  <Link href=" /brand/profile">
                    <p>{t("profile")}</p>
                  </Link>
                ) : (
                  <Link href=" /brandfluencer/profile">
                    <p>{t("profile")}</p>
                  </Link>
                )}
              </li>
              <li>
                {user?.role === "brand" ? (
                  <Link href=" /brand/requests">
                    <p>Requests</p>
                  </Link>
                ) : (
                  <Link href=" /brandfluencer/myExperiences">
                    <p>{t("myExperience")}</p>
                  </Link>
                )}
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                >
                  {t("logout")}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // <div className="navbar-end">
          //   <a className="btn btn-sm btn-accent text-white">Login</a>
          // </div>
          " "
        )}
      </div>
    </div>
  );
};

export default CommonNavbar;
