import type { Metadata } from "next"
import { ThemeProvider } from "@/components/providers/theme-provider"

import "./globals.css"
import { NextAuthProvider } from "@/components/providers/next-auth-provider"

export const metadata: Metadata = {
  title: "Intellicore",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextAuthProvider>
        </body>
      </html>
    </>
  )
}
