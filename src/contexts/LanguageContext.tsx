"use client";

/**
 * Language context for the WASLA practice application.
 *
 * The provider stores the active locale, persists it in localStorage, and
 * exposes the translated message catalog through the `useLanguage` hook.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { en, type Messages } from "@/messages/en";
import { fr } from "@/messages/fr";

type Locale = "en" | "fr";

type LanguageContextValue = {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
  t: Messages;
};

const LANGUAGE_STORAGE_KEY = "wasla-practice-locale";

const messageCatalog: Record<Locale, Messages> = {
  en,
  fr,
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/**
 * Provides the current locale and translations to client components.
 *
 * @param props - Provider props.
 * @param props.children - Nested application content.
 * @returns The language context provider.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const storedLocale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    return storedLocale === "fr" ? "fr" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: messageCatalog[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Returns the current locale, translations, and locale setter.
 *
 * @returns The language context value.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider.");
  }

  return context;
}
