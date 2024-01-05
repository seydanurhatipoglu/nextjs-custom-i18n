"use server";
import { cookies } from "next/headers";

const defaultLocale: Locale = "tr";
const NEXT_LOCALE = "NEXT_LOCALE";

export async function changeLocale(locale: Locale) {
  cookies().set(NEXT_LOCALE, locale);
}

export async function getCurrentLocale() {
  return (cookies().get(NEXT_LOCALE)?.value as Locale) ?? defaultLocale;
}

export async function getI18n(namespace: string = "messages") {
  const currentLocale = await getCurrentLocale();
  console.log(currentLocale);

  let file: Record<string, string>;
  try {
    file = await import(`@/lang/${currentLocale}/${namespace}.json`);
  } catch (error) {
    console.log(error);

    file = await import(`@/lang/${defaultLocale}/messages.json`);
    console.error(
      "locale or namespace not found. falling back to default locale"
    );
  }
  console.log(file, typeof file);

  const t = (key: string) =>
    key
      .split(".")
      .reduce(
        (acc: string | Record<string, string>, current: string) =>
          typeof acc === "object" ? acc[current] : acc,
        file
      ) ?? key;

  return { t };
}
