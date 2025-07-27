"use client";

import React from "react";
import { useTranslations } from "next-intl";

export function RegisterHeader() {
  const t = useTranslations("Auth.Register");

  return (
    <div className="text-center mb-8 max-w-md">
      <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
        {t("welcome")}
      </h1>
      <p className="text-[var(--color-foreground)] text-sm mt-2">
        {t("subtitle")}
      </p>
    </div>
  );
}
