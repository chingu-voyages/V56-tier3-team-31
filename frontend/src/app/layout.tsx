import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import ChatWidget from "@/components/ChatWidget";
import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/footer";


const geist = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
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
      <body
        className={`relative ${geist.className} ${geistMono.className} antialiased`}
      >
        <Toaster position="top-center" />
        <StoreProvider>
          {" "}
          <Header />
          {children}
          <QueryProvider>
            <ChatWidget />
          </QueryProvider>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
