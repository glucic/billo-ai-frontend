import React from "react";

type SocialLoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  label: string;
};

export function SocialLoginButton({
  icon,
  label,
  ...props
}: SocialLoginButtonProps) {
  return (
    <button
      {...props}
      className="w-full flex items-center justify-center gap-2 py-3 rounded border border-gray-300 text-[var(--color-foreground)] hover:bg-[var(--color-accent-glow)] transition"
      aria-label={label}
    >
      {icon}
      {label}
    </button>
  );
}
