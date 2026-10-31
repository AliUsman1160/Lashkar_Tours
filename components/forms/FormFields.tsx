import { ChevronDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const controlClass = (invalid?: boolean) =>
  cn(
    "min-h-12 w-full rounded-sm border bg-white px-4 text-base text-charcoal outline-none transition-colors placeholder:text-grey",
    "focus:border-forest focus:ring-2 focus:ring-forest/15",
    invalid ? "border-red-700 bg-red-50/40" : "border-forest/20 hover:border-forest/40",
  );

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-charcoal">
        {label}
        {required ? (
          <span className="ml-1 text-red-700" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-grey-ink">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-grey-ink">
          {hint}
        </p>
      )}
      <FieldError id={id} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
      <span aria-hidden>⚠</span>
      {error}
    </p>
  );
}

/** aria-describedby value linking a control to its hint or error. */
export const describedBy = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

export function SelectControl({ invalid, className, children, ...props }: ComponentProps<"select"> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select className={cn(controlClass(invalid), "cursor-pointer appearance-none pr-10", className)} aria-invalid={invalid || undefined} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-forest" />
    </div>
  );
}
