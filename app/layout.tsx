import type { Metadata } from "next"
import { Geist, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "fadyfiskander.github.io",
  description:
    "Portfolio & Terminal of Fady Fayez — Junior Software Developer specializing in C#, ASP.NET Core, React, Clean Architecture, and PostgreSQL.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark antialiased", geist.variable, "font-sans", jetbrainsMono.variable)}
    >
      <body className="min-h-screen bg-black text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100">
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
