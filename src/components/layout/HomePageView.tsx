"use client";

/**
 * Home page view component.
 *
 * The component keeps the root page thin while rendering localized content
 * through the language context.
 */
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/contexts";

/**
 * Renders the localized home page content.
 *
 * @returns The home page view.
 */
export function HomePageView() {
  const { t } = useLanguage();

  return (
    <main className="px-6 py-10 md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.35fr_1fr]">
        <Card className="space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted">WASLA</p>
          <div className="space-y-3">
            <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">
              {t.homeTitle}
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted">{t.homeDescription}</p>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-[#c76035]"
            href="/tasks"
          >
            {t.openTasks}
          </Link>
        </Card>
        <Card className="space-y-4 bg-[#fff6ec]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">{t.tasks}</p>
          <div className="rounded-2xl border border-border bg-white/80 p-4">
            <p className="text-sm text-muted">{t.createTask}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white/80 p-4">
            <p className="text-sm text-muted">{t.editTask}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white/80 p-4">
            <p className="text-sm text-muted">{t.deleteTask}</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
