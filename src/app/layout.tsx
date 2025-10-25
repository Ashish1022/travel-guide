import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TripCraft",
  description: "AI powered travel guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <TRPCReactProvider>
          <Toaster />
          <Header />
          <main className="mt-8">
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
