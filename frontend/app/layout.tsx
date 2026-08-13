import type { Metadata } from "next";

import "./globals.css";

import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "RecomGraph | Product Intelligence",
  description:
    "Discover products through graph-powered recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Navbar />

        {children}
      </body>
    </html>
  );
}