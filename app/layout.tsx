import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const monteserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EngageWise",
  description: "AI-powered social media post analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={monteserrat.className}>{children}</body>
    </html>
  );
}
