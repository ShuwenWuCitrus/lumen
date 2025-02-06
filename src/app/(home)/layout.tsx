"use client";

import { Footer } from "@/components/common/Footer";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
