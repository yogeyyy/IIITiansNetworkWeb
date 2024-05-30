import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

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
            <header className="w-1/4 sticky left-0">
              <Header />
            </header>

            <main className="w-1/2 bg-red-100">{children}</main>

            <div className="w-1/4 bg-purple-100"></div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
