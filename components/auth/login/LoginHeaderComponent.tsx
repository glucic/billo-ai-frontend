import { useTranslations } from "next-intl";

export function LoginHeader() {
  const t = useTranslations("Auth.Login");
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
