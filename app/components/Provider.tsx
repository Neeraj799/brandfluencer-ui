"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { I18nProviderClient } from "@locales/client";

interface Props {
  children: ReactNode;
  locale: string;
}

export default function Provider({ children,locale }: Props) {
  return (
    <div>
      <I18nProviderClient locale={locale}>
        <SessionProvider>{children}</SessionProvider>
      </I18nProviderClient>
    </div>
  );
}
