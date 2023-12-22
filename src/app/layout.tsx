import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Final Project - Fettuccine Frenzy Fiesta",
  description: "Final Project Develped in next.js - Fettuccine Frenzy Fiesta",
  keywords: "Fettuccine Frenzy Fiesta, Final Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CookieBanner/>
        <Footer />
      </body>
    </html>
  );
}
