import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-auto w-screen">
      <footer className=" footer gap-20 footer-center p-10 bg-accent-content text-gray-700">
        <aside className="gap-5">
          <img className="h-16" src="/logo/logo.svg" alt="" />
          <p className="font-bold text-2xl">
            Contact Us
            <br />
          </p>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a>
                <Image
                  src="/icons/instagram.svg"
                  height={30}
                  width={30}
                  alt="Email Icon"
                />
              </a>
              <a>
                <Image
                  src="/icons/mail.svg"
                  height={30}
                  width={30}
                  alt="Email Icon"
                />
              </a>
              <a>
                <Image
                  src="/icons/facebook.svg"
                  height={30}
                  width={30}
                  alt="Email Icon"
                />
              </a>
            </div>
          </nav>
        </aside>
        <p>Copyright © 2024 - All right reserved by Brandfluencer Ltd</p>
      </footer>
    </div>
  );
};

export default Footer;
