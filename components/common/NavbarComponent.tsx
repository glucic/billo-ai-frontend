"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#features", label: t("features") },
    { href: "#pricing", label: t("pricing") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b-0">
      {/* Gradient line centered */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-300 h-[2px] bg-gradient-to-r from-black via-[var(--accent)] to-black" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[var(--accent)]">
          BilloAI
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--foreground)]/90 hover:text-[var(--accent)] transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="ml-4 rounded-lg bg-[var(--accent)] px-4 py-2 text-white hover:bg-[var(--accent-light)] transition font-semibold"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-[var(--background)] border-t border-gray-200 dark:border-gray-700 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[var(--foreground)]/90 hover:text-[var(--accent)] transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="mt-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-white hover:bg-[var(--accent-light)] transition font-semibold"
          >
            {t("cta")}
          </Link>
        </div>
      )}
    </nav>
  );
}
