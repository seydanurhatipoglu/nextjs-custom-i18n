"use client";
import { I18nContext } from "@/context/I18nContext";
import { useContext } from "react";

export default function useI18n() {
  const { t, changeLocale, currentLocale } = useContext(I18nContext);
  return {
    t,
    changeLocale,
    currentLocale,
  };
}
