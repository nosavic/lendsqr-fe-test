import type { InputHTMLAttributes, ReactNode } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  trailing?: ReactNode;
}

export function TextField({ trailing, className, ...props }: TextFieldProps) {
  return (
    <div className="relative flex items-center">
      <input
        className={`h-[50px] w-full rounded-[5px] border-2 border-field-line px-4 text-sm text-primary outline-none transition-colors placeholder:text-body/60 focus:border-secondary ${trailing ? "pr-16" : ""} ${className ?? ""}`}
        {...props}
      />
      {trailing && <div className="absolute right-4">{trailing}</div>}
    </div>
  );
}
