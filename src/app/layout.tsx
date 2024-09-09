import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import MobileNav from "@/components/_header/MobileNav";
import { Header } from "@/components/_header/Header";
import { ThemeProvider } from "@/components/theme-provider";

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
          "antialiased scroll-smooth",
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
            <main className="flex-1 overflow-hidden mt-12">{children}</main>
            <div className="md:hidden sticky bottom-0 left-0 right-0 p-3">
              <MobileNav />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
