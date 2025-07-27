"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1 text-[var(--color-foreground)]">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-4 py-3 rounded border border-gray-300 bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
      />
    </div>
  );
}

type RegisterFormProps = {
  onSubmit: (formData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void | Promise<void>;
  loading?: boolean;
};

export function RegisterForm({ onSubmit, loading = false }: RegisterFormProps) {
  const t = useTranslations("Auth.Register");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, email, password, confirmPassword });
  };

  return (
    <form
      className="space-y-5 max-w-md w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <InputField
        type="text"
        label={t("username")}
        placeholder={t("username")}
        aria-label={t("username")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        disabled={loading}
      />
      <InputField
        type="email"
        label={t("email")}
        placeholder={t("email")}
        aria-label={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <InputField
        type="password"
        label={t("password")}
        placeholder={t("password")}
        aria-label={t("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <InputField
        type="password"
        label={t("confirmPassword")}
        placeholder={t("confirmPassword")}
        aria-label={t("confirmPassword")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded bg-[var(--color-accent)] text-white font-semibold transition ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[var(--color-accent-light)]"
        }`}
      >
        {loading ? t("loading") : t("registerButton")}
      </button>
    </form>
  );
}
