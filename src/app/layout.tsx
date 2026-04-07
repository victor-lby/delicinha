import type { Metadata } from "next";
import { ADLaM_Display, Inter } from "next/font/google";
import "./globals.css";

const adlam = ADLaM_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-adlam",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Delicinha IA",
  description: "Descubra os Melhores Apps de IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${adlam.variable} ${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
