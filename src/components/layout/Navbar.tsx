"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitch } from "./LanguageSwitch";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50 ${className}`}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary-dark">
          Lumen
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/" className={`nav-link ${isActive("/")}`}>
            {t.nav.home}
          </Link>
          <Link href="/tasks" className={`nav-link ${isActive("/tasks")}`}>
            {t.nav.tasks}
          </Link>
          <Link href="/notes" className={`nav-link ${isActive("/notes")}`}>
            {t.nav.notes}
          </Link>
          <Link
            href="/community"
            className={`nav-link ${isActive("/community")}`}
          >
            {t.nav.community}
          </Link>
          <LanguageSwitch />
        </div>
      </div>
    </nav>
  );
}
