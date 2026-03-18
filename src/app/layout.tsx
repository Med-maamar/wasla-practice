/**
 * Root layout for the WASLA practice application.
 *
 * The layout registers the metadata and shared page shell for the App Router.
 * Local font stacks are used here because `next/font` can fail in some
 * Turbopack environments.
 */
import type { Metadata } from "next";

import "@/app/globals.css";
import { AppShell } from "@/components/layout";
import { LanguageProvider } from "@/contexts";

export const metadata: Metadata = {
  title: "WASLA Practice | Task Manager",
  description: "Task Manager practice project structured with WASLA architecture.",
};

/**
 * Renders the root HTML document for the application.
 *
 * @param props - Layout properties supplied by Next.js.
 * @param props.children - Nested route content rendered inside the body.
 * @returns The root HTML layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
