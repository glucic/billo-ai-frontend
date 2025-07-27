type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
};

export function InputField({ label, id, ...props }: InputFieldProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-1 text-[var(--color-foreground)]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className="w-full px-4 py-3 rounded border border-gray-300 bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
      />
    </div>
  );
}
