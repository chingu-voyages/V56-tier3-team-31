import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Surgery Status Board",
  description:
    "Surgery Status Board, that will track a patients progress and display it on a monitor in the waiting room.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} antialiased`}>
        <Toaster />
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
