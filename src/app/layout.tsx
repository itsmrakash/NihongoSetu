import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/authContext";

export const metadata: Metadata = {
  title: "NihongoSetu — 日本語節 | Your Bridge to Japanese",
  description: "Cross-device Japanese language learning platform bridging linguistic and cultural paths.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased selection:bg-[#C83C50] selection:text-[#FFFFFF]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

