import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import React from "react";
import { ToastProvider } from "@/contexts/toast/ToastContext";
import { Toast } from "@/components/ui/toast/Toast";

const sora = localFont({
  src: [
    {
      path: "./fonts/Sora-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Sora-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Sora-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Sora-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Sora-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Sora-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Arthur Laurijssen Resume",
  description: "Arthur Laurijssen Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <ToastProvider>
        <body className={"h-full " + sora.variable}>
          <Toast />
          {children}
        </body>
      </ToastProvider>
    </html>
  );
}
