"use client"
import { ReactNode } from "react";
import I18nProvider from "./I18nContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      {children}
    </I18nProvider>
  )
}