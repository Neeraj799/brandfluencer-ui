import ChangeLanguage from "@/components/ChangeLanguage/ChangeLanguage";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "/public/logo/logo.svg";
import { getI18n } from "@locales/server";
const Navbar = async () => {
  const t = await getI18n();
  return (
    <div className="lg:container lg:flex lg:justify-center md:px-10 lg:mx-20">
      <div className="navbar bg-transparent uppercase justify-around ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className=" menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="#contact">Contact Us</Link>
              </li>
              <li>
                <Link href="#ourStory">Our Story</Link>
              </li>
              <li>
                <Link href={"/brand/login"}>Brand</Link>
              </li>
              <li>
                <Link href={"/brandfluencer/login"}>Brandfluencer</Link>
              </li>
            </ul>
          </div>
          <Link href={"/"}>
            <Image src={logo} alt="Brandfluencer" className="h-8" />
          </Link>
        </div>
        <div className="navbar-end gap-5 mr-5">
          <ChangeLanguage />
          <div className="hidden lg:flex gap-6">
            <Link href={"/brand/login"}>
              <button className="btn btn-sm btn-outline text-error">
                {t("brands")}
              </button>
            </Link>
            <Link href={"/brandfluencer/login"}>
              <button className="btn btn-sm btn-outline text-accent">
                {t("brandfluencer")}
              </button>
            </Link>
          </div>
          <div className="lg:dropdown dropdown-end hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="#contact">Contact Us</Link>
              </li>
              <li>
                <Link href="#ourStory">Our Story</Link>
              </li>
              <li>
                <Link href="/brand/login">Brands Login</Link>
              </li>
              <li>
                <Link href="/brandfluencer/login">Brandfluencer Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
