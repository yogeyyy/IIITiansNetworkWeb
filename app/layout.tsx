import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen w-full justify-center">
          <div className="flex justify-center w-3/4">
            <Toaster position="bottom-left" />

            <div className="w-1/4">
              <Navbar />
            </div>

            <main className="w-1/2 overflow-y-auto">{children}</main>

            <div className="w-1/4"></div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
