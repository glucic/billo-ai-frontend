"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Hero() {
  const t = useTranslations("LandingPage.HeroSection");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center bg-[var(--background)]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent-glow" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-4xl text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl"
      >
        {t("title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-2xl text-base text-[var(--foreground)]/70 sm:text-lg"
      >
        {t("description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex flex-col gap-4 sm:flex-row"
      >
        <button className="rounded-lg bg-[var(--accent)] px-6 py-3 text-white font-medium transition hover:bg-[var(--accent-light)]">
          {t("primaryCta", { defaultMessage: "Get Started" })}
        </button>
        <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-[var(--foreground)] transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
          {t("secondaryCta", { defaultMessage: "Learn More" })}
        </button>
      </motion.div>
    </section>
  );
}
