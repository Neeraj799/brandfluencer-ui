import { getI18n } from "@locales/server";
import Image from "next/image";
import React from "react";

const Footer = async () => {
  const t = await getI18n();

  return (
    <div className="mt-auto w-screen">
      <footer className=" footer gap-20 footer-center p-10 bg-accent-content text-gray-700">
        <aside className="gap-5">
          <img className="h-10" src="/logo/logo.svg" alt="" />
          <p className="font-bold text-2xl">
            {t("contact")}
            <br />
          </p>
          <p>hello@brandfluencer.bg</p>
          <p>{t("followUs")}</p>
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
        <div>
        <div className="flex space-x-4">
        <span>{t("FAQ")}</span>
        <span>{t("termsAndConditions")}</span>
        <span>{t("privacyPolicy")}</span>
        </div>
        <p>Copyright © 2024 - {t("allRightsReserved")} by Brandfluencer Ltd</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
