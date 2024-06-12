"use client";

import { useChangeLocale, useCurrentLocale } from "@locales/client";

export default function Page() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <>
      <div className="flex gap-4">
        <button onClick={() => changeLocale("en")}>
          <span
            className={`cursor-pointer ${locale === "en" ? "shadow-error shadow-lg" : ""}`}
          >
            🇬🇧
          </span>
        </button>
        <button onClick={() => changeLocale("bg")}>
          <span
            className={`cursor-pointer ${locale === "bg" ? "shadow-accent shadow-lg" : ""}`}
          >
            🇧🇬
          </span>
        </button>
      </div>
    </>
  );
}
