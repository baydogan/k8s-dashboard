"use server";

import { cookies } from "next/headers";
import { routing } from "./routing";

export async function setLocale(locale: string) {
  if (!routing.locales.includes(locale as "tr" | "en")) return;

  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
