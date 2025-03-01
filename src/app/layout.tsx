import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitTrack",
  description: "Track your fitness goals",
  icons: "/icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen flex flex-col items-center justify-center bg-sky-100 text-black ">
        {children}
      </body>
    </html>
  );
}
