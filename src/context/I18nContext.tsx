"use client"

import { getI18n } from "@/actions/i18n";
import { ReactNode, createContext, useEffect, useState, useTransition } from "react";

export const I18nContext = createContext({} as I18nType)

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [loadingTranslations, startTransition] = useTransition()
  const [translations, setTranslations] = useState()
  const [currentLocale, setCurrentLocale] = useState<Locale>('tr')
  const [t, setT] = useState<Translate>()

  useEffect(() => {
    startTransition(async () => {
      const { getCurrentLocale, changeLocale, t } = await getI18n()
      setT(async (key: string) => await t(key))
      setCurrentLocale(await getCurrentLocale())

    })
  }, [])


  return (
    <I18nContext.Provider value={{ loadingTranslations, t, changeLocale, currentLocale }}>
      {loadingTranslations ?
        "Loading..." :
        children
      }
    </I18nContext.Provider>
  )
}