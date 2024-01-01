"use client"

import useI18n from "@/hooks/useI18n";
import { ChangeEvent, useContext } from "react";

type Locale = 'tr' | 'en'
export default function LanguageSwitcher() {
  const { changeLocale, currentLocale } = useI18n()
  function handleLocaleChange(e: ChangeEvent<HTMLSelectElement>) {
    changeLocale(e.target.value as Locale)

  }

  return (
    <select onChange={handleLocaleChange} >
      <option value="en" selected={currentLocale === "en"}>
        English
      </option>
      <option value="tr" selected={currentLocale === "tr"}>Türkçe</option>
    </select>
  )
}