import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers, LanguageAwareHtml } from "@/components/layout/Providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lumen - ADHD 友好工具",
  description: "帮助 ADHD 用户管理任务、记录思绪、找到共鸣的平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <LanguageAwareHtml>
        <body
          className={`${poppins.variable} h-screen flex flex-col font-sans`}
          suppressHydrationWarning
        >
          <Navbar className="flex-none" />
          <div className="flex-1 flex flex-col overflow-hidden pt-16">
            {children}
          </div>
          <Footer className="flex-none" />
        </body>
      </LanguageAwareHtml>
    </Providers>
  );
}
