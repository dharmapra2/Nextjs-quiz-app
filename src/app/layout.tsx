"use client"
import { store } from "@/components/redux/store";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { createContext } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen grid grid-cols-1 grid-rows-1 bg-quiz-pink p-2 md:p-4`}
        suppressHydrationWarning={true}
      >
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
