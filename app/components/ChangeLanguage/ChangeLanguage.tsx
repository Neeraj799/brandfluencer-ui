"use client";

import { useChangeLocale, useCurrentLocale } from "@locales/client";

export default function ChangeLanguage() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <>
      <div className="flex gap-2">
        <button onClick={() => changeLocale("en")}>
          <span
            className={`cursor-pointer text-sm ${locale === "en" ? "underline underline-offset-4" : ""}`}
          >
            EN
          </span>
        </button>
        <button onClick={() => changeLocale("bg")}>
          <span
            className={`cursor-pointer text-sm ${locale === "bg" ? "underline underline-offset-4" : ""}`}
          >
            BG
          </span>
        </button>
      </div>
    </>
  );
}
