"use client"

import { changeLocale as changeLocaleSSR, getCurrentLocale } from "@/actions/i18n";
import { ReactNode, createContext, useCallback, useEffect, useState, useTransition } from "react";

export const I18nContext = createContext({} as I18nType)

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [_, startTransition] = useTransition()
  const [translations, setTranslations] = useState<Record<string, string>>()
  const [currentLocale, setCurrentLocale] = useState<Locale>('tr')

  useEffect(() => {
    startTransition(async () => {
      setCurrentLocale(await getCurrentLocale())
    })
  }, [])

  async function changeLocale(locale: Locale) {
    startTransition(async () => await changeLocaleSSR(locale).then(() => setCurrentLocale(locale)))
  }

  useEffect(() => {
    import(`@/lang/${currentLocale}/messages.json`).then((file) => setTranslations(file))
  }, [currentLocale])

  const t = useCallback((key: string) => (key.split(".").reduce((acc, current) => acc && acc[current], translations)), [translations])


  return (
    <I18nContext.Provider value={{ t, changeLocale, currentLocale }}>
      {children}
    </I18nContext.Provider>
  )
}