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
    <select onChange={handleLocaleChange} value={currentLocale} className="bg-transparent px-5 py-3 border border-white rounded-xl ">
      <option value="en">
        English
      </option>
      <option value="tr">Türkçe</option>
    </select>
  )
}