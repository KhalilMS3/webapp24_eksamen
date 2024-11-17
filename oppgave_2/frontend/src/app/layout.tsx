import type { Metadata } from "next";
import localFont from "next/font/local";

// TODO: Kommenter ut om du ønsker å bruke .css
// import '../styles/css/main.css'

// TODO: Kommenter ut om du ikke ønsker å bruke tailwind
import "../styles/tailwind/main.css";

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

export const metadata: Metadata = {
  title: "JoinIn - Events to book",
  description: "Developed by Khalil Sfouk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
import React from "react";
