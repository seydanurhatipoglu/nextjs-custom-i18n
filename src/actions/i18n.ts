"use server";
import { cookies } from "next/headers";

const defaultLocale: Locale = "tr";
const NEXT_LOCALE = "NEXT_LOCALE";

export async function changeLocale(locale: Locale) {
  cookies().set(NEXT_LOCALE, locale);
}

export async function getCurrentLocale() {
  // if (!cookies().has(NEXT_LOCALE)) {
  //   console.log("don't have cookie");

  //   await changeLocale(defaultLocale);
  // }
  return (cookies().get(NEXT_LOCALE)?.value as Locale) ?? defaultLocale;
}

async function t(key: string) {
  const currentLocale = await getCurrentLocale();
  console.log(currentLocale);

  const file = await import(`@/lang/${currentLocale}/messages.json`);
  return (
    key.split(".").reduce((acc, current) => acc && acc[current], file) ?? key
  );
}

export async function getI18n() {
  return {
    getCurrentLocale,
    changeLocale,
    t,
  };
}
