"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CommonNavbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar px-5  bg-base-100">
      <div className="flex-1">
        <Link href={"/en/"}>
          <Image
            src="/logo/logo.svg"
            alt="Brandfluencer"
            width={200}
            height={100}
          />
        </Link>
      </div>
      <div className="flex-none">
        {!session ? (
          <div className="navbar-end">
            <a className="btn btn-sm btn-accent text-white">Login</a>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button
                  onClick={() =>
                    signOut({ callbackUrl: "/en", redirect: true })
                  }
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonNavbar;
