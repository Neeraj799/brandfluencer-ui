"use client";

import { useChangeLocale, useCurrentLocale } from "@locales/client";

export default function Page() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <>
      <div>
        <a
          onClick={() => changeLocale("en")}
          className={`text-xs cursor-pointer font-light mr-1 ${locale === "en" ? "underline" : ""}`}
        >
          EN
        </a>
        <a
          onClick={() => changeLocale("bg")}
          className={`text-xs cursor-pointer font-light ${locale === "bg" ? "underline" : ""}`}
        >
          BG
        </a>
      </div>
    </>
  );
}
