import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/_header/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const anton = localFont({
  src: "./fonts/Anton.ttf",
  variable: "--font-anton",
  weight: "100 400 600 700 800 900",
});

export const metadata: Metadata = {
  title: "VisionaryTheo Travel",
  description: "A website for my travels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased scroll-smooth bg-lightElement text-darkElement dark:bg-darkElement dark:text-lightElement font-anton",
          geistSans.variable,
          geistMono.variable,
          anton.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen container mx-auto flex flex-col justify-between font-sans">
            <Header />
            <main className="flex-1 overflow-hidden flex flex-col gap-4 mt-12">
              {children}
            </main>

            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
