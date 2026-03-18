"use client";

/**
 * Application shell component.
 *
 * The shell provides the shared header, localized title, and language toggle
 * used across all pages.
 */
import Link from "next/link";

import { Button } from "@/components/ui";
import { useLanguage } from "@/contexts";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Renders the shared application chrome around the page content.
 *
 * @param props - Shell props.
 * @param props.children - Nested route content.
 * @returns The shared page shell.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/80 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10 lg:px-14">
          <Link className="flex items-center gap-3 text-card-foreground" href="/">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <Icons.app className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                WASLA
              </p>
              <h1 className="text-lg font-bold">{t.appTitle}</h1>
            </div>
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-border bg-white/75 p-1">
            <Button
              className={cn("rounded-full px-3", locale !== "en" && "opacity-70")}
              onClick={() => setLocale("en")}
              size="sm"
              variant={locale === "en" ? "default" : "ghost"}
            >
              <Icons.globe className="h-4 w-4" />
              {t.english}
            </Button>
            <Button
              className={cn("rounded-full px-3", locale !== "fr" && "opacity-70")}
              onClick={() => setLocale("fr")}
              size="sm"
              variant={locale === "fr" ? "default" : "ghost"}
            >
              <Icons.globe className="h-4 w-4" />
              {t.french}
            </Button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
