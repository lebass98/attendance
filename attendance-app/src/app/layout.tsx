import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "출석체크",
  description: "간편하게 출석을 관리하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
